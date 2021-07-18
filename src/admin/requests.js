import axios from "axios";

axios.defaults.baseURL = "https://webdev-api.loftschool.com";

const token = window.localStorage.getItem("token");
if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originRequestConfig = error.config;
    if (error.response.status === 401) {
      const {
        data: { token },
      } = await axios.post("/refreshToken");
      console.log(token);
      window.localStorage.setItem("token", token);
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
      originRequestConfig.headers["Authorization"] = `Bearer ${token}`;
      return axios(originRequestConfig);
    }
    return Promise.reject(error);
  }
);
export default axios;
