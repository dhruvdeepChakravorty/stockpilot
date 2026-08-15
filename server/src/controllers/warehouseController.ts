import { Request, Response } from "express";
import { pool } from "../config/dbConnect";
import {
  updateWarehouseSchema,
  warehouseSchema,
} from "../types/warehouse.type";
import { AppError } from "../utils/AppError";

export const getAllWarehouses = async (req: Request, res: Response) => {
  const result = await pool.query(
    `SELECT id,name FROM warehouses WHERE deleted_at IS NULL`,
  );
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

export const updateWarehouse = async (req: Request, res: Response) => {
  const { id } = req.params;

  const parsed = updateWarehouseSchema.safeParse(req.body);
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

  if (parsed.data.address !== undefined) {
    updates.push(`address = $${paramIndex}`);
    values.push(parsed.data.address);
    paramIndex++;
  }
  if (updates.length === 0) {
    throw new AppError("No fields provided to update", 400);
  }

  values.push(id);

  const query = `
    UPDATE warehouses
    SET ${updates.join(", ")}
    WHERE id = $${paramIndex}
    RETURNING * 
  `;
  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    throw new AppError("Item not found", 404);
  }

  res.json(result.rows[0]);
};

export const deleteWarehouse = async (req: Request, res: Response) => {
  const { id } = req.params;

  const existing = await pool.query(
    `SELECT deleted_at FROM warehouses WHERE id = $1`,
    [id],
  );

  if (existing.rows.length === 0) {
    throw new AppError("Warehouse not found", 404);
  }

  if (existing.rows[0].deleted_at !== null) {
    throw new AppError("Warehouse is already deleted", 400);
  }

  const result = await pool.query(
    `UPDATE warehouses SET deleted_at = NOW() WHERE id = $1 RETURNING *`,
    [id],
  );

  res.json(result.rows[0]);
};
