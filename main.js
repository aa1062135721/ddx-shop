import Vue from 'vue'
import App from './App'

// 微信公众号开发 调试工具
import  VConsole from 'vconsole'
new VConsole()

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

// weixin-sdk
import jweixin from 'jweixin-module'
Vue.prototype.$wx = jweixin

import VueClipboard from 'vue-clipboard2' //用来复制数据到粘贴板
Vue.use(VueClipboard)
VueClipboard.config.autoSetContainer = true

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
 * methods{
 *     fn(){
 *          this.$eventHub.$emit('search_word','data');
 *     }
 * }
 *
 * page 2 step 2 *
 * onLoad() {
 *    let _this = this
 *    this.$eventHub.$on('search_word', function (data) {
 *        _this.getValue = data
 *        console.log("从其他页面传过来的值",data);
 *    })
 * }
 *
 * page 2 step 3 *
 * onUnload(){
 *  this.$eventHub.$off('search_word')
 * }
 *
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
