import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { CreateMovementProps, CreateStockInput } from "@/types/stock";
import { createStockMovement } from "@/api/stockApi";
import { toast } from "sonner";

export const CreateStockMovementDialog = ({
  onMovementAdded,
}: CreateMovementProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<CreateStockInput>({
    item_id: 0,
    warehouse_id: 0,
    supplier_id: null,
    quantity: 0,
    movement_type: "restock",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
     [name]: e.target.type === "number" ? Number(value) : value,
    }));
  };
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await createStockMovement(formData);
      onMovementAdded();
      toast.success("Movement Added Successfully");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger render={<Button>Add Movement</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Stock Movement</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="item_id">Item ID</label>
              <input
                id="item_id"
                name="item_id"
                type="number"
                value={formData.item_id}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="warehouse_id">Warehouse ID</label>
              <input
                id="warehouse_id"
                name="warehouse_id"
                type="number"
                value={formData.warehouse_id}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="supplier_id">Supplier ID (optional)</label>
              <input
                id="supplier_id"
                name="supplier_id"
                type="number"
                value={formData.supplier_id ?? ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="movement_type">Movement Type</label>
              <select
                id="movement_type"
                name="movement_type"
                value={formData.movement_type}
                onChange={handleChange}
              >
                <option value="restock">Restock</option>
                <option value="sale">Sale</option>
                <option value="transfer">Transfer</option>
                <option value="adjustment">Adjustment</option>
              </select>
            </div>

            <Button type="submit">Add Movement</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
