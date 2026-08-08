import type { StockMovementTableProps } from "@/types/stock";


export const StockMovementTable = ({ movements }: StockMovementTableProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Warehouse</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Movement Type</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((movement) => (
            <tr key={movement.id}>
              <td>{movement.item_name}</td>
              <td>{movement.warehouse_name}</td>
              <td>{movement.supplier_name || "-"}</td>
              <td>{movement.quantity}</td>
              <td>{movement.movement_type}</td>
              <td>{new Date(movement.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
