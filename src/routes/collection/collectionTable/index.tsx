import React, { useState } from "react";
import "./collectionTable.scss";
import CollectionTableData from "../collectionTableData";
import SearchBar from "../../../components/searchBar";

export default function CollectionTable(props: any) {
  const { collection, limit, page, setPage, reload } = props;
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="collection-table-design">
        <div className="table-header">
          <p>All </p>
        </div>
        <div className="table-section-alignment">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <CollectionTableData
          collectionData={collection}
          limit={limit}
          page={page}
          setPage={setPage}
          search={search}
          reload={reload}
        />
      </div>
    </>
  );
}
