import React from "react";
import "./abandonedCheckouts.scss";
import ShoppnigIcon from "../../assets/icons/shopping.svg";
import QuestionIcon from "../../assets/icons/quize.svg";

export default function AbandonedCheckouts() {
  return (
    <>
      <div className="layout-alignment">
        <div className="abandoned-checkouts-section-alignment">
          <div className="page-header-alignment">
            <div>
              <h1>Abandoned checkouts</h1>
            </div>
            <div className="green-button">
              <button>Export</button>
            </div>
          </div>
          <div className="empty-box">
            <div className="icon-center-alignment">
              <img src={ShoppnigIcon} alt="ShoppnigIcon" />
            </div>
            <h2>Abandoned checkouts will show there</h2>
            <p>
              See when customers put an item in their cart but don’t check out.
              You can also email customers a link to their cart.
            </p>
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
