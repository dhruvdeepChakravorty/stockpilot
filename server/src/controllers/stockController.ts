import { Request, Response } from "express";
import { pool } from "../config/dbConnect";
import { createMovementSchema } from "../types/stockMovement.type";
import { AppError } from "../utils/AppError";

export const getLowStock = async (req: Request, res: Response) => {
  const result = await pool.query(`
       SELECT items.name AS item_name, warehouses.name AS warehouse_name, items.reorder_threshold, SUM(quantity) AS current_stock
FROM stock_movements
JOIN warehouses ON stock_movements.warehouse_id = warehouses.id
JOIN items ON stock_movements.item_id = items.id
GROUP BY items.name, warehouses.name, items.reorder_threshold
HAVING SUM(quantity) <= items.reorder_threshold; `);
  res.json(result.rows);
};

export const getAllStockMovement = async (req: Request, res: Response) => {
  const result = await pool.query(`
        SELECT stock_movements.id,items.name AS item_name, warehouses.name AS warehouse_name,
        suppliers.name AS supplier_name, stock_movements.quantity, stock_movements.movement_type, 
       stock_movements.created_at
        FROM stock_movements
        JOIN warehouses ON stock_movements.warehouse_id = warehouses.id
        JOIN items ON stock_movements.item_id = items.id
        LEFT JOIN suppliers ON stock_movements.supplier_id=suppliers.id
        ORDER BY stock_movements.created_at DESC`);
  res.json(result.rows);
};

export const createStockMovement = async (req: Request, res: Response) => {
  const parsed = createMovementSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }
  const { item_id, warehouse_id, supplier_id, quantity, movement_type } =
    parsed.data;

  const result = await pool.query(
    `INSERT INTO stock_movements (item_id, warehouse_id, supplier_id, quantity, movement_type) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [item_id, warehouse_id, supplier_id ?? null, quantity, movement_type],
  );
  res.status(201).json(result.rows[0]);
};
