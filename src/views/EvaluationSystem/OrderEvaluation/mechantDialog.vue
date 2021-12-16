<template>
  <!-- 选择商家弹窗 -->

  <el-dialog
    title="选择商家"
    :lock-scroll="true"
    :visible.sync="isVisible"
    @close="closeDialog"
  >
    <div class="popSearch">
      <span>搜索</span>
      <el-input
        style="width: 180px"
        placeholder="请输入商家名称"
        v-model="merchantName"
        class="input-with-select"
      />
      <el-button type="primary" @click="inquire">查询</el-button>
    </div>
    <el-scrollbar class="scrollbar">
      <el-table
        border
        :data="merchantList"
        :header-cell-style="{ background: '#f5f7fa', textAlign: 'center' }"
      >
        <el-table-column width="200">
          <template slot-scope="scope">
            <el-radio-group v-model="radio" @change.native="getId(scope.row)">
              <el-radio :label="scope.row.supplierAccountNumberId"
                >选择</el-radio
              >
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="supplierName" label="商家名称" />
      </el-table>
    </el-scrollbar>
    <div class="pagination">
      <el-pagination
        background
        style="margin-top: 20px"
        align="right"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="btn">
      <el-button type="primary" @click="closeDialog">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import merchantPopList from "@/json/merchantPopList.json";
export default {
  name: "mechantDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      radio: "1", //单选
      merchantList: [], //商家列表,
      merchantName: "", //商家名称
      isVisible: false,
      currentPage: 1, //当前页码
      getName: "", //获取到当前行的名称
    };
  },
  watch: {
    visible() {
      this.isVisible = this.visible;
    },
  },

  created() {
    this.merchantList = merchantPopList.resultData.supplierAccountNumberList;
  },
  methods: {
    //当前点击页码
    handleCurrentChange(value) {
      this.currentPage = value;
      console.log("点击页码");
    },

    //手动填写页码
    handleSizeChange(value) {
      this.currentPage = value;
    },

    //弹窗的搜索查询按钮
    inquire() {
      const params = this.merchantName;
      console.log(params);
    },

    // 关闭弹窗
    closeDialog() {
      this.$emit("closePop");
    },

    getId(value) {
      this.getName = value.supplierName;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog {
  height: 700px;
}

.scrollbar {
  height: 450px;
}

.btn {
  width: 100%;
  text-align: right;
  margin-top: 20px;
}

.popSearch {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .el-input {
    margin: 0 10px;
  }
}

.el-pagination {
  text-align: center;
}

.el-table .cell,
.el-table--border .el-table__cell:first-child .cell {
  text-align: center;
}
</style>
