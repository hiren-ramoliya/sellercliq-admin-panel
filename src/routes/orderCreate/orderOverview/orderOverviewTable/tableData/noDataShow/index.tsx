import React from "react";
import "./noDataShow.scss";
import SearchIcn from "../../../../../../assets/icons/primary-search.svg";
export default function NoDataShow() {
  return (
    <>
      <div className="no-data-table-show-alignment">
        <div className="icon-center-alignment">
          <img src={SearchIcn} alt="SearchIcn" />
        </div>
        <h5>No draft orders found</h5>
        <p>Try changing the filters or search term </p>
      </div>
    </>
  );
}
