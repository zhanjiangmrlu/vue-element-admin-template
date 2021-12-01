<template>
  <div class="login">
    <div class="form">
      <h1 class="title">登录系统</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="rule-form"
      >
        <el-form-item prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        userName: "admin",
        password: "123456",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;

        this.$router.push("/workbench/index");
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  color: #fff;
  background: #2d3a4b;

  .title {
    text-align: center;
    padding: 200px 0 20px;
  }

  .rule-form {
    width: 480px;
    margin: 0 auto;

    .btn {
      width: 100%;
    }
  }
}

/deep/ {
  .el-input__inner {
    color: #fff;
    background-color: #283443;
    border: 1px solid #3e4957;
  }
}
</style>
