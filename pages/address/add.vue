<template>
	<view class="container">
		<view class="address">
			<view class="a-input">
				<view class="name">
					收货人
				</view>
				<view class="value">
					<input type="text" placeholder="请输入收货人姓名">
				</view>
			</view>
			<view class="a-input">
				<view class="name">
					手机号码
				</view>
				<view class="value">
					<input type="number" placeholder="请输入收货人手机号码">
				</view>
			</view>
			<view class="a-input">
				<view class="name">
					所在地区
				</view>
				<view class="value">
					<input type="number" placeholder="请选择地址">
				</view>
			</view>
			<view class="a-input">
				<view class="name">
					详细地址
				</view>
				<view class="value">
					<input type="text" placeholder="请输入详细地址">
				</view>
			</view>
			<view class="a-input">
				<view class="name">
					默认地址
				</view>
				<view class="value">
					<input type="text" placeholder="设置为默认地址" disabled="true">
				</view>
				<view class="value2">
					<switch checked="true" color="#F2F2F2" style="transform:scale(0.7)" />
					<!-- <switch checked="true" color="#31BF1A" style="transform:scale(0.7)" /> -->
				</view>
			</view>
		</view>
		<view class=btns>
			<button type="warn" class="save">保存地址</button>
			<button type="warn" class="del">删除地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "address_add",
		onLoad() {
			// 解析路由参数
			console.log("带过来的参数",this.$parseURL())
		},
		method: {

		}
	}
</script>

<style scoped lang="scss">
	.container{
		.address{
			margin-top: $uni-spacing-col-base;
			margin-bottom: $uni-spacing-col-base * 3;
			background: #fff;
			display:flex;
			flex: 1;
			flex-direction: column;
			padding-left:$uni-spacing-col-base;
			padding-right:$uni-spacing-col-base;
			.a-input{
				border-bottom: 1upx solid #CCCCCC;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				width:100%;
				height:150upx;
				line-height: 150upx;
				.name{
					width: 30%;
				}
				.value{
					width: 60%;
				}
				&:last-child{
					border: none;
					.value{
						width: 50%;
					}
					.value2{
						width: 20%
					}
				}
			}
		}
		.btns{
			padding: $uni-spacing-col-base;
			.save{
				background: $color-primary;
				color: #FFFFFF;
				margin-bottom: 20upx;
			}
			.del{
				background: #FFFFFF;
				color: $color-primary;
				border: 1upx solid $color-primary;
			}
		}
	}
</style>
