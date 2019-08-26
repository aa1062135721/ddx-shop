<template>
	<view class="container">
	
		<view class="navbar">
			<view class="search">
				<mSearch @search="search()" mode=2></mSearch>
			</view>
			<view class="items">
				<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
					默认
				</view>
				<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
					销量
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
			<view class="a-goods">
				<view class="image">
					<image src="../../static/images/goods.jpg" mode=""></image>
				</view>
				<view class="title">
					澳洲爱他美白金版profutura 3段澳洲爱他美白金版
				</view>
				<view class="price">
					<text class="one">¥2008</text>
					<text class="two">已售486件</text>
				</view>
			</view>
			<view class="a-goods">
				<view class="image">
					<image src="../../static/images/goods.jpg" mode=""></image>
				</view>
				<view class="title">
					澳洲爱他美白金版profutura 3段澳洲爱他美白金版
				</view>
				<view class="price">
					<text class="one">¥2008</text>
					<text class="two">已售486件</text>
				</view>
			</view>
			<view class="a-goods">
				<view class="image">
					<image src="../../static/images/goods.jpg" mode=""></image>
				</view>
				<view class="title">
					澳洲爱他美白金版profutura 3段澳洲爱他美白金版
				</view>
				<view class="price">
					<text class="one">¥2008</text>
					<text class="two">已售486件</text>
				</view>
			</view>
			<view class="a-goods">
				<view class="image">
					<image src="../../static/images/goods.jpg" mode=""></image>
				</view>
				<view class="title">
					澳洲爱他美白金版profutura 3段澳洲爱他美白金版
				</view>
				<view class="price">
					<text class="one">¥2008</text>
					<text class="two">已售486件</text>
				</view>
			</view>
			<view class="a-goods">
				<view class="image">
					<image src="../../static/images/goods.jpg" mode=""></image>
				</view>
				<view class="title">
					澳洲爱他美白金版profutura 3段澳洲爱他美白金版
				</view>
				<view class="price">
					<text class="one">¥2008</text>
					<text class="two">已售486件</text>
				</view>
			</view>
			<view class="a-goods">
				<view class="image">
					<image src="../../static/images/goods.jpg" mode=""></image>
				</view>
				<view class="title">
					澳洲爱他美白金版profutura 3段澳洲爱他美白金版
				</view>
				<view class="price">
					<text class="one">¥2008</text>
					<text class="two">已售486件</text>
				</view>
			</view>
			<view class="a-goods">
				<view class="image">
					<image src="../../static/images/goods.jpg" mode=""></image>
				</view>
				<view class="title">
					澳洲爱他美白金版profutura 3段澳洲爱他美白金版
				</view>
				<view class="price">
					<text class="one">¥2008</text>
					<text class="two">已售486件</text>
				</view>
			</view>
			<view class="a-goods">
				<view class="image">
					<image src="../../static/images/goods.jpg" mode=""></image>
				</view>
				<view class="title">
					澳洲爱他美白金版profutura 3段澳洲爱他美白金版
				</view>
				<view class="price">
					<text class="one">¥2008</text>
					<text class="two">已售486件</text>
				</view>
			</view>
			<view class="a-goods">
				<view class="image">
					<image src="../../static/images/goods.jpg" mode=""></image>
				</view>
				<view class="title">
					澳洲爱他美白金版profutura 3段澳洲爱他美白金版
				</view>
				<view class="price">
					<text class="one">¥2008</text>
					<text class="two">已售486件</text>
				</view>
			</view>
			<view class="a-goods">
				<view class="image">
					<image src="../../static/images/goods.jpg" mode=""></image>
				</view>
				<view class="title">
					澳洲爱他美白金版profutura 3段澳洲爱他美白金版
				</view>
				<view class="price">
					<text class="one">¥2008</text>
					<text class="two">已售486件</text>
				</view>
			</view>
			<view class="a-goods">
				<view class="image">
					<image src="../../static/images/goods.jpg" mode=""></image>
				</view>
				<view class="title">
					澳洲爱他美白金版profutura 3段澳洲爱他美白金版
				</view>
				<view class="price">
					<text class="one">¥2008</text>
					<text class="two">已售486件</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mSearch from '@/components/search/mehaotian-search.vue';
    export default {
        data() {
            return {
				filterIndex: 0,
				priceOrder: 0, //1 价格从低到高 2价格从高到低
                productList: [],
                renderImage: false
            };
        },
        methods: {
			//筛选点击
			tabClick(index){
				if(this.filterIndex === index && index !== 2){
					return;
				}
				this.filterIndex = index;
				if(index === 2){
					this.priceOrder = this.priceOrder === 1 ? 2: 1;
				}else{
					this.priceOrder = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
			},
			search(val) {
				console.log(val)
			},
            loadData(action = 'add') {
                const data = [{
                        image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
                        title: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
                        originalPrice: 9999,
                        favourPrice: 8888,
                        tip: '自营'
                    },
                    {
                        image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product2.jpg',
                        title: 'Apple iPad 平板电脑 2018年新款9.7英寸',
                        originalPrice: 3499,
                        favourPrice: 3399,
                        tip: '优惠'
                    },
                    {
                        image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
                        title: 'Apple MacBook Pro 13.3英寸笔记本电脑（2017款Core i5处理器/8GB内存/256GB硬盘 MupxT2CH/A）',
                        originalPrice: 12999,
                        favourPrice: 10688,
                        tip: '秒杀'
                    },
                    {
                        image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product4.jpg',
                        title: 'Kindle Paperwhite电纸书阅读器 电子书墨水屏 6英寸wifi 黑色',
                        originalPrice: 999,
                        favourPrice: 958,
                        tip: '秒杀'
                    },
                    {
                        image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product5.jpg',
                        title: '微软（Microsoft）新Surface Pro 二合一平板电脑笔记本 12.3英寸（i5 8G内存 256G存储）',
                        originalPrice: 8888,
                        favourPrice: 8288,
                        tip: '优惠'
                    },
                    {
                        image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product6.jpg',
                        title: 'Apple Watch Series 3智能手表（GPS款 42毫米 深空灰色铝金属表壳 黑色运动型表带 MQL12CH/A）',
                        originalPrice: 2899,
                        favourPrice: 2799,
                        tip: '自营'
                    }
                ];

                if (action === 'refresh') {
                    this.productList = [];
                }

                data.forEach(item => {
                    this.productList.push(item);
                });
            }
        },
        onLoad() {
            this.loadData();
            setTimeout(() => {
                this.renderImage = true;
            }, 300);
        },
        onReachBottom() {
            this.loadData();
        },
		components: {
			mSearch
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
		.a-goods{
			background: #FFFFFF;
			border-radius:8upx;
			display:flex;
			flex-direction:column;
			width:343upx;
			height:488upx;
			overflow: hidden;
			margin-bottom:20upx;
			.image{
				width:343upx;
				height:343upx;
				image{
					width:343upx;
					height:343upx;
					border-radius:8upx 8upx 0upx 0upx;
				}
			}
			.title{
				@extend %overflow-2-line;
				padding: $uni-spacing-row-sm $uni-spacing-row-sm 0 $uni-spacing-row-sm;
				font-size: $uni-font-size-base;
				height: auto;
				width: 100%;
				overflow: hidden;
			}
			.price{
				padding: 0 $uni-spacing-row-sm;
				.one{
					font-size: $uni-font-size-base;
					color: $color-primary;
					margin-right: 10upx;
				}
				.two{
					font-size: $uni-font-size-sm;
				}
			}
		}
	}
}
</style>
