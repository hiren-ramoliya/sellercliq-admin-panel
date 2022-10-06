import React from "react";
import "./orderProcess.scss";
import DownIcon from "../../../../assets/icons/light-down.svg";
export default function OrderProcess() {
  return (
    <>
      <div className="order-process-section-alignment">
        <div className="grid">
          <div className="grid-items">
            <div className="time-box-alignment">
              <div>
                <span>7 days</span>
              </div>
              <div>
                <img src={DownIcon} alt="DownIcon" />
              </div>
            </div>
          </div>
          <div className="grid-items">
            <div className="sub-grid">
              <div className="sub-grid-items">
                <div className="box-style">
                  <p>New Orders</p>
                  <div className="child-text-alignment">
                    <div className="time-box-alignment-new">
                      <div>
                        <span>7 days</span>
                      </div>
                      <div>
                        <img src={DownIcon} alt="DownIcon" />
                      </div>
                    </div>
                    <div className="dis">
                      <h6>0%</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sub-grid-items">
                <div className="box-style">
                  <p>New Orders</p>
                  <div className="child-text-alignment">
                    <div className="time-box-alignment-new">
                      <div>
                        <span>7 days</span>
                      </div>
                      <div>
                        <img src={DownIcon} alt="DownIcon" />
                      </div>
                    </div>
                    <div className="dis">
                      <h6>0%</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sub-grid-items">
                <div className="box-style">
                  <p>New Orders</p>
                  <div className="child-text-alignment">
                    <div className="time-box-alignment-new">
                      <div>
                        <span>7 days</span>
                      </div>
                      <div>
                        <img src={DownIcon} alt="DownIcon" />
                      </div>
                    </div>
                    <div className="dis">
                      <h6>0%</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sub-grid-items">
                <div className="box-style">
                  <p>New Orders</p>
                  <div className="child-text-alignment">
                    <div className="time-box-alignment-new">
                      <div>
                        <span>7 days</span>
                      </div>
                      <div>
                        <img src={DownIcon} alt="DownIcon" />
                      </div>
                    </div>
                    <div className="dis">
                      <h6>0%</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sub-grid-items">
                <div className="box-style">
                  <p>New Orders</p>
                  <div className="child-text-alignment">
                    <div className="time-box-alignment-new">
                      <div>
                        <span>7 days</span>
                      </div>
                      <div>
                        <img src={DownIcon} alt="DownIcon" />
                      </div>
                    </div>
                    <div className="dis">
                      <h6>0%</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
