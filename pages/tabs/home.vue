<template>
	<view class="container yuandan-bg">
		<div class="content-box">
			<div class="search-and-tabs">
				<!-- 首页的搜索框 -->
				<view class="my-search-box">
					<view class="my-search-input" @click="_goPage('search_with_hot_history')">
						<text class="iconfont icon-ddx-shop-hot"></text>
						<text>万千商品，等你来采购</text>
					</view>
				</view>
				<view class="sort" @click="_goPage('category')">
					<text class="iconfont icon-ddx-shop-fenlei"></text>
					<text style="margin: -6upx;color:#333333;">分类</text>
				</view>
			</div>

			<!-- 推荐 -- banner-->
			<view class="swiper-box" v-if="swiperList.length">
				<swiper circular="true" autoplay="true" :indicator-dots="true" indicator-active-color="#FFF" style="width: 100%;height: 268upx;">
					<swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index">
						<image class="banner-img" :lazy-load="true" :src="item.thumb" @click="_clickBanner(index)" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 推荐 -- 小图标-->
			<view class="limited-time" v-if="iconArr.length">
				<view class="item" v-for="(item, index) in iconArr" :key="index" @click="_clickIcon(item)">
					<image :src="item.thumb" :lazy-load="true" class="image"></image>
					<span class="text">{{item.title}}</span>
				</view>
			</view>
		</div>

		<!--	广告区域 	-->
		<div class="ad-space" @click="_goPage('activity20200424')">
			<img class="img" src="http://picture.ddxm661.com/f32b7202004231035065236.gif" />
		</div>

			<!-- 推荐tab栏里的数据 -->
			<view class="content">
				<!-- 元旦秒杀 -->
				<div class="yuandanmiao" v-if="seckill_list.length">
					<view class="yd-more" @click="_goPage('spike_list')"></view>
					<div class="ydms">
						<swiper circular="true" :indicator-dots="true" indicator-active-color="#FFF" style="width: 628rpx;height: 480rpx;margin:0 auto;">
							<swiper-item class="yd-swiper">
								<div class="ydms-box">
									<block v-for="(item, index) in seckill_list" :key="index">
										<div class="ydms-shop" v-if="index<3" @click="_goPage('spike_detail', {item_id: item.item_id, seckill_id: item.id})">
											<img class="ydms-img" :src="item.pic">
											<p class="shop-tit">{{item.item_name}}</p>
											<div class="shop-price">
												<div class="big-price">￥{{item.price}}</div>
												<div class="small-price">￥{{item.old_price}}</div>
											</div>
										</div>
									</block>
								</div>
							</swiper-item>
							<swiper-item class="yd-swiper" v-if="seckill_list.length > 3">
								<div class="ydms-box">
									<block v-for="(item, index) in seckill_list" :key="index">
										<div class="ydms-shop" v-if="index > 3 && index < 7" @click="_goPage('spike_detail', {item_id: item.item_id, seckill_id: item.id})">
											<img class="ydms-img" :src="item.pic" :lazy-load="true">
											<p class="shop-tit">{{item.item_name}}</p>
											<div class="shop-price"><div class="big-price">￥{{item.price}}</div><div class="small-price">￥{{item.old_price}}</div></div>
										</div>
									</block>
								</div>
							</swiper-item>
						</swiper>
					</div>
				</div>
				<!-- 元旦拼团抢购 -->
				<div class="yuandanmiao pintuan" v-if="assemble_list.length">
					<view class="yd-more" @click="_goPage('group_buy')"></view>
					<div class="ydms">
						<swiper circular="true" :indicator-dots="true" indicator-active-color="#FFF" style="width: 628rpx;height: 480rpx;margin:0 auto;">
							<swiper-item class="yd-swiper">
								<div class="ydms-box">
									<block v-for="(item, index) in assemble_list" :key="index">
										<div class="ydms-shop" v-if="index < 3" @click="_goPage('group_buy_detail', {assemble_id: item.id, item_id: item.item_id})">
											<img class="ydms-img" :src="item.pic" :lazy-load="true">
											<p class="shop-tit">{{ item.item_name }}</p>
											<div class="shop-price"><div class="big-price pintuan">￥{{ item.price }}<span class="ydms-people">{{ item.assemble_num }}人团</span></div><div class="small-price pintuan">￥{{ item.old_price }}</div></div>
										</div>
									</block>
								</div>
							</swiper-item>
							<swiper-item class="yd-swiper" v-if="assemble_list.length > 3">
								<div class="ydms-box">
									<block v-for="(item, index) in assemble_list" :key="index">
										<div class="ydms-shop" v-if="index > 3 && index < 7" @click="_goPage('group_buy_detail', {assemble_id: item.id, item_id: item.item_id})">
											<img class="ydms-img" :src="item.pic" :lazy-load="true">
											<p class="shop-tit">{{ item.item_name }}</p>
											<div class="shop-price"><div class="big-price pintuan">￥{{ item.price }}<span class="ydms-people">{{ item.assemble_num }}人团</span></div><div class="small-price pintuan">￥{{ item.old_price }}</div></div>
										</div>
									</block>
								</div>
							</swiper-item>
						</swiper>
					</div>
				</div>

				<!-- 六个分类，内容部分可以向左滑动-->
				<view style="padding: 10px;color: #000000;font-size: 48upx;font-weight: bold;" v-if="categoryGoodsList.length">
					好物精选
				</view>
				<view class="some-category" v-if="categoryGoodsList.length" v-for="(item, index) in categoryGoodsList" :key="index">
					<div class="some-category-banner" @click="_goPage('goods_search', {title: item.cname, id: item.category_id})">
						<img class="img" :src="item.thumb">
					</div>
					<div class="some-category-box">
						<swiper class="all-goods" display-multiple-items="4" autoplay="true" interval="3000" easing-function="linear">
							<swiper-item class="goods" v-for="(subItem, subIndex) in item.items" :key="subIndex" @click="_goPage('goods_detail', {id: subItem.id})">
								<div class="goods-header">
									<image class="img" :src="subItem.pic" :lazy-load="true"></image>
								</div>
								<div class="goods-footer">
									<div class="goods-title">{{subItem.title}}</div>
									<div class="goods-price">￥{{subItem.min_price}}</div>
								</div>
							</swiper-item>
						</swiper>
					</div>
				</view>

				<!-- 推荐页面的上拉无限加载商品 -->
				<view style="padding: 10px 10px 0 10px;color: #000000;font-size: 48upx;font-weight: bold;">
					猜你喜欢
				</view>
				<view class="guess-you-like">
					<view class="goods-list">
						<mGoods v-for="(item, index) in tabList[TabCur].goodsList" :key="index" :goodsInfo="item" @click.native="goGoodsDetails(item)"></mGoods>
					</view>

					<uni-load-more :status="tabList[0].requestData.moreStatus" :show-icon="true" class="load-more"></uni-load-more>
				</view>

			</view>


		<!-- 回到顶部 -->
		<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>

		<!-- 悬浮的联系客服按钮	-->
		<view class="customer-service" @click="contactCustomerService">
			<image class="img" src="../../static/images/customer-service.gif"></image>
		</view>
	</view>
