<template>
	<view class="container">
			<!-- 首页的搜索框 -->
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
			<!-- 一级tab栏 -->
			<wuc-tab :tab-list="tabList" :textFlex="true" :tabCur.sync="TabCur" tab-class="tabs"  select-class="tab-select" @change="tabChange"
					 style="position: fixed;left: 0;width: 100%;z-index: 999;"
					 :style="style"
			></wuc-tab>
			<!-- 推荐tab栏里的数据 -->
			<view class="content" v-if="TabCur === 0">
				<view class="my-block"></view>
				<!-- 推荐 -- banner-->
				<view class="swiper-box" v-if="swiperList.length">
					<swiper circular="true" autoplay="true" :indicator-dots="true" indicator-active-color="#FC8A8A" style="width: 710upx;height: 268upx;">
						<swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index">
							<image class="banner-img" :lazy-load="true"	:src="item.thumb" @click="_clickBanner(index)" mode="widthFix"></image>
						</swiper-item>
					</swiper>
				</view>
				<!-- 推荐 -- 小图标-->
				<view class="limited-time" v-if="iconArr.length">
					<view class="item" v-for="(item, index) in iconArr" :key="index" @click="_clickIcon(item)">
						<view>
							<image :src="item.thumb" :lazy-load="true"></image>
						</view>
						<view>
							<text>{{item.title}}</text>
						</view>
					</view>
				</view>

				<!-- 通知栏 -->
				<view class="global-notice" v-if="notice.length">
					<uni-notice-bar color="#1A1A1A" background-color=""	 scrollable="true" show-icon="true"	single="true" :text="notice[0].title"></uni-notice-bar>
				</view>

				<!-- 超级拼团 限时秒杀 童装童鞋 境外购-->
				<view class="goods-category">
					<view class="all-goods">
						<view class="item">
							<view class="title-box" @click="_goPage('group_buy')">
								<view class="title">超级拼团</view>
								<view class="sub-title">约惠好友 超值拼购</view>
							</view>
							<view class="goods-info">
								<view class="goods" v-for="(item, index) in combination.assemble_list" :key="index" @click="_goPage('group_buy_detail', {id: item.id})">
									<view class="goods-img">
										<image class="img" :src="item.pic" :lazy-load="true"></image>
									</view>
									<view class="price">
										<text class="now-price">￥{{item.min_price}}</text>
										<text class="old-price">￥{{item.max_price}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="item">
							<view class="title-box" @click="_goPage('spike_list')">
								<view class="title">限时秒杀</view>
								<view class="sub-title">爆品限时限量抢</view>
							</view>
							<view class="goods-info">
								<view class="goods" v-for="(item, index) in combination.seckill_list" :key="index"  @click="_goPage('spike_detail', {id: item.id})">
									<view class="goods-img">
										<image class="img" :src="item.pic" :lazy-load="true"></image>
									</view>
									<view class="price">
										<text class="now-price">￥{{item.min_price}}</text>
										<text class="old-price">￥{{item.max_price}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="item">
							<view class="title-box" @click="_goPage('goods_search', {title: combination.tong_list.name, id: combination.tong_list.id})">
								<view class="title">童装童鞋</view>
								<view class="sub-title">天使般温柔呵护</view>
							</view>
							<view class="goods-info">
								<view class="goods" v-for="(item, index) in combination.tong_list.data" :key="index" @click="_goPage('goods_detail', {id: item.item_id})">
									<view class="goods-img">
										<image class="img" :src="item.pic" :lazy-load="true"></image>
									</view>
									<view class="price">
										<text class="now-price">￥{{item.min_price}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="item">
							<view class="title-box" @click="_goPage('goods_search', {title: combination.kua_list.name, id: combination.kua_list.id})">
								<view class="title">跨境购</view>
								<view class="sub-title">正品保障 跨境直邮</view>
							</view>
							<view class="goods-info">
								<view class="goods" v-for="(item, index) in combination.kua_list.data" :key="index" @click="_goPage('goods_detail', {id: item.item_id})">
									<view class="goods-img">
										<image class="img" :src="item.pic" :lazy-load="true"></image>
									</view>
									<view class="price">
										<text class="now-price">￥{{item.min_price}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- HOT SALE-->
				<view class="hot-sale" v-if="explosion.length">
					<view class="hot-sale-banner">
						<image class="img" src="../../static/images/home-hot-sale-banner.png" mode="widthFix"></image>
					</view>
					<view class="hot-sale-box">
						<block  v-for="(item, index) in explosion" :key="index">
							<view class="goods" v-if="item.type !== 1" @click="_goPage('goods_detail', {id: item.item.id})">
								<view class="goods-header">
									<view  class="goods-tag" v-if="item.type === 3">热销第一</view>
									<view  class="goods-tag" v-if="item.type === 4">好评第一</view>
									<view  class="goods-tag" v-if="item.type === 5">热门推荐</view>
									<image class="img" :src="item.item.pic" :lazy-load="true"></image>
								</view>
								<view class="goods-footer">
									<view class="goods-title">
										{{item.item.title}}
									</view>
									<view class="goods-price">¥{{item.item.min_price}}</view>
								</view>
                        	</view>
							<view class="goods" v-if="item.type === 1 && item.item.length" v-for="(oItem, oIndex) in item.item" :key="oIndex" @click="_goPage('goods_detail', {id: oItem.id})">
								<view class="goods-header">
									<image class="img" :src="oItem.pic" :lazy-load="true"></image>
								</view>
								<view class="goods-footer">
									<view class="goods-title">
										{{oItem.title}}
									</view>
									<view class="goods-price">¥{{oItem.min_price}}</view>
								</view>
							</view>
						</block>
					</view>
				</view>


				<!-- 六个分类，内容部分可以向左滑动-->
				<view class="some-category" v-if="categoryGoodsList.length" v-for="(item, index) in categoryGoodsList" :key="index">
					<view class="some-category-banner" @click="_goPage('goods_search', {title: item.cname, id: item.category_id})">
						<image class="img" :src="item.thumb" model="widthFix" :lazy-load="true"></image>
					</view>
					<view class="some-category-box">
						<scroll-view  scroll-x="true">
							<view class="all-goods">
								<view class="goods" v-for="(subItem, subIndex) in item.items" :key="subIndex" @click="_goPage('goods_detail', {id: subItem.id})">
									<view class="goods-header">
										<image class="img" :src="subItem.pic" :lazy-load="true"></image>
									</view>
									<view class="goods-footer">
										<view class="goods-title">{{subItem.title}}</view>
										<view class="goods-price">￥{{subItem.min_price}}</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>

			</view>
			<!-- 其他tab栏里的数据 -->
			<view class="content" v-if="TabCur !== 0">
				<view class="my-block"></view>
				<view class="limited-time">
					<view class="item" v-for="(item, index) in subTab" :key="index" @click="_clickSubTab(item)">
						<view>
							<image :src="item.thumb" :lazy-load="true"></image>
						</view>
						<view>
							<text>{{item.cname}}</text>
						</view>
					</view>
				</view>
				<view class="guess-you-like">
					<view class="goods-list">
						<mGoods v-for="(item, index) in tabList[TabCur].goodsList" :key="index" :goodsInfo="item" @click.native="goGoodsDetails(item)"></mGoods>
					</view>
				</view>
			</view>
			<uni-load-more :status="tabList[TabCur].requestData.moreStatus" :show-icon="true"></uni-load-more>
	</view>
</template>

<script>
    import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	import separator from "@/components/separator.vue"
	import mGoods from '@/components/goods/goods.vue'
	import WlmTab from '@/components/wlm-tab/wlm-tab.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'

	import {mapActions} from 'vuex'

	export default {
		data() {
			return {
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
							moreStatus: 'loading',
						},
						goodsList:[],
					},
				],
				//首页 非推荐里的tab栏，二级tab
				subTab: [],

				/**
				 * 推荐里的数据
				 */
				//推荐tab中的轮播图
				swiperList: [],
				//图标
				iconArr:[],
				//分类商品
				categoryGoodsList:[],
				// hot sale 人气爆款
				explosion: [],
				//公告 notice
				notice:[],
				// 超级拼团 限时秒杀 童装童鞋 境外购
				// 参数说明：assemble_list：拼团，seckill_list秒杀，tong_list童装童鞋，kua_list跨境购
				// 注意：拼团点击跳转拼团详情，秒杀点击跳转秒杀详情，童装童鞋与跨境购 跳转到商品搜索
				combination:{
					assemble_list: [],
					seckill_list: [],
					tong_list: {},
					kua_list:{},
				},
			}
		},
		async onLoad(param) {
			if (param.user_id){
				this.saveShareID(param.user_id)
			}
			await this._getCategory()
			await this._getBanner()
			await this._getIcon()

			await this._getNotice()
			await this._getCombination()
			await this._getExplosion()
			await this._getCategoryGoodsList()
		},
		async onReachBottom() {
			if (this.tabList[this.TabCur].requestData.moreStatus === 'noMore') {
				return
			}
			this.tabList[this.TabCur].requestData.page ++
			if (this.TabCur === 0) {

			} else {
				await this._getGoodsList()
			}
		},
		methods: {
			...mapActions(['saveShareID']),
			_goPage(url, query = {}){
				this.$openPage({name:url, query})
			},
			async tabChange(index) {
				this.TabCur = index
				if (index === 0) {
					return
				}
				console.log('被点击的tab信息', this.tabList[index])
				await this.$minApi.category({pid:this.tabList[index].id}).then(res => {
					if (res.code === 200){
						this.subTab = res.data
					}
				})
				console.log('返回的子分类信息', this.subTab)
				if (this.tabList[index].goodsList.length===0) {
					await this._getGoodsList(index)
				}

			},
			async _getGoodsList(){
				this.tabList[this.TabCur].requestData.moreStatus = 'loading'
				let data = {
					type:this.tabList[this.TabCur].id,
					page:this.tabList[this.TabCur].requestData.page,
					limit:this.tabList[this.TabCur].requestData.limit,
				}
				await this.$minApi.searchGoods(data).then(res => {
					if (res.code === 200){
						this.tabList[this.TabCur].goodsList.push(...res.data)
						if (res.data.length <  this.tabList[this.TabCur].requestData.limit) {
							this.tabList[this.TabCur].requestData.moreStatus = 'noMore'
						} else {
							this.tabList[this.TabCur].requestData.moreStatus = 'more'
						}
					}
				})
			},
			_getCategory(pid) {
				this.$minApi.category({pid}).then(res => {
					if (res.code === 200){
						let newArr = res.data.map((item, index) => {
							item .requestData = {page:1, limit:10, moreStatus: 'loading'}
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
				// this.swiperList[key].type   //类型：1不跳转，2:跳转页面（地址加全），3商品详情',
				// this.swiperList[key].value //跳转地址：type=2时为地址，type=3时为商品id
				switch (this.swiperList[key].type) {
					case 1:

						break
					case 2:
						this._goPage('web_view',{url: this.swiperList[key].value})
						break
					case 3:
						this._goPage('goods_detail',{id: this.swiperList[key].value})
						break
				}
			},
			_clickSubTab(item){
				console.log(item)
				this._goPage('goods_search', {id: item.id, title: item.cname})
			},

			//推荐页面的图标
			async _getIcon(){
				await this.$minApi.getHomeIcon().then(res => {
					console.log("获取推荐选项卡里的图标数据：",res)
					if (res.code === 200){
						this.iconArr = res.data
					}
				})
			},
			// 推荐页面的图标单击操作
			_clickIcon(item){
                // "type":"1",     //跳转类型：1:不跳；2：跳网站；3：商品详情；4：拼团列表；5：抢购列表；6：新人专区
				console.log("单击了推荐页选项卡里的图标：",item)
                switch (item.type) {
                    case 1:
                        break
                    case 2:
                        this._goPage('web_view',{url: item.value})
                        break
                    case 3:
                        this._goPage('goods_detail',{id: item.value})
                        break
					case 4:
						this._goPage('group_buy')
						break
					case 5:
						this._goPage('spike_list')
						break
					case 6:
						break
                }
			},

			// 推荐页面的六个板块数据
			async _getCategoryGoodsList(){
				await this.$minApi.categoryGoods().then(res => {
					console.log("获取推荐tab中的六个板块数据：",res)
					if (res.code === 200){
						this.categoryGoodsList = res.data
						this.tabList[0].requestData.moreStatus = 'noMore'
					}
				})
			},
			//公告
			async _getNotice(){
				await this.$minApi.notice().then(res => {
					console.log("获取推荐tab中的公告：",res)
					if (res.code === 200){
						this.notice = res.data
						this.tabList[0].requestData.moreStatus = 'noMore'
					}
				})
			},
			// 超级拼团 限时秒杀 童装童鞋 境外购
			async _getCombination(){
				await this.$minApi.combination().then(res => {
					console.log("获取推荐tab中的 超级拼团 限时秒杀 童装童鞋 境外购：",res)
					if (res.code === 200){
						this.combination = res.data
						this.tabList[0].requestData.moreStatus = 'noMore'
					}
				})
			},
			//hot sale 人气爆款
			async _getExplosion(){
				await this.$minApi.explosion().then(res => {
					console.log("hot sale 人气爆款数据：",res)
					if (res.code === 200){
						this.explosion = res.data
						this.tabList[0].requestData.moreStatus = 'noMore'
					}
				})
			},

			/**
			 * 去到商品详情页面，先后级 分别是 秒杀商品，拼团商品，普通商品
			 * @param goods
			 */
			goGoodsDetails(goods){
				console.log('商品信息：', goods)

				//秒杀活动id，如果有此参数则表示此商品参与此秒杀活动
				if (goods.seckill_id) {
					this._goPage('spike_detail', {id: goods.seckill_id})
					return
				}
				//拼团活动id，如果有此参数则表示此商品参与此拼团活动
				if (goods.assemble_id) {
					this._goPage('group_buy_detail', {id: goods.assemble_id})
					return
				}

				this._goPage('goods_detail', {id: goods.id})
			},

		},
		components: {
			WucTab,
			separator,
			mGoods,
			WlmTab,
			uniLoadMore,
			uniNavBar,
			uniNoticeBar,
		},
		computed: {
			style() {
				//#ifdef MP-WEIXIN
				var systemInfo = uni.getSystemInfoSync()
				return `top:${systemInfo.statusBarHeight + 44}px`
				//#endif
				//#ifdef APP-PLUS
				return ''
				//#endif
			},
		},
		onUnload(){
			clearInterval(myTimer)
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
			/* #ifndef MP-WEIXIN */
			position: fixed;
			z-index: 999;
			top: calc(44px + var(--status-bar-height));
			left: 0;
			/* #endif */
		}
		.content{
			.my-block{
				width: 100%;
				height: calc(44px + var(--status-bar-height) + 90upx + 30upx);
				background: #fff;
			}
			.swiper-box{
				padding: 10upx $uni-spacing-row-sm;
				width: 100%;
				height: auto;
				border-radius: 10upx;
				background: #fff;
				overflow: hidden;
				.swiper-item{
					width: 100%;
					height: 100%;
					.banner-img{
						width: 100%;
						border-radius: 10upx;
					}
				}
			}
			/*推荐页面的小图标*/
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
						width:98upx;
						height: 98upx;
					}
					text{
						font-size: $uni-font-size-base;
						color: $color-primary-plain;
					}
				}
			}

			/*通知栏*/
			.global-notice{
			}
			/*超级拼团 限时秒杀 童装童鞋 跨境商品*/
			.goods-category{
				padding: 0 $uni-spacing-row-sm;
				.all-goods{
					margin: auto;
					background: #FFFFFF;
					border-radius:8upx;
					width: 710upx;
					height: 710upx;
					display: flex;
					flex-wrap: wrap;
					.item{
						width: 50%;
						height: 50%;
						box-sizing: border-box;
						/*border-left: 1px solid #F2F2F2;*/
						/*border-bottom: 1px solid #F2F2F2;*/
						padding: 30upx 20upx 26upx 20upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.title-box{
							.title{
								font-size: $uni-font-size-base;
								color: $color-primary-plain;
								font-weight: 600;
							}
							.sub-title{
								font-size: $uni-font-size-sm;
								color: #808080;
							}
						}
						.goods-info{
							display: flex;
							justify-content: space-between;
							.goods{
								width: 152upx;
								.goods-img{
									.img{
										width:152upx;
										height: 152upx;
									}
									margin-bottom: 15upx;
								}
								.price{
									width: 152upx;
									display: flex;
									align-items: center;
									justify-content: space-around;
									.now-price{
										font-size: 22upx;
										color: $color-primary;
									}
									.old-price{
										text-decoration: line-through;
										color: #B2B2B2;
										font-size: 16upx;
									}
								}

							}
						}

					}
				}
			}

			/*HOT SALE*/
			.hot-sale{
				margin: 28upx auto;
				padding: 0 $uni-spacing-row-sm;
				.hot-sale-banner{
					border-radius:8upx 8upx 0 0;
					width: 100%;
					height: 123upx;
					overflow: hidden;
					background-color: #C1ADFA;
					.img{
						width: 710upx;
						height: 123upx;
					}
				}
				.hot-sale-box{
					width: 100%;
					background: #C1ADFA;
					padding: 10upx;
					border-radius:0 0 8upx 8upx;

					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.goods{
						box-sizing: border-box;
						border: 1upx solid #D5C7FD;
						background: #A384FA;
						width: 224upx;
						height: 330upx;
						margin-bottom: 8upx;
						border-radius: 4upx;
						padding: 10upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.goods-header{
                            background: #FFFFFF;
							width: 204upx;
							height: 204upx;
							position: relative;
							.goods-tag{
								position: absolute;
								top: 10upx;
								left: 0;
								background: $color-primary;
								color: #FFFFFF;
								font-size: 18upx;
								width:102upx;
								height:34upx;
								line-height:34upx;
								text-align: center;
								border-radius:0 17upx 17upx 0;
							}
							.img{
								width: 204upx;
								height: 204upx;
							}
						}
						.goods-footer{
							width: 100%;
							height: 92upx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							.goods-title{
								width: 100%;
								@extend %overflow-2-line;
								color: #FFFFFF;
								font-size: 22upx;
							}
							.goods-price{
								width: 100%;
								color: #FFFFFF;
								font-size: $uni-font-size-sm;
								text-align: center;
							}
						}
					}
				}
			}

		 	/*六个分类，内容部分可以向左滑动*/
			.some-category{
				padding: 0 $uni-spacing-row-sm;
				margin-bottom: 28upx;
				.some-category-banner{
					width: 100%;
					border-radius:8upx 8upx 0 0;
					height: 268upx;
					overflow: hidden;
					background: #fff;
					.img{
						width: 710upx;
						height: 268upx;
					}
				}
				.some-category-box{
					border-radius:0 0 8upx 8upx;
					background: #FFFFFF;
					width: 100%;
					height: 320upx;
					padding: 10upx;

					.all-goods{
						height: 100%;
						width: 100%;
						display: flex;
						flex-wrap: nowrap;

						.goods{
							margin-right: 20upx;
							width: 178upx;
							height: 300upx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							.goods-header{
								height: 178upx;
								width: 178upx;
								.img{
									height: 178upx;
									width: 178upx;
								}
							}
							.goods-footer{
								width: 100%;
								height: 100upx;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								.goods-title{
									@extend %overflow-2-line;
									color: $color-primary-plain;
									font-size: 22upx;
								}
								.goods-price{
									font-size: $uni-font-size-sm;
									color: $color-primary;
									text-align: center;
								}
							}
						}
					}
				}
			}

			/*猜你喜欢 或者 其他页面的商品列表*/
			.guess-you-like{
				margin-top: 10upx;
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
