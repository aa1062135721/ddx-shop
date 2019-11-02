<script>
    import {mapActions, mapMutations} from 'vuex'

	export default {
		methods: {
			...mapMutations(['setToken']),
            ...mapActions(['asyncGetUserInfo']),
		},
		onLaunch: function() {
			console.log('App Launch')
            try {
                this.setToken('963d7c1f574a8bf947380914ef7d2777b48c18c6e3f0c3eeaf6e138506a6f00f') //保存用户token，并存vuex，永久存储
                this.asyncGetUserInfo() //获取用户数据 并存vuex 临时存储

                const token = uni.getStorageSync('token')
                // if (this.isWechat()){
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
                            let data = {
                                code: code,
                                tuserid: uni.getStorageSync('shareID'),//推荐人id
                            }
                            this.$minApi.getToken(data).then(res => {
                                // TODO 这里需要不需要把用户数据一些数据存下来
                                console.log('服务器返回的数据！', res)
                                if (res.code === 200) {
                                    this.setToken(res.data.token) //保存用户token，并存vuex，永久存储
                                    this.asyncGetUserInfo() //获取用户数据 并存vuex 临时存储
                                }
                            })
                        }
                    }
                // } else {
                //     this.msg('请在微信浏览器中打开')
                // }
            } catch (e) {
                console.log(e)
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
