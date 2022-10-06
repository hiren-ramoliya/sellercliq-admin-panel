import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface allAdminUserSlices {
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
} as allAdminUserSlices;

export const fetchAllAdminUsers = createAsyncThunk(
  "admin/all-admin",
  async () => {
    try {
      const response = await ApiGet("admin/all-admin");
      const data = await response?.data?.payload?.userData;
      return data;
    } catch (error: any) {
      throw Error(error);
    }
  }
);

const allAdminUserSlice = createSlice({
  name: "allAdminUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllAdminUsers.pending, (state, action) => {
      state.loading = true;
      state.called = true;
      state.error = null;
    });

    builder.addCase(fetchAllAdminUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.called = true;
    });

    builder.addCase(fetchAllAdminUsers.rejected, (state, action) => {
      state.loading = false;
      state.called = true;
      state.error = action.error;
    });
  },
});

export const {} = allAdminUserSlice.actions;

export default allAdminUserSlice.reducer;
