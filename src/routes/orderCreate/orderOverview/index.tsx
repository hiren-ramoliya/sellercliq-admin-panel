import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./orderOverview.scss";
import "../../../routes/order/order.scss";
import OrderOverviewTable from "./orderOverviewTable";
import OrderProcess from "./orderProcess";
import QuestionIcon from "../../../assets/icons/quize.svg";
import SelectProductsModal from "./orderOverviewTable/selectProducts";
import OrderVector from "../../../assets/images/order-see.png";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import { fetchAllOrders } from "../../../store/slices/allOrdersSlice";
import { setHeaderClear } from "../../../store/slices/headerSlice";

export default function OrderOverview() {
  const [selectProductsModal, setSelectProductsModal] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const OpenExportModal = () => {
    setSelectProductsModal(!selectProductsModal);
  };
  const allOrderData = useSelector((state: any) => state?.allorders?.data);

  useEffect(() => {
    let calledData: any = fetchAllOrders();
    dispatch(calledData);
    // dispatch(setHeaderClear());
  }, []);

  return (
    <React.Fragment>
      {allOrderData?.length > 0 ? (
        <div className="layout-alignment">
          <div className="order-overview-section-alignment">
            <div className="overview-page-title">
              <div>
                <h1>Orders</h1>
              </div>
              <div>
                <span onClick={() => OpenExportModal()}>Export</span>
                <div className="create-order-button">
                  <button onClick={() => history.push("/order-create")}>
                    Create Order
                  </button>
                </div>
              </div>
            </div>
          </div>
          <>
            <OrderProcess />
          </>
          <OrderOverviewTable />
          <div className="learn-more-button-center-alignment">
            <button>
              <img src={QuestionIcon} alt="QuestionIcon" />
              <span>
                Learn more about <a>orders</a>
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="layout-alignment">
          <div className="order-page-section-alignment">
            <div className="page-title">
              <h1>Orders</h1>
            </div>
            <div className="empty-order-see-box">
              <div className="empty-order-box">
                <div className="image-center-alignment">
                  <img src={OrderVector} alt="OrderVector" />
                </div>
                <h5>Your order will show here</h5>
                <p>
                  This is where you’ll fulfill orders, collect payments, and
                  track order progress.
                </p>
                <div className="button-center-alignment">
                  <button onClick={() => history.push("/order-create")}>
                    Create Order
                  </button>
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
      )}

      {selectProductsModal && <SelectProductsModal toggle={OpenExportModal} />}
    </React.Fragment>
  );
}
