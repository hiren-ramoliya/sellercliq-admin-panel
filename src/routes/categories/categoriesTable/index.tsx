import React, { useState } from "react";
import "./categoriesTable.scss";
import UploadGalleryIcon from "../../../assets/icons/upload-gallery.svg";
import SearchBar from "../../../components/searchBar";

export default function CategoriesTable(props: any) {
  const {
    categories,
    toggle,
    editCategory,
    setEditCategory,
    getSubCateList,
    breathcum,
    setBreathCum,
  } = props;
  const [search, setSearch] = useState("");
  // const [breathcum, setBreathCum] = useState({});

  const handleEditCategory = (e: any, category: any) => {
    e.preventDefault();
    setEditCategory(category);
    toggle();
  };

  const handleCheck = (e: any, category: any) => {
    e.stopPropagation();
  };

  const updateBreathCum = (inx: number) => {
    const remove = breathcum.splice(inx + 1);
    if (breathcum.length - 1 != inx) setBreathCum(breathcum);
  };

  return (
    <>
      <div className="categories-table-design">
        <div className="categories-table-box">
          <div className="table-header">
            {breathcum.length > 0 ? (
              <>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => getSubCateList()}
                >
                  All /
                </span>
                {breathcum?.map((val: any, inx: number) => {
                  return (
                    <>
                      {inx > 0 && " /"}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          getSubCateList(val?._id);
                          updateBreathCum(inx);
                        }}
                      >
                        &nbsp;{val?.name}
                      </span>
                    </>
                  );
                })}
              </>
            ) : (
              <p>All </p>
            )}
          </div>
          <div className="categories-search-section-alignment">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <div className="cartegories-table-design">
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
                    <span>Subcategory (00)</span>
                  </th>
                  <th align="left">
                    <span>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {(!search
                  ? categories
                  : categories?.filter(
                      (cat: any) =>
                        cat?.name?.toLowerCase()?.includes(search) ||
                        cat?.slug?.toLowerCase()?.includes(search)
                    )
                ).map((category: any, inx: number) => (
                  // <tr style={{ cursor: "pointer" }} onClick={(e: any) => handleEditCategory(e, category)}>
                  <tr key={`cat_` + inx}>
                    <td align="left">
                      <div className="checkbox-image-alignment">
                        <div>
                          <input
                            type="checkbox"
                            onClick={(e: any) => handleCheck(e, category)}
                          />
                        </div>
                        <div>
                          <img
                            src={
                              category?.image
                                ? category?.image
                                : UploadGalleryIcon
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
                      <span>{category?.name}</span>
                    </td>
                    <td align="left" className="font-normal-table">
                      {category?.subCategories?.length > 0 ? (
                        <span className="blue-button">
                          <button
                            onClick={(e: any) => {
                              setBreathCum([...breathcum, category]);
                              getSubCateList(category?._id);
                            }}
                          >
                            View ({category?.subCategories?.length})
                          </button>
                        </span>
                      ) : (
                        category?.subCategories?.length
                      )}
                    </td>
                    <td align="left" className="font-normal-table">
                      <div className="green-button">
                        <button
                          onClick={(e: any) => handleEditCategory(e, category)}
                        >
                          Edit
                        </button>
                      </div>
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
