import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface userProfileState {
  loading: true | false;
  error: {} | null;
  called: true | false;
  data: {};
}

const initialState = {
  loading: false,
  error: null,
  data: {},
  called: false,
} as userProfileState;

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async () => {
    try {
      const response = await ApiGet(`admin/current-admin`);
      const data = await response?.data?.payload?.userData;
      return data;
    } catch (error: any) {
      throw Error(error);
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.called = true;
    });

    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.called = true;
    });

    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.called = true;
    });
  },
});

export const {} = userProfileSlice.actions;

export default userProfileSlice.reducer;