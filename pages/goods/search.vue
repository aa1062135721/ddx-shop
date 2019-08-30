<template>
	<view class="container">

		<view class="navbar">
			<view class="search">
				<mSearch mode=2 v-model="searchVal" :show="true" @click.native="goSearch" @search.stop="search()"></mSearch>
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
			<mGoods></mGoods>
			<mGoods></mGoods>
			<mGoods></mGoods>
		</view>
	</view>
</template>

<script>
	import mGoods from '@/components/goods/goods.vue'
	import mSearch from '@/components/search/mehaotian-search.vue';
    export default {
        data() {
            return {
				filterIndex: 0, //0默认 1销量 2价格
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				currentOrder: 0, //1 销量从低到高 2销量从高到低
                productList: [],
				searchVal: '',//搜索的值
            }
        },
        methods: {
        	//点击搜索输入框，到搜索页面
			goSearch(){
				if (this.searchVal === '')
					this.$openPage('search_with_hot_history')
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
			search(val) {
				console.log(val)
			},

        },
        onLoad() {
        	let _this = this
			this.$eventHub.$on('search_word', function (data) {
				_this.searchVal = data
				console.log("从其他页面传过来的值",data);
			})
        },
        onReachBottom() {
        },
		components: {
			mSearch,
			mGoods
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
				font-size: 26upx;
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
		padding: 190upx $uni-spacing-row-base;
		display:flex;
		flex-direction:row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
}
</style>