</template>

<script>
	import mGoods from '@/components/goods/goods.vue'
	import backTop from '@/components/back-top/back-top.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
	import * as Constant from '../../utils/constant'
	import { mapState, mapMutations } from 'vuex'

	export default {
		/**
		// 从其他tab页面到首页, 回到推荐页面的顶部
		onTabItemTap(e) {
			console.log(e)
			if (e.index === 0) {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
				this.TabCur = 0
			}
		},
		 */

		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		},
		data() {
			return {
				//首页tab栏
				TabCur: 0, //当前选中的下标
				tabList: [{
					cname: '推荐',
					id: 0,
					thumb: '',
					requestData: {
						page: 1,
						limit: 10,
						moreStatus: 'loading',
					},
					goodsList: [], // 推荐页 无限下拉加载商品
				}],

				// 回到顶部
				backTop: {
					src: '../../static/back-top/backtop.png',
					scrollTop: 0
				},


				/**
				 * 推荐里的数据
				 */
				//推荐tab中的轮播图
				swiperList: [],
				//图标
				iconArr: [],
				//分类商品
				categoryGoodsList: [],

				// 限时秒杀列表
				seckill_list: [],
				// 获取拼团列表
				assemble_list: [],
			}
		},
		onLoad() {
			this._getBanner()
			this._getIcon()
			this._getCategoryGoodsList()
			this._getUnlimitedGoods()
		},
		async onReachBottom() {
			if (this.tabList[this.TabCur].requestData.moreStatus === 'noMore') {
				return
			}
			this.tabList[this.TabCur].requestData.page++
			if (this.TabCur === 0) {
				await this._getUnlimitedGoods()
			}
		},
		methods: {
			...mapMutations(['setShareID', 'setShopID']),
			_goPage(url, query = {}) {
				this.$openPage({
					name: url,
					query
				})
			},

			_getBanner() {
				this.$minApi.banner().then(res => {
					if (res.code === 200) {
						this.swiperList = res.data
					}
				})
			},
			_clickBanner(key) {
				console.log(this.swiperList[key])
				// this.swiperList[key].type   类型：1不跳转，2:跳转外部页面，3跳转到内部界面'
				// this.swiperList[key].url 地址
				// this.swiperList[key].value 参数 {"t":"121","member":"2222"}
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

			//推荐页面的图标
			async _getIcon() {
				await this.$minApi.getHomeIcon().then(res => {
					console.log("获取推荐选项卡里的图标数据：", res)
					if (res.code === 200) {
						this.iconArr = res.data
					}
				})
			},
			// 推荐页面的图标单击操作
			_clickIcon(item) {
				// "type":"1",     //跳转类型：1:不跳；2：跳网站；3：商品详情；4：拼团列表；5：抢购列表；6：新人专区
				console.log("单击了推荐页选项卡里的图标：", item)
				switch (item.type) {
					case 1:
						break
					case 2:
						if (item.value === 'msg') {
							this.msg('功能正在完善中，请敬请期待！')
							return
						}
						this._goPage('web_view', {
							url: item.value
						})
						break
					case 3:
						this._goPage('goods_detail', {
							id: item.value
						})
						break
					case 4:
						this._goPage('group_buy')
						break
					case 5:
						this._goPage('spike_list')
						break
					case 6:
						this.msg('功能正在完善中，请敬请期待！')
						// this._goPage('newcomer')
						// this._goPage('activity20200308')
						break
				}
			},

			// 推荐页面的六个板块数据
			async _getCategoryGoodsList() {
				await this.$minApi.categoryGoods().then(res => {
					console.log("获取推荐tab中的六个板块数据：", res)
					if (res.code === 200) {
						this.categoryGoodsList = res.data
					}
				})
			},
			/**
			 * 获取10个秒杀商品 和 10 拼团
			 */
			async _getSpikeList() {
				await this.$minApi.getSeckillList().then(res => {
					if (res.code === 200) {
						this.seckill_list = res.data
					}
				})
				await this.$minApi.getAssembleList().then(res => {
					if (res.code === 200) {
						this.assemble_list = res.data
					}
				})
			},
			// 推荐里的无限下拉加载更多商品
			async _getUnlimitedGoods() {
				this.tabList[0].requestData.moreStatus = 'loading'
				let data = {
					page: this.tabList[0].requestData.page,
					limit: this.tabList[0].requestData.limit,
				}
				await this.$minApi.searchGoods(data).then(res => {
					if (res.code === 200) {
						if (data.page === 1) {
							this.tabList[0].goodsList = res.data
						} else {
							this.tabList[0].goodsList.push(...res.data)
						}
						if (res.data.length < this.tabList[0].requestData.limit) {
							this.tabList[0].requestData.moreStatus = 'noMore'
						} else {
							this.tabList[0].requestData.moreStatus = 'more'
						}
					}
				})
			},
			// 去到商品详情/限时购详情/拼团详情
			goGoodsDetails(goods) {
				// 限时购
				if (goods.activity_id && goods.activity_type === 4) {
					this._goPage('spike_detail', {
						seckill_id: goods.activity_id,
						item_id: goods.id
					})
					return
				}
				this._goPage('goods_detail', {
					id: goods.id
				})
			},

			// 打开合从聊天弹窗
			contactCustomerService() {
				if (this.userInfo.id) {
					_AIHECONG('customer', {
						head: this.userInfo.pic, //该字段可以将顾客头像同步过来
						'名称': this.userInfo.nickname, // '属性名' : '值'
						'邮箱': '暂无',
						'手机': this.userInfo.mobile,
						'会员账号': "会员id：" + this.userInfo.id,
						'会员等级': '暂无'
					})
				}
				_AIHECONG('showChat')
			},
		},
		components: {
			mGoods,
			uniLoadMore,
			backTop
		},
		async onShow() {
			await this.wxConfig();
			let url = Constant[Constant.NODE_ENV].projectUrl
			if (this.userInfo.id) {
				url += `?user_id=${this.userInfo.id}`
			}
			url = Constant[Constant.NODE_ENV].shareRedirectURL + encodeURIComponent(url)
			this.$nextTick(async () => {
				let param1 = {
						title: '捣蛋熊商城', // 分享标题
						desc: '高品质、一站式服务平台', // 分享描述
						link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: `${window.location.origin}/h5/static/images/pandalogo.png`, // 分享图标
						success: function() {}
					},
					param2 = {
						title: '捣蛋熊商城', // 分享标题
						link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: `${window.location.origin}/h5/static/images/pandalogo.png`, // 分享图标
						success: function() {}
					}
				await this.wxConigShareGoods(param1, param2)
			})
			this._getSpikeList()
		},
		computed: {
			...mapState(['userInfo']),
		},
	}
