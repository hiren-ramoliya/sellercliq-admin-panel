import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface supplierByIdState {
  loading: true | false;
  error: {} | null;
  data: {};
}

const initialState = {
  loading: false,
  error: null,
  data: {},
} as supplierByIdState;

export const fetchSupplierById = createAsyncThunk("supplierById/fetchSupplierById", async (index: any) => {
  console.log("params params", index);
  try {
    const response = await ApiGet(`supplier/get-supplier-by-id/${index}`);
    const data = await response?.data?.payload?.supplier;
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
});

const supplierByIdSlice = createSlice({
  name: "supplierById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSupplierById.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchSupplierById.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("Suppliers fetched Successfully!");
    });

    builder.addCase(fetchSupplierById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      console.error("Error fetching Suppliers!");
    });
  },
});

export const {} = supplierByIdSlice.actions;

export default supplierByIdSlice.reducer;
