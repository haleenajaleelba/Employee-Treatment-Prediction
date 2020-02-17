import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectRoute = ({ component: Component, ...rest }) => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  console.log(access_token);
  console.log("under protected route");
  return (
    <Route
      {...rest}
      render={props =>
        access_token && refresh_token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectRoute;
