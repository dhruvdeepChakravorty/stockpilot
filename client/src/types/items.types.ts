import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  reorder_threshold: z
    .number()
    .nonnegative("Reorder threshold cannot be negative")
    .optional()
    
});

export type CreateItemFormValues = z.infer<typeof createItemSchema>;
