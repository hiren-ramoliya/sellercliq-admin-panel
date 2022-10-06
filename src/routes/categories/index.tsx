import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApiGet } from "../../helpers/API/ApiData";
import { fetchAllCategories } from "../../store/slices/allCategoriesSlice";
import { useAppDispatch } from "../../store/store";
import AddCategoriesModal from "./addCategoriesModal/addCategoriesModal";
import "./categories.scss";
import CategoriesTable from "./categoriesTable";

export default function Categories() {
  const dispatch = useAppDispatch();
  const allCategories = useSelector((state: any) => state?.allCategories);
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState({});
  const [breathcum, setBreathCum] = useState([]);
  const [addCategoryModal, setAddCategoryModal] = useState(false);

  const [newCategory, setNewCategory] = useState({
    name: "",
    parentCategory: { _id: "", name: "All" },
    media: "",
  });

  const toggleAddCategoryModal = () => {
    if (addCategoryModal) {
      setEditCategory({});
    }
    setAddCategoryModal(!addCategoryModal);
  };

  useEffect(() => {
    setCategories(allCategories.data);
  }, [allCategories]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  const getSubCateList = async (id: string = "") => {
    try {
      if (id === "") setBreathCum([]);
      let subCategoryRes = await ApiGet("category", { categoryId: id });
      if (subCategoryRes.status === 200) {
        setCategories(subCategoryRes?.data?.payload);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="categories-section-alignment">
        <div className="header-alignment">
          <div>
            <h1>Categories</h1>
          </div>
          <div className="green-button">
            <button onClick={toggleAddCategoryModal}>Add new category</button>
          </div>
        </div>
        <>
          <CategoriesTable
            categories={categories}
            toggle={toggleAddCategoryModal}
            editCategory={editCategory}
            setEditCategory={setEditCategory}
            getSubCateList={getSubCateList}
            breathcum={breathcum}
            setBreathCum={setBreathCum}
          />
        </>
      </div>
      {addCategoryModal && (
        <AddCategoriesModal
          toggle={toggleAddCategoryModal}
          categories={categories}
          editCategory={editCategory}
          setEditCategory={setEditCategory}
        />
      )}
    </>
  );
}
