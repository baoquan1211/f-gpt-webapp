import axios from "../base_axios.js";
import { store } from "../../redux/store.js";

const getPolicy = () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + store.getState().auth.access;
  return axios.get(`/v1/policies`);
};

export { getPolicy };
