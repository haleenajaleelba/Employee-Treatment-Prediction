import React from "react";
import AdminMenu from "./adminmenu";
import AdminRouter from "./adminrouting";
export default function adminlayout(props) {
  return (
    <>
      <AdminMenu history={props.history}/>
      <div>
        <div className="container">
          <AdminRouter />
        </div>
      </div>
    </>
  );
}
