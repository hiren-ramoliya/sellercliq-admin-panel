import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllSellers } from "../../../store/slices/allSellerSlice";
import { useAppDispatch } from "../../../store/store";
import "./../users.scss";
import UserTable from "../userTable";

export default function Seller() {
  const dispatch = useAppDispatch();
  const allSellers = useSelector((state: any) => state?.allSellers);
  const [sellers, setSellers] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    setSellers(allSellers.data);
  }, [allSellers]);

  useEffect(() => {
    dispatch(fetchAllSellers());
  }, [reload]);

  const reFetch = () => {
    setReload(!reload);
  };

  return (
    <>
      <div className="seller-section-alignment">
        <div className="header-alignment">
          <div>
            <h1>Seller</h1>
          </div>
        </div>
        <>
          <UserTable users={sellers} type="seller" reload={reFetch} />
        </>
      </div>
    </>
  );
}
