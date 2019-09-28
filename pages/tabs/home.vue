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
			<wuc-tab :tab-list="tabList" :textFlex="true" :tabCur.sync="TabCur" tab-class="tabs"  select-class="tab-select" @change="tabChange"
					 style="position: fixed;left: 0;width: 100%;z-index: 999;"
					 :style="style"
			></wuc-tab>
			<view class="content" v-if="TabCur === 0">
				<view class="my-block"></view>
				<view class="swiper-box" v-if="swiperList.length">
					<swiper circular="true" autoplay="true" :indicator-dots="true" indicator-active-color="#FC8A8A" style="width: 710upx;height: 268upx;">
						<swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index">
							<image class="banner-img" :lazy-load="true"	:src="item.thumb" @click="_clickBanner(index)" mode="widthFix"></image>
						</swiper-item>
					</swiper>
				</view>
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

				<!--秒杀-->
				<view class="limited-time-kill" v-if="tabList2.length">
					<view class="title-bar">
						<view class="left">
							<view class="title-block" style="background: #F79058;">限时秒杀</view>
						</view>
<!--						<view class="right">-->
<!--							<text>更多秒杀</text>-->
<!--							<text class="iconfont icon-ddx-shop-content_arrows"></text>-->
<!--						</view>-->
					</view>
					<view class="time-content">
						<wlm-tab :tab-list="tabList2" :tabCur.sync="TabCur2"  @change="tabChange2" tabStyle="background:#F2F2F2;"
								 selectTitleStyle="color:#fff;background:#FC5A5A;border-radius:16px;padding:0 4px;"></wlm-tab>
						<view class="goods-list">
							<view class="time-content-goods-list-goods" v-for="(item, index) in tabList2[TabCur2].goodsList" :key="index" @click="_goPage('spike_detail',{id:item.id})">
								<view class="image">
									<image class="img-25" :lazy-load="true" :src="item.pic"></image>
								</view>
								<view class="title">
									{{item.item_name}}
								</view>
								<view class="price">
									<text class="one">¥{{item.price}}</text>
								</view>
								<view class="status">
									<text class="one">已抢{{item.already_num}}件</text>
								</view>
							</view>
						</view>
					</view>

				</view>

				<!--团购-->
				<view class="limited-time-kill" v-if="groupBuyList.length">
					<view class="title-bar">
						<view class="left">
							<view class="title-block">精品团</view>
							<text class="title-text">海量商品放心拼团</text>
						</view>
						<view class="right" @click="_goPage('group_buy_list')">
							<text>更多拼团</text>
							<text class="iconfont icon-ddx-shop-content_arrows"></text>
						</view>
					</view>
					<view class="time-content">
						<view class="goods-list">
							<view v-for="(item, index) in groupBuyList" :key="index" @click="_goPage('group_buy_detail', {id: item.id})" class="time-content-goods-list-goods" style="width: 33.33333%;">
								<view class="image width-210">
									<image class="img-33" :src="item.pic"></image>
									<view class="group-info">{{item.people_num}}人团</view>
								</view>
								<view class="title width-210">
									{{item.title}}
								</view>
								<view class="price width-210">
									<text class="one">¥{{item.price}}</text>
									<text class="two">¥{{item.old_price}}</text>
								</view>
								<view class="status width-210">
									<text class="one">已拼{{item.assemble_num}}件</text>
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
						<mGoods v-for="(item, index) in tabList[TabCur].goodsList" :key="index" :goodsInfo="item" @click.native="_goPage('goods_detail', {id:item.id})"></mGoods>
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

				subTab: [

				],
				//推荐tab中的轮播图
				swiperList: [],

				/**
				 * 推荐里的数据
				 */
				//限时秒杀
				TabCur2: 0,
				tabList2: [],
				//精品团购
				groupBuyList: [],
				//图标
				iconArr:[],

			}
		},
		async onLoad(param) {
			if (param.user_id){
				this.saveShareID(param.user_id)
			}
			await this._getCategory()
			await this._getBanner()
			await this._assembleList()
			await this._getSeckillTime()
			await this._getGuessYouLike()
			await this._getIcon()
		},
		async onReachBottom() {
			if (this.tabList[this.TabCur].requestData.moreStatus === 'noMore') {
				return
			}
			this.tabList[this.TabCur].requestData.page ++
			if (this.TabCur === 0) {
				await this._getGuessYouLike()
			} else {
				await this._getGoodsList(this.tabList[this.TabCur].id)
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
			async _getGoodsList(type){
				this.tabList[this.TabCur].requestData.moreStatus = 'loading'
				let data = {
					type:this.tabList[type].id,
					page:this.tabList[this.TabCur].requestData.page,
					limit:this.tabList[this.TabCur].requestData.limit,
				}
				await this.$minApi.goodsByCategoryId(data).then(res => {
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
			tabChange2(index) {
				this.TabCur2 = index;
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
			_getGuessYouLike() {
				this.tabList[this.TabCur].requestData.moreStatus = 'loading'
				let data = {
					page:this.tabList[this.TabCur].requestData.page,
					limit:this.tabList[this.TabCur].requestData.limit,
				}
				this.$minApi.guessYouLike(data).then(res => {
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
			_clickSubTab(item){
				console.log(item)
				this._goPage('goods_search', {id: item.id, title: item.cname})
			},
			// 拼团
			async _assembleList(){
				await this.$minApi.assembleList({hot:1}).then(res => {
					console.log("拼团商品列表",res)
					if (res.code === 200) {
						this.groupBuyList = res.data
					}
				})
			},
			//推荐-秒杀
			async _getSeckillTime(){
				await this.$minApi.seckillTime().then(async res => {
					console.log("秒杀时间段",res)
					if (res.code === 200) {
						res.data.map(async (item, index) => {
							item.goodsList = []
							await this.$minApi.seckillGoodsList({start_time: res.data[index].start_time}).then(sub_res => {
								console.log(`第${index}秒杀时间段的商品`, sub_res)
								if (sub_res.code === 200) {
									item.goodsList = sub_res.data
								}
							})
						})
						this.tabList2 = res.data
					}
				})
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
						this._goPage('group-buy')
						break
					case 5:
						break
					case 6:
						break
                }
			}
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
						width:98upx;
						height: 98upx;
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
