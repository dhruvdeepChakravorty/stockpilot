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
  createSupplierSchema,
  type CreateSupplierFormValues,
} from "@/types/suppllier.types";
import { createSupplier } from "@/api/supplierApi";

interface CreateSupplierDialogProps {
  onSupplierAdded?: () => void;
}
export const CreateSupplierDialog = ({
  onSupplierAdded,
}: CreateSupplierDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createSupplierSchema),
  });

  const onSubmit = async (data: CreateSupplierFormValues) => {
    try {
      await createSupplier(data);
      toast.success("Supplier Added Successfully");
      onSupplierAdded?.();
      reset();
      setIsOpen(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button>Add Supplier</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Supplier</DialogTitle>
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

          <div>
            <label htmlFor="phone_no">Phone No</label>
            <input id="phone_no" {...register("phone_no")} />
            {errors.phone_no && <p>{errors.phone_no.message}</p>}
          </div>

          <Button type="submit">Add Supplier</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
