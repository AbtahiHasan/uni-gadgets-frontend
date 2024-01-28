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
  }),
});

export const { useAddGadgetMutation } = gadgetsApi;
