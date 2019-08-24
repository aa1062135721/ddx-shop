<template>
	<view class="container">
		<view class="list-all">
			<view class="a-list">
				<view class="info">
					<view class="name-moblie">
						<view class="name">吴黎明</view>
						<view class="mobile">15213710631</view>
					</view>
					<view class="detail">
						<span>默认</span> 重庆 重庆市渝北区汽博中心线外城市重庆市渝北区汽博中心线外城市
					</view>
				</view>
				<view class="edit">
					<span>编辑</span>
				</view>
			</view>
			
			<view class="a-list">
				<view class="info">
					<view class="name-moblie">
						<view class="name">吴黎明</view>
						<view class="mobile">15213710631</view>
					</view>
					<view class="detail">
						重庆 重庆市渝北区汽博中心线外城市重庆市渝北区汽博中心线外城市
					</view>
				</view>
				<view class="edit">
					<span>编辑</span>
				</view>
			</view>
		</view>
		
		<view class="fixed"  @click="goadd()">
			<span class="iconfont icon-ddx-shop-anonymous-iconfont icon-color"></span>
			新增收货地址
		</view>
	</view>
  
</template>

<script>
    export default {
        name: "address_list",
		onLoad() {
			// 解析路由参数
			console.log("带过来的参数",this.$parseURL())
		},
        methods:{
            goadd(){
                this.$openPage({name: 'address_add', query: {id:123,boolean_a:true,url:''}})
            }
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
