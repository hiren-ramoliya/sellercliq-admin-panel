import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import allCategoriesSlice from "./slices/allCategoriesSlice";
import categoryById from "./slices/categoryByIdSlice";
import allProductsSlice from "./slices/productsSlice";
import productById from "./slices/productByIdSclice";
import allOrdersSlice from "./slices/allOrdersSlice";
import OrderbyId from "./slices/OrderbyId";
import orderCreateSlice from "./slices/orderCreateSlice";
import updateOrderStatus from "./slices/updateOrderStatus";
import editOrderSlice from "./slices/editOrderProduct";
import allCustomersSlice from "./slices/allCustomersSlice";
import customerById from "./slices/customerById";
import allSuppliersSlice from "./slices/allSuppliersSlice";
import supplierById from "./slices/supplierById";
import allInvTransfersSlice from "./slices/allInventoryTransfer";
import invTransferById from "./slices/inventoryTransferById";
import allGiftCardsSlice from "./slices/allGiftCardsSlice";
import giftCardById from "./slices/giftCardById";
import headerSlice from "./slices/headerSlice";
import postTimeline from "./slices/postTimeline";
import allMediaSlice from "./slices/allMediaSlice";
import allBuyerSlice from "./slices/allBuyerSlice";
import allSellerSlice from "./slices/allSellerSlice";
import allAdminUserSlice from "./slices/allAdminUserSlice";
import userProfileSlice from "./slices/userProfileSlice";
import allCollectionsSlice from "./slices/allCollectionsSlice";
import allBrandSlice from "./slices/allBrandSlice";

const store = configureStore({
  reducer: {
    allCategories: allCategoriesSlice,
    allCollections: allCollectionsSlice,
    categorybyid: categoryById,
    allProducts: allProductsSlice,
    productbyid: productById,
    allorders: allOrdersSlice,
    orderbyid: OrderbyId,
    ordercreate: orderCreateSlice,
    updateorderstatus: updateOrderStatus,
    orderproduct: editOrderSlice,
    allCustomers: allCustomersSlice,
    customerById: customerById,
    allSuppliers: allSuppliersSlice,
    supplierById: supplierById,
    allGiftCards: allGiftCardsSlice,
    giftCardById: giftCardById,
    allInvTransfer: allInvTransfersSlice,
    invTransferById: invTransferById,
    header: headerSlice,
    posttimeline: postTimeline,
    media: allMediaSlice,
    allBuyers: allBuyerSlice,
    allSellers: allSellerSlice,
    allAdminUsers: allAdminUserSlice,
    profile: userProfileSlice,
    allBrands: allBrandSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
