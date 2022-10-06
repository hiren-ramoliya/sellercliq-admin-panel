import React from "react";
import "./selectProducts.scss";
import CloseIcon from "../../../../../assets/icons/close.svg";

export default function SelectProductsModal(props: any) {
  const { toggle } = props;
  return (
    <>
      <div className="select-products-modal-wrapper">
        <div className="select-products-md">
          <div className="select-products-header">
            <div>
              <h4>Select Products</h4>
            </div>
            <div onClick={() => toggle()}>
              <img src={CloseIcon} alt="CloseIcon" />
            </div>
          </div>
          <div className="select-products-body">
            <div className="sub-title-content-alignment">
              <h3>Export</h3>
              <div className="radio-button-text-alignment">
                <div>
                  <input type="radio" />
                </div>
                <div>
                  <span>Current page</span>
                </div>
              </div>
              <div className="radio-button-text-alignment">
                <div>
                  <input type="radio" />
                </div>
                <div>
                  <span>All orders</span>
                </div>
              </div>
              <div className="radio-button-text-alignment">
                <div>
                  <input type="radio" />
                </div>
                <div>
                  <span>Selected: 0 orders</span>
                </div>
              </div>
              <div className="radio-button-text-alignment">
                <div>
                  <input type="radio" />
                </div>
                <div>
                  <span>4 orders matching your search</span>
                </div>
              </div>
              <div className="radio-button-text-alignment">
                <div>
                  <input type="radio" />
                </div>
                <div>
                  <span>4 orders matching your search</span>
                </div>
              </div>
            </div>
            <div className="sub-title-content-alignment">
              <h3>Export as</h3>
              <div className="radio-button-text-alignment">
                <div>
                  <input type="radio" />
                </div>
                <div>
                  <span>
                    CSV for Excel, Numbers, or other spreadsheet programs
                  </span>
                </div>
              </div>
              <div className="radio-button-text-alignment radio-button-text-alignment-space-remove">
                <div>
                  <input type="radio" />
                </div>
                <div>
                  <span>Plain CSV file</span>
                </div>
              </div>
            </div>
          </div>
          <div className="select-products-footer">
            <button onClick={() => toggle()}>Cancel</button>
            <button>Export transaction histories</button>
            <button>Export orders</button>
          </div>
        </div>
      </div>
    </>
  );
}
