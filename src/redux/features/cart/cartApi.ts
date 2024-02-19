import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/cart/create-cart",
        method: "POST",
        body: cartInfo,
      }),
      invalidatesTags: ["gadgets"],
    }),
    getMyCart: builder.query({
      query: () => ({
        url: `/cart/get-carts`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddToCartMutation, useGetMyCartQuery } = cartApi;
