import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    token: '',
    userInfo: {
        id: 1, // 用户id
        name: '吴黎明'
    },
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
}

const actions = {
    saveUserInfo({commit}, saveData = {}) {
        commit('setUserInfo', saveData)
    },
    saveToken({commit}, saveData = '') {
        commit('setToken', saveData)
    },
}

const getters = {
    userInfo: state => state.userInfo,
    token: state => state.token,
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})
