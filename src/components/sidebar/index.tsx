import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";
import HomeIcon from "../../assets/icons/home.svg";
import OrderIcon from "../../assets/icons/order.svg";
import OrderIconActive from "../../assets/icons/order-active.svg";
import ProductsIcon from "../../assets/icons/products.svg";
import ProductsIconActive from "../../assets/icons/product-active.svg";
import CustomersIcon from "../../assets/icons/customers.svg";
import AnalyticsIcon from "../../assets/icons/analytics.svg";
import MarketingIcon from "../../assets/icons/marketing.svg";
import DiscountsIcon from "../../assets/icons/discounts.svg";
import SalesChannelIcon from "../../assets/icons/salesChannel.svg";
import FacebookIcon from "../../assets/icons/facebook.svg";
import GoogleIcon from "../../assets/icons/google.svg";
import OnlineStoreIcon from "../../assets/icons/onlineStore.svg";
import SupportIcon from "../../assets/icons/support.svg";
import SettingIcon from "../../assets/icons/setting.svg";

export default function Sidebar() {
  const [tab, setTab] = useState(window?.location?.pathname?.split("/")[1] || "Home");

  // Routes =====================================================================================================================
  const orderRoutes = ["order-overview", "order-preview", "order-create", "edit-order", "order-refund", "abandoned-checkouts"];
  const productRoutes = ["products", "inventory", "categories", "collection", "brand", "giftcards", "media"];
  const customerRoutes = ["customer", "customer-profile", "customer-create"];
  const userRoutes = ["user", "buyer", "seller"];
  const analyticsRoutes = ["analytics"];
  const marketingRoutes = ["marketing"];
  const discountRoutes = ["discounts"];
  const salesChannelRoutes = ["sales-channel"];
  const facebookRoutes = ["facebook-page"];
  const googleRoutes = ["google-page"];
  const onlineStoreRoutes = ["online-store"];
  const supportRoutes = ["support"];
  const settingRoutes = ["settings"];

  // Sub Links start ============================================================================================================
  const orderSubLinks = [
    { name: "All Orders", path: "/order-overview" },
    { name: "Drafts", path: "/" },
    { name: "Abandoned Checkouts", path: "/abandoned-checkouts" },
  ];
  const productSubLinks = [
    // {
    //   name: "Inventory",
    //   path: "/inventory",
    // },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "Collection",
      path: "/collection",
    },
    {
      name: "Brand",
      path: "/brand",
    },
    // {
    //   name: "Gift Cards",
    //   path: "/giftcards",
    // },
    // {
    //   name: "Media",
    //   path: "/media",
    // },
  ];
  const userSubLinks: any = [
    {
      name: "User",
      path: "/user",
    },
    {
      name: "Buyer",
      path: "/buyer",
    },
    {
      name: "Seller",
      path: "/seller",
    },
  ];
  const customerSubLinks: any = [];
  const analyticsSubLinks: any = [];
  const marketingSubLinks: any = [];
  const discountSubLinks: any = [];
  const salesChannelSubLinks: any = [];
  const facebookSubLinks: any = [];
  const googleSubLinks: any = [];
  const onlineStoreSubLinks: any = [];
  const supportSubLinks: any = [];
  const settingSubLinks: any = [];
  // Sub Links end ==============================================================================================================

  return (
    <div className="sidebar-sticky">
      <div className="sidebar">
        <div className="sidebar-alignment">
          <NavLink to={"/"}>
            <div className={tab === "Home" ? "sidebar-menu  sidebar-menu-active" : "sidebar-menu"}>
              <div>
                <img src={HomeIcon} alt="HomeIcon" />
              </div>
              <div>
                <span>Home</span>
              </div>
            </div>
          </NavLink>
          <SidebarTab
            name={"Orders"}
            tabLink={"/order-overview"}
            routes={orderRoutes}
            activeIcon={OrderIconActive}
            passiveIcon={OrderIcon}
            altIcon={"OrderIcon"}
            subLinks={orderSubLinks}
            tab={tab}
          />
          <SidebarTab
            name={"Products"}
            tabLink={"/collection"}
            routes={productRoutes}
            activeIcon={ProductsIconActive}
            passiveIcon={ProductsIcon}
            altIcon={"Products"}
            subLinks={productSubLinks}
            tab={tab}
          />
          {/* <SidebarTab
            name={"Customers"}
            tabLink={"/customer"}
            routes={customerRoutes}
            activeIcon={""}
            passiveIcon={CustomersIcon}
            altIcon={"Customers"}
            subLinks={customerSubLinks}
            tab={tab}
          /> */}
          <SidebarTab
            name={"User"}
            tabLink={"/user"}
            routes={userRoutes}
            activeIcon={ProductsIconActive}
            passiveIcon={ProductsIcon}
            altIcon={"User"}
            subLinks={userSubLinks}
            tab={tab}
          />
          <SidebarTab
            name={"Reports"}
            tabLink={"/analytics"}
            routes={analyticsRoutes}
            activeIcon={""}
            passiveIcon={AnalyticsIcon}
            altIcon={"Analytics"}
            subLinks={analyticsSubLinks}
            tab={tab}
          />
          <SidebarTab
            name={"Advertise"}
            tabLink={"/marketing"}
            routes={marketingRoutes}
            activeIcon={""}
            passiveIcon={MarketingIcon}
            altIcon={"Marketing"}
            subLinks={marketingSubLinks}
            tab={tab}
          />
          <SidebarTab
            name={"Promotion"}
            tabLink={"/discounts"}
            routes={discountRoutes}
            activeIcon={""}
            passiveIcon={DiscountsIcon}
            altIcon={"Discounts"}
            subLinks={discountSubLinks}
            tab={tab}
          />

          {/* <SidebarTab
            name={"Sales Channel"}
            tabLink={"/sales-channel"}
            routes={salesChannelRoutes}
            activeIcon={""}
            passiveIcon={SalesChannelIcon}
            altIcon={"SalesChannel"}
            subLinks={salesChannelSubLinks}
            tab={tab}
          /> */}
          {/* <SidebarTab
            name={"Facebook"}
            tabLink={"/facebook-page"}
            routes={facebookRoutes}
            activeIcon={""}
            passiveIcon={FacebookIcon}
            altIcon={"Facebook"}
            subLinks={facebookSubLinks}
            tab={tab}
          />
          <SidebarTab
            name={"Google"}
            tabLink={"/google-page"}
            routes={googleRoutes}
            activeIcon={""}
            passiveIcon={GoogleIcon}
            altIcon={"Google"}
            subLinks={googleSubLinks}
            tab={tab}
          />
          <SidebarTab
            name={"Online Store"}
            tabLink={"/online-store"}
            routes={onlineStoreRoutes}
            activeIcon={""}
            passiveIcon={OnlineStoreIcon}
            altIcon={"OnlineStore"}
            subLinks={onlineStoreSubLinks}
            tab={tab}
          /> */}
          <SidebarTab
            name={"Support"}
            tabLink={"/support"}
            routes={supportRoutes}
            activeIcon={""}
            passiveIcon={SupportIcon}
            altIcon={"Support"}
            subLinks={supportSubLinks}
            tab={tab}
          />
          <SidebarTab
            name={"Settings"}
            tabLink={"/settings"}
            routes={settingRoutes}
            activeIcon={""}
            passiveIcon={SettingIcon}
            altIcon={"Settings"}
            subLinks={settingSubLinks}
            tab={tab}
          />
        </div>
      </div>
    </div>
  );
}

const MultipleLinks = ({ links, subLink }: any) => {
  return links.map((link: any, index: number) => {
    return (
      <NavLink to={link.path} key={index} className={link.path.slice(1) == subLink ? "sublink-active" : ""}>
        {link.name}
      </NavLink>
    );
  });
};

const SidebarTab = ({ name, tabLink, routes, activeIcon, passiveIcon, altIcon, subLinks, tab }: any) => {
  // console.log("routes", name, routes, routes?.includes(tab));
  return (
    <NavLink to={tabLink}>
      <div className={routes?.includes(tab) ? "sidebar-menu  sidebar-menu-active" : "sidebar-menu"}>
        <div>
          <img src={routes?.includes(tab) ? (!activeIcon ? passiveIcon : activeIcon) : passiveIcon} alt={altIcon} />
        </div>
        <div>
          <span>{name}</span>
        </div>
      </div>
      {subLinks?.length > 0 && (
        <div className={routes?.includes(tab) ? "sidebar-menu-sub" : "sidebar-menu-sub-close"}>
          <MultipleLinks links={subLinks} subLink={tab} />
        </div>
      )}
    </NavLink>
  );
};
