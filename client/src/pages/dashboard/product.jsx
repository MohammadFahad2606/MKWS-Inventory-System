import React, { useState } from "react";
import { Card, CardBody, Typography, Button, Input, Textarea, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

export function Product() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const toggleModal = () => setOpen(!open);

  const onSubmit = (data) => {
    console.log("Product Data:", data);
    reset();
    toggleModal();
  };

  return (
    <div className="p-4">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold">
          Products
        </Typography>
        <Button color="blue" onClick={toggleModal}>
          + Add New
        </Button>
      </div>

      {/* Products List Dummy */}
      <Card className="mb-6">
        <CardBody>
          <Typography>No products yet. Add new products using +Add New button.</Typography>
        </CardBody>
      </Card>

      {/* Modal Form */}
      <Dialog open={open} size="sm" handler={toggleModal}>
        <DialogHeader>Add New Product</DialogHeader>
        <DialogBody divider>
          <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input label="Product Name" {...register("name", { required: true })} />
            <Input label="Product ID" {...register("id", { required: true })} />
            <Input type="number" label="Buy Rate" {...register("buyRate", { required: true })} />
            <Input type="number" label="Initial Quantity" {...register("quantity", { required: true })} />
            <Textarea label="Description" {...register("description")} />
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={toggleModal}>
            Cancel
          </Button>
          <Button form="product-form" type="submit" color="green">
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Product;
