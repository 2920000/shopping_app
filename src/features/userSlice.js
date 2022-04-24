import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

export const fetchShippingAddress = createAsyncThunk(
  "user/shippingInfor",
  async (userId, { dispatch }) => {
    try {
      const response = await userApi.fetchShippingAddress(userId);
      dispatch(CLOSE_SHIPPING_INFOR_MODAL());
      return response;
    } catch (error) {
      dispatch(OPEN_SHIPPING_INFOR_MODAL());
    }
  }
);

export const updateShippingInforToDatabase = createAsyncThunk(
  "user/updateShippingInfor",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await userApi.updateUserInfor({ ...payload });
      dispatch(CLOSE_SHIPPING_INFOR_MODAL());
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
const initialState = {
  shippingAddress: null,
  hasShippingAddress: false,
  isUpdateShippingAddress: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    OPEN_SHIPPING_INFOR_MODAL: (state) => {
      state.hasShippingAddress = true;
    },
    CLOSE_SHIPPING_INFOR_MODAL: (state) => {
      state.hasShippingAddress = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateShippingInforToDatabase.pending, (state, action) => {
      state.isUpdateShippingAddress = true;
    });
    builder.addCase(
      updateShippingInforToDatabase.fulfilled,
      (state, action) => {
        state.isUpdateShippingAddress = false;
        state.shippingAddress = action.payload;
      }
    );
    builder.addCase(fetchShippingAddress.fulfilled, (state, action) => {
      state.shippingAddress = action.payload;
    });
  },
});
export default userSlice.reducer;

export const hasShippingAddressSelector = (state) =>
  state.user.hasShippingAddress;
export const shippingAddressSelector = (state) => state.user.shippingAddress;
export const isUpdateShippingAddressSelector = (state) =>
  state.user.isUpdateShippingAddress;
export const { OPEN_SHIPPING_INFOR_MODAL, CLOSE_SHIPPING_INFOR_MODAL } =
  userSlice.actions;
