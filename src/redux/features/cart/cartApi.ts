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
    updateQuantity: builder.mutation({
      query: ({ type, id }) => ({
        url: `/cart/update-quantity/${id}`,
        method: "PATCH",
        body: { type },
      }),
      invalidatesTags: ["cart"],
    }),
    getMyCart: builder.query({
      query: () => ({
        url: `/cart/get-carts`,
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    removeCartProduct: builder.mutation({
      query: (id) => ({
        url: `/cart/delete-product-from-cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetMyCartQuery,
  useUpdateQuantityMutation,
  useRemoveCartProductMutation,
} = cartApi;
