/* eslint-disable @typescript-eslint/no-explicit-any */

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
      query: (data?: any) => {
        let searchParams = {};
        if (Object.keys(data as object)?.length) {
          searchParams = new URLSearchParams({
            ...(data?.minPrice && { minPrice: data.minPrice }),
            ...(data?.maxPrice && { maxPrice: data.maxPrice }),
            ...(data?.releaseDate && { releaseDate: data.releaseDate }),
            ...(data?.brand && { brand: data.brand }),
            ...(data?.modelNumber && { modelNumber: data.modelNumber }),
            ...(data?.category && { category: data.category }),
            ...(data?.operatingSystem && {
              operatingSystem: data?.operatingSystem,
            }),
            ...(data?.connectivity && { connectivity: data.connectivity }),
            ...(data?.powerSource && { powerSource: data.powerSource }),
            ...(data?.storage && { storage: data.storage }),
            ...(data?.cameraResolution && {
              cameraResolution: data.cameraResolution,
            }),
          });
        }
        return {
          url: `/products/get-products?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["gadgets"],
    }),
    getMyGadgets: builder.query({
      query: (data?: any) => {
        let searchParams = {};
        if (Object.keys(data as object)?.length) {
          searchParams = new URLSearchParams({
            ...(data?.minPrice && { minPrice: data.minPrice }),
            ...(data?.maxPrice && { maxPrice: data.maxPrice }),
            ...(data?.releaseDate && { releaseDate: data.releaseDate }),
            ...(data?.brand && { brand: data.brand }),
            ...(data?.modelNumber && { modelNumber: data.modelNumber }),
            ...(data?.category && { category: data.category }),
            ...(data?.operatingSystem && {
              operatingSystem: data?.operatingSystem,
            }),
            ...(data?.connectivity && { connectivity: data.connectivity }),
            ...(data?.powerSource && { powerSource: data.powerSource }),
            ...(data?.storage && { storage: data.storage }),
            ...(data?.cameraResolution && {
              cameraResolution: data.cameraResolution,
            }),
          });
        }
        return {
          url: `/products/get-my-products?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["gadgets"],
    }),

    getAllGadgets: builder.query({
      query: (searchText) => {
        if (searchText) {
          searchText = `searchTerms=${searchText}`;
        } else {
          searchText = "";
        }

        return {
          url: `/products/get-products?${searchText}?limit=1000`,
          method: "GET",
        };
      },
      providesTags: ["gadgets"],
    }),
    getSingleGadget: builder.query({
      query: (id) => ({
        url: `/products/get-product/${id}`,
        method: "GET",
      }),
    }),
    updateGadget: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/products/update-product/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["gadgets"],
    }),
    deleteMultiple: builder.mutation({
      query: (ids: string[]) => ({
        url: `/products/delete-multiple-products`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["gadgets"],
    }),
    deleteGadget: builder.mutation({
      query: (id: string) => ({
        url: `/products/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gadgets"],
    }),
  }),
});

export const {
  useAddGadgetMutation,
  useGetGadgetsQuery,
  useGetMyGadgetsQuery,
  useGetSingleGadgetQuery,
  useGetAllGadgetsQuery,
  useUpdateGadgetMutation,
  useDeleteMultipleMutation,
  useDeleteGadgetMutation,
} = gadgetsApi;
