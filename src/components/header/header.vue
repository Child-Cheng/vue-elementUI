<template>
  <section>
    <div class="title">{{ titleName }}</div>
    <div class="loginOut">
      <div>
        <el-dropdown>
          <el-button type="info"
            >{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              ><el-link @click="Modify"
                ><i class="el-icon-edit"></i> 修改密码</el-link
              ></el-dropdown-item
            >
            <el-dropdown-item
              ><el-link @click="loginOut"
                ><i class="el-icon-switch-button"></i> 退出系统</el-link
              ></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <!--        <el-menu :default-active="activeIndex"-->
        <!--                 background-color="#222d32"-->
        <!--                 text-color="#fff"-->
        <!--                 active-text-color="#ffd04b"-->
        <!--                 height="40px"-->
        <!--                 line-height="40px"-->
        <!--                 class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
        <!--          <el-submenu index="1">-->
        <!--            <template slot="title" style="height: 40px;line-height: 40px"><span class="login_user">{{ userName }}</span></template>-->
        <!--            <el-menu-item index="1-1">-->
        <!--              <el-link class="login_icon" @click="Modify"><i class="el-icon-switch-button"></i> 修改密码</el-link>-->
        <!--            </el-menu-item>-->
        <!--            <el-menu-item index="1-2">-->
        <!--              <el-link class="login_icon" @click="loginOut"><i class="el-icon-switch-button"></i> 退出系统</el-link>-->
        <!--            </el-menu-item>-->
        <!--          </el-submenu>-->
        <!--        </el-menu>-->
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "navMain",
  data() {
    return {
      titleName: "",
      userName: ""
    };
  },
  created: function() {
    this.titleName = this.$route.name;
    let user = this.$storage.ss.get("login");
    this.userName = user.user.userName;
    // //this.$store.getters.getOpenedTitle;
  },
  methods: {
    loginOut() {
      this.$confirm("退出登錄將無法繼續使用系統,是否繼續?", "提示", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$storage.ss.remove("login");
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "已取消退出登出"
          });
        });
    },
    Modify() {
      this.$router.push("/Modify");
    }
  },
  computed: {
    getOpenedTab() {
      return this.$store.state.openedTab;
    },
    changeTab() {
      return this.$store.state.activeTab;
    }
  },
  watch: {
    getOpenedTab(val) {
      this.titleName = this.$store.state.openedTitle;
      console.log(val);
    },
    changeTab(val) {
      console.log(val);
    }
  }
};
</script>
<style scoped>
.loginOut {
  position: absolute;
  right: 15px;
  top: 0;
  line-height: 40px;
  font-weight: 600;
  font-size: 18px;
}
.title {
  font-size: 18px;
  color: #ffffff;
}
.title::before {
  content: "-";
  background-color: #487ff9;
  color: #487ff9;
  font-size: 18px;
  margin-right: 10px;
}
.login_user {
  padding-right: 0.625rem;
  font-size: 18px;
  color: #ffffff;
}
.login_icon {
  font-size: 14px;
  color: #ffffff;
}
.login_icon >>> span {
  top: 0;
  padding: 0px;
  margin: 0px;
  /*padding-bottom: 10px;*/
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
  border-bottom: none !important;
}
</style>
