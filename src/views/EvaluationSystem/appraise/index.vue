<template>
  <!-- 售后评价 -->
  <div class="appraise">
    <div class="appraise-body">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="售后单号">
          <el-input
            v-model="formInline.saleNum"
            placeholder="请输入售后单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input
            v-model="formInline.orderNum"
            placeholder="请输入关联订单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="商家名称">
          <el-input
            v-model="formInline.name"
            placeholder="请选择商家"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import appraiseJson from '@/json/appraise.json'

export default {
  name: "Appraise",
  data() {
    return {
      formInline: {
        saleNum: "", //售后单号
        name: "", //商家名称
        orderNum: "", //订单号
      },
    };
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss" scoped>
.appraise {
  height: 100%;
  background: #ccc;
  .appraise-body {
    margin: 20px;
    background: #ffff;
  }
}
</style>
