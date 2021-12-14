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
						placeholder="请选择商家"
						class="input-with-select"
						@focus="dialogTableVisible = true"
					>
						<el-button
							slot="append"
							icon="el-icon-more"
							@click="dialogTableVisible = true"
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
			<el-table :data="tableData" border style="width: 100%">
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

		<!-- 选择商家弹窗 -->
		<el-dialog title="选择商家" :visible.sync="dialogTableVisible" :lock-scroll="true">
			<div class="popSearch">
				<span>搜索</span>
				<el-input
					style="width: 180px"
					placeholder="请输入商家名称"
					v-model="merchantName"
					class="input-with-select"
				/>
				<el-button type="primary" @click="inquire">查询</el-button>
			</div>
			<el-table
				:data="merchantList"
				border
				style="width: 100%"
				:header-cell-style="{ background: '#f5f7fa', textAlign: 'center' }"
			>
				<el-table-column width="200">
					<el-radio-group v-model="radio">
						<el-radio lable="选择" />
					</el-radio-group>
				</el-table-column>
				<el-table-column prop="supplierName" label="商家名称" width="518">
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					style="margin-top: 20px"
					align="right"
					:current-page="currentPage"
					:page-sizes="[10, 20, 30, 40]"
					:page-size="10"
					layout="total, sizes, prev, pager, next, jumper"
					:total="400"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>
			<div class="btn">
				<el-button type="primary" @click="dialogTableVisible = false"
					>确认</el-button
				>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import afterSalesOrderList from '@/json/afterSalesOrderList.json'
import merchantPopList from '@/json/merchantPopList.json'

export default {
	name: 'Appraise',
	data() {
		return {
			formInline: {
				saleNum: '', //售后单号
				name: '', //商家名称
				orderNum: '', //订单号
			},
			startTime: '', //开始时间
			endTime: '', //结束时间
			tableData: [], //订单数据列表
			merchantList: [], //商家列表,
			dialogTableVisible: false, //选择商家弹窗
			radio: '选择', //单选
			currentPage: 1, //当前页码
			merchantName: '', //商家名称
		}
	},

	created() {
		this.tableData = afterSalesOrderList.resultData.records
		this.merchantList = merchantPopList.resultData.supplierAccountNumberList
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

		//弹窗的搜索查询按钮
		inquire() {
			const params = this.merchantName
			console.log(params)
		},
	},
}
</script>

<style lang="scss" scoped>
.appraise {
	height: 100%;
	.appraise-body {
		padding: 20px;
		background: #ffff;
	}

	.el-select .el-input {
		width: 130px;
	}
	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}

	i {
		padding: 0 4px 0 2px;
	}

	::v-deep .el-date-editor.el-input,
	.el-date-editor.el-input__inner {
		width: 185.6px;
	}

	// .pagination {
	// 	text-align: center;
	// }

	.btn {
		width: 100%;
		text-align: right;
		margin-top: 20px;
	}

	.popSearch {
		display: flex;
		align-items: center;
		margin-bottom: 15px;

		.el-input {
			margin: 0 10px;
		}
	}
}
</style>
