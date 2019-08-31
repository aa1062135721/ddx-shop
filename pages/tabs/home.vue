<template>
	<view class="container">
		<div>
			<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" tab-class="tabs"  select-class="tab-select" @change="tabChange"></wuc-tab>
			<view class="content" v-if="TabCur === 0">
				<view class="swiper-box">
					<swiper circular="true" autoplay="true" :indicator-dots="true" indicator-active-color="#FC8A8A">
						<swiper-item v-for="(img_src,index) in swiperList" :key="index">
							<image class="banner-img" :src="img_src" @click=""></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="limited-time">
					<view class="item">
						<view>
							<image src="../../static/icon/icon-pay-succeed.png"></image>
						</view>
						<view>
							<text>限时抢购</text>
						</view>
					</view>
					<view class="item">
						<view>
							<image src="../../static/icon/icon-pay-succeed.png"></image>
						</view>
						<view>
							<text>限时抢购</text>
						</view>
					</view>
					<view class="item">
						<view>
							<image src="../../static/icon/icon-pay-succeed.png"></image>
						</view>
						<view>
							<text>限时抢购</text>
						</view>
					</view>
					<view class="item">
						<view>
							<image src="../../static/icon/icon-pay-succeed.png"></image>
						</view>
						<view>
							<text>限时抢购</text>
						</view>
					</view>
					<view class="item">
						<view>
							<image src="../../static/icon/icon-pay-succeed.png"></image>
						</view>
						<view>
							<text>限时抢购</text>
						</view>
					</view>
					<view class="item">
						<view>
							<image src="../../static/icon/icon-pay-succeed.png"></image>
						</view>
						<view>
							<text>限时抢购</text>
						</view>
					</view>
					<view class="item">
						<view>
							<image src="../../static/icon/icon-pay-succeed.png"></image>
						</view>
						<view>
							<text>限时抢购</text>
						</view>
					</view>
					<view class="item">
						<view>
							<image src="../../static/icon/icon-pay-succeed.png"></image>
						</view>
						<view>
							<text>限时抢购</text>
						</view>
					</view>
					<view class="item">
						<view>
							<image src="../../static/icon/icon-pay-succeed.png"></image>
						</view>
						<view>
							<text>限时抢购</text>
						</view>
					</view>
				</view>

				<view class="guess-you-like">
					<separator title="猜你喜欢"></separator>
					<view class="goods-list">
						<mGoods></mGoods>
						<mGoods></mGoods>
						<mGoods></mGoods>
					</view>
				</view>
			</view>

		</div>

		首页页面
		<view @click="goPage()">
			去搜索商品
		</view>

		<br>
		<br>
		<br>
		<view @click="goPage1()">
			去商品详情
		</view>

		<br>
		<br>
		<br>
		<view @click="goPage2()">
			去商品评论页面
		</view>

		<br>
		<br>
		<br>
		<view @click="goPage3()">
			去搜索页面
		</view>
	</view>
</template>

<script>
    import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	import separator from "@/components/separator.vue"
	import mGoods from '@/components/goods/goods.vue'

	export default {
		data() {
			return {
				TabCur: 0,
				tabList: [
					{ name: '推荐' },
					{ name: '选项卡二' },
					{ name: '选项卡三' },
					{ name: '选项卡四' },
					{ name: '选项卡五' },
					{ name: '选项卡六' },
					{ name: '选项卡七' },
					{ name: '选项卡八' }
				],
				//轮播主图数据
				swiperList: [
					'https://ae01.alicdn.com/kf/HTB1Mj7iTmzqK1RjSZFjq6zlCFXaP.jpg',
					'https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg',
					'https://ae01.alicdn.com/kf/HTB1dPUMThnaK1RjSZFtq6zC2VXa0.jpg',
					'https://ae01.alicdn.com/kf/HTB1OHZrTXzqK1RjSZFvq6AB7VXaw.jpg'
				],
			}
		},
		onLoad() {

		},
		methods: {
			goPage(){
				this.$openPage('goods_search')
			},
			goPage1(){
				this.$openPage('goods_detail')
			},
			goPage2(){
				this.$openPage('goods_evaluate')
			},
			goPage3(){
				this.$openPage('search_with_hot_history')
			},
			tabChange(index) {
				this.TabCur = index;
			},
			swiperChange(e) {
				let { current } = e.target;
				this.TabCur = current;
			},
		},
		components: {
			WucTab,
			separator,
			mGoods,
		},
		computed: {
		},
	}
</script>

<style lang="scss">
	.container{
		.tab-select{
			color: $color-primary;
			border-color: $color-primary;
			font-size: $uni-font-size-base;
		}
		.tabs{
			background: #ffffff;
			color: $color-primary-plain;
			font-size: $uni-font-size-base;
			text-align: center;
		}
		.content{
			.swiper-box{
				padding: 10upx $uni-spacing-row-sm 0 $uni-spacing-row-sm;
				width: 100%;
				border-radius: 4upx;
				background: #000;
				.banner-img{
					border-radius: 4upx;
				}
			}
			/*限时抢购*/
			.limited-time{
				width: 100%;
				background: #ffffff;
				padding: 10upx $uni-spacing-row-sm 0 $uni-spacing-row-sm;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				background: #ffffff;
				padding: $uni-spacing-row-base 0;
				.item{
					display: flex;
					flex-wrap: nowrap;
					flex-direction: column;
					align-items: center;
					width: 20%;
					padding: $uni-spacing-col-sm 0;
					image{
						width:96upx;
						height: 80upx;
					}
					text{
						font-size: $uni-font-size-base;
						color: $color-primary-plain;
					}
				}
			}
			/*猜你喜欢*/
			.guess-you-like{
				padding: 190upx 0;
				.goods-list{
					padding: 10upx $uni-spacing-row-sm 0 $uni-spacing-row-sm;
					display:flex;
					flex-direction:row;
					flex-wrap: wrap;
					justify-content: space-between;
				}
			}
		}
	}
</style>
