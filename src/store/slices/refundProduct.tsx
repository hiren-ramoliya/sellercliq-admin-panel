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

export const refundProduct = createAsyncThunk("product/refundProduct", async (payload: any) => {
  let filtredData = payload?.productId?.map((res: any) => {
    return {
      id: res?._id,
      quantity: res?.quantity,
    };
  });

  const finalPayload = {
    productId: filtredData,
    resoneForRefund: payload?.resoneForRefund,
    refundPrice: payload?.refundPrice,
  };
  try {
    const response = await ApiPut(
      `order/refund-product-from-order/${payload?.orderId}`,
      finalPayload
    );
    const data = await response;
    console.log("datasssssss", data);

    return data;
  } catch (error: any) {
    throw Error(error);
  }
});

const orderByIdSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(refundProduct.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(refundProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("Orders fetched Successfully!");
    });

    builder.addCase(refundProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      console.error("Error fetching Orders!");
    });
  },
});

export const {} = orderByIdSlice.actions;

export default orderByIdSlice.reducer;
