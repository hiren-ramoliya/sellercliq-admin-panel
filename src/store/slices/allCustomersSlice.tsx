import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface allCustomersSlice {
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
} as allCustomersSlice;

export const fetchAllCustomers = createAsyncThunk("allCustomers/fetchAllCustomers", async () => {
  try {
    const response = await ApiGet("customer/getAll-customer");
    const data = await response?.data?.payload?.customer;
    return data;
  } catch (error: any) {
    throw Error(error);
  }
});

const allCustomersSlice = createSlice({
  name: "allCustomers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCustomers.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchAllCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.called = true;
      console.log("Customers fetched Successfully!");
    });

    builder.addCase(fetchAllCustomers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.called = true;
      console.error("Error fetching Customers!");
    });
  },
});

export const {} = allCustomersSlice.actions;

export default allCustomersSlice.reducer;
