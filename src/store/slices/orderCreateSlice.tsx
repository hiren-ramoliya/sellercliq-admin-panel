import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface orderCreateState {
  loading: true | false;
  error: {} | null;
  data: { products: [] };
}

const initialState = {
  loading: false,
  error: null,
  data: { products: [] },
} as orderCreateState;

const orderCreateSlice = createSlice({
  name: "allOrders",
  initialState,
  reducers: {
    addProductsToOrder: (state, action) => {
      state.data.products = action.payload;
    },
    clearCreateOrder: (state) => {
      state.data.products = [];
    },
  },
});

export const { addProductsToOrder, clearCreateOrder } = orderCreateSlice.actions;

export default orderCreateSlice.reducer;
