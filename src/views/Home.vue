<template>
  <el-container>
    <el-aside style="width: 230px;box-sizing: border-box;">
      <el-row class="logo">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <a href="#">前端框架</a>
          </div></el-col
        >
      </el-row>
      <el-row class="aside-main">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark ">
            <navMenu></navMenu></div
        ></el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-header style=" height: 40px;"><navHeader></navHeader></el-header>
      <el-main class="content-wrapper"><navMain></navMain></el-main>
    </el-container>
  </el-container>
</template>

<script>
import navMenu from "@/components/navMenu/navMenu";
import navMain from "@/components/navMain/navMain";
import navHeader from "@/components/header/header";

export default {
  components: {
    navMenu,
    navMain,
    navHeader
  }
};
</script>
<style scoped>
.el-container {
  height: 100%;
  width: 100%;
}
.el-header {
  background-color: #315563;
  padding: 0 15px !important;
}
.el-header {
  line-height: 40px;
  height: 40px;
}
.logo,
.logo div {
  line-height: 50px;
  height: 50px;
}
.el-aside {
  width: 230px;
  display: block;
  position: relative;
  bottom: 0;
  background-color: #222d32;
}
.logo {
  width: 100%;
}
.logo div {
  width: 100%;
  font-size: 20px;
  text-align: center;
  font-weight: 700;
}
.logo div a {
  text-decoration: none;
  color: #ffffff;
}
.aside-main {
  height: calc(100% - 50px);
  width: 100%;
  background-color: #222d32;
}
</style>
