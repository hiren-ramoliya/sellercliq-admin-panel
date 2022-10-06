import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface allMediaState {
  loading: true | false;
  error: {} | null;
  called: true | false;
  total: number;
  data: [];
}

const initialState = {
  loading: false,
  error: null,
  called: false,
  total: 0,
  data: [],
} as allMediaState;

export const fetchAllMedia = createAsyncThunk("allmediadata/fetchAllMedia", async (arg: any, { getState }) => {
  try {
    const state: any = getState();
    const response = await ApiGet(`media/getAll-media?skip=${state?.media?.data?.length}&limit=${arg?.limit}&page=${arg?.page}`);
    const data = await response?.data?.payload;
    return data;
  } catch (error: any) {
    throw Error(error);
  }
});

const allMediaSlice = createSlice({
  name: "allmediadata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllMedia.pending, (state, action) => {
      state.loading = true;
      state.called = true;
      state.error = null;
    });

    builder.addCase(fetchAllMedia.fulfilled, (state, action) => {
      state.loading = false;
      state.called = true;
      state.total = action.payload?.count;
      state.data = action.payload?.media;
      console.log("Media fetched Successfully!");
    });

    builder.addCase(fetchAllMedia.rejected, (state, action) => {
      state.loading = false;
      state.called = true;
      state.error = action.error;
      console.error("Error fetching Media!");
    });
  },
});

export const {} = allMediaSlice.actions;

export default allMediaSlice.reducer;
