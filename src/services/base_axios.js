import axios from "axios";
import { store } from "@/redux/store";
import { refreshAction } from "@/redux/actions/authAction";

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
    console.log(response);
    if (
      response.status === 401 &&
      response.data.code === "token_not_valid" &&
      config.url !== "/refresh" &&
      config.url !== "/login" &&
      config.url !== "/logout"
    ) {
      console.log("REFRESHING TOKEN");
      store.dispatch(refreshAction());
    } else {
      let response = {};
      if (error.message) {
        response.data = error.response.data;
        response.status = error.response.status;
        response.header = error.response.header;
      }
      return response;
    }
  }
);

export default instance;
