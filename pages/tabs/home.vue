<template>
	<view class="container">
			<uni-nav-bar
					shadow="false"
					fixed="true"
					status-bar="true"
					style="position: fixed;top: 0;left: 0;width: 100%;background: #ffffff;z-index: 9999;">
				<view class="my-search-box">
					<view class="my-search-input" @click="_goPage('search_with_hot_history')">
						<text class="iconfont icon-ddx-shop-hot"></text>
						<text>万千商品，等你来采购</text>
					</view>
				</view>
			</uni-nav-bar>
			<wuc-tab :tab-list="tabList" :textFlex="true" :tabCur.sync="TabCur" tab-class="tabs"  select-class="tab-select" @change="tabChange"></wuc-tab>
			<view class="content" v-if="TabCur === 0">
				<view class="swiper-box" v-if="swiperList.length">
					<swiper circular="true" autoplay="true" :indicator-dots="true" indicator-active-color="#FC8A8A">
						<swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index">
							<image class="banner-img" :lazy-load="true"	:src="item.thumb" @click="_clickBanner(index)" mode="center"></image>
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
									<image class="img-25" src="../../static/images/goods.jpg"></image>
								</view>
								<view class="title">
									澳洲爱他美白金版profutura 3段澳洲爱他美白金版
								</view>
								<view class="price">
									<text class="one">¥2008</text>
								</view>
								<view class="status">
									<text class="one">已抢8810件</text>
								</view>
							</view>
							<view class="time-content-goods-list-goods">
								<view class="image">
									<image class="img-25" src="../../static/images/goods.jpg"></image>
								</view>
								<view class="title">
									澳洲爱
								</view>
								<view class="price">
									<text class="one">¥2008</text>
								</view>
								<view class="status">
									<text class="one">已抢8810件</text>
								</view>
							</view>
							<view class="time-content-goods-list-goods">
								<view class="image">
									<image class="img-25" src="../../static/images/goods.jpg"></image>
								</view>
								<view class="title">
									澳洲爱他
								</view>
								<view class="price">
									<text class="one">¥2008</text>
								</view>
								<view class="status">
									<text class="one">已抢8810件</text>
								</view>
							</view>
							<view class="time-content-goods-list-goods">
								<view class="image">
									<image class="img-25" src="../../static/images/goods.jpg"></image>
								</view>
								<view class="title">
									澳洲爱他美白金版profutura 3段澳洲爱他美白金版
								</view>
								<view class="price">
									<text class="one">¥2008</text>
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
					<view class="time-content">
						<view class="goods-list">
							<view class="time-content-goods-list-goods" style="width: 33.33333%;">
								<view class="image width-210">
									<image class="img-33" src="../../static/images/goods.jpg"></image>
									<view class="group-info">10人团</view>
								</view>
								<view class="title width-210">
									澳洲爱他美白金版profutura 3段澳洲爱他美白金版
								</view>
								<view class="price width-210">
									<text class="one">¥2008</text>
									<text class="two">¥2888</text>
								</view>
								<view class="status width-210">
									<text class="one">已拼8810件</text>
								</view>
							</view>
							<view class="time-content-goods-list-goods" style="width: 33.33333%;">
								<view class="image width-210">
									<image class="img-33" src="../../static/images/goods.jpg"></image>
									<view class="group-info">3人团</view>
								</view>
								<view class="title width-210">
									澳洲爱他美白金版profutura 3段澳洲爱他美白金版
								</view>
								<view class="price width-210">
									<text class="one">¥2008</text>
									<text class="two">¥2888</text>
								</view>
								<view class="status width-210">
									<text class="one">已拼8810件</text>
								</view>
							</view>
							<view class="time-content-goods-list-goods" style="width: 33.33333%;">
								<view class="image width-210">
									<image class="img-33" src="../../static/images/goods.jpg"></image>
									<view class="group-info">3人团</view>
								</view>
								<view class="title width-210">
									澳洲爱他美白金版profutura 3段澳洲爱他美白金版
								</view>
								<view class="price width-210">
									<text class="one">¥2008</text>
									<text class="two">¥2888</text>
								</view>
								<view class="status width-210">
									<text class="one">已拼8810件</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="guess-you-like">
					<separator title="猜你喜欢"></separator>
					<view class="goods-list">
						<mGoods v-for="(item, index) in tabList[TabCur].goodsList" :key="index" :goodsInfo="item" @click.native="_goPage('goods_detail', {id:item.id})"></mGoods>
					</view>
				</view>
			</view>
			<uni-load-more :status="moreStatus" :show-icon="true"></uni-load-more>
	</view>
</template>

