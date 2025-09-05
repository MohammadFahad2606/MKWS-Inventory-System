import React, { useEffect } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Button,
  Typography,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';

export function ProductModal({
  open,
  toggle,
  onSubmit,
  defaultValues,
  existingProductIds = [],
  passReset,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  // reset ko parent tak bhejna
  useEffect(() => {
    if (typeof passReset === 'function') {
      passReset(reset);
    }
  }, [reset, passReset]);

  const onFormSubmit = async (data) => {
    // Frontend uniqueness check
    const isDuplicate =
      existingProductIds.includes(data.productId) &&
      (!defaultValues?._id || defaultValues.productId !== data.productId);

    if (isDuplicate) {
      setError('productId', {
        type: 'manual',
        message: 'Product ID must be unique',
      });
      return;
    }

    clearErrors('productId');
    // await onSubmit(data); // parent se response handle hoga
    const success = await onSubmit(data); // parent se response aayega
    if (success) {
      reset({}); // ✅ form clear
      toggle(); // ✅ modal close
    }
  };

  return (
    <Dialog
      open={open}
      size="sm"
      handler={toggle}
      className="rounded-xl"
      style={{
        background: 'var(--color-background)',
        color: 'var(--color-text)',
      }}
    >
      <DialogHeader style={{ color: 'var(--color-text)' }}>
        {defaultValues?._id ? 'Update Product' : 'Add New Product'}
      </DialogHeader>

      <DialogBody divider>
        <form
          id="product-form"
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Product Name */}
          <div>
            <Input
              label="Product Name"
              {...register('name', {
                required: 'Product Name is required',
                validate: (value) =>
                  value.trim() !== '' || 'Cannot be empty spaces',
              })}
              style={{ color: 'var(--color-text)' }}
            />
            {errors.name && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.name.message}
              </Typography>
            )}
          </div>

          {/* Product ID */}
          <div>
            <Input
              label="Product ID"
              {...register('productId', {
                required: 'Product ID is required',
                validate: (value) =>
                  value.trim() !== '' || 'Cannot be empty spaces',
              })}
              style={{ color: 'var(--color-text)' }}
            />
            {errors.productId && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.productId.message}
              </Typography>
            )}
          </div>

          {/* Buy Rate */}
          <div>
            <Input
              type="number"
              label="Buy Rate"
              {...register('buyRate', {
                required: 'Buy Rate is required',
                valueAsNumber: true,
                min: {
                  value: 0.01,
                  message: 'Buy Rate must be greater than 0',
                },
              })}
              style={{ color: 'var(--color-text)' }}
            />
            {errors.buyRate && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.buyRate.message}
              </Typography>
            )}
          </div>

          {/* Initial Quantity */}
          <div>
            <Input
              type="number"
              label="Initial Quantity"
              {...register('initialQuantity', {
                required: 'initial Quantity is required',
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: 'Buy Rate must be 0',
                },
              })}
              style={{ color: 'var(--color-text)' }}
            />
            {errors.initialQuantity && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.initialQuantity.message}
              </Typography>
            )}
          </div>

          {/* Description */}
          <div>
            <Textarea
              label="Description"
              {...register('description')}
              style={{ color: 'var(--color-mutedForeground)' }}
            />
          </div>
        </form>
      </DialogBody>

      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={toggle}
          style={{ color: 'var(--color-error)' }}
        >
          Cancel
        </Button>
        <Button
          form="product-form"
          type="submit"
          color="green"
          style={{ color: 'var(--color-primaryForeground)' }}
        >
          {defaultValues?._id ? 'Update' : 'Save'}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ProductModal;
