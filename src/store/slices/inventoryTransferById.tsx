import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface invTransferByIdState {
  loading: true | false;
  error: {} | null;
  data: {};
}

const initialState = {
  loading: false,
  error: null,
  data: {},
} as invTransferByIdState;

export const fetchInvTransferById = createAsyncThunk(
  "invTransferById/fetchInvTransferById",
  async (index: any) => {
    console.log("params params", index);
    try {
      const response = await ApiGet(`inventory/get-inventoryTransfer-by-id/${index}`);
      const data = await response?.data?.payload?.inventoryTransfer;
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

const invTransferByIdSlice = createSlice({
  name: "invTransferById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInvTransferById.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchInvTransferById.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("InvTransfer fetched Successfully!");
    });

    builder.addCase(fetchInvTransferById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      console.error("Error fetching InvTransfer!");
    });
  },
});

export const {} = invTransferByIdSlice.actions;

export default invTransferByIdSlice.reducer;