</script>

<style lang="scss">
	.container {
		&.yuandan-bg {
			background: #E4F7F3;
		}

		.content-box {
			/*background-image: url('~@/static/images/yuandan-home/background.jpg');*/
			/*background-repeat: no-repeat;*/
			/*background-size: 100% 100%;*/
			/*height: 737upx;*/
			background-color: #ECFEF1;

			.search-and-tabs {
				width: 100%;
				height: 109upx;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.sort {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: center;
					margin-right: 20upx;
					font-size: 18upx;
					color: $uni-text-color-inverse;

					.icon-ddx-shop-fenlei {
						color: #FFFFFF;
						font-size: 38upx;
					}
				}

				/* 搜索框 */
				.my-search-box {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-left: $uni-spacing-row-base;
					width: 642upx;

					.my-search-input {
						border: 1upx solid #efefef;
						color: #999999;
						font-size: $uni-font-size-base;
						background: #fff;
						height: 60upx;
						width: 100%;
						padding: 0 10upx;
						border-radius: 30upx;
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;
						overflow: hidden;

						.iconfont {
							margin-right: 6upx;
						}
					}
				}

				/* tab栏 */
				.tabs {
					color: #FFFFFF;
					font-size: $uni-font-size-base;
					text-align: center;
					width: 100%;
				}
			}


			.swiper-box {
				padding: 0 $uni-spacing-row-sm;
				border-radius: 10upx;
				/*background: #fff;*/
				/*background-image: url('~@/static/images/double12-home/2.png');*/
				/*background-repeat: no-repeat;*/
				/*background-size: 100% 100%;*/
				/*padding-bottom: 300upx;*/
				overflow: hidden;
				margin-bottom: 20upx; // 图标 和 banner 距离
				.swiper-item {
					border-radius: 10upx;

					.banner-img {
						width: 100%;
						height: 268upx !important;
						border-radius: 10upx;
					}
				}
			}

			/*推荐页面的小图标*/
			.limited-time {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				/*background: #ffffff;*/
				padding: $uni-spacing-row-base 0;
				padding-top: 0;
				/*margin-top: 200upx;*/
				.item {
					display: flex;
					flex-wrap: nowrap;
					flex-direction: column;
					align-items: center;
					width: 20%;
					padding: $uni-spacing-col-sm 0;
					.image,
					image {
						width: 98upx;
						height: 98upx;
					}

					.text,
					text {
						font-size: $uni-font-size-sm;
						color: #333333;
					}
				}
			}
		}

		/* 广告位，一般用于跳转其他活动页面 */
		.ad-space {
			background-color: #ECFEF1;
			padding: $uni-spacing-row-base;
			.img {
				width: 100%;
			}
		}

		.content {

			/*六个分类，内容部分可以向左滑动*/
			.some-category {
				padding: 0 $uni-spacing-row-sm;
				margin-bottom: 28upx;

				.some-category-banner {
					width: 100%;
					border-radius: 8upx 8upx 0 0;
					overflow: hidden;
					background: #fff;

					.img {
						width: 100%;
					}
				}

				.some-category-box {
					border-radius: 0 0 8upx 8upx;
					background: #FFFFFF;
					height: 320upx;
					padding: 10upx;

					.all-goods {
						height: 100%;
						width: 100%;
						display: flex;
						flex-wrap: nowrap;

						.goods {
							padding: 0 10upx;
							width: 178upx;
							height: 300upx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;

							.goods-header {
								height: 178upx;
								width: 178upx;

								.img {
									height: 178upx;
									width: 178upx;
								}
							}

							.goods-footer {
								width: 100%;
								height: calc(100% - 178upx);
								display: flex;
								flex-direction: column;
								justify-content: flex-end;

								.goods-title {
									@extend %overflow-2-line;
									color: $color-primary-plain;
									font-size: 22upx;
								}

								.goods-price {
									font-size: $uni-font-size-sm;
									color: $color-primary;
									text-align: center;
								}
							}
						}
					}
				}
			}

			/* 元旦秒杀 */
			.yuandanmiao {
				height: 760upx;
				background: url("~@/static/images/yuandan-home/3.jpg") no-repeat;
				background-size: 100% 100%;
				overflow: hidden;
				position: relative;
				.yd-more {
					width: 90upx;
					height: 30upx;
					position: absolute;
					right: 44upx;
					top: 160upx;
				}

				&.pintuan {
					height: 730upx;
					background: url("~@/static/images/yuandan-home/4.jpg") no-repeat;
					background-size: 100% 100%;
				}
				.ydms {
					margin-top: 216upx;
					position: relative;
					&.tma{
						margin-top: 60upx;
					}
					.ydms-box {
						display: flex;
						justify-content: space-around;
						align-items: center;
						width: 625upx;
						margin: 8upx auto;
						overflow: hidden;

						.ydms-shop {
							width: 190rpx;
							height: 364rpx;
							padding: 8rpx;
							// border: 1px solid #FDEBCA;
							// background-color: #FDEBCA;
							// box-shadow: 0px 4px 4px 0px rgba(191, 104, 25, 0.2);
							position: relative;

							.ydms-people {
								display: inline-block;
								width: 74upx;
								height: 28upx;
								line-height: 28upx;
								margin-left: 5upx;
								text-align: center;
								color: #FFFFFF;
								font-size: 18upx;
								background: url("~@/static/images/yuandan-home/pintuan.png") no-repeat;
								background-size: contain;
							}

							.tit-img {
								position: absolute;
								top: 0;
								left: 0;
								width: 42upx;
								height: 42upx;
								background: url("~@/static/images/yuandan-home/tit.png") no-repeat;
								background-size: 100% 100%;
							}

							.ydms-img {
								width: 100%;
								height: 196upx;
								margin: 8upx 0;
								display: block;
								background-color: #fff;
							}

							.shop-tit {
								@extend %overflow-2-line;
								margin: 0;
								font-size: 24upx;
								color: #333333;
							}

							.shop-price {
								line-height: 40upx;
								margin-top: 12rpx;
								.big-price {
									color: #fff;
									font-size: 22upx;
									background: url("~@/static/images/yuandan-home/miaosha.png") no-repeat;
									background-size: contain;
									height: 32upx;
									line-height: 32upx;
									margin-top: 5upx;
									width: 138upx;
									display: flex;
									justify-content: space-between;
									align-items: center;
									&.pintuan{
										width: 100%;
										background: none;
										color: #F83D3D;
										font-size: 24upx;
										margin-bottom: 4upx;
									}
								}

								.small-price {
									color: #999999;
									font-size: 22upx;
									text-decoration: line-through;
									margin-left: 5upx;
								}

							}

							.shop-button {
								width: 118upx;
								line-height: 48upx;
								text-align: center;
								background: url("~@/static/images/yuandan-home/btn.png") no-repeat;
								background-size: 100% 100%;
								margin: 10upx auto;
								color: #fff;
								font-size: 20upx;
							}
						}
					}
				}
			}

			/*猜你喜欢 或者 其他页面的商品列表*/
			.guess-you-like {
				background-color: $background-color;
				margin-top: 10upx;
				.goods-list {
					padding: 10upx $uni-spacing-row-sm 0 $uni-spacing-row-sm;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: space-between;
				}
			}
		}


		/* 上拉加载更多 */
		.load-more {
			background-color: $background-color;
		}

		/* 悬浮的联系客服按钮 */
		.customer-service {
			z-index: 99999;
			width: 75upx;
			height: 75upx;
			border-radius: 50%;
			background: rgba(255, 255, 255, .8);
			position: fixed;
			bottom: 300upx;
			right: 20upx;

			.img {
				width: 76upx;
				height: 76upx;
			}
		}
	}
</style>
