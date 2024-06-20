import axios from "axios";

const apiURL = process.env.REACT_APP_LIVE_BASE_URL;
const API = axios.create();

API.interceptors.request.use(
  async (config) => {
    const authToken =
      localStorage.getItem("user_details") &&
      JSON.parse(localStorage.getItem("user_details")).authToken;

    config.headers.authToken = authToken || "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const GetAPI = async (url, callback) => {
  await API.get(apiURL + url)
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      // callback(error.response.data);
    });
};

export const PostAPI = async ({ url, data }, callback) => {
  await API.post(apiURL + url, data)
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      callback(error.response.data);
    });
};

export const PatchAPI = async ({ url, data }, callback) => {
  await API.patch(apiURL + url, data)
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      callback(error.response.data);
    });
};

export const DeleteAPI = async ({ url, data }, callback) => {
  await API.delete(apiURL + url, { data: data })
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      callback(error.response.data);
    });
};

export const Delete_params = async (url, callback) => {
  await API.delete(apiURL + url)
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      callback(error.response.data);
    });
};
