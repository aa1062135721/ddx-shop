import Vue from 'vue'
import App from './App'

// 引入路由文件
import MinRouter from './router/MinRouter'
import minRouter from './router/router'
// vuex
import store from './store/index'
// 阿里巴巴图标库
import './static/css/iconfont.css'

Vue.config.productionTip = false

App.mpType = 'app'

// 注册路由
Vue.use(MinRouter)
Vue.prototype.$store = store

const app = new Vue({
    ...App,
    // store,
    minRouter,
})
app.$mount()
