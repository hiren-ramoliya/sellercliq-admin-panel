import React, { useEffect, useRef, useState } from "react";
import ModalSearch from "../../../../components/modalSearch";
import OrderOverviewTab from "./orderOverviewTab";
import FilterIcon from "../../../../assets/icons/new-filter.svg";
import CloseIcon from "../../../../assets/icons/close.svg";

import ColumsIcon from "../../../../assets/icons/Colums.svg";
import SortIcon from "../../../../assets/icons/Colums.svg";
import DownBlackIcon from "../../../../assets/icons/down-black.svg";
import MoreHorizontalIcon from "../../../../assets/icons/more-horizontal.svg";
import "./orderOverviewTable.scss";
import TableData from "./tableData";
export default function OrderOverviewTable() {
  const filterRef: any = useRef();
  const columsRef: any = useRef();
  const sortRef: any = useRef();
  const menuRef: any = useRef();

  const [filterDropdown, setFilterDropdown] = useState(false);
  const [filterListModal, setFilterListModal] = useState(false);
  const [columsDropdown, setColumsDropdown] = useState(false);
  const [sortDropdown, setSortDropdown] = useState(false);
  const [moreMenuDropdown, setMoreMenuDropdown] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        filterDropdown &&
        filterRef.current &&
        !filterRef.current.contains(e.target)
      ) {
        setFilterDropdown(false);
        setFilterListModal(false);
      } else if (
        columsDropdown &&
        columsRef.current &&
        !columsRef.current.contains(e.target)
      ) {
        setColumsDropdown(!columsDropdown);
      } else if (
        sortDropdown &&
        sortRef.current &&
        !sortRef.current.contains(e.target)
      ) {
        setSortDropdown(false);
      } else if (
        moreMenuDropdown &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setMoreMenuDropdown(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [
    filterDropdown,
    filterListModal,
    columsDropdown,
    sortDropdown,
    moreMenuDropdown,
  ]);

  return (
    <>
      <div className="order-overview-table-alignment">
        <OrderOverviewTab />
        <div className="table-filter">
          <div className="table-filter-items">
            <ModalSearch search={search} setSearch={setSearch}/>
          </div>
          <div className="table-filter-items">
            <div className="all-filter-grid">
              <div className="all-filter-grid-items" ref={filterRef}>
                <div className="filter-dropdown-relative">
                  <button onClick={() => setFilterDropdown(!filterDropdown)}>
                    <img src={FilterIcon} alt="FilterIcon" />
                    <span>Filter</span>
                  </button>
                  <div
                    className={
                      filterDropdown
                        ? "no-filter-dropdown filter-dropdown-show"
                        : "no-filter-dropdown filter-dropdown-hidden"
                    }
                  >
                    <div className="no-filter-dropdown-style">
                      <p>No filters applied to this view</p>
                      <div className="content-alignment-relative">
                        <div className="content-alignment">
                          <div>
                            <button
                              onClick={() =>
                                setFilterListModal(!filterListModal)
                              }
                            >
                              <span>Select Filter</span>
                              <img src={DownBlackIcon} alt="DownBlackIcon" />
                            </button>
                          </div>
                          <div
                            onClick={() => setFilterDropdown(!filterDropdown)}
                          >
                            <img src={CloseIcon} alt="CloseIcon" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      filterListModal
                        ? "filter-list-modal filter-list-modal-show"
                        : "filter-list-modal filter-list-modal-hidden"
                    }
                  >
                    <div className="filter-list-modal-style">
                      <span>Delivery Method</span>
                      <span>Status</span>
                      <span>Payment status</span>
                      <span>Fulfillment status</span>
                      <span>Return status</span>
                      <span>Chargeback and inquiry </span>
                      <span>Credir card(Last four digit)</span>
                      <span>Payment status</span>
                      <span>Fulfillment status</span>
                      <span>Return status</span>
                      <span>Chargeback and inquiry </span>
                      <span>Credir card(Last four digit)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="all-filter-grid-items" ref={columsRef}>
                <div className="colums-section-relative">
                  <button onClick={() => setColumsDropdown(!columsDropdown)}>
                    <img src={ColumsIcon} alt="ColumsIcon" />
                    <span>Colums</span>
                  </button>
                  <div
                    className={
                      columsDropdown
                        ? "colums-section-dropdown colums-section-dropdown-show"
                        : "colums-section-dropdown colums-section-dropdown-hidden"
                    }
                  >
                    <div className="colums-section-dropdown-style">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => {
                        return (
                          <div className="checkbox-text-alignment-new">
                            <div>
                              <input type="checkbox" />
                            </div>
                            <div>
                              <span>Payment status</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="all-filter-grid-items" ref={sortRef}>
                <div className="sort-button-relative">
                  <button onClick={() => setSortDropdown(!sortDropdown)}>
                    <img src={SortIcon} alt="SortIcon" />
                    <span>Sort</span>
                  </button>
                  <div
                    className={
                      sortDropdown
                        ? "sort-dropdown-design sort-dropdown-show"
                        : "sort-dropdown-hidden sort-dropdown-design"
                    }
                  >
                    <div className="sort-dropdown-design-style">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
                        return (
                          <div className="radio-text-alignment">
                            <div>
                              <input type="radio" />
                            </div>
                            <div>
                              <span>Payment status</span>
                            </div>
                          </div>
                        );
                      })}
                      <div className="only-text-alignment">
                        <span>Oldest to newest</span>
                        <span>Newest to oldest</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="all-filter-grid-items" ref={menuRef}>
                <div className="more-menu-relative">
                  <button
                    onClick={() => setMoreMenuDropdown(!moreMenuDropdown)}
                  >
                    <img src={MoreHorizontalIcon} alt="MoreHorizontalIcon" />
                  </button>
                  <div
                    className={
                      moreMenuDropdown
                        ? "more-menu-dropdown more-menu-dropdown-show"
                        : "more-menu-dropdown more-menu-dropdown-hidden"
                    }
                  >
                    <div className="more-menu-dropdown-style">
                      <span>Save as</span>
                      <span>Create view</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TableData search={search}/>
      </div>
    </>
  );
}
