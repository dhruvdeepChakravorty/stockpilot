export interface StockMovement {
  id: number;
  item_name: string;
  warehouse_name: string;
  supplier_name: string | null;
  quantity: number;
  movement_type: string;
  created_at: string;
}

export interface LowStockItem {
  item_name: string;
  warehouse_name: string;
  reorder_threshold: number;
  current_stock: number;
}

export interface CreateStockInput{
  item_id: number;
  warehouse_id: number;
  supplier_id: number | null;
  quantity: number;
  movement_type: string;
}
export interface StockMovementTableProps {
  movements: StockMovement[];
}
export interface CreateMovementProps{
  onMovementAdded:() => void;
}