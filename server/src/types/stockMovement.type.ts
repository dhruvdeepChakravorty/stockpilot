import { z } from "zod";

export const createMovementSchema = z.object({
  item_id: z.number(),
  warehouse_id: z.number(),
  supplier_id: z.number().nullable().optional(),
  quantity: z.number(),
  movement_type: z.enum(["restock", "sale", "transfer", "adjustment"]),
});

