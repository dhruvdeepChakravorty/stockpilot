import { Request, Response } from "express";
import { pool } from "../config/dbConnect";
import { warehouseSchema } from "../types/warehouse.type";
import { AppError } from "../utils/AppError";

export const getAllWarehouses = async (req: Request, res: Response) => {
  const result = await pool.query(`SELECT id,name FROM warehouses`);
  res.json(result.rows);
};

export const createWarehouse = async (req: Request, res: Response) => {
  const parsed = warehouseSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }
  const { name, address } = parsed.data;
  const result = await pool.query(
    `INSERT INTO warehouses (name,address) VALUES ($1,$2) RETURNING *`,
    [name, address],
  );

  res.status(201).json(result.rows[0]);
};
