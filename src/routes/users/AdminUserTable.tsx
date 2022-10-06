import React, { useState } from "react";
import "./userTable/userTable.scss";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ApiDelete } from "../../helpers/API/ApiData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import deleteIcon from "./../../../src/assets/icons/deleteIcon.svg";
import SearchBar from "../../components/searchBar";

export default function AdminUserTable(props: any) {
  const { users, reload } = props;
  const [search, setSearch] = useState("");

  const handleCheck = (e: any, category: any) => {
    e.stopPropagation();
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

  const deleteUser = async (id: string) => {
    try {
      const res = await ApiDelete("admin/delete-admin-user/" + id);
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
                    <span>Name</span>
                  </th>
                  <th align="left">
                    <span>Role</span>
                  </th>
                  <th align="left">
                    <span>Email</span>
                  </th>
                  <th align="left">
                    <span>Phone</span>
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
                        (cat?.firstName + " " + cat?.lastName)
                          ?.toLowerCase()
                          ?.includes(search) ||
                        cat?.email?.toLowerCase()?.includes(search) ||
                        cat?.phone?.toLowerCase()?.includes(search)
                    )
                ).map((user: any, inx: number) => (
                  <tr key={`use_` + inx} style={{ cursor: "pointer" }}>
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
                      <span>
                        {user?.firstName} {user?.lastName}
                      </span>
                    </td>
                    <td align="left" className="font-normal-table">
                      <span>{user?.role}</span>
                    </td>
                    <td align="left" className="font-normal-table">
                      <span>{user?.email}</span>
                    </td>
                    <td align="left" className="font-normal-table">
                      <span>{user?.phone}</span>
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
