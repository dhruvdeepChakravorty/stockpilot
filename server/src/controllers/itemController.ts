import { Request, Response } from "express";
import { pool } from "../config/dbConnect";
import { itemSchema, updateItemSchema } from "../types/item.type";
import { AppError } from "../utils/AppError";

export const getAllItems = async (req: Request, res: Response) => {
  const result = await pool.query(
    `SELECT id,sku,name FROM items WHERE deleted_at IS NULL`,
  );
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
export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsed = updateItemSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }
  const updates: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (parsed.data.name !== undefined) {
    updates.push(`name = $${paramIndex}`);
    values.push(parsed.data.name);
    paramIndex++;
  }

  if (parsed.data.sku !== undefined) {
    updates.push(`sku = $${paramIndex}`);
    values.push(parsed.data.sku);
    paramIndex++;
  }
  if (parsed.data.reorder_threshold !== undefined) {
    updates.push(`reorder_threshold = $${paramIndex}`);
    values.push(parsed.data.reorder_threshold);
    paramIndex++;
  }
  if (updates.length === 0) {
    throw new AppError("No fields provided to update", 400);
  }

  values.push(id);

  const query = `
    UPDATE items
    SET ${updates.join(", ")}
    WHERE id = $${paramIndex}
    RETURNING * 
  `;
  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    throw new AppError("Warehouse not found", 404);
  }

  res.json(result.rows[0]);
};
export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  const existing = await pool.query(
    `SELECT deleted_at FROM items WHERE id = $1`,
    [id],
  );

  if (existing.rows.length === 0) {
    throw new AppError("Item not found", 404);
  }

  if (existing.rows[0].deleted_at !== null) {
    throw new AppError("Item is already deleted", 400);
  }

  const result = await pool.query(
    `UPDATE items SET deleted_at = NOW() WHERE id = $1 RETURNING *`,
    [id],
  );

  res.json(result.rows[0]);
};
