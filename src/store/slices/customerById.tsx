import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface customerByIdState {
  loading: true | false;
  error: {} | null;
  data: {};
  orderData: [];
}

const initialState = {
  loading: false,
  error: null,
  data: {},
  orderData: [],
} as customerByIdState;

export const fetchCustomerById = createAsyncThunk(
  "customerById/fetchCustomerById",
  async (id: any) => {
    try {
      const response = await ApiGet(`customer/get-customer-by-id/${id}`);
      const data = await response?.data?.payload;
      return data;
    } catch (error: any) {
      throw Error(error);
    }
  }
);

const customerByIdSlice = createSlice({
  name: "customerById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomerById.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchCustomerById.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.customerData;
      state.orderData = action.payload?.orderData;
      console.log("Customer fetched Successfully!");
    });

    builder.addCase(fetchCustomerById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      console.error("Error fetching Customer!");
    });
  },
});

export const {} = customerByIdSlice.actions;

export default customerByIdSlice.reducer;
