import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";

console.log(baseUrl)
export const productDetailApi = createApi({
  reducerPath: "productDetail",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getProductDetail: builder.query({
      query: (productId) => `products/detail/${productId}`,
    }),
    getRating: builder.query({
      query: (slug) => `/rating/${slug}`,
    }),
  }),
});
export const { useGetProductDetailQuery, useGetRatingQuery } = productDetailApi;
