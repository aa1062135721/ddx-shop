<template>
	<view class="container">
		<div class="smectite" @touchmove.stop.prevent="moveHandle" v-if="flag">
			<image src="http://picture.ddxm661.com/f6fbd202006011014312531.png" class="icon_x" @click="flag=false"></image>
			<image src="http://picture.ddxm661.com/7b63d202006011117435341.png" class="icon_six"  @click="_goPage('activity20200618')"></image>
		</div>
        <!-- 搜索框 分类图标 banner -->
		<div class="content-box">
            <!-- 搜索框 分类图标-->
			<div class="search-and-tabs">
				<div class="my-search-box">
					<div class="my-search-input" @click="_goPage('search_with_hot_history')">
						<i class="iconfont icon-ddx-shop-hot"></i>
						<span>万千商品，等你来采购</span>
					</div>
				</div>
				<div class="sort" @click="_goPage('category')">
					<i class="iconfont icon-ddx-shop-fenlei"></i>
					<span class="sort-text">分类</span>
				</div>
			</div>

			<!-- banner  -->
			<view class="swiper-box" v-if="swiperList.length">
				<swiper circular="true" autoplay="true" :indicator-dots="true" indicator-active-color="#FFF" style="width: 100%;height: 268upx;">
					<swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index">
						<image class="banner-img" :lazy-load="true" :src="item.thumb" @click="_clickBanner(index)" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</view>
		</div>

        <!-- 小图标  -->
       <view class="limited-time" v-if="iconArr.length">
            <view class="item" v-for="(item, index) in iconArr" :key="index" @click="_clickIcon(item)">
                <image :src="item.thumb" :lazy-load="true" class="image"></image>
                <span class="text">{{item.title}}</span>
            </view>
        </view>
		<!-- 618活动栏 -->
		<view class="six_banner"  @click="_goPage('activity20200618')">
			<image src="http://picture.ddxm661.com/8871d20200601115234158.gif"></image>
		</view>
		<!--	广告区域 	-->
        <!--
		<div class="ad-space" @click="_goPage('activity20200424')">
			<img class="img" src="http://picture.ddxm661.com/f32b7202004231035065236.gif" />
		</div>
        -->

        <!--    秒杀   -->
        <div class="spike-and-group" v-if="seckill_list.length">
            <div class="spike-and-group-title">
                <div class="spike-and-group-title-left">
                    <span>限时秒杀</span>
                </div>
                <div class="spike-and-group-title-right" @click="_goPage('spike_list')">
                    <i class="iconfont icon-ddx-shop-content_arrows"></i>
                </div>
            </div>
           <swiper class="spike-and-group-goods-box" circular="true" :indicator-dots="true" indicator-active-color="#FFF">
                <swiper-item class="spike-and-group-goods-box-swiper-item">
                    <block v-for="(item, index) in seckill_list" :key="index">
                        <div class="spike-and-group-goods-box-swiper-item-goods" v-if="index < 3" @click="_goPage('spike_detail', {item_id: item.item_id, seckill_id: item.id})">
                            <img class="goods-img" :src="item.pic">
                            <div class="goods-title">{{item.item_name}}</div>
                            <div class="goods-price">
                                <span class="price">￥{{item.price}}</span>
                                <div class="cart">
                                    <i class="iconfont icon-ddx-shop-shopping-cart-o"></i>
                                </div>
                            </div>
                        </div>
                    </block>
                </swiper-item>
                <swiper-item class="spike-and-group-goods-box-swiper-item" v-if="seckill_list.length > 3">
                    <block v-for="(item, index) in seckill_list" :key="index">
                        <div class="spike-and-group-goods-box-swiper-item-goods" v-if="index >= 3 && index <= 5" @click="_goPage('spike_detail', {item_id: item.item_id, seckill_id: item.id})">
                            <img class="goods-img" :src="item.pic" :lazy-load="true">
                            <div class="goods-title">{{item.item_name}}</div>
                            <div class="goods-price">
                                <span class="price">￥{{item.price}}</span>
                                <div class="cart">
                                    <i class="iconfont icon-ddx-shop-shopping-cart-o"></i>
                                </div>
                            </div>
                        </div>
                    </block>
                </swiper-item>
            </swiper>
        </div>

        <!--    拼团   -->
        <div class="spike-and-group" v-if="assemble_list.length" style="margin-top: 24rpx;">
            <div class="spike-and-group-title">
                <div class="spike-and-group-title-left">
                    <span>拼团汇聚</span>
                    <span class="spike-and-group-title-left-sub">3人成团 进行中</span>
                </div>
                <div class="spike-and-group-title-right" @click="_goPage('group_buy')">
                    <i class="iconfont icon-ddx-shop-content_arrows"></i>
                </div>
            </div>
            <swiper class="spike-and-group-goods-box" circular="true" :indicator-dots="true" indicator-active-color="#FFF">
                <swiper-item class="spike-and-group-goods-box-swiper-item">
                    <block v-for="(item, index) in assemble_list" :key="index">
                        <div class="spike-and-group-goods-box-swiper-item-goods" v-if="index < 3" @click="_goPage('group_buy_detail', {assemble_id: item.id, item_id: item.item_id})">
                            <img class="goods-img" :src="item.pic">
                            <div class="goods-title">{{item.item_name}}</div>
                            <div class="goods-price">
                                <span class="price">￥{{item.price}}</span>
                                <div class="cart">
                                    <i class="iconfont icon-ddx-shop-shopping-cart-o"></i>
                                </div>
                            </div>
                        </div>
                    </block>
                </swiper-item>
                <swiper-item class="spike-and-group-goods-box-swiper-item" v-if="assemble_list.length > 3">
                    <block v-for="(item, index) in assemble_list" :key="index">
                        <div class="spike-and-group-goods-box-swiper-item-goods" v-if="index >= 3 && index <= 5" @click="_goPage('group_buy_detail', {assemble_id: item.id, item_id: item.item_id})">
                            <img class="goods-img" :src="item.pic">
                            <div class="goods-title">{{item.item_name}}</div>
                            <div class="goods-price">
                                <span class="price">￥{{item.price}}</span>
                                <div class="cart">
                                    <i class="iconfont icon-ddx-shop-shopping-cart-o"></i>
                                </div>
                            </div>
                        </div>
                    </block>
                </swiper-item>
            </swiper>
        </div>

        <!-- 六个分类，内容部分可以向左滑动-->
        <view style="padding: 10px;color: #000000;font-size: 48upx;" v-if="categoryGoodsList.length">
            好物精选Ⅱ
        </view>
        <div class="some-category" v-if="categoryGoodsList.length" v-for="(item, index) in categoryGoodsList" :key="index">
            <div class="some-category-title">
                <div class="left img"></div>
                <div class="medium">{{item.cname}}</div>
                <div class="right img"></div>
            </div>
            <div class="some-category-banner" @click="_goPage('goods_search', {title: item.cname, id: item.category_id})">
                <image class="img" :src="item.thumb" :lazy-load="true"></image>
            </div>
            <swiper style="height:277rpx;" display-multiple-items="4" autoplay="true" interval="3000" easing-function="linear">
                <swiper-item class="some-category-box" v-for="(subItem, subIndex) in item.items" :key="subIndex" @click="_goPage('goods_detail', {id: subItem.id})">
                    <div class="some-category-box-goods" @click="_goPage('goods_detail', {id: subItem.id})">
                        <image class="goods-img" :src="subItem.pic" :lazy-load="true"></image>
                        <div class="goods-title">{{subItem.title}}</div>
                        <div class="goods-price">
                            <span class="price">￥{{subItem.min_price}}</span>
                            <div class="cart">
                                <i class="iconfont icon-ddx-shop-shopping-cart-o"></i>
                            </div>
                        </div>
                    </div>
                </swiper-item>
            </swiper>
        </div>

        <!--  上拉无限加载商品 -->
        <view style="padding: 10px 10px 0 10px;color: #000000;font-size: 48upx;">
            猜你喜欢Ⅱ
        </view>
        <view class="guess-you-like">
            <view class="goods-list">
                <mGoods v-for="(item, index) in tabList[TabCur].goodsList" :key="index" :goodsInfo="item" @click.native="goGoodsDetails(item)"></mGoods>
            </view>
            <uni-load-more style="background-color: #FFEAEF;" :status="tabList[0].requestData.moreStatus" :show-icon="true" class="load-more"></uni-load-more>
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
				//蒙层控制按钮
				flag:"true", 
			}
		},
		onLoad() {
			this._getBanner()
			this._getIcon()
			this._getCategoryGoodsList()
			this._getUnlimitedGoods()
            this._getSpikeList()
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
					console.log(res)
					if (res.code === 200) {
						this.swiperList = res.data
					}
				})
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
			//推荐页面的图标
			async _getIcon() {
				await this.$minApi.getHomeIcon().then(res => {
					if (res.code === 200) {
						this.iconArr = res.data
					}
				})
			},
			// 推荐页面的图标单击操作
			_clickIcon(item) {
				console.log("单击了推荐页选项卡里的图标：", item)
                // item.type   类型：1不跳转，2:跳转外部页面，3跳转到内部界面 4:弹出提示（功能正在完善中，请敬请期待！）
                // item.url 地址 如果type为2的话，这个url必定为网页地址，如果type为3的话，这个url是本项目router.js中的某个页面的name值，他是唯一的
                // item.value 参数 {"t":"121","member":"2222"}
                switch (item.type) {
                    case 1:
                        break
                    case 2:
                        this._goPage('web_view', {
                            url: item.url
                        })
                        break
                    case 3:
                        this._goPage(item.url, JSON.parse(item.value))
                        break
                    case 4:
                        this.msg('功能正在完善中，请敬请期待！')
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
		},
		computed: {
			...mapState(['userInfo']),
		},
	}
