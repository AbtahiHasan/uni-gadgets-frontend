/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/components/shared/heading";
import { Button } from "@/components/ui/button";
import { useGetMyCartQuery } from "@/redux/features/cart/cartApi";
import { IoMdClose } from "react-icons/io";
const Cart = () => {
  const { data } = useGetMyCartQuery(undefined);

  const totalPrice = data?.data?.reduce(
    (a: number, b: any) => a + b?.price * b?.quantity,
    0
  );
  console.log({ totalPrice });
  return (
    <div className="max-w-[1200px] mx-auto">
      <Heading title="My Cart Page" />
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-8 col-span-12 p-10">
          <div className="flex justify-between items-center">
            <span className="font-bold">{data?.data?.length} item Added</span>
            <span className="font-bold">Total: ${totalPrice?.toFixed(2)}</span>
          </div>
          {Array.isArray(data?.data) && data?.data?.length === 0 && (
            <p className="mt-4 text-gray-500">No cart item available</p>
          )}
          {Array.isArray(data?.data) &&
            data?.data?.map((item: any, i: any) => {
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
                          <h2 className="">${item?.price}</h2>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Button
                          // onClick={() => handleQuantity(item._id, "dec")}
                          className=" hover:bg-black btn-sm text-xl bg-black text-white"
                          disabled={item.quantity === 1}
                        >
                          -
                        </Button>
                        <p>{item?.quantity}</p>
                        <Button
                          // onClick={() => handleQuantity(item._id, "inc")}
                          className=" hover:bg-black btn-sm text-xl bg-black text-white"
                          disabled={item?.quantity >= item?.product_quantity}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <button
                      // onClick={() => handleCartDelete(item?._id)}
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
            <button
              // onClick={handleCheckout}
              className={`${
                totalPrice === 0 ? "cursor-not-allowed" : ""
              } brand-btn mt-5 w-full py-1`}
              disabled={totalPrice === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
