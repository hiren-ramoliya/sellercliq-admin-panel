import React, { useEffect } from "react";
import "./modalSearch.scss";
import SearchIcon from "../../assets/icons/light-search.svg";

export default function ModalSearch(props: any) {
  const { search, setSearch } = props;

  const handleSearch = (e: any): void => {
    setSearch(e.target.value?.toLowerCase());
  };

  return (
    <>
      <div className="modal-search-input-design">
        <div className="input-relative">
          <input
            type="text"
            placeholder="Search for anything "
            value={search || ""}
            onChange={(e) => handleSearch(e)}
          />
          <div className="icon-alignment">
            <img src={SearchIcon} alt="SearchIcon" />
          </div>
        </div>
      </div>
    </>
  );
}
