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
		<view class="navbar-classification" v-if="attr.length">
			<view class="title-btns" :class="{'on' : clickMultipleChoiceMmenu.multipleChoiceMmenu}">
				<view v-for="(item, index) in attr" :class="{'on' : clickMultipleChoiceMmenu.multipleChoiceMmenu && clickMultipleChoiceMmenu.key === index}" @click="clickNavBar(index)"   :key="index">
					{{item.title}}<text class="iconfont icon-ddx-shop-content_arrows"></text>
				</view>
			</view>
			<view class="navbar-classification-body" :class="{'on' : clickMultipleChoiceMmenu.multipleChoiceMmenu}">
				<view class="my-body">
					<view class="item" v-for="(sItem, sIndex) in attr[clickMultipleChoiceMmenu.key].child" :key="sIndex"  @click="clickSNavBar(sIndex)" >
						<text v-if="clickMultipleChoiceMmenu.sKey === sIndex" :class="{'on': clickMultipleChoiceMmenu.sKey === sIndex}">
							<text class="iconfont icon-ddx-shop-content_arrows"></text>{{sItem.title}}
						</text>
						<text v-else>
							{{sItem.title}}
						</text>
					</view>
				</view>
				<view class="btns">
					<block>
						<view class="btn" @click="clickMultipleChoiceMmenu.multipleChoiceMmenu = false">
							取消
						</view>
						<view class="btn on" @click="">
							确定
						</view>
					</block>
				</view>
			</view>
		</view>


		<view class="goods-list">
			<mGoods v-for="(item, index) in productList" :key="index" :goodsInfo="item" @click.native="_goPage('goods_detail', {id:item.id})"></mGoods>
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
				attr:[],//服务器返回的数据
				clickMultipleChoiceMmenu:{
					key:0,//当前选中的attr中的下标
					sKey: -1,//当前选中的attr.child中的下标
					multipleChoiceMmenu: false,
				},
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
			//筛选点击
			tabClick(index){
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
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
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
				if (this.$parseURL().id && this.requestData.searchVal === this.$parseURL().title) {
					data.type = this.$parseURL().id
					delete data.title
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
						this.attr = res.attr
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
			clickNavBar(key){
				this.clickMultipleChoiceMmenu.multipleChoiceMmenu = !this.clickMultipleChoiceMmenu.multipleChoiceMmenu
				this.clickMultipleChoiceMmenu.key = key
			},
			clickSNavBar(key) {
				if (key !== this.clickMultipleChoiceMmenu.sKey) {
					this.clickMultipleChoiceMmenu.sKey = key
				} else {
					this.clickMultipleChoiceMmenu.sKey = -1
				}
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
	.navbar-classification{
		position: fixed;
		left: 0;
		top: 170upx;
		/* #ifdef H5 */
		top: calc(44px + 170upx);
		/* #endif */
		width: 100%;
		z-index: 100;
		background: #ffffff;
		color: $color-primary-plain;
		font-size: $uni-font-size-base;
		.title-btns{
			padding: $uni-spacing-row-base;
			&.on{
				padding-bottom: 0;
				view{
					border-bottom-right-radius: 0;
					border-bottom-left-radius: 0;
				}
			}
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			flex-wrap: nowrap;
			view{
				width:148upx;
				height: 48upx;
				line-height: 48upx;
				text-align: center;
				border-radius:8upx;
				background: #F2F2F2;
				font-size: $uni-font-size-sm;
				display: flex;
				justify-content: center;
				justify-items: center;
				.iconfont{
					margin-left: 4upx;
					font-size: $uni-font-size-sm;
					display: block;
					transform:rotate(90deg);
				}
				&.on{
					color: $color-primary;
					.iconfont{
						color: $color-primary;
						transform:rotate(-90deg);
					}
				}
			}
		}
		.navbar-classification-body{
			transition: all 0.3s;
			opacity: 0;
			display: none;
			background: #F2F2F2;
			&.on{
				transition: all 0.3s;
				opacity: 1;
				display: block;
			}
			.my-body{
				padding: $uni-spacing-row-base;
				height: 200upx;
				overflow-y:auto;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				.item{
					padding: $uni-spacing-row-base;
					color: $color-primary-plain;
					font-size:$uni-font-size-sm ;
					.on{
						color: $color-primary;
						.iconfont{
							color: $color-primary;
							font-size: $uni-font-size-sm;
						}
					}
				}
			}
			.btns{
				width: 100%;
				height: 80upx;
				display: flex;
				.btn{
					line-height: 80upx;
					height: 80upx;
					width: 50%;
					text-align: center;
					font-size: $uni-font-size-lg;
					color: $color-primary-plain;
					background: #fff;
					&.on{
						background:$color-primary;
						color: #ffffff;
					}
				}
			}
		}
	}
	.goods-list{
		margin-top: 90upx;
		padding: 190upx $uni-spacing-row-base;
		display:flex;
		flex-direction:row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
}
</style>
