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
import AboutUs from "./containers/AboutUs/AboutUs";
import Contact from "./containers/Contact/Contact";
import NextEvents from "./containers/NextEvents/NextEvents";
import Partners from "./containers/Partners/Partners";
import PreviousEvents from "./containers/PreviousEvents/PreviousEvents";
import WhatToBring from "./containers/WhatToBring/WhatToBring";
import FAQS from "./containers/FAQS/FAQS";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/Products" exact component={Products} props={childProps} />
    <AppliedRoute path="/Gallery" exact component={Gallery} props={childProps} />
    <AppliedRoute path="/FAQS" exact component={FAQS} props={childProps} />
    <AppliedRoute path="/AboutUs" exact component={AboutUs} props={childProps} />
    <AppliedRoute path="/Contact" exact component={Contact} props={childProps} />
    <AppliedRoute path="/NextEvents" exact component={NextEvents} props={childProps} />
    <AppliedRoute path="/Partners" exact component={Partners} props={childProps} />
    <AppliedRoute path="/PreviousEvents" exact component={PreviousEvents} props={childProps} />
    <AppliedRoute path="/WhatToBring" exact component={WhatToBring} props={childProps} />
    <AppliedRoute path="/Product/:Type/:Name" exact component={Product} props={childProps} />
    <AuthenticatedRoute path="/Checkout" exact component={Checkout} props={childProps} />
    <AuthenticatedRoute path="/Orders" exact component={Orders} props={childProps} />
    <AuthenticatedRoute path="/SeatPlan/:OrderID" exact component={SeatPlan} props={childProps} />
    <Route component={NotFound} />
  </Switch>;
