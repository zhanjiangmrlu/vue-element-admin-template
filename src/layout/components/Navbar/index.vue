<template>
  <div class="navbar">
    <div class="navbar__title">
      <!-- <i class="el-icon-s-fold collapse" @click="handleCollapse" /> -->
      <span>{{ activeMenuName }}</span>
      <!-- <Breadcrumb /> -->
    </div>

    <Logout />
  </div>
</template>

<script>
import store from "@/store/index";
import Logout from "@/components/Logout";
// import Breadcrumb from "@/components/Breadcrumb/index";

export default {
  name: "Navbar",
  components: { Logout },
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

    span {
      margin-right: 20px;
    }
  }
}
</style>
