import React, { useState } from "react";
import "./brandTable.scss";
import UploadGalleryIcon from "../../../assets/icons/upload-gallery.svg";
import SearchBar from "../../../components/searchBar";
import { confirmAlert } from "react-confirm-alert";
import { toast, ToastContainer } from "react-toastify";
import { ApiPut } from "../../../helpers/API/ApiData";
import deleteIcon from "./../../../assets/icons/deleteIcon.svg";

export default function BrandTable(props: any) {
  const { brand, reload } = props;
  const [search, setSearch] = useState("");

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
                deleteBrand(id);
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

  const deleteBrand = async (id: string) => {
    try {
      const res = await ApiPut("brand/" + id, { isDeleted: true });
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

  const handleCheck = (e: any, br: any) => {
    e.stopPropagation();
  };

  return (
    <>
      <ToastContainer position="bottom-right" />
      <div className="brand-table-design">
        <div className="brand-table-box">
          <div className="table-header">
            <p>All </p>
          </div>
          <div className="brand-search-section-alignment">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <div className="brand-table-design">
            <table>
              <thead>
                <tr>
                  <th align="left">
                    <div className="checkbox-image-alignment">
                      <div>
                        <input type="checkbox" />
                      </div>
                      <div>Image</div>
                    </div>
                  </th>
                  <th align="left">
                    <span>Name</span>
                  </th>
                  <th align="left">
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {(!search
                  ? brand
                  : brand &&
                    brand?.filter(
                      (br: any) =>
                        br?.name?.toLowerCase()?.includes(search) ||
                        br?.slug?.toLowerCase()?.includes(search)
                    )
                ).map((brands: any, inx: number) => (
                  <tr key={`br_` + inx}>
                    <td align="left">
                      <div className="checkbox-image-alignment">
                        <div>
                          <input
                            type="checkbox"
                            onClick={(e: any) => handleCheck(e, brands)}
                          />
                        </div>
                        <div>
                          <img
                            src={
                              brands?.image ? brands?.image : UploadGalleryIcon
                            }
                            alt="UploadGalleryIcon"
                            style={{
                              width: "100px",
                              maxHeight: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td align="left">
                      <span>{brands?.name}</span>
                    </td>
                    <td align="left" className="font-normal-table">
                      {brands?.isDeleted ? (
                        <>Deleted</>
                      ) : (
                        <div className="light-button">
                          <button onClick={() => confirm(brands?._id)}>
                            <img src={deleteIcon} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
