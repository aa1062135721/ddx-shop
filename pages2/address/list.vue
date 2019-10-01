<template>
	<view class="container">
		<view class="list-all">
			<view class="a-list" v-for="(item, index) in list" :key="index">
				<view class="info">
					<view class="name-moblie">
						<view class="name">{{item.name}}</view>
						<view class="mobile">{{item.phone}}</view>
					</view>
					<view class="detail">
						<span v-if="item.default">默认</span> {{item.addres}}
					</view>
				</view>
				<view class="edit" @click="goToAddOrEdit(item)">
					<span>编辑</span>
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
				width: 80%;
				.name-moblie{
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					font-size: $uni-font-size-lg;
					line-height: $uni-font-size-lg * 2;
					.mobile{
						margin-left: 20upx;
						color: #808080;
						font-size: $uni-font-size-sm;
					}
				}
				.detail{
					@extend %overflow-1-line;
					color:#1A1A1A;
					span{
						color: #FC5A5A;
						background: #FCE8E8;
						padding: 2upx;
						margin-right: 10upx;
					}
				}
			}
			.edit{
				display: flex;
				justify-content: center;
				align-items: center;
				span{
					color: #808080;
					padding-left: 20upx;
					border-left: 1upx solid #E4E4E4;
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
	}
}
</style>
