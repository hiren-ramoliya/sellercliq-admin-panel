import React, { useEffect, useState } from "react";
import "./header.scss";
import Logo from "../../assets/logo/logo.svg";
import LogoDark from "../../assets/logo/logo-dark.svg";
import DiscoardIcon from "../../assets/icons/discoard.svg";
import BellIcon from "../../assets/icons/bell.svg";
import SignIcon from "../../assets/icons/sign-out.svg";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { logout } from "../../utils/auth.util";
import { useHistory } from "react-router-dom";

import {
  setHeaderDiscard,
  setHeaderSaved,
} from "../../store/slices/headerSlice";
import { NavLink } from "react-router-dom";
import { fetchUserProfile } from "../../store/slices/userProfileSlice";

export default function Header() {
  let history = useHistory();
  const dispatch = useAppDispatch();
  const headerState = useSelector((state: any) => state?.header);
  let { loading, error, active, message, saved, discard, isValid } =
    headerState;
  const profile = useSelector((state: any) => state?.profile);
  const [myProfile, setMyProfile] = useState({
    firstName: "",
    lastName: "",
    role: "",
  });

  const handleSave = () => {
    dispatch(setHeaderSaved(true));
  };
  const handleDiscard = () => {
    dispatch(setHeaderDiscard(true));
  };

  useEffect(() => {
    if (Object.keys(profile.data).length === 0 && !profile.called) {
      if (localStorage.getItem("token") != null) dispatch(fetchUserProfile());
    } else {
      setMyProfile(profile.data);
    }
  }, [profile]);

  const userlogout = async () => {
    if (logout()) history.push("/login");
  };

  return (
    <>
      <div className="header" style={{ background: active && "black" }}>
        <div className="container-lg">
          <div className="header-alignment">
            <div className="logo">
              <img src={active ? LogoDark : Logo} alt="Logo" />
            </div>
            {message ? (
              <div className="message">
                <span>{message}</span>
              </div>
            ) : (
              <></>
            )}
            <div className="profile-content">
              {active ? (
                <>
                  <div className="header-buttons discard-button">
                    <button onClick={handleDiscard}>Discard</button>
                  </div>
                  <div className="header-buttons save-button">
                    <button
                      onClick={handleSave}
                      // disabled={!isValid}
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="icon-round-design">
                    <img src={DiscoardIcon} alt="DiscoardIcon" />
                  </div>
                  <div className="icon-round-design">
                    <img src={BellIcon} alt="BellIcon" />
                  </div>
                  {localStorage.getItem("token") != null && (
                    <div className="icon-round-design">
                      <img
                        onClick={() => userlogout()}
                        src={SignIcon}
                        title="Logout"
                        alt="LogoutIcon"
                      />
                    </div>
                  )}
                  <div className="profile-grid">
                    {localStorage.getItem("token") != null ? (
                      <>
                        <div className="profile-grid-items"></div>
                        <div className="profile-grid-items">
                          <NavLink to={"/profile"}>
                            <span>
                              {myProfile?.firstName} {myProfile?.lastName}
                            </span>
                            <p>{myProfile?.role}</p>
                          </NavLink>
                        </div>
                      </>
                    ) : (
                      <>
                        <NavLink to={"/login"}>
                          <div className="green-button">
                            <button>Login</button>
                          </div>
                        </NavLink>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
