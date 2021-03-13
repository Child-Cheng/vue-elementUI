/**
 * 动态创建 table
 * @module my-table
 * @example
 * @author child
 * @date 2020-10-15 11:19:24
 * // 使用说明
 */
export default {
  name: "createTable",
  /**
   * 属性参数
   * @property {Array} [tableData = []] data table表格数据
   * @property {Array} [tableHeader = []] data table头部内容
   * @property {Object} [defaultName = { lable: "lable",prop: "prop",icon: "icon", width: "width",type: "type",tag: "tag",tableColumnAttributes: "tableColumnAttributes" }] defaultName 指引查找参数 icon用于表示该列是显示图片目前功能求实现
   * @property {Function} cellClick 	当某个单元格被点击时会触发该事件	row, column, cell, event
   * @property {Function} select 当用户手动勾选数据行的 Checkbox 时触发的事件	selection, row
   * @property {Function} selectAll 当用户手动勾选全选 Checkbox 时触发的事件	selection
   * @property {Function} selectionChange 当选择项发生变化时会触发该事件	selection
   * @property {Function} cellMouseEnter 当单元格 hover 进入时会触发该事件	row, column, cell, event
   * @property {Function} cellMouseLeave 当单元格 hover 退出时会触发该事件	row, column, cell, event
   * @property {Function} celldblClick 	当某个单元格被双击击时会触发该事件	row, column, cell, event
   * @property {Function} rowClick 当某一行被点击时会触发该事件	row, column, event
   * @property {Function} rowContextMenu 当某一行被鼠标右键点击时会触发该事件	row, column, event
   * @property {Function} rowdblClick 当某一行被双击时会触发该事件	row, column, event
   * @property {Function} headerClick 当某一列的表头被点击时会触发该事件	column, event
   * @property {Function} headerContextMenu 当某一列的表头被鼠标右键点击时触发该事件	column, event
   * @property {Object} tableAttributes（Table Attributes） 参考 https://element.eleme.cn/#/zh-CN/component/table  (max-height 这种要写成maxHeight)
   * @property {Function} operationCallback 操作项回调 event, props
   * @property {Boolean} isPage 是否显示分页插件默认为false;当isPage 为true 时需要为pageAttributes配置参数
   * @property {Object} pageAttributes 对应element 分页的 Attributes参数中线间隔，要去中线并把中线连接首字母大写；如：current-page写成 currentPage
   * @property {Function} sizeChange pageSize 改变时会触发
   * @property {Function} currentChange currentPage 改变时会触发
   * @property {Function} prevClick 用户点击上一页按钮改变当前页后触发
   * @property {Function} nextClick 用户点击下一页按钮改变当前页后触发
   * @property {Function} customColumnCallback 自定义table 列的内容(当tableHeader里面的type=="component"时才会有用) 返回 createElement, props, name三个值；createElement()是vue 里面的渲染函数，props 返回的是当前行的所有内容,name 是当前行绑定的显示属性主要用标识，从而实现不同的列使不同的定义
   */
  props: {
    // 数据字段名称映射
    defaultName: {
      type: Object,
      default() {
        return {
          lable: "lable",
          prop: "prop",
          icon: "icon",
          width: "width",
          type: "type",
          tag: "tag",
          tableColumnAttributes: "tableColumnAttributes"
        };
      }
    },
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    tableHeader: {
      type: Array,
      default() {
        return [];
      }
    },
    cellClick: {
      type: Function,
      default: res => {
        return res;
      }
    },
    select: {
      type: Function,
      default: res => {
        return res;
      }
    },
    selectAll: {
      type: Function,
      default: res => {
        return res;
      }
    },
    selectionChange: {
      type: Function,
      default: res => {
        return res;
      }
    },
    cellMouseEnter: {
      type: Function,
      default: res => {
        return res;
      }
    },
    cellMouseLeave: {
      type: Function,
      default: res => {
        return res;
      }
    },
    celldblClick: {
      type: Function,
      default: res => {
        return res;
      }
    },
    rowClick: {
      type: Function,
      default: res => {
        return res;
      }
    },
    rowContextMenu: {
      type: Function,
      default: res => {
        return res;
      }
    },
    rowdblClick: {
      type: Function,
      default: res => {
        return res;
      }
    },
    headerClick: {
      type: Function,
      default: res => {
        return res;
      }
    },
    headerContextMenu: {
      type: Function,
      default: res => {
        return res;
      }
    },
    tableAttributes: {
      type: Object,
      default() {
        return {
          stripe: false,
          border: false
        };
      }
    },
    operationCallback: {
      type: Function,
      default: res => {
        return res;
      }
    },
    isPage: {
      type: Boolean,
      default() {
        return false;
      }
    },
    pageAttributes: {
      type: Object,
      default() {
        return {};
      }
    },
    sizeChange: {
      type: Function,
      default: res => {
        return res;
      }
    },
    currentChange: {
      type: Function,
      default: res => {
        return res;
      }
    },
    prevClick: {
      type: Function,
      default: res => {
        return res;
      }
    },
    nextClick: {
      type: Function,
      default: res => {
        return res;
      }
    },
    emptyText: {
      type: String,
      default() {
        return "";
      }
    },
    customColumnCallback: {
      type: Function,
      default: (createElement, props, name) => {
        return props.row[name];
      }
    },
    customClass: String
  },
  methods: {
    grouping(array) {
      let groups = {
        default: []
      };
      let props = this.defaultName;
      array.forEach(n => {
        let key = n[props.group];
        if (key) {
          groups[key] = groups[key] || [];
          groups[key].push(n);
        } else {
          groups["default"].push(n);
        }
      });
      return groups;
    },
    createTableColumn(h, item) {
      let props = this.defaultName;
      return h("el-table-column", {
        props: {
          ...item[props.tableColumnAttributes],
          prop: item[props.prop],
          label: item[props.lable],
          width: item[props.width]
        }
      });
    },
    createTableColumnSelect(h, item) {
      let props = this.defaultName;
      return h("el-table-column", {
        props: {
          ...item[props.tableColumnAttributes],
          width: item[props.width],
          type: "selection"
        }
      });
    },
    createTableColumnOperation(h, item) {
      let props = this.defaultName;
      let tagItem = item[props.tag];
      let _this = this;
      return h("el-table-column", {
        props: {
          ...item[props.tableColumnAttributes],
          prop: item[props.prop],
          label: item[props.lable],
          width: item[props.width]
        },
        scopedSlots: {
          default: function(props) {
            let nodes = [];
            tagItem.forEach(items => {
              nodes.push(
                h(
                  items.tagType,
                  {
                    props: {
                      ...items.attributes
                    },
                    // on: {
                    //   click: event => {
                    //     debugger;
                    //     event.stopPropagation();
                    //     _this.operationCallback(event, props, items.name);
                    //   }
                    // }
                    nativeOn: {
                      click: event => {
                        event.stopImmediatePropagation();
                        _this.operationCallback(event, props, items.name);
                      }
                    }
                  },
                  items.name
                )
              );
            });
            return nodes;
          }
        }
      });
    },
    createTableCustomColumnContent(h, item) {
      let props = this.defaultName;
      let _this = this;
      let columnName = item[props.prop];
      return h("el-table-column", {
        props: {
          ...item[props.tableColumnAttributes],
          prop: item[props.prop],
          label: item[props.lable],
          width: item[props.width]
        },
        scopedSlots: {
          default: function(prop) {
            return _this.customColumnCallback(h, prop, columnName);
          }
        }
      });
    },
    createNodes(h, array) {
      let nodes = [],
        groups = this.grouping(array);
      let props = this.defaultName;
      for (let key in groups) {
        let items = groups[key] || [];
        items.forEach(item => {
          //nodes.push(this.createTableComponent(h, item));
          if (item[props.type].toLowerCase() === "normal") {
            //创建数据列
            nodes.push(this.createTableColumn(h, item));
          } else if (item[props.type].toLowerCase() === "select") {
            //创建选择列
            nodes.push(this.createTableColumnSelect(h, item));
          } else if (item[props.type].toLowerCase() === "operation") {
            if (item[props.tag].length > 0 && item[props.tag] != undefined) {
              //创建操作列
              nodes.push(this.createTableColumnOperation(h, item));
            }
          } else if (item[props.type].toLowerCase() === "component") {
            nodes.push(this.createTableCustomColumnContent(h, item));
          }
        });
      }
      return nodes;
    }
  },
  render(h) {
    let table = h(
      "el-table",
      {
        props: {
          ...this.tableAttributes,
          data: this.tableData
        },
        nativeOn: {},
        class:
          this.customClass == undefined ? "custom-table" : this.customClass,
        on: {
          select: (selection, row) => {
            this.select(selection, row);
          },
          "select-all": selection => {
            this.selectAll(selection);
          },
          "selection-change": selection => {
            this.selectionChange(selection);
          },
          "cell-mouse-enter": (row, column, cell, event) => {
            this.cellMouseEnter(row, column, cell, event);
          },
          "cell-mouse-leave": (row, column, cell, event) => {
            this.cellMouseLeave(row, column, cell, event);
          },
          "cell-click": (row, column, cell, event) => {
            this.cellClick(row, column, cell, event);
          },
          "cell-dblclick": (row, column, cell, event) => {
            this.celldblClick(row, column, cell, event);
          },
          "row-click": (row, column, event) => {
            this.rowClick(row, column, event);
          },
          "row-contextmenu": (row, column, event) => {
            this.rowContextMenu(row, column, event);
          },
          "row-dblclick": (row, column, event) => {
            this.rowdblClick(row, column, event);
          },
          "header-click": (column, event) => {
            this.headerClick(column, event);
          },
          "header-contextmenu": (column, event) => {
            this.headerContextMenu(column, event);
          }
          // "sort-change": (selection, row) => {
          //   console.log(selection, row);
          // },
          // "filter-change": (selection, row) => {
          //   console.log(selection, row);
          // },
          // select: (selection, row) => {
          //   console.log(selection, row);
          // }
        },
        ref: "table"
      },
      this.createNodes(h, this.tableHeader)
    );
    if (this.isPage) {
      let _this = this;
      let page = h(
        "div",
        {
          class: ["page-div", "block"]
        },
        [
          h("el-pagination", {
            // 组件 prop
            props: {
              ...this.pageAttributes
            },
            on: {
              "size-change": function(param) {
                _this.sizeChange(param);
              },
              "current-change": function(param) {
                _this.currentChange(param);
              },
              "prev-click": function(param) {
                _this.prevClick(param);
              },
              "next-click": function(param) {
                _this.nextClick(param);
              }
            }
          })
        ]
      );
      return h("div", {}, [table, page]);
    }
    return h("div", {}, [table]);
  }
};
/**render(createElement){ return createElement('标签名'，'执行的操作'，'展示的内容') } */
