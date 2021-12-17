<template>
  <div class="orderEvaluation common">
    <el-form :inline="true" :model="form">
      <el-form-item label="订单编号">
        <el-input v-model="form.order" placeholder="请选择订单编号"></el-input>
      </el-form-item>
      <el-form-item label="评价类型">
        <el-select v-model="form.evaluationStyle" placeholder="请选择评价类型">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="人工评价" value="人工评价"></el-option>
          <el-option label="默认好评" value="默认好评"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商家">
        <el-input
          v-model="currentName"
          placeholder="请选择评价商家"
          @focus="clickMechant"
        >
          <el-button slot="append" icon="el-icon-more" @click="clickMechant" />
        </el-input>
      </el-form-item>
      <br />
      <el-form-item label="下单时间">
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="请输入开始时间"
        >
        </el-date-picker>
        <i>-</i>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="请输入结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="提交时间">
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="请输入开始时间"
        >
        </el-date-picker>
        <i>-</i>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="请输入结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格部分 -->
    <el-table
      :data="tableData"
      border
      :header-cell-style="{ background: '#F3F4F7', textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
    >
      <el-table-column prop="orderSn" label="订单编号" width="180" />
      <el-table-column prop="supplierName" label="商家名称" />
      <el-table-column prop="logisticsService" label="物流服务得分" />
      <el-table-column prop="customerService" label="客服服务得分" />
      <el-table-column prop="evaluationStype" label="评价类型" />
      <el-table-column prop="addTime" label="下单时间" />
      <el-table-column prop="orderTime" label="评价提交时间" />
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        style="margin-top: 20px"
        align="center"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <MechantDialog
      :visible="visible"
      :type="2"
      @closePop="colse"
      @getName="getRowName"
    />
  </div>
</template>

<script>
import orderEvaluation from "@/json/orderEvaluation.json";
import MechantDialog from "../components/mechantDialog.vue";
export default {
  name: "OrderEvaluation",
  components: {
    MechantDialog,
  },

  data() {
    return {
      form: {
        order: "", //订单编号
        evaluationStyle: "", //评价类型
      }, //绑定表单
      startTime: "", //开始时间
      endTime: "", //结束时间
      tableData: [], //评价列表
      visible: false, //商家弹窗
      currentPage: 1, //当前页码
      currentName: "", //当前行的名称
    };
  },

  created() {
    this.tableData = orderEvaluation.resultData.records;
    this.tableData = this.tableData.map((item) => {
      const getOrderTime = item.orderTime;
      return {
        ...item,
        orderTime: this.dayjs(getOrderTime).format("YYYY-MM-DD HH:mm:ss"),
      };
    });
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

    //点击商家弹窗
    clickMechant() {
      this.visible = true; //共用这一个事件,点击商家弹窗之后,值为true,点击关闭按钮之后
    },

    //关闭弹窗
    colse() {
      this.visible = false;
    },

    //获取当前行的名称
    getRowName(data) {
      this.currentName = data;
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped>
.orderEvaluation {
  .el-input {
    width: 185.6px;
  }

  .el-select > .el-input {
    width: 130px;
  }
}
</style>
