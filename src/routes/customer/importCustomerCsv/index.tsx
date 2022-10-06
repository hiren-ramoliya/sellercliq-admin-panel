import React from "react";
import "./importCustomerCsv.scss";
import CloseIcon from "../../../assets/icons/close.svg";

export default function ImportCustomerCsv(props: any) {
  const { toggle } = props;
  return (
    <>
      <div className="import-customer-csv-modal-wrapper">
        <div className="modal-md">
          <div className="modal-header">
            <h1>Import customers by CSV</h1>
            <img src={CloseIcon} alt="CloseIcon" onClick={() => toggle()} />
          </div>
          <div className="modal-body">
            <div className="child-text-alignment">
              <p>
                <a>Download a sample</a> CSV to see an example of the required
                format
              </p>
              <p>
                Make sure that customers set to ”Accepts Email Marketing” and
                ”Accepts SMS Marketing” have given you permission.{" "}
                <span>Read more</span>
              </p>
            </div>
            <div className="add-file-button">
              <button>Add File</button>
            </div>
            <div className="overwrite-content-alignment">
              <div>
                <input type="checkbox" name="a" />
              </div>
              <div>
                <span>
                  Overwrite existing customers that have the same email or phone
                </span>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div>
              <span>Need help importing customers?</span>
            </div>
            <div>
              <button onClick={() => toggle()}>Cancel</button>
              <button>Import Customers</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
