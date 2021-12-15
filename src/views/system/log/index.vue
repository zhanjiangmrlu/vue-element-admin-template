<template>
  <div class="common">
    <div class="head">
      <el-button type="primary">清空日志</el-button>
      <el-button>导出日志</el-button>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户:">
        <el-input
          v-model="formInline.user"
          placeholder="请输入账号或用户名称"
        />
      </el-form-item>
      <el-form-item label="登录IP:">
        <el-input v-model="formInline.ip" placeholder="请输入完整IP" />
      </el-form-item>
      <el-form-item label="操作时间:">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="设备:">
        <el-input v-model="formInline.name" placeholder="请输入设备名称" />
      </el-form-item>

      <el-form-item label="操作分组:">
        <el-radio
          v-for="(item, index) in groupList"
          :key="item"
          v-model="groupRadio"
          :label="index"
          border
          @change="() => (groupRadio = index)"
          >{{ item }}</el-radio
        >
      </el-form-item>

      <!-- 处理复选框 -->
      <div class="operate-type">
        <el-form-item
          label="操作类型:"
          v-if="groupRadio === 0 || (groupRadio > 0 && groupRadio < 5)"
        >
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              v-for="item in handleType[groupRadio]"
              :key="item"
              :label="item"
              >{{ item }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="reset">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div class="formtable">
      <el-table :data="tableData" :header-cell-style="rowClass">
        <el-table-column prop="user_id" label="账号" width="180">
        </el-table-column>
        <el-table-column prop="user_name" label="用户名称" width="180">
        </el-table-column>
        <el-table-column prop="login_ip" label="登录IP"> </el-table-column>
        <el-table-column prop="create_time" label="操作时间"> </el-table-column>
        <el-table-column prop="log_type_name" label="操作类型">
        </el-table-column>
        <el-table-column prop="action" label="操作行为"> </el-table-column>
        <el-table-column prop="operation" label="操作" align="right">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        background
        :total="20"
        align="right"
        :page-size="100"
        :page-sizes="[3, 5]"
        :current-page="currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getLogData } from "../../../api/log";

export default {
  name: "Log",
  data() {
    return {
      //表单绑定值
      formInline: {
        user: "",
        name: "",
        ip: "",
      },
      // 操作单选框
      groupRadio: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "", //开始和结束日期
      value2: "",
      tableData: [], //列表数据
      currentPage: 1, //当前页
      checkList: [], //复选框列表
      groupList: ["登录/退出", "处置操作", "设备操作", "系统管理"],
      //操作类型复选框选项
      handleType: {
        0: ["登录系统", "退出系统"],
        1: [
          "创建处置",
          "删除处置",
          "执行封堵",
          "解除封堵",
          "执行调度",
          "新建处置白名单",
          "更新处置白名单",
          "删除处置白名单",
          "新建联动策略",
          "修改联动策略",
          "删除联动策略",
        ],
        2: [
          "新建处置设备",
          "修改处置设备",
          "删除处置设备",
          "新建告警设备",
          "修改告警设备",
          "删除告警设备",
          "操作处置设备",
        ],
        3: [
          "新建用户",
          "修改用户",
          "删除用户",
          "新建角色",
          "删除角色",
          "修改角色",
          "修改安全设置",
          "新建访问白名单",
          "删除访问白名单",
          "修改存储设置",
          "导出配置数据",
          "导入配置数据",
          "新建报表",
          "删除报表",
          "下载报表",
          "备份日志",
          "删除日志",
          "清空日志",
          "新建攻击态势日报",
          "删除攻击态势日报",
        ],
      },
    };
  },

  created() {
    this.getLogList(1);
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },

    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //移除操作
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },

    //点击分页改变当前页 传递的值是当前点击的分页页码
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(val, "val");
      this.getLogList(val);
    },

    //每页显示条数
    handleSizeChange(val) {
      this.getLogList(val);
      console.log(`每页 ${val} 条`);
    },

    //列表数据请求
    async getLogList(num) {
      const params = {
        page: num,
        page_size: "10",
        user_name: localStorage.getItem("name") || "",
      };
      const { data = {} } = await getLogData(params);
      this.tableData = data.data.data;
      // console.log(this.tableData, 'list')
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
.head {
  text-align: right;
}

.reset {
  margin-top: 20px;
  text-align: center;
}

.formtable .el-table {
  width: 100%;
}

.el-range-editor--mini.el-input__inner {
  width: 185.6px;
}

::v-deep .el-input--mini .el-input__inner {
  margin-left: 27px;
  // margin-right: 10px;
}

::v-deep .el-form--inline .el-form-item {
  margin-right: 55px;
}

.el-form--inline .el-form-item__label {
  margin-left: 15px;
}

.el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: -20px;
}

.el-button:active {
  border-color: none;
}

.block {
  ::v-deep .el-input--mini .el-input__inner {
    margin-left: 0;
  }
}

::v-deep .el-icon-date:before {
  content: "";
}

.operate-type .el-form-item {
  display: flex;
  .el-checkbox-group {
    margin-left: 10px;
  }
}
::v-deep .el-form-item__label {
  text-align: left;
}
</style>
