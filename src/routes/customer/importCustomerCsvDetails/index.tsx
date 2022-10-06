import React from "react";
import "./importCustomerCsvDetails.scss";
import CloseIcon from "../../../assets/icons/close.svg";
import MailIcon from "../../../assets/icons/mail.svg";
import DownIcon from "../../../assets/icons/down-black-icon.svg";
export default function ImportCustomerEmailSegment(props: any) {
  const { toggle } = props;
  return (
    <>
      <div className="import-customer-csv-details-modal-wrapper">
        <div className="modal-md">
          <div className="modal-header">
            <div className="header-alignment">
              <h1>Import customers by CSV</h1>
              <img src={CloseIcon} alt="CloseIcon" onClick={() => toggle()} />
            </div>
            <div className="header-child-text">
              <p>Only email subscribers will receive this email</p>
            </div>
          </div>
          <div className="modal-email-information">
            <div className="main-conent-alignment">
              <div>
                <img src={MailIcon} alt="MailIcon" />
              </div>
              <div>
                <p>Email segment using email </p>
                <span>
                  10,000 free emails per month; $1 per 1,000 additional emails
                </span>
              </div>
            </div>
          </div>
          <div className="export-segment-content-alignment">
            <div className="section-title-alignment">
              <span>Export segment</span>
              <img src={DownIcon} alt="DownIcon" />
            </div>
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
            <div className="export-segment-alignment">
              <button>Export segment</button>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={() => toggle()}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
