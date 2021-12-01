<template>
  <div class="navbar">
    <div class="navbar__title">
      <!-- <i class="el-icon-s-fold collapse" @click="handleCollapse" /> -->
      {{ activeMenuName }}
    </div>
    <el-dropdown class="navbar__dropdown" @command="handleCommand">
      <el-image
        class="image"
        src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
      />
      <i class="el-icon-caret-bottom" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import store from "@/store/index";

export default {
  name: "Navbar",
  data() {
    return {};
  },
  computed: {
    // 当前菜单名称
    activeMenuName() {
      return this.$route.meta.title;
    },
  },
  methods: {
    handleCollapse() {
      store.state.isCollapse = !store.state.isCollapse;
    },
    handleCommand(command) {
      // 退出登录
      if (command === "logOut") {
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
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

  &__dropdown {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    .image {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      margin-right: 10px;
    }
  }
}
</style>
