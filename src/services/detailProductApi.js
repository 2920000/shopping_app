import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productDetailApi = createApi({
  reducerPath: "productDetail",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ecommerce-lethanh.herokuapp.com/" }),
  endpoints: (builder) => ({
    getProductDetail: builder.query({
      query: (productId) => `products/detail/${productId}`,
    }),
    getRating:builder.query({
      query:(slug)=>`/rating/${slug}`
    })
  }),
});
export const { useGetProductDetailQuery,useGetRatingQuery } = productDetailApi;
