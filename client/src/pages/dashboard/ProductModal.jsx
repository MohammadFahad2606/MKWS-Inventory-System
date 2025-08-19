import React, { useEffect } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Input, Textarea, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

export function ProductModal({ open, toggle, onSubmit, defaultValues }) {
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} size="sm" handler={toggle}>
      <DialogHeader>{defaultValues?._id ? "Update Product" : "Add New Product"}</DialogHeader>
      <DialogBody divider>
        <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input label="Product Name" {...register("name", { required: true })} />
          <Input label="Product ID" {...register("productId", { required: true })} />
          <Input type="number" label="Buy Rate" {...register("buyRate", { required: true })} />
          <Input type="number" label="Initial Quantity" {...register("initialQuantity", { required: true })} />
          <Textarea label="Description" {...register("description")} />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={toggle}>Cancel</Button>
        <Button form="product-form" type="submit" color="green">{defaultValues?._id ? "Update" : "Save"}</Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ProductModal;
