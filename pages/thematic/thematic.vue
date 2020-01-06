<template>
	<view class="container" style="background-color: #F0000B;">
		<!-- #ifdef H5 -->
		<div id="my-h5-back" @click="_goBack"></div>
		<!-- #endif -->
		<div class="banner"></div>
		<div class="time">距离活动结束仅有 <span class="timeS">{{timer.d}}</span>天<span class="timeS">{{timer.h}}</span>:<span class="timeS">{{timer.m}}</span>:<span
			 class="timeS">{{timer.s}}</span>
		</div>
		<div class="content-nav" :class="isFix ? 'fix' : '' ">
			<div class="nav-item" :style="reqData.type == 0 ? {color:active,fontWeight:400} : ''" @click="change(0)">口腔清洁</div>
			<div class="nav-item" :style="reqData.type == 1 ? {color:active,fontWeight:400} : ''" @click="change(1)">洗护品</div>
			<div class="nav-item" :style="reqData.type == 2 ? {color:active,fontWeight:400} : ''" @click="change(2)">卫生巾</div>
			<div class="nav-item" :style="reqData.type == 3 ? {color:active,fontWeight:400} : ''" @click="change(3)">唇膏</div>
		</div>
		<div class="content">
			<div class="ad"></div>
			<div class="item" v-for="(item,index) in shopList" :key="index" @click="_goPage('goods_detail', {id: item.item_id})">
				<image :src="item.url" mode="widthFix" class="item-img"></image>
			</div>
		</div>
	</view>
</template>

<script>
	let myTimer = null;
	export default {
		data() {
			return {
				timer:{},
				shopList:[],
				reqData:{
					type:1
				},
				scrollTop:0,
				active:'#F0000B',
				isFix:false
			}
		},
		watch:{
			scrollTop(){
				if(this.scrollTop >= 350){
					this.active = '#F0000B'
				}else{
					this.active = '#F0000B'
				}
				
				if(this.scrollTop >= 350 && this.shopList.length > 4){
					this.isFix = true
				}else {
					this.isFix = false
				}
			}
		},
		onLoad() {
			this._getList();
			this.getRTime();
			this.$nextTick(()=>{
				myTimer = setInterval(()=>{
					this.getRTime()
				},1000)
			})
		},
		onUnload(){
		    clearInterval(myTimer)
		    myTimer = null
		},
		onPageScroll(res){
			console.log("距离",res.scrollTop);// 距离页面顶部距离
			this.scrollTop = res.scrollTop
		},
		methods: {
			getRTime() {
				let time_distance = 0 //时间差
				let now_time = (new Date()).getTime()
				let end_time = (new Date('2020/1/12 23:59:59')).getTime()
				time_distance = end_time - now_time

				    let int_day, int_hour, int_minute, int_second
				    // 天时分秒换算
				    int_day = Math.floor(time_distance/86400000)
				    time_distance -= int_day * 86400000;
				    int_hour = Math.floor(time_distance/3600000)
				    time_distance -= int_hour * 3600000;
				    int_minute = Math.floor(time_distance/60000)
				    time_distance -= int_minute * 60000;
				    int_second = Math.floor(time_distance/1000)

				    // 时分秒为单数时、前面加零站位
				    if(int_hour < 10)
				        int_hour = "0" + int_hour
				    if(int_minute < 10)
				        int_minute = "0" + int_minute
				    if(int_second < 10)
				        int_second = "0" + int_second
				    this.timer =  {
				        d: int_day,
				        h: int_hour,
				        m: int_minute,
				        s: int_second,
				    }
			},
			
			_getList(){
				this.$minApi.thematicList(this.reqData).then(res=>{
					if(res.code == 200){
						this.shopList = res.data
					}
				})
			},
			
			change(idx){
				this.reqData.type = idx
				this._getList();
			},
			
			_goPage(url, query = {}) {
				this.$openPage({
					name: url,
					query
				})
			},
			
			_goBack() {
			      if (getCurrentPages().length === 1) {
			      	this._goPage('home')
			      } else {
			      	uni.navigateBack()
			      }
			}
		}
	}
</script>

<style lang="scss">
	.container {
		.banner {
			height: 517upx;
			background: url(../../static/images/thematic/thematicBanner.jpg);
			background-size: 100% 100%;
		}

		.time {
			line-height: 88upx;
			background-color: #FFFCE7;
			color: #222222;
			font-size: 26upx;
			text-align: center;

			.timeS {
				display: inline-block;
				width: 44upx;
				line-height: 44upx;
				text-align: center;
				background-color: #222222;
				color: #ffffff;
				border-radius: 8upx;
				margin: 0 6upx;
			}
		}
		.content-nav {
			width: 690upx;
			height: 98upx;
			border-radius: 8upx;
			margin: 30upx auto;
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: #666666;
			font-size: 32upx;
			background-color: #FFFFFF;
			&.fix {
				width: 100%;
				position: fixed;
				top: 0;
				z-index: 999;
				margin: 0;
				background-color: rgb(250,217,169);
				border-radius: 0;
				color: #333333;
			}
		}
		.content {
			background-color: #F0000B;
			padding: 40upx 30upx;
			.ad {
				height: 88upx;
				background: url(../../static/images/thematic/ad.png);
				background-size: 100% 100%;
				margin-bottom: 32upx;
			}

			.item {
				display: inline-block;
				width: 345upx;
				height: 456upx;
				margin-bottom: 16upx;

				.item-img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
