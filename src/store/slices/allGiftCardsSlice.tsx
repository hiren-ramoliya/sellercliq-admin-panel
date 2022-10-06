import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface allGiftCardsSlice {
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
} as allGiftCardsSlice;

export const fetchAllGiftCards = createAsyncThunk("allGiftCards/fetchAllGiftCards", async () => {
  try {
    const response = await ApiGet("giftcard/getAll-giftcard");
    const data = await response?.data?.payload?.giftcard;
    return data;
  } catch (error: any) {
    throw Error(error);
  }
});

const allGiftCardsSlice = createSlice({
  name: "allGiftCards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllGiftCards.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchAllGiftCards.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.called = true;
      console.log("GiftCards fetched Successfully!");
    });

    builder.addCase(fetchAllGiftCards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.called = true;
      console.error("Error fetching GiftCards!");
    });
  },
});

export const {} = allGiftCardsSlice.actions;

export default allGiftCardsSlice.reducer;
