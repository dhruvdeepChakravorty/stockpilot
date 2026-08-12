import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type {
  CreateMovementProps,
  CreateStockInput,
  Item,
  Supplier,
  Warehouse,
} from "@/types/stock";
import {
  createStockMovement,
  getAllItems,
  getAllSuppliers,
  getAllWarehouses,
} from "@/api/stockApi";
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

  const [items, setItems] = useState<Item[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const results = await Promise.allSettled([
        getAllItems(),
        getAllWarehouses(),
        getAllSuppliers(),
      ]);

      if (results[0].status === "fulfilled") {
        setItems(results[0].value);
      } else {
        console.error("Failed to fetch items:", results[0].reason);
        toast.error("Failed to load items");
      }

      if (results[1].status === "fulfilled") {
        setWarehouses(results[1].value);
      } else {
        console.error("Failed to fetch warehouses:", results[1].reason);
        toast.error("Failed to load warehouses");
      }

      if (results[2].status === "fulfilled") {
        setSuppliers(results[2].value);
      } else {
        console.error("Failed to fetch suppliers:", results[2].reason);
        toast.error("Failed to load suppliers");
      }
    };
    if (isOpen) {
      fetchOptions();
    }
  }, [isOpen]);
  const numericFields = ["item_id", "warehouse_id", "supplier_id", "quantity"];
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    let processedValue: string | number | null = value;

    if (numericFields.includes(name)) {
      processedValue =
        value === "" ? (name === "supplier_id" ? null : "") : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      formData.item_id === "" ||
      formData.warehouse_id === "" ||
      formData.quantity === ""
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await createStockMovement(formData);
      onMovementAdded();
      toast.success("Movement Added Successfully");
      setIsOpen(false);
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
              <label htmlFor="item_id">Items</label>
              <select
                id="item_id"
                name="item_id"
                value={formData.item_id}
                onChange={handleChange}
              >
                <option value="">Select an item</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.sku})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="warehouse_id">Warehouses</label>
              <select
                id="warehouse_id"
                name="warehouse_id"
                value={formData.warehouse_id}
                onChange={handleChange}
              >
                <option value="">Select a Warehouse</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="supplier_id">Supplier (optional)</label>
              <select
                id="supplier_id"
                name="supplier_id"
                value={formData.supplier_id ?? ""}
                onChange={handleChange}
              >
                <option value="">Select a Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
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
