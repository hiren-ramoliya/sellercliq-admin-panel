import React, { useEffect, useState } from "react";
import "./tableData.scss";
import PrintIcon from "../../../../../assets/icons/Print.svg";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchOrderById } from "../../../../../store/slices/OrderbyId";
export default function TableData(props: any) {
  const { search } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const allOrderData = useSelector((state: any) => state?.allorders?.data);
console.log('allOrderData',allOrderData);

  const HandleOrderPreview = (odr: any) => {
    let calledData: any = fetchOrderById(odr?._id);
    dispatch(calledData);
    history.push(`/order-preview/${odr?._id}`);
  };

  const HandleChecked = (e: any) => {
    e.stopPropagation();
  };
  return (
    <>
      <div className="table-data-list-all-content-alignment">
        <table>
          <tr>
            <th align="left">
              <input type="checkbox" name="a" />
            </th>
            <th align="left">Order</th>
            <th align="left">Status</th>
            <th align="left">Date</th>
            <th align="left">Customer</th>
            <th align="left">Location</th>
            <th align="left">Pay</th>
            <th align="left">Total</th>
            <th align="left">Actions</th>
          </tr>
          {(!search
            ? allOrderData
            : allOrderData?.filter(
                (order: any) =>
                  order?.customerId?.firstName?.toLowerCase()?.includes(search) ||
                  order?.customerId?.lastName?.toLowerCase()?.includes(search) ||
                  order?.totalAmount?.toString()?.toLowerCase()?.includes(search) ||
                  order?.orderIndex?.toString()?.toLowerCase()?.includes(search) ||
                  order?.paymentMethod?.toString()?.toLowerCase()?.includes(search)
              )
          )?.map((odr: any) => {
            return (
              <tr onClick={() => HandleOrderPreview(odr)}>
                <td align="left">
                  <input type="checkbox" onClick={(e) => HandleChecked(e)} />
                </td>
                <td align="left">
                  <div className="data-list-style">
                    <span>{odr?.orderIndex}</span>
                  </div>
                </td>
                <td align="left">
                  <div className="data-list-style">
                    <span>{odr?.status === true ? "Verified" : "Verify"}</span>
                  </div>
                </td>
                <td align="left">
                  <div className="data-list-style">
                    <span>{moment(odr?.createdAt).calendar()}</span>
                  </div>
                </td>
                <td align="left">
                  <div className="data-list-style">
                    <span>
                      {odr?.customerId?.firstName} {odr?.customerId?.lastName}
                    </span>
                  </div>
                </td>
                <td align="left">
                  <div className="data-list-style">
                    <span>{odr?.customerId?.country}</span>
                  </div>
                </td>
                <td align="left">
                  <div className="data-list-style">
                    <span>{odr?.paymentMethod}</span>
                  </div>
                </td>
                <td align="left">
                  <div className="data-list-style">
                    <span>PKR {odr?.totalAmount}</span>
                  </div>
                </td>

                <td align="left">
                  <div className="image-style">
                    <img src={PrintIcon} alt="PrintIcon" />
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}
