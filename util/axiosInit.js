// import axios from "axios";
// const baseURL = "http://13.233.106.46:5000/api";

// const getToken = () => {
//   const item = JSON.parse(localStorage.getItem("authUser"));
//   return item ? item.token : null;
// };

// const setHeader = () => {
//   if (getToken()) {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
//   }
// };

// const interceptor = () => {
//   axios.interceptors.response.use(
//     (res) => Promise.resolve(res.data),
//     (err) => {
//       return Promise.reject(error);
//     }
//   );
// };

// export default function () {
//   axios.defaults.baseURL = baseURL;
//   axios.defaults.headers.post["Content-Type"] = "application/json";
//   setHeader();
//   interceptor();
// }
