import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createItemSchema,
  type CreateItemFormValues,
} from "../types/items.types";
import { createItem } from "@/api/itemApi";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface CreateItemDialogProps {
  onItemAdded?: () => void;
}

export const CreateItemDialog = ({ onItemAdded }: CreateItemDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateItemFormValues>({
    resolver: zodResolver(createItemSchema),
  });

  const onSubmit = async (data: CreateItemFormValues) => {
    try {
      await createItem({
        ...data,
        reorder_threshold: data.reorder_threshold ?? 0,
      });
      toast.success("Item created successfully");
      onItemAdded?.();
      reset();
      setIsOpen(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button>Add Item</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" {...register("name")} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="sku">SKU</label>
            <input id="sku" {...register("sku")} />
            {errors.sku && <p>{errors.sku.message}</p>}
          </div>

          <div>
            <label htmlFor="reorder_threshold">Reorder Threshold</label>
            <input
              id="reorder_threshold"
              type="number"
              {...register("reorder_threshold", { valueAsNumber: true })}
            />
            {errors.reorder_threshold && (
              <p>{errors.reorder_threshold.message}</p>
            )}
          </div>

          <Button type="submit">Add Item</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
