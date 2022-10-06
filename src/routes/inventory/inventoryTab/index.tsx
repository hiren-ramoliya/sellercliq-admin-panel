import React from "react";
import "./inventoryTab.scss";
import MapIcon from "../../../assets/icons/map-pin.svg";
import DownIcon from "../../../assets/icons/dark-black.svg";
export default function InventoryTab() {
  return (
    <>
      <div className="inventroy-tab-content-alignment">
        <ul>
          <li>Inventory</li>
          <li>Incoming</li>
          <li>Supplier</li>
        </ul>
        <div className="location-content-alignment">
          <div>
            <img src={MapIcon} alt="MapIcon" />
          </div>
          <div>
            <span>Street 2 Asif town</span>
          </div>
          <div>
            <img src={DownIcon} alt="DownIcon" />
          </div>
        </div>
      </div>
    </>
  );
}
