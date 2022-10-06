import React from "react";
import ModalSearch from "../../../components/modalSearch";
import "./mediaSearchBar.scss";
import FilterIcon from "../../../assets/icons/filter-icon.svg";
import CalenderIcon from "../../../assets/icons/Calender.svg";
import DownloadIcon from "../../../assets/icons/download-icon.svg";
import DeleteIcon from "../../../assets/icons/deleteIcon.svg";
import { ApiPut } from "../../../helpers/API/ApiData";
import { useAppDispatch } from "../../../store/store";
import { fetchAllMedia } from "../../../store/slices/allMediaSlice";

export default function MediaSearchBar(props: any) {
  const dispatch = useAppDispatch();
  const { bulkSelectOn, toggleBulkSelect, selectedMedia, selectAll, allSelected, handleDownload } = props;

  const handleDeleteMedia = async () => {
    let selectedMediaIds = selectedMedia?.length > 0 ? selectedMedia?.map((data: any) => data?._id) : [];
    console.log("selectedMediaIds btn", selectedMediaIds);
    let data = { mediaId: selectedMediaIds };
    console.log("data", data);
    try {
      let deleteMediaRes = await ApiPut("media/remove-media", data);
      if (deleteMediaRes.status === 200) {
        dispatch(fetchAllMedia({ limit: 15, page: 1 }));
        selectAll(true);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isActive = selectedMedia?.length > 0;

  return (
    <>
      <div className="media-searchbar-section-alignment">
        <div className="search-bar-box">
          <div className="grid">
            <div className="grid-items">
              <ModalSearch />
            </div>
            <div className="grid-items">
              <button>
                <img src={FilterIcon} alt="FilterIcon" />
                <span>Filter</span>
              </button>
            </div>
            <div className="grid-items">
              <button>
                <img src={CalenderIcon} alt="CalenderIcon" />
                <span>All Dates</span>
              </button>
            </div>
            <div className={`grid-items ${!bulkSelectOn && "grid-items-disabled"}`}>
              <button onClick={toggleBulkSelect}>Bulk select</button>
            </div>
          </div>
        </div>
        {bulkSelectOn && (
          <div className="selected-section-alignment">
            <div className="selected-section-design">
              <div className="checkbox-section-alignment">
                <div>
                  <input type="checkbox" onChange={selectAll} checked={isActive && allSelected} />
                </div>
                <div>
                  <span>{selectedMedia?.length} selected</span>
                </div>
              </div>
              <div className="downaload-button">
                <button
                  onClick={handleDownload}
                  disabled={selectedMedia.length === 0}
                  style={{ opacity: isActive ? "1" : "0.5", cursor: isActive ? "pointer" : "default" }}
                >
                  <span>Download</span>
                  <img src={DownloadIcon} alt="DownloadIcon" />
                </button>
              </div>
              <div className="downaload-button">
                <button onClick={handleDeleteMedia} style={{ opacity: isActive ? "1" : "0.5", cursor: isActive ? "pointer" : "default" }}>
                  <span>Delete</span>
                  <img src={DeleteIcon} alt="DownloadIcon" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
