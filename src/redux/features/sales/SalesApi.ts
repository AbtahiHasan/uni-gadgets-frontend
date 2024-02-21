import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSale: builder.mutation({
      query: (saleInfo) => ({
        url: "/sales/create-sale",
        method: "POST",
        body: saleInfo,
      }),
      invalidatesTags: ["gadgets", "cart"],
    }),
    getSaleHistory: builder.query({
      query: (value: string) => ({
        url: `/sales/get-sales-history?filter=${value}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddSaleMutation, useGetSaleHistoryQuery } = salesApi;
