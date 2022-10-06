import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface productByIdState {
  loading: true | false;
  error: {} | null;
  data: {};
}

const initialState = {
  loading: false,
  error: null,
  data: {},
} as productByIdState;

export const fetchProductById = createAsyncThunk(
  "productById/fetchProductById",
  async (index: any) => {
    console.log("params params", index);
    try {
      const response = await ApiGet(`product/get-product-by-id/${index}`);
      const data = await response?.data?.payload?.productData;
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

const productByIdSlice = createSlice({
  name: "productById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("Products fetched Successfully!");
    });

    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      console.error("Error fetching Products!");
    });
  },
});

export const {} = productByIdSlice.actions;

export default productByIdSlice.reducer;
