<template>
	<div class="box">
		<!-- #ifdef H5 -->
		<div id="my-h5-back" @click="_goBack"></div>
		<!-- #endif -->

		<div class="banner">
			<img src="http://picture.ddxm661.com/69c64202007111348402164.png">
		</div>
		<div class="hot-box" >
			<div :class="searchBarFixed ? 'isFixed' :''">
				<div class="title-box" style="text-align: center; ">
					<image src="http://picture.ddxm661.com/c4a2f202007111349275830.png" style="width: 704rpx; height: 88rpx;"></image>
				</div>
				<div class='price_nav' style="display: flex;">
					<view style="display: flex;" @click="_goGoods(1)" class="item">
						<image :src="flag == 1?'http://picture.ddxm661.com/9c666202007111433485933.png':'http://picture.ddxm661.com/85ed5202007111433481176.png'" ></image>
						<view style="color: #C2C2C2; font-size: 32rpx;">9.9</view>
					</view>
					<view style="display: flex;" @click="_goGoods(2)" class="item">
						<image :src="flag == 2?'http://picture.ddxm661.com/9c666202007111433485933.png':'http://picture.ddxm661.com/85ed5202007111433481176.png'" ></image>
						<view style="color: #C2C2C2; font-size: 32rpx;">19.9</view>
					</view>
					<view style="display: flex;" @click="_goGoods(3)" class="item">
						<image :src="flag == 3?'http://picture.ddxm661.com/9c666202007111433485933.png':'http://picture.ddxm661.com/85ed5202007111433481176.png'" ></image>
						<view style="color: #C2C2C2; font-size: 32rpx;">29.9</view>
					</view>
					<view style="display: flex;" @click="_goGoods(4)" class="item">
						<image :src="flag == 4?'http://picture.ddxm661.com/9c666202007111433485933.png':'http://picture.ddxm661.com/85ed5202007111433481176.png'"></image>
						<view style="color: #C2C2C2; font-size: 32rpx;">39.9</view>
					</view>
				</div>
			</div>
		</div>
		<div class="goods-list" id="t1" :style="{'padding-top': searchBarFixed ? '88px' : '0'}">
			<div class="goods-title-box" style="text-align: center;">
				<image src="http://picture.ddxm661.com/3ae7f202007111357099761.png" style="width: 694rpx; height: 35rpx; margin: 40rpx 0 20rpx 0;"></image>
			</div>
			<div class="goods-box-items">
				<image src="http://picture.ddxm661.com/84630202007111358132984.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2771,item_id: 2718})"></image>
				<image src="http://picture.ddxm661.com/d2608202007111358321004.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2772,item_id: 6336})"></image>
				<image src="http://picture.ddxm661.com/c4cc4202007111358327269.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2773,item_id: 6610})"></image>
				<image src="http://picture.ddxm661.com/ed091202007111358327058.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2774,item_id: 6614})"></image>
				<image src="http://picture.ddxm661.com/d74ec202007111359242243.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2775,item_id: 6611})"></image>
				<image src="http://picture.ddxm661.com/ae785202007111359247921.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2776,item_id: 6615})"></image>
				<image src="http://picture.ddxm661.com/337f2202007111400008949.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2777,item_id: 6098})"></image>
				<image src="http://picture.ddxm661.com/e287d202007111400004783.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2778,item_id: 2269})"></image>
			</div>
		</div>
		<div>
			<div class="goods-list" id="t2">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/37626202007111409093490.png" style="width: 694rpx; height: 35rpx; margin: 40rpx 0 20rpx 0;" @click="goSearch('爱他美')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/2120f202007111409466847.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2779,item_id: 6612})"></image>
					<image src="http://picture.ddxm661.com/fcd38202007111409468255.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2780,item_id: 6613})"></image>
					<image src="http://picture.ddxm661.com/76689202007111409469360.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2781,item_id: 5796})"></image>
					<image src="http://picture.ddxm661.com/b39d7202007111409462150.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2782,item_id: 6109})"></image>
					<image src="http://picture.ddxm661.com/b9597202007111409461371.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2783,item_id: 5746})"></image>
					<image src="http://picture.ddxm661.com/3bed3202007111411044933.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2784,item_id: 6437})"></image>
					<image src="http://picture.ddxm661.com/fef7520200711141104822.png" :lazy-load="true" class="S_img"  @click="_goPage('spike_detail', {seckill_id: 2785,item_id: 6084})"></image>
					<image src="http://picture.ddxm661.com/79979202007111411042333.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2786,item_id: 6616})"></image>					
					<image src="http://picture.ddxm661.com/f547c202007111411042252.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2787,item_id: 6803})"></image>
					<image src="http://picture.ddxm661.com/2bca0202007111411043050.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2788,item_id: 4402})"></image>
					<image src="http://picture.ddxm661.com/5ff42202007111413548806.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2789,item_id: 6628})"></image>
					<image src="http://picture.ddxm661.com/8d47e202007111413543982.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2790,item_id: 5906})"></image>
					<image src="http://picture.ddxm661.com/7a6ec202007111413549514.png" :lazy-load="true" class="S_img" @click="_goPage('spike_detail', {seckill_id: 2791,item_id: 6687})"></image>
				</div>
			</div>
			<!-- 尤妮佳 -->
			<div class="goods-list" id="t3">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/e8b34202007111417087865.png" style="width: 694rpx; height: 35rpx; margin: 40rpx 0 20rpx 0;" @click="goSearch('尤妮佳')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/4c82c202007111417087697.png" @click="_goPage('spike_detail', {seckill_id: 2792,item_id: 5828})" :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/6f624202007111417082186.png" @click="_goPage('spike_detail', {seckill_id: 2793,item_id: 5106})" :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/5bdc7202007111417088803.png" @click="_goPage('spike_detail', {seckill_id: 2794,item_id: 5867})" :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/3111e202007111417081460.png" @click="_goPage('spike_detail', {seckill_id: 2795,item_id: 5071})" :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/f444d202007111418249106.png" @click="_goPage('spike_detail', {seckill_id: 2796,item_id: 6439})" :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/3d62a20200711141824444.png"  @click="_goPage('spike_detail', {seckill_id: 2797,item_id: 6802})"  :lazy-load="true" class="S_img"></image>					 
					 <image src="http://picture.ddxm661.com/3b4b6202007111418242932.png" @click="_goPage('spike_detail', {seckill_id: 2798,item_id: 5469})" :lazy-load="true" class="S_img"></image>
					 <image src="http://picture.ddxm661.com/ed5c0202007111418244444.png" @click="_goPage('spike_detail', {seckill_id: 2799,item_id: 5116})" :lazy-load="true" class="S_img"></image>
					 <image src="http://picture.ddxm661.com/1673a202007111418247886.png" @click="_goPage('spike_detail', {seckill_id: 2800,item_id: 2950})" :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- A2 -->
			<div class="goods-list" id="t4" style='padding-bottom: 20rpx;'>
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/574612020071114202332.png" style="width: 694rpx; height: 35rpx; margin: 40rpx 0 20rpx 0;" @click="goSearch('A2')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/f6e20202007111420514532.png" @click="_goPage('spike_detail', {seckill_id: 2801,item_id: 5414})" :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/5a0fd202007111420519874.png" @click="_goPage('spike_detail', {seckill_id: 2802,item_id: 2932})" :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/80a57202007111420513030.png" @click="_goPage('spike_detail', {seckill_id: 2803,item_id: 6801})" :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/0c7e0202007111420516962.png" @click="_goPage('spike_detail', {seckill_id: 2804,item_id: 6375})" :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/6888a202007111420515494.png" @click="_goPage('spike_detail', {seckill_id: 2805,item_id: 6273})" :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/a7c3e202007111422098264.png" @click="_goPage('spike_detail', {seckill_id: 2806,item_id: 5901})" :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/7b51020200711142209955.png"  @click="_goPage('spike_detail', {seckill_id: 2807,item_id: 6207})"  :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/c3184202007111422094348.png" @click="_goPage('spike_detail', {seckill_id: 2808,item_id: 5813})" :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/5d24b202007111422099026.png" @click="_goPage('spike_detail', {seckill_id: 2809,item_id: 6067})" :lazy-load="true" class="S_img"></image>
				</div>
			</div>
		</div>
		<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import backTop from '@/components/back-top/back-top.vue'
	export default {
		data() {
			return {
				tabIndex: 0,
				scroll: '',
				searchBarFixed: false,
				flag: 1,
                scrollVal: 0,
                scrollIndex: 1,
				// 回到顶部
				backTop: {
					src: '../../static/back-top/backtop.png',
					scrollTop: 0
				},
				searchBarFixed:false,
			}
			
		},
		components:{
			backTop
		},
		methods: {
			_goPage(url, query = {}) {
				this.$openPage({
					name: url,
					query
				})
			},
			onPageScroll(e) {
				this.backTop.scrollTop = e.scrollTop;
			},
			// 返回按钮
			_goBack() {
				 this.$router.replace('/')
			},
			//title跳转
			goSearch(val){
			    console.log(val)
			    this._goPage('goods_search_redirect',{title:val})
			},
			Jtop(val) {
			    console.log(this.searchBarFixed, 'this.searchBarFixed')
				uni.createSelectorQuery().select(".box").boundingClientRect(data => {
					uni.createSelectorQuery().select("#t" + val).boundingClientRect((res) => {
						uni.pageScrollTo({
							duration: 300,
							scrollTop: (this.searchBarFixed && val !== 1) ? res.top - data.top - 50 : res.top - data.top 
						})
					}).exec()
				}).exec()
			},
			// //锚点跳转
			_goGoods(val) {
				this.Jtop(val)
				this.flag = val
			},
			menu() {
				this.scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				this.searchBarFixed = this.scroll >= 1212;
                for (let i = 0; i <4 ; i++) {
                    let node = document.getElementById("t" + (i+1))
                    const offset = node.getBoundingClientRect();
                    const offsetTop = offset.top;
                    const offsetBottom = offset.bottom;
                    const offsetHeight = offset.height;
                    // 进入可视区域
                    if (offsetTop <= window.innerHeight && offsetBottom >= 0) {
                        // console.log(node.clientTop, this.scroll, node.offsetTop - 88, '进入可视区域', i)
                        if (this.scroll >= node.offsetTop - 60) {
                            this.flag = i+1
                        }
                    }
                }
			}
		},
		_clickBanner(key) {
			console.log(this.swiperList[key])
			// this.swiperList[key].type   类型：1不跳转，2:跳转外部页面，3跳转到内部界面'
			// this.swiperList[key].url 地址
			// this.swiperList[key].value 参数 {"t":"121","mumber":"2222"}
			switch (this.swiperList[key].type) {
				case 1:
					break
				case 2:
					this._goPage('web_view', {
						url: this.swiperList[key].url
					})
					break
				case 3:
					this._goPage(this.swiperList[key].url, JSON.parse(this.swiperList[key].value))
					break
			}
		},
		destroyed() {
			window.removeEventListener('scroll', this.menu)
		},
		mounted() {
			window.addEventListener('scroll', this.menu)
		},
		async onLoad() {
			await this.wxConfig();
			let url = `https://www.ddxm661.com/h5/#/pages/activity20200611/index`
			if (this.userInfo.id) {
				url += `?user_id=${this.userInfo.id}`
			}
			const param1 = {
					title: '捣蛋熊商城-限时抢购', // 分享标题
					desc: '嗨购14天，极致放价', // 分享描述
					link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: `http://picture.ddxm661.com/a548f202007111345208694.png`, // 分享图标
					success: function() {}
				},
				param2 = {
					title: '捣蛋熊商城-限时抢购', // 分享标题
					link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: `http://picture.ddxm661.com/a548f202007111345208694.png`, // 分享图标
					success: function() {}
				}
			await this.wxConigShareGoods(param1, param2)
			uni.getSystemInfo({
				success(res) {
					console.log(res.screenHeight) //屏幕高度
				}
			});
		},
		computed: {
			...mapState(['userInfo']),
		},
	}
