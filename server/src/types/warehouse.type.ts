import { z } from "zod";
export const warehouseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
});
export const updateWarehouseSchema = z.object({
  name: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
});