import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface categoryByIdState {
  loading: true | false;
  error: {} | null;
  data: {};
}

const initialState = {
  loading: false,
  error: null,
  data: {},
} as categoryByIdState;

export const fetchCategoryById = createAsyncThunk(
  "categoryById/fetchCategoryById",
  async (index: any) => {
    console.log("params params", index);
    try {
      const response = await ApiGet(`category/get-category-by-id/${index}`);
      const data = await response?.data?.payload?.categoryData;
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

const categoryByIdSlice = createSlice({
  name: "categoryById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryById.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("Categories fetched Successfully!");
    });

    builder.addCase(fetchCategoryById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      console.error("Error fetching Categories!");
    });
  },
});

export const {} = categoryByIdSlice.actions;

export default categoryByIdSlice.reducer;
