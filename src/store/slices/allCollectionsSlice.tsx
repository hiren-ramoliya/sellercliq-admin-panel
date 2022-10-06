import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface allCollectionSlice {
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
} as allCollectionSlice;

export const fetchAllCollections = createAsyncThunk(
  "product",
  async (params: object = {}) => {
    try {
      const response = await ApiGet("product", params);
      const data = await response?.data?.payload;
      return data;
    } catch (error: any) {
      throw Error(error);
    }
  }
);

const allCollectionsSlice = createSlice({
  name: "allCollections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCollections.pending, (state, action) => {
      state.loading = true;
      state.called = true;
      state.error = null;
    });

    builder.addCase(fetchAllCollections.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.called = true;
    });

    builder.addCase(fetchAllCollections.rejected, (state, action) => {
      state.loading = false;
      state.called = true;
      state.error = action.error;
    });
  },
});

export const {} = allCollectionsSlice.actions;

export default allCollectionsSlice.reducer;
