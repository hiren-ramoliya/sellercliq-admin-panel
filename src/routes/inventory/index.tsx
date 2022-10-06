import React, { useEffect, useState } from "react";
import AllTableLayout from "./allTableLayout";
import "./invenotry.scss";
import InventoryHeader from "./inventoryHeader";
import { useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/slices/productsSlice";
import { useAppDispatch } from "../../store/store";
import { fetchAllSuppliers } from "../../store/slices/allSuppliersSlice";
import { fetchAllInvTransfers } from "../../store/slices/allInventoryTransfer";

export default function Invenotry() {
  const dispatch = useAppDispatch();
  const allProducts = useSelector((state: any) => state?.allProducts);
  const allSuppliersState = useSelector((state: any) => state?.allSuppliers);
  const allInvTransferState = useSelector((state: any) => state?.allInvTransfer);
  const [products, setProducts] = useState([]);
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [inventoryTransfers, setInventoryTransfers] = useState([]);

  const addSupplierToggle = () => {
    setShowAddSupplier(!showAddSupplier);
  };

  useEffect(() => {
    if (allProducts?.allProducts?.length === 0 && !allProducts?.called) {
      dispatch(fetchAllProducts());
    } else {
      setProducts(allProducts?.allProducts);
    }
  }, [allProducts]);

  useEffect(() => {
    if (allSuppliersState?.data?.length === 0 && !allSuppliersState?.called) {
      dispatch(fetchAllSuppliers());
    } else {
      setSuppliers(allSuppliersState?.data);
    }
  }, [allSuppliersState]);

  useEffect(() => {
    if (allInvTransferState?.data?.length === 0 && !allInvTransferState?.called) {
      dispatch(fetchAllInvTransfers());
    } else {
      setInventoryTransfers(allInvTransferState?.data);
    }
  }, [allInvTransferState]);

  return (
    <>
      <div className="all-invenotry-section-alignment">
        <InventoryHeader showAddSupplier={showAddSupplier} toggle={addSupplierToggle} />
        <AllTableLayout showAddSupplier={showAddSupplier} toggle={addSupplierToggle} suppliers={suppliers} />
      </div>
    </>
  );
}
