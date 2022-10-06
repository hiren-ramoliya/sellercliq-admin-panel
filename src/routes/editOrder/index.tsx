import React, { useEffect, useState, useMemo } from "react";
import LeftArrow from "../../assets/icons/left-new.svg";
import ModalSearch from "../../components/modalSearch";
import QuestionIcon from "../../assets/icons/quize.svg";
import UnfulfilledIcon from "../../assets/icons/unfulfilled.svg";
import FileImage from "../../assets/icons/file-image.svg";
import TruckIcon from "../../assets/icons/truck.svg";
import { useHistory } from "react-router-dom";
import "./editOrder.scss";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { editOrderProduct } from "../../store/slices/editOrderProduct";
import { useDispatch } from "react-redux";
import { fetchOrderById } from "../../store/slices/OrderbyId";
import SelectProducts from "../orderCreate/selectProducts";
import AllProductModal from "../orderCreate/allProductModal";
// import EditedProductData from "./EditedProductData";
export default function EditOrder() {
  const history = useHistory();
  const { id }: any = useParams();
  const dispatch = useDispatch();

  const editProductData = useSelector((state: any) => state?.orderbyid?.data);
  const storeSelectedProducts: any = useSelector((state: any) => state?.ordercreate?.data?.products);

  const [resoneForEdit, setResoneForEdit] = useState("");
  const [openBrowseModal, setOpenBrowseModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [allOrderData, setAllOrderData] = useState<any>();
  const [allProducts, setAllProducts] = useState<any>();
  const [calculatedData, setCalculatedData] = useState(0);
  const [errors, setError] = useState<any>();

  console.log("allOrderData", allOrderData);
  console.log("allProducts", allProducts);
  console.log("editProductData", editProductData);
  console.log("storeSelectedProducts", storeSelectedProducts);

  useMemo(() => {
    let tempCalculatedData = allProducts?.reduce((prev: any, curr: any) => prev + curr?.salePrice * curr?.quantity, 0);
    setCalculatedData(tempCalculatedData?.toFixed(2));
  }, [allProducts]);

  useEffect(() => {
    getTimeLine();
  }, [allOrderData]);

  // useEffect(() => {
  //   if (storeSelectedProducts?.length > 0) {
  //     setAllOrderData({ ...allOrderData, productId: storeSelectedProducts });
  //     setAllProducts(storeSelectedProducts);
  //     console.log("allOrderData", allOrderData);
  //   }
  // }, [storeSelectedProducts]);

  useEffect(() => {
    if (storeSelectedProducts?.length === 0) {
      setAllOrderData(editProductData);
      setAllProducts(editProductData?.productId);
    } else {
      setAllOrderData({ ...allOrderData, productId: storeSelectedProducts });
      setAllProducts(storeSelectedProducts);
      console.log("allOrderData", allOrderData);
    }
  }, [editProductData, storeSelectedProducts]);

  const getTimeLine = () => {
    if (allOrderData && allOrderData?.productId?.length > 0) {
      setSelectedProducts(editProductData);
    } else {
      let orderPreview: any = fetchOrderById(id);
      dispatch(orderPreview);
    }
  };

  const HandleChange = (e: any) => {
    setResoneForEdit(e.target.value);
  };

  const HandleSubmit = () => {
    const payload = {
      productId: allProducts,
      resoneForEdit: resoneForEdit,
      orderId: allOrderData?._id,
    };
    let postEditData: any = editOrderProduct(payload);
    dispatch(postEditData).then(() => history.push(`/order-overview`));
  };

  const OpenBrowseModal = () => {
    setOpenBrowseModal(!openBrowseModal);
  };

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

  console.log("allOrderData", allOrderData);

  return (
    <>
      <div className="layout-alignment">
        <div className="edit-section-order-space-alignment">
          <div className="box-title-alignment">
            <NavLink to={`/order-preview/${id}`}>
              <div onClick={() => history.push("/order-preview")}>
                <img src={LeftArrow} alt="LeftArrow" />
              </div>
            </NavLink>
            <h1>Edit order</h1>
          </div>
          <div className="grid">
            <div className="grid-items">
              <div className="add-product-main-box-alignment">
                <div className="add-product-details-alignment">
                  <div className="header-alignment">
                    <p>Add product</p>
                    <span>Add custom item</span>
                  </div>
                  <div className="search-grid">
                    <div className="search-grid-items">
                      <ModalSearch />
                    </div>
                    <div className="search-grid-items">
                      <button onClick={() => OpenBrowseModal()}>Browse</button>
                    </div>
                  </div>
                </div>
                <div className="unfufilled-space">
                  <div className="box-header-alignment">
                    <div>
                      <img src={UnfulfilledIcon} alt="UnfulfilledIcon" />
                      <span>Unfulfilled ({allOrderData?.productId?.length})</span>
                    </div>
                    <div>
                      <h6>{allOrderData?.customerId?.address}</h6>
                    </div>
                  </div>
                  {allProducts?.map((prd: any, i: any) => {
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
                            <span>PKR {prd?.salePrice * prd?.quantity}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="removed-text-style">
                    <span>Refunded items will be removed from the order.</span>
                  </div>
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
                  <p>Original order • July 18, 2022</p>
                  <p>PKR 498.00</p>
                </div>
                <div className="text-left-right-content-alignment">
                  <table>
                    <tr>
                      <td align="left">Subtotal</td>
                      <td align="left">{allProducts?.length} items</td>
                      <td align="right">PKR {calculatedData}</td>
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
                      <td align="right">PKR {calculatedData}</td>
                    </tr>
                  </table>
                </div>
                <div className="box-footer-alignment">
                  <p>{allOrderData?.paymentMethod}</p>
                  <span>PKR {calculatedData}</span>
                </div>
              </div>
              <span
                style={{
                  color: "red",
                  top: "5px",
                  fontSize: "10px",
                }}
              >
                {/* {errors["validreason"]} */}
              </span>
              <div className="reason-for-refund">
                <div className="refund-input">
                  <label>Reason for edit</label>
                  <input type="text" onChange={(e) => HandleChange(e)} />
                  <span>Only you and other staff can see this reason.</span>
                </div>
              </div>
            </div>
            <div className="grid-items">
              <div className="summary-box-design">
                <div className="box-title">
                  <h4>Summary</h4>
                  <p>No changes have been made.</p>
                </div>
                <div className={resoneForEdit.trim() ? "box-footer-green" : "box-footer"}>
                  {resoneForEdit?.length > 0 ? (
                    <button onClick={() => HandleSubmit()}>Edit PKR {calculatedData}</button>
                  ) : (
                    <button disabled>Edit PKR {calculatedData}</button>
                  )}
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
      {openBrowseModal && (
        <AllProductModal
          toggle={OpenBrowseModal}
          selectedProducts={allOrderData?.productId}
          closeBothModal={OpenBrowseModal}
        />
      )}
    </>
  );
}
