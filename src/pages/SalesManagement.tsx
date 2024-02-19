/* eslint-disable @typescript-eslint/no-explicit-any */

import Heading from "@/components/shared/heading";
import { useGetAllGadgetsQuery } from "@/redux/features/gadgets/gadgetsApi";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { GoSearch } from "react-icons/go";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";

const SalesManagement = () => {
  const [searchText, setSearchText] = useState("");
  const { data, refetch } = useGetAllGadgetsQuery(searchText);

  const [AddToCart, { isLoading }] = useAddToCartMutation();
  console.log({ data });

  const createCart = (data: any) => {
    AddToCart(data).then((res: any) => {
      if (res.data?.success) {
        refetch();
        toast.success("add to successfully", { position: "top-right" });
      }
    });
  };
  return (
    <main>
      <Heading title="Sales Management" />

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
              product_image,
              releaseDate,
              brand,
              modelNumber,
              category,
              quantity,
            } = gadget;
            return (
              <Card key={_id}>
                <CardHeader>
                  <img src={product_image} alt="gadget image" />
                </CardHeader>
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
                      createCart({
                        product_id: _id,
                        product_name: name,
                        product_image,
                        price,
                        quantity: 1,
                        product_quantity: quantity,
                      });
                    }}
                    className="w-full"
                    disabled={quantity === 0 || isLoading}
                  >
                    add to cart
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
