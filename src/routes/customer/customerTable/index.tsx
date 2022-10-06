import React, { useEffect, useRef, useState } from "react";
import ModalSearch from "../../../components/modalSearch";
import "./customerTable.scss";
import FilterListIcon from "../../../assets/icons/filter-list.svg";
import ArrowUpIcon from "../../../assets/icons/arrow-up.svg";
import ArrowUpIconPrimary from "../../../assets/icons/arrow-up-primary.svg";
import { useHistory } from "react-router-dom";

export default function CustomerTable(props: any) {
  const { customers } = props;
  const [sortDropdown, setSortDropdown] = useState(false);
  const history = useHistory();
  const sortRef: any = useRef();
  const HandleSubmit = (id: string) => {
    history.push("/customer-profile/" + id);
  };
  // console.log("customers", customers);

  const HandleChecked = (e: any) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (sortDropdown && sortRef.current && !sortRef.current.contains(e.target)) {
        setSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [sortDropdown]);

  return (
    <>
      <div className="customer-table-alignment">
        <div className="table-design">
          <div className="search-grid-alignment">
            <div className="search-grid">
              <div className="search-grid-items">
                <ModalSearch />
              </div>
              <div className="search-grid-items" ref={sortRef}>
                <div className="sort-by-relative-div">
                  <button onClick={() => setSortDropdown(!sortDropdown)}>
                    <img src={FilterListIcon} alt="FilterListIcon" />
                    <span>Sort</span>
                  </button>
                  <div
                    className={
                      sortDropdown
                        ? "sort-by-dopdown sort-by-dopdown-show"
                        : "sort-by-dopdown-hidden sort-by-dopdown"
                    }
                  >
                    <div className="sort-by-dopdown-alignment">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(() => {
                        return (
                          <div className="radio-button-text-alignment">
                            <div>
                              <input type="radio" />
                            </div>
                            <div>
                              <span>Last update</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="dropdown-footer">
                      <div>
                        <img src={ArrowUpIcon} alt="ArrowUpIcon" />
                        <span>A-Z</span>
                      </div>
                      <div>
                        <img src={ArrowUpIconPrimary} alt="ArrowUpIconPrimary" />
                        <span>A-Z</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="customer-table-responsive">
            <table>
              <tr>
                <th align="left">
                  <input type="checkbox" name="a" />
                </th>
                <th align="left">
                  <span>Customer Name</span>
                </th>
                <th align="left">
                  <span>Location</span>
                </th>
                <th align="left">
                  <span>Orders</span>
                </th>
                <th align="left">
                  <span>Order Value</span>
                </th>
                <th align="left">
                  <span>Last Order</span>
                </th>
              </tr>
              {customers?.length === 0
                ? null
                : customers.map((res: any) => {
                    return (
                      <tr onClick={() => HandleSubmit(res?._id)} style={{ cursor: "pointer" }}>
                        <td align="left">
                          <input type="checkbox" name="a" onClick={(e) => HandleChecked(e)} />
                        </td>
                        <td align="left">
                          <span>
                            {res?.firstName} {res?.lastName}
                          </span>
                        </td>
                        <td align="left">
                          <span>
                            {res?.city}, {res?.country}
                          </span>
                        </td>
                        <td align="left">
                          <span>{res?.orderId?.length || 0}</span>
                        </td>
                        <td align="left">
                          <span>PKR 0</span>
                        </td>
                        <td align="left">
                          <span>-</span>
                        </td>
                      </tr>
                    );
                  })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
