import React from "react";
import "./collectionDetails.scss";
import RightIcon from "../../assets/icons/gray-right.svg";
import CollectionDetailsTable from "./collectionDetailsTable";
export default function CollectionDetails() {
  return (
    <>
      <div className="collection-details-section-alignment">
        <div className="collection-details">
          <div>
            <img src={RightIcon} alt="RightIcon" />
          </div>
          <h1>Create collection</h1>
        </div>
        <div className="collection-details-table-alignment">
          <CollectionDetailsTable />
        </div>
      </div>
    </>
  );
}
