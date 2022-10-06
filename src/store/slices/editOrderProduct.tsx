import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet, ApiPut } from "../../helpers/API/ApiData";

interface editOrder {
  loading: true | false;
  error: {} | null;
  data: {};
}

const initialState = {
  loading: false,
  error: null,
  data: {},
} as editOrder;

export const editOrderProduct = createAsyncThunk(
  "editProduct/editOrderProduct",
  async (payload: any) => {
    let filtredData = payload?.productId?.map((res: any) => {
      return {
        id: res?._id,
        quantity: res?.quantity,
      };
    });

    const finalPayload = {
      productId: filtredData,
      resoneForEdit: payload?.resoneForEdit,
    };
    try {
      const response = await ApiPut(
        `order/update-order-product/${payload?.orderId}`,
        finalPayload
      );
      const data = await response;
      console.log("datasssssss", data);

      return data;
    } catch (error: any) {
      throw Error(error);
    }
  }
);

const orderByIdSlice = createSlice({
  name: "editProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editOrderProduct.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(editOrderProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("Orders fetched Successfully!");
    });

    builder.addCase(editOrderProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      console.error("Error fetching Orders!");
    });
  },
});

export const {} = orderByIdSlice.actions;

export default orderByIdSlice.reducer;
