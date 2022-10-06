import React from "react";
import InventorySearch from "../inventorySearch";
import InventoryTab from "../inventoryTab";
import SupplierTable from "../supplierTable";
import "./allTableLayout.scss";
export default function AllTableLayout(props: any) {
  return (
    <>
      <div className="all-table-layout-fix">
        <InventoryTab />
        <InventorySearch />
        <SupplierTable />
      </div>
    </>
  );
}
