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

				<view class="limited-time-kill">
					<view class="title-bar">
						<view class="left">
							<view class="title-block" style="background: #F79058;">限时秒杀</view>
						</view>
						<view class="right">
							<text>更多秒杀</text>
							<text class="iconfont icon-ddx-shop-content_arrows"></text>
						</view>
					</view>
					<view class="time-content">
						<wlm-tab :tab-list="tabList2" :tabCur.sync="TabCur2"  @change="tabChange2" tabStyle="background:#F2F2F2;"
								 selectTitleStyle="color:#fff;background:#FC5A5A;border-radius:16px;padding:0 4px;"></wlm-tab>
						<view class="goods-list">
							<view class="time-content-goods-list-goods">
								<view class="image">
									<image src="../../static/images/goods.jpg"></image>
								</view>
								<view class="title">
									澳洲爱他美白金版profutura 3段澳洲爱他美白金版
								</view>
								<view class="price">
									<text class="one">¥2008</text>
									<text class="two">¥2888</text>
								</view>
								<view class="status">
									<text class="one">已抢8810件</text>
								</view>
							</view>
							<view class="time-content-goods-list-goods">
								<view class="image">
									<image src="../../static/images/goods.jpg"></image>
								</view>
								<view class="title">
									澳洲爱他美白金版profutura 3段澳洲爱他美白金版
								</view>
								<view class="price">
									<text class="one">¥2008</text>
									<text class="two">¥2888</text>
								</view>
								<view class="status">
									<text class="one">已抢8810件</text>
								</view>
							</view>
							<view class="time-content-goods-list-goods">
								<view class="image">
									<image src="../../static/images/goods.jpg"></image>
								</view>
								<view class="title">
									澳洲爱他美白金版profutura 3段澳洲爱他美白金版
								</view>
								<view class="price">
									<text class="one">¥2008</text>
									<text class="two">¥2888</text>
								</view>
								<view class="status">
									<text class="one">已抢8810件</text>
								</view>
							</view>
							<view class="time-content-goods-list-goods">
								<view class="image">
									<image src="../../static/images/goods.jpg"></image>
								</view>
								<view class="title">
									澳洲爱他美白金版profutura 3段澳洲爱他美白金版
								</view>
								<view class="price">
									<text class="one">¥2008</text>
									<text class="two">¥2888</text>
								</view>
								<view class="status">
									<text class="one">已抢8810件</text>
								</view>
							</view>
						</view>
					</view>

				</view>
				<view class="limited-time-kill">
					<view class="title-bar">
						<view class="left">
							<view class="title-block">精品团</view>
							<text class="title-text">海量商品放心拼团</text>
						</view>
						<view class="right">
							<text>更多秒杀</text>
							<text class="iconfont icon-ddx-shop-content_arrows"></text>
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

		<view @click="goPageUrl('goods_search')">
			去搜索商品
		</view>
		<view @click="goPageUrl('goods_detail')">
			去商品详情
		</view>
		<view @click="goPageUrl('goods_evaluate')">
			去商品评论页面
		</view>
		<view @click="goPageUrl('search_with_hot_history')">
			去搜索页面
		</view>
		<view @click="goPageUrl('address_list')">
			去地址管理页面
		</view>
		<view @click="goPageUrl('order_list')">
			去我的订单页面
		</view>
		<view @click="goPageUrl('order_detail')">
			去我的订单详情
		</view>
	</view>
</template>

<script>
    import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	import separator from "@/components/separator.vue"
	import mGoods from '@/components/goods/goods.vue'
	import WlmTab from '@/components/wlm-tab/wlm-tab.vue'

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

				TabCur2: 0,
				tabList2: [
					{ name: '10:00',sub_title: '秒杀中'},
					{ name: '12:00',sub_title: '即将开始'},
					{ name: '14:00',sub_title: '即将开始'},
					{ name: '16:00',sub_title: '即将开始'},
					{ name: '18:00',sub_title: '即将开始'},
					{ name: '20:00',sub_title: '即将开始'},
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
			goPageUrl(url){
				this.$openPage(url)
			},
			tabChange(index) {
				this.TabCur = index;
			},
			tabChange2(index) {
				this.TabCur2 = index;
			},
		},
		components: {
			WucTab,
			separator,
			mGoods,
			WlmTab,
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
			/*限时秒杀  精品团*/
			.limited-time-kill{
				background: #ffffff;
				margin-top: 20upx;
				.title-bar{
					/*border: 1px solid red;*/
					display:flex;
					flex-direction:row;
					flex-wrap: nowrap;
					align-items: center;
					justify-content: space-between;
					font-size: $uni-font-size-base;
					color: $color-primary-plain;
					padding: 20upx $uni-spacing-row-base 20upx 0;
					.left{
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;
						.title-block{
							color: #ffffff;
							background: #BA6BE7;
							text-align: center;
							height: 48upx;
							line-height: 48upx;
							padding: 0 34upx;
							border-radius:0 24upx 24upx 0;
							margin-right: 30upx;
						}
						.title-text{
							font-size: $uni-font-size-sm;
						}
					}
					.right{
						color: $color-primary;
						.iconfont{
							margin-left: 6upx;
							font-size: $uni-font-size-base;
						}
					}

				}

				.time-content{
					.goods-list{
						background: #ffffff;
						width: 100%;
						display: flex;
						padding: $uni-spacing-row-base;
						.time-content-goods-list-goods{
							display:flex;
							flex-direction:column;
							width:25%;
							margin-right:8upx;
							&:last-child{
								margin-right: 0;
							}
							overflow: hidden;
							.image{
								width: 100%;
								image{
									width: 100%;
									height: 140upx;
									border-radius:8upx 8upx 0upx 0upx;
								}
							}
							.title{
								@extend %overflow-2-line;
								font-size: $uni-font-size-sm;
								width: 100%;
								overflow: hidden;
								margin-bottom: 6upx;
							}
							.price{
								@extend %overflow-1-line;
								width: 100%;
								overflow: hidden;
								margin-bottom: 6upx;
								display: flex;
								justify-content: space-between;
								.one{
									width: 50%;
									text-align: left;
									font-size: $uni-font-size-sm;
									color: $color-primary;
								}
								.two{
									width: 50%;
									text-align: right;
									font-size: $uni-font-size-sm - 4upx;
									color: #808080;
									text-decoration:line-through;
								}
							}
							.status{
								font-size: $uni-font-size-sm;
								color: #808080;
							}
						}
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
