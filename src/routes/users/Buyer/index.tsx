import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllBuyers } from "../../../store/slices/allBuyerSlice";
import { useAppDispatch } from "../../../store/store";
import "./../users.scss";
import UserTable from "../userTable";

export default function Buyer() {
  const dispatch = useAppDispatch();
  const allBuyers = useSelector((state: any) => state?.allBuyers);
  const [buyers, setBuyers] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    setBuyers(allBuyers.data);
  }, [allBuyers]);

  useEffect(() => {
    dispatch(fetchAllBuyers());
  }, [reload]);

  const reFetch = () => {
    setReload(!reload);
  };

  return (
    <>
      <div className="buyer-section-alignment">
        <div className="header-alignment">
          <div>
            <h1>Buyer</h1>
          </div>
        </div>
        <>
          <UserTable users={buyers} type="buyer" reload={reFetch} />
        </>
      </div>
    </>
  );
}
