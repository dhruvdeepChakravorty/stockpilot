import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { LowStockItem } from "@/types/stock";
import { getLowStock } from "@/api/stockApi";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export const LowStockDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lowStock, setLowStock] = useState<LowStockItem[]>([]);

  const handleClick = async () => {
    try {
      const data = await getLowStock();
      setLowStock(data);
      setIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={handleClick}>Show Low Stock</Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Low Stock Items</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Reorder Threshold</TableHead>
                <TableHead>Current Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStock.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell>{item.warehouse_name}</TableCell>
                  <TableCell>{item.reorder_threshold}</TableCell>
                  <TableCell>{item.current_stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
};
