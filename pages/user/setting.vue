<template>
    <view class="container">
        <view class="section">
            <view class="item">
                <view class="left">
                    <view class="title">昵称</view>
                    <view class="value">吴大帅哥</view>
                </view>
                <view class="right">
                </view>
            </view>
            <view class="item">
                <view class="left">
                    <view class="title">手机号码</view>
                    <view class="value">15213710631</view>
                </view>
                <view class="right">
                    <view class="btn">
                        修改
                    </view>
                </view>
            </view>
            <view class="item">
                <view class="left">
                    <view class="title">实名认证</view>
                    <view class="value">未认证</view>
                </view>
                <view class="right">
                    <view class="btn" @click="_goPage('id_card_authentication')">
                        前往
                    </view>
                </view>
            </view>
            <view class="item">
                <view class="left">
                    <view class="title">查看物流</view>
                    <view class="value"></view>
                </view>
                <view class="right">
                    <view class="btn" @click="_goPage('logistics_view')">
                        前往
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
    import {mapMutations,mapActions} from 'vuex'

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
                this.saveUserInfo()
                this.saveToken()
                uni.navigateBack()
            },
            ...mapActions(['saveToken', 'saveUserInfo'])
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
