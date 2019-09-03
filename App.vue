<script>
    import {mapActions, mapMutations} from 'vuex'

	export default {
		methods: {
			...mapMutations(['setToken', 'setUserInfo']),
            ...mapActions(['saveToken', 'saveUserInfo']),
		},
		onLaunch: function() {
			console.log('App Launch')
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
