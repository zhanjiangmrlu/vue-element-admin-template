<template>
	<div>
		<el-button type="primary" size="mini">新建用户</el-button>
		<el-table
			:data="
				userList.filter(
					data =>
						!search || data.name.toLowerCase().includes(search.toLowerCase())
				)
			"
			style="width: 100%"
		>
			<el-table-column label="账号" prop="user_name"> </el-table-column>
			<el-table-column label="用户名" prop="display_name"> </el-table-column>
			<el-table-column label="角色" prop="role"> </el-table-column>
			<el-table-column label="邮箱" prop="email"> </el-table-column>
			<!-- <el-table-column label="操作"> </el-table-column> -->
			<el-table-column label="操作" align="right">
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="text"
						@click="handleEdit(scope.$index, scope.row)"
						>编辑</el-button
					>
					<el-button
						size="mini"
						type="text"
						@click="handleDelete(scope.$index, scope.row)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<Paging />
	</div>
</template>

<script>
import Paging from '../../../components/paging/index.vue'
import { getUserList } from '../../../api/user'
export default {
	name: 'User',
	components: {
		Paging,
	},

	data() {
		return {
			userList:[],
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
				},
			],
			search: '',
		}
	},

	created() {
		this.getUserList()
	},

	methods: {
		handleEdit(index, row) {
			console.log(index, row)
		},
		handleDelete(index, row) {
			console.log(index, row)
		},

		async getUserList() {
			const params = {
				page: 1,
				pageSize: 10,
				display_name: 'name',
			}
			const { data = {} } = await getUserList(params)
			this.userList = data.data.data

			console.log(this.userList, 'reqList')
		},
	},
}
</script>
<style lang="scss" scoped></style>
