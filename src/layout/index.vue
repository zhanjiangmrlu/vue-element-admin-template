<template>
  <el-container class="layout">
    <Sidebar />

    <el-container>
      <el-header class="el-header">
        <Header />
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "./components/Sidebar/index";
import Header from "./components/Header/index";

export default {
  name: "Layout",
  components: { Sidebar, Header },
  data() {
    return {};
  },
  methods: {
    second(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  font-size: 12px;
  // box-shadow: 0 1px 4px rgb(0 21 41 8%);
}
</style>
