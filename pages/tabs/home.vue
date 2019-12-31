<template>
	<view class="container">
		<div class="search-and-tabs">
			<!-- 首页的搜索框 -->
			<view class="my-search-box">
				<view class="my-search-input" @click="_goPage('search_with_hot_history')">
					<text class="iconfont icon-ddx-shop-hot"></text>
					<text>万千商品，等你来采购</text>
				</view>
			</view>

			<!-- 一级tab栏 -->
			<wuc-tab :tab-list="tabList" :textFlex="true" :tabCur.sync="TabCur" tab-class="tabs"  @change="tabChange"
					 style="position: fixed;left: 0;width: 100%;z-index: 999;"
					 :style="style"
			></wuc-tab>
		</div>

			<!--	站位符	-->
			<view class="my-block"></view>
			<!-- 推荐tab栏里的数据 -->
			<view class="content" v-if="TabCur === 0">
				<!-- 推荐 -- banner-->
				<view class="swiper-box" v-if="swiperList.length">
					<swiper circular="true" autoplay="true" :indicator-dots="true" indicator-active-color="#FC8A8A" style="width: 100%;height: 268upx;">
						<swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index">
							<image class="banner-img" :lazy-load="true"	:src="item.thumb" @click="_clickBanner(index)" mode="widthFix"></image>
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

				<!--	新人专享 	-->
<!--				<view class="newcomer" @click="_goPage('newcomer')">-->
<!--					<img class="img" src="../../static/images/newcomer.gif" />-->
<!--				</view>-->

				<!-- 超级拼团 限时秒杀 童装童鞋 境外购-->
<!--
				<view class="goods-category">
--->
					<!-- 通知栏 -->
					<!---
					<view class="global-notice" v-if="notice.length">
						<view class="box">
							<view class="notice-img">
								<image class="img" src="../../static/images/notice-img.png"></image>
							</view>
							<view class="hot-spot">热点</view>
							<view class="notice-content">{{notice[0].title}}</view>
						</view>
					</view>
					<view class="all-goods">
						<view class="item">
							<view class="title-box" @click="_goPage('group_buy')">
								<view class="title">
									<text>超级拼团</text>
									<text class="more-text">
										更多 <text class="iconfont icon-ddx-shop-content_arrows"></text>
									</text>
								</view>
								<view class="sub-title">约惠好友 超值拼购</view>
							</view>
							<view class="goods-info">
								<view class="goods" v-for="(item, index) in combination.assemble_list" :key="index" @click="_goPage('group_buy_detail', {assemble_id: item.id, item_id: item.item_id})">
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
								<view class="title">
									<text>限时秒杀</text>
									<text class="more-text">
										更多 <text class="iconfont icon-ddx-shop-content_arrows"></text>
									</text>
								</view>
								<view class="sub-title">爆品限时限量抢</view>
							</view>
							<view class="goods-info">
								<view class="goods" v-for="(item, index) in combination.seckill_list" :key="index"  @click="_goPage('spike_detail', {seckill_id: item.id, item_id: item.item_id})">
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
						<view class="item" v-if="combination.tong_list.data.length">
							<view class="title-box" @click="_goPage('goods_search', {title: combination.tong_list.name, id: combination.tong_list.id})">
								<view class="title">
									<text>童装童鞋</text>
									<text class="more-text">
										更多 <text class="iconfont icon-ddx-shop-content_arrows"></text>
									</text>
								</view>
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
						<view class="item" v-if="combination.kua_list.data.length">
							<view class="title-box" @click="_goPage('goods_search', {title: combination.kua_list.name, id: combination.kua_list.id, is_cate: 1})">
								<view class="title">
									<text>跨境购</text>
									<text class="more-text">
										更多 <text class="iconfont icon-ddx-shop-content_arrows"></text>
									</text>
								</view>
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
-->
				<!--	天天秒杀			-->
				<view class="tiantianmiaosha"  v-if="seckill_list.length !== 0">
					<view class="top-banner" @click="_goPage('spike_list')"></view>
					<view class="body-content">
						<scroll-view  scroll-x="true">
							<view class="all-goods">
								<view class="goods" v-for="(item, index) in seckill_list" :key="index" @click="_goPage('spike_detail', {item_id: item.item_id, seckill_id: item.id})">
									<view class="goods-header">
										<image class="img" :src="item.pic" :lazy-load="true"></image>
									</view>
									<div class="goods-footer">
										<div class="goods-title">{{item.item_name}}</div>
										<div class="goods-price">
											<span class="old-price">￥{{item.old_price}}</span>
											<span class="now-price">￥{{item.price}}</span>
										</div>
										<div class="btn-box">
											<div class="btn" v-show="item.status === 1">立即抢购</div>
											<div class="btn not-now" v-show="item.status === 2">即将开始</div>
										</div>
									</div>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<!--	拼团特惠			-->
				<div class="pintuantehui-box-big-div" v-show="assemble_list.length !== 0">
					<view class="pintuantehui">
						<view class="top-banner" @click="_goPage('group_buy')"></view>
						<view class="body-content">
							<scroll-view  scroll-x="true" style="background: #FFFFFF;border-radius:10upx;padding:0 20upx;">
								<view class="all-goods">
									<view class="goods" v-for="(item, index) in assemble_list" :key="index" @click="_goPage('group_buy_detail', {assemble_id: item.id, item_id: item.item_id})">
										<view class="goods-header">
											<image class="img" :src="item.pic" :lazy-load="true"></image>
											<div class="flag">{{item.assemble_num}}人团</div>
										</view>
										<div class="goods-footer">
											<div class="goods-title">{{item.item_name}}</div>
											<div class="goods-price">
												<span class="old-price">￥{{item.old_price}}</span>
												<span class="now-price">￥{{item.price}}</span>
											</div>
										</div>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</div>

				<!-- HOT SALE-->
				<!---

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

				-->
				<!-- 好物享不停 -->
