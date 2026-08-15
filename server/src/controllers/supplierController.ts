import { Request, Response } from "express";
import { pool } from "../config/dbConnect";
import { supplierSchema, updateSupplierSchema } from "../types/supplier.type";
import { AppError } from "../utils/AppError";

export const getAllSuppliers = async (req: Request, res: Response) => {
  const result = await pool.query(
    `SELECT id,name FROM suppliers WHERE deleted_at IS NULL`,
  );
  res.json(result.rows);
};

export const createSupplier = async (req: Request, res: Response) => {
  const parsed = supplierSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }
  const { name, address, phone_no } = parsed.data;

  const result = await pool.query(
    `INSERT INTO suppliers (name,address,phone_no) VALUES ($1,$2,$3) RETURNING *`,
    [name, address, phone_no],
  );
  res.status(201).json(result.rows[0]);
};

export const updateSupplier = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsed = updateSupplierSchema.safeParse(req.body);
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
  if (parsed.data.phone_no !== undefined) {
    updates.push(`phone_no = $${paramIndex}`);
    values.push(parsed.data.phone_no);
    paramIndex++;
  }

  if (updates.length === 0) {
    throw new AppError("No fields provided to update", 400);
  }

  values.push(id);

  const query = `
  UPDATE suppliers
  SET ${updates.join(", ")}
  WHERE id = $${paramIndex}
  RETURNING *  `;

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    throw new AppError("Supplier not found", 404);
  }

  res.json(result.rows[0]);
};

export const deleteSupplier = async (req: Request, res: Response) => {
  const { id } = req.params;

  const existing = await pool.query(
    `SELECT deleted_at FROM suppliers WHERE id = $1`,
    [id],
  );

  if (existing.rows.length === 0) {
    throw new AppError("Supplier not found", 404);
  }

  if (existing.rows[0].deleted_at !== null) {
    throw new AppError("Supplier is already deleted", 400);
  }

  const result = await pool.query(
    `UPDATE suppliers SET deleted_at = NOW() WHERE id = $1 RETURNING *`,
    [id],
  );

  res.json(result.rows[0]);
};
