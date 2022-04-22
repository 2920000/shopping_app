import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountApi from "../api/accountApi";
import cartApi from "../api/cartApi";
import userApi from "../api/userApi";
import {
  getLocalStorage,
  addLocalStorage,
  removeLocalStorage,
} from "../helper/StorageUtilties";
import { UPDATE_PRODUCTS_IN_CART } from "./cartSlice";

export const postAccount = createAsyncThunk(
  "postAccount",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await accountApi.post(payload);
      addLocalStorage("profile", response);
      const cartDataFromLocal = getLocalStorage("cart");
      if (cartDataFromLocal) {
        const allCartProducts = await cartApi.add({
          userId: response._id,
          cartDataFromLocal,
        });
        removeLocalStorage("cart");
        dispatch(UPDATE_PRODUCTS_IN_CART(allCartProducts.cart));
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: getLocalStorage("profile"),
  errorMessage: "",
  isLoading: false,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    CLEAR_ERRORMESSAGE: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postAccount.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postAccount.fulfilled, (state, action) => {
      state.user = action.payload;
      state.errorMessage = "";
      state.isLoading = false;
    });
    builder.addCase(postAccount.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.isLoading = false;
    });
  },
});

export const errorMessageSelector = (state) => state.account.errorMessage;
export const userSelector = (state) => state.account.user;
export const isLoadingSelector = (state) => state.account.isLoading;
export const { CLEAR_ERRORMESSAGE } = accountSlice.actions;
export default accountSlice.reducer;
