import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface allBuyerSlices {
  loading: true | false;
  error: {} | null;
  called: true | false;
  data: [];
}

const initialState = {
  loading: false,
  error: null,
  data: [],
  called: false,
} as allBuyerSlices;

export const fetchAllBuyers = createAsyncThunk("admin/all-buyer", async () => {
  try {
    const response = await ApiGet("admin/all-buyer");
    const data = await response?.data?.payload?.userData;
    return data;
  } catch (error: any) {
    throw Error(error);
  }
});

const allBuyerSlice = createSlice({
  name: "allBuyers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBuyers.pending, (state, action) => {
      state.loading = true;
      state.called = true;
      state.error = null;
    });

    builder.addCase(fetchAllBuyers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.called = true;
    });

    builder.addCase(fetchAllBuyers.rejected, (state, action) => {
      state.loading = false;
      state.called = true;
      state.error = action.error;
    });
  },
});

export const {} = allBuyerSlice.actions;

export default allBuyerSlice.reducer;
