import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import Products from "./containers/Products/Products";
import Product from "./containers/Product/Product";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import SeatPlan from "./containers/SeatPlan/SeatPlan";
import AppliedRoute from "./components/AppliedRoute";
import NotFound from "./containers/NotFound/NotFound";
import Gallery from "./containers/Gallery/Gallery";
import NewGallery from "./containers/NewGallery/NewGallery";
import AboutUs from "./containers/AboutUs/AboutUs";
import Contact from "./containers/Contact/Contact";
import NextEvents from "./containers/NextEvents/NextEvents";
import Partners from "./containers/Partners/Partners";
import PreviousEvents from "./containers/PreviousEvents/PreviousEvents";
import WhatToBring from "./containers/WhatToBring/WhatToBring";
import Food from "./containers/Food/Food";
import SL4 from "./containers/archived-pages/SL4/SL4";
import FAQS from "./containers/FAQS/FAQS";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import CheckoutPayment from "./containers/Checkout/CheckoutPayment";
import SL1_Prev from "./containers/PreviousEventPages/SL1-Prev/SL1_Prev";
import SL2_Prev from "./containers/PreviousEventPages/SL2-Prev/SL2_Prev";
import SL3_Prev from "./containers/PreviousEventPages/SL3-Prev/SL3_Prev";
import SL4_Prev from "./containers/PreviousEventPages/SL4-Prev/SL4_Prev";
import SL5_Prev from "./containers/PreviousEventPages/SL5-Prev/SL5_Prev";
import SL6_Prev from "./containers/PreviousEventPages/SL6-Prev/SL6_Prev";
export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/login/reset" exact component={ResetPassword} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/Products" exact component={Products} props={childProps} />
    <AppliedRoute path="/Gallery" exact component={Gallery} props={childProps} />
    <AppliedRoute path="/NewGallery" exact component={NewGallery} props={childProps} />
    <AppliedRoute path="/FAQS" exact component={FAQS} props={childProps} />
    <AppliedRoute path="/AboutUs" exact component={AboutUs} props={childProps} />
    <AppliedRoute path="/Contact" exact component={Contact} props={childProps} />
    <AppliedRoute path="/archived-pages/ScotLAN4" exact component={SL4} props={childProps} />
    <AppliedRoute path="/NextEvents" exact component={NextEvents} props={childProps} />
    <AppliedRoute path="/Partners" exact component={Partners} props={childProps} />
    <AppliedRoute path="/PreviousEvents" exact component={PreviousEvents} props={childProps} />
    <AppliedRoute path="/WhatToBring" exact component={WhatToBring} props={childProps} />
    <AppliedRoute path="/CheckoutPayment" exact component={CheckoutPayment} props={childProps} />
    <AppliedRoute path="/Product/:Type/:Name" exact component={Product} props={childProps} />
    <AppliedRoute path="/PreviousEvents/ScotLAN1" exact component={SL1_Prev} props={childProps} />
    <AppliedRoute path="/PreviousEvents/ScotLAN2" exact component={SL2_Prev} props={childProps} />
    <AppliedRoute path="/PreviousEvents/ScotLAN3" exact component={SL3_Prev} props={childProps} />
    <AppliedRoute path="/PreviousEvents/ScotLAN4" exact component={SL4_Prev} props={childProps} />
    <AppliedRoute path="/PreviousEvents/ScotLAN5" exact component={SL5_Prev} props={childProps} />
    <AppliedRoute path="/PreviousEvents/ScotLAN6" exact component={SL6_Prev} props={childProps} />
    <AuthenticatedRoute path="/Checkout" exact component={Checkout} props={childProps} />
    <AuthenticatedRoute path="/Orders" exact component={Orders} props={childProps} />
    <AuthenticatedRoute path="/SeatPlan/:OrderID" exact component={SeatPlan} props={childProps} />
    <AuthenticatedRoute path="/Food" exact component={Food} props={childProps} />
    <Route component={NotFound} />
  </Switch>;
