<template>
    <view class="container">
        <view class="section">
            <view class="item">
                <view class="left">
                    <view class="title">昵称</view>
                    <view class="value">{{userInfo.nickname}}</view>
                </view>
                <view class="right">
                </view>
            </view>
            <view class="item">
                <view class="left">
                    <view class="title">手机号码</view>
                    <view class="value">{{userInfo.mobile | filterMobile}}</view>
                </view>
                <view class="right">
                    <view class="btn" @click="_goPage('user_modify_mobile')">
                        修改
                    </view>
                </view>
            </view>
            <view class="item">
                <view class="left">
                    <view class="title">实名认证</view>
                    <view class="value" v-if="userInfo.attestation">已实名认证</view>
                    <view class="value" v-else>未实名认证</view>
                </view>
                <view class="right">
                    <view v-if="userInfo.attestation" class="btn" @click="_goPage('id_card_authentication_detail')">
                        查看
                    </view>
                    <view v-else class="btn" @click="_goPage('id_card_authentication')">
                        去认证
                    </view>
                </view>
            </view>
            <view class="item">
                <view class="left">
                    <view class="title">解绑</view>
                    <view class="value">解绑手机号，谨慎操作！</view>
                </view>
                <view class="right">
                    <view class="btn" @click="unBindMobile()">
                        解绑
                    </view>
                </view>
            </view>
            <view class="item" style="display: none;">
                <view class="left">
                    <view class="title">退出登录</view>
                    <view class="value">注销登录</view>
                </view>
                <view class="right">
                    <view class="btn" @click="loginOut">
                        注销
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: "setting",
        data() {
          return {

          }
        },
        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            loginOut(){
                this.setUserInfo()
                this.setToken()
                this.setShopID()
                this._goPage('mine')
            },
            unBindMobile(){
                let _that = this;
                uni.showModal({
                    title: '警告',
                    content: "解绑后，你当前微信绑定的手机号将被移除绑定，请谨慎操作！？",
                    success: function (showModalRes) {
                        if (showModalRes.confirm) {
                            _that.$minApi.unBindMobile(null).then(res => {
                                if (res.code === 200){
                                    _that.msg('解绑成功');
                                    _that.setToken(); // 清空用户token
                                    _that.setUserInfo(); // 清空用户数据
                                    _that._goPage('home');
                                }
                            })
                        } else if (showModalRes.cancel) {

                        }
                    }
                });
            },
            ...mapMutations(['setToken', 'setUserInfo', 'setShopID'])
        },
        computed:{
            ...mapState(['userInfo'])
        }
    }
</script>

<style lang="scss">
    .container{
        .section{
            padding: 0 $uni-spacing-row-base;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            .item{
                @extend %border-color-solid-botton;
                &:last-child{
                    border-bottom: none;
                }
                padding: $uni-spacing-row-lg 0;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                font-size: $uni-font-size-base;
                .left{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .title{
                        color: $color-primary-plain;
                        width: 150upx;
                        margin-right: 16upx;
                    }
                    .value{
                        color: #808080;
                    }
                }
                .right{
                    .btn{
                        border: 1upx solid #D2D2D2;
                        color: $color-primary-plain;
                        height: 48upx;
                        line-height: 48upx;
                        text-align: center;
                        padding: 0 $uni-spacing-row-base;
                        border-radius:2upx;
                    }
                }

            }
        }
    }
</style>
