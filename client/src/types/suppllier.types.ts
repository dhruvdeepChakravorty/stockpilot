import { z } from "zod";

export const createSupplierSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  phone_no: z.string().min(1, "Phone number is required"),
});

export type CreateSupplierFormValues = z.infer<typeof createSupplierSchema>;