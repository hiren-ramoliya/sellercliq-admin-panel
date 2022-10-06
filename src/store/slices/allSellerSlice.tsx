import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface allSellerSlices {
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
} as allSellerSlices;

export const fetchAllSellers = createAsyncThunk("admin/all-seller", async () => {
  try {
    const response = await ApiGet("admin/all-seller");
    const data = await response?.data?.payload?.userData;
    return data;
  } catch (error: any) {
    throw Error(error);
  }
});

const allSellerSlice = createSlice({
  name: "allSellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSellers.pending, (state, action) => {
      state.loading = true;
      state.called = true;
      state.error = null;
    });

    builder.addCase(fetchAllSellers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.called = true;
    });

    builder.addCase(fetchAllSellers.rejected, (state, action) => {
      state.loading = false;
      state.called = true;
      state.error = action.error;
    });
  },
});

export const {} = allSellerSlice.actions;

export default allSellerSlice.reducer;
