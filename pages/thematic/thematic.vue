<template>
	<view class="container">
		<div class="banner"></div>
		<div class="time">距离每周专场 基地直供结束仅有 <span class="timeS">{{timer.d}}</span>天<span class="timeS">{{timer.h}}</span>:<span class="timeS">{{timer.m}}</span>:<span
			 class="timeS">{{timer.s}}</span></div>
		<div class="content">
			<div class="content-nav">
				<div class="nav-item" :class="reqData.type == 0 ? 'active' : ''" @click="change(0)">口腔清洁</div>
				<div class="nav-item" :class="reqData.type == 1 ? 'active' : ''" @click="change(1)">洗护品</div>
				<div class="nav-item" :class="reqData.type == 2 ? 'active' : ''" @click="change(2)">卫生巾</div>
				<div class="nav-item" :class="reqData.type == 3 ? 'active' : ''" @click="change(3)">唇膏</div>
			</div>
			<div class="ad"></div>
			<div class="item" v-for="(item,index) in shopList" :key="index" @click="_goPage('goods_detail', {id: item.item_id})">
				<image :src="item.url" mode="widthFix" class="item-img"></image>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:{},
				shopList:[],
				reqData:{
					type:1
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

		.content {
			background-color: #F0000B;
			padding: 40upx 30upx;

			.content-nav {
				width: 690upx;
				height: 98upx;
				border-radius: 8upx;
				margin-bottom: 40upx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				color: #666666;
				font-size: 32upx;
				background-color: #FFFFFF;

				.nav-item {
					&.active {
						color: #F0000B;
						font-weight: 400;
					}
				}
			}

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
