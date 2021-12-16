<template>
  <!-- 选择商家弹窗 -->
  <el-dialog
    title="选择商家"
    :lock-scroll="true"
    :visible.sync="isVisible"
    @close="closePop"
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
    <el-table
      :data="merchantList"
      border
      style="width: 100%"
      :header-cell-style="{ background: '#f5f7fa', textAlign: 'center' }"
    >
      <el-table-column width="200">
        <el-radio-group v-model="radio">
          <el-radio lable="选择" />
        </el-radio-group>
      </el-table-column>
      <el-table-column prop="supplierName" label="商家名称" width="518">
      </el-table-column>
    </el-table>
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
      <el-button type="primary" @click="closePop">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
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
      radio: "选择", //单选
      merchantList: [], //商家列表,
      currentPage: 1, //当前页码
      merchantName: "", //商家名称
      isVisible: false,
    };
  },
  watch: {
    visible() {
      this.isVisible = this.visible;
    },
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
    closePop() {
      this.$emit("closePop");
    },
  },
};
</script>

<style></style>
