import axios from "@/services/base_axios.js";
import { store } from "@/redux/store.js";

const getConversation = (conversationID) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + store.getState().auth.access;
  if (conversationID === undefined || conversationID === null) {
    return axios.get(`/v1/conversations`);
  }
  return axios.get(`/v1/conversations/${conversationID}`);
};

const updateConversation = (conversationID, conversationName) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + store.getState().auth.access;
  return axios.patch(
    `/v1/conversations/${conversationID}?name=${conversationName}`
  );
};

const deleteConversation = (conversationID) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + store.getState().auth.access;
  return axios.delete(`/v1/conversations/${conversationID}`);
};

const getStrpdf = (conversationID) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + store.getState().auth.access;
  return axios.get(`/v1/conversations/${conversationID}/pdf-exporting`, {
    responseType: "blob",
  });
};

export { getConversation, updateConversation, deleteConversation, getStrpdf };
