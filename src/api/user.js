import request from '../utils/request'

//用户列表
export const getUserList = (data = {}) => {
	return request.request({
		url: 'system/user_manager',
		method: 'GET',
		data,
	})
}

//新增用户
export const addUser = (data = {}) => {
	return request.request({
    url:'system/user/add',
    method:'POST',
    data
  })
}


//编辑用户
export const editorUser =(data={})=>{
	return request.request({
		url:'system/user/edit',
		method:'POST',
		data,
	})
}

//删除用户
export const delUserMsg =(data={})=>{
	return request.request({
		url:'system/user/del',
		method:'DELETE',
		data,
	})
}