import Vue from 'vue'
import App from './App'
import { NODE_ENV } from './utils/constant'

// 微信公众号开发 调试工具
import  VConsole from 'vconsole'
if (NODE_ENV === 'development') { // 如果是开发环境，调用控制台打印功能
    new VConsole()
}

// 合从 客服
(function(d, w, c) {
    let s = d.createElement('script');
    w[c] = w[c] || function() {
        (w[c].z = w[c].z || []).push(arguments);
    };
    s.async = true;
    s.src = 'https://pubres.aihecong.com/hecong.js';
    if (d.head) d.head.appendChild(s);
})(document, window, '_AIHECONG');
_AIHECONG('ini', {
    entId : 15463,
    button : false, //去除聊天按钮
    history : true, //添加该参数实现默认读取上一次聊天记录
    // uniqueId : '5ccb3020bbf4693783745351', //网站会员唯一ID，请不要超过64个字符
});

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

/* 是否关注公众号，如果没有关注则强制关注 */
import followAlert from './components/follow-alert/follow-alert'
let myFollowAlert = Vue.component('follow-alert',followAlert)
document.body.appendChild(new myFollowAlert().$mount().$el)
