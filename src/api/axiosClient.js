import axios from "axios";
import queryString from "query-string";

// mainUrl:"https://ecommerce-lethanh.herokuapp.com"
//subUrl :"http://localhost:5000"
const instance = axios.create({
  baseURL: "https://ecommerce-lethanh.herokuapp.com",
  paramsSerializer: (params) => {
    return queryString.stringify({ ...params });
  },
});

export default instance;

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
