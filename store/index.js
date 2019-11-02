import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    token: '',//永久存储
    userInfo: {},//非永久存储
    shareID: '',//分享者id，如果小程序被张某分享（商品分享和邀请好友）给陈某，陈某打开小程序，注册时带上王某的唯一shareID，陈某就是王某的粉丝 // 永久存储
}

const mutations = {
    setToken(state, saveData = '') {
        try {
            uni.setStorageSync('token', saveData)
            state.token = saveData
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
}

const actions = {
    /**
     * vuex中利用actions，去异步获取用户信息，并存到vuex里
     * @param commit
     * @returns {Promise<void>}
     */
    async asyncGetUserInfo({commit}, token = ''){
        await new Vue().$minApi.getUserInfo().then(res => {
            console.log('vuex中利用actions，去异步获取用户信息，并存到vuex里', res)
            if (res.code === 200) {
                commit('setUserInfo', res.data)
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
