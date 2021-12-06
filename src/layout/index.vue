<template>
	<el-container class="layout">
		<Sidebar />
		<el-container class="container">
			<el-header class="el-header">
				<Navbar />
			</el-header>
			<el-main>
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import Sidebar from './components/Sidebar/index'
import Navbar from './components/Navbar/index'

export default {
	name: 'Layout',
	components: { Sidebar, Navbar },
	data() {
		return {}
	},
	methods: {
		second(path) {
			this.$router.push(path)
		},
	},
}
</script>

<style lang="scss" scoped>
.layout {
	height: 100%;
}

.el-header {
	background-color: #b3c0d1;
	color: #333;
	line-height: 60px;
	font-size: 12px;
}

.container {
	padding-left: 210px;
}
</style>
