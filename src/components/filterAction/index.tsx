import React from "react";
import "./filterAction.scss";
import DownArrow from "../../../src/assets/icons/dark-black-fill.svg";
export default function FilterAction() {
  return (
    <>
      <div className="filter-action-box-alignment">
        <div className="statues-button">
          <button>
            <span>Status</span>
            <img src={DownArrow} alt="DownArrow" />
          </button>
        </div>
        <div className="balance-button">
          <button>
            <span>Balance</span>
            <img src={DownArrow} alt="DownArrow" />
          </button>
        </div>
        <div className="more-filter-button">
          <button>More filters</button>
        </div>
      </div>
    </>
  );
}
