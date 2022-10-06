import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface allProductsSliceState {
  loading: true | false;
  error: {} | null;
  called: true | false;
  allProducts: [];
}

const initialState = {
  loading: false,
  error: null,
  called: false,
  allProducts: [],
} as allProductsSliceState;

export const fetchAllProducts = createAsyncThunk("allProducts/fetchAllProducts", async () => {
  try {
    const response = await ApiGet("product/getAll-product");
    const data = await response?.data?.payload?.product?.map((res: any) => {
      return {
        ...res,
        quantity: 1,
      };
    });
    return data;
  } catch (error: any) {
    throw Error(error);
  }
});

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
      state.called = true;
      console.log("Products fetched Successfully!");
    });

    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.called = true;
      console.error("Error fetching Products!");
    });
  },
});

export const {} = allProductsSlice.actions;

export default allProductsSlice.reducer;
