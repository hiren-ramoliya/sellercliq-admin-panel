import React, { useEffect, useState } from "react";
import "./addCategoriesModal.scss";
import CloseIcon from "../../../assets/icons/new-close.svg";
import ImageBoxIcon from "../../../assets/icons/image-center-alignment.svg";
import DownArrow from "../../../assets/icons/dark-black-fill.svg";
import { ApiGet, ApiPost, ApiPut } from "../../../helpers/API/ApiData";
import { useAppDispatch } from "../../../store/store";
import { fetchAllCategories } from "../../../store/slices/allCategoriesSlice";

export default function AddCategoriesModal(props: any) {
  const dispatch = useAppDispatch();
  const { toggle, categories, editCategory, setEditCategory } = props;
  const [subCateList, setSubCateList] = useState([]);
  const [category, setCategory] = useState<any>({
    parentCategory: { _id: "", name: "Select Category" },
  });
  const [optionsShow, setOptionsShow] = useState(false);
  const [inputImage, setInputImage] = useState("");

  const handleCategoryChange = (e: any) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectParentCategory = (cat: any) => {
    setCategory({
      ...category,
      parentCategory: cat,
    });
    getSubCate(cat?._id);
    setOptionsShow(false);
  };

  const getSubCate = async (id: string) => {
    try {
      let subCategoryRes = await ApiGet("category", { categoryId: id });
      if (subCategoryRes.status === 200) {
        setSubCateList(subCategoryRes?.data?.payload);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectImage = (e: any) => {
    setCategory({ ...category, media: e.target.files[0] });
    getBase64(e.target.files[0]).then((data: any) => setInputImage(data));
  };

  const handleAddCategory = async (e: any) => {
    e.preventDefault();
    let sendData = new FormData();
    sendData.append("name", category.name);

    sendData.append(
      "parentId",
      !editCategory?._id ? category.parentCategory?._id : ""
    );
    inputImage != "" &&
      sendData.append(
        "cat_image",
        !!editCategory?.image && !inputImage
          ? editCategory?.image
          : category.media
      );

    try {
      let path = !editCategory?._id
        ? "category"
        : `category/${editCategory?._id}`;
      let submitCategoryRes = !editCategory?._id
        ? await ApiPost(path, sendData)
        : await ApiPut(path, sendData);
      if (submitCategoryRes.status === 200) {
        dispatch(fetchAllCategories());
        toggle();
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SubList = () => {
    return (
      <div className="options-container">
        <div
          className="input-select-options"
          onClick={(e) =>
            handleSelectParentCategory({
              _id: "",
              name: "Select Category",
            })
          }
          key={0}
        >
          <p>Select Category</p>
        </div>
        {subCateList?.map((res: any) => {
          return res?._id === editCategory?._id ? null : (
            <div
              className="input-select-options"
              onClick={(e) => handleSelectParentCategory(res)}
              key={res?._id}
            >
              <p>{res?.name}</p>
            </div>
          );
        })}
      </div>
    );
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
    if (editCategory?._id) {
      setCategory({
        ...editCategory,
        parentCategory: editCategory?.parentCategoryId,
      });
    }
  }, []);

  useEffect(() => {
    if (categories) {
      setSubCateList(categories);
    }
  }, [categories]);

  return (
    <>
      <div className="add-categories-modal-blur">
        <div className="add-categories-modal">
          <div className="modal-header">
            <div>
              <h5>{!!editCategory?._id ? "Update" : "Add new"} category </h5>
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
                value={category?.name}
                onChange={(e) => handleCategoryChange(e)}
              />
            </div>
            <div className="form-control">
              <label>Parent Category </label>
              <div
                className="custom-select"
                onClick={(e) => {
                  !!editCategory?._id
                    ? setOptionsShow(optionsShow)
                    : setOptionsShow(!optionsShow);
                }}
              >
                <p>
                  {!!editCategory?._id
                    ? editCategory?.name
                    : category.parentCategory?.name}
                </p>
                <div>
                  <img src={DownArrow} alt="DownArrow" />
                </div>
              </div>
              {optionsShow && <SubList />}
            </div>
            <div className="upload-image">
              <div>
                <div className="image-center-alignment">
                  <img
                    src={
                      !!editCategory?.image && !category?.media
                        ? editCategory?.image
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
              <button onClick={(e) => handleAddCategory(e)}>
                {!!editCategory?._id ? "Update Category" : "Add new categories"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
