import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";
import storage from "../plugin/db/index";
import devRoutes from "./Router_dev.js";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Login",
    component: resolve => require(["@/views/Login/Login.vue"], resolve)
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

/**
 * @param {Object} to 即将要进入的目标 路由对象
 * @param {Object} from 当前导航正要离开的路由
 * @param {Function} next 一定要调用该方法来 resolve 这个钩子。
 */
router.beforeEach((to, from, next) => {
  const vm = store;
  if (to.path != "/") {
    if (process.env.VUE_APP_IsLogin == "true") {
      if (Object.keys(vm.getters.getLoginInfo).length != 0) {
        //判断是刷新页面还是要添加路由
        if (vm.state.routerStatus) {
          next();
        } else {
          //判断取到的路由数据不能为空
          let data = storage.ss.get("login");
          if (data != null) {
            vm.state.routerStatus = true;
            let ro = setRouter(data.routerMenu);
            router.addRoutes(ro);
            next({ ...to, replace: true });
          }
        }
      } else {
        next("/");
      }
    } else {
      if (vm.state.routerStatus) {
        next();
      } else {
        vm.state.routerStatus = true;
        let ro = setRouter(devRoutes);
        router.addRoutes(ro);
        next({ ...to, replace: true });
      }
    }
  }
  next();
});

/**
 * 动态添加路由
 */
function setRouter(data) {
  let ro = [];
  let obj = {
    path: "/Home",
    name: "首页",
    component: resolve => require(["@/views/Home.vue"], resolve),
    children: []
  };
  data.forEach(function(value) {
    let view = value.component;
    let path = value.path;
    value.path = "/" + path;
    value.component = resolve => require([`@/views${view}`], resolve);
    obj.children.push(value);
  });
  ro.push(obj);
  return ro;
}

export default router;
