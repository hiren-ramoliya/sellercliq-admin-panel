import React, { useState } from "react";
import "./userTable.scss";
import { ApiDelete, ApiPut } from "../../../helpers/API/ApiData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import deleteIcon from "./../../../../src/assets/icons/deleteIcon.svg";
import SearchBar from "../../../components/searchBar";

export default function UserTable(props: any) {
  const { users, type, reload } = props;
  const [search, setSearch] = useState("");

  const handleCheck = (e: any, category: any) => {
    e.stopPropagation();
  };

  const updateMode = async (id: string, status: number) => {
    try {
      let API = "";
      if (type === "seller") {
        API = status == 1 ? "admin/unblock-seller" : "admin/block-seller";
      } else {
        API = status == 1 ? "admin/unblock-buyer" : "admin/block-buyer";
      }

      const res = await ApiPut(API + "/" + id);
      if (res?.data?.result === 1) {
        toast.success(res?.data?.message);
        reload();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      let API = "";
      if (type === "seller") {
        API = "admin/delete-seller";
      } else {
        API = "admin/delete-buyer";
      }

      const res = await ApiDelete(API + "/" + id);
      if (res?.data?.result === 1) {
        toast.success(res?.data?.message);
        reload();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirm = (id: string) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete this file?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                deleteUser(id);
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  const updateStatus = async (id: string, status: number) => {
    try {
      let API =
        status == 1 ? "admin/deactivate-seller" : "admin/activate-seller";

      const res = await ApiPut(API + "/" + id);
      if (res?.data?.result === 1) {
        toast.success(res?.data?.message);
        reload();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" />
      <div className="categories-table-design">
        <div className="categories-table-box">
          <div className="table-header">
            <p>All </p>
          </div>
          <div className="categories-search-section-alignment">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <div className="cartegories-table-design">
            <table>
              <thead>
                <tr>
                  <th align="left">
                    <div className="checkbox-image-alignment">
                      <div>
                        <input type="checkbox" />
                      </div>
                    </div>
                  </th>
                  <th align="left">
                    <span>Username</span>
                  </th>
                  <th align="left">
                    <span>Email</span>
                  </th>
                  <th align="left">
                    <span>Phone</span>
                  </th>
                  <th align="left">
                    <span>Created At</span>
                  </th>
                  {type === "seller" && (
                    <th align="left">
                      <span>Active/Deactive</span>
                    </th>
                  )}
                  <th align="left">
                    <span>Block/Unblock</span>
                  </th>
                  <th align="left">
                    <span>Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {(!search
                  ? users
                  : users?.filter(
                      (cat: any) =>
                        cat?.userName?.toLowerCase()?.includes(search) ||
                        cat?.email?.toLowerCase()?.includes(search) ||
                        cat?.phone?.toLowerCase()?.includes(search)
                    )
                ).map((user: any, inx: number) => (
                  <tr key={`user_` + inx} style={{ cursor: "pointer" }}>
                    <td align="left">
                      <div className="checkbox-image-alignment">
                        <div>
                          <input
                            type="checkbox"
                            onClick={(e: any) => handleCheck(e, user)}
                          />
                        </div>
                      </div>
                    </td>
                    <td align="left">
                      <span>{user?.userName}</span>
                    </td>
                    <td align="left" className="font-normal-table">
                      <span>{user?.email}</span>
                    </td>
                    <td align="left" className="font-normal-table">
                      <span>{user?.phone}</span>
                    </td>
                    <td align="left" className="font-normal-table">
                      <span>{user?.createdAt}</span>
                    </td>
                    {type === "seller" && (
                      <td align="left" className="font-normal-table">
                        <span>
                          {user?.isActive ? (
                            <div className="red-button">
                              <button
                                onClick={() => updateStatus(user?._id, 1)}
                              >
                                Deactive
                              </button>
                            </div>
                          ) : (
                            <div className="green-button">
                              <button
                                onClick={() => updateStatus(user?._id, 0)}
                              >
                                Active
                              </button>
                            </div>
                          )}
                        </span>
                      </td>
                    )}
                    <td align="left" className="font-normal-table">
                      <span>
                        {user?.isBlocked ? (
                          <div className="red-button">
                            <button onClick={() => updateMode(user?._id, 1)}>
                              Unblock
                            </button>
                          </div>
                        ) : (
                          <div className="green-button">
                            <button onClick={() => updateMode(user?._id, 0)}>
                              Block
                            </button>
                          </div>
                        )}
                      </span>
                    </td>
                    <td align="left" className="font-normal-table">
                      <span>
                        {user?.isDeleted ? (
                          <>Deleted</>
                        ) : (
                          <div className="light-button">
                            <button onClick={() => confirm(user?._id)}>
                              <img src={deleteIcon} />
                            </button>
                          </div>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
