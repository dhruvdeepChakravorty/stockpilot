import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  phone_no: z.string().min(1, "Phone number is required"),
});

export const updateSupplierSchema = z.object({
  name: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  phone_no: z.string().min(1).optional(),
});
