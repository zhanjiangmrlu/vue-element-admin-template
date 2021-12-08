<template>
  <div class="addUser">
    <div class="header">
      <span>编辑用户</span>
      <img @click="close" src="../../../assets/cha.png" alt="" />
    </div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名称" prop="name">
        <el-input
          v-model.number="ruleForm.name"
          placeholder="请输入用户名"
          ref="name"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色类型" prop="role">
        <el-select v-model="ruleForm.role" placeholder="请选择角色类型">
          <el-option label="前端" value="shanghai"></el-option>
          <el-option label="后端" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设置密码" prop="pass">
        <el-input
          v-model="ruleForm.pass"
          type="password"
          autocomplete="off"
          placeholder="请设置密码"
          ref="pass"
          value="qiudaoyuzai212"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="确认密码" prop="checkPass">
				<el-input
					v-model="ruleForm.checkPass"
					type="password"
					autocomplete="off"
					placeholder="确认密码"
					ref="checkPass"
				></el-input>
			</el-form-item> -->
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="ruleForm.email"
          autocomplete="off"
          placeholder="请输入邮箱"
          ref="email"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { editorUser } from "../../../api/user";
export default {
  props: ["userMsg"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    // var validatePass2 = (rule, value, callback) => {
    // 		if (value === '') {
    // 			this.pass = value
    // 			// console.log(this.pass)
    // 			callback(new Error('请再次输入密码'))
    // 		} else if (value !== this.ruleForm.pass) {
    // 			callback(new Error('两次输入密码不一致!'))
    // 		} else {
    // 			callback()
    // 		}
    // 	}

    return {
      ruleForm: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        role: [
          {
            required: true,
            message: "请选择角色类型",
            trigger: "change",
          },
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        email: [
          {
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur",
          },
        ],
      },
    };
  },

  mounted() {
    this.ruleForm = this.userMsg;
  },

  methods: {
    //确定按钮提交新增表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editorPerson();
          this.$emit("close");
          // alert('submit!')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //弹窗被取消之后，重置表单
    resetForm(formName) {
      this.close();
      this.$refs[formName].resetFields();
    },
    //关闭弹窗
    close() {
      // console.log('1111');
      this.$emit("close");
    },

    //新增人员请求
    editorPerson() {
      const params = {
        display_name: this.ruleForm.name, //用户名
        role_type: this.ruleForm.role, //角色类型
        password: this.ruleForm.pass,
        check_password: this.ruleForm.pass, //确认密码
        email: this.ruleForm.email,
      };
      editorUser(params).then((res) => {
        console.log(res, "res");
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.addUser {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-45%);
  width: 700px;
  height: 400px;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: -0.5px 0.5px 5px #b3b3b3;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 15px;
    margin-bottom: 30px;
    border-bottom: 1px solid #f1f1f1;

    img {
      width: 15px;
      height: 15px;
    }
  }

  .el-form {
    margin: 0 auto;
    width: 500px;
  }
}
::v-deep .el-select .el-input__inner {
  width: 400px;
}

::v-deep .el-form-item__content {
  text-align: right;
  margin-left: 0;
}

::v-deep .el-button {
  padding: 13px 12px;
  line-height: 0;
}
</style>
