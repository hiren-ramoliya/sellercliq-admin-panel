import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUserProfile } from "../../store/slices/userProfileSlice";
import { useAppDispatch } from "../../store/store";
import LeftArrow from "../../../src/assets/icons/left-new.svg";
import {
  setHeaderClear,
  setHeaderMessage,
} from "../../store/slices/headerSlice";
import { ApiPut } from "../../helpers/API/ApiData";

export default function UserProfile() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const profile = useSelector((state: any) => state?.profile);
  const headerState = useSelector((state: any) => state?.header);
  const [myProfile, setMyProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (Object.keys(profile.data).length === 0 && !profile.called) {
      dispatch(fetchUserProfile());
    } else {
      setMyProfile(profile.data);
    }
  }, [profile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    type: string
  ) => {
    const { value } = e.target;
    setMyProfile({ ...myProfile, [key]: value });
  };

  const [errorKey, setErrorKey] = useState<""[]>([]);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleFormError = (key: string, message: string) => {
    let tempErrorKey: any = errorKey;
    tempErrorKey.push(key);
    setErrorKey(tempErrorKey);
    setIsInvalid(true);
  };

  const handleOnSave = async () => {
    if (!myProfile?.firstName || !myProfile?.lastName) {
      if (!myProfile?.firstName) {
        handleFormError("firstName", "FirstName is required");
      }
      if (!myProfile?.lastName) {
        handleFormError("lastName", "Lastname is required");
      }
      return;
    } else {
      try {
        const userData = {
          firstName: myProfile.firstName,
          lastName: myProfile.lastName,
          phone: myProfile.phone,
        };
        const result = await ApiPut("admin/update-admin-user", userData);
        if (result?.data?.result === 0) {
          dispatch(fetchUserProfile());
          history.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // header button control start ===============================================================================
  useEffect(() => {
    dispatch(setHeaderMessage("Unsaved changes"));
    return () => {
      dispatch(setHeaderClear());
    };
  }, []);

  useEffect(() => {
    if (headerState?.saved) {
      // call api to save order here
      handleOnSave();
    }
    if (headerState?.discard) {
      history.push("/");
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
                history.push("/");
              }}
            >
              <img src={LeftArrow} alt="LeftArrow" />
            </div>
            <h1>My Profile</h1>
          </div>
        </div>
        <div className="all-preview-section-alignment">
          <div className="preview-grid">
            <div className="preview-grid-items">
              <h2>Profile Details</h2>
            </div>
            <div className="preview-grid-items">
              <div className="white-box">
                <div className="first-col-grid">
                  <div className="first-col-grid-items">
                    <div className="form-control">
                      <label>
                        First Name
                        {isInvalid && !myProfile?.firstName && (
                          <small> Firstname is required</small>
                        )}
                      </label>
                      <input
                        type="text"
                        maxLength={64}
                        defaultValue={myProfile?.firstName}
                        onChange={(e) =>
                          handleInputChange(e, "firstName", "text")
                        }
                      />
                    </div>
                  </div>
                  <div className="first-col-grid-items">
                    <div className="form-control">
                      <label>
                        Last Name
                        {isInvalid && !myProfile?.lastName && (
                          <small> Lastname is required</small>
                        )}
                      </label>
                      <input
                        type="text"
                        maxLength={64}
                        defaultValue={myProfile?.lastName}
                        onChange={(e) =>
                          handleInputChange(e, "lastName", "text")
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="form-control form-control-bottom-alignment">
                  <label>Email </label>
                  <input type="text" maxLength={64} value={myProfile?.email} />
                </div>
                <div className="contanct-grid-alignment">
                  <div className="form-control">
                    <label>Phone Number</label>
                  </div>
                  <div className="contact-grid">
                    <div className="contact-grid-items">
                      <div className="form-control">
                        <input
                          type="text"
                          maxLength={11}
                          defaultValue={myProfile?.phone}
                          onChange={(e) =>
                            handleInputChange(e, "phone", "text")
                          }
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
