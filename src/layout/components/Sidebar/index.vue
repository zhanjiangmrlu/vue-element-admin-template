<template>
  <div class="sidebar">
    <el-aside width="200" style="background-color: rgb(48, 65, 86)">
      <el-menu
        :default-openeds="['1', '3']"
        style="background-color: rgb(48, 65, 86)"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>导航一</template
          >
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="second('Home', '选项1')"
              >选项1</el-menu-item
            >
            <el-menu-item index="1-2" @click="second('About', '选项2')"
              >选项2</el-menu-item
            >
            <el-menu-item index="1-3" @click="second('Order', '选项3')"
              >选项3</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>导航二</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-setting"></i>导航三</template
          >
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/index";

export default {
  name: "Sidebar",
  data() {
    return {
      // isCollapse: false,
    };
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.isCollapse,
    }),
    routes() {
      return this.$router.options.routes;
    },
  },
  created() {
    console.log("routes", this.routes);
  },
  methods: {
    second(name, title) {
      const { state } = store;
      const { path } = this.$route;
      if (name === path) return;

      this.$router.push({ name });
      state.curClickMenu = title;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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

/deep/ {
  .el-container {
    height: 100%;
  }

  .el-aside {
    height: 100%;
    overflow-x: hidden;
    color: rgb(191, 203, 217);
  }

  .el-menu {
    width: 200px;
  }

  .el-submenu .el-menu {
    border: none;
    background: #304156;
    color: rgb(191, 203, 217);
  }

  .el-menu-item-group__title {
    padding-left: 0;
  }

  .el-menu-item,
  .el-submenu__title,
  .el-menu-item-group__title {
    color: rgb(191, 203, 217);
  }

  .el-submenu__title:hover {
    background-color: #263445;
  }

  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: #001528;
  }

  .el-menu-item.is-active {
    color: #409eff;
  }
}

.el-container {
  height: 100%;
  overflow-x: hidden;
}
</style>

<style>
.el-menu--popup-right-start {
  margin-left: 5px;
  margin-right: 5px;
  background: #304156;
}
</style>