<!--
				<view class="goods-share-no-stop" v-if="explosion.length">
					<view class="goods-share-no-stop-box">
						<view class="goods-top">
							<view class="item" @click="_goPage('goods_detail', {id: explosion[0].item.id})">
								<view class="goods-tag">好评第一</view>
								<view class="goods-price">￥{{parseInt(explosion[0].item.min_price)}}</view>
								<image class="img" :src="explosion[0].item.pic"></image>
							</view>
							<view class="item" style="height:336upx;" @click="_goPage('goods_detail', {id: explosion[1].item.id})">
								<view class="goods-tag">销量第一</view>
								<view class="goods-price" style="height: 64upx;width: 64upx;font-size: 20upx;line-height: 64upx">￥{{parseInt(explosion[1].item.min_price)}}</view>
								<image class="img" :src="explosion[1].item.pic"></image>
							</view>
							<view class="item" @click="_goPage('goods_detail', {id: explosion[2].item.id})">
								<view class="goods-tag">热门推荐</view>
								<view class="goods-price">￥{{parseInt(explosion[2].item.min_price)}}</view>
								<image class="img" :src="explosion[2].item.pic"></image>
							</view>
						</view>
						<view class="goods-box" v-if="explosion.length >= 3">
							<view class="item" v-for="(item, index) in explosion[3].item" :key="index" @click="_goPage('goods_detail', {id: item.id})">
								<view class="goods-title">
									<view class="title">
										{{item.title}}
									</view>
									<view class="footer">
										<view class="price">￥{{item.min_price}}</view>
										<view class="btn">立即购买</view>
									</view>
								</view>
								<view class="goods-img">
									<image class="img" :src="item.pic"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
