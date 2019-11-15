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
import * as Constant from '../utils/constant'

const baseUrl = Constant[Constant.NODE_ENV].baseUrl

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
  if ( store.state.token ) {
    request.header['XX-Token'] = store.state.token
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
  /**
   * TODO 未登录
   */
  if (response.data.code === -1) {
    let myVue = new Vue()
    myVue.$store.commit('setToken')
    myVue.$store.commit('setUserInfo')
  }

  /**
   * 登录过期或者token错误
   * 清除用户token和用户信息
   */
  if (response.data.code === -2) {
    let myVue = new Vue()
    myVue.$store.commit('setToken')
    myVue.$store.commit('setUserInfo')
    myVue.$openPage('mine')
  }

  if (response.statusCode !== 200){
    Vue.prototype.msg(codeMessage[response.statusCode])
  }
  if (response.data.code !== 200 && response.data.msg && response.data.code !== -2){
    Vue.prototype.msg(response.data.msg)
  }
  return response.data
})

// 设置默认配置
minRequest.setConfig((config) => {
  config.baseURL = `${baseUrl}`
  return config
})


export default {
  apis: {
    urls:{
      /**
       * 上传接口
       */
      upload: `${baseUrl}/Base/upload`,

    },
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
     * 修改用户手机号码
     */
    modifyMobile (data) {
      return minRequest.post('/user/edit_mobile', data)
    },

    /**
     * 判断用户是否是股东，如果是返回该股东的门店列表
     */
    isShareholder (data) {
      return minRequest.get('/Shareholder/isShareholder', data)
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
     * 购买须知
     */
    buyYouKnow(data){
      return minRequest.get('/Index/getNeeds', data)
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

    /**
     * 订单-根据选中的地址和商品计算运费
     */
    freight(data) {
      return minRequest.post('/order/getPostage', data)
    },

    /**
     * 拼团列表
     */
    assembleList(data) {
      return minRequest.get('/Index/assemble_list', data)
    },

    /**
     * 拼团详情
     */
    assembleDetail(data) {
      return minRequest.get('/Index/assemble_info', data)
    },

    /**
     * 拼团下单
     */
    createOrderByGroup(data) {
      return minRequest.post('/order/assemble_doPost', data)
    },

    /**
     * 验证身份信息
     */
    checkingIdCard(data){
      return minRequest.post('/User/CheckingIdCard', data)
    },

    /**
     * 商品详情、购物车  ----提交订单
     */
    createOrder(data){
      return minRequest.post('/order/order_doPost', data)
    },

    /**
     * 选择支付方式，如果是微信支付，还需调用微信支付接口，如果是钱包支付直接扣余额
     */
    payWay(data){
      return minRequest.post('/Orderwxpay/pay', data)
    },

    /**
     * 发送微信模板消息
     */
    sendTemplateMessage(data) {
      return minRequest.get('/user/sendTemplateMessage', data)
    },

    /**
     * 获取订单列表
     */
    orderList(data) {
      return minRequest.get('/Orderinfo/getAllList', data)
    },

    /**
     * 首页秒杀----获取时间段
     */
    seckillTime(data){
      return minRequest.get('/Index/seckill_list', data)
    },

    /**
     * 首页秒杀----根据时间段 获取商品
     */
    seckillGoodsList(data){
      return minRequest.get('/Index/seckill_list_goods', data)
    },

    /**
     * 秒杀详情
     */
    seckillGoodsInfo(data){
      return minRequest.get('/Index/seckillInfo', data)
    },

    /**
     * 秒杀下单
     */
    createOrderBySeckill(data) {
      return minRequest.post('/order/seckill_doPost', data)
    },

    /**
     * 查询收益记录或提现记录
     */
    profitList(data){
      return minRequest.get('/User/getProfitList', data)
    },

    /**
     * 申请提现
     */
    applyMoney(data){
      return minRequest.post('/User/applyOutMoney', data)
    },

    /**
     * 我的粉丝
     */
    fansList(data){
      return minRequest.get('/user/getFansList', data)
    },

    /**
     * 分享商品
     */
    shareGoods(data){
      return minRequest.get('/user/shareGoods', data)
    },

    /**
     * 邀请好友
     */
    shareFriend(data){
      return minRequest.get('/user/shareFriend', data)
    },

    /**
     * 商品详情页的3个评论
     */
    goodsDetailComment(data) {
      return minRequest.post('/comment/item_comment_list', data)
    },

    /**
     * 商品评论列表
     */
    goodsComment(data) {
      return minRequest.post('/comment/comment_list', data)
    },

    /**
     * 评论订单/商品
     */
    addGoodsComment(data) {
      return minRequest.post('/comment/add', data)
    },

    /**
     * 取消订单操作
     */
    cancelOrder(data){
      return minRequest.post('/order/cancel_order', data)
    },

    /**
     * 确认收货
     */
    overOrder(data){
      return minRequest.post('/order/confirm_order', data)
    },

    /**
     * 订单详情
     * @param data
     * @returns {*}
     */
    orderDetail(data) {
        return minRequest.post('/order/order_details', data)
    },

    /**
     * 删除订单
     */
    delOrder(data) {
      return minRequest.post('/order/del_order', data)
    },

    /**
     * 拼团订单详情
     */
    groupBuyDetail(data) {
      return minRequest.get('/Index/assembleorderInfo', data)
    },

    /**
     * 购物车数量
     */
    getCarNum(data){
      return minRequest.get('/cart/cart_num', data)
    },

    /**
     * 首页的图标
     */
    getHomeIcon(data){
      return minRequest.get('/Index/icon', data)
    },

    /**
     * 意见反馈
     */
    postFeedback(data){
      return minRequest.post('/Index/feedback', data)
    },

    /**
     * 订单退单（单商品），申请
     * @param data
     * @returns {*}
     */
    returnOrderGoodsApply(data){
      return minRequest.post('/refund/apply', data)
    },

    /**
     * 退单详情
     * @param data
     */
    returnOrderStatus(data){
      return minRequest.post('/refund/applyDetails', data)
    },

    /**
     * 查看物流, 快递
     * @param data
     * @returns {*}
     */
    express(data){
      return minRequest.get('/order/getexpress', data)
    },

    /**
     * tab栏 获取分类
     */
    getCategory(data){
      return minRequest.get('/Index/getCategory', data)
    },

    /**
     * tab栏 获取品牌
     */
    getBrand(data){
      return minRequest.get('/Index/getBrand', data)
    },

    /**
     * 首页 推荐 分类商品
     */
    categoryGoods(data){
      return minRequest.get('/Index/category_item', data)
    },

    /**
     * 首页 推荐 hot sale 人气爆款
     */
    explosion(data){
      return minRequest.get('/Index/explosion', data)
    },

    /**
     * 首页 推荐 获取公告
     */
    notice(data){
      return minRequest.get('/Index/notice', data)
    },

    /**
     * 首页 推荐 超级拼团，秒杀 童装 跨境购等
     */
    combination(data){
      return minRequest.get('/Index/combination', data)
    },

    /**
     * 拼团详情页面，获取拼团规则
     */
    assembleRuleInfo(data){
      return minRequest.get('/Index/assemble_rule_info', data)
    },

    /**
     * 分销中心，获取数据
     */
    distribution(data){
      return minRequest.get('/User/getUserRetail', data)
    },

    /**
     * 微信公众号获取 token
     */
    getToken(data){
      return minRequest.get('/Index/getusertoken', data)
    },

    /**
     * 微信公众号绑定手机号
     */
    bindMobilePublic(data){
      return minRequest.post('/Index/bd_mobile', data)
    },

    /**
     * 微信公众号
     * 传入当前页面的url，获取wx.config中的配置参数
     */
    getWxConfig(data){
      return minRequest.post('/Index/getWeChatConfig', data)
    },


    /**
     * 分销中心
     * 分销累积客户列表
     */
    getRetailMember(data){
      return minRequest.get('/Retail/memberList', data)
    },


    /**
     * 分销中心
     * 分销订单列表
     */
    getRetailOrder(data){
      return minRequest.get('/Retail/orderList', data)
    },

    /**
     * 查看身份证认证信息
     */
    getAttestation(data) {
      return minRequest.get('/User/getAttestation', data)
    },

    /**
     * 获取秒杀商品列表
     */
    getSeckillList(data){
      return minRequest.get('/Index/seckillList', data)
    }
  }
}
