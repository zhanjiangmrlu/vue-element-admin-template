<template>
  <div class="newUser">
    <div class="head">
      <el-button type="primary" @click="showAdd">新建用户</el-button>
      <div class="search">
        <el-input
          placeholder="请输入用户名"
          v-model="search"
          class="input-with-select"
        />
        <el-button type="primary" @click="getUserList">搜索</el-button>
      </div>
    </div>
    <el-table :data="userList" :header-cell-style="rowClass">
      <el-table-column label="账号" prop="user_name" />
      <el-table-column label="用户名" prop="display_name" />
      <el-table-column label="角色" prop="role" />
      <el-table-column label="邮箱" prop="email" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-divider direction="vertical" />
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="这是一段内容确定删除吗？"
          >
            <el-button
              slot="reference"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <AddUser v-if="showAdduser" @close="close" />
    <EditorUser v-if="showEditor" :userMsg="ruleForm" @close="closeEditor" />
  </div>
</template>

<script>
import { getUserList, delUserMsg } from "../../../api/user";
import AddUser from "./addUser";
import EditorUser from "./editorUser";
export default {
  name: "User",
  components: {
    AddUser,
    EditorUser,
  },

  data() {
    return {
      userList: [],
      search: "",
      showAdduser: false,
      showEditor: false,
      showDel: false,
      ruleForm: {
        pass: "",
        role: "",
        name: "",
        email: "",
      },
      total: 0, //总条数
      currentPage: 1, //当前页
    };
  },

  created() {
    this.getUserList(this.currentPage);
  },

  methods: {
    //编辑用户信息
    handleEdit(index, row) {
      console.log(index, row);
      this.showEditor = true;
      this.ruleForm.name = row.user_name;
      this.ruleForm.pass = row.is_admin;
      this.ruleForm.role = row.role;
      this.ruleForm.email = row.email;
    },

    //删除用户信息
    handleDelete(index, row) {
      console.log(index, row);
      this.showDel = true;
      const getId = row.role_id;
      delUserMsg(getId)
        .then((res) => {
          console.log(res, "res");
          this.getUserList();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //请求列表信息
    async getUserList(page) {
      const getName = localStorage.getItem("name") || "";
      const params = {
        page: page,
        pageSize: 10,
        display_name: getName,
      };
      const { data = {} } = await getUserList(params);
      this.total = data.data.count;
      // console.log(this.total);
      this.userList = data.data.data;
      // console.log(data, "reqList");
    },

    //显示新建用户弹窗
    showAdd() {
      this.showAdduser = true;
    },

    //关闭新建用户弹窗
    close() {
      this.showAdduser = false;
    },

    //关闭编辑用户弹窗
    closeEditor() {
      this.showEditor = false;
    },

    //点击分页改变当前页 传递的值是当前点击的分页页码
    handleCurrentChange(val) {
      // this.page = val;
      this.currentPage = val;
      // console.log(val, "val");
      this.getUserList(val);
    },

    //每页显示条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    //设置表头样式
    rowClass({ row, rowIndex }) {
      console.log(row, rowIndex); //表头行下标
      return "background:#fafafa";
    },
  },
};
</script>
<style lang="scss" scoped>
.newUser {
  background: #fff;
  padding: 20px;
}

.head {
  display: flex;
  justify-content: space-between;
  height: 100%;

  .search {
    display: flex;

    .el-button--mini,
    .el-button--mini.is-round {
      padding: 5px 11px;
    }

    .el-select .el-input {
      width: 130px;
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

.block {
  margin-top: 20px;
  text-align: right;
}

::v-deep .el-table--border::after,
.el-table--group::after,
.el-table::before {
  z-index: -9999;
}
</style>
