import React, { useEffect, useRef, useState } from "react";
import "./orderPreview.scss";
import OrderPreviewHeader from "./orderPreviewHeader";
import RemoveIcon from "../../assets/icons/remove.svg";
import DangerIcon from "../../assets/icons/danger.svg";
import UploadIcon from "../../assets/icons/upload.svg";
import TruckIcon from "../../assets/icons/truck.svg";
import SmileIcon from "../../assets/icons/smile.svg";
import "./orderPreviewHeader/orderPreviewHeader.scss";
import HashIcon from "../../assets/icons/hash.svg";
import QuestionIcon from "../../assets/icons/quize.svg";
import SignIcon from "../../assets/icons/sign.svg";
import PaperclipIcon from "../../assets/icons/paperclip.svg";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { fetchOrderById } from "../../store/slices/OrderbyId";
import { postTimeline } from "../../store/slices/postTimeline";
import LeftArrow from "../../../src/assets/icons/left-new.svg";
import DownIcon from "../../../src/assets/icons/new-down-icon.svg";
import { fetchAllOrders } from "../../store/slices/allOrdersSlice";
import { updateOrderStatus } from "../../store/slices/updateOrderStatus";
export default function OrderPreview() {
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const allOrderData = useSelector((state: any) => state?.orderbyid?.data);
  const fetchOrderId = useSelector((state: any) => state?.allorders?.data).map((order: any) => order?._id);
  console.log("allOrderData", allOrderData);

  const [timeline, setTimeline] = useState("");

  const HandleChange = (e: any) => {
    const { value } = e.target;
    setTimeline(value);
  };

  const getTimeLine = () => {
    let orderPreview: any = fetchOrderById(id);
    dispatch(orderPreview);
  };

  const HandleSubmit = () => {
    const payload: any = {
      orderId: allOrderData?._id,
      timeline: timeline,
    };
    if (timeline.trim()) {
      let data: any = postTimeline(payload);
      dispatch(data)
        .then(() => {
          setTimeline("");
          getTimeLine();
        })
        .catch();
    }
  };

  useEffect(() => {
    getTimeLine();
    if (orderIndex?.length === 0) {
      let calledData: any = fetchAllOrders();
      dispatch(calledData);
    }
  }, [id]);

  let orderIndex = fetchOrderId?.length === 0 ? 0 : fetchOrderId?.indexOf(allOrderData?._id);

  const HandleChangeStatus = () => {
    let payload = {
      orderId: allOrderData?._id,
      status: true,
    };
    let changeStatus: any = updateOrderStatus(payload);
    dispatch(changeStatus)
      .then(() => getTimeLine())
      .catch();
  };

  return (
    <>
      <div className="layout-alignment order-preview-section-alignment-page">
        <div className="order-preview-section-alignment">
          <div className="order-preview-header-section-alignment">
            <div className="left-content-alignment">
              <NavLink to={`/order-overview`}>
                <div className="back-arrow">
                  <img src={LeftArrow} alt="LeftArrow" />
                </div>
              </NavLink>
              <div className="text-style">
                <span>{allOrderData?.orderIndex}</span>
              </div>
              <div className="cod-button-style">
                <button>{allOrderData?.paymentMethod}</button>
              </div>
              <div className="new-order-button">
                <button onClick={() => history.push("/order-create")}>New Order</button>
              </div>
            </div>
            <div className="right-content-alignment">
              <NavLink to={`/order-refund/${allOrderData?._id}`}>
                <div className="refund-text">
                  <span>Refund</span>
                </div>
              </NavLink>
              <NavLink to={`/edit-order/${allOrderData?._id}`}>
                <div className="edit-text-style">
                  <span>Edit</span>
                </div>
              </NavLink>
              <div className="more-action-alignment">
                <div>
                  <span>More actions</span>
                </div>
                <div>
                  <img src={DownIcon} alt="DownIcon" />
                </div>
              </div>
              <div className="left-right-arrow-box">
                <button
                  onClick={(e) => history?.push("/order-preview/" + fetchOrderId[orderIndex - 1])}
                  disabled={orderIndex === 0}
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 13L1 7L7 1"
                      stroke="#202223"
                      stroke-opacity={orderIndex === 0 ? "0.25" : 1}
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => history?.push("/order-preview/" + fetchOrderId[orderIndex + 1])}
                  disabled={orderIndex === fetchOrderId?.length - 1}
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 13L7 7L1 1"
                      stroke={orderIndex === fetchOrderId?.length - 1 ? "#202223" : "black"}
                      stroke-opacity={orderIndex === fetchOrderId?.length - 1 ? "0.25" : 1}
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="child-header-content-alignment">
            <p>July 18, 2022 at 12:43 am from Draft Orders</p>
          </div>
        </div>
        <div className="order-preview-grid">
          <div className="order-preview-grid-items">
            <div className="infulfilled-box">
              <div className="box-header-alignment">
                <div>
                  <img src={DangerIcon} alt="DangerIcon" />
                </div>
                <div>
                  <span>Unfulfilled ({allOrderData?.productId?.length})</span>
                </div>
              </div>
              <div className="all-box-content-box-alignment">
                {allOrderData?.productId?.map((res: any) => {
                  return (
                    <div className="all-box-desgin">
                      <div className="left-content-alignment">
                        <div className="image-box">
                          <img src={res?.mediaId[0]?.url} alt="UploadIcon" />
                        </div>
                        <div className="related-text">
                          <span>{res?.name}</span>
                        </div>
                      </div>
                      <div className="right-content-alignment">
                        <span>
                          PKR {res?.salePrice} × {res?.quantity}
                        </span>
                        <span>PKR {res?.salePrice * res?.quantity}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="box-footer-alignment">
                {allOrderData?.status == true ? (
                  <button>Verified</button>
                ) : (
                  <button onClick={() => HandleChangeStatus()}>Verify</button>
                )}
              </div>
            </div>
            <div className="cash-on-delivery-box">
              <div className="box-header">
                <div>
                  <img src={TruckIcon} alt="TruckIcon" />
                </div>
                <div>
                  <span>Cash on Delivery</span>
                </div>
              </div>
              <div className="order-list-alignment">
                <p>Original order • {moment(allOrderData?.createdAt).format("LL")}</p>
              </div>
              <div className="text-left-right-content-alignment">
                <table>
                  <tr>
                    <td align="left">Subtotal</td>
                    <td align="left">{allOrderData?.productId?.length} items</td>
                    <td align="right">PKR {allOrderData?.totalAmount?.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td align="left">Shipping</td>
                    <td align="left">0 items</td>
                    <td align="right">PKR 0</td>
                  </tr>
                  <tr>
                    <td align="left">Discounts</td>
                    <td align="left">0 items</td>
                    <td align="right">PKR 0</td>
                  </tr>
                  <tr>
                    <td align="left">Total</td>
                    <td align="left"></td>
                    <td align="right">PKR {allOrderData?.totalAmount?.toFixed(2)}</td>
                  </tr>
                </table>
              </div>
              <div className="box-footer-alignment">
                <p>{allOrderData?.paymentMethod}</p>
                <span>PKR {allOrderData?.totalAmount?.toFixed(2)}</span>
              </div>
            </div>
            <div className="timeline-all-content-alignment">
              <div className="header-alignment">
                <div>
                  <p>Timeline</p>
                </div>
                <div>
                  <span>Show comments</span>
                </div>
              </div>
              <div className="timeline-grid">
                <div className="timeline-grid-items">
                  <div className="main-timeline-icon"></div>
                </div>
                <div className="timeline-grid-items">
                  <div className="main-box-leave-a-comment">
                    <input
                      type="text"
                      placeholder="Leave a comment"
                      onChange={(e) => HandleChange(e)}
                      value={timeline}
                    />
                    <div className="typing-box-alignment">
                      <div className="icon-alignment">
                        <img src={SmileIcon} alt="SmileIcon" />
                        <img src={SignIcon} alt="SignIcon" />
                        <img src={HashIcon} alt="HashIcon" />
                        <img src={PaperclipIcon} alt="PaperclipIcon" />
                      </div>
                      <div className={timeline?.trim() ? "post-button-green" : "post-button"}>
                        <button onClick={() => HandleSubmit()}>Post</button>
                      </div>
                    </div>
                  </div>
                  <div className="right-content-alignment">
                    <p>Only you and other staff can see comments</p>
                    <span>TODAY</span>
                  </div>
                </div>
              </div>
              {allOrderData?.timeline?.map((time: any) => {
                return (
                  <div className="timeline-sub-grid">
                    <div className="timeline-sub-grid-items">
                      <div className="sub-icon"></div>
                    </div>
                    <div className="timeline-sub-grid-items">
                      <div className="new-content-alignment">
                        <p>
                          {time?.message}
                          {/* {"  "}({allOrderData?.customerId?.email}). */}
                        </p>
                        <span>{moment(time?.date).format("LT")}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="timeline-sub-grid  timeline-sub-grid-remove-border">
                <div className="timeline-sub-grid-items">
                  <div className="sub-icon"></div>
                </div>
                <div className="timeline-sub-grid-items">
                  <div className="new-content-alignment">
                    <p>
                      You created this order for {allOrderData?.customerId?.name} ({allOrderData?.customerId?.email}).
                    </p>
                    <span>{moment(allOrderData?.createdAt).format("LT")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-preview-grid-items">
            <div className="notes-box">
              <div className="box-header-alignment">
                <div>
                  <p>Notes</p>
                </div>
                <div>
                  <span>Edit</span>
                </div>
              </div>
              <div className="child-text-style">
                <p>Call before delivery</p>
              </div>
            </div>
            <div className="customer-box">
              <div className="box-header-alignment">
                <div>
                  <p>Customer</p>
                </div>
                <NavLink to={`/customer-create/${allOrderData?.customerId?._id}`}>
                  <div>
                    <span>Edit</span>
                  </div>
                </NavLink>
              </div>
              <div className="order-list-style-text">
                <a>
                  {allOrderData?.customerId?.firstName ? allOrderData?.customerId?.firstName : ""}{" "}
                  {allOrderData?.customerId?.lastName ? allOrderData?.customerId?.lastName : ""}
                </a>
                <span>1 orders</span>
              </div>
              <div className="content-information">
                <div className="content-information-header-alignment">
                  <div>
                    <p>Contact Information </p>
                  </div>
                  <NavLink to={`/customer-create/${allOrderData?.customerId?._id}`}>
                    <div>
                      <span>Edit</span>
                    </div>
                  </NavLink>
                </div>
                <div className="information-content-all-alignment">
                  <div>
                    <a>{allOrderData?.customerId?.email}</a>
                    <a>{allOrderData?.customerId?.number}</a>
                    <span>{allOrderData?.customerId?.number ? "" : "No phone number"}</span>
                  </div>
                  <NavLink to={`/customer-create/${allOrderData?.customerId?._id}`}>
                    <div>
                      <img src={RemoveIcon} alt="RemoveIcon" />
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="shipping-address-alignment">
                <div className="content-information-header-alignment">
                  <div>
                    <p>SHIPPING ADDRESS</p>
                  </div>
                  <NavLink to={`/customer-create/${allOrderData?.customerId?._id}`}>
                    <div>
                      <img src={RemoveIcon} alt="remove" />
                    </div>
                  </NavLink>
                </div>

                {/* ----------------------------------------------- customer Address map ----------------------------------------------- */}
                {/* {allOrderData?.customerId?.address?.map((res: any) => {
                  return (
                    <div className="add-text">
                      <span>
                        {allOrderData?.customerId?.firstName ? allOrderData?.customerId?.firstName : ""}{" "}
                        {allOrderData?.customerId?.lastName ? allOrderData?.customerId?.lastName : ""}
                        <br />
                        {res?.address}
                        {res?.address1}
                        <br />
                        {res?.city} - {res?.pincode} +92
                        {allOrderData?.customerId?.number}
                      </span>
                    </div>
                  );
                })} */}
                <div className="add-text">
                  <span>
                    {allOrderData?.customerId?.firstName ? allOrderData?.customerId?.firstName : ""}{" "}
                    {allOrderData?.customerId?.lastName ? allOrderData?.customerId?.lastName : ""}
                    <br />
                    {allOrderData?.customerId?.apartment}
                    {allOrderData?.customerId?.address}
                    <br />
                    {allOrderData?.customerId?.city} - {allOrderData?.customerId?.pincode} +92
                    {allOrderData?.customerId?.number}
                  </span>
                </div>
              </div>
              <div className="billing-address">
                <p>BILLING ADDRESS</p>
                <span>Same as shipping address</span>
              </div>
            </div>
            <div className="conversion-summary-box">
              <h4>Conversion summary</h4>
              <p>There aren‘t any conversion details available for this order</p>
              <span>Learn more</span>
            </div>

            <div className="fraud-analysis-box">
              <div className="content-alignment">
                <h5>Fraud analysis</h5>
                <ul>
                  <li>Card Verification Value (CVV) isn't available</li>
                  <li>Billing address or credit card's address wasn't available</li>
                </ul>
              </div>
              <div className="view-button">
                <a>View full analysis</a>
              </div>
            </div>

            <div className="tag-box">
              <span>Tags</span>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
