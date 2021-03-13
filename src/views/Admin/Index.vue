<template>
  <section class="content">
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <createTable
            :tableData="tableData"
            :tableHeader="tableDataHeader"
            :tableAttributes="{
              stripe: true,
              border: true
            }"
            :operationCallback="sdf"
            :isPage="true"
            :pageAttributes="{
              layout: 'prev, pager, next',
              total: 1000,
              background: true
            }"
            :customColumnCallback="callback"
          >
          </createTable></div
      ></el-col>
    </el-row>
  </section>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tempHtml: `<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>`
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          tempHtml: `<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>`
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          tempHtml: `<button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</button>`
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          tempHtml: `<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>`
        }
      ],
      tableDataHeader: null
    };
  },
  created: function() {
    this.tableDataHeader = [
      {
        lable: "站點",
        prop: "name",
        width: "80",
        type: "component",
        tableColumnAttributes: {}
      },
      { lable: "站點編碼", prop: "date", type: "normal" },
      { lable: "綁定線路", prop: "address", type: "normal" },
      { lable: "站牌種類", prop: "1", type: "normal" },
      { lable: "佈局模式", prop: "1", type: "normal" },
      { lable: "重啟時間", prop: "1", type: "normal" },
      { lable: "同步時間", prop: "1", type: "normal" },
      { lable: "節目下載", prop: "1", type: "normal" },
      { lable: "截屏", prop: "1", type: "normal" },
      { lable: "刷新頻率", prop: "1", type: "normal" },
      { lable: "黑夜模式", prop: "1", type: "normal" },
      { lable: "狀態", prop: "1", type: "normal" },
      {
        lable: "詳情",
        prop: "1",
        type: "operation",
        tag: [
          {
            name: "删除",
            tagType: "el-button",
            attributes: {
              size: "mini",
              type: "danger"
            }
          }
        ]
      }
    ];
  },
  methods: {
    sdf(event, props) {
      console.log(event, props);
    },
    callback(createElement, props, name) {
      console.log(createElement, props, name);
      return [
        createElement(
          "i",
          {
            class: ["el-icon-user-solid"]
          },
          props.row[name]
        )
      ];
    }
  },
  components: {
    createTable: resolve =>
      require(["../../components/table/createTable.js"], resolve)
  }
};
</script>
<style scoped>
.content {
  box-sizing: border-box;
  padding: 15px;
}
</style>
