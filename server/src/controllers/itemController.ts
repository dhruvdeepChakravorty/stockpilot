import { Request, Response } from "express";
import { pool } from "../config/dbConnect";

export const getAllItems = async (req: Request, res: Response) => {
  const result = await pool.query(`SELECT id,sku,name FROM items`);
  res.json(result.rows);
};
