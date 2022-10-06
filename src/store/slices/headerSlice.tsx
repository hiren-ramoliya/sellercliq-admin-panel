import { createSlice } from "@reduxjs/toolkit";

interface headerData {
  loading: true | false;
  error: {} | null;
  active: true | false;
  message: string;
  saved: true | false;
  discard: true | false;
  isValid: true | false;
}

const initialState: headerData = {
  loading: false,
  error: null,
  active: false,
  message: "",
  saved: false,
  discard: false,
  isValid: false,
};

const headerSlice = createSlice({
  name: "headerSlice",
  initialState,
  reducers: {
    setHeaderLoading: (state, action) => {
      state.loading = action.payload;
    },
    setHeaderError: (state, action) => {
      state.error = action.payload;
    },
    setHeaderActive: (state, action) => {
      state.active = action.payload;
    },
    setHeaderMessage: (state, action) => {
      state.active = true;
      state.message = action.payload;
    },
    setHeaderSaved: (state, action) => {
      state.saved = action.payload;
      state.discard = false;
    },
    setHeaderDiscard: (state, action) => {
      state.discard = action.payload;
      state.saved = false;
    },
    setHeaderData: (state, action) => {
      state.loading = action.payload.loading;
      state.error = action.payload.error;
      state.active = action.payload.active;
      state.message = action.payload.message;
      state.saved = action.payload.saved;
      state.discard = action.payload.discard;
      state.isValid = action.payload.isValid;
    },
    setHeaderClear: (state) => {
      state.loading = false;
      state.error = null;
      state.active = false;
      state.message = "";
      state.saved = false;
      state.discard = false;
      state.isValid = false;
    },
  },
});

export const {
  setHeaderLoading,
  setHeaderError,
  setHeaderActive,
  setHeaderMessage,
  setHeaderSaved,
  setHeaderDiscard,
  setHeaderData,
  setHeaderClear,
} = headerSlice.actions;

export default headerSlice.reducer;
