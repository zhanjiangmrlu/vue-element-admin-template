<template>
  <div class="sidebar sidebar-container">
    <el-aside width="200">
      <el-menu
        :collapse="isCollapse"
        :default-active="activeMenu"
        :text-color="variables.menuText"
        :background-color="variables.menuBg"
        :active-text-color="variables.menuActiveText"
      >
        <div v-for="item in routes" :key="item.path">
          <el-menu-item
            v-if="item.children.length === 1 && !item.hidden"
            :index="resolvePath(item)"
            @click="skipPage(item.children[0])"
          >
            <i :class="`el-icon-${item.children[0].meta.icon}`" />
            <span slot="title">{{ item.children[0].meta.title }}</span>
          </el-menu-item>
          <el-submenu :index="item.path" v-else>
            <template slot="title"
              ><i :class="`el-icon-${item.meta.icon}`" />{{
                item.meta.title
              }}</template
            >
            <el-menu-item
              v-for="submenu in handleSubmenuShow(item.children)"
              :key="submenu.path"
              :index="submenu.path"
              @click="skipPage(submenu, item)"
              >{{ submenu.meta.title }}</el-menu-item
            >
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/index";
import variables from "@/styles/variables.scss";

export default {
  name: "Sidebar",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.isCollapse, // 是否水平折叠收起菜单
    }),
    // 路由
    routes() {
      return this.$router.options.routes.filter(
        (item) => item.name !== "Login"
      );
    },
    // 全局主题颜色
    variables() {
      return variables;
    },
    // 当前点击菜单
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      // 当前菜单中子菜单隐藏时, 菜单激活显示
      if (meta.fatherPath) {
        return meta.fatherPath;
      }
      return path;
    },
  },
  methods: {
    // 跳转页面
    skipPage(submenu) {
      const { meta, name } = submenu;
      const { state } = store;
      const curName = this.$route.name;
      if (name === curName) return;

      this.$router.push({ name });
      state.curClickMenu = meta.title;
    },
    // 处理单个菜单点击路径
    resolvePath(routePath) {
      if (routePath?.children[0].path) {
        return `${routePath.path}/${routePath.children[0].path}`;
      }
      return routePath.path;
    },
    // 处理children中不隐藏菜单
    handleSubmenuShow(arr) {
      return arr.filter((item) => !item.hidden);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-container {
  height: 100%;
  overflow-x: hidden;
}
</style>
