import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSale: builder.mutation({
      query: (saleInfo) => ({
        url: "/sales/create-sale",
        method: "POST",
        body: saleInfo,
      }),
    }),
  }),
});

export const { useAddSaleMutation } = salesApi;
