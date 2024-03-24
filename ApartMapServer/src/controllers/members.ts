// @ts-nocheck
import { Request, Response } from "express";
import {runQuery} from "../help_functions/connectionTypes";

export async function getMembers(req: Request, res: Response) {
  try {

    const query: string = `
    SELECT * FROM members;
    `;

    const results = await runQuery(query);

    console.log(results)

    res.json(results);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }

}

// insert query
// INSERT INTO coordinates (location, pop_up) VALUES (POINT(37.156, 36.464), "hello db! num 2");
