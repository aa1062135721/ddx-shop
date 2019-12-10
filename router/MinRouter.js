const toString = Object.prototype.toString

function isObject(value) {
    return toString.call(value) === '[object Object]'
}

function isString(value) {
    return toString.call(value) === '[object String]'
}

function isDefault(value) {
    return value === void 0
}

function openPage(args) {
    let name, query = {},
        queryStr = null,
        path, type, isName = false, login = false

    switch (true) {
        case isObject(args):
            ({
                name,
                query = {}
            } = args)
            break
        case isString(args):
            name = args
            break
        default:
            throw new Error('参数必须是对象或者字符串')
    }

    if (isObject(query)) {
        queryStr = encodeURIComponent(JSON.stringify(query))
        this.$store.commit('setPageChangeParam', query)
    } else {
        throw new Error('query数据必须是Object')
    }
    this.$minRouter.forEach(item => {
        if (item.name === name) {
            path = item.path
            type = item.type || 'navigateTo'
            isName = true
            login = item.login || false
        }
    })

    if (!isName) {
        throw new Error(`没有${name}页面`)
    }

    if (!['navigateTo', 'switchTab', 'reLaunch', 'redirectTo'].includes(type)) {
        throw new Error(`name:${name}里面的type必须是以下的值['navigateTo', 'switchTab', 'reLaunch', 'redirectTo']`)
    }

    if (login) {
        /**
         * 跳转的页面需要登录
         * 如果是小程序，则调到小程序的授权页面
         * 如果是h5（微信公众号），则弹出授权框
         */
        if (!this.$store.state.token) {
            console.log('跳转到的页面需要登录')
            if (this.isWechat()){
                const token = uni.getStorageSync('token')
                if (token) {
                    this.$store.commit('setToken', token) //保存用户token，并存vuex，永久存储
                    this.$store.dispatch('asyncGetUserInfo')//获取用户数据 并存vuex 临时存储
                } else {
                    this.loginWithOfficalAccount()
                    throw new Error(`跳转登录流程`)
                }
            } else {
                this.msg('请在微信浏览器中打开')
                throw new Error(`请在微信浏览器中打开`)
            }
        }
    }

    return new Promise((resolve, reject) => {
        uni[type]({
            url: `/${path}?query=${queryStr}`,
            success: resolve,
            fail: reject,
            complete:()=>{
                const pages = getCurrentPages()
                const curPage = pages[pages.length-1]
                if (
                    [
                        '/',
                        '/pages/goods/detail', // 普通商品
                        '/pages/spike/detail', // 抢购
                        '/pages/group-buy/detail', // 团购
                        '/pages/order/submit', //提交订单页面
                        '/pages2/address/chooses', // 选择收货地址页面
                        '/pages2/address/add', // 新增收货地址页面
                    ].indexOf(curPage.$route.path) === -1
                ) {
                    uni.removeStorageSync('inviteBuy')
                }
            }
        })
    })
}

function parseURL() {
    const query = this.$root.$mp.query.query
    if (query) {
        return JSON.parse(decodeURIComponent(query))
    } else {
        return  this.$store.state.pageChangeParam
    }
}

function install(Vue) {
    Vue.mixin({
        beforeCreate: function () {
            if (!isDefault(this.$options.minRouter)) {
                Vue._minRouter = this.$options.minRouter
            }
        }
    })
    Object.defineProperty(Vue.prototype, '$minRouter', {
        get: function () {
            return Vue._minRouter._router
        }
    })
    Object.defineProperty(Vue.prototype, '$parseURL', {
        get: function () {
            return Vue._minRouter.parseURL
        }
    })
    Object.defineProperty(Vue.prototype, '$openPage', {
        get: function () {
            return Vue._minRouter.openPage
        }
    })
}

function MinRouter(options) {
    if (!(this instanceof MinRouter)) {
        throw Error("MinRouter是一个构造函数，应该用`new`关键字调用")
    }
    isDefault(options) && (options = {})
    this.options = options
    this._router = options.routes || []
}

MinRouter.install = install
MinRouter.prototype.openPage = openPage
MinRouter.prototype.parseURL = parseURL

export default MinRouter
