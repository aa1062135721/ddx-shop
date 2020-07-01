<template>
	<div class="container">
		<div id="my-h5-back" @click="_goBack"></div>
		<div class="title">
			<image src="http://picture.ddxm661.com/1e43a202006011200357230.PNG" style="width: 100%; height: 600rpx;"></image>
		</div>
		<div class="section">
			<div class="icon_voice_bg">
				<image src="http://picture.ddxm661.com/3b340202006011341326738.png"></image>
			</div>
			<span>{{text}}</span>
		</div>
		<div class="section_1">
			<image src="http://picture.ddxm661.com/d0a7a202006011423478241.png" @click="_goPage('spike_detail', {seckill_id: 2677,item_id: 6336})"></image>
			  <!-- <image src="http://picture.ddxm661.com/5b32b2020053009080530.png" @click="_goPage('spike_detail', {seckill_id: 2642,item_id: 5964})" :lazy-load="true" class="S_img"></image> -->
			<image src="http://picture.ddxm661.com/a916e202006011423569255.png"></image>
			<image src="http://picture.ddxm661.com/cb748202006011424048270.png" @click="_receive(25)"></image>
			<image src="http://picture.ddxm661.com/c8b70202006031700511145.png" @click="_receive(23)"></image>
			<image src="http://picture.ddxm661.com/74bb5202006031700578796.png" @click="_receive(24)"></image>
		</div>
	</div>
</template>
 
<script>
	import { mapState } from 'vuex'
	import {collectCoupon} from '../../api/api.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	
	export default{
		data(){
			return{
				text:"注：本次活动特价产品除外，在法律范围内最终解释权归重庆捣蛋熊科技有限公司所有 。 ",
			}
		},
		methods:{
			// 文字跑马灯
			show(){
				var that = this
				const interval = setInterval( ()=>{
					var start = that.text.substring(0,1);
					var end = that.text.substring(1);
					that.text =  end + start 
				},200)
			},
			// 满减
			_receive(id){
				this.$minApi.collectCoupon({id}).then(res => {
					uni.showToast({title: res.msg, duration: 1500, mask: false, icon: 'none'})	
					setTimeout(()=>{
						if(!this.$store.state.token){
							uni.switchTab({
								url:"/pages/tabs/mine"
							})
						}
					},500)
				})
			},
			_goPage(url, query = {}) {
			    this.$openPage({
			        name: url,
			        query
			  })
			},
			// 返回按钮
			_goBack() {
			   this.$router.replace('/')
			},
		},
		computed:{
			...mapState(['userInfo']),
		},
		async onLoad(){
			this.show();
			await this.wxConfig();
			let url = `https://www.ddxm661.com/h5/#/pages/activity20200618/index`
			if (this.userInfo.id) {
			    url += `?user_id=${this.userInfo.id}`
			}
			const param1 = {
			        title: '捣蛋熊商城-618', // 分享标题
			        desc: '祝朋友们节日快乐', // 分享描述
			        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			        imgUrl: `http://picture.ddxm661.com/1d783202006021453146538.PNG`, // 分享图标
			        success: function() {}
			    },
			    param2 = {
			        title: '捣蛋熊商城-618', // 分享标题
			        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			        imgUrl: `http://picture.ddxm661.com/1d783202006021453146538.PNG`, // 分享图标
			        success: function() {}
			    }
			await this.wxConigShareGoods(param1, param2)
		}
	}
</script>

<style lang="scss">
	uni-page-body{
		height: 100%;
	}
	#my-h5-back{
	    position: fixed;
	}
	.container{
		width: 100%;
		background-image: url(http://picture.ddxm661.com/0817d20200601120022176.png);
	}
	.section{
			margin: auto;
			width: 90%;
			height: 80rpx;
			background-color: #FFF;
			position: relative;
			border-radius:17rpx;
			padding-left:110rpx;
			box-sizing: border-box;
			line-height: 80rpx;
			overflow: hidden;
			background-color: #FFF4E9;
			span{
				font-size: 32rpx;
				color: #F200F2;
			}
			.icon_voice_bg{
				width:80rpx ;
				height: 80rpx;
				background: #FFEDDB;
				position: absolute;
				top: 0;
				left: 0;
				border-radius:17rpx 0 0 17rpx;
				// border-right: 2px solid #ccc;
				box-shadow: 6rpx 6rpx 6rpx #989898;
				image{
					width: 80rpx;
					height: 80rpx;
				}
			}	
		}
	.section_1{
		padding-bottom:20rpx;
		margin-top: 20rpx;
		width: 100%;
		text-align: center;
		image{
			width: 90%;
			height: 180rpx;
			margin: 5rpx;
		}
	}
</style>
