import React, { useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Redirect, Route, Router } from "react-router-dom";
import "./App.css";
import "../src/assets/styles/mixins/global.scss";
import Order from "./routes/order";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import OrderCreate from "./routes/orderCreate";
import OrderOverview from "./routes/orderCreate/orderOverview";
import AbandonedCheckouts from "./routes/abandonedCheckouts";
import OrderPreview from "./routes/orderPreview";
import OrderRefund from "./routes/orderRefund";
import EditOrder from "./routes/editOrder";
import Customer from "./routes/customer";
import CustomerProfile from "./routes/customerProfile";
import CustomerCreate from "./routes/customerCreate";
import Categories from "./routes/categories";
import Brand from "./routes/brand";
import Invenotry from "./routes/inventory";
import Collection from "./routes/collection";
import GiftCards from "./routes/gift-cards";
import ProductMedia from "./routes/media";
import CollectionDetails from "./routes/collectionDetails";
import Analytics from "./routes/Analytics";
import Marketing from "./routes/Marketing";
import Discounts from "./routes/Discounts";
import SalesChannel from "./routes/SalesChannel";
import FacebookPage from "./routes/FacebookPage";
import GooglePage from "./routes/GooglePage";
import OnlineStore from "./routes/OnlineStore";
import Support from "./routes/Support";
import Setting from "./routes/Setting";
// import CustomerCreate from "./routes/customerCreate";

import Login from "./routes/Login";
import UserProfile from "./routes/UserProfile";
import Users from "./routes/users";
import Buyer from "./routes/users/Buyer";
import Seller from "./routes/users/Seller";

function App() {
  const [loggedIn, setloggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <>
      <BrowserRouter>
        <Route path="/login" component={Login} />
        <RouteWrapper
          exact
          path="/"
          component={Order}
          auth={localStorage.getItem("token")}
          layout={DefaultChildLayout}
        />
        {/* Order */}
        <RouteWrapper
          exact
          path="/order-overview"
          component={OrderOverview}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/order-preview/:id"
          component={OrderPreview}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/order-create"
          component={OrderCreate}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/edit-order/:id"
          component={EditOrder}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/order-create/:customerId"
          component={OrderCreate}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/order-refund/:id"
          component={OrderRefund}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/abandoned-checkouts"
          component={AbandonedCheckouts}
          layout={DefaultChildLayout}
        />
        {/* Product */}
        <RouteWrapper
          exact
          path="/inventory"
          component={Invenotry}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/categories"
          component={Categories}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/collection"
          component={Collection}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/brand"
          component={Brand}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/giftcards"
          component={GiftCards}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/media"
          component={ProductMedia}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/collection-details"
          component={CollectionDetails}
          layout={DefaultChildLayout}
        />
        {/* Customer */}
        <RouteWrapper
          exact
          path="/customer"
          component={Customer}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/customer-profile/:id"
          component={CustomerProfile}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/customer-create"
          component={CustomerCreate}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/customer-create/:id"
          component={CustomerCreate}
          layout={DefaultChildLayout}
        />
        {/* User */}
        <RouteWrapper
          exact
          path="/user"
          component={Users}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/buyer"
          component={Buyer}
          layout={DefaultChildLayout}
        />
        <RouteWrapper
          exact
          path="/seller"
          component={Seller}
          layout={DefaultChildLayout}
        />
        {/* Profile */}
        <RouteWrapper
          exact
          path="/profile"
          component={UserProfile}
          layout={DefaultChildLayout}
        />
        {/* Analytics */}
        <RouteWrapper
          exact
          path="/analytics"
          component={Analytics}
          layout={DefaultChildLayout}
        />
        {/* Marketing */}
        <RouteWrapper
          exact
          path="/marketing"
          component={Marketing}
          layout={DefaultChildLayout}
        />
        {/* Discounts */}
        <RouteWrapper
          exact
          path="/discounts"
          component={Discounts}
          layout={DefaultChildLayout}
        />
        {/* Sales Channel */}
        <RouteWrapper
          exact
          path="/sales-channel"
          component={SalesChannel}
          layout={DefaultChildLayout}
        />
        {/* Facebook Page*/}
        {/* <RouteWrapper exact path="/facebook-page" component={FacebookPage} layout={DefaultChildLayout} /> */}
        {/* Google Page */}
        {/* <RouteWrapper exact path="/google-page" component={GooglePage} layout={DefaultChildLayout} /> */}
        {/* Online Store */}
        <RouteWrapper
          exact
          path="/online-store"
          component={OnlineStore}
          layout={DefaultChildLayout}
        />
        {/* Support */}
        <RouteWrapper
          exact
          path="/support"
          component={Support}
          layout={DefaultChildLayout}
        />
        {/* Settings */}
        <RouteWrapper
          exact
          path="/settings"
          component={Setting}
          layout={DefaultChildLayout}
        />
        <Route path="*" render={() => <Redirect to="/" />} />
      </BrowserRouter>
    </>
  );
}

function RouteWrapper({
  component: Component,
  layout: Layout,
  auth,
  ...rest
}: any) {
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem("token") ? (
            <Layout {...props}>
              <Component {...props} />
            </Layout>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </>
  );
}

const DefaultChildLayout = ({ children, match }: any) => (
  <>
    {localStorage.getItem("token") ? (
      <>
        <Header />
        <div className="layout-grid">
          <Sidebar />
          {children}
        </div>
      </>
    ) : (
      <div>{children}</div>
    )}
  </>
);

export default App;
