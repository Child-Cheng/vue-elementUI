<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style>
html,
body,
#app {
  width: 100%;
  margin: 0%;
  padding: 0%;
  height: 100%;
  font-family: "Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.content-wrapper {
  background-color: #ecf0f5;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  position: relative;
  box-sizing: border-box;
  z-index: 800;
}
.content {
  box-sizing: border-box;
  padding: 15px;
  box-shadow: 0 0 3px rgba(207, 216, 221, 0.63),
    0 3px 5px rgba(207, 216, 221, 0.63);
  background-color: #ffffff;
}
.page-div {
  padding-top: 15px;
}
.page-div div {
  text-align: end;
}
.el-table th,
.el-table tr {
  font-weight: normal;
}
.el-table thead {
  color: #000000 !important;
  font-weight: normal;
  text-align: center;
}
.el-table__header th > .cell {
  /*text-align: center;*/
}
.custom-table table tbody tr td {
  /*text-align: center;*/
}
.custom-table table tbody tr td a {
  margin-right: 10px;
}
ul li {
  list-style: none;
}
/*实现表格头数据换行  css保留换行符*/
.el-table .cell {
  white-space: pre-line !important;
  overflow-wrap: break-word;
  /*就是下面这一句，好像网上没有这一个的说明，但是浏览器都支持*/
  word-break: break-word;
  word-wrap: break-word;
}
/*添加css样式*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}
/* .el-radio__input.is-checked .el-radio__inner {
  border-color: #000000;
  background: #000000;
} */
.el-table td,
.el-table th {
  padding: 6px 0 !important;
}
.el-table thead > tr > th {
  background: #f2f2f2 !important;
  border-color: #ddd;
}
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.el-menu-item,
.el-submenu__title {
  height: 44px;
  line-height: 44px;
}
.el-submenu__title {
  padding-left: 18px !important;
}
.el-submenu__title i {
  color: #b8c7ce !important;
}
.el-submenu__title i:first-child {
  width: 20px;
  padding-right: 10px !important;
}
.el-input__inner {
  height: 34px;
  line-height: 34px;
}
.el-button {
  padding: 7px 13px;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 4px !important;
}
.el-submenu.is-active .el-submenu__title {
  border-left-color: #409eff !important;
  background: #315563 !important;
  border-left: #409eff solid;
  color: #fff !important;
}
.el-submenu.is-active .el-submenu__title i {
  color: #fff !important;
}
.el-submenu.is-active .el-menu .el-menu-item {
  /*margin: 0 1px !important;*/
  background: #2c3b41 !important;
}
.el-submenu.is-active .el-menu .el-menu-item:hover {
  color: #fff !important;
}
.mzindex {
  z-index: 3000 !important;
}
.el-menu-item i {
  color: #b8c7ce !important;
}

.interTimeSpan {
  display: inline-block;
  min-width: 40px;
}
.text-danger {
  color: #f56c6c;
}
.el-button--info {
  color: #fff;
  background-color: #315563;
  border-color: #315563;
  font-size: 16px;
}
.el-button--info:focus,
.el-button--info:hover {
  background: #426d7d;
  border-color: #426d7d;
  color: #fff;
}
.el-button--info.is-active,
.el-button--info:active {
  background: #426d7d;
  border-color: #426d7d;
  color: #fff;
}
</style>
