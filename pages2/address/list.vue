<template>
	<view class="container">
		<view class="list-all">
			<view class="a-list" v-for="(item, index) in list" :key="index">
				<view class="info">
					<view class="name-moblie">
						<view class="name">{{item.name}} <span class="tag-real-name">已实名</span></view>
						<view class="mobile">{{item.phone}}</view>
					</view>
					<view class="detail">
						<view class="detail-left">
							<span class="tag-span" v-if="item.default">默认</span>
							<view class="text">{{item.addres}}</view>
						</view>
						<view class="detail-right" @click="goToAddOrEdit(item)">
							<i class="iconfont icon-ddx-shop-bianji"></i>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more status="noMore" v-if="list.length === 0"></uni-load-more>
		<view class="fixed"  @click="goToAddOrEdit()">
			<span class="iconfont icon-ddx-shop-anonymous-iconfont icon-color"></span>
			新增收货地址
		</view>
	</view>

</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
    export default {
        name: "address_list",
		components: {
			uniLoadMore
		},
		data(){
        	return {
				list:[
					// {
					// 	id: 2,    //id
					// 	name: "任坤红",       //名称
					// 	phone: "13028331292",
					// 	area_ids: "110000,110100,110102",
					// 	area_names: "广东省,广州市,东莞市",
					// 	address: "广州塔23层",
					// 	default: 0,       //1默认，0不默认
					// 	addres: "广东省 广州市东莞市广州塔23层"   //地址
					// },
				],
			}
		},
		onLoad() {
			// 解析路由参数
			console.log("带过来的参数",this.$parseURL())
		},
		onShow(){
			this.loadData()
		},
        methods:{
            goToAddOrEdit(val = {}){
                this.$openPage({name: 'address_add', query: val})
            },
			loadData(){
				this.$minApi.addressList().then(res => {
					console.log(res)
					if (res.code === 200) {
						this.list = res.data
					}
				}).catch(err => {
					console.log(err)
				})
			},
        }
    }
</script>

<style scoped lang="scss">
.container{
	*{
		color: #1A1A1A;
	}
	.list-all{
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		padding:0 $uni-spacing-row-base;
		.a-list{
			font-size: $uni-font-size-base;
			display: flex;
			justify-content: space-between;
			padding:$uni-spacing-row-lg 0;
			width:100%;
			.info{
				width:100%;
				.name-moblie{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					font-size: $uni-font-size-lg;
					line-height: $uni-font-size-lg * 2;
					.name{
						.tag-real-name{
							margin-left: 10upx;
							font-size: $uni-font-size-sm;
							color: $color-primary;
							border: 1px solid $color-primary;
							padding: 4upx 6upx;
							border-radius: 4upx;
						}
					}
					.mobile{
						margin-left: 20upx;
						color: #808080;
						font-size: $uni-font-size-sm;
					}
				}
				.detail{
					width: 100%;
					display: flex;
					justify-content: space-between;
					color:#1A1A1A;
					.detail-left{
						overflow: hidden;
						display: flex;
						align-items: center;
						width: 80%;
						.tag-span{
							color: #FC5A5A;
							background: #FCE8E8;
							padding: 4upx 6upx;
							margin-right: 10upx;
						}
						.text{
							width: 80%;
							@extend %overflow-1-line;
						}
					}
					.detail-right{
						display: flex;
						justify-content: flex-end;
						width: 20%;
						.iconfont{
							font-size: $uni-font-size-base;
						}
					}
				}
			}

		}
		margin-bottom: 120upx;
	}
	.fixed{
		background: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		span{
			margin-right: 10upx;
		}
		.iconfont{
			color: $color-primary;
		}
	}
}
</style>
