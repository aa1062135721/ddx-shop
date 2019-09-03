<template>
	<view class="container" style="background-image: url(data:image/jpeg;base64,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);">
		<view style="height: 100%;width: 100%;background: #333333;opacity:0.5;"></view>
		<view class="fixed">
			<view class="btns">
				<button class="btn1" type="primary" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo" :disabled="!isAgreement">
					<text class="iconfont icon-ddx-shop-wechat"></text>
					微信一键登录
				</button>
<!--				<button class="btn1" type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取电话号码</button>-->
				<button class="btn2" type="default" plain @click="this.$openPage('login-with-mobile')" :disabled="!isAgreement">手机号登录</button>
			</view>
			<view>
				<checkbox-group  @change="checkboxChange">
					<label  class="tip">
						<checkbox value="cb"  class="checkbox" :checked="isAgreement" />
						<text>已阅读并同意</text>
						<text class="color-red" @click.stop="openPopup(1)">《捣蛋熊猫服务协议》</text>
						<text>及</text>
						<text class="color-red" @click.stop="openPopup(2)">《隐私保护政策》</text>
					</label>
				</checkbox-group>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :custom="true" :mask-click="false">
			<view class="uni-tip">
				<view class="uni-tip-title">{{agreement.title}}</view>
				<view class="uni-tip-content">
					{{agreement.content}}
				</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="closePopup()">取消</view>
					<view class="uni-tip-button" @click="closePopup()">确定</view>
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
		data(){
        	return {
        		isAgreement: false,
        		agreement: {
        			title: '',
					content: ''
				},
			}
		},
		methods:{
			checkboxChange(e) {
				if (e.detail.value.length) {
					this.isAgreement = true
				} else {
					this.isAgreement = false
				}
			},
			async openPopup(val){
				await this.$minApi.agreement({
					type: val
				}).then(res => {
					console.log(res)
					this.agreement.title = res.title
					this.agreement.content = res.content
					this.$refs.popup.open()
				}).catch(err => {
					console.log(err)
				})
			},
			closePopup(){
			    this.$refs.popup.close()
			},
			login(){
				this.saveToken("tokenssssssssssssssssssssssssssssssssssss")
				uni.navigateBack({
					delta: 2
				});
			},
			 //第一授权获取用户信息===》按钮触发
			async wxGetUserInfo() {
				this.saveToken("tokenssssssssssssssssssssssssssssssssssss")
				await uni.login({
					provider: 'weixin',
					success: async (res) => {
						console.log("code",res)
						await uni.getUserInfo({
							provider: 'weixin',
							lang: 'zh_CN',
							withCredentials:true,
							success: async (infoRes) =>{
								console.log("userInfo",infoRes)
								await this.$minApi.loginWeChat({
									js_code: res.code,
									iv: infoRes.iv,
									encryptedData: infoRes.encryptedData,
								}).then(res => {
									console.log(res)
								}).catch(err => {
									console.log(err)
								})
							},
							fail(res) {}
						});
					}
				})
			},
			//获取用户手机号
			getPhoneNumber: function(e) {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log("code", res)
					}
				})
				console.log(e);
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
					console.log('用户拒绝提供手机号');
				} else {
					console.log('用户同意提供手机号');
				}
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
