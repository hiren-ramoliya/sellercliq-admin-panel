import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface allCategoriesSlice {
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
} as allCategoriesSlice;

export const fetchAllCategories = createAsyncThunk("category", async () => {
  try {
    const response = await ApiGet("category");
    const data = await response?.data?.payload;
    return data;
  } catch (error: any) {
    throw Error(error);
  }
});

const allCategoriesSlice = createSlice({
  name: "allCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.pending, (state, action) => {
      state.loading = true;
      state.called = true;
      state.error = null;
    });

    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.called = true;
    });

    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.loading = false;
      state.called = true;
      state.error = action.error;
    });
  },
});

export const {} = allCategoriesSlice.actions;

export default allCategoriesSlice.reducer;
