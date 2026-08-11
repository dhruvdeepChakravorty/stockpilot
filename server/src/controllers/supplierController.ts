import { Request, Response } from "express";
import { pool } from "../config/dbConnect";
import { supplierSchema } from "../types/supplier.type";
import { AppError } from "../utils/AppError";

export const getAllSuppliers = async (req: Request, res: Response) => {
  const result = await pool.query(`SELECT id,name FROM suppliers`);
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
