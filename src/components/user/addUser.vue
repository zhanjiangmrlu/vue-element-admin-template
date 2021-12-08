<template>
	<div class="addUser">
		<div class="header">
			<span>新增用户</span>
			<img @click="close" src="../../assets/cha.png" alt="" />
		</div>
		<el-form
			:model="ruleForm"
			status-icon
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="账号" prop="account">
				<el-input
					type="text"
					v-model="ruleForm.account"
					autocomplete="off"
					placeholder="请输入账号"
					ref="account"
				></el-input>
			</el-form-item>
			<el-form-item label="用户名称" prop="name">
				<el-input
					v-model.number="ruleForm.name"
					placeholder="请输入用户名"
					ref="name"
				></el-input>
			</el-form-item>
			<el-form-item label="角色类型" prop="role">
				<el-input
					v-model.number="ruleForm.role"
					placeholder="请输入角色类型"
					ref="role"
					value="管理员"
				></el-input>
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
			<el-form-item label="确认密码" prop="checkPass">
				<el-input
					v-model="ruleForm.checkPass"
					type="password"
					autocomplete="off"
					placeholder="确认密码"
					ref="checkPass"
				></el-input>
			</el-form-item>
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
import { addUser } from '../../api/user'
export default {
	props: {
		type: Boolean,
	},
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'))
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass')
				}
				callback()
			}
		}
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				this.pass = value
				// console.log(this.pass)
				callback(new Error('请再次输入密码'))
			} else if (value !== this.ruleForm.pass) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		}
		return {
			ruleForm: {
				pass: 'qiudaoyuzai212',
				checkPass: 'qiudaoyuzai212',
				account: '15017573250',
				role: '管理员',
				name: '秋刀魚仔',
				email: '1399139679@qq.com',
			},
			rules: {
				account: [
					{
						required: true,
						message: '请输入账号',
						trigger: 'blur',
					},
				],
				name: [
					{
						required: true,
						message: '请输入用户名',
						trigger: 'blur',
					},
				],
				role: [
					{
						required: true,
						message: '请输入角色类型',
						trigger: 'blur',
					},
				],
				pass: [{ validator: validatePass, required: true, trigger: 'blur' }],
				checkPass: [
					{ validator: validatePass2, required: true, trigger: 'blur' },
				],
				email: [
					{
						required: true,
						message: '请输入邮箱',
						trigger: 'blur',
					},
					{
						type: 'email',
						message: '请输入正确的邮箱地址',
						trigger: 'blur',
					},
				],
			},
		}
	},
	methods: {
		//确定按钮提交新增表单
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.addPerson()
					this.$emit('close')
					// alert('submit!')
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		//弹窗被取消之后，重置表单
		resetForm(formName) {
			this.close()
			this.$refs[formName].resetFields()
		},
		//关闭弹窗
		close() {
			// console.log('1111');
			this.$emit('close')
		},

		//新增人员请求
		addPerson() {
			const params = {
				display_name: this.ruleForm.name, //用户名
				role_type: this.ruleForm.role, //角色类型
				password: this.ruleForm.pass,
				check_password: this.ruleForm.checkPass, //确认密码
				email: this.ruleForm.email,
			}
			addUser(params).then(res => {
				console.log(res, 'res')
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.addUser {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-45%);
	width: 700px;
	height: 550px;
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

::v-deep .el-form-item__content {
	text-align: right;
	margin-left: 0;
}

::v-deep .el-button {
	padding: 13px 12px;
	line-height: 0;
}
</style>
