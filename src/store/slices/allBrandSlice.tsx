import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface allBrandSlice {
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
} as allBrandSlice;

export const fetchAllBrands = createAsyncThunk("brands", async () => {
  try {
    const response = await ApiGet("brand");
    const data = await response?.data?.payload;
    return data;
  } catch (error: any) {
    throw Error(error);
  }
});

const allBrandSlice = createSlice({
  name: "allBrands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBrands.pending, (state, action) => {
      state.loading = true;
      state.called = true;
      state.error = null;
    });

    builder.addCase(fetchAllBrands.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.called = true;
    });

    builder.addCase(fetchAllBrands.rejected, (state, action) => {
      state.loading = false;
      state.called = true;
      state.error = action.error;
    });
  },
});

export const {} = allBrandSlice.actions;

export default allBrandSlice.reducer;
