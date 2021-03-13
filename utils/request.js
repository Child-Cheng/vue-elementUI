/* 封装axios方法 */
import axios from "axios";
import store from "../src/store/index";
import router from "../src/router/index";
import storage from "../src/plugin/db/index";
import api from "../src/api/index";
import { Message } from "element-ui";

const BASEURL = process.env.VUE_APP_BASE_URL;

// 设置基础URL  (动态的根据当前的环境不一样,设置不一样的baseurl)
// process.env webpack的全局变量环境 产品|开发环境判断 给不同BASEURL

let request = axios.create({
  baseURL: BASEURL,
  timeout: 7000, // 请求超时时间
  method: "post",
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});
// 创建一个axios实例,设置实例的基础url和 超时时间
//requset.拦截器.请求.使用
request.interceptors.request.use(
  async config => {
    config.url = config.url + "?" + new Date().getTime();
    if (process.env.VUE_APP_IsLogin == "true") {
      //不是登录请求才验证授权
      if (config.url.indexOf("/Auth/Login") > 0) {
        return config;
      }
      if (!(config.url.indexOf("/Auth/refreshToken") > 0)) {
        if (Object.keys(store.getters.getLoginInfo).length != 0) {
          const data = storage.ss.get("login");
          //过期时间
          let expires_in = data.expires_in - 300;
          if (expires_in - Math.round(new Date() / 1000) <= 0) {
            await request
              .getURL(api.refreshToken, { refreshToken: data.access_token })
              .then(res => {
                if (res.status == "200") {
                  data.access_token = res.data.access_token;
                  data.expires_in = res.data.expires_in;
                  storage.ss.set("login", data);
                } else {
                  router.push("/");
                }
              })
              .catch(err => {
                console.log("刷新出错", err);
              });
          }
          let token = data.token_type + "  " + data.access_token;
          config.headers.Authorization = token;
          // if (config.method != "get") {
          config.headers["UserName"] = data.user.userName;
          config.headers["Id"] = data.user.userId;
          config.headers["UserType"] = data.user.userType;
          // }
        } else {
          router.push("/");
        }
      }
    }
    // if (config.url.indexOf("api/File/Upload")) {
    //   config.timeout = 1800000;
    // }
    return config;
  },
  error => Promise.reject(error)
);
// use 两个回调函数 ，第一个回调函数代表正确 reslove，第个回调函数错误 reject
// Promise.reject  再一次向上一一级抛出一个reject错误你
// 发送请求前个请求头headers 添加 token 头信息
// (每当是axios发起请求时候,先执行use里面回调函数方法,)
// (比如每次发起ajax请求 添加token，添加用户名 到header头信息里面)

//requset.拦截器.响应.使用
request.interceptors.response.use(
  res => {
    if (res.data.status == 8888) {
      Message.error(res.data.data);
      new Error("出错了");
    } else if (res.data.status == 8889) {
      Message.error(res.data.message + ":" + res.data.data);
      new Error("出错了");
    } else if (res.data.status == "401") {
      router.push("/");
    } else {
      // 写一些业务逻辑  关闭加载提示,301 404 500 等错误响应
      //  res.data.status ==1 ==2 ==3 响应的公共逻辑
      return res.data;
    }
  },
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("出错日志", error.response);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    return error;
    // Promise.reject(error);
  }
);
// 响应请求拦截

/***添加一个 postURL方法,
// 最终返回的 当执行 postURL这个方法是最终返回的Promise对象的实例 
// prosmie对象的实例 有两个结果 .then .catch（异步拿到-等待任意时间获取） 回调函数 成功 
// .then 异步获取到 reslove 返回的数
// .catch 获取到 reject返回的 错误信息 */
// 拦截器就是再请求前，响应前 做一些额外的公共的的事情  请求前添加loading显示 响应前 移除loading
// request是有方法 也是 对象 对象的属性是可以动态的添加（动态添加了一个方法叫postURL）
request.postURL = function(url, data, option = {}) {
  return new Promise(function(resolve, reject) {
    request({
      url: url,
      method: "POST",
      data: data,
      ...option
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

request.putURL = function(url, data, option = {}) {
  return new Promise(function(resolve, reject) {
    request({
      url: url,
      method: "PUT",
      data: data,
      ...option
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

request.getURL = function(url, data, option = {}) {
  return new Promise(function(resolve, reject) {
    request({
      url: url,
      method: "GET",
      params: data,
      ...option
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export default request;
