// @ts-nocheck
import { Request, Response } from "express";
import { runQuery } from "../help_functions/connectionTypes";

export async function lastMonthData(req: Request, res: Response) {
  try {
    const query: string = `
    SELECT COUNT(*) AS active_patients_per_day, activity_date
    FROM (
        SELECT activity_date
        FROM (
            SELECT COALESCE(1st_vaccination_date, 2nd_vaccination_date, 3rs_vaccination_date, 4th_vaccination_date, positive_test_date, recovery_date) AS activity_date
            FROM members_data
            WHERE COALESCE(1st_vaccination_date, 2nd_vaccination_date, 3rs_vaccination_date, 4th_vaccination_date, positive_test_date, recovery_date) BETWEEN LAST_DAY(CURDATE() - INTERVAL 1 MONTH) + INTERVAL 1 DAY AND LAST_DAY(CURDATE())
        ) AS activity_dates
    ) AS activity_count
    GROUP BY activity_date;
    `;

    const results = await runQuery(query);

    results.forEach((x) => {
      x.activity_date = new Date(x.activity_date).toLocaleDateString();
    });

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
