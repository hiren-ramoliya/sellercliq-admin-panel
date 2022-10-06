import React, { useEffect, useState } from "react";
import "./appProductModal.scss";
import LeftArrorw from "../../../assets/icons/left-arrow.svg";
import CloseIcon from "../../../assets/icons/close.svg";
import FilterIcon from "../../../assets/icons/filter.svg";
import ImageIcon from "../../../assets/icons/image.svg";
import ModalSearch from "../../../components/modalSearch";
import { useAppDispatch } from "../../../store/store";
import { fetchAllProducts } from "../../../store/slices/productsSlice";
import { useSelector } from "react-redux";
import { addProductsToOrder } from "../../../store/slices/orderCreateSlice";

export default function AllProductModal(props: any) {
  const { toggle, selectedProducts, closeBothModal } = props;
  const dispatch = useAppDispatch();

  const allProductsData = useSelector((state: any) => state.allProducts);
  console.log("allProductsData", allProductsData);

  const [allProducts, setAllProducts] = useState<{}[]>([]);
  const [tempSelectedProducts, setTempSelectedProducts] = useState(selectedProducts);
  const [search, setSearch] = useState("");

  const handleSelectProducts = (data: any, isChecked: boolean) => {
    if (isChecked) {
      setTempSelectedProducts(tempSelectedProducts?.filter((item: any) => item?._id !== data?._id));
    } else {
      setTempSelectedProducts([...tempSelectedProducts, data]);
    }
  };

  const handleAddProducts = (): void => {
    let finalisedProducts = allProducts?.filter((item: any) =>
      tempSelectedProducts?.some((item2: any) => item2?._id === item?._id)
    );
    console.log("finalisedProducts", finalisedProducts);

    let addProductsToStore: any = addProductsToOrder;
    dispatch(addProductsToStore(finalisedProducts));
    closeBothModal();
  };

  const handleQuantity = (e: any, key: string, product: any) => {
    if (key === "increase") {
      if (product?.quantity === product?.totalQty) {
        e.preventDefault();
      } else {
        setAllProducts(
          allProducts?.map((item: any) => {
            if (item?._id === product?._id) {
              return { ...item, quantity: item?.quantity + 1 };
            }
            return item;
          })
        );
      }
    } else if (key === "decrease") {
      if (product?.quantity === 1) {
        e.preventDefault();
      } else {
        setAllProducts(
          allProducts?.map((item: any) => {
            if (item?._id === product?._id) {
              return { ...item, quantity: item?.quantity - 1 };
            }
            return item;
          })
        );
      }
    }
  };

  useEffect(() => {
    if (allProductsData?.allProducts?.length === 0) {
      let fetchData: any = fetchAllProducts();
      dispatch(fetchData);
    } else {
      let updatedProducts = allProductsData?.allProducts?.map((item: any) => {
        let isThisSelected = selectedProducts?.find((item2: any) => item2?._id === item?._id);
        if (isThisSelected) {
          return isThisSelected;
        } else {
          return item;
        }
      });
      setAllProducts(updatedProducts);
    }
  }, [allProductsData]);

  return (
    <>
      <div className="all-product-modal-wrapper">
        <div className="all-product-modal">
          <div className="all-product-modal-header">
            <div>
              <img src={LeftArrorw} alt="LeftArrorw" />
              <h5>All Products</h5>
            </div>
            <div onClick={() => closeBothModal()}>
              <img src={CloseIcon} alt="CloseIcon" />
            </div>
          </div>

          <div className="all-product-filter">
            <div className="grid">
              <div className="grid-items">
                <ModalSearch search={search} setSearch={setSearch} />
              </div>
              <div className="grid-items">
                <div className="filter-button-style">
                  <button>
                    <img src={FilterIcon} alt="FilterIcon" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="all-product-modal-body" style={{ overflow: "scroll" }}>
            {allProductsData?.loading || allProductsData?.error?.message
              ? null
              : allProducts?.length === 0
              ? null
              : (!search
                  ? allProducts
                  : allProducts?.filter((product: any) => product?.name?.toLowerCase()?.includes(search))
                )?.map((res: any) => {
                  let productChecked = tempSelectedProducts?.find((data: any) => data?._id === res?._id);
                  return (
                    <div className="product-details-alignment" key={res?._id}>
                      <div className="first-div-alignment">
                        <div className="checkbox-alignment">
                          <input
                            type="checkbox"
                            onChange={() => handleSelectProducts(res, productChecked)}
                            checked={!!productChecked}
                          />
                        </div>
                        <div className="data-show">
                          <div>
                            <img src={res?.mediaId[0]?.url} alt="ImageIcon" />
                          </div>
                          <div>
                            <span>{res?.name}</span>
                          </div>
                        </div>
                      </div>
                      <div className="last-div-alignment">
                        <p>
                          {res?.totalQty} {res?.totalQty > 0 ? "available" : "unavailable"}
                        </p>
                        <p>PKR {res?.price}</p>
                        <p>X &nbsp;&nbsp; {res?.quantity}</p>
                      </div>
                      <div>
                        <button onClick={(e) => handleQuantity(e, "decrease", res)}>-</button>
                        <button onClick={(e) => handleQuantity(e, "increase", res)}>+</button>
                      </div>
                    </div>
                  );
                })}
          </div>
          <div className="all-product-modal-footer">
            <div className="select-button-style">
              <button>{selectedProducts?.length} variants selected</button>
            </div>
            <div className="right-side-button-style">
              <button onClick={() => toggle()}>Cancel</button>
              <button onClick={() => handleAddProducts()}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
