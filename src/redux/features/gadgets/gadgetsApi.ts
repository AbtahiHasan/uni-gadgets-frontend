import { baseApi } from "../../api/baseApi";

const gadgetsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addGadget: builder.mutation({
      query: (gadgetInfo) => ({
        url: "/products/create-product",
        method: "POST",
        body: gadgetInfo,
      }),
    }),
    getGadgets: builder.query({
      query: () => ({
        url: "/products/get-products",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddGadgetMutation, useGetGadgetsQuery } = gadgetsApi;
