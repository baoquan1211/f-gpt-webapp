import axios from "@/services/base_axios.js";
import { store } from "@/redux/store.js";

const login = ({ username, password }) => {
  return axios.post("/login", { username, password });
};

const refresh = () => {
  const refreshToken = store.getState().auth.refresh;
  return axios.post("/refresh", { refresh: refreshToken });
};

const logout = () => {
  const refreshToken = store.getState().auth.refresh;
  return axios.post("/logout", { refresh: refreshToken });
};

const register = ({ name, email, username, password }) => {
  return axios.post("/v1/users", { name, email, username, password });
};

export { login, refresh, logout, register };
