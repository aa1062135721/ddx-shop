<template>
	<div class="a-goods">
		<div class="image">
			<image :src="goodsInfo.pic" :lazy-load="true"></image>
			<div class="mask" v-if="goodsInfo.status !== 1"></div>
			<div class="tips" v-if="goodsInfo.status !== 1">已下架</div>
			<div class="left-flag" v-if="goodsInfo.activity_id && goodsInfo.activity_type === 4">限时抢购</div>
		</div>
		<div class="info">
			<div class="title">
				{{goodsInfo.title}}
			</div>
			<div class="price">
				<span class="all-price">
					<span class="now-price">¥{{goodsInfo.min_price}}</span>
					<span class="old-price">¥{{goodsInfo.max_price}}</span>
				</span>
				<span class="sales">已售{{goodsInfo.sales}}件</span>
			</div>
		</div>
	</div>
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
					max_price: "9.99",
					initial_sales: 0,
					reality_sales: 0,
					pic: "",
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
	justify-content: space-between;
	flex-direction:column;
	width:344upx;
	height:518upx;
	overflow: hidden;
	margin-bottom:20upx;
	.image{
		width:344upx;
		height:344upx;
		position: relative;
		.mask{
			position: absolute;
			top: 0;
			left: 0;
			width:344upx;
			height:344upx;
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
			width:344upx;
			height:344upx;
			border-radius:8upx 8upx 0upx 0upx;
		}
		.left-flag{
			position: absolute;    /*绝对定位*/
			width:200upx;
			height: 40upx;
			line-height: 40upx;
			text-align: center;
			font-size:  $uni-font-size-sm;
			background-color: $color-primary;
			color: #fff;
			transform: rotate(-45deg);
			left: -44upx;
			top: 36upx;
		}
	}
	.info{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width:344upx;
		height: 174upx;
		.title{
			@extend %overflow-2-line;
			padding: $uni-spacing-row-sm $uni-spacing-row-sm 0 $uni-spacing-row-sm;
			font-size: $uni-font-size-base;
			height: auto;
			overflow: hidden;
		}
		.price{
			padding: 0 $uni-spacing-row-sm;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.all-price{
				display: flex;
				align-items: center;
				.now-price{
					font-size: $uni-font-size-base;
					color: $color-primary;
					margin-right: 10upx;
				}
				.old-price{
					font-size: 20upx;
					color: #B2B2B2;
					text-decoration: line-through;
				}
			}
			.sales{
				font-size: 20upx;
				color: #B2B2B2;
			}
		}
	}
}
</style>
