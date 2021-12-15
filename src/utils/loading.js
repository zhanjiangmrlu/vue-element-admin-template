
import {Loading} from 'element-ui'
// import {}
let loading = null

//开始 加载loading
const startLoading = () => {
	loading = Loading.service({
		lock: true,
		text: '加载中……',
		background: 'transparent',
	})
}

//结束 取消loading加载
const endLoading = () => {
	loading.close()
}

let needLoadingRequestCount = 0 //声明一个变量

export const showFullScreenLoading = () => {
  console.log('1111');
	if (needLoadingRequestCount === 0) {
		//当等于0时证明第一次请求 这时开启loading
		startLoading()
	}
	needLoadingRequestCount++ //全局变量值++
}

export const tryHideFullScreenLoading = () => {
  console.log('222');
	if (needLoadingRequestCount <= 0) return //小于等于0 证明没有开启loading 此时return
	needLoadingRequestCount-- //正常响应后 全局变量 --
	if (needLoadingRequestCount === 0) {
		//等于0 时证明全部加载完毕 此时结束loading 加载
		endLoading()
	}
}
