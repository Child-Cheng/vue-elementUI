export default {
  name: "navMenu",
  methods: {
    clickMenu(index, indexPath, text) {
      let componentName = index.$options.propsData.route;
      this.$store.commit("changeTab", { name: text, componentName });
    }
  },
  data() {
    return {
      openedTab: []
    };
  }
};
