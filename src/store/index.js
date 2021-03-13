import Vue from "vue";
import Vuex from "vuex";
import storage from "../plugin/db/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openedTab: "",
    openedTitle: "",
    activeTab: "",
    loginUser: {},
    routerStatus: false, //路由状态
  },
  mutations: {
    changeTab(state, obj) {
      state.openedTab = obj["componentName"];
      state.openedTitle = obj["name"];
      storage.ss.set("openedTitle", obj["name"]);
    },
    loginInfo(state, obj) {
      state.loginUser = obj;
    }
  },
  actions: {},
  modules: {},
  getters: {
    getOpenedTitle(state) {
      return state.openedTitle == ""
        ? storage.ss.get("openedTitle")
        : state.openedTitle;
    },
    getLoginInfo(state) {
      let data = state.loginUser;
      if (Object.keys(state.loginUser).length == 0) {
        let login = storage.ss.get("login");
        if (login != null) {
          data = login.user;
        }
      }
      return data;
    }
  }
});
