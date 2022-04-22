import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productsListApi = createApi({
  reducerPath: "productsLists",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ecommerce-lethanh.herokuapp.com/" }),
  endpoints: (builder) => ({
    getProductsByTags: builder.query({
      query: (productId) => `products/tags/${productId}`,
    }),
  }),
});
export const { useGetProductsByTagsQuery } = productsListApi;
