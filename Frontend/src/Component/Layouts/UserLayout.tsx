import React from "react";
import { Route } from "react-router-dom";
import PanelUser from "../PanelUser/PanelUser";

function UserLayout({children}:any) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

export default UserLayout;
