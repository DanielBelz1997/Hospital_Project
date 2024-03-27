// @ts-nocheck
import { Request, Response } from "express";
import { runQuery } from "../help_functions/connectionTypes";

export async function getMembersDetails(req: Request, res: Response) {
  try {
    const query: string = `
    SELECT * FROM members
    INNER JOIN members_data
    ON members_data.id_member = members.id;
    `;

    const results = await runQuery(query);
    console.log(results);

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function addMember(req: Request, res: Response) {
  try {
    const {
      id_official,
      name,
      phone_number,
      cellphone,
      address_city,
      address_street,
      address_house_num,
      date_of_birth,
      first_vaccination_date,
      second_vaccination_date,
      third_vaccination_date,
      forth_vaccination_date,
      vaccine_manufacturer,
      positive_test_date,
      recovery_date,
    } = req.body;

    if (
      new Date(second_vaccination_date) < new Date(first_vaccination_date) ||
      new Date(third_vaccination_date) < new Date(second_vaccination_date) ||
      new Date(forth_vaccination_date) < new Date(third_vaccination_date) ||
      (recovery_date && !positive_test_date)
    ) {
      throw new Error(
        "there is an issue with the details. check and try again"
      );
    }
    const insertMemberValues = [
      id_official,
      name,
      phone_number,
      cellphone,
      address_city,
      address_street,
      address_house_num,
      date_of_birth,
    ];

    const membersQuery: string = `
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
    (?,?,?,?,?,?,?,?);
    `;

    await runQuery(membersQuery, insertMemberValues);

    const idResult = await runQuery("SELECT LAST_INSERT_ID() AS inserted_id;");

    const membersDataQuery: string = `
    INSERT INTO members_data
    (id_member,
    first_vaccination_date,
    second_vaccination_date,
    third_vaccination_date,
    forth_vaccination_date,
    vaccine_manufactorer,
    positive_test_date,
    recovery_date)
    VALUES
    (?,?,?,?,?,?,?,?);
    `;

    const insertMemberDataValues = [
      idResult[0].inserted_id,
      first_vaccination_date,
      second_vaccination_date,
      third_vaccination_date,
      forth_vaccination_date,
      vaccine_manufacturer,
      positive_test_date,
      recovery_date,
    ];

    await runQuery(membersDataQuery, insertMemberDataValues);

    res.json({ message: "the member has been added!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function updateMember(req: Request, res: Response) {
  try {
    const {
      id_official,
      name,
      phone_number,
      cellphone,
      address_city,
      address_street,
      address_house_num,
    } = req.body;

    const query: string = `
    UPDATE members
    SET
    id_official = ?,
    name = ?,
    phone_number = ?,
    cellphone = ?,
    address_city = ?,
    address_street = ?,
    address_house_num = ?
    WHERE id_official = ?;
    `;

    const memberToUpdate = [
      id_official,
      name,
      phone_number,
      cellphone,
      address_city,
      address_street,
      address_house_num,
      id_official,
    ];

    await runQuery(query, memberToUpdate);

    res.json({ message: "member deleted!" });
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
