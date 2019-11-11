<script>
    import {mapState, mapActions, mapMutations} from 'vuex'

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
        // uniqueId : '5ccb3020bbf4693783745351', //网站会员唯一ID，请不要超过64个字符
    });

	export default {
        computed: {
            ...mapState(['userInfo'])
        },
		methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
			...mapMutations(['setToken', 'setSubscribe', 'setUserInfo', 'setShopID']),
            ...mapActions(['asyncGetUserInfo']),
		},
		onLaunch: function() {
			console.log('App Launch')
            // ios 进入应用就要配置微信sdk
            if(this.getPlatform().isIOS){
                let url = encodeURIComponent(window.location.href)
                this.$minApi.getWxConfig({url}).then(res => {
                    if (res.code === 200) {
                        this.$wx.config({
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
                        this.$wx.error((res) => {
                            this.msg(res)
                        })
                    }
                })
            }

            try {
                // this.setToken('e245245f2f1648314bd5373b5c9e19add2808cf5344b5acf16b85857a9c43092')
                const token = uni.getStorageSync('token')
                if (token) {
                    this.setToken(token)
                    this.asyncGetUserInfo()
                    this.setSubscribe(1)
                } else {
                    let code = this.getUrlParam("code") //是否存在code
                    if (code == null || code === "") {
                        //不存在就打开上面的地址进行授权
                        this.loginWithOfficalAccount()
                    } else {
                        //存在则通过code传向后台
                        let data = { code: code, }
                        this.$minApi.getToken(data).then(res => {
                            console.log('服务器返回的数据！', res)
                            /**
                             *  把用户是否关注公众号保存下来，在商品详情
                             */
                            this.setSubscribe(res.data.subscribe)
                            /**
                             * 用户绑定手机号，能获取到用户信息，这时候用户登录成功了
                             */
                            if (res.code === 200 &&
                                res.data.token &&
                                res.data.isbindMobile === 1){
                                this.setToken(res.data.token) //保存用户token，并存vuex，永久存储
                                this.asyncGetUserInfo() //获取用户数据 并存vuex 临时存储
                            }
                            /**
                             * 用户关注了公众号，没有绑定手机号，能获取到用户信息，这时候需要跳转到绑定手机号页面
                             */
                            if (res.data.isbindMobile === 0 &&
                                res.data.subscribe === 1) {
                                this._goPage('login-with-mobile-public', {member: JSON.parse(res.data.member)})
                            }
                        }).catch(err => {
                            console.log('服务器返回的数据！', err)
                            this.setToken() // 清空用户token
                            this.setUserInfo() // 清空用户数据
                            this.setSubscribe() // 清空用户是否关注公众号数据
                            this.setShopID() // 清空保存的门店数据
                        })
                    }
                }
            } catch (e) {
                console.log(e)
                this.setToken() // 清空用户token
                this.setUserInfo() // 清空用户数据
                this.setSubscribe() // 清空用户是否关注公众号数据
                this.setShopID() // 清空保存的门店数据
            }
		},
		onShow: function() {
			console.log('App Show')
            if (this.userInfo.id) {
                _AIHECONG('update',{ entId : '15463', uniqueId : this.userInfo.id });
            }
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	/*每个页面公共css */
    page {
        background-color: $background-color;
    }
    view,
    scroll-view,
    swiper,
    swiper-item,
    cover-view,
    cover-image,
    icon,
    text,
    rich-text,
    progress,
    button,
    checkbox,
    form,
    input,
    label,
    radio,
    slider,
    switch,
    textarea,
    navigator,
    audio,
    camera,
    image,
    video {
        box-sizing: border-box;
    }
</style>
