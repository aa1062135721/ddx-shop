<template>
	<view class="a-goods">
		<view class="image">
			<image :src="goodsInfo.pic" :lazy-load="true"></image>
			<view class="mask" v-if="goodsInfo.status !== 1"></view>
			<view class="tips" v-if="goodsInfo.status !== 1">已下架</view>
		</view>
		<view class="title">
			{{goodsInfo.title}}
		</view>
		<view class="price">
			<text class="one">¥{{goodsInfo.min_price}}</text>
			<text class="two">已售{{goodsInfo.sales}}件</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
		},
		props: {
			goodsInfo:{
				type: Object,
				default:{
					id: '',
					title: '',
					status:1,
					min_price: "0.00",
					initial_sales: 0,
					reality_sales: 0,
					pic: "http://picture.ddxm661.com/12183201909060954457548.jpg",
					sales: 0
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.a-goods{
	background: #FFFFFF;
	border-radius:8upx;
	display:flex;
	flex-direction:column;
	width:343upx;
	height:500upx;
	overflow: hidden;
	margin-bottom:20upx;
	.image{
		width:343upx;
		height:343upx;
		position: relative;
		.mask{
			position: absolute;
			top: 0;
			left: 0;
			width:343upx;
			height:343upx;
			background: #FFFFFF;
			opacity: 0.5;
		}
		.tips{
			width: 150upx;
			height: 150upx;
			line-height: 150upx;
			text-align: center;
			border-radius: 50%;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -75upx;
			margin-left: -75upx;
			background: rgba(0,0,0,0.5);
			color: #FFFFFF;
			font-size: $uni-font-size-lg;
			transform:rotate(-50deg);
		}
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
			padding-bottom: 10upx;
		}
	}
}
</style>
