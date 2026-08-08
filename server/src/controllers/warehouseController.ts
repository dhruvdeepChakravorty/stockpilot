import { Request, Response } from "express";
import { pool } from "../config/dbConnect";

export const getAllWarehouses = async (req: Request, res: Response) => {
  const result = await pool.query(`SELECT id,name FROM warehouses`);
  res.json(result.rows);
};