-->

				<view style="padding: 10px;color: #000000;font-size: 20px;font-weight: bold;">
					好物精选
				</view>
				<!-- 六个分类，内容部分可以向左滑动-->
				<view class="some-category" v-if="categoryGoodsList.length" v-for="(item, index) in categoryGoodsList" :key="index">
					<div class="some-category-banner" @click="_goPage('goods_search', {title: item.cname, id: item.category_id})">
						<img class="img" :src="item.thumb">
					</div>
					<div class="some-category-box">
						<scroll-view  scroll-x="true">
							<div class="all-goods">
								<div class="goods" v-for="(subItem, subIndex) in item.items" :key="subIndex" @click="_goPage('goods_detail', {id: subItem.id})">
									<div class="goods-header">
										<image class="img" :src="subItem.pic" :lazy-load="true"></image>
									</div>
									<div class="goods-footer">
										<div class="goods-title">{{subItem.title}}</div>
										<div class="goods-price">￥{{subItem.min_price}}</div>
									</div>
								</div>
							</div>
						</scroll-view>
					</div>
				</view>

				<view style="padding: 10px 10px 0 10px;color: #000000;font-size: 20px;font-weight: bold;">
					猜你喜欢
				</view>
				<!-- 推荐页面的上拉无限加载商品 -->
				<view class="guess-you-like">
					<view class="goods-list">
						<mGoods v-for="(item, index) in tabList[TabCur].goodsList" :key="index" :goodsInfo="item" @click.native="goGoodsDetails(item)"></mGoods>
					</view>
				</view>
			</view>
			<!-- 其他tab栏里的数据 -->
			<view class="content" v-if="TabCur !== 0">
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


			<!-- 悬浮的联系客服按钮	-->
			<view class="customer-service" @click="contactCustomerService">
				<image class="img" src="../../static/images/customer-service.gif"></image>
			</view>
	</view>
</template>

