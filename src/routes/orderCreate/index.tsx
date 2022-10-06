import React, { useEffect, useState } from "react";
import "./orderCreate.scss";
import RightIcon from "../../assets/icons/right-icon.svg";
import DownIcon from "../../assets/icons/down.svg";
import NoteIcon from "../../assets/icons/note.svg";
import QuestionIcon from "../../assets/icons/quize.svg";
import { useHistory, useParams } from "react-router-dom";
import SelectProducts from "./selectProducts";
import AllProductModal from "./allProductModal";
import { useSelector } from "react-redux";
import { fetchAllCustomers } from "../../store/slices/allCustomersSlice";
import { useAppDispatch } from "../../store/store";
import { ApiPost } from "../../helpers/API/ApiData";
import { clearCreateOrder } from "../../store/slices/orderCreateSlice";
import { setHeaderClear, setHeaderMessage } from "../../store/slices/headerSlice";

export default function OrderCreate() {
  const dispatch = useAppDispatch();
  const storeSelectedProducts = useSelector((state: any) => state?.ordercreate?.data?.products);
  const allCustomers = useSelector((state: any) => state?.allCustomers?.data);
  const headerState = useSelector((state: any) => state?.header);
  const { customerId }: any = useParams();
  const allPaymentMethods = ["Cash", "Credit Card", "Debit Card", "Net Banking", "PayPal", "UPI", "Other"];
  const [selectProductsModal, setSelectProductsModal] = useState(false);
  const [allProductModal, setAllProductModal] = useState(false);
  const history = useHistory();
  const [selectedProducts, setSelectProducts] = useState<{}[]>();
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState<{
    firstName: string;
    lastName: string;
    _id: string;
  }>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>();
  const [showDropDown, setShowDropDown] = useState("");
  const [note, setNote] = useState<"">();

  const OpenProductBrowser = () => {
    setSelectProductsModal(!selectProductsModal);
  };

  const OpenCustomItem = () => {
    setAllProductModal(!allProductModal);
  };

  console.log("selectedProducts", selectedProducts);
  const handleCreateOrder = async () => {
    let data = {
      productId: selectedProducts?.map((item: any) => {
        return { id: item._id, quantity: item?.quantity || 1 };
      }),
      customerId: selectedCustomer?._id,
      isDraft: false,
      paymentMethod: selectedPaymentMethod,
      totalAmount: total,
      notes: note,
    };
    if (data) {
      try {
        let createOrderRes = await ApiPost("order/add-order", data);
        if (createOrderRes.status === 200) {
          dispatch(clearCreateOrder());
          history.push("/order-overview");
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  // common functions start ===============================================================================

  const handleToggle = (key: string) => {
    // console.log("key", key);
    if (showDropDown === key) {
      setShowDropDown("");
    } else {
      setShowDropDown(key);
    }
  };

  const handleSelectOption = (key: string, option: any) => {
    // console.log(key, "====", option);
    if (key === "customers") {
      setSelectedCustomer(option);
    }
    if (key === "paymentMethods") {
      setSelectedPaymentMethod(option);
    }
    handleToggle("");
  };

  // common functions end ===============================================================================

  useEffect(() => {
    setSelectProducts(storeSelectedProducts);
    let tempSubTotal =
      storeSelectedProducts?.length === 0
        ? 0
        : storeSelectedProducts?.reduce((a: any, b: any) => a + b?.salePrice * b?.quantity, 0);
    setSubTotal(tempSubTotal);

    let tempTotal =
      storeSelectedProducts?.length === 0
        ? 0
        : storeSelectedProducts?.reduce((a: any, b: any) => a + b?.salePrice * b?.quantity, 0);
    setTotal(tempTotal);
  }, [storeSelectedProducts]);

  useEffect(() => {
    if (!allCustomers || allCustomers?.length === 0) {
      let fetchCustomers: any = fetchAllCustomers();
      dispatch(fetchCustomers);
    } else if (customerId) {
      let tempCustomer = allCustomers?.find((item: any) => item?._id === customerId);
      setSelectedCustomer(tempCustomer);
    }
  }, [allCustomers]);

  // header button control start ===============================================================================

  useEffect(() => {
    setSelectProducts([])
    dispatch(setHeaderMessage("Create Order"));
    return () => {
      dispatch(setHeaderClear());
    };
  }, []);

  useEffect(() => {
    console.log("headerState", headerState);
    if (headerState?.saved) {
      // call api to save order here
      console.log("saved");
    }
    if (headerState?.discard) {
      history.push("/order-overview");
      // call api to discard order here
      console.log("discarded");
    }
  }, [headerState]);

  // header button control end ===============================================================================

  return (
    <>
      <div className="layout-alignment">
        <div className="order-create-section-alignment">
          <div className="box-title">
            <div
              onClick={() => {
                history.push("/order-overview");
              }}
            >
              <img src={RightIcon} alt="RightIcon" />
            </div>
            <div>
              <h1 onClick={handleCreateOrder} style={{ border: "1px dotted gray" }}>
                Create order
              </h1>
            </div>
          </div>
          <div className="white-box">
            <div className="grid">
              <div className="grid-items">
                <div className="product-box">
                  <div className="box-header-alignment">
                    <div>
                      <span>Products</span>
                    </div>
                    <div>
                      <p
                      // onClick={OpenCustomItem}
                      >
                        Add custom items
                      </p>
                    </div>
                  </div>
                  <div>
                    <div
                      className="all-product-modal-body"
                      style={{
                        overflowY: "scroll",
                        maxHeight: "50vh",
                        padding: "10px 5px",
                      }}
                    >
                      {selectedProducts?.length === 0
                        ? null
                        : selectedProducts?.map((res: any) => {
                            let productChecked = selectedProducts?.find((data: any) => data?._id === res?._id);
                            return (
                              <div className="product-details-alignment" key={res?._id}>
                                <div className="first-div-alignment">
                                  <div className="data-show" style={{ display: "flex" }}>
                                    <div>
                                      <img src={res?.mediaId[0]?.url} alt="ImageIcon" width="150" height="100" />
                                    </div>
                                    <div
                                      style={{
                                        textAlign: "end",
                                        width: "100%",
                                        paddingRight: "20px",
                                      }}
                                    >
                                      <span>{res?.name}</span>
                                      <div className="last-div-alignment">
                                        <p>
                                          {res?.quantity} X {res?.price}
                                        </p>
                                        <p>PKR {(res?.salePrice * res?.quantity).toFixed(2)}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                  <div className="light-button">
                    <button onClick={OpenProductBrowser}>Browse</button>
                  </div>
                </div>
                <div className="payment-box">
                  <div className="payment-box-left-right-alignment">
                    <div className="child-box-title">
                      <h3>Payment</h3>
                    </div>
                    <table>
                      <tr>
                        <td>Subtotal</td>
                        <td align="left"> </td>
                        <td align="right">PKR {selectedProducts?.length === 0 ? "0.00" : `${subTotal?.toFixed(2)}`}</td>
                      </tr>
                      <tr>
                        <td>Add discount</td>
                        <td align="left">-</td>
                        <td align="right">PKR 0.00</td>
                      </tr>
                      <tr>
                        <td>Add shipping</td>
                        <td align="left">-</td>
                        <td align="right">PKR 0.00</td>
                      </tr>
                      <tr>
                        <td>Tax</td>
                        <td align="left">Not calculated</td>
                        <td align="right">PKR 0.00</td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td align="left"></td>
                        <td align="right">PKR {selectedProducts?.length === 0 ? "0.00" : `${total?.toFixed(2)}`}</td>
                      </tr>
                    </table>
                  </div>
                  <div className="box-footer">
                    <span>Add a product to calculate total and view payment options.</span>
                  </div>
                </div>
              </div>
              <div className="grid-items">
                <div className="same-box-design">
                  <h5>Payment Status</h5>
                  <div className="input-relative" onClick={() => handleToggle("paymentMethods")}>
                    <input
                      type="text"
                      placeholder={!selectedPaymentMethod ? "Choose a payment method" : selectedPaymentMethod}
                      disabled
                    />
                    <div className="icon-alignment">
                      <img src={DownIcon} alt="DownIcon" />
                    </div>
                  </div>
                  {showDropDown === "paymentMethods" && (
                    <div className="options-container">
                      {allPaymentMethods?.map((res: any, index) => {
                        return (
                          <div
                            className="input-select-options"
                            onClick={(e) => handleSelectOption("paymentMethods", res)}
                            key={index}
                          >
                            <p>{res}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="same-box-design">
                  <h5>Find or Create a Customer</h5>
                  <div className="input-relative" onClick={() => handleToggle("customers")}>
                    <input
                      type="text"
                      placeholder={
                        !selectedCustomer
                          ? "Select customer by email"
                          : `${selectedCustomer?.firstName} ${selectedCustomer?.lastName}`
                      }
                      disabled
                    />
                    <div className="icon-alignment">
                      <img src={DownIcon} alt="DownIcon" />
                    </div>
                  </div>
                  {showDropDown === "customers" && (
                    <div className="options-container">
                      {allCustomers?.map((res: any) => {
                        return (
                          <div
                            className="input-select-options"
                            onClick={(e) => handleSelectOption("customers", res)}
                            key={res?._id}
                          >
                            <p>
                              {res?.firstName} {res?.lastName}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="same-box-design">
                  <h5>Fulfillment Center</h5>
                  <div className="input-relative">
                    <input type="text" placeholder="Select relevent center" disabled />
                    <div className="icon-alignment">
                      <img src={DownIcon} alt="DownIcon" />
                    </div>
                  </div>
                </div>
                <div className="add-note-box">
                  <div className="alignment">
                    <img src={NoteIcon} alt="NoteIcon" />
                    <input
                      type="text"
                      placeholder="Add a note"
                      value={note}
                      onChange={(e: any) => setNote(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="learn-more-button-center-alignment">
            <button>
              <img src={QuestionIcon} alt="QuestionIcon" />
              <span>
                Learn more about <a>orders</a>
              </span>
            </button>
          </div>
        </div>
      </div>
      {selectProductsModal && <SelectProducts selectedProducts={selectedProducts} toggle={OpenProductBrowser} />}
      {allProductModal && <AllProductModal selectedProducts={selectedProducts} toggle={OpenCustomItem} />}
    </>
  );
}
