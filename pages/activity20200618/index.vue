<template>
	<div class="container">
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
			<image src="http://picture.ddxm661.com/d0a7a202006011423478241.png"></image>
			<image src="http://picture.ddxm661.com/a916e202006011423569255.png"  @click="_receive({id:5065})"></image>
			<image src="http://picture.ddxm661.com/cb748202006011424048270.png"  @click="_receive({id:456})"></image>
			<image src="http://picture.ddxm661.com/15bec202006011424106744.png"></image>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				text:"注：本次活动特价产品除外，在法律范围内最终解释权归重庆捣蛋熊科技有限公司所有",
			}
		},
		methods:{
			show(){
				var that = this
				const interval = setInterval( ()=>{
					var start = that.text.substring(0,1);
					var end = that.text.substring(1);
					that.text =  end + start 
				},500)
			},
			_receive(index){
				var data = index.id
				this.$minApi.coupon("data").then(res => {
					console.log(res)
				})
			}
		},
		onLoad(){
			this.show()
		}
	}
</script>

<style lang="scss">
	uni-page-body{
		height: 100%;
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
			margin: 10rpx;
		}
	}
</style>
