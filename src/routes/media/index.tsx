import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { fetchAllMedia } from "../../store/slices/allMediaSlice";
import MediaGrid from "./mediaGrid";
import MediaSearchBar from "./mediaSearchBar";
import QuestionIcon from "../../assets/icons/quize.svg";
import "./productMedia.scss";
import JSZip from "jszip";
import * as FileSaver from "file-saver";
import Pagination from "../../components/pagination/Pagination";

export default function ProductMedia() {
  const dispatch = useAppDispatch();
  const stateMedia = useSelector((state: any) => state?.media);
  const [allMedia, setAllMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [bulkSelectOn, setBulkSelectOn] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const toggleBulkSelect = () => {
    if (bulkSelectOn) {
      setSelectedMedia([]);
    }
    setBulkSelectOn(!bulkSelectOn);
  };

  const toggleSelectAll = (deselect: boolean) => {
    if (deselect === true) {
      setSelectedMedia([]);
    } else {
      if (selectedMedia.length === allMedia.length) {
        setSelectedMedia([]);
      } else if (allMedia?.length > 0) {
        setSelectedMedia(allMedia);
      }
    }
  };

  const handleDownload = () => {
    var zip1 = new JSZip();
    var count = 0;
    var zipFilename = "Pictures.zip";
    let selectedMediaUrls = selectedMedia?.map((data: any) => data?.url);
    selectedMediaUrls.forEach(function (url, i) {
      var filename: string = selectedMediaUrls[i];
      filename = filename.replace(/[\/\*\|\:\<\>\?\"\\]/gi, "").replace("httpssequenceimagestaging.blob.core.windows.netretouch", "");
      let blob = fetch(url).then((r) => r.blob());
      zip1.file(filename, blob, { binary: true });
      count++;
      if (count == selectedMediaUrls.length) {
        zip1.generateAsync({ type: "blob" }).then(function (content) {
          FileSaver.saveAs(content, zipFilename);
          setSelectedMedia([]);
        });
      }
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const isSetPage = (data: any) => {
    setPage(data);
    scrollToTop();
    dispatch(fetchAllMedia({ limit: 15, page: data }));
    setSelectedMedia([]);
  };

  useEffect(() => {
    if (stateMedia?.data?.length === 0 && !stateMedia?.called) {
      dispatch(fetchAllMedia({ limit: 15, page: 1 }));
    } else {
      setAllMedia(stateMedia?.data);
      setTotalPages(Math.ceil((stateMedia?.total || 1) / 15));
    }
  }, [stateMedia]);

  return (
    <>
      <div className="product-media-section-alignment">
        <div className="product-header-alignment">
          <div>
            <h1>Media Library</h1>
          </div>
          <div className="green-button">
            <button onClick={(e) => dispatch(fetchAllMedia(15))}>Upload Media</button>
          </div>
        </div>
        <MediaSearchBar
          bulkSelectOn={bulkSelectOn}
          toggleBulkSelect={toggleBulkSelect}
          selectedMedia={selectedMedia}
          selectAll={toggleSelectAll}
          allSelected={selectedMedia.length === allMedia.length}
          handleDownload={handleDownload}
        />
        <MediaGrid media={allMedia} bulkSelectOn={bulkSelectOn} selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} />
        {/* <div
        // className={styles.paginationContentAlignment}
        > */}
          <Pagination pages={totalPages} current={page} onClick={isSetPage} />
        {/* </div> */}
        <div className="learn-more-button-center-alignment">
          <button>
            <img src={QuestionIcon} alt="QuestionIcon" />
            <span>
              Learn more about <a>orders</a>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
