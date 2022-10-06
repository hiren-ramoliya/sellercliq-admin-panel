import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../helpers/API/ApiData";

interface allInvTransfersState {
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
} as allInvTransfersState;

export const fetchAllInvTransfers = createAsyncThunk("allinvTransferdata/fetchAllInvTransfers", async () => {
  try {
    const response = await ApiGet("inventory/getAll-inventoryTransfer");
    const data = await response?.data?.payload?.inventoryTransfer;
    return data;
  } catch (error: any) {
    throw Error(error);
  }
});

const allInvTransfersSlice = createSlice({
  name: "allinvTransferdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllInvTransfers.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchAllInvTransfers.fulfilled, (state, action) => {
      state.loading = false;
      state.called = true;
      state.data = action.payload;
      console.log("InvTransfers fetched Successfully!");
    });

    builder.addCase(fetchAllInvTransfers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.called = true;
      console.error("Error fetching InvTransfers!");
    });
  },
});

export const {} = allInvTransfersSlice.actions;

export default allInvTransfersSlice.reducer;
