import React, { useEffect, useMemo, useState } from "react";
import "./customerProfile.scss";
import LeftArrowLight from "../../assets/icons/Arrow_Left.svg";
import RemoveIcon from "../../assets/icons/remove.svg";
import UplaodDummyImage from "../../assets/icons/upload-dummy.svg";
import DangerIcon from "../../assets/icons/danger.svg";
import UploadIcon from "../../assets/icons/upload.svg";
import TruckIcon from "../../assets/icons/truck.svg";
import SmileIcon from "../../assets/icons/smile.svg";
import HashIcon from "../../assets/icons/hash.svg";
import SignIcon from "../../assets/icons/sign.svg";
import timelineUnchecked from "../../assets/icons/timeline-unchecked.svg";
import timelineChecked from "../../assets/icons/timeline-checked.svg";
import PaperclipIcon from "../../assets/icons/paperclip.svg";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { fetchCustomerById } from "../../store/slices/customerById";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import moment from "moment";
import { fetchAllCustomers } from "../../store/slices/allCustomersSlice";
import { ApiDelete, ApiPut } from "../../helpers/API/ApiData";

export default function CustomerProfile() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const customer = useSelector((state: any) => state.customerById?.data);
  const customerOrders = useSelector((state: any) => state.customerById?.orderData);
  const allCustomersIds = useSelector((state: any) => state?.allCustomers?.data)?.map((customer: any) => customer._id);
  const { id }: any = useParams();
  console.log("customerOrders", customerOrders);

  const [ordersTotal, setOrdersTotal] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [timelineMessage, setTimelineMessage] = useState("");

  const handleCreateOrder = () => {
    if (customer?._id) {
      history.push("/order-create/" + customer?._id);
    } else {
      alert("Something went wrong! Please try again later.");
    }
  };

  const handleAddTimeLine = async () => {
    const data = {
      timeline: timelineMessage,
    };
    try {
      let addTimelineRes = await ApiPut(`customer/add-customer-timeline/${customer?._id}`, data);
      if (addTimelineRes.status === 200) {
        dispatch(fetchCustomerById(id));
        setTimelineMessage("");
      } else {
        console.log("Error in adding timeline");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteShow = async () => {
    if (window?.confirm("Press a button!")) {
      try {
        let customerDeleteRes = await ApiDelete("customer/remove-customer/" + customer?._id);
        if (customerDeleteRes.status === 200) {
          history.push("/customer");
        } else {
          console.log("Error in deleting customer");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Delete Customer Canceled!");
    }
  };

  useMemo(() => {
    let totalOrderAmount =
      customerOrders?.length === 0 ? 0 : customerOrders?.reduce((a: any, b: any) => a + b?.totalAmount, 0);
    console.log(totalOrderAmount);
    setOrdersTotal(totalOrderAmount);
    let tempAOV = customerOrders?.length === 0 ? 0 : Math.round(totalOrderAmount / customerOrders?.length);
    setAverageOrderValue(tempAOV);
  }, [customerOrders]);

  useEffect(() => {
    const fetchCustomer: any = fetchCustomerById(id);
    dispatch(fetchCustomer);
    if (allCustomersIds?.length === 0) {
      let fetchCustomers: any = fetchAllCustomers();
      dispatch(fetchCustomers);
    }
  }, [id]);

  var a = moment();
  var b = moment(customer?.createdAt);
  let customerFrom = a.diff(b, "days");

  let lastOrder = customerOrders?.length > 0 ? customerOrders?.slice(-1)[0] : null;
  let thisCustomerIndex = allCustomersIds?.length === 0 ? 0 : allCustomersIds?.indexOf(customer?._id);

  return (
    <>
      <div className="layout-alignment">
        <div className="customer-profile-content-alignment">
          <div className="customer-profile-header-alignment">
            <div className="left-side-header-content">
              <div onClick={() => history.push("/customer")}>
                <img src={LeftArrowLight} alt="LeftArrowLight" />
              </div>
              <div>
                <h1>
                  {customer?.firstName} {customer?.lastName}
                </h1>
              </div>
            </div>
            <div className="right-side-header-content">
              <div className="left-right-arrow-box">
                <button
                  onClick={(e) => history?.push("/customer-profile/" + allCustomersIds[thisCustomerIndex - 1])}
                  disabled={thisCustomerIndex === 0}
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 13L1 7L7 1"
                      stroke={thisCustomerIndex === 0 ? "#202223" : "black"}
                      stroke-opacity={thisCustomerIndex === 0 ? "0.25" : 1}
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => history?.push("/customer-profile/" + allCustomersIds[thisCustomerIndex + 1])}
                  disabled={thisCustomerIndex === allCustomersIds?.length - 1}
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 13L7 7L1 1"
                      stroke={thisCustomerIndex === allCustomersIds?.length - 1 ? "#202223" : "black"}
                      stroke-opacity={thisCustomerIndex === allCustomersIds?.length - 1 ? "0.25" : 1}
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="customer-content-sub-header-alignment">
            <p>{/* {customer?.city}, {customer?.country} • Customer for {customerFrom} days */}</p>
          </div>
          <div className="grid">
            <div className="grid-items">
              <div className="amount-box-alignment">
                <div>
                  <h2>PKR {ordersTotal?.toLocaleString()}</h2>
                  <p>Amount spent</p>
                </div>
                <div>
                  <h2>{customerOrders?.length || 0}</h2>
                  <p>Orders</p>
                </div>
                <div>
                  <h2>PKR {averageOrderValue?.toLocaleString()}</h2>
                  <p>Average order value</p>
                </div>
              </div>
              <div className="last-order-place-box">
                <div className="child-box">
                  <p>Last order placed</p>
                  <div className="sub-box-content-alignment">
                    <Link to={`/order-preview/${lastOrder?._id}`}>Order {lastOrder?.orderIndex || ""}</Link>
                    <h5>{moment(lastOrder?.createdAt)?.calendar()}</h5>
                  </div>
                  <h6>
                    PKR {!lastOrder?.totalAmount ? 0 : lastOrder?.totalAmount?.toLocaleString()} from{" "}
                    {lastOrder?.paymentMethod || ""}
                    {/* from Draft Orders */}
                  </h6>
                  {lastOrder?.productId?.map((res: any) => {
                    return (
                      <div className="order-list-alignment">
                        <div className="image-box">
                          <img src={res?.id?.image} alt="UplaodDummyImage" />
                        </div>
                        <div>
                          <a>{res?.id?.name}</a>
                        </div>
                      </div>
                    );
                  })}
                  {/* <div className="order-list-alignment">
                    <div>
                      <img src={UplaodDummyImage} alt="UplaodDummyImage" />
                    </div>
                    <div>
                      <a>Test</a>
                    </div>
                  </div> */}

                  <div className="last-order-footer-alignment">
                    <span>View all orders</span>
                    <button onClick={handleCreateOrder}>Create order</button>
                  </div>
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
                        value={timelineMessage}
                        onChange={(e) => setTimelineMessage(e.target.value)}
                      />
                      <div className="typing-box-alignment">
                        <div className="icon-alignment">
                          <img src={SmileIcon} alt="SmileIcon" />
                          <img src={SignIcon} alt="SignIcon" />
                          <img src={HashIcon} alt="HashIcon" />
                          <img src={PaperclipIcon} alt="PaperclipIcon" />
                        </div>
                        <div className={timelineMessage?.trim() ? "post-button-green" : "post-button"}>
                          <button onClick={handleAddTimeLine} disabled={!timelineMessage}>
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="right-content-alignment">
                      <p>Only you and other staff can see comments</p>
                      {/* <span>TODAY</span> */}
                    </div>
                  </div>
                </div>
                {customer?.timeline?.length > 0 &&
                  customer?.timeline?.map((item: any, index: number) => {
                    console.log("timeline date", moment(item.date).format("l"));
                    let showDate =
                      index == 0 ||
                      moment(item.date).format("l") !== moment(customer?.timeline[index - 1].date).format("l");
                    return (
                      <>
                        {showDate && (
                          <div className="date-alignment">
                            <span>{moment(item.date).calendar()}</span>
                          </div>
                        )}
                        <div className="timeline-sub-grid" key={item?._id}>
                          <div className="timeline-sub-grid-items">
                            {/* <div className="sub-icon"></div> */}
                            <div className="timeline-sub-icon">
                              {item?.isChecked ? (
                                <img src={timelineChecked} alt="checked" />
                              ) : (
                                <img src={timelineUnchecked} alt="unchecked" />
                              )}
                            </div>
                          </div>
                          <div className="timeline-sub-grid-items">
                            <div className="new-content-alignment">
                              <p>{item?.message}</p>
                              <span>{moment(item?.date)?.format("LT")}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                <div className="timeline-sub-grid timeline-sub-grid-remove-border">
                  <div className="timeline-sub-grid-items">
                    <div className="sub-icon"></div>
                  </div>
                  <div className="timeline-sub-grid-items">
                    <div className="new-content-alignment">
                      <div>
                        <p>
                          You sent an order invoice email to {customer?.firstName} {customer?.lastName} (
                          {customer?.email}).
                        </p>
                        <a>Taxes are calculated by</a>
                      </div>

                      <span>12:52 AM</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="delete-customer-button">
                <button onClick={(e) => handleDeleteShow()}>Delete customer</button>
              </div>
            </div>
            <div className="grid-items">
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
                  <p>{customer?.notes || ""}</p>
                </div>
              </div>
              <div className="customer-box">
                <div className="box-header-alignment">
                  <div>
                    <p>Customer</p>
                  </div>
                  <div onClick={(e) => history?.push("/customer-create/" + customer?._id)}>
                    <span>Edit</span>
                  </div>
                </div>
                <div className="order-list-style-text">
                  <a>
                    {customer?.firstName} {customer?.lastName}
                  </a>
                  <span>{customerOrders?.length || 0} orders</span>
                </div>
                <div className="content-information">
                  <div className="content-information-header-alignment">
                    <div>
                      <p>Contact Information </p>
                    </div>
                    <div>
                      <div onClick={(e) => history?.push("/customer-create/" + customer?._id)}>
                        <span>Edit</span>
                      </div>
                    </div>
                  </div>
                  <div className="information-content-all-alignment">
                    <div>
                      <a>{customer?.email}</a>
                      <span>{!customer?.number ? "No phone number" : customer?.number}</span>
                    </div>
                    <div>
                      <img src={RemoveIcon} alt="RemoveIcon" />
                    </div>
                  </div>
                </div>
                <div className="shipping-address-alignment">
                  <div className="content-information-header-alignment">
                    <div>
                      <p>DEFAULT ADDRESS</p>
                    </div>
                    <div>
                      <a>Manage</a>
                    </div>
                  </div>
                  <div className="add-text">
                    {/* <span>
                      {customer?.firstName} {customer?.lastName} {customer?.address} {customer?.city}{" "}
                      {customer?.pincode} &nbsp;
                      {customer?.country} {customer?.number}
                    </span> */}
                    <a>Add new address</a>
                  </div>
                </div>
                <div className="billing-address">
                  <p>TAX SETTINGS</p>
                  <span>No exemptions</span>
                </div>
              </div>
              <div className="marketing-status-box">
                <div className="box-header-alignment">
                  <p>Marketing status</p>
                  <a>Edit</a>
                </div>
                <div className="list-type-text-alignment">
                  <ul>
                    <li>SMS not subscribed</li>
                    <li>Email is not subscribed</li>
                  </ul>
                </div>
                <div className="last-update-text-style">
                  <p>Last updated on July 14, 2022.</p>
                </div>
              </div>
              <div className="customer-data-show">
                <div className="first-data-show">
                  <h2>Customer data</h2>
                  <h3>REQUEST CUSTOMER DATA</h3>
                  <p>
                    This customer's data was requested about 0 seconds ago. You'll receive an email when a copy of the
                    customer's data has been generated. Learn more about <a>requesting customer data.</a>
                  </p>
                  <button>View customer data</button>
                </div>
                <div className="first-data-show">
                  <h3>ERASE PERSONAL DATA</h3>
                  <p>
                    This customer's data was requested about 0 seconds ago. You'll receive an email when a copy of the
                    customer's data has been generated. Learn more about <a>requesting customer data.</a>
                  </p>
                  <button>View customer data</button>
                </div>
              </div>
              <div className="tag-box">
                <span>Tags</span>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
