/* eslint-disable @typescript-eslint/no-explicit-any */
import FormFieldUtils from "@/components/shared/FormFieldUtils";
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import Heading from "@/components/shared/heading";
import { Button } from "@/components/ui/button";

import { useAddGadgetMutation } from "@/redux/features/gadgets/gadgetsApi";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddGadgets = () => {
  const [error, setError] = useState<string | undefined>("");
  const [addGadget] = useAddGadgetMutation();
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (data: any) => {
    const imageFile = { image: data.image[0] };
    axios
      .post(import.meta.env.VITE_IMAGE_HOSTING_API, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data?.success) {
          // now send the menu item data to the server with the image url

          setError("");
          setSuccess("");
          console.log(data);
          const gadget = {
            name: data.name,
            price: parseFloat(data.price),
            product_image: res.data.data.display_url,
            quantity: parseInt(data.quantity),
            releaseDate: data.releaseDate,
            brand: data.brand,
            modelNumber: data.modelNumber,
            category: data.category,
            operatingSystem: data.operatingSystem,
            connectivity: data.connectivity,
            powerSource: data.powerSource,
            features: {
              cameraResolution: parseFloat(data.cameraResolution),
              storageCapacity: parseFloat(data.storageCapacity),
            },
          };

          startTransition(() => {
            addGadget(gadget)
              .then((data: any) => {
                console.log("gadgets", data?.data?.data);
                if (data?.data.error) {
                  reset();
                  setError(data.error);
                }
                if (data?.data?.success) {
                  reset();
                  setSuccess(data?.data?.message);
                }
              })
              .catch((error) => {
                console.log(error);
                setError("Something went wrong");
              });
          });
        }
      });
  };

  return (
    <main>
      <Heading title="Add Gadgets" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="md:grid md:grid-cols-3 md:gap-5">
          <FormFieldUtils
            register={register}
            type="text"
            name="name"
            label="Name"
            isPending={isPending}
            required={true}
          />
          <FormFieldUtils
            register={register}
            type="file"
            name="image"
            label="Image"
            isPending={isPending}
            required={true}
          />
          <FormFieldUtils
            register={register}
            type="number"
            name="price"
            label="Price"
            isPending={isPending}
            required={true}
          />
          <FormFieldUtils
            register={register}
            type="number"
            name="quantity"
            label="Quantity"
            isPending={isPending}
            required={true}
          />
          <FormFieldUtils
            register={register}
            type="date"
            name="releaseDate"
            label="Release Date"
            isPending={isPending}
            required={true}
          />

          <FormFieldUtils
            register={register}
            type="text"
            name="brand"
            label="Brand"
            isPending={isPending}
            required={true}
          />
          <FormFieldUtils
            register={register}
            type="text"
            name="modelNumber"
            label="Model Number"
            isPending={isPending}
            required={true}
          />
          <FormFieldUtils
            register={register}
            type="text"
            name="category"
            label="Category"
            isPending={isPending}
            required={true}
          />
          <FormFieldUtils
            register={register}
            type="text"
            name="operatingSystem"
            label="Operating System"
            isPending={isPending}
            required={false}
          />
          <FormFieldUtils
            register={register}
            type="text"
            name="connectivity"
            label="Connectivity"
            isPending={isPending}
            required={false}
          />
          <FormFieldUtils
            register={register}
            type="text"
            name="powerSource"
            label="Power Source"
            isPending={isPending}
            required={false}
          />
          <FormFieldUtils
            register={register}
            type="number"
            name="cameraResolution"
            label="Camera Resolution"
            isPending={isPending}
            required={false}
          />
          <FormFieldUtils
            register={register}
            type="number"
            name="storageCapacity"
            label="Storage Capacity"
            isPending={isPending}
            required={false}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          Add Product
        </Button>
      </form>
    </main>
  );
};

export default AddGadgets;
