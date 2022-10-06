import React from "react";
import "./collectionDetailsTable.scss";
export default function CollectionDetailsTable() {
  return (
    <>
      <div className="collection-details-table-alignment">
        <div className="grid">
          <div className="grid-items">
            <div className="title-dec-box">
              <div className="form-control">
                <label>Title</label>
                <input type="text" />
              </div>
              <div className="form-control">
                <label>Description</label>
                <textarea></textarea>
              </div>
            </div>
            <div className="collection-type-box">
              <p>Collection type</p>
              <div className="radio-text-alignment-for-all">
                <div className="radio-text-alignment">
                  <div>
                    <input type="radio" />
                  </div>
                  <div>
                    <h4>Manual</h4>
                    <span>
                      Add products to this collection one by one. Learn more
                      about manual collections.
                    </span>
                  </div>
                </div>
                <div className="radio-text-alignment">
                  <div>
                    <input type="radio" />
                  </div>
                  <div>
                    <h4>Manual</h4>
                    <span>
                      Existing and future products that match the conditions you
                      set will automatically be added to this collection. Learn
                      more about <a>automated collections.</a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="date-time-text">
                <h5>Date & Time</h5>
                <div className="input-grid">
                  <div className="input-grid-items">
                    <div className="form-control">
                      <input type="text" />
                    </div>
                  </div>
                  <div className="input-grid-items">
                    <div className="form-control">
                      <input type="text" />
                    </div>
                  </div>
                  <div className="input-grid-items">
                    <div className="form-control">
                      <input type="text" />
                    </div>
                  </div>
                </div>
                <div className="blue-button">
                  <button>Add another condition</button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-items">
            <div className="collection-avaliabilty-box">
              <p>Collection availability</p>
              <span>Online store</span>
            </div>
            <div className="collection-banner-box">
              <p>Collection Banner</p>
              <div className="add-image-style">
                <div>
                  <div className="button-center-alignment">
                    <button>Add image</button>
                  </div>
                  <span>or drop an image to upload</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
