<template>
    <view class="container">
        <view class="title">剩余12天20时自动确认</view>
        <view class="info">
            <view  class="express-delivery">
                <view>
                    <i class="iconfont icon-ddx-shop-location"></i>
                </view>
                <view class="text">
                    <view class="two-info">[快递发货]北部新区快递员 小猪11211345634 正在为您派件，请您保持电话畅通正在为您派件...</view>
                    <view class="time">2019-02-12 12:24:35</view>
                </view>
                <view>
                    <i class="iconfont icon-ddx-shop-content_arrows"></i>
                </view>
            </view>
        </view>
        <view class="info">
            <view  class="address">
                <view>
                    <i class="iconfont icon-ddx-shop-location"></i>
                </view>
                <view class="text">
                    <view>{{address.name}}<span class="mobile">{{address.mobile}}</span></view>
                    <view class="address-detail">{{address.detail}}</view>
                </view>
                <view style="opacity: 0;">
                    <i class="iconfont icon-ddx-shop-content_arrows"></i>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "detail",
        data(){
          return {
              address: {
                  name: '小可爱',
                  mobile: '15213710631',
                  detail: '重庆 重庆市 渝北区 汽博中心 重庆市渝北区汽博中心线外城市花园4栋22楼捣蛋熊猫'
              },
          }
        },
    }
</script>

<style lang="scss">
    .container{
        font-size: $uni-font-size-base;
        color: $color-primary-plain;
        .title{
            @extend %border-color-solid-botton;
            width: 100%;
            height: 80upx;
            line-height: 80upx;
            text-align: center;
            background: #fff;
        }
        .info{
            background: #fff;
            width: 100%;
            margin: auto;
            font-size: $uni-font-size-base;
            color: #1A1A1A;
            padding:0 $uni-spacing-row-sm;
            .address{
                width: calc(100% - 10px);
                height: auto;
                padding: $uni-spacing-row-sm 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .text{
                    width: 85%;
                    .address-detail{
                        @extend %overflow-2-line;
                    }
                    .mobile{
                        margin-left: $uni-spacing-row-lg;
                        color: #cccccc!important;
                    }
                }
            }
            .express-delivery{
                width: calc(100% - 10px);
                @extend %border-color-solid-botton;
                height: auto;
                padding: $uni-spacing-row-sm 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .text{
                    width: 85%;
                    .two-info{
                        font-size: $uni-font-size-base;
                        color: #6B9FE7;
                        @extend %overflow-2-line;
                    }
                    .time{
                        font-size: $uni-font-size-sm;
                        color: #808080;
                    }
                }
            }
        }
    }
</style>
