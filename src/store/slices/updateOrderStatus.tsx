import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet, ApiPut } from "../../helpers/API/ApiData";

interface editOrder {
  loading: true | false;
  error: {} | null;
  data: {};
}

const initialState = {
  loading: false,
  error: null,
  data: {},
} as editOrder;

export const updateOrderStatus = createAsyncThunk(
  "updateStatus/updateOrderStatus",
  async (payload: any) => {
    const finalPayload = {
      status: payload?.status,
    };
    try {
      const response = await ApiPut(`order/update-order-status/${payload?.orderId}`, finalPayload);
      const data = await response;
      console.log("datasssssss", data);

      return data;
    } catch (error: any) {
      throw Error(error);
    }
  }
);

const orderByIdSlice = createSlice({
  name: "updateStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateOrderStatus.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("Orders fetched Successfully!");
    });

    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      console.error("Error fetching Orders!");
    });
  },
});

export const {} = orderByIdSlice.actions;

export default orderByIdSlice.reducer;
