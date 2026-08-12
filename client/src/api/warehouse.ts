import type { CreateWarehouseFormValues } from "@/types/warehouse.types";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const createWarehouse = async (data: CreateWarehouseFormValues) => {
  const response = await axios.post(`${BASE_URL}/warehouses`, data);
  return response.data;
};
