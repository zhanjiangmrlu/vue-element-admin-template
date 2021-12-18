<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item
      v-for="item in levelList"
      :key="item.path"
      @click="handleLink(item)"
      >{{ item.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  computed: {
    levelList() {
      const matched = this.$route.matched.filter((item) => item.meta?.title);

      return matched.filter(
        (item) => item.meta?.title && item.meta?.breadcrumb !== false
      );
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
