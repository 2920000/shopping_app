import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import collectionApi from "../api/collectionApi";

export const fetchByCollection = createAsyncThunk(
  "collection/fetchByCollection",
  async (payload) => {
    const response = await collectionApi.fetchByCollection(payload);
    return response;
  }
);
const initialState = {
  products: [],
  filter: [],
  isLoading: false,
  existingBrand: [],
  existingColour: [],
  existingSize: [],
  existingPrice: [],
  productsNumberTotal: 0,
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    FILTER: (state, action) => {
      if (action.payload === "delete") {
        state.filter = [];
        return;
      }
      const check = state.filter.every(
        (e) =>
          e[Object.keys(e)[0]] !==
          action.payload[Object.keys(action.payload)[0]]
      );
      if (!check) {
        const index = state.filter.findIndex(
          (e) =>
            e[Object.keys(e)[0]] ===
            action.payload[Object.keys(action.payload)[0]]
        );
        state.filter.splice(index, 1);
        return;
      }
      state.filter.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchByCollection.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchByCollection.fulfilled, (state, action) => {
      state.products = action.payload.pageArray;
      state.existingBrand = action.payload.brandData;
      state.existingColour = action.payload.colourData;
      state.existingSize = action.payload.sizeData;
      state.existingPrice = action.payload.priceData;
      state.productsNumberTotal = action.payload.total;
      state.isLoading = false;
    });
    builder.addCase(fetchByCollection.rejected, (state, action) => {
      state.products = [];
      state.isLoad = false;
    });
  },
});

export const productsCollectionSelector = (state) => state.collection.products;
export const existingBrandSelector = (state) => state.collection.existingBrand;
export const existingColourSelector = (state) =>
  state.collection.existingColour;
export const existingSizeSelector = (state) => state.collection.existingSize;
export const existingPriceSelector = (state) => state.collection.existingPrice;
export const productsNumberTotalSelector = (state) =>
  state.collection.productsNumberTotal;

export const isLoadingSelector = (state) => state.collection.isLoading;

export const { FILTER } = collectionSlice.actions;
export default collectionSlice.reducer;
