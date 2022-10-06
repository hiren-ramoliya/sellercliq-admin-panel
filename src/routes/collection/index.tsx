import React, { useEffect, useState } from "react";
import "./collection.scss";
import CollectionTable from "./collectionTable";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { fetchAllCollections } from "../../store/slices/allCollectionsSlice";

export default function Collection() {
  const dispatch = useAppDispatch();
  const allCollections = useSelector((state: any) => state?.allCollections);
  const [collections, setCollections] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [reload, setReload] = useState(true);
  useEffect(() => {
    setCollections(allCollections.data);
  }, [allCollections]);

  useEffect(() => {
    let params = {
      page: page,
      limit: limit,
    };
    dispatch(fetchAllCollections(params));
  }, [page, reload]);

  const reFetch = () => {
    setReload(!reload);
  };

  return (
    <>
      <div className="collection-section-alignment">
        <div className="header-alignment">
          <div>
            <h2>Collection</h2>
          </div>
          <div className="green-button">
            <button>Create collection</button>
          </div>
        </div>
        <CollectionTable
          collection={collections}
          limit={limit}
          page={page}
          setPage={setPage}
          reload={reFetch}
        />
      </div>
    </>
  );
}
