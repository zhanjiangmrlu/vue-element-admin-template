<template>
  <div class="header">
    <div class="header__title">
      <!-- <i class="el-icon-s-fold collapse" @click="handleCollapse" /> -->
      {{ activeMenuName }}
    </div>
    <div>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/index";

export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      curClickMenu: (state) =>
        state.curClickMenu ? state.curClickMenu : "选项1",
    }),
    // 当前菜单名称
    activeMenuName() {
      return this.$route.meta.title;
    },
  },
  methods: {
    handleCollapse() {
      store.state.isCollapse = !store.state.isCollapse;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;

  &__title {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;

    .collapse {
      font-size: 22px;
      cursor: pointer;
      margin-right: 20px;
    }
  }
}
</style>
