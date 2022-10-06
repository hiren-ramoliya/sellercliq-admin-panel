import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllBrands } from "../../store/slices/allBrandSlice";
import { useAppDispatch } from "../../store/store";
import BrandTable from "./brandTable";
import "./brand.scss";

export default function Brand() {
  const dispatch = useAppDispatch();
  const allBrands = useSelector((state: any) => state?.allBrands);
  const [brands, setBrands] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    setBrands(allBrands?.data);
  }, [allBrands]);

  useEffect(() => {
    dispatch(fetchAllBrands());
  }, [reload]);

  const reFetch = () => {
    setReload(!reload);
  };

  return (
    <>
      <div className="brand-section-alignment">
        <div className="header-alignment">
          <div>
            <h1>Brand</h1>
          </div>
        </div>
        <>
          <BrandTable
            brand={brands}
            reload={reFetch}
          />
        </>
      </div>
    </>
  );
}
