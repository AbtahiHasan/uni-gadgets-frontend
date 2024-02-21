/* eslint-disable @typescript-eslint/no-explicit-any */
import FormFieldUtils from "@/components/shared/FormFieldUtils";
import Heading from "@/components/shared/heading";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/redux/features/auth/authSlice";
import {
  useGetMyCartQuery,
  useRemoveCartProductMutation,
  useUpdateQuantityMutation,
} from "@/redux/features/cart/cartApi";
import { useGetAllGadgetsQuery } from "@/redux/features/gadgets/gadgetsApi";
import { useAddSaleMutation } from "@/redux/features/sales/SalesApi";
import { useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { IoMdClose } from "react-icons/io";
const Cart = () => {
  const { data: cartData } = useGetMyCartQuery(undefined);
  const { register, handleSubmit, reset } = useForm();
  const [updateQuantity] = useUpdateQuantityMutation();
  const [removeCartProduct] = useRemoveCartProductMutation();
  const { data: gadgetData } = useGetAllGadgetsQuery(undefined);
  const user: any = useAppSelector(currentUser);
  const totalPrice = cartData?.data?.reduce(
    (a: number, b: any) => a + b?.price * b?.quantity,
    0
  );
  const [addSale, { isLoading }] = useAddSaleMutation();
  const sellGadget = (data: any) => {
    const cartIds = cartData?.data?.map((item: any) => item?._id);
    const productIds = cartData?.data?.map((item: any) => item?.product_id);
    console.log({ cartIds, productIds, data: data?.data });
    addSale({
      cartIds,
      productIds,
      userEmail: user?.email,
      buyerName: data.buyerName,
      phoneNumber: data?.phoneNumber,
      buyDate: data.buyDate,
    }).then((res: any) => {
      if (res.data.success) {
        reset();
        toast.success("parsed  successfully", { position: "top-right" });
      }
    });
  };
  console.log({ totalPrice });
  return (
    <div className="max-w-[1200px] mx-auto">
      <Heading title="Checkout" />
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-8 col-span-12 p-10">
          <div className="flex justify-between items-center">
            <span className="font-bold">
              {cartData?.data?.length} item Added
            </span>
            <span className="font-bold">Total: ${totalPrice?.toFixed(2)}</span>
          </div>
          {Array.isArray(cartData?.data) && cartData?.data?.length === 0 && (
            <p className="mt-4 text-gray-500">No cart item available</p>
          )}
          {Array.isArray(cartData?.data) &&
            cartData?.data?.map((item: any, i: any) => {
              const gadgetQuantity = gadgetData?.data?.find(
                (gadget: any) =>
                  gadget._id?.toString() === item.product_id.toString()
              )?.quantity;
              console.log({ gadgetQuantity, gadgetData: gadgetData?.data });
              return (
                <div key={i} className="p-2 border mt-4 relative">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 ">
                      <img
                        className="w-[70px]"
                        src={item?.product_image}
                        alt="image"
                      />
                      <div className="flex flex-col justify-between ps-3">
                        <div>
                          <h3 className="font-bold">
                            {item?.product_name?.length > 54
                              ? item?.product_name.slice(0, 54)
                              : item?.product_name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <h2 className="">${item?.price}</h2>
                            <p>Quantities: {gadgetQuantity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() =>
                            updateQuantity({ type: "dec", id: item._id })
                          }
                          className=" hover:bg-black btn-sm text-xl bg-black text-white"
                          disabled={item.quantity === 1}
                        >
                          -
                        </Button>
                        <p>{item?.quantity}</p>
                        <Button
                          onClick={() =>
                            updateQuantity({ type: "inc", id: item._id })
                          }
                          className=" hover:bg-black btn-sm text-xl bg-black text-white"
                          disabled={item?.quantity >= gadgetQuantity}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <button
                      onClick={() => removeCartProduct(item?._id)}
                      className="p-2 bg-red-500 text-white rounded-full"
                    >
                      <IoMdClose />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="md:col-span-4 col-span-12 p-10 flex flex-col gap-2">
          <form onSubmit={handleSubmit(sellGadget)}>
            <h3 className="text-black font-bold">Product Details</h3>
            <div>
              <div className="flex justify-between items-start">
                <p>Total Price</p>
                <p>{totalPrice <= 0 ? "0" : totalPrice?.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-start">
                <p>Discount</p>
                <p>0</p>
              </div>
              <div className="flex justify-between items-start">
                <p>Tax</p>
                <p>0</p>
              </div>
              <hr />
              <div className="flex justify-between items-start mt-5">
                <p>Order Total</p>
                <p>${totalPrice?.toFixed(2)}</p>
              </div>
            </div>

            <h3 className="mt-2  text-black font-bold">Customer Details</h3>
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
              label="Phone Number"
              name="phoneNumber"
              isPending={false}
              required={true}
              type="text"
              placeholder="Enter your phone number"
            />
            <FormFieldUtils
              register={register}
              label="Buy Date"
              name="buyDate"
              isPending={false}
              required={true}
              type="date"
            />
            <Button
              type="submit"
              className={`${
                totalPrice === 0 ? "cursor-not-allowed" : ""
              } brand-btn mt-5 w-full py-1`}
              disabled={totalPrice === 0 || isLoading}
            >
              Buy
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
