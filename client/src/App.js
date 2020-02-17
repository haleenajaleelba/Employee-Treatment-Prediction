import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import Layout from "./shared/layout";
import AdminLayout from "./area/admin/shared/adminlayout";
import Protectroute from "./shared/protectroute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Protectroute path="/admin" component={AdminLayout} />
          <Route path="/" component={Layout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
