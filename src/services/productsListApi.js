import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const productsListApi = createApi({
  reducerPath: "productsLists",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getProductsByTags: builder.query({
      query: (productId) => `products/tags/${productId}`,
    }),
  }),
});
export const { useGetProductsByTagsQuery } = productsListApi;
