import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../components/dashboard";
import Userlist from "../components/userlist";

export default function adminrouting() {
  return (
    <div>
      <Switch>
        <Route exact path="/admin" component={Dashboard} />
        <Route exact path="/admin/userlist" component={Userlist} />
      </Switch>
    </div>
  );
}
