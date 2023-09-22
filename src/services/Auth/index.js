import axios from "../base_axios.js";
import { store } from "../../redux/store.js";

const login = ({ username, password }) => {
  return axios.post("/login", { username, password });
};

const refresh = () => {
  const refreshToken = "Bearer " + store.getState().auth.refresh;
  return axios.post("/refresh", { refresh: refreshToken });
};

const logout = () => {
  const refreshToken = "Bearer " + store.getState().auth.refresh;
  return axios.post("/logout", { refresh: refreshToken });
};

export { login, refresh, logout };
