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

<style>
	/*每个页面公共css */

</style>
