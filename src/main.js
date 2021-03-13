import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import request from "../utils/request";
import storage from "./plugin/db/index";
//api接口
import api from "./api/index";
//时间格式化
import moment from "moment";
//supermap样式
import "leaflet/dist/leaflet.css";

Vue.use(ElementUI);
Vue.prototype.$api = api;
Vue.prototype.$request = request;
Vue.prototype.$storage = storage;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

// 注册一个全局自定义指令 `v-checkParam`
Vue.directive("checkParam", {
  // 当被绑定的元素插入到 DOM 中时……
  // eslint-disable-next-line no-unused-vars
  inserted: function(el, binding, vNode) {
    // eslint-disable-next-line no-unused-vars
    el.addEventListener("keyup", function(event) {
      // 首先去除已有样式
      el.className = el.className.replace("input-error", "").trim();
      // if (!event.keyCode) { // 加上这个判断就是在提交时，才会校验
      // 判断是否是否必填
      let isRequired = binding.value.required;
      if (isRequired) {
        if (!el.value || el.value === "") {
          el.className += " input-error";
        }
      }

      // }
    });
  }
});
// 注册一个全局自定义指令 `v-checkSubmit`
Vue.directive("checkSubmit", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el, binding, vNode) {
    // eslint-disable-next-line no-unused-vars
    el.addEventListener("click", function(event) {
      let elements = document.getElementsByClassName("v-check");
      var evObj = document.createEvent("Event");
      evObj.initEvent("keyup", true, true);
      for (let element of elements) {
        element.dispatchEvent(evObj);
      }
      let errorInputs = document.getElementsByClassName("input-error");
      if (errorInputs.length === 0) {
        vNode.context.submit();
      }
    });
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
