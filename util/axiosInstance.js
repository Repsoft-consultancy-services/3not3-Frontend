import axios from "axios";

const axiosinstance = axios.create({});
axiosinstance.interceptors.request.use(
  function (config) {
    const { token } = JSON.parse(localStorage.getItem("authUser"));
    const userToken = token.token;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject((error) => {
      toast.error("Error Occurred", error);
    });
  }
);
export default axiosinstance;
