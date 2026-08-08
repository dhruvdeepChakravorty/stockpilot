import axios from "axios";
import type {
  StockMovement,
  LowStockItem,
  CreateStockInput,
} from "../types/stock";

const BASE_URL = "http://localhost:3000/stock";

export const getAllMovements = async (): Promise<StockMovement[]> => {
  const response = await axios.get<StockMovement[]>(`${BASE_URL}/movements`);
  return response.data;
};

export const getLowStock = async (): Promise<LowStockItem[]> => {
  const response = await axios.get<LowStockItem[]>(`${BASE_URL}/low`);
  return response.data;
};

export const createStockMovement = async (data: CreateStockInput) => {
  const response = await axios.post(`${BASE_URL}/movements`, data);
  return response.data;
};
