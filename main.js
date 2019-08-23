import Vue from 'vue'
import App from './App'

// 引入路由文件
import MinRouter from './router/MinRouter'
Vue.use(MinRouter)
import minRouter from './router/router'

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

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    minRouter,
})
app.$mount()
