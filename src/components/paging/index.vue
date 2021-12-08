<template>
	<div class="block">
		<el-pagination
			background
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage3"
			:page-sizes="[3, 5]"
			:page-size="100"
			layout="total, sizes, prev, pager, next, jumper"
			:total="totalNum"
		>
		</el-pagination>
	</div>
</template>
<script>
export default {
	props: {
		total: {
			type: Number,
      // default:''
		},
	},
	data() {
		return {
			currentPage3: 1,
      totalNum:0
		}
	},
mounted(){
  this.totalNum = Number(this.total)
  console.log(typeof(this.total),'dshdj');
  console.log(typeof(this.totalNum),'111111');
},
	methods: {
		handleCurrentChange() {},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`)
		},
	},
}
</script>

<style lang="scss" scoped>
.block {
	margin-top: 20px;
	text-align: right;
}

::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
	background-color: #fff;
	color: #409eff;
	border: 1px solid #409eff;
}

::v-deep .el-pagination.is-background .el-pager li {
	border: 1px solid #bbb;
	background-color: #fff;
}

::v-deep .el-pagination.is-background .btn-prev {
	border: 1px solid #bbb;
	background-color: #fff;
}

::v-deep .el-pagination.is-background .btn-next {
	border: 1px solid #bbb;
	background-color: #fff;
}
</style>
