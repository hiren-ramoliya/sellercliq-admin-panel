import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet, ApiPut } from "../../helpers/API/ApiData";

interface orderByIdState {
  loading: true | false;
  error: {} | null;
  data: [];
}

const initialState = {
  loading: false,
  error: null,
  data: [],
} as orderByIdState;

export const postTimeline = createAsyncThunk(
  "timeline/postTimeline",
  async (index: any) => {
    console.log("params params", index);
    const payload = {
      timeline: index?.timeline,
    };
    try {
      const response = await ApiPut(
        `order/add-order-timeline/${index?.orderId}`,
        payload
      );
      const data = await response?.data?.payload?.previewData?.timeline;
      console.log('datasssssss',data);
      
      return data;
    } catch (error: any) {
      throw Error(error);
    }
  }
);

const orderByIdSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postTimeline.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(postTimeline.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("Orders fetched Successfully!");
    });

    builder.addCase(postTimeline.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      console.error("Error fetching Orders!");
    });
  },
});

export const {} = orderByIdSlice.actions;

export default orderByIdSlice.reducer;
