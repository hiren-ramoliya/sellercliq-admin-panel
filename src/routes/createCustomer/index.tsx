import React, { useEffect } from "react";
import "./createCustomer.scss";
import LeftArrow from "../../../src/assets/icons/left-new.svg";
import { setHeaderClear, setHeaderMessage } from "../../store/slices/headerSlice";
import { useAppDispatch } from "../../store/store";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateCustomer() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const headerState = useSelector((state: any) => state?.header);

  useEffect(() => {
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
      // call api to discard order here
      history.push("/customer");
      console.log("discarded");
    }
  }, [headerState]);

  return (
    <>
      <div className="create-customer-section-alignment">
        <div className="create-customer-header-alignment">
          <div className="customer-header-alignment">
            <div onClick={() => history.push("/customer")}>
              <img src={LeftArrow} alt="LeftArrow" />
            </div>
            <h1>New customer</h1>
          </div>
        </div>
        <div className="all-preview-section-alignment">
          <div className="preview-grid">
            <div className="preview-grid-items">
              <h2>Customer overview</h2>
            </div>
            <div className="preview-grid-items">
              <div className="white-box">
                <div className="first-col-grid">
                  <div className="first-col-grid-items">
                    <div className="form-control">
                      <label>First Name</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="first-col-grid-items">
                    <div className="form-control">
                      <label>Last Name</label>
                      <input type="text" />
                    </div>
                  </div>
                </div>
                <div className="form-control form-control-bottom-alignment">
                  <label>Email</label>
                  <input type="text" />
                </div>
                <div className="contanct-grid-alignment">
                  <div className="form-control">
                    <label>Phone Number</label>
                  </div>
                  <div className="contact-grid">
                    <div className="contact-grid-items">
                      <div className="form-control">
                        <input type="text" />
                      </div>
                    </div>
                    <div className="contact-grid-items">
                      <div className="form-control">
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contanct-grid-alignment">
                  <div className="form-control">
                    <label>WhatsApp Number</label>
                  </div>
                  <div className="contact-grid">
                    <div className="contact-grid-items">
                      <div className="form-control">
                        <input type="text" />
                      </div>
                    </div>
                    <div className="contact-grid-items">
                      <div className="form-control">
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="all-checkbox-text-alignment">
                  <div className="checkbox-text-alignment">
                    <div>
                      <input type="checkbox" name="a" />
                    </div>
                    <div>
                      <span>Customer agreed to receive marketing emails.</span>
                    </div>
                  </div>
                  <div className="checkbox-text-alignment">
                    <div>
                      <input type="checkbox" name="a" />
                    </div>
                    <div>
                      <span>Customer agreed to receive marketing emails.</span>
                    </div>
                  </div>
                </div>
                <div className="box-last-child-text">
                  <p>
                    You should ask your customers for permission before you subscribe them to your
                    marketing emails or SMS.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="preview-grid">
            <div className="preview-grid-items">
              <h2>Address</h2>
            </div>
            <div className="preview-grid-items">
              <div className="white-box">
                <div className="form-control form-control-bottom-alignment">
                  <label>Address</label>
                  <input type="text" />
                </div>
                <div className="form-control form-control-bottom-alignment">
                  <label>Apartment, suit , etc.</label>
                  <input type="text" />
                </div>
                <div className="first-col-grid first-col-grid-bottom-sapce-remove">
                  <div className="first-col-grid-items">
                    <div className="form-control">
                      <label>City</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="first-col-grid-items">
                    <div className="form-control">
                      <label>Postal code</label>
                      <input type="text" />
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
