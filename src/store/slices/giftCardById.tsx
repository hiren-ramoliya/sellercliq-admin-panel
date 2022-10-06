import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface giftCardByIdState {
  loading: true | false;
  error: {} | null;
  data: {};
}

const initialState = {
  loading: false,
  error: null,
  data: {},
} as giftCardByIdState;

export const fetchGiftCardById = createAsyncThunk(
  "giftCardById/fetchGiftCardById",
  async (index: any) => {
    console.log("params params", index);
    try {
      const response = await ApiGet(`giftcard/get-giftcard-by-id/${index}`);
      const data = await response?.data?.payload?.giftcard;
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

const giftCardByIdSlice = createSlice({
  name: "giftCardById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGiftCardById.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchGiftCardById.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("GiftCard fetched Successfully!");
    });

    builder.addCase(fetchGiftCardById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      console.error("Error fetching GiftCard!");
    });
  },
});

export const {} = giftCardByIdSlice.actions;

export default giftCardByIdSlice.reducer;
