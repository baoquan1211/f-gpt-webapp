import axios from "axios";
import { store } from "../redux/store";
import { refreshAction } from "../redux/actions/authAction";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
});

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //return Promise.reject(error);
    const { response, config } = error;
    if (
      response.status === 401 &&
      response.statusText === "Unauthorized" &&
      response.data.code === "token_not_valid" &&
      config.url !== "/refresh" &&
      config.url !== "/login" &&
      config.url !== "/logout"
    ) {
      config._retry = true;
      store.dispatch(refreshAction()).then(() => {
        config.headers.Authorization = "Bearer " + store.getState().auth.access;
        return instance(config);
      });
    }
    let res = {};
    if (error.message) {
      res.data = error.response.data;
      res.status = error.response.status;
      res.header = error.response.header;
    }
    return res;
  }
);

export default instance;
