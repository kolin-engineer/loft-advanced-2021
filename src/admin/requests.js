import axios from "axios";

const token = window.localStorage.getItem("token");

axios.defaults.baseURL = "https://webdev-api.loftschool.com";
if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export default axios;