<script>
    import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	import separator from "@/components/separator.vue"
	import mGoods from '@/components/goods/goods.vue'
	import WlmTab from '@/components/wlm-tab/wlm-tab.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"

	export default {
		data() {
			return {
				moreStatus: 'loading',//可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
				//首页tab栏
				TabCur: 0,//当前选中的下标
				tabList: [
					{
						cname: '推荐',
						id: 0,
						thumb:'',
						requestData: {
							page:1,
							limit:10,
						},
						goodsList:[],
					},
				],
				//推荐tab中的轮播图
				swiperList: [],

				TabCur2: 0,
				tabList2: [
					{ name: '10:00',sub_title: '秒杀中'},
					{ name: '12:00',sub_title: '即将开始'},
					{ name: '14:00',sub_title: '即将开始'},
					{ name: '16:00',sub_title: '即将开始'},
					{ name: '18:00',sub_title: '即将开始'},
					{ name: '20:00',sub_title: '即将开始'},
				],
				// 推荐里的数据


			}
		},
		async onLoad() {
			await this._getCategory()
			await this._getBanner()
			await this._getGuessYouLike()
		},
		async onReachBottom() {
			if (this.moreStatus === 'noMore') {
				return
			}
			this.tabList[this.TabCur].requestData.page ++
			if (this.TabCur === 0) {
				await this._getGuessYouLike()
			}
		},
		methods: {
			_goPage(url, query = {}){
				this.$openPage({name:url, query})
			},
			tabChange(index) {
				this.TabCur = index;
				console.log(this.tabList[index])
			},
			tabChange2(index) {
				this.TabCur2 = index;
			},
			_getCategory(pid) {
				this.$minApi.category({pid}).then(res => {
					if (res.code === 200){
						let newArr = res.data.map((item, index) => {
							item .requestData = {page:1, limit:10}
							item .goodsList = []
							return item
						})
						this.tabList.push(...newArr)
					}
				})
			},
			_getBanner() {
				this.$minApi.banner().then(res => {
					if (res.code === 200){
						this.swiperList = res.data
					}
				})
			},
			_clickBanner(key) {
				console.log(this.swiperList[key])
			},
			_getGuessYouLike() {
				this.moreStatus = 'loading'
				let data = {
					page:this.tabList[this.TabCur].requestData.page,
					limit:this.tabList[this.TabCur].requestData.limit,
				}
				this.$minApi.guessYouLike(data).then(res => {
					if (res.code === 200){
						this.tabList[this.TabCur].goodsList.push(...res.data)
						if (res.data.length <  this.tabList[this.TabCur].requestData.limit) {
							this.moreStatus = 'noMore'
						} else {
							this.moreStatus = 'more'
						}
					}
				})
			},
		},
		components: {
			WucTab,
			separator,
			mGoods,
			WlmTab,
			uniLoadMore,
			uniNavBar,
		},
		computed: {
		},
	}
</script>

<style lang="scss">
	.container{
		.my-search-box{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 100%;
			width: 100%;
			.my-search-input{
				border: 1upx solid #DCDCDC;
				color: #DCDCDC;
				font-size: $uni-font-size-base;
				background: #fff;
				height: 60upx;
				width: 65%;
				padding: 0 10upx;
				border-radius:30upx;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				overflow: hidden;
				.iconfont{
					margin-right: 6upx;
				}
			}
		}

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
			width: 100%;
			position: fixed;
			z-index: 999;
			top: 64px;
			left: 0;
		}
		.content{
			padding-top: calc(64px + 90upx);
			.swiper-box{
				padding: 10upx $uni-spacing-row-sm 0 $uni-spacing-row-sm;
				width: 100%;
				border-radius: 4upx;
				background: #fff;
				overflow: hidden;
				.swiper-item{
					width: 100%;
					overflow: hidden;
					.banner-img{
						width: 100%;
						height:100%;
						border-radius: 10upx;
					}
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
							margin-right:10upx;
							&:last-child{
								margin-right: 0;
							}
							overflow: hidden;
							.image{
								width: 160upx;
								text-align: center;
								position: relative;
								.img-25{
									width: 160upx;
									height: 160upx;
									border-radius:8upx 8upx 0upx 0upx;
								}
								.img-33{
									width: 210upx;
									height: 210upx;
									border-radius:8upx 8upx 0upx 0upx;
								}
								.group-info{
									position: absolute;
									left: 0;
									bottom: 20upx;
									width: 88upx;
									height: 34upx;
									line-height: 34upx;
									text-align: center;
									overflow: hidden;
									font-size: $uni-font-size-sm;
									color: $color-primary;
									border: 1upx solid $color-primary;
									border-radius: 8upx;
									background: #fff;
								}
							}
							.title{
								@extend %overflow-2-line;
								font-size: $uni-font-size-sm;
								width: 160upx;
								margin-bottom: 6upx;
							}
							.price{
								@extend %overflow-1-line;
								width: 160upx;
								overflow: hidden;
								margin-bottom: 6upx;
								display: flex;
								justify-content: flex-start;
								.one{
									font-size: $uni-font-size-base;
									color: $color-primary;
									margin-right: 6upx;
								}
								.two{
									font-size: $uni-font-size-sm;
									color: #808080;
									text-decoration:line-through;
								}
							}
							.status{
								width: 160upx;
								font-size: $uni-font-size-sm;
								color: #808080;
							}
							.width-210{
								width: 210upx;
							}
						}
					}
				}
			}
			/*猜你喜欢*/
			.guess-you-like{
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
