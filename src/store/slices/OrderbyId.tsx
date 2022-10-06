import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface orderByIdState {
  loading: true | false;
  error: {} | null;
  data: {};
}

const initialState = {
  loading: false,
  error: null,
  data: {},
} as orderByIdState;

export const fetchOrderById = createAsyncThunk(
  "orderById/fetchOrderById",
  async (index: any) => {
    console.log("params params", index);
    try {
      const response = await ApiGet(`order/get-order-by-id/${index}`);
      const data = await response?.data?.payload?.orderData;
      const filteredData = data?.productId?.map((res: any) => {
        return {
          ...res.id,
          quantity: res?.quantity,
        };
      });
      let filterData = { ...data, productId: filteredData };
      // console.log("filteredData", filteredData);
      // console.log("data", data);

      return filterData;
    } catch (error: any) {
      throw Error(error);
    }
  }
);

const orderByIdSlice = createSlice({
  name: "orderById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderById.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("Orders fetched Successfully!");
    });

    builder.addCase(fetchOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      console.error("Error fetching Orders!");
    });
  },
});

export const {} = orderByIdSlice.actions;

export default orderByIdSlice.reducer;
