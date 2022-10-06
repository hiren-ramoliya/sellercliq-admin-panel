import React from "react";
import "./mediaGrid.scss";
import ChckCircleIcon from "../../../assets/icons/check-circle.svg";

export default function MediaGrid(props: any) {
  const { media, bulkSelectOn, selectedMedia, setSelectedMedia } = props;

  const handleSelectMedia = (media: any) => {
    if (selectedMedia?.find((data: any) => data?.url === media?.url)?.url) {
      setSelectedMedia(selectedMedia.filter((item: any) => item?._id !== media?._id));
    } else {
      setSelectedMedia([...selectedMedia, media]);
    }
  };

  return (
    <>
      <div className="media-grid-section-alignment">
        <div className="media-grid-white-box">
          <div className="grid">
            {media?.length > 0 &&
              media.map((image: any, index: number) => {
                let thisMediaSelected = selectedMedia?.length > 0 && !!selectedMedia?.find((data: any) => data?.url === image?.url)?.url;
                return (
                  <>
                    <div
                      className={!bulkSelectOn ? "no-bulkselect" : thisMediaSelected ? "grid-items selected" : "grid-items"}
                      key={image?._id}
                      onClick={(e) => (bulkSelectOn ? handleSelectMedia(image) : e.preventDefault())}
                    >
                      <img
                        src={image?.url}
                        alt={!image ? `image${index}` : image?._id}
                        className="media"
                        style={{ filter: `contrast(${thisMediaSelected ? "0.7" : "1"})` }}
                      />
                      <div className="icon-alignment">
                        <div>
                          <img src={ChckCircleIcon} alt="ChckCircleIcon" />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
