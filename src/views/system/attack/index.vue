<template>
	<div class="attack common">
		<div class="head_top" v-if="showReport === false">
			<div class="head">
				<span class="demonstration">选择日期:</span>
				<el-date-picker
					v-model="dataValue"
					type="date"
					placeholder="请选择日期"
				>
				</el-date-picker>
				<el-button size="mini" @click="dailyReport">生成日报</el-button>
			</div>
			<div class="block_table">
				<el-table
					:data="tableData"
					style="width: 100%"
					:header-cell-style="rowClass"
				>
					<el-table-column prop="name" label="报告姓名"> </el-table-column>
					<el-table-column prop="date" label="报告日期"> </el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="scope">
							<el-button
								@click.native.prevent="preview(scope.$index, tableData)"
								type="text"
								size="small"
							>
								预览
							</el-button>
							<el-button
								@click.native.prevent="deleteRow(scope.$index, tableData)"
								type="text"
								size="small"
							>
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[3, 5]"
					:page-size="100"
					layout="total, sizes, prev, pager, next, jumper"
					:total="20"
					align="right"
				>
				</el-pagination>
			</div>
			<el-dialog title="生成日报" :visible.sync="dialogVisible" width="30%">
				<span class="dailyPaper">
					<el-form>
						<el-form-item
							label="报表名称:"
							prop="reportName"
							:rules="[{ required: true, message: '' }]"
						>
							<el-input
								v-model="reportName"
								suffix-icon="el-icon-error"
							></el-input>
						</el-form-item>
					</el-form>
				</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="confirm">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<div class="head_bottom" v-if="showReport">
			<AttackPreview />
		</div>
	</div>
</template>

<script>
import { getAttackList, dailplyReport } from '../../../api/attack'
import AttackPreview from './AttackPreview.vue'
export default {
	name: 'Attack',
	components: {
		AttackPreview,
	},
	data() {
		return {
			dataValue: '',
			currentPage: 1, //当前分页
			dialogVisible: false, //是否显示弹窗
			reportName: '', //报告名称
			reportTime: '', //报告时间
			showReport: false, //态势报告显示与隐藏
			tableData: [
				{
					date: '2016-05-04',
					name: '攻击态势报告2016-05-04',
				},
				{
					date: '2016-05-03',
					name: '攻击态势报告2016-05-03',
				},
				{
					date: '2016-05-02',
					name: '攻击态势报告2016-05-02',
				},
				{
					date: '2016-05-02',
					name: '攻击态势报告2016-05-02',
				},
				{
					date: '2016-05-02',
					name: '攻击态势报告2016-05-02',
				},
				{
					date: '2016-05-02',
					name: '攻击态势报告2016-05-02',
				},
				{
					date: '2016-05-02',
					name: '攻击态势报告2016-05-02',
				},
				{
					date: '2016-05-02',
					name: '攻击态势报告2016-05-02',
				},
				{
					date: '2016-05-02',
					name: '攻击态势报告2016-05-02',
				},
				{
					date: '2016-05-02',
					name: '攻击态势报告2016-05-02',
				},
				{
					date: '2016-05-02',
					name: '攻击态势报告2016-05-02',
				},
				{
					date: '2016-05-02',
					name: '攻击态势报告2016-05-02',
				},
				{
					date: '2016-05-02',
					name: '攻击态势报告2016-05-02',
				},
				{
					date: '2016-05-02',
					name: '攻击态势报告2016-05-02',
				},
				{
					date: '2016-05-02',
					name: '攻击态势报告2016-05-02',
				},
			], //列表数据
		}
	},

	methods: {
		//设置表头样式
		rowClass() {
			return 'background:#fafafa'
		},

		// 请求列表数据
		getList(currentPage) {
			const params = {
				page: currentPage,
				page_size: '10',
			}
			const getData = getAttackList(params).then(({ data = {} }) => {
				this.tableData = data.data.data
				console.log(getData, 'res攻击态势报告')
			})
		},

		// 当前点击的页码
		handleCurrentChange(val) {
			this.currentPage = val
			// console.log(val, "val");
			this.getList(val)
		},

		//每页显示条数
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`)
		},

		//删除列表
		deleteRow(index, rows) {
			rows.splice(index, 1)
		},

		//预览
		preview(index, rows) {
			console.log(index, rows)
			this.dialogVisible = true
			this.reportTime = rows[index].date
			this.reportName = rows[index].name
		},

		//预览确定按钮
		confirm() {
			this.dialogVisible = false
			const params = {
				name: this.reportName,
				start_date: this.reportTime,
			}
			dailplyReport(params).then(res => {
				console.log(res, 'resssss')
			})
			// console.log(params,dailplyReport);
		},

		//生成日报弹窗
		dailyReport() {
			this.showReport = true
			// this.$router.push({ name: "AttackPreview" });
		},
	},
}
</script>

<style lang="scss" scoped>
.attack {
	height: 100%;

	.head_bottom {
		height: 100%;
	}
}

.demonstration {
	margin-right: 15px;
}

.head {
	.el-button--mini,
	.el-button--mini.is-round {
		margin-left: 10px;
	}

	.el-button {
		color: #bbb;
		background: #ececec;
		border: 1px solid #ccc;
	}

	.el-button:focus,
	.el-button:hover {
		color: #bbb;
	}
}

.dailyPaper {
	.el-input {
		width: 330px;
	}

	::v-deep .el-form-item--mini .el-form-item__content,
	.el-form-item--mini .el-form-item__label {
		display: flex;
		align-items: center;
	}

	.el-form-item--mini.el-form-item,
	.el-form-item--small.el-form-item {
		margin-bottom: 0;
	}
}

::v-deep .el-dialog__title {
	font-size: 16px;
}

::v-deep .el-dialog__body {
	border-top: 1px solid #f1f1f1;
	border-bottom: 1px solid #f1f1f1;
}

::v-deep .el-dialog__footer {
	padding-bottom: 10px;
}

::v-deep .el-input__prefix {
	margin-left: 145px;
}

::v-deep .el-input--prefix .el-input__inner {
	padding-left: 10px;
}

::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
	width: 180px;
}
</style>