</script>

<style lang="scss">
    page{
        background-color: #FFEAEF;
    }

	.container {
		position: relative;
		.smectite{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: rgba(0,0,0,0.8);
			z-index: 10;
			.icon_x{
				width: 60rpx;
				height: 60rpx;
				position: fixed;
				left: 75%;
				top: 25%;
				z-index: 10;
			}
			.icon_six{
				width: 60%;
				height: 50%;
				position: fixed;
				margin: auto;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
			}
		}
		.content-box {
			background-image: url(http://picture.ddxm661.com/b9843202005081452154790.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			/*搜索框和分类图标*/
			.search-and-tabs {
				width: 100%;
				height: 109upx;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				align-items: center;

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
				.sort {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: center;
					margin-right: 20upx;
					font-size: 18upx;
                    .sort-text{
                        margin: -6rpx;
                        color: #fff;
                    }
					.iconfont{
						font-size: 38upx;
                        color: #fff;
					}
				}
			}
			/*banner*/
			.swiper-box {
				padding: 0 $uni-spacing-row-sm;
				border-radius: 10upx;
				overflow: hidden;
				margin-bottom: 20upx;
				.swiper-item {
					border-radius: 10upx;

					.banner-img {
						width: 100%;
						height: 268upx !important;
						border-radius: 10upx;
					}
				}
			}
		}

		/* 推荐页面的小图标 */
		.limited-time {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			padding: $uni-spacing-row-base 0;
			padding-top: 0;
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
		// 618活动banner栏
		.six_banner{
			display: flex;
			justify-content: space-around;
			margin-bottom: 20rpx;
			image{
				width: 95%;
				height: 200rpx;
			}
		}
		/* 广告位，一般用于跳转其他活动页面 */
		.ad-space {
			padding: $uni-spacing-row-base;
			.img {
				width: 100%;
			}
		}

        /* 秒杀 和 拼团  */
        .spike-and-group{
            margin: auto;
            width:702rpx;
            height:440rpx;
            background:rgba(255,0,92,1);
            border-radius:12rpx;
            overflow: hidden;

            .spike-and-group-title{
                display: flex;
                justify-content: space-between;
                height: 84rpx;
                align-items: center;
                padding: 0 12rpx;
                .spike-and-group-title-left{
                    display: flex;
                    align-items: center;
                    color: #fff;
                    font-size: $uni-font-size-lg;
                    .spike-and-group-title-left-sub{
                        margin-left: 30rpx;
                        font-size: $uni-font-size-sm;
                    }
                }
                .spike-and-group-title-right{
                    .iconfont{
                        color: #fff;
                        font-size: $uni-font-size-base;
                    }
                }
            }
            .spike-and-group-goods-box{
                height: 368rpx;
                padding: 0 12rpx;
                .spike-and-group-goods-box-swiper-item{
                    height: 324rpx;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    .spike-and-group-goods-box-swiper-item-goods{
                        border-radius: 4rpx;
                        overflow: hidden;
                        width: 218rpx;
                        height: 324rpx;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        background-color: #fff;
                        margin: 0 6rpx;
                        .goods-img{
                            width: 218rpx;
                            height: 218rpx;
                        }
                        .goods-title{
                            padding: 0 12rpx;
                            @extend %overflow-2-line;
                            font-size: 20rpx;
                            color: #222222;
                            overflow: hidden;
                        }
                        .goods-price{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 6rpx 8rpx;
                            .price{
                                color: #DC0952;
                                font-size:20rpx;
                            }
                            .cart{
                                width: 30rpx;
                                height: 30rpx;
                                border-radius: 50%;
                                background-color: #DC0952;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                .iconfont{
                                    margin-top: 2rpx;
                                    font-size: 20rpx;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }
        }

        /*六个分类，内容部分可以向左滑动*/
        .some-category {
            margin:0 auto;
            margin-bottom: 28rpx;
            width:702rpx;
            height:647rpx;
            box-shadow:0 0 16rpx #FF005C;
            border-radius: 12rpx;

            .some-category-title{
                height: 74rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                .img{
                    width: 50rpx;
                    height: 20rpx;
                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAUCAYAAAAdmmTCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZDBhMGFkOS0xNDkwLTBmNGEtOTAyMS1hYzkxZjRhOWRmNjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzM4ODQ2QjQ5MERFMTFFQTgxNTdCOTVCRDYzMDcyNkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzM4ODQ2QjM5MERFMTFFQTgxNTdCOTVCRDYzMDcyNkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M2E1ZGEzZDEtOGRlOS1kNjRhLWJlMjYtMjVjYjk3ZjFiZGFjIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmVkMGEwYWQ5LTE0OTAtMGY0YS05MDIxLWFjOTFmNGE5ZGY2MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv94KSUAAALnSURBVHjazFbNaxNBFJ/ZbIM1pjFp60fSgFjbEosimkMEA57sQRFELfoH6N2DUIXiSRShIngQ/4JiBdGL+AGKpdpgbQ/aGi9tUzcfppWUJmm6SbMzvomzZbM0H7Zrkwc/3uy8t29/8+bNm8WUUrQVMnT8ctFzb0DEoC6yIWAPIAx4AXgy5MsTjc9ZwGlAGyAOeAr2l8wuotpJH+CS5tnD4QXS1/ncXUCPxscFOAp2DyxgANci8/BxH6jHZdzvA7KAG2V8rtYq8+cr2K8AlAo+Fwrkx3GPBdRJwC7APGCYO5wAtAIWAB+O0dcZg8gfqWC3VhND4Nvp5/XUwPUpXmtuwDau/fpDtwlpNiKGWjbOKoLvNYi4hWIkY4osm4yTEvhArsJZNoi8PSuirwbECTDyQsbe8AU0KeOYB4wYRH77zG7yDPTqRgPAzq2AesjI74h1WRMJd+M7IuLfekdFxPFFV+OraZ8jbBB502QbCYcd9AH92w7/lXgq1ELuQZ8PM/JmNgkEk7Ne+7BsFSf4LhA2DnntH2FhWWScFHb4U6cyMekmN/MmFKr2xVURTY3tV/rG2smUesOyYGrto0h3U8gZTBEEaYketP5UF2wg+TTAxgZBF4mGWkm//4fpjC2Dz2GeyHWyLScsdPB9t/KW4AKXtEo+pQZTJepZI639oFHCSrMJwP5b0IoZ5d8cVp4fkoTxzphwzUSKu5oioF9BJxn4DqWmTvF7p5BxdnAWSxygHLflDCTPSlDSN4hvbiKNdCn9UEYzGuJSoEO5pSMuqXwEzeSSLsNsnKzimt5o6czq22/cRpdHO5Q7QHqBCCgROKDcjthpkpuXAdOAtVteXKeXU76lMvq/kuULYBdii5rI2E6alprJIxPB5oiDLvHkzfMKKBKxRNCtEsrPQIr/ghQO7Od2EtSUrVSKk9g7OojqQBg5Vuv7+L+UWgVz5cpWQPUjhJPN8eYxV+m8iai+hJGNacZl5Y8AAwBv3gxT0NYKqgAAAABJRU5ErkJggg==");
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
                .left{
                    margin-right: 20rpx;
                }
                .medium{
                    color: #E0004E;
                    font-size: $uni-font-size-lg;
                }
                .right{
                    transform: scaleX(-1);
                    margin-left: 20rpx;
                }
            }
            .some-category-banner{
                .img{
                    width:702rpx;
                    height:272rpx;
                }
            }
            .some-category-box{
                width:100%;
                height:277rpx;
                display: flex;
                justify-content: center;
                .some-category-box-goods{
                    border-radius: 4rpx;
                    overflow: hidden;
                    width:161rpx;
                    height:277rpx;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    background-color: #fff;
                    .goods-img{
                        width: 161rpx;
                        height: 164rpx;
                    }
                    .goods-title{
                        padding: 0 12rpx;
                        @extend %overflow-2-line;
                        font-size: 20rpx;
                        color: #222222;
                        overflow: hidden;
                    }
                    .goods-price{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 8rpx 8rpx;
                        .price{
                            color: #DC0952;
                            font-size:20rpx;
                        }
                        .cart{
                            width: 30rpx;
                            height: 30rpx;
                            border-radius: 50%;
                            background-color: #DC0952;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            .iconfont{
                                margin-top: 2rpx;
                                font-size: 20rpx;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }

        /*猜你喜欢 或者 其他页面的商品列表*/
        .guess-you-like {
            margin-top: 10upx;
            .goods-list {
                padding: 10upx $uni-spacing-row-sm 0 $uni-spacing-row-sm;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;
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
