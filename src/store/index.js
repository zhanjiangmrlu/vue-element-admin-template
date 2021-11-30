import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false, // 菜单栏收缩
    curClickMenu: "", // 当前点击菜单
  },
  mutations: {},
  actions: {},
  modules: {},
});
