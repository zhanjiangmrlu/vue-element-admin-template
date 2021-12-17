<template>
  <el-scrollbar style="height: 100%">
    <el-container class="layout">
      <Sidebar />
      <el-container class="container">
        <el-header class="el-header">
          <Navbar />
        </el-header>
        <el-main>
          <div class="main">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-scrollbar>
</template>

<script>
import Sidebar from "./components/Sidebar/index";
import Navbar from "./components/Navbar/index";

export default {
  name: "Layout",
  components: { Sidebar, Navbar },
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
  color: #333;
  line-height: 60px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 1px 8px #ccc;
}

.container {
  padding-left: 210px;
}

::v-deep .el-main,
::v-deep .el-scrollbar__view {
  height: 100%;
}

::v-deep .el-main {
  background: #f0f2f5;
}

.main {
  background: #fff;
  height: 100%;
}
</style>
