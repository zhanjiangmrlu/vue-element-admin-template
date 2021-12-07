import request from '../utils/request'

//登录
export const login = (data = {}) => {
	return request.request({
		url: 'login',
		method: 'POST',
		data,
	})
}


