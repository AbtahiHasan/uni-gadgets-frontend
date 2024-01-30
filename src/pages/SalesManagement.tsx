/* eslint-disable @typescript-eslint/no-explicit-any */

import Heading from "@/components/shared/heading";
import { useGetAllGadgetsQuery } from "@/redux/features/gadgets/gadgetsApi";
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
import { useAddSaleMutation } from "@/redux/features/sales/SalesApi";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { GoSearch } from "react-icons/go";

const SalesManagement = () => {
  const [searchText, setSearchText] = useState("");
  const { data, refetch } = useGetAllGadgetsQuery(searchText);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [gadgetId, setGadgetId] = useState("");
  const [limit, setLimit] = useState(0);
  const [addSale] = useAddSaleMutation();
  console.log({ data });

  const sellGadget = (data: any) => {
    addSale({
      productId: gadgetId,
      quantity: parseInt(data.quantity),
      buyerName: data.buyerName,
      buyDate: data.buyDate,
    }).then((res: any) => {
      if (res.data.success) {
        reset();
        refetch();
        setOpen(false);

        toast.success("Sell successfully", { position: "top-right" });
      }
    });
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
          onClick={() => {
            setOpen(false);
            reset();
          }}
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
            max={limit}
            placeholder={`available quantity ${limit}`}
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
            label="Buy Date"
            name="buyDate"
            isPending={false}
            required={true}
            type="date"
          />
          <Button type="submit" className="mt-2 w-full">
            Sell
          </Button>
        </form>
      </div>
      <section>
        <form className="relative w-[80%] h-[40px] mx-auto rounded-s-full mt-6">
          <Input
            onChange={(e: any) => {
              setSearchText(e.target.value);
            }}
            className="w-full rounded-full pl-10 h-full"
            placeholder="search here"
          />
          <GoSearch className="absolute top-1/2 -translate-y-1/2 left-4" />
        </form>
      </section>
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
              quantity,
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
                  <p className="flex gap-2 mt-2">
                    <span className="font-bold">Quantity:</span>
                    {quantity}
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
                      setLimit(quantity);
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
