import axios from "axios";
import type {
  StockMovement,
  LowStockItem,
  CreateStockInput,
  Item,
  Supplier,
  Warehouse,
} from "../types/stock";

const BASE_URL = "http://localhost:3000";

export const getAllMovements = async (): Promise<StockMovement[]> => {
  const response = await axios.get<StockMovement[]>(`${BASE_URL}/stock/movements`);
  return response.data;
};

export const getLowStock = async (): Promise<LowStockItem[]> => {
  const response = await axios.get<LowStockItem[]>(`${BASE_URL}/stock/low`);
  return response.data;
};

export const createStockMovement = async (data: CreateStockInput) => {
  const response = await axios.post(`${BASE_URL}/stock/movements`, data);
  return response.data;
};
export const getAllItems = async (): Promise<Item[]> => {
  const response= await axios.get(`${BASE_URL}/items`)
  return response.data
};

export const getAllWarehouses = async (): Promise<Warehouse[]> => {
   const response= await axios.get(`${BASE_URL}/warehouses`)
  return response.data
};

export const getAllSuppliers = async (): Promise<Supplier[]> => {
  const response= await axios.get(`${BASE_URL}/suppliers`)
  return response.data
};