<script>
    import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	// import separator from "@/components/separator.vue"
	import mGoods from '@/components/goods/goods.vue'
	import WlmTab from '@/components/wlm-tab/wlm-tab.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
	import * as Constant from '../../utils/constant'
	import {mapState, mapMutations} from 'vuex'

	export default {
		onTabItemTap(e){
			console.log(e)
			if (e.index === 0) {
				uni.pageScrollTo({scrollTop: 0,duration: 200});
				this.TabCur = 0
			}
		},
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
						goodsList:[],// 推荐页 无限下拉加载商品
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
					tong_list: {
						data:[],
					},
					kua_list:{
						data:[],
					},
				},
				// 限时秒杀列表
				seckill_list: [],
				// 获取拼团列表
				assemble_list: [],
			}
		},
		onLoad() {
			this._getCategory()
			this._getBanner()
			this._getIcon()
			this._getNotice()
			// this._getCombination()
			// this._getSpikeList()
			// this._getExplosion()
			this._getCategoryGoodsList()
			this._getUnlimitedGoods()
		},
		async onReachBottom() {
			if (this.tabList[this.TabCur].requestData.moreStatus === 'noMore') {
				return
			}
			this.tabList[this.TabCur].requestData.page ++
			if (this.TabCur === 0) {
				await this._getUnlimitedGoods()
			} else {
				await this._getGoodsList()
			}
		},
		methods: {
			...mapMutations(['setShareID', 'setShopID']),
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
				// this.swiperList[key].type   类型：1不跳转，2:跳转外部页面，3跳转到内部界面'
				// this.swiperList[key].url 地址
				// this.swiperList[key].value 参数 {"t":"121","member":"2222"}
				switch (this.swiperList[key].type) {
					case 1:
						break
					case 2:
						this._goPage('web_view',{url: this.swiperList[key].url})
						break
					case 3:
						this._goPage(this.swiperList[key].url, JSON.parse(this.swiperList[key].value))
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
						if (item.value === 'msg'){
							this.msg('功能正在完善中，请敬请期待！')
							return
						}
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
						this.msg('功能正在完善中，请敬请期待！')
						// this._goPage('newcomer')
						break
                }
			},

			// 推荐页面的六个板块数据
			async _getCategoryGoodsList(){
				await this.$minApi.categoryGoods().then(res => {
					console.log("获取推荐tab中的六个板块数据：",res)
					if (res.code === 200){
						this.categoryGoodsList = res.data
					}
				})
			},
			//公告
			async _getNotice(){
				await this.$minApi.notice().then(res => {
					console.log("获取推荐tab中的公告：",res)
					if (res.code === 200){
						this.notice = res.data
					}
				})
			},
			// 超级拼团 限时秒杀 童装童鞋 境外购
			async _getCombination(){
				await this.$minApi.combination().then(res => {
					console.log("获取推荐tab中的 超级拼团 限时秒杀 童装童鞋 境外购：",res)
					if (res.code === 200){
						this.combination = res.data
					}
				})
			},
			/**
			 * 获取10个秒杀商品 和 10 拼团
			 */
			async _getSpikeList(){
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
			//hot sale 人气爆款
			async _getExplosion(){
				await this.$minApi.explosion().then(res => {
					console.log("hot sale 人气爆款数据：",res)
					if (res.code === 200){
						this.explosion = res.data
					}
				})
			},
			// 推荐里的无限下拉加载更多商品
			async _getUnlimitedGoods(){
				this.tabList[0].requestData.moreStatus = 'loading'
				let data = {
					page: this.tabList[0].requestData.page,
					limit: this.tabList[0].requestData.limit,
				}
				await this.$minApi.searchGoods(data).then(res => {
					if (res.code === 200){
						if (data.page === 1) {
							this.tabList[0].goodsList = res.data
						} else {
							this.tabList[0].goodsList.push(...res.data)
						}
						if (res.data.length <  this.tabList[0].requestData.limit) {
							this.tabList[0].requestData.moreStatus = 'noMore'
						} else {
							this.tabList[0].requestData.moreStatus = 'more'
						}
					}
				})
			},

			// 去到商品详情/限时购详情/拼团详情
			goGoodsDetails(goods){
				console.log('商品信息：', goods)

				// 限时购
				if (goods.activity_id && goods.activity_type === 4) {
					this._goPage('spike_detail', {seckill_id: goods.activity_id,item_id: goods.id})
					return
				}
				// // 秒杀
				// if (goods.activity_id && goods.activity_type === 2) {
				// 	this._goPage('spike_detail', {seckill_id: goods.activity_id, item_id: goods.id})
				// 	return
				// }
				// //拼团活动
				// if (goods.activity_id && goods.activity_type === 3) {
				// 	this._goPage('group_buy_detail', {assemble_id: goods.activity_id, item_id: goods.id})
				// 	return
				// }

				this._goPage('goods_detail', {id: goods.id})
			},

			// 打开合从聊天弹窗
			contactCustomerService(){
				if (this.userInfo.id){
					_AIHECONG('customer',{
						head : this.userInfo.pic, //该字段可以将顾客头像同步过来
						'名称' : this.userInfo.nickname,  // '属性名' : '值'
						'邮箱' : '暂无',
						'手机' : this.userInfo.mobile,
						'会员账号' : "会员id：" + this.userInfo.id,
						'会员等级' : '暂无'
					})
				}
				_AIHECONG('showChat')
			},
		},
		components: {
			WucTab,
			// separator,
			mGoods,
			WlmTab,
			uniLoadMore,
		},
		async onShow(){
			// 如果是安卓平台 每次进入商品详情页面就会调用微信配置，自定义分享商品
			if ((await this.getPlatform()).isAndroid){
				await this.wxConfig()
			}
			let url = Constant[Constant.NODE_ENV].projectUrl
			if(this.userInfo.id) {
				url += `?user_id=${this.userInfo.id}`
			}
			url = Constant[Constant.NODE_ENV].shareRedirectURL + encodeURIComponent(url)
			this.$nextTick(async () => {
				let param1 = {
							title: '捣蛋熊商城', // 分享标题
							desc: '高品质、一站式服务平台', // 分享描述
							link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: `${window.location.origin}/h5/static/images/pandalogo.png`, // 分享图标
							success: function () {}
						},
						param2 = {
							title: '捣蛋熊商城', // 分享标题
							link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: `${window.location.origin}/h5/static/images/pandalogo.png`, // 分享图标
							success: function () {}
						}
				await this.wxConigShareGoods(param1, param2)
			})
			this._getSpikeList()
		},
		computed: {
			...mapState(['userInfo']),
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

		},
	}
