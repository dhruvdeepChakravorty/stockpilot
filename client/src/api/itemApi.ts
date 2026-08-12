import type { CreateItemFormValues } from "@/types/items.types";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const createItem = async (data: CreateItemFormValues) => {
  const response = await axios.post(`${BASE_URL}/items`, data);
  return response.data;
};
