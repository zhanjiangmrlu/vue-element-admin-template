import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs //轻量级时间戳转换插件

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' })

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
