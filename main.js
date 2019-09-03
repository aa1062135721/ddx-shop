import Vue from 'vue'
import App from './App'

// 引入路由文件
import MinRouter from './router/MinRouter'
Vue.use(MinRouter)
import minRouter from './router/router'

// 引入http
import MinRequest from './api/MinRequest'
Vue.use(MinRequest) // 注册请求
import minRequest from './api/api'

// vuex
import store from './store/index'
Vue.prototype.$store = store

// 阿里巴巴图标库
import './static/css/iconfont.css'

// filter
import * as filters from './filter/index'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// 全局函数 验证器
import Utils from './utils/utils'
Vue.use(Utils)

//Global event bus
/**
 * page 1 step 1 *
 * this.$eventHub.$emit('fire','data');
 *
 * page 2 step 2 *
 * this.$eventHub.$on('fire', function (data) {
 *     console.log('fire - '+data);
 * });
 */
Vue.prototype.$eventHub = new Vue(); // Global event bus

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    minRouter,
    minRequest,
})
app.$mount()
