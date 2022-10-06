import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllAdminUsers } from "../../store/slices/allAdminUserSlice";
import { useAppDispatch } from "../../store/store";
import AdminUserTable from "./AdminUserTable";
import "./users.scss";

export default function Users() {
  const dispatch = useAppDispatch();
  const allAdminUsers = useSelector((state: any) => state?.allAdminUsers);
  const [adminUsers, setAdminUsers] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    setAdminUsers(allAdminUsers.data);
  }, [allAdminUsers]);

  useEffect(() => {
    dispatch(fetchAllAdminUsers());
  }, [reload]);

  const reFetch = () => {
    setReload(!reload);
  };

  return (
    <>
      <div className="buyer-section-alignment">
        <div className="header-alignment">
          <div>
            <h1>User</h1>
          </div>
        </div>
        <>
          <AdminUserTable users={adminUsers} reload={setReload} />
        </>
      </div>
    </>
  );
}
