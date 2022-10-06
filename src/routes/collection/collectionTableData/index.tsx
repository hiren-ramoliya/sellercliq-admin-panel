import React, { useEffect, useMemo, useState } from "react";
import "./collectionTableData.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { confirmAlert } from "react-confirm-alert";
import deleteIcon from "./../../../../src/assets/icons/deleteIcon.svg";
import { ApiPut } from "../../../helpers/API/ApiData";
import { toast, ToastContainer } from "react-toastify";

export default function CollectionTableData(props: any) {
  const { collectionData, limit, page, setPage, search, reload } = props;
  const [count, setCount] = useState(0);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if (page != value) {
      setPage(value);
    }
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
                deleteProduct(id);
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

  const deleteProduct = async (id: string) => {
    try {
      const res = await ApiPut("product/" + id, { isDeleted: true });
      if (res?.data?.result === 0) {
        toast.success(res?.data?.message);
        reload();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (collectionData?.count != undefined) {
      const res = Math.ceil(parseInt(collectionData?.count) / parseInt(limit));
      setCount(res);
    }
  }, [collectionData?.count]);

  const updateMode = async (id: string, status: boolean) => {
    try {
      const res = await ApiPut("product/" + id, { isBlock: status });
      if (res?.data?.result === 0) {
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
      <ToastContainer position="bottom-right" />
      <div className="collection-table-data-design">
        <table>
          <thead>
            <tr>
              <th align="left">
                <div className="checkbox-text-alignment">
                  <div>
                    <input type="checkbox" />
                  </div>
                  <div>
                    <span>Title</span>
                  </div>
                </div>
              </th>
              <th align="left">
                <span>Description</span>
              </th>
              <th align="left">
                <span>Created Date</span>
              </th>
              <th align="left">
                <span>Active/Deactive</span>
              </th>
              <th align="left">
                <span>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {(!search
              ? collectionData?.data
              : collectionData &&
                collectionData?.data?.filter(
                  (br: any) =>
                    br?.name?.toLowerCase()?.includes(search) ||
                    br?.slug?.toLowerCase()?.includes(search)
                )
            )?.map((collection: any, inx: number) => (
              <tr key={`col_` + inx}>
                <td>
                  <div className="checkbox-text-alignment">
                    <div>
                      <input type="checkbox" />
                    </div>
                    <div>
                      <span>{collection?.name}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="light-font">{collection?.description}</span>
                </td>
                <td>
                  <div className="time-text">
                    <span>{collection?.createdAt}</span>
                  </div>
                </td>
                <td>
                  <span>
                    {collection?.isBlock ? (
                      <div className="red-button">
                        <button
                          onClick={() => updateMode(collection?._id, false)}
                        >
                          Unblock
                        </button>
                      </div>
                    ) : (
                      <div className="green-button">
                        <button
                          onClick={() => updateMode(collection?._id, true)}
                        >
                          Block
                        </button>
                      </div>
                    )}
                  </span>
                </td>
                <td>
                  <span>
                    {collection?.isDeleted ? (
                      <>Deleted</>
                    ) : (
                      <div className="light-button">
                        <button onClick={() => confirm(collection?._id)}>
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
        <Stack spacing={2} className="pagination">
          <Pagination
            count={count}
            size="large"
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </>
  );
}
