<template>
	<div class="login">
		<div class="form">		
			<h1 class="title">大舜</h1>
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
				class="rule-form"
				hide-required-asterisk
			>
				<el-form-item label="账号" prop="userName">
					<el-input v-model="ruleForm.userName"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
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
import { login } from '../../api/login'
// import store from '../../store/index'
export default {
	name: 'Login',
	data() {
		return {
			ruleForm: {
				userName: 'admin',
				password: '123456',
			},
			rules: {
				name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
			},
		}
	},

	created() {},

	methods: {
	submitForm(formName) {
			this.$refs[formName].validate(valid => {
				// if (!valid) return
				if (valid) {
					const params = {
						userName: this.ruleForm.userName,
						password: this.ruleForm.password,
					}
				 login(params)
						.then(({ data = {} }) => {
							const { result_code } = data
									localStorage.setItem('code',result_code) || ''
							const res2 = localStorage.getItem('code')
							console.log(res2,'getStatus');
							if(res2){
							this.$router.push('/workbench/index')
							}
						})
						.catch(err => {
							console.log(err)
						})
				} else {
					return
				}
				// this.$router.push("/workbench/index");
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
	},
}
</script>

<style lang="scss" scoped>
.login {
	width: 100%;
	height: 100%;
	color: #fff;
	background: #2d3a4b;

	.title {
margin-left: 240px;
	}

.form{
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -240px;
	margin-top: -120px;
}


	.rule-form {
		width: 480px;
		margin: 20px auto;

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
