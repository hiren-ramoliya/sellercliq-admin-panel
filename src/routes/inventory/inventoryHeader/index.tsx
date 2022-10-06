import React from "react";
import "./inventoryHeader.scss";
export default function InventoryHeader(props: any) {
  return (
    <div>
      <div className="inventory-header-content-alignment">
        <div>
          <h2>Supplier</h2>
        </div>
        <div>
          <span>Export</span>
          <div className="green-button">
            <button>Add supplier</button>
          </div>
        </div>
      </div>
    </div>
  );
}
