import { z } from "zod";
export const createWarehouseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
});

export type CreateWarehouseFormValues = z.infer<typeof createWarehouseSchema>;
