import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    token: '',//永久存储
    userInfo: {},//非永久存储
    shareID: '',//分享者id，如果小程序被张某分享（商品分享和邀请好友）给陈某，陈某打开小程序，注册时带上王某的唯一shareID，陈某就是王某的粉丝 // 永久存储
    subscribe: 1,//是否关注公众号标识 0是未关注 1是关注  临时存储
    shopID: '',// 注册时，成为该门店的会员 永久存储
    pageChangeParam: {},// 页面之间切换，把参数也存到vuex里
}

const mutations = {
    setToken(state, saveData = '') {
        try {
            uni.setStorageSync('token', saveData)
            state.token = saveData
            // 微信那边授权跳转回来的，携带了code
            // https://ddxm661.com/h5/?code=23412341asdfasdf1341d&state=1#/pages/goods/detail?id=1140
            // 把用户token存好了后，重定向一下，解决地址栏中有code, 支付出现页面未注册的情况。
            window.location.href = window.location.href.substring(0, window.location.href.indexOf('h5/') + 3) + window.location.href.substring(window.location.href.indexOf('#/'), window.location.href.length)
        } catch (e) {
            console.log("vuex设置用户token的时报错：", e)
        }
    },
    setUserInfo(state, saveData = {}) {
        state.userInfo = saveData
    },
    setShareID(state, saveData = '') {
        try {
            uni.setStorageSync('shareID', saveData)
            state.shareID = saveData
        } catch (e) {
            console.log("vuex保存推荐人id报错", e)
        }
    },
    setSubscribe(state, saveData = 0) {
        state.subscribe = saveData
    },
    setShopID(state, saveData = '') {
        try {
            uni.setStorageSync('shopID', saveData)
            state.shopID = saveData
        } catch (e) {
            console.log("vuex保存门店id报错", e)
        }
    },
    setPageChangeParam(state, saveData = {}){
        state.pageChangeParam = saveData
    },
}

const actions = {
    /**
     * vuex中利用actions，去异步获取用户信息，并存到vuex里
     * @param commit
     * @returns {Promise<void>}
     */
    async asyncGetUserInfo({commit}){
        let _that =  new Vue()
        await _that.$minApi.getUserInfo().then(async res => {
            console.log('vuex中利用actions，去异步获取用户信息，并存到vuex里', res)
            if (res.code === 200) {
                await commit('setUserInfo', res.data)
                await commit('setSubscribe', 1)
            }
        }).catch(e => {
            console.log('vuex中利用actions，去异步获取用户信息，并存到vuex里', e)
        })
    },
}

const getters = {

}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})
