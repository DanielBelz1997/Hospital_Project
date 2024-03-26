// @ts-nocheck
import { Request, Response } from "express";
import { runQuery } from "../help_functions/connectionTypes";

export async function getMembersDetails(req: Request, res: Response) {
  try {
    const query: string = `
    SELECT * FROM members_data
    LEFT JOIN members
    ON members_data.id_member = members.id;
    `;

    const results = await runQuery(query);

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function addMember(req: Request, res: Response) {
  try {
    const query: string = `
    INSERT INTO members
    (
    id_official,
    name,
    phone_number,
    cellphone,
    address_city,
    address_street,
    address_house_num,
    date_of_birth)
    VALUES
    (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?);
    `;

    const results = await runQuery(query);

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function deleteMember(req: Request, res: Response) {
  try {
    const { memberId } = req.params;

    const query: string = `
    DELETE FROM members
    where id = ?
    `;

    await runQuery(query, [memberId]);

    res.json({ message: "member deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
