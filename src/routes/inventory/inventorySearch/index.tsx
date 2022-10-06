import React from "react";
import ModalSearch from "../../../components/modalSearch";
import "./inventorySearch.scss";
import SortIcon from "../../../assets/icons/new-sort.svg";
export default function InventorySearch() {
  return (
    <div>
      <div className="inventory-globally-search-alignment">
        <div className="grid">
          <div className="grid-items">
            <ModalSearch />
          </div>
          <div className="grid-items">
            <button>
                <img src={SortIcon} alt="SortIcon"/>
                <span>Sort</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