</script>

<style lang="scss">
	.container{
		.search-and-tabs{
			width: 100%;
			height: calc( 80upx + 90upx);
			overflow: hidden;
			/*background-image: url('~@/static/images/double12-home/1.png');*/
			/*background-repeat: no-repeat;*/
			/*background-size: 100% 100%;*/
			background-color: #fff;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999999;
			/* 搜索框 */
			.my-search-box{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: $uni-spacing-row-base $uni-spacing-row-base 0 $uni-spacing-row-base ;
				width: 100%;
				.my-search-input{
					border: 1upx solid #efefef;
					color: #999999;
					font-size: $uni-font-size-base;
					background: #fff;
					height: 60upx;
					width: 100%;
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

			/* tab栏 */
			.tabs{
				color: #333333;
				font-size: $uni-font-size-base;
				text-align: center;
				width: 100%;
			}
		}
		.my-block{
			width: 100%;
			height: calc( 80upx + 90upx);
			background: #fff;
		}
		.content{
			.swiper-box{
				padding: 10upx $uni-spacing-row-sm;
				border-radius: 10upx;
				background: #fff;
				/*background-image: url('~@/static/images/double12-home/2.png');*/
				/*background-repeat: no-repeat;*/
				/*background-size: 100% 100%;*/
				/*padding-bottom: 300upx;*/
				overflow: hidden;
				.swiper-item{
					border-radius: 10upx;
					.banner-img{
						width: 100%;
						height: 268upx!important;
						border-radius: 10upx;
					}
				}
			}
			/*推荐页面的小图标*/
			.limited-time{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				background: #ffffff;
				padding: $uni-spacing-row-base 0;
				padding-top: 0;
				.item{
					display: flex;
					flex-wrap: nowrap;
					flex-direction: column;
					align-items: center;
					width: 20%;
					padding: $uni-spacing-col-sm 0;
					.image,image{
						width:98upx;
						height: 98upx;
					}
					.text,text{
						font-size: $uni-font-size-sm;
						color: $color-primary-plain;
					}
				}
			}

			/* 新人专享 */
			.newcomer{
				background: #FFFFFF;
				.img{
					width: 100%;
				}
			}

			/*超级拼团 限时秒杀 童装童鞋 跨境商品*/
			.goods-category{
				padding: 0 $uni-spacing-row-sm;
				margin-bottom: 20upx;
				/*通知栏*/
				.global-notice{
					background: #fff;
					overflow: hidden;
					padding:0 $uni-spacing-row-base;
					@extend %border-color-solid-botton;
					border-radius:8upx 8upx 0 0;
					.box{
						height: 80upx;
						display: flex;
						align-items: center;
						.notice-img{
							margin-right: 14upx;
							.img{
								width:154upx;
								height:30upx;
							}
						}
						.hot-spot{
							color: $color-primary;
							border: 1px solid $color-primary;
							font-size: 14upx;
							width:50upx;
							text-align: center;
							line-height: 26upx;
							border-radius:11upx;
							margin-right: 14upx;
						}
						.notice-content{
							color: #666666;
							font-size: $uni-font-size-sm;
						}
					}

				}
				.all-goods{
					margin: auto;
					background: #FFFFFF;
					border-radius:0 0 8upx 8upx;
					width: 710upx;
					display: flex;
					flex-wrap: wrap;
					.item{
						width: 50%;
						height: 50%;
						box-sizing: border-box;
						border-left: 1px solid #efefef;
						border-bottom: 1px solid #efefef;
						&:nth-child(1){
							border-left: none;
						}

						&:nth-child(3){
							border-bottom: none;
							border-left: none;
						}
						&:nth-child(4){
							border-bottom: none;
						}
						padding: 30upx 20upx 26upx 20upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.title-box{
							margin-bottom: 20upx;
							.title{
								font-size: $uni-font-size-base;
								color: $color-primary-plain;
								font-weight: 600;
								display: flex;
								justify-content: space-between;
								.more-text{
									font-weight: normal;
									color: #999999;
									font-size: 18upx;
									.iconfont{
										margin-left: 4upx;
										font-size: 18upx;
									}
								}
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
										border-radius: 4upx;
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
								z-index: 99;
							}
							.img{
								width: 204upx;
								height: 204upx;
							}
						}
						.goods-footer{
							width: 100%;
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

			/* 好物享不停 */
			.goods-share-no-stop{
				padding: 0 $uni-spacing-row-base;
				margin-bottom: 20upx;
				.goods-share-no-stop-box{
					background-image: url("~@/static/images/goods-share-no-stop.png");
					height: 1166upx;
					background-size: 100% 100%;
					background-repeat: no-repeat;
					.goods-top{
						padding: $uni-spacing-row-sm;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						padding-top: 220upx;
						.item{
							width:218upx;
							height:300upx;
							background:#FFFFFF;
							border-radius:8upx;
							position: relative;
							overflow: hidden;
							.img{
								position: absolute;
								bottom: 0;
								left: 0;
								width: 218upx;
								height: 218upx;
								border-radius: 4upx;
							}
							.goods-tag{
								position: absolute;
								top: 20upx;
								left: 0;
								background: $color-primary;
								color: #FFFFFF;
								font-size: 18upx;
								width:102upx;
								height:34upx;
								line-height:34upx;
								text-align: center;
								border-radius:0 17upx 17upx 0;
								z-index: 99;
							}
							.goods-price{
								position: absolute;
								top: 6upx;
								right: 10upx;
								color: #FD3666;
								font-size: 16upx;
								width:60upx;
								height:60upx;
								line-height:60upx;
								text-align: center;
								z-index: 99;
								background-size: cover;
								background-repeat: no-repeat;
								background-image: url('~@/static/images/price-tag.png');
							}
						}
					}
					.goods-box{
						padding: $uni-spacing-row-sm;
						padding-top: 0;
						height: 560upx;
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap;
						.item{
							width:328upx;
							height:178upx;
							padding: 14upx 10upx;
							background:#FFFFFF;
							border-radius:6upx;
							margin: 0 13upx 13upx 0;
							&:nth-child(2n){
								margin-right: 0;
							}


							display: flex;
							justify-content: space-between;
							.goods-title{
								width: 50%;
								display: flex;
								flex-direction: column;
								justify-content: space-between;

								.title{
									font-size: $uni-font-size-sm;
									color: $color-primary-plain;
									@extend %overflow-2-line;
								}
								.footer{
									display: flex;
									flex-direction: column;
									justify-content: flex-end;
									.price{
										color: #FD3666;
										font-size: $uni-font-size-sm;
										margin-bottom: 4upx;
									}
									.btn{
										color: #fff;
										font-size: 14upx;
										background: #ED5D80;
										width: 90upx;
										padding: 6upx 10upx;
										text-align: center;
									}
								}
							}
							.goods-img{
								display: flex;
								justify-content: center;
								align-items: center;
								.img{
									height: 134upx;
									width: 134upx;
									border-radius: 4upx;
								}
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
					overflow: hidden;
					background: #fff;
					.img{
						width: 100%;
					}
				}
				.some-category-box{
					border-radius:0 0 8upx 8upx;
					background: #FFFFFF;
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
								height: calc(100% - 178upx);
								display: flex;
								flex-direction: column;
								justify-content: flex-end;
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

			/* 天天秒杀 */
			.tiantianmiaosha{
				background: #ffff;
				padding: 0 $uni-spacing-row-sm 40upx $uni-spacing-row-sm;
				.top-banner{
					background-image:url("~@/static/images/tab-home/spike-banner.png");
					height:88upx;
					background-size: 100% 100%;
					background-repeat: no-repeat;
				}
				.body-content{
					height:358upx;
					background:rgba(250,229,229,1);
					border-radius:0 0 10upx 10upx;
					width: 100%;
					padding:0 24upx;
					display: flex;
					align-items: center;

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
							justify-content: space-around;
							.goods-header{
								height: 178upx;
								width: 178upx;
								.img{
									height: 178upx;
									width: 178upx;
									border-radius:6upx;
								}
							}
							.goods-footer{
								width: 100%;
								height: 100upx;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								.goods-title{
									@extend %overflow-1-line;
									color: $color-primary-plain;
									font-size: 22upx;
								}
								.goods-price{
									font-size: 20upx;
									display: flex;
									justify-content: space-around;
									align-items: flex-end;
									.old-price{
										font-size: 18upx;
										color: #999999;
										text-decoration: line-through;
									}
									.now-price{
										color: $color-primary;
									}
								}
								.btn-box{
									display: flex;
									justify-content: center;
									.btn{
										padding: 0 20upx;
										height:32upx;
										font-size:20upx;
										font-weight:400;
										color:rgba(255,255,255,1);
										line-height:32upx;
										background:linear-gradient(-45deg,rgba(252,69,60,1) 0%,rgba(252,123,178,1) 100%);
										border-radius:16upx;
										box-sizing: border-box;
										&.not-now{
											background: #ccc;
										}
									}
								}
							}
						}
					}
				}
			}
			/* 拼团特惠 */
			.pintuantehui-box-big-div{
				height: 400upx;
				padding: 0 $uni-spacing-row-sm;
				background-image: linear-gradient(#fff, #f2f2f2);
				margin-bottom: 20upx;
				.pintuantehui{
					background-image:url("~@/static/images/tab-home/group-bg.png");
					background-size: 100% 100%;
					background-repeat: no-repeat;
					padding: 0 $uni-spacing-row-sm;
					.top-banner{
						height:80upx;
						background-size: 100% 100%;
						background-repeat: no-repeat;
					}
					.body-content{
						height:320upx;
						border-radius:10upx 0 10upx 10upx;
						width: 100%;
						display: flex;
						align-items: center;
						.all-goods{
							height: 280upx;
							width: 100%;
							display: flex;
							flex-wrap: nowrap;
							align-items: center;
							padding: 20upx 0;
							overflow: hidden;
							overflow-x: auto;
							.goods{
								margin-right: 20upx;
								width: 178upx;
								height: 278upx;
								display: flex;
								flex-direction: column;
								justify-content: space-around;
								.goods-header{
									height: 178upx;
									width: 178upx;
									position: relative;
									.img{
										height: 178upx;
										width: 178upx;
										border-radius:6upx;
									}
									.flag{
										position: absolute;
										background: #FB4F58;
										font-size: 18upx;
										text-align: center;
										width:60upx;
										height:60upx;
										color: #FFFFFF;
										line-height: 60upx;
										border-radius: 50%;
										left: 0;
										bottom: 0;
									}
								}
								.goods-footer{
									width: 100%;
									display: flex;
									flex-direction: column;
									justify-content: space-between;
									.goods-title{
										@extend %overflow-1-line;
										color: $color-primary-plain;
										font-size: 22upx;
									}
									.goods-price{
										font-size: 20upx;
										display: flex;
										justify-content: space-around;
										align-items: flex-end;
										.old-price{
											font-size: 18upx;
											color: #999999;
											text-decoration: line-through;
										}
										.now-price{
											color: $color-primary;
										}
									}
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

		/* 悬浮的联系客服按钮 */
		.customer-service{
			z-index: 99999;
			width: 90upx;
			height: 90upx;
			border-radius: 50%;
			background: rgba(255, 255, 255, .8);
			position: fixed;
			bottom: 100px;
			right: 10px;
			.img{
				width: 90upx;
				height: 90upx;
			}
		}
	}
</style>
