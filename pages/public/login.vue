<template>
	<view class="container" style="background-image: url(../../static/images/login-bg.jpg);">
		<view style="height: 100%;width: 100%;background: #333333;opacity:0.5;"></view>
		<view class="fixed">
			<view class="btns">
				<button class="btn1" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					<text class="iconfont icon-ddx-shop-wechat"></text>
					微信一键登录
				</button>
				<button class="btn2" @click="login()">手机号登录</button>
			</view>
			<view class="tip">
				 <checkbox class="checkbox"  color="#FFFFFF" />
				 <text>已阅读并同意</text>
				 <text class="color-red" @click="openPopup">《捣蛋熊猫服务协议》</text>
				 <text>及</text>
				 <text class="color-red" @click="openPopup1">《隐私保护政策》</text>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :custom="true" :mask-click="false">
			<view class="uni-tip">
				<view class="uni-tip-title">捣蛋熊猫服务协议</view>
				<view class="uni-tip-content">
					捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议捣蛋熊猫服务协议
				</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="closePopup()">取消</view>
					<view class="uni-tip-button" @click="closePopup()">确定</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup1" type="center" :custom="true" :mask-click="false">
			<view class="uni-tip">
				<view class="uni-tip-title">隐私保护政策</view>
				<view class="uni-tip-content">
					隐私保护政策
					隐私保护政策
					隐私保护政策
					隐私保护政策
					隐私保护政策
					隐私保护政策
				</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="closePopup1()">取消</view>
					<view class="uni-tip-button" @click="closePopup1()">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>

</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {mapMutations,mapActions} from 'vuex'
    export default {
        name: "login",
		components: {uniPopup},
		methods:{
			openPopup(){
			    this.$refs.popup.open()
			},
			closePopup(){
			    this.$refs.popup.close()
			},
			openPopup1(){
			    this.$refs.popup1.open()
			},
			closePopup1(){
			    this.$refs.popup1.close()
			},
			login(){
				this.saveToken("tokenssssssssssssssssssssssssssssssssssss")
				uni.navigateBack({
					delta: 2
				});
			},
			 //第一授权获取用户信息===》按钮触发
			wxGetUserInfo() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log("code",res)
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								console.log("userInfo",infoRes)
							},
							fail(res) {}
						});
					}
				})
			},
			...mapActions(['saveToken', 'saveUserInfo'])
		}
    }
</script>

<style scoped lang="scss">
	.container{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background-size: cover;
	}
	.fixed{
		top: 60%;
		width: 100%;
		position: fixed;
		padding:$uni-spacing-row-base;
		.btns{
			color:#FFFFFF;
			font-size: $uni-font-size-base;
			.btn1{
				margin-bottom: 20upx;
				background-color: #2BC345;
				color:#FFFFFF;
				.iconfont{
					color: #FFFFFF;
					margin-right: 10upx;
				}
			}
			.btn2{
				background: transparent;
				border: 1upx solid #FFFFFF;
				margin-bottom: 20upx;
				color:#FFFFFF;
			}
		}
		.tip{
			text-align: center;
			font-size: $uni-font-size-sm;
			color: #000;
			display: flex;
			justify-content: center;
			align-items: center;
			.checkbox{
				transform:scale(0.5);
			}
			.color-red{
				color: $color-primary;
			}
		}
	}
	/* 提示窗口 */
	.uni-tip {
		padding: 15px;
		width: 300px;
		background: #fff;
		box-sizing: border-box;
		border-radius: 10px;
	}

	.uni-tip-title {
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.uni-tip-content {
		padding: 15px;
		font-size: 14px;
		color: #666;
		height: auto;
		max-height: 70vh;
		overflow-y: scroll;
	}

	.uni-tip-group-button {
		margin-top: 10px;
		display: flex;
	}

	.uni-tip-button {
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
	}
</style>
