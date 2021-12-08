import axios from "axios";

const request = axios.create({
  baseURL: "http://yapi.smart-xwork.cn/mock/118724/",
  timeout: 1000 * 60,
  headers: { "Content-Type": "application/x-www-form-urlencoded" }, //配置请求头
});

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    config.headers["token"] = "token";
    // console.log("config", config);
    // config.data = {
    //   data: config.data,
    // };
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default request;
