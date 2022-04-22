import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const orderedApi = createApi({
  reducerPath: "ordered",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ecommerce-lethanh.herokuapp.com/" }),
  endpoints: (builder) => ({
    getOrdered: builder.query({
      query: (userId) => `user/orders/${userId}`,
    })
  }),
});
export const { useGetOrderedQuery } = orderedApi;
