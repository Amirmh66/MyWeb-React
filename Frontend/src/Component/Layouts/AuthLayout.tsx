import React, { useState } from "react";
import Login from "../Users/Login";
import Profile from "../Header/navbar/Profile";
import { LoginContext } from "../Context/LoginContext";
import AdminLayout from "./AdminLayout";

function AuthLayout() {
  const [showProfile, setShowProfile] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <>
      <LoginContext.Provider value={{userName,  setUserName ,setShowProfile}}>
        {showProfile ? <AdminLayout /> : <Login />}
        </LoginContext.Provider>
    </>
  );
}

export default AuthLayout;
