import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const orderedApi = createApi({
  reducerPath: "ordered",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getOrdered: builder.query({
      query: (userId) => `user/orders/${userId}`,
    }),
  }),
});
export const { useGetOrderedQuery } = orderedApi;
