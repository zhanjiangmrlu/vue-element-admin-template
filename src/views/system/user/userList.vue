<template>
  <div>
    <div class="head">
      <el-button type="primary" size="mini">新建用户</el-button>
      <div class="search">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        <el-button type="primary" size="mini">搜索</el-button>
      </div>
    </div>

    <el-table
      :data="
        userList.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="账号" prop="user_name"> </el-table-column>
      <el-table-column label="用户名" prop="display_name"> </el-table-column>
      <el-table-column label="角色" prop="role"> </el-table-column>
      <el-table-column label="邮箱" prop="email"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Paging />
  </div>
</template>

<script>
import Paging from "../../../components/paging/index.vue";
import { getUserList } from "../../../api/user";
export default {
  name: "User",
  components: {
    Paging,
  },

  data() {
    return {
      userList: [],
      search: "",
    };
  },

  created() {
    this.getUserList();
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    async getUserList() {
      const getName = localStorage.getItem("name") || "";
      const params = {
        page: 1,
        pageSize: 10,
        display_name: getName,
      };
      const { data = {} } = await getUserList(params);
      this.userList = data.data.data;
      console.log(this.userList, "reqList");
    },
  },
};
</script>
<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: space-between;

  .search {
    display: flex;

    .el-button--mini,
    .el-button--mini.is-round {
      padding: 5px 11px;
    }

    .el-button--mini,
    .el-button--small {
      font-size: 12px;
      border-top-left-radius: 0;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 0;
    }
    ::v-deep .el-input--mini .el-input__inner {
      border-radius: 0;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
  }
}
</style>
