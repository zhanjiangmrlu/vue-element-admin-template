<template>
	<el-dropdown class="logout" @command="handleCommand">
		<el-image
			class="logout__image"
			src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
		/>
		<i class="el-icon-caret-bottom" />
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item command="logOut">退出登录</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
export default {
	name: 'Logout',
	data() {
		return {}
	},
	methods: {
		handleCommand(command) {
			// 退出登录
			if (command === 'logOut') {
				this.$router.push({ name: 'Login' })
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.logout {
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;

	&__image {
		width: 40px;
		height: 40px;
		border-radius: 10px;
		margin-right: 10px;
	}
}
</style>
