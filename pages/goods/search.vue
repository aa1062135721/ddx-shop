<template>
	<view class="container">

		<view class="navbar">
			<view class="search">
				<mSearch v-model="requestData.searchVal" :show="true"  @search="searchValue"></mSearch>
			</view>
			<view class="items">
				<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
					默认
				</view>
				<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
					<text>销量</text>
					<view class="p-box">
						<text :class="{active: currentOrder === 1 && filterIndex === 1}" class="iconfont icon-ddx-shop-up"></text>
						<text :class="{active: currentOrder === 2 && filterIndex === 1}" class="iconfont icon-ddx-shop-down"></text>
					</view>
				</view>
				<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
					<text>价格</text>
					<view class="p-box">
						<text :class="{active: priceOrder === 1 && filterIndex === 2}" class="iconfont icon-ddx-shop-up"></text>
						<text :class="{active: priceOrder === 2 && filterIndex === 2}" class="iconfont icon-ddx-shop-down"></text>
					</view>
				</view>
			</view>
		</view>

		<view class="goods-list">
			<mGoods v-for="(item, index) in productList" :key="index" :goodsInfo="item" @click.native="goGoodsDetails(item)"></mGoods>
		</view>
		<view>
			<uni-load-more :status="moreStatus" :show-icon="true"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import mGoods from '@/components/goods/goods.vue'
	import mSearch from '@/components/search/mehaotian-search.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）

    export default {
        data() {
            return {
				filterIndex: 0, //0默认 1销量 2价格
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				currentOrder: 0, //1 销量从低到高 2销量从高到低
                productList: [],//服务器返回的数据
				moreStatus: 'more',
				requestData:{
					page: 1,
					limit:10,
					searchVal: '',//要搜索的内容
				},
			}
        },
        methods: {
			_goPage(url, query = {}){
				this.$openPage({name:url, query})
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

			//筛选点击
			async tabClick(index){
				if(this.filterIndex === index && index !== 2 && index !== 1){
					return;
				}
				this.filterIndex = index;
				if(index === 2){
					this.priceOrder = this.priceOrder === 1 ? 2: 1;
				}else{
					this.priceOrder = 0;
				}
				if(index === 1){
					this.currentOrder = this.currentOrder === 1 ? 2: 1;
				}else{
					this.currentOrder = 0;
				}
				console.log('点击了筛选,排序')
				this.requestData.page = 1
				await this.search()
			},
			searchValue(val){
				console.log(val)
				this.requestData.page = 1
				this.requestData.searchVal = val
				this.search()
			},
			async search() {
				this.moreStatus = 'loading'
				let data = {
					page: this.requestData.page,
					limit: this.requestData.limit,
					title: this.requestData.searchVal,
				}
				//按分类id搜索商品 ，  type
				if (this.$parseURL().id && this.requestData.searchVal === this.$parseURL().title) {
					data.type = this.$parseURL().id
					delete data.title
				}
				// 按品牌id搜索商品，brand
				if (this.$parseURL().brand && this.requestData.searchVal === this.$parseURL().title){
					data.brand = this.$parseURL().brand
					delete data.title
				}

				// 如果是首页的跨境购进入的
				if (this.$parseURL().is_cate) {
					data.is_cate = 1
				}

				switch (this.filterIndex) {
					case 0:
						break
					case 1://销量升降序
						data.sales = this.currentOrder
						break
					case 2://价格升降序
						data.price = this.priceOrder
				}
				console.log("请求数据",data)
				await this.$minApi.searchGoods(data).then(res => {
					console.log("请求结果",res)
					if (res.code === 200){
						if (data.page === 1) {
							this.productList = res.data
						} else {
							this.productList.push(...res.data)
						}
						if (res.data.length <  this.requestData.limit) {
							this.moreStatus = 'noMore'
						} else {
							this.moreStatus = 'more'
						}
					}
				})
			},
			async goSearch(){
				this.requestData.page = 1
				await this.search()
			}
        },
        onLoad() {
			console.log("其他页面带过来的值：",this.$parseURL())
			this.requestData.searchVal = this.$parseURL().title
			this.search()
        },
		async onReachBottom() {
			if (this.moreStatus === 'noMore') {
				return
			}
			this.requestData.page ++
			await this.search()
		},
		components: {
			mSearch,
			mGoods,
			uniLoadMore,
		},
    };
</script>

<style lang="scss">
.container{
	.navbar{
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		display: flex;
		flex-direction: column;
		width: 100%;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
		z-index: 10;
		.search{
			height: 90upx;
			width: 100%;
			border-bottom: none;
		}
		.items{
			height: 80upx;
			width: 100%;
			display: flex;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: #1A1A1A;
			position: relative;
			&.current{
				color: $color-primary;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $color-primary;
				}
			}
		}
		.p-box{
			display: flex;
			flex-direction: column;
			.iconfont{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 16upx;
				color: #888;
				&.active{
					color: $color-primary;
				}
			}
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
			&:after{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}
	}
	.goods-list{
		padding: 190upx $uni-spacing-row-base 0 $uni-spacing-row-base;
		display:flex;
		flex-direction:row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
}
</style>
