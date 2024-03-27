// @ts-nocheck
import { Request, Response } from "express";
import { runQuery } from "../help_functions/connectionTypes";
import { parse, format } from "date-fns";

export async function coronaInfo(req: Request, res: Response) {
  try {
    const lastMonthDataQuery: string = `
    SELECT COUNT(*) AS active_patients_per_day, activity_date
    FROM (
        SELECT activity_date
        FROM (
            SELECT COALESCE(first_vaccination_date, second_vaccination_date, third_vaccination_date, forth_vaccination_date, positive_test_date, recovery_date) AS activity_date
            FROM members_data
            WHERE COALESCE(first_vaccination_date, second_vaccination_date, third_vaccination_date, forth_vaccination_date, positive_test_date, recovery_date) BETWEEN LAST_DAY(CURDATE() - INTERVAL 1 MONTH) + INTERVAL 1 DAY AND LAST_DAY(CURDATE())
        ) AS activity_dates
    ) AS activity_count
    GROUP BY activity_date;
    `;

    const howManyNotVaccinatedQuery: string = `
    select count(*) from members_data
    where
    first_vaccination_date is null
    and second_vaccination_date is null
    and third_vaccination_date is null
    and forth_vaccination_date is null
    `;

    const lastMonthDataResults = await runQuery(lastMonthDataQuery);
    const howManyNotVaccinatedResults = await runQuery(
      howManyNotVaccinatedQuery
    );

    for (const oneDayInfo of lastMonthDataResults) {
      const inputDateString = new Date(
        oneDayInfo.activity_date
      ).toLocaleDateString();

      const parsedDate = parse(inputDateString, "d/M/yyyy", new Date());
      const formattedDate = format(parsedDate, "yyyy-dd-MM");

      oneDayInfo.activity_date = formattedDate;
    }

    console.log(lastMonthDataResults);

    res.json({
      lastMonthDataResults: lastMonthDataResults,
      howManyNotVaccinatedResults: howManyNotVaccinatedResults[0]["count(*)"],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
