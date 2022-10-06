import React, { useEffect, useState } from "react";
import "./createCustomer.scss";
import LeftArrow from "../../../src/assets/icons/left-new.svg";

import { useHistory, useParams } from "react-router-dom";
import { ApiPost } from "../../helpers/API/ApiData";
import { useAppDispatch } from "../../store/store";
import { fetchCustomerById } from "../../store/slices/customerById";
import { useSelector } from "react-redux";
import { setHeaderClear, setHeaderMessage } from "../../store/slices/headerSlice";
type Props = {};

export default function CustomerCreate() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { id }: any = useParams();
  const customerData = useSelector((state: any) => state.customerById?.data);
  const headerState = useSelector((state: any) => state?.header);
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    whatsappNumber: "",
    address: "",
    apartment: "",
    city: "",
    pincode: "",
    marketingEmail: false,
    marketingSMS: false,
  });
  const [errorKey, setErrorKey] = useState<""[]>([]);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string, type: string) => {
    const { value } = e.target;
    if (key === "marketingEmail") {
      setCustomer({ ...customer, marketingEmail: !customer.marketingEmail });
    } else if (key === "marketingSMS") {
      setCustomer({ ...customer, marketingSMS: !customer.marketingSMS });
    } else {
      setCustomer({ ...customer, [key]: value });
    }
  };

  const bindInput = (value: any) => {
    var regex = new RegExp("^[^0-9]*$");
    var key = String.fromCharCode(!value.charCode ? value.which : value.charCode);
    if (regex.test(key)) {
      value.preventDefault();
      return false;
    }
  };

  const handleOnSave = async () => {
    console.log("create customer", customer);
    if (
      !customer?.firstName ||
      !customer?.lastName ||
      !customer?.email ||
      !customer?.number ||
      !customer?.whatsappNumber ||
      !customer?.address ||
      !customer?.apartment ||
      !customer?.city ||
      !customer?.pincode
    ) {
      if (!customer?.firstName) {
        handleFormError("firstName", "First name is required");
      }
      if (!customer?.lastName) {
        handleFormError("lastName", "Last name is required");
      }
      if (!customer?.email) {
        handleFormError("email", "Email is required");
      }
      if (!customer?.number) {
        handleFormError("number", "Number is required");
      }
      if (!customer?.whatsappNumber) {
        handleFormError("whatsappNumber", "Whatsapp number is required");
      }
      if (!customer?.address) {
        handleFormError("address", "Address is required");
      }
      if (!customer?.apartment) {
        handleFormError("apartment", "Apartment is required");
      }
      if (!customer?.city) {
        handleFormError("city", "City is required");
      }
      if (!customer?.pincode) {
        handleFormError("pincode", "Pincode is required");
      }
      return;
    } else {
      try {
        let data = {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          number: customer.number,
          whatsappNumber: customer.whatsappNumber,
          address: customer.address,
          address1: customer.apartment,
          city: customer.city,
          pincode: customer.pincode,
          marketingEmail: customer.marketingEmail,
          marketingSMS: customer.marketingSMS,
        };
        let path = id ? "customer/update-customer/62e8e31edfb9dc31345537b2" : "customer/add-customer";
        console.log("api called");
        console.log(path, data);
        // let addCutsomerRes = await ApiPost(`${path}`, data);
        // if (addCutsomerRes.status === 200) {
        //   history.push("/customer");
        //   calearForm();
        // } else {
        //   console.log("error", addCutsomerRes?.error);
        // }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const calearForm = () => {
    setCustomer({
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      whatsappNumber: "",
      address: "",
      apartment: "",
      city: "",
      pincode: "",
      marketingEmail: false,
      marketingSMS: false,
    });
  };

  const handleFormError = (key: string, message: string) => {
    let tempErrorKey: any = errorKey;
    tempErrorKey.push(key);
    setErrorKey(tempErrorKey);
    setIsInvalid(true);
  };

  useEffect(() => {
    if (id && !customerData?.firstName) {
      const fetchCustomer: any = fetchCustomerById(id);
      dispatch(fetchCustomer);
    } else if (id) {
      const {
        address,
        address1,
        city,
        country,
        email,
        firstName,
        gender,
        lastName,
        marketingEmail,
        marketingSMS,
        notes,
        number,
        pincode,
      } = customerData;
      setCustomer({
        firstName: firstName,
        lastName: lastName,
        email: email,
        number: number,
        whatsappNumber: "",
        address: address,
        apartment: address1,
        city: city,
        pincode: pincode,
        marketingEmail: marketingEmail,
        marketingSMS: marketingSMS,
      });
    }
  }, [customerData]);

  // header button control start ===============================================================================
  useEffect(() => {
    dispatch(setHeaderMessage("Unsaved changes"));
    return () => {
      dispatch(setHeaderClear());
    };
  }, []);

  useEffect(() => {
    console.log("headerState", headerState);
    if (headerState?.saved) {
      // call api to save order here
      console.log("customer saved");
      handleOnSave();
      console.log(customer);
    }
    if (headerState?.discard) {
      calearForm();
      history.push("/customer");
    }
  }, [headerState]);

  // header button control end ===============================================================================

  return (
    <>
      <div className="create-customer-section-alignment">
        <div className="create-customer-header-alignment">
          <div className="customer-header-alignment">
            <div
              onClick={() => {
                history.push("/customer");
              }}
            >
              <img src={LeftArrow} alt="LeftArrow" />
            </div>
            <h1>{id ? customer?.firstName + " " + customer?.lastName : "New Customer"}</h1>
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
                      <label>
                        First Name {isInvalid && !customer?.firstName && <small> first name is required</small>}
                      </label>
                      <input
                        type="text"
                        maxLength={64}
                        value={customer?.firstName}
                        onChange={(e) => handleInputChange(e, "firstName", "text")}
                      />
                    </div>
                  </div>
                  <div className="first-col-grid-items">
                    <div className="form-control">
                      <label>
                        Last Name {isInvalid && !customer?.lastName && <small> last name is required</small>}
                      </label>
                      <input
                        type="text"
                        maxLength={64}
                        value={customer?.lastName}
                        onChange={(e) => handleInputChange(e, "lastName", "text")}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-control form-control-bottom-alignment">
                  <label>Email {isInvalid && !customer?.email && <small> email is required</small>}</label>
                  <input
                    type="text"
                    maxLength={64}
                    value={customer?.email}
                    onChange={(e) => handleInputChange(e, "email", "text")}
                  />
                </div>
                <div className="contanct-grid-alignment">
                  <div className="form-control">
                    <label>Phone Number {isInvalid && !customer?.number && <small> phone is required</small>}</label>
                  </div>
                  <div className="contact-grid">
                    <div className="contact-grid-items">
                      <div className="form-control">
                        <input
                          type="text"
                          maxLength={11}
                          value={customer?.number}
                          onChange={(e) => handleInputChange(e, "number", "text")}
                          onKeyPress={(e) => bindInput(e)}
                        />
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
                    <label>
                      WhatsApp Number {isInvalid && !customer?.whatsappNumber && <small> whatsapp is required</small>}
                    </label>
                  </div>
                  <div className="contact-grid">
                    <div className="contact-grid-items">
                      <div className="form-control">
                        <input
                          type="text"
                          maxLength={11}
                          value={customer?.whatsappNumber}
                          onChange={(e) => handleInputChange(e, "whatsappNumber", "text")}
                          onKeyPress={(e) => bindInput(e)}
                        />
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
                      <input
                        type="checkbox"
                        checked={customer?.marketingEmail}
                        onChange={(e) => handleInputChange(e, "marketingEmail", "checkbox")}
                        name="marketingEmail"
                        id="marketingEmail"
                      />
                    </div>
                    <div>
                      <span>Customer agreed to receive marketing emails.</span>
                    </div>
                  </div>
                  <div className="checkbox-text-alignment">
                    <div>
                      <input
                        type="checkbox"
                        checked={customer?.marketingSMS}
                        onChange={(e) => handleInputChange(e, "marketingSMS", "checkbox")}
                        name="marketingSMS"
                        id="marketingSMS"
                      />
                    </div>
                    <div>
                      <span>Customer agreed to receive marketing emails.</span>
                    </div>
                  </div>
                </div>
                <div className="box-last-child-text">
                  <p>
                    You should ask your customers for permission before you subscribe them to your marketing emails or
                    SMS.
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
                  <label>Address {isInvalid && !customer?.address && <small> address is required</small>}</label>
                  <input
                    type="text"
                    maxLength={128}
                    value={customer?.address}
                    onChange={(e) => handleInputChange(e, "address", "text")}
                  />
                </div>
                <div className="form-control form-control-bottom-alignment">
                  <label>
                    Apartment, suit , etc.
                    {isInvalid && !customer?.apartment && <small> apartment is required</small>}
                  </label>
                  <input
                    type="text"
                    maxLength={128}
                    value={customer?.apartment}
                    onChange={(e) => handleInputChange(e, "apartment", "text")}
                  />
                </div>
                <div className="first-col-grid first-col-grid-bottom-sapce-remove">
                  <div className="first-col-grid-items">
                    <div className="form-control">
                      <label>City {isInvalid && !customer?.city && <small> city is required</small>}</label>
                      <input
                        type="text"
                        maxLength={64}
                        value={customer?.city}
                        onChange={(e) => handleInputChange(e, "city", "text")}
                      />
                    </div>
                  </div>
                  <div className="first-col-grid-items">
                    <div className="form-control">
                      <label>
                        Postal code {isInvalid && !customer?.pincode && <small> postal code is required</small>}
                      </label>
                      <input
                        type="text"
                        maxLength={8}
                        value={customer?.pincode}
                        onChange={(e) => handleInputChange(e, "pincode", "text")}
                        onKeyPress={(e) => bindInput(e)}
                      />
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