</script>

<style scoped lang="scss">
	.box {
		background-color: #D03B00;
	}

	#my-h5-back {
		position: fixed;
		top: 70rpx;
	}

	page {
		background-color: #DE0063;
	}

	.banner {
		width: 100%;
		display: flex;
		flex-direction: column;

		img {
			width: 100%;
		}
	}

	.hot-box {
		width: 100%;
		height: 88rpx;
		position: relative;
		margin-top: -160rpx;
		.price_nav{
			position: absolute;
			width: 90%;
			height: 70rpx;
			line-height: 70rpx;
			top: 8%;
			left: 10%;
			.item{
				width: 100%;
				height: 100%;
				image{
					width: 17px;
					height: 23px;
					margin-top:10%;
					margin-right: 8rpx;
				}
			}
		}
		.isFixed {
			width: 100%;
			height: 88rpx;
			position: fixed;
			top: 0;
			z-index: 10;
		}
	}
	
	// .brand {
	// 	.isFixed {
	// 		width: 100%;
	// 		height: 160rpx;
	// 		position: fixed;
	// 		top: 0;
	// 		z-index: 10;
	// 	}
	// }
	.goods-list {
		width: 100%;
		min-height: 920rpx;
		// background-color: blue;
	}
	.goods-box-items {
		padding: 0 15rpx;
		box-sizing: border-box;
		text-align: center;
		.S_img {
			width: 702rpx;
			height: 257rpx;
			margin-top: 10rpx;
		}
	}
	.goods-box-items2 {
		padding: 0 15rpx;
		box-sizing: border-box;
		text-align: center;
		.S_img {
			width: 702rpx;
			height: 257rpx;
			margin-top: 10rpx;
		}
	}
</style>
