<script>
    import {mapActions, mapMutations} from 'vuex'

	export default {
		methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
			...mapMutations(['setToken', 'setSubscribe', 'setUserInfo']),
            ...mapActions(['asyncGetUserInfo']),
		},
		onLaunch: function() {
			console.log('App Launch')
            try {
                // this.setToken('4843b4e1c60c251e9e62e705a76c9a366d57f9807a9085c853b865cd1600049c')
                const token = uni.getStorageSync('token')
                if (token) {
                    this.setToken(token)
                    this.asyncGetUserInfo()
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
                                res.data.token !== "0" &&
                                res.data.isbindMobile === 1){
                                this.setToken(res.data.token) //保存用户token，并存vuex，永久存储
                                this.asyncGetUserInfo() //获取用户数据 并存vuex 临时存储
                            }
                            /**
                             * 用户关注了公众号，没有绑定手机号，能获取到用户信息，这时候需要跳转到绑定手机号页面
                             */
                            if (res.data.isbindMobile === 0 &&
                                res.data.subscribe === 1) {
                                this._goPage('login-with-mobile-public', {member: res.member})
                            }
                        }).catch(err => {
                            console.log('服务器返回的数据！', err)
                            this.setToken() // 清空用户token
                            this.setUserInfo() // 清空用户数据
                        })
                    }
                }
            } catch (e) {
                console.log(e)
                this.setToken() // 清空用户token
                this.setUserInfo() // 清空用户数据
            }
		},
		onShow: function() {
			console.log('App Show')
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
