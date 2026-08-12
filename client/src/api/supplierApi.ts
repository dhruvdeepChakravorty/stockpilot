import type { CreateSupplierFormValues } from "@/types/suppllier.types";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const createSupplier = async (data: CreateSupplierFormValues) => {
  const response = await axios.post(`${BASE_URL}/suppliers`, data);
  return response.data;
};
