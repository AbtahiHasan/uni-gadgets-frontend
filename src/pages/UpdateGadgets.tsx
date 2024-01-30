/* eslint-disable @typescript-eslint/no-explicit-any */
import DuplicateModal from "@/components/DuplicateModal";
import FormFieldFormUpdate from "@/components/shared/FormFieldFormUpdate";

import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import Heading from "@/components/shared/heading";
import { Button } from "@/components/ui/button";
import {
  useGetSingleGadgetQuery,
  useUpdateGadgetMutation,
} from "@/redux/features/gadgets/gadgetsApi";
import { useState, useTransition } from "react";

import { useParams } from "react-router-dom";

const UpdateGadgets = () => {
  const [error, setError] = useState<string | undefined>("");

  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [updateGadget] = useUpdateGadgetMutation();
  const { id } = useParams();
  const { data } = useGetSingleGadgetQuery(id);
  const {
    name,
    price,
    quantity,
    releaseDate,
    brand,
    modelNumber,
    category,
    operatingSystem,
    connectivity,
    powerSource,
    features,
  } = data?.data || {};

  const { cameraResolution, storageCapacity } = features || {};

  const onSubmit = (e: any) => {
    setError("");
    setSuccess("");
    const form = e.target;
    const gadget = {
      name: form.name.value,
      price: parseFloat(form.price.value),
      quantity: parseInt(form.quantity.value),
      releaseDate: form.releaseDate?.value || releaseDate,
      brand: form.brand.value,
      modelNumber: form.modelNumber.value,
      category: form.category.value,
      operatingSystem: form.operatingSystem.value,
      connectivity: form.connectivity.value,
      powerSource: form.powerSource.value,
      features: {
        cameraResolution: parseFloat(form.cameraResolution.value),
        storageCapacity: parseFloat(form.storageCapacity.value),
      },
    };

    startTransition(() => {
      updateGadget({ id, payload: gadget })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((data: any) => {
          if (data?.data.error) {
            setError(data.error);
          }
          if (data?.data?.success) {
            setSuccess(data?.data?.message);
          }
        })
        .catch((error: any) => {
          console.log(error);
          setError("Something went wrong");
        });
    });
  };
  return (
    <main>
      <Heading title="Manage Gadgets" />
      <DuplicateModal open={open} setOpen={setOpen} data={data?.data || {}} />

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="md:grid md:grid-cols-3 md:gap-5">
          <FormFieldFormUpdate
            type="text"
            name="name"
            label="Name"
            isPending={isPending}
            defaultValue={name}
          />
          <FormFieldFormUpdate
            type="number"
            name="price"
            label="Price"
            isPending={isPending}
            defaultValue={price}
          />
          <FormFieldFormUpdate
            type="number"
            name="quantity"
            label="Quantity"
            isPending={isPending}
            defaultValue={quantity}
          />
          <FormFieldFormUpdate
            type="date"
            name="releaseDate"
            label="Release Date"
            isPending={isPending}
            defaultValue={releaseDate}
          />

          <FormFieldFormUpdate
            type="text"
            name="brand"
            label="Brand"
            isPending={isPending}
            defaultValue={brand}
          />
          <FormFieldFormUpdate
            type="text"
            name="modelNumber"
            label="Model Number"
            isPending={isPending}
            defaultValue={modelNumber}
          />
          <FormFieldFormUpdate
            type="text"
            name="category"
            label="Category"
            isPending={isPending}
            defaultValue={category}
          />
          <FormFieldFormUpdate
            type="text"
            name="operatingSystem"
            label="Operating System"
            isPending={isPending}
            required={false}
            defaultValue={operatingSystem}
          />
          <FormFieldFormUpdate
            type="text"
            name="connectivity"
            label="Connectivity"
            isPending={isPending}
            required={false}
            defaultValue={connectivity}
          />
          <FormFieldFormUpdate
            type="text"
            name="powerSource"
            label="Power Source"
            isPending={isPending}
            required={false}
            defaultValue={powerSource}
          />
          <FormFieldFormUpdate
            type="number"
            name="cameraResolution"
            label="Camera Resolution"
            isPending={isPending}
            required={false}
            defaultValue={cameraResolution}
          />
          <FormFieldFormUpdate
            type="number"
            name="storageCapacity"
            label="Storage Capacity"
            isPending={isPending}
            required={false}
            defaultValue={storageCapacity}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          Update Gadget
        </Button>
        <Button onClick={() => setOpen(true)} type="button">
          Duplicate
        </Button>
      </form>
    </main>
  );
};

export default UpdateGadgets;
