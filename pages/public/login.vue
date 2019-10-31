<template>
	<view class="container">
		<view class="logo">
			<image src="../../static/images/pandalogo.png" class="img" mode="widthFix"></image>
		</view>
		<view class="fixed">
			<view class="btns">
				<button class="btn1" type="primary" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo" v-if="!responseData.openId">
					<text class="iconfont icon-ddx-shop-wechat"></text>
					授权微信昵称、头像
				</button>
				<button class="btn2" type="primary"  @click="goLogin"  v-if="responseData.openId">手机号登录</button>
			</view>
			<view v-if="responseData.openId">
				<checkbox-group  @change="checkboxChange">
					<label  class="tip">
						<checkbox  class="checkbox" :checked="isAgreement" color="#FC5A5A" />
						<text>已阅读并同意</text>
						<text class="color-red" @click.stop="openPopup(1)">《捣蛋熊猫服务协议》</text>
						<text>及</text>
						<text class="color-red" @click.stop="openPopup(2)">《隐私保护政策》</text>
					</label>
				</checkbox-group>
			</view>
		</view>
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
				responseData:{},
			}
		},
		methods:{
			_goPage(url, query = {}){
				this.$openPage({name:url, query})
			},
			checkboxChange(e) {
				if (e.detail.value.length) {
					this.isAgreement = true
				} else {
					this.isAgreement = false
				}
			},
			goLogin(){
				if (!this.isAgreement) {
					this.msg('请阅读用户协议并勾选')
					return
				}
				this._goPage('login-with-mobile', this.responseData)
			},
			async openPopup(val){
				await this.$minApi.agreement({
					type: val
				}).then(res => {
					console.log(res)
					if (res.code === 200) {
						this._goPage('rich_text', res.data)
					}
				})
			},
			 //第一授权获取用户信息===》按钮触发
			async wxGetUserInfo() {
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
										// TODO
										// 如果是返回token保存，否则用手机号授权登录
										if (res.code === 200) {
											this.saveToken(res.data.token)
											this.$minApi.getUserInfo().then(userInfo => {
												if (userInfo.code === 200) {
													this.saveUserInfo(userInfo.data)
												}
											}).catch(err => {
												console.log(err)
											})
											uni.navigateBack()
										} else if (res.code === 400) {
											this.responseData = res.data
										}
									}).catch(err => {
										console.log(err)
									})
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
	page{
		background: #ffffff;
	}
	.container{
		width: 100%;
		height: 100vh;
		background: #ffffff;
	}
	.logo{
		padding-top: 148upx;
		width: 100%;
		text-align: center;
		.img{
			width: 220upx;
			height: 220upx;
		}
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
				background-color: #2BC345;
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
				transform:scale(0.6);
			}
			.color-red{
				color: $color-primary;
			}
		}
	}
</style>
