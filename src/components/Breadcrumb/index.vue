<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          class="no-redirect"
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          >{{ item.meta.title }}</span
        >
        <a v-else @click="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from "path-to-regexp";

export default {
  name: "Breadcrumb",
  data() {
    return {
      levelList: null,
    };
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    // 获取面包屑
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.meta?.title);
      const first = matched[0];

      if (!this.isDashboard(first)) {
        matched = [{ path: "/workbench", meta: { title: "Workbench" } }].concat(
          matched
        );
      }

      this.levelList = matched.filter(
        (item) => item.meta?.title && item.meta?.breadcrumb !== false
      );
      console.log("this.levelList", this.levelList);
    },

    // 是否显示第一个菜单
    isDashboard(route) {
      const name = route?.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Workbench".toLocaleLowerCase()
      );
    },

    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      console.log("pathToRegexp", pathToRegexp);
      const toPath = pathToRegexp.compile(path);
      return toPath(params);
    },

    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
