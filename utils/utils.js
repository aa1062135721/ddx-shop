import * as Constant from '../utils/constant'

exports.install = function (Vue, options) {
    //判断是否为空
    Vue.prototype.isEmpty = (value, title = '') => {
        if(typeof value === "undefined" || value === null || value === "" || value.trim().length === 0){
            if (title) {
                Vue.prototype.msg(title)
            }
            return false
        } else {
            return true
        }
    }

    //全局函数，判断是否位手机号码
    Vue.prototype.isPoneAvailable = (mobile, flag = false) => {
        if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(mobile)) {
            if (flag) {
                Vue.prototype.msg('手机号码格式有误')
            }
            return false
        } else {
            return true
        }
    }

    /**
     *
     * @param title
     * @param duration
     * @param mask
     * @param icon [success,loading,none]
     */
    Vue.prototype.msg = (title, duration = 1500, mask = false, icon = 'none') =>{
        if(Boolean(title) === false){
            return
        }
        uni.showToast({
            title,
            duration,
            mask,
            icon
        })
    }

    /***
     * 深复制一个对象
     * @param p
     * @param c
     * @returns {*|{}}
     */
    Vue.prototype.deepCopy = (obj, c) => {
        // 只拷贝对象
        if (typeof obj !== 'object') return
        // 根据obj的类型判断是新建一个数组还是一个对象
        let newObj = obj instanceof Array ? [] : {}
        for (let key in obj) {
            // 遍历obj,并且判断是obj的属性才拷贝
            if (obj.hasOwnProperty(key)) {
                // 判断属性值的类型，如果是对象递归调用深拷贝
                newObj[key] = typeof obj[key] === 'object' ? Vue.prototype.deepCopy(obj[key]) : obj[key]
            }
        }
        return newObj
    }

    /**
     * 如果富文本框里只有图片，并且图片没有设置style和宽度/高度
     * @param html
     * @returns {void | string | never}
     */
    Vue.prototype.formatRichText = (html) => {
        return html.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;"')
    }

    /**
     * 处理富文本里的图片宽度自适应
     * 1.去掉img标签里的style、width、height属性
     * 2.img标签添加style属性：max-width:100%;height:auto
     * 3.修改所有style里的width属性为max-width:100%
     * 4.去掉<br/>标签
     * @param html
     * @returns {void|string|*}
     */
    Vue.prototype.formatRichText2 = (html) => {
        let newContent= html.replace(/<img[^>]*>/gi, function(match,capture){
            match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
            match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
            match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
            return match;
        });
        newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
            match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
            return match;
        });
        newContent = newContent.replace(/<br[^>]*\/>/gi, '');
        newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
        return newContent;
    }


    /**
     * 判断是否为公众号环境
     * @returns {boolean}
     */
    Vue.prototype.isWechat = () => {
        return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger"
    }

    /**
     * 判断公众号截取code
     * @param name
     * @returns {string|null}
     */
    Vue.prototype.getUrlParam = (name) => {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
        let r = window.location.search.substr(1).match(reg)
        if (r != null) {
            return unescape(r[2])
        }
        return null
    }

    /**
     * 微信公众号重定向
     */
    Vue.prototype.loginWithOfficalAccount = () => {
        let appId = Constant[Constant.NODE_ENV].appId
        let local = window.location.href //回调地址
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
    }

    /***
     * 处理传进来的时间戳，返回的时间格式为 2017-12-11
     * 如果传入flag参数，返回的时间格式为 2019年11月11日
     */
    Vue.prototype.timstampToDate = (timstamp, flag) => {
        let time = new Date(timstamp)
        let y = time.getFullYear()
        let m = time.getMonth() - 0 + 1
        let d = time.getDate()
        m = (m + '').length === 1 ? '0' + m : m
        d = (d + '').length === 1 ? '0' + d : d
        if (flag) {
            return y + '年' + m + '月' + d + '日'
        } else {
            return y + '-' + m + '-' + d
        }
    }

    /**
     * 返回一对日期
     * {
     *      start_date: '2019-11-11'，// 开始日期
     *      end_date: '2019-11-18' // 结束日期
     * }
     */
    Vue.prototype.getStartDateAndEndDate = (flat) => {
        let returnData = {
            start_date: '',
            end_date: '',
        }
        switch (flat) {
            case 'yesterday': // 昨日
                returnData.start_date = Vue.prototype.timstampToDate(new Date().getTime() - 24 * 60 * 60 * 1000)
                returnData.end_date = Vue.prototype.timstampToDate(new Date().getTime() - 24 * 60 * 60 * 1000)
                break
            case 'today': // 今日
                returnData.start_date = Vue.prototype.timstampToDate(new Date().getTime())
                returnData.end_date = returnData.start_date
                break
            case 'thisWeek': // 本周
                let oneDayLong = 24 * 60 * 60 * 1000
                let now = new Date()
                let mondayTime = now.getTime() - (now.getDay() - 1) * oneDayLong
                let sundayTime = now.getTime() + (7 - now.getDay()) * oneDayLong
                returnData.start_date = Vue.prototype.timstampToDate(new Date(mondayTime).getTime())
                returnData.end_date = Vue.prototype.timstampToDate(new Date(sundayTime).getTime())
                break
            case 'near7Days': // 近7日
                returnData.start_date = Vue.prototype(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                returnData.end_date = Vue.prototype(new Date().getTime())
                break
            case 'near30Days': // 近30日
                returnData.start_date = Vue.prototype(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
                returnData.end_date = Vue.prototype(new Date().getTime())
                break
        }
        return returnData
    }

    /**
     * 当前的平台是Android还是ios
     * @returns {{isAndroid: boolean, isIOS: boolean}}
     */
    Vue.prototype.getPlatform = () => {
        // 判断浏览器是 Android端 or IOS端
        let userAgent = navigator.userAgent
        let isAndroid = userAgent.indexOf("Android") > -1 || userAgent.indexOf("Adr") > -1
        let isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        return {
            isAndroid,
            isIOS,
        }
    }

    /**
     *  非ios设备，切换路由时候进行重新签名
     */
    Vue.prototype.wxConfig = async () => {
        //因为问题1，所以我们要在IOS端进入项目时，记住第一次进来的url地址，供签名使用
        let that = new Vue()
        let url = encodeURIComponent(window.location.href)
        await that.$minApi.getWxConfig({url}).then(async res => {
            if (res.code === 200) {
                await that.$wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
                    appId: res.data.appid, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                    signature: res.data.signature,// 必填，签名，见附录1
                    jsApiList: [
                        // 注意：使用新版本的分享功能，一定要在该列表加上对应的老版本功能接口，否则新接口不起作用
                        'updateTimelineShareData', //1.4.0的 分享到朋友圈
                        'onMenuShareTimeline', //老版本 分享到朋友圈
                        'updateAppMessageShareData',//1.4.0分享到朋友
                        'onMenuShareAppMessage',//老版本分享到朋友
                        'chooseWXPay',//支付
                    ]
                })
                await that.$wx.error((res) => {
                    that.msg(res)
                })
            }
        })
    }

    /**
     * @param param1 分享到朋友
     * @param param2 分享到朋友圈
     */
    Vue.prototype.wxConigShareGoods = async (param1 = {}, param2 = {}) => {
        let that = new Vue()
        await setTimeout(async () => {
            await that.$wx.ready(async () => {
                //分享到朋友
                await that.$wx.updateAppMessageShareData(param1)
                // 分享到朋友圈
                await that.$wx.updateTimelineShareData(param2)
            })
        }, 1000)
    }
}
