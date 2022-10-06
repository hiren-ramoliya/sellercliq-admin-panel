import React from "react";
import "./order.scss";
import OrderVector from "../../assets/images/order-see.png";
import QuestionIcon from "../../assets/icons/quize.svg";
import { useHistory } from "react-router-dom";
export default function Order() {
  const history = useHistory();
  return (
    <>
      <div className="layout-alignment">
        <div className="order-page-section-alignment">
          <div className="page-title">
            <h1>Home</h1>
          </div>
          <div className="empty-order-see-box">
            <div className="empty-order-box">
              <div className="image-center-alignment">
                <img src={OrderVector} alt="OrderVector" />
              </div>
              <h5>Your order will show here</h5>
              <p>
                This is where you’ll fulfill orders, collect payments, and track
                order progress.
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
    </>
  );
}
