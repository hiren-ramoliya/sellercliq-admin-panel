import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface allOrdersState {
  loading: true | false;
  error: {} | null;
  called: true | false;
  data: [];
}

const initialState = {
  loading: false,
  error: null,
  called: false,
  data: [],
} as allOrdersState;

export const fetchAllOrders = createAsyncThunk("allorderdata/fetchAllOrders", async () => {
  try {
    const response = await ApiGet("order/getAll-order");
    const data = await response?.data?.payload?.order;
    return data;
  } catch (error: any) {
    throw Error(error);
  }
});

const allOrdersSlice = createSlice({
  name: "allorderdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.called = true;
      console.log("Orders fetched Successfully!");
    });

    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.called = true;
      console.error("Error fetching Orders!");
    });
  },
});

export const {} = allOrdersSlice.actions;

export default allOrdersSlice.reducer;
