import React from "react";
import "./orderOverviewTab.scss";
export default function OrderOverviewTab() {
  return (
    <>
      <div className="order-overview-tab-design">
        <ul>
          <li>All </li>
          <li>New Orders (00) </li>
          <li>Verified Orders (00) </li>
          <li>In Process (00) </li>
          <li>Delivered Orders (00) </li>
          <li>Refund & Return (00) </li>
          <li>Canceled (00) </li>
        </ul>
      </div>
    </>
  );
}
