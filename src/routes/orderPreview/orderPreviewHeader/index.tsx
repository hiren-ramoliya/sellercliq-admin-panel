import React from "react";

export default function index() {
  return <div>index</div>;
}

// import React from "react";
// import "./orderPreviewHeader.scss";
// import LeftArrow from "../../../assets/icons/left-new.svg";
// import DownIcon from "../../../assets/icons/new-down-icon.svg";
// import { NavLink, useHistory } from "react-router-dom";
// import { useSelector } from "react-redux";
// export default function OrderPreviewHeader() {
//   const history = useHistory();
//   const allOrderData = useSelector((state: any) => state?.orderbyid?.data);

//   const MoveToEditOrder = () => {
//     history.push(`/edit-order/${534534}`);
//   };
//   return (
//     <>
//       <div className="order-preview-header-section-alignment">
//         <div className="left-content-alignment">
//           <div
//             className="back-arrow"
//             onClick={() => history.push("/order-overview")}
//           >
//             <img src={LeftArrow} alt="LeftArrow" />
//           </div>
//           <div className="text-style">
//             <span>{allOrderData?.orderIndex}</span>
//           </div>
//           <div className="cod-button-style">
//             <button>COD</button>
//           </div>
//           <div className="new-order-button">
//             <button>New Order</button>
//           </div>
//         </div>
//         <div className="right-content-alignment">
//           <div
//             className="refund-text"
//             // onClick={() => history.push("/order-refund")}
//           >
//             <span>Refund</span>
//           </div>
//           <div className="edit-text-style">
//             <span onClick={() => MoveToEditOrder()}>Edit</span>
//           </div>
//           <div className="more-action-alignment">
//             <div>
//               <span>More actions</span>
//             </div>
//             <div>
//               <img src={DownIcon} alt="DownIcon" />
//             </div>
//           </div>
//           <div className="left-right-arrow-box">
//             <button>
//               <svg
//                 width="8"
//                 height="14"
//                 viewBox="0 0 8 14"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M7 13L1 7L7 1"
//                   stroke="#202223"
//                   stroke-opacity="0.25"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//               </svg>
//             </button>
//             <button>
//               <svg
//                 width="8"
//                 height="14"
//                 viewBox="0 0 8 14"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M1 13L7 7L1 1"
//                   stroke="black"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="child-header-content-alignment">
//         <p>July 18, 2022 at 12:43 am from Draft Orders</p>
//       </div>
//     </>
//   );
// }
