// axios 二次封装
// import axios from "axios";
import axios from "axios";

// vant 轻提示
import { Toast } from "vant";

// 引入 vuex 可直接获取 vuex 数据
import store from "@/store";

// 引入 router
import router from "@/router";

// 项目 id
const BASE_PROJECT_ID = 295;

// 错误后的操作
const errorHandle = (errMsg) => {
  store.commit("loginStore/clearUserInfo");
  router.push({
    path: "/login",
    // 传递完整路径
    query: {
      redirect: router.history.current.fullPath,
    },
  });
  // Toast.clear();
  Toast({
    message: errMsg,
    position: "bottom",
  });
};

// 实例化axios (自定义配置)
const http = axios.create({
  // 基础请求路径
  baseURL: process.env.VUE_APP_BASEURL,
  // 请求头
  headers: {
    // 默认都不需要设置请求头
    isToken: false, // 是否需要token
    isId: false, // 是否需要project_id
  },
  // 响应时间
  timeout: 15000,
});

// 请求拦截器 (每次请求都会触发)
http.interceptors.request.use(
  function (config) {
    // 每次请求显示加载中
    Toast.loading({
      message: "加载中...",
      forbidClick: true, // 禁用点击背景
      duration: 20000, // 时长
    });
    // 从vuex获取token
    const token = store.state.loginStore.token;
    // 是否需要token
    if (token && config.headers.isToken) {
      config.headers["x-token"] = token;
    }

    // 是否需要项目id
    if (config.headers.isId) {
      // get 请求将项目id放到params
      if (config.method == "get" || config.method == "GET") {
        // 有没有params
        config.params ? config.params : (config.params = {});
        config.params.project_id = BASE_PROJECT_ID;
      } else {
        // 有没有data
        config.data ? config.data : (config.data = {});
        config.data.project_id = BASE_PROJECT_ID;
      }
    }
    return config;
  },

  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器 (每次响应都会触发)
http.interceptors.response.use(
  function (response) {
    // 关闭loading
    Toast.clear();
    // 响应数据返回出去
    return response.data;
  },

  function (error) {
    // 关闭loading
    Toast.clear();
    const { status, data } = error.response;
    // token过期
    if (status === 409 && data.msg === "没有该用户信息") {
      errorHandle("登录失败，请重新登陆");
    }
    if (status === 401 && data.msg === "请登录后再进行操作") {
      errorHandle("请登录后再进行操作");
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default http;
