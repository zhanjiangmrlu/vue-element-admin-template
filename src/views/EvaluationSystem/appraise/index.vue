<template>
	<!-- 售后评价 -->
	<div class="appraise common">
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
						placeholder="请选择商家"
						class="input-with-select"
						v-model="currentName"
						@focus="openDialog"
					>
						<el-button
							slot="append"
							icon="el-icon-more"
							@click="openDialog"
						></el-button>
					</el-input>
				</el-form-item>

				<el-form-item label="创建时间">
					<el-date-picker
						v-model="startTime"
						type="datetime"
						placeholder="开始时间"
					/>
					<i>-</i>
					<el-date-picker
						v-model="endTime"
						type="datetime"
						placeholder="结束时间"
					/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="derive">导出</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="orderList appraise-body">
			<el-table
				:data="tableData"
				border
				:header-cell-style="{ background: '#F3F4F7', textAlign: 'center' }"
				:cell-style="{ textAlign: 'center' }"
			>
				<el-table-column prop="orderSalesSn" label="关联订单号" width="180">
				</el-table-column>
				<el-table-column prop="afterSalesSn" label="售后订单号" width="180">
				</el-table-column>
				<el-table-column prop="supplierName" label="商家"> </el-table-column>
				<el-table-column prop="score" label="服务评价星级"> </el-table-column>
				<el-table-column prop="detail" label="详细评价"> </el-table-column>
				<el-table-column prop="tagList" label="评价标签"> </el-table-column>
				<el-table-column prop="addTime" label="提交时间"> </el-table-column>
			</el-table>
		</div>
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
			:type="1"
			@closePop="hideDialog"
			@getName="getRowName"
		/>
	</div>
</template>

<script>
import afterSalesOrderList from '@/json/afterSalesOrderList.json'

import MechantDialog from '../components/mechantDialog.vue'

export default {
	name: 'Appraise',
	components: {
		MechantDialog,
	},

	data() {
		return {
			formInline: {
				saleNum: '', //售后单号
				orderNum: '', //订单号
			},
			startTime: '', //开始时间
			endTime: '', //结束时间
			tableData: [], //订单数据列表
			currentPage: 1, //当前页码
			currentName: '', //当前商家的名称
			visible: false, //弹窗是否显示
		}
	},

	created() {
		this.tableData = afterSalesOrderList.resultData.records
	},

	methods: {
		onSubmit() {
			console.log('submit!')
		},
		derive() {
			console.log('导出')
		},

		//当前点击页码
		handleCurrentChange(value) {
			this.currentPage = value
			console.log('点击页码')
		},

		//手动填写页码
		handleSizeChange(value) {
			this.currentPage = value
		},

		//弹窗
		openDialog() {
			console.log('点击弹窗了')
			this.visible = true
		},

		//关闭弹窗
		hideDialog() {
			this.visible = false
		},

		//获取当前行的名称
		getRowName(data) {
			this.currentName = data
			console.log(data)
		},
	},
}
</script>

<style lang="scss" scoped>
.appraise {
	.el-select .el-input {
		width: 130px;
	}

	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}

	::v-deep .el-date-editor.el-input,
	.el-date-editor.el-input__inner {
		width: 185.6px;
	}

	.el-pagination {
		text-align: center;
	}
}
</style>
