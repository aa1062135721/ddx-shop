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
            ...mapMutations(['setToken', 'setUserInfo', 'setShopID'])
        },
        filters: {
            filterMobile(mobile){
                return   mobile.replace(mobile.substring(3,7), "****")
            },
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
