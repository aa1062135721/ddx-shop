<script>
    import {mapMutations} from 'vuex'

	export default {
		methods: {
			...mapMutations(['setToken', 'setUserInfo'])
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.getStorage({
				key: 'token',
				success: (res) => {
					this.setToken(res.data);
				}
			})
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
