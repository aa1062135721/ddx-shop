<script>
    import {mapActions, mapMutations} from 'vuex'

	export default {
		methods: {
			...mapMutations(['setToken', 'setUserInfo']),
            ...mapActions(['saveToken', 'saveUserInfo']),
            // 判断公众号截取code
            getUrlParam(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return unescape(r[2]);
                }
                return null;
            }
		},
		onLaunch: function() {
			console.log('App Launch')
            console.log("回调地址（当前网页的地址）: window.location.href", window.location.href)
            try {
                const token = uni.getStorageSync('token');
                if (token) {
                    this.saveToken(token);
                    this.$minApi.getUserInfo().then(res => {
                      if (res.code === 200) {
                          this.saveUserInfo(res.data)
                      }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            } catch (e) {
                // error
            }

            if (this.isWechat()){
                console.log('当前是公众号的环境')
                let appid = "wxb5ee49b69efc2429"; //为测试号id
                let code = this.getUrlParam("code"); //是否存在code
                console.log("获取本地的code: ", code);
                let local = window.location.href;
                console.log("回调地址（当前网页的地址）: ", local);

                if (code == null || code === "") {
                    //不存在就打开上面的地址进行授权
                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
                } else {
                    //存在则通过code传向后台调用接口返回微信的个人信息
                }
            } else {
                console.log('请在微信浏览器中打开')
            }
		},
		onShow: function() {
			console.log('App Show')
            let _that = this
            uni.getNetworkType({
                success: function (res) {
                    console.log(res.networkType)
                    if (res.networkType === 'none') {
                        _that.msg('请检查您的网络状态')
                    }
                }
            });
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
