import { Request, Response } from "express";
import { pool } from "../config/dbConnect";
import { itemSchema } from "../types/item.type";
import { AppError } from "../utils/AppError";

export const getAllItems = async (req: Request, res: Response) => {
  const result = await pool.query(`SELECT id,sku,name FROM items`);
  res.json(result.rows);
};

export const createItem = async (req: Request, res: Response) => {
  const parsed = itemSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }
  const { name, sku, reorder_threshold } = parsed.data;

  const result = await pool.query(
    `INSERT INTO items (name,sku,reorder_threshold) VALUES ($1,$2,$3) RETURNING *`,
    [name, sku, reorder_threshold],
  );
  res.status(201).json(result.rows[0]);
};
