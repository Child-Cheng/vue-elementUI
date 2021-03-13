<!--本页为左侧下拉菜单-->
<template>
  <createMenu
    :data="menu"
    backgroundColor="#222D32"
    textColor="#b8c7ce"
    activeTextColor="#FFFFFF"
    :router="true"
    :defaultActive="currentMenu"
    :uniqueOpened="true"
    @select="selectMenu"
  ></createMenu>
</template>

<script>
import menu from "../../../globalConfig/menu-config.js";
import createMenu from "./createMenu.js";
export default {
  components: {
    createMenu
  },
  name: "navMenu",
  data() {
    return {
      menu: "",
      currentMenu: "Index"
    };
  },
  created() {
    if (process.env.VUE_APP_IsLogin == "true") {
      this.menu = JSON.parse(this.$storage.ss.get("login").url);
    } else {
      this.menu = menu;
    }
    this.currentMenu = this.$route.path.replace("/", "");
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    selectMenu(index, indexPath) {
      if (this.$store.state.openedTab == index) {
        location.reload();
      }
    }
  }
};
</script>

<style scoped>
.over-hide {
  overflow-x: hidden;
}
.el-submenu__title {
  border-bottom: 1px solid #8d98a2;
}
.el-menu {
  border-right: solid 0px #e6e6e6;
}

.el-menu-item:hover {
  background-color: rgb(49, 85, 99) !important;
}
.el-submenu__title:hover {
  background-color: rgb(49, 85, 99) !important;
}
.is-active {
  background-color: rgb(49, 85, 99) !important;
}
</style>
