import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  createWarehouseSchema,
  type CreateWarehouseFormValues,
} from "@/types/warehouse.types";
import { createWarehouse } from "@/api/warehouse";

interface CreateWarehouseDialogProps {
  onWarehouseAdded?: () => void;
}

export const CreateWarehouseDialog = ({
  onWarehouseAdded,
}: CreateWarehouseDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createWarehouseSchema),
  });

  const onSubmit = async (data: CreateWarehouseFormValues) => {
    try {
      await createWarehouse(data);
      toast.success("Supplier Added Successfully");
      onWarehouseAdded?.();
      reset();
      setIsOpen(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button>Add Warehouse</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Warehouse</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" {...register("name")} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input id="address" {...register("address")} />
            {errors.address && <p>{errors.address.message}</p>}
          </div>

          <Button type="submit">Add Warehouse</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
