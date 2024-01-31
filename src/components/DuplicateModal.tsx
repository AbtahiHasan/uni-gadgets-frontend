/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useTransition } from "react";

import { IoMdCloseCircleOutline } from "react-icons/io";
import { FormError } from "./shared/form-error";
import { FormSuccess } from "./shared/form-success";
import { Button } from "./ui/button";
import FormFieldFormUpdate from "./shared/FormFieldFormUpdate";
import { useAddGadgetMutation } from "@/redux/features/gadgets/gadgetsApi";
import toast from "react-hot-toast";

const DuplicateModal = ({ open, data, setOpen }: any) => {
  const [error, setError] = useState<string | undefined>("");
  const [addGadget] = useAddGadgetMutation();
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

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
  } = data;

  const { cameraResolution, storageCapacity } = features || {};

  const onSubmit = (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const form = e.target;
    const gadget = {
      name: form.name.value,
      price: parseFloat(form.price.value),
      quantity: parseInt(form.quantity.value),
      releaseDate: form.releaseDate.value,
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
      addGadget(gadget)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((data: any) => {
          if (data?.data.error) {
            setError(data.error);
          }
          if (data?.data?.success) {
            setSuccess(data?.data?.message);
            if (data?.data?.success) {
              setSuccess(data?.data?.message);

              toast.success("gadget duplicate successfully", {
                position: "top-right",
              });
            }
          }
        })
        .catch((error: any) => {
          console.log(error);
          setError("Something went wrong");
        });
    });
  };
  return (
    <section
      className={`${
        open
          ? "relative before:contents-[''] before:w-full before:fixed before:h-screen before:bg-[#00000028] before:z-10 before:top-0 before:left-0"
          : ""
      } `}
    >
      <form
        onSubmit={onSubmit}
        className={`${
          open ? "" : "hidden"
        } p-5 rounded  z-50  border bg-white fixed md:w-[50%] w-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        <IoMdCloseCircleOutline
          onClick={() => {
            setOpen(false);
          }}
          className="text-red-500 text-3xl cursor-pointer ml-auto"
        />
        <div className="md:grid md:grid-cols-3 md:gap-5">
          <FormFieldFormUpdate
            type="text"
            name="name"
            label="Name"
            isPending={isPending}
            defaultValue={name}
            required={true}
          />
          <FormFieldFormUpdate
            type="number"
            name="price"
            label="Price"
            isPending={isPending}
            defaultValue={price}
            required={true}
          />
          <FormFieldFormUpdate
            type="number"
            name="quantity"
            label="Quantity"
            isPending={isPending}
            defaultValue={quantity}
            required={true}
          />
          <FormFieldFormUpdate
            type="date"
            name="releaseDate"
            label="Release Date"
            isPending={isPending}
            defaultValue={releaseDate}
            required={true}
          />

          <FormFieldFormUpdate
            type="text"
            name="brand"
            label="Brand"
            isPending={isPending}
            defaultValue={brand}
            required={true}
          />
          <FormFieldFormUpdate
            type="text"
            name="modelNumber"
            label="Model Number"
            isPending={isPending}
            defaultValue={modelNumber}
            required={true}
          />
          <FormFieldFormUpdate
            type="text"
            name="category"
            label="Category"
            isPending={isPending}
            defaultValue={category}
            required={true}
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
        <Button disabled={isPending} type="submit" className="w-full mt-3">
          Create Variant
        </Button>
      </form>
    </section>
  );
};

export default DuplicateModal;
