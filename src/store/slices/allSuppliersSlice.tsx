import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface allSuppliersState {
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
} as allSuppliersState;

export const fetchAllSuppliers = createAsyncThunk("allsupplierdata/fetchAllSuppliers", async () => {
  try {
    const response = await ApiGet("supplier/getAll-supplier");
    const data = await response?.data?.payload?.supplier;
    return data;
  } catch (error: any) {
    throw Error(error);
  }
});

const allSuppliersSlice = createSlice({
  name: "allsupplierdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSuppliers.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchAllSuppliers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.called = true;
      console.log("Suppliers fetched Successfully!");
    });

    builder.addCase(fetchAllSuppliers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.called = true;
      console.error("Error fetching Suppliers!");
    });
  },
});

export const {} = allSuppliersSlice.actions;

export default allSuppliersSlice.reducer;
