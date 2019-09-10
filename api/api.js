/**
 两种使用方法

 testRequest1 () {
      this.$minApi.uniapp({wd: 'uni-app'}).then(res => {
          this.res = res
          console.log(res)
      }).catch(err => {
          console.log(err)
      })
 }
 async testRequest2 () {
      try {
          const res = await this.$minApi.uniapp({wd: 'uni-app'})
          console.log(res)
      } catch (err) {
          console.log(err)
      }
 }
 */
import Vue from 'vue'
import MinRequest from './MinRequest'
import store from '../store/index'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
  if ( store.getters.token ) {
    request.header['XX-Token'] = store.getters.token
  }
  return request
})

// 状态码错误信息
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请稍后重试。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// 响应拦截器
minRequest.interceptors.response((response) => {
  if (response.data.code === "-1") {
    uni.navigateTo({
      url: `/pages/public/login`
    })
  }
  if (response.statusCode !== 200){
    Vue.prototype.msg(codeMessage[response.statusCode])
  }
  if (response.data.code !== 200 && response.data.msg){
    Vue.prototype.msg(response.data.msg)
  }
  return response.data
})

// 设置默认配置
minRequest.setConfig((config) => {
  config.baseURL = 'http://testmd.ddxm661.com/wxshop'
  return config
})


export default {
  apis: {
    /**
     * 登录页面-获取协议
     */
    agreement (data) {
      return minRequest.get('/index/getAgreement', data)
    },
    /**
     * 微信一键登录
     */
    loginWeChat (data) {
      return minRequest.post('/Login/weChat', data)
    },
    /**
     * 获取验证码
     */
    loginSendCode (data) {
      return minRequest.post('/login/sendCode', data)
    },
    /**
     * 手机号码快捷登录
     */
    mobileLogin (data) {
      return minRequest.post('/login/mobileLogin', data)
    },
    /**
     * 微信登陆-绑定手机号
     */
    wxLoginBMobile(data) {
      return minRequest.post('/Login/bd_mobile', data)
    },
    /**
     * 获取用户信息
     */
    getUserInfo (data) {
      return minRequest.get('/User/getUserInfo', data)
    },
    /**
     * 获取城市
     */
    city(data) {
      return minRequest.get('/index/city', data)
    },
    /**
     * 获取用户地址列表
     */
    addressList(data) {
      return minRequest.get('/User/address_list', data)
    },
    /**
     * 新增、编辑用户地址
     */
    addressAddOrEdit(data) {
      return minRequest.post('/User/add_address', data)
    },
    /**
     * 删除用户地址
     */
    addressDel(data) {
      return minRequest.post('/User/address_del', data)
    },
    /**
     * 获取用户地址详情
     */
    addressInfo(data) {
      return minRequest.get('/User/address_info', data)
    },
    /**
     * 获取商品分类
     */
    category(data) {
      return minRequest.get('/Index/category', data)
    },
    /**
     * 获取banner
     */
    banner(data) {
      return minRequest.get('/Index/banner', data)
    },
    /**
     * 猜你喜欢商品
     */
    guessYouLike(data) {
      return minRequest.get('/Index/like_item', data)
    },

    /**
     * 根据分类获取商品列表
     */
    goodsByCategoryId(data) {
      return minRequest.get('/Index/getItem_category', data)
    },

    /**
     * 商品详情
     */
    goodsDetail(data) {
      return minRequest.get('/Index/item_info', data)
    },

    /**
     * 商品详情-获取规格对应的价格与金额
     */
    goodsDetailSpecs(data) {
      return minRequest.get('/Index/info_specs', data)
    },

    /**
     * 添加到购物车
     */
    carAdd(data) {
      return minRequest.post('/cart/add_cart', data)
    },

    /**
     * 购物车列表
     */
    carList(data) {
      return minRequest.get('/cart/cart_list', data)
    },

    /**
     * 删除购物车商品
     */
    carDel(data) {
      return minRequest.post('/cart/del_cart', data)
    },

    /**
     * 修改购物车数量
     */
    carEdit(data) {
      return minRequest.post('/cart/edit_cart', data)
    },

    /**
     * 搜索界面-热搜与历史搜索
     */
    searchHistoryOrHot(data) {
      return minRequest.get('/Index/search_history', data)
    },

    /**
     * 搜索界面-热搜与历史搜索-删除
     */
    searchHistoryDel(data) {
      return minRequest.post('/user/del_history', data)
    },

    /**
     * 搜索商品
     */
    searchGoods(data) {
      return minRequest.get('/Index/search_item', data)
    },


  }
}
