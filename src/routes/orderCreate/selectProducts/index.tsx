import React, { useState } from "react";
import "./selectProducts.scss";
import CloseIcon from "../../../assets/icons/close.svg";
import SearchIcon from "../../../assets/icons/light-search.svg";
import RightIcon from "../../../assets/icons/light-arrow-right.svg";
import AllProductModal from "../allProductModal";
export default function SelectProducts(props: any) {
  const { toggle, selectedProducts, setSelectProducts } = props;
  const [allProductModal, setAllProductModal] = useState(false);

  const productCategory: any = [
    "All Products",
    "Popular products",
    "Collectios",
    "Product types",
    "Tags",
    "Vendors",
  ];

  const OpenCustomItem = () => {
    setAllProductModal(!allProductModal);
  };

  const closeBothModal = () => {
    setAllProductModal(false);
    toggle();
  };

  const handleSelectCategory = (e: any, category: any) => {
    if (category === "All Products") {
      OpenCustomItem();
    }
  };

  return (
    <>
      <div className="select-products-modal-wrapper">
        <div className="select-products">
          <div className="modal-header">
            <div>
              <h4>Select Products</h4>
            </div>
            <div onClick={() => toggle()}>
              <img src={CloseIcon} alt="CloseIcon" />
            </div>
          </div>
          <div className="select-products-search">
            <div className="input-relative">
              <input type="text" placeholder="Search for anything " />
              <div className="icon-alignment">
                <img src={SearchIcon} alt="SearchIcon" />
              </div>
            </div>
          </div>
          <div className="select-products-body">
            <div className="all-content-alignment">
              {productCategory.map((res: string) => {
                return (
                  <div
                    className="all-content-style"
                    onClick={(e) => handleSelectCategory(e, res)}
                  >
                    <div>
                      <span>{res}</span>
                    </div>
                    <div>
                      <img src={RightIcon} alt="RightIcon" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="select-products-footer">
            <div className="select-button-style">
              <button>{selectedProducts?.length} variants selected</button>
            </div>
            <div className="right-side-button-style">
              <button onClick={() => toggle()}>Cancel</button>
              <button>Add</button>
            </div>
          </div>
        </div>
      </div>
      {allProductModal && (
        <AllProductModal
          selectedProducts={selectedProducts}
          toggle={OpenCustomItem}
          closeBothModal={closeBothModal}
        />
      )}
    </>
  );
}
