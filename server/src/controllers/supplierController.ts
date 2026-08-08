import { Request, Response } from "express";
import { pool } from "../config/dbConnect";

export const getAllSuppliers = async (req: Request, res: Response) => {
  const result = await pool.query(`SELECT id,name FROM suppliers`);
  res.json(result.rows);
};
