import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const cartProductsApi = createApi({
  reducerPath: "cartProducts",
  baseQuery: fetchBaseQuery({ baseUrl:baseUrl }),
  endpoints: (builder) => ({
    getCartProducts: builder.query({
      query: (userId) => `cart/get/${userId}`,
    }),
  }),
});
export const { useGetCartProductsQuery } = cartProductsApi;
