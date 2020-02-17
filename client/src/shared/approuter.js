import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/home.js";
import Login from "../components/login.js";
import KnowYourStatus from "../components/knowyourstatus.js";

export default function approuter() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/knowyourstatus" component={KnowYourStatus} />
    </Switch>
  );
}
