import React, { useEffect, useMemo, useState } from "react";
import "./orderRefund.scss";
import LeftArrow from "../../assets/icons/left-new.svg";
import { useHistory } from "react-router-dom";
import UnfulfilledIcon from "../../assets/icons/unfulfilled.svg";
import FileImage from "../../assets/icons/file-image.svg";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { editOrderProduct } from "../../store/slices/editOrderProduct";
import { refundProduct } from "../../store/slices/refundProduct";

import { useDispatch } from "react-redux";
import { fetchOrderById } from "../../store/slices/OrderbyId";

export default function OrderRefund() {
  const history = useHistory();
  const { id }: any = useParams();
  const dispatch = useDispatch();

  const editProductData = useSelector((state: any) => state?.orderbyid?.data);

  const [allOrderData, setAllOrderData] = useState<any>();
  const [allProducts, setAllProducts] = useState<any>();
  const [calculatedData, setCalculatedData] = useState(0);
  const [resoneForRefund, setResoneForRefund] = useState("");
  const [refundPrice, setRefundPrice] = useState(0);
  console.log("allProducts", allProducts);

  useMemo(() => {
    let tempCalculatedData = allProducts?.reduce((prev: any, curr: any) => prev + curr?.salePrice * curr?.quantity, 0);
    setCalculatedData(tempCalculatedData?.toFixed(2));
  }, [allProducts]);

  const getTimeLine = () => {
    if (allOrderData && allOrderData?.productId?.length > 0) {
      setAllOrderData(editProductData);
      setAllProducts(editProductData?.productId);
    } else {
      let orderPreview: any = fetchOrderById(id);
      dispatch(orderPreview);
    }
  };

  useEffect(() => {
    getTimeLine();
  }, []);

  useEffect(() => {
    setAllOrderData(editProductData);
    setAllProducts(editProductData?.productId);
  }, [editProductData]);

  const HandleChangeQuantity = (e: any, product: any) => {
    const { name, value } = e.target;
    let inputValue = value;
    if (inputValue <= product?.totalQty) {
      setAllProducts(
        allProducts?.map((item: any) => {
          if (item?._id === product?._id) {
            return { ...item, [name]: inputValue };
          }
          return item;
        })
      );
    }
  };

  const handleQuantity = (e: any, key: string, product: any) => {
    if (key === "increase") {
      if (product?.quantity === product?.totalQty) {
        e.preventDefault();
      } else {
        setAllProducts(
          allProducts?.map((item: any) => {
            if (item?._id === product?._id) {
              return { ...item, quantity: +item?.quantity + 1 };
            }
            return item;
          })
        );
      }
    } else if (key === "decrease") {
      if (product?.quantity === 1) {
        e.preventDefault();
      } else {
        setAllProducts(
          allProducts?.map((item: any) => {
            if (item?._id === product?._id) {
              return { ...item, quantity: item?.quantity - 1 };
            }
            return item;
          })
        );
      }
    }
  };

  const HandleChange = (e: any, key: string) => {
    if (key === "reason") {
      setResoneForRefund(e.target.value);
    } else {
      setRefundPrice(e.target.value);
    }
  };

  const HandleSubmit = () => {
    const payload = {
      productId: allProducts,
      resoneForRefund: resoneForRefund,
      refundPrice: refundPrice,
      orderId: allOrderData?._id,
    };
    let refundData: any = refundProduct(payload);
    dispatch(refundData);
  };

  console.log("allOrderData", allOrderData);
  console.log("allProducts", allProducts);

  return (
    <>
      <div className="layout-alignment">
        <div className="order-refund-section-alignment">
          <div className="box-title-alignment">
            <NavLink to={`/order-preview/${id}`}>
              <div>
                <img src={LeftArrow} alt="LeftArrow" />
              </div>
            </NavLink>
            <h1>Refund</h1>
          </div>
          <div className="grid">
            <div className="grid-items">
              <div className="street-town-box-design">
                <div className="box-header-alignment">
                  <div>
                    <img src={UnfulfilledIcon} alt="UnfulfilledIcon" />
                    <span>Unfulfilled ({allProducts?.length})</span>
                  </div>
                  <div>
                    <h6>Street 2 Asif town</h6>
                  </div>
                </div>
                {allProducts?.map((prd: any) => {
                  return (
                    <div className="box-body-content-alignment">
                      <div className="image-uploada-alignment">
                        <div className="image-box">
                          <img src={prd?.mediaId[0]?.url} alt="FileImage" />
                        </div>
                        <div>
                          <h5>{prd?.name}</h5>
                          <h6>PKR {prd?.salePrice}</h6>
                        </div>
                      </div>
                      <div className="prize-section-alignment">
                        <div className="input-type-counter-alignment">
                          <input
                            type="text"
                            placeholder="0"
                            value={prd?.quantity}
                            name="quantity"
                            min="1"
                            max={prd?.totalQty}
                            onChange={(e) => HandleChangeQuantity(e, prd)}
                          />
                          <div className="counter-alignment">
                            <div onClick={(e) => handleQuantity(e, "increase", prd)}>
                              <svg
                                width="9"
                                height="6"
                                viewBox="0 0 9 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0.244989 4.18582L3.11099 0.395824C3.28772 0.147482 3.57368 0 3.87849 0C4.18329 0 4.46926 0.147482 4.64599 0.395824L7.77899 4.18582C8.03554 4.50645 8.09548 4.94198 7.93509 5.31999C7.7747 5.698 7.41983 5.95753 7.01099 5.99582L1.01099 5.99582C0.602505 5.95688 0.248263 5.6971 0.0883389 5.31921C-0.0715854 4.94132 -0.0114413 4.50617 0.244989 4.18582Z"
                                  fill="#202223"
                                  fill-opacity="0.45"
                                />
                              </svg>
                            </div>
                            <div onClick={(e) => handleQuantity(e, "decrease", prd)}>
                              <svg
                                width="9"
                                height="6"
                                viewBox="0 0 9 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M8.75501 1.81418L5.88901 5.60418C5.71228 5.85252 5.42632 6 5.12151 6C4.81671 6 4.53074 5.85252 4.35401 5.60418L1.22101 1.81417C0.964463 1.49355 0.904518 1.05802 1.06491 0.680005C1.2253 0.301995 1.58017 0.0424679 1.98901 0.00417505L7.98901 0.00417557C8.3975 0.0431237 8.75174 0.302904 8.91166 0.680793C9.07159 1.05868 9.01144 1.49383 8.75501 1.81418Z"
                                  fill="#202223"
                                  fill-opacity="0.45"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="final-prize-alignment">
                          <span>PKR {prd?.quantity * prd?.salePrice}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="removed-text-style">
                  <span>Refunded items will be removed from the order.</span>
                </div>
              </div>
              <div className="reason-for-refund">
                <div className="refund-input">
                  <label>Reason for refund</label>
                  <input type="text" onChange={(e) => HandleChange(e, "reason")} />
                  <span>Only you and other staff can see this reason.</span>
                </div>
              </div>
            </div>
            <div className="grid-items">
              <div className="summary-box">
                <div className="box-header">
                  <h5>Summary</h5>
                  <p>No items selected.</p>
                </div>
                <div className="box-body">
                  <h4>Refund Amount</h4>
                  <div className="new-input">
                    <label>Manual</label>
                    <input type="text" placeholder="PKR 0.00" onChange={(e) => HandleChange(e, "price")} />
                    <span>PKR {calculatedData?.toLocaleString()} available for refund</span>
                  </div>
                  <div className="checkbox-text-alignment">
                    <input type="checkbox" name="a" />
                    <label>
                      Send a <span>notification</span> to the customer
                    </label>
                  </div>
                </div>
                <div className={resoneForRefund.trim() ? "box-footer-green" : "box-footer"}>
                  {resoneForRefund.length > 0 ? (
                    <button onClick={() => HandleSubmit()}>Refund PKR {calculatedData}</button>
                  ) : (
                    <button disabled>Refund PKR {refundPrice ? refundPrice : calculatedData}</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
