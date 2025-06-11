// import {
//   loginSuccess,
//   logoutSuccess,
// } from "../Features/Authentication/AuthSlice/AuthSlice";
import apiRoutes from "../../Constants/apiRoutes";
import { store } from "../Features/Store/Store";

interface IUserData {
  email: string;
  password: string;
}

interface IAPILogin {
  accessToken: string;
}

export const AuthService = {
  async login(userData: IUserData) {
    const res = await fetch(apiRoutes.Login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data: IAPILogin = await res.json();
    const token = data.accessToken;
    localStorage.setItem("token", token);
    return "response";
  },

  async logout() {
    await function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("theme");
    };
  },
};
