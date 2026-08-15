import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  reorder_threshold: z
    .number()
    .nonnegative("Reorder threshold cannot be negative")
    .optional()
    .default(0),
});

export const updateItemSchema = z.object({
  name: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
  reorder_threshold: z
    .number()
    .nonnegative("Reorder threshold cannot be negative")
    .optional(),
});
