/* eslint-disable @typescript-eslint/no-explicit-any */

import Heading from "@/components/shared/heading";
import { useGetGadgetsQuery } from "@/redux/features/gadgets/gadgetsApi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FormFieldUtils from "@/components/shared/FormFieldUtils";
import { useForm } from "react-hook-form";

const SalesManagement = () => {
  const { data } = useGetGadgetsQuery(null);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [gadgetId, setGadgetId] = useState("");
  console.log({ data });

  const sellGadget = (data: any) => {
    console.log({ data, gadgetId });
  };
  return (
    <main
      className={`${
        open
          ? "relative before:contents-[''] before:w-full before:fixed before:h-screen before:bg-[#00000028] before:z-10 before:top-0 before:left-0"
          : ""
      } `}
    >
      <Heading title="Sales Management" />
      <div
        className={`${
          open ? "" : "hidden"
        } p-5 rounded  z-50  border bg-white fixed md:w-[50%] w-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        <IoMdCloseCircleOutline
          onClick={() => setOpen(false)}
          className="text-red-500 text-3xl cursor-pointer ml-auto"
        />
        <form onSubmit={handleSubmit(sellGadget)}>
          <FormFieldUtils
            register={register}
            label="Quantity"
            name="quantity"
            isPending={false}
            required={true}
            type="number"
            min={0}
            placeholder="quantity"
          />
          <FormFieldUtils
            register={register}
            label="Name"
            name="buyerName"
            isPending={false}
            required={true}
            type="text"
            placeholder="Enter your name"
          />
          <FormFieldUtils
            register={register}
            label="Quantity"
            name="quantity"
            isPending={false}
            required={true}
            type="date"
          />
          <Button type="submit" className="mt-2 w-full">
            Sell
          </Button>
        </form>
      </div>
      <section className="md:grid grid-cols-3 gap-5 mt-10">
        {Array.isArray(data?.data) &&
          data?.data?.map((gadget: any) => {
            const {
              _id,
              name,
              price,
              releaseDate,
              brand,
              modelNumber,
              category,
            } = gadget;
            return (
              <Card key={_id}>
                <CardHeader />
                <CardContent>
                  <h2 className="text-xl my-2 font-bold">{name}</h2>
                  <hr />
                  <p className="flex gap-2 mt-2">
                    <span className="font-bold">Price:</span>
                    {price}
                  </p>
                  <p className="flex gap-2">
                    <span className="font-bold">Release Date:</span>

                    <span>{moment(releaseDate).format("DD/MM/YYYY")}</span>
                  </p>
                  <p className="flex gap-2">
                    <span className="font-bold">Brand:</span>
                    {brand}
                  </p>
                  <p className="flex gap-2">
                    <span className="font-bold">Model:</span>
                    {modelNumber}
                  </p>
                  <p className="flex gap-2">
                    <span className="font-bold">Category:</span>
                    {category}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setGadgetId(_id);
                    }}
                    className="w-full"
                  >
                    Sell
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </section>
    </main>
  );
};

export default SalesManagement;
