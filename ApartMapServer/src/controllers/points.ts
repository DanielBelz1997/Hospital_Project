// @ts-nocheck
import { Request, Response } from "express";
import runQuery from "../help_functions/connectionTypes";

export async function getHomePage(req: Request, res: Response) {
  const query: string = `
  SELECT id, pop_up, ST_X(location) AS latitude, ST_Y(location) AS longitude FROM coordinates;
  `;

  try {
    const results = await runQuery(query, [username, password]);

    if (results.length === 0) {
      return res.status(401).json({ message: "המשתמש אינו רשום במערכת" });
    }

    return res.status(200).json(token);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
}

// insert query
// INSERT INTO coordinates (location, pop_up) VALUES (POINT(37.156, 36.464), "hello db! num 2");
