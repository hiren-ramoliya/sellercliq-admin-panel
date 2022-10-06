import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAllCustomers } from "../../store/slices/allCustomersSlice";
import { useAppDispatch } from "../../store/store";
import SelectProductsModal from "../orderCreate/orderOverview/orderOverviewTable/selectProducts";
import "./customer.scss";
import CustomerTable from "./customerTable";
import ImportCustomerCsv from "./importCustomerCsv";
import ImportCustomerEmailSegment from "./importCustomerCsvDetails";

export default function Customer() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const allCustomers = useSelector((state: any) => state?.allCustomers?.data);
  const [importModal, setImportModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [emailSegment, setEmailSegment] = useState(false);

  const OpenImportModal = () => {
    setImportModal(!importModal);
  };

  const OpenExportModal = () => {
    setExportModal(!exportModal);
  };
  const OpenEmailSegmentModal = () => {
    setEmailSegment(!emailSegment);
  };

  useEffect(() => {
    let fetchCustomers: any = fetchAllCustomers();
    dispatch(fetchCustomers);
  }, []);

  return (
    <>
      <div className="layout-alignment">
        <div className="customer-all-content-alignment">
          <div className="page-title-alignment">
            <div>
              <h1>Customer</h1>
            </div>
            <div>
              <span onClick={() => OpenExportModal()}>Export</span>
              <span onClick={() => OpenImportModal()}>Import</span>
              <span onClick={() => OpenEmailSegmentModal()}>Email segment</span>
              <button onClick={(e) => history.push("/customer-create")}>Add customer</button>
            </div>
          </div>
          <CustomerTable customers={allCustomers} />
        </div>
      </div>
      {importModal && <ImportCustomerCsv toggle={OpenImportModal} />}
      {exportModal && <SelectProductsModal toggle={OpenExportModal} />}
      {emailSegment && <ImportCustomerEmailSegment toggle={OpenEmailSegmentModal} />}
    </>
  );
}
