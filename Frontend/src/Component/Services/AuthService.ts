import {
  loginSuccess,
  logoutSuccess,
} from "../Features/Authentication/AuthSlice/AuthSlice";
import axios from "axios";
import apiRoutes from "../../Constants/apiRoutes";
import { store } from "../Features/Store/Store";

interface IUserData {
  email: string;
  password: string;
}

export const AuthService = {
  async login(userData: IUserData) {
    await axios.post(apiRoutes.Login, userData).then((response) => {
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      store.dispatch(loginSuccess(response));
      return response;
    });
  },

  async logout() {
    await function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("theme");
    };
    store.dispatch(logoutSuccess());
  },
};
