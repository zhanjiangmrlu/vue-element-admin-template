<template>
	<div>
		<div class="head">
			<el-button type="primary" size="mini" @click="showAdd"
				>新建用户</el-button
			>
			<div class="search">
				<el-input type="text" v-model="search" size="mini" placeholder="输入关键字搜索" />
				<el-button type="primary" size="mini">搜索</el-button>
			</div>
		</div>

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
			<el-table-column label="操作">
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
		<Paging :total="total" />
		<AddUser v-if="showAdduser == true" @close="close" />
		<EditorUser
			v-if="showEditor == true"
			@close="closeEditor"
			:userMsg="ruleForm"
		/>
		<DelUser v-if="showDel == true"/>
	</div>
</template>

<script>
import Paging from '../../../components/paging/index.vue'
import { getUserList, delUserMsg } from '../../../api/user'
import AddUser from '../../../components/user/addUser.vue'
import EditorUser from '../../../components/user/editorUser.vue'
import DelUser from '../../../components/user/delUser.vue'
export default {
	name: 'User',
	components: {
		Paging,
		AddUser,
		EditorUser,
		DelUser
	},

	data() {
		return {
			userList: [],
			search: '',
			showAdduser: false,
			showEditor: false,
			showDel:false,
			ruleForm: {
				pass: '',
				role: '',
				name: '',
				email: '',
			},
			total: '', //总条数
		}
	},

	created() {
		this.getUserList()
	},

	methods: {
		//编辑用户信息
		handleEdit(index, row) {
			console.log(index, row)
			this.showEditor = true
			const getUserMsg = row
			this.ruleForm.name = row.user_name
			this.ruleForm.pass = row.is_admin
			this.ruleForm.role = row.role
			// this.ruleForm.email = row.email
			this.ruleForm.email = '1399139679@qq.com'
			console.log(getUserMsg, '=====')
		},
		//删除用户信息
		handleDelete(index, row) {
			console.log(index, row);
			this.showDel = true

			// const getId = row.role_id
			delUserMsg
			// 	.then(res => {
			// 		console.log(res, 'res')
			// 		this.getUserList()
			// 	})
			// 	.catch(err => {
			// 		console.log(err)
			// 	})
		},

		async getUserList() {
			const getName = localStorage.getItem('name') || ''
			const params = {
				page: 1,
				pageSize: 10,
				display_name: getName,
			}
			const { data = {} } = await getUserList(params)
			this.total = data.data.count
			console.log(this.total)
			this.userList = data.data.data
			console.log(data, 'reqList')
		},
		//显示新建用户弹窗
		showAdd() {
			this.showAdduser = true
		},
		//关闭新建用户弹窗
		close() {
			this.showAdduser = false
		},
		//关闭编辑用户弹窗
		closeEditor() {
			this.showEditor = false
		},
	},
}
</script>
<style lang="scss" scoped>
.head {
	display: flex;
	justify-content: space-between;

	.search {
		display: flex;

		.el-button--mini,
		.el-button--mini.is-round {
			padding: 5px 11px;
		}

		.el-button--mini,
		.el-button--small {
			font-size: 12px;
			border-top-left-radius: 0;
			border-top-right-radius: 3px;
			border-bottom-right-radius: 3px;
			border-bottom-left-radius: 0;
		}
		::v-deep .el-input--mini .el-input__inner {
			border-radius: 0;
			border-top-left-radius: 3px;
			border-bottom-left-radius: 3px;
		}
	}
}
::v-deep .el-table--border::after,
.el-table--group::after,
.el-table::before {
	z-index: -9999;
}
</style>
