import React from "react";
import Menu from "./menu";
import AppRouter from "./approuter";

export default function layout() {
  return (
    <>
        <Menu/>
      <div>
        <AppRouter />
      </div>
    </>
  );
}
