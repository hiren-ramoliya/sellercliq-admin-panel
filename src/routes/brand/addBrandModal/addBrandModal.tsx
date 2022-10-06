import React, { useEffect, useState } from "react";
import "./addBrandModal.scss";
import CloseIcon from "../../../assets/icons/new-close.svg";
import ImageBoxIcon from "../../../assets/icons/image-center-alignment.svg";
import { ApiPost, ApiPut } from "../../../helpers/API/ApiData";
import { useAppDispatch } from "../../../store/store";
import { fetchAllBrands } from "../../../store/slices/allBrandSlice";

export default function AddBrandModal(props: any) {
  const dispatch = useAppDispatch();
  const { toggle, editBrand, setEditBrand } = props;
  const [brand, setBrand] = useState<any>({});
  const [inputImage, setInputImage] = useState("");

  const handleSelectImage = (e: any) => {
    setBrand({ ...brand, media: e.target.files[0] });
    getBase64(e.target.files[0]).then((data: any) => setInputImage(data));
  };

  const handleBrandChange = (e: any) => {
    setBrand({
      ...brand,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBrand = async (e: any) => {
    e.preventDefault();
    let sendData = new FormData();
    sendData.append("name", brand.name);

    inputImage != "" &&
      sendData.append(
        "image",
        !!editBrand?.image && !inputImage ? editBrand?.image : brand.media
      );

    try {
      let path = !brand?._id ? "brand" : `brand/${brand?._id}`;
      let submitBrandRes = !brand?._id
        ? await ApiPost(path, sendData)
        : await ApiPut(path, sendData);
      if (submitBrandRes.status === 200) {
        dispatch(fetchAllBrands());
        toggle();
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    if (editBrand?._id) {
      setBrand({
        ...editBrand,
      });
    }
  }, []);

  return (
    <>
      <div className="add-brand-modal-blur">
        <div className="add-brand-modal">
          <div className="modal-header">
            <div>
              <h5>{!!editBrand?._id ? "Update" : "Add new"} brand </h5>
            </div>
            <div>
              <img src={CloseIcon} alt="CloseIcon" onClick={toggle} />
            </div>
          </div>
          <div className="modal-body">
            <div className="form-control">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={brand?.name}
                placeholder="Brand Name"
                onChange={(e) => handleBrandChange(e)}
              />
            </div>
            <div className="upload-image">
              <div>
                <div className="image-center-alignment">
                  <img
                    src={
                      !!editBrand?.image && !brand?.media
                        ? editBrand?.image
                        : !inputImage
                        ? ImageBoxIcon
                        : inputImage
                    }
                    alt="ImageBoxIcon"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div
                  className="upload-text"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <span>Upload a image</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onClick={(e) => setInputImage("")}
                    onChange={(e: any) => {
                      handleSelectImage(e);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="green-button">
              <button onClick={(e) => handleAddBrand(e)}>
                {!!editBrand?._id ? "Update brand" : "Add new brand"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
