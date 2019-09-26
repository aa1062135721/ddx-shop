import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    token: '',
    userInfo: {
        // id: 1, // 用户id
        // name: '吴黎明'
    },
    shareID:'',//分享者id，如果小程序被张某分享（商品分享和邀请好友）给陈某，陈某打开小程序，注册时带上王某的唯一shareID，陈某就是王某的粉丝
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
        try {
            uni.setStorageSync('userInfo', saveData)
            state.userInfo = saveData
        } catch (e) {
            console.log("vuex设置用户userInfo的时报错：", e)
        }
    },
    setShareID(state, saveData = '') {
        try {
            uni.setStorageSync('shareID', saveData)
            state.shareID = saveData
        } catch (e) {
            console.log("vuex设置用户userInfo的时报错：", e)
        }
    },
}

const actions = {
    saveUserInfo({commit}, saveData = {}) {
        commit('setUserInfo', saveData)
    },
    saveToken({commit}, saveData = '') {
        commit('setToken', saveData)
    },
    saveShareID({commit}, saveData = '') {
        commit('setShareID', saveData)
    },
}

const getters = {
    userInfo: state => state.userInfo,
    token: state => state.token,
    shareID: state => state.shareID,
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})
