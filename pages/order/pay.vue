<template>
    <view>
        <view class="sum-money">
            <text class="icon">￥</text>
            <text class="money">106.08</text>
        </view>
        <view class="box">
            <view class="item">
                <view>
                    <view>钱包</view>
                    <view class="has-money">可用余额：¥100.00</view>
                </view>
                <view>
                    <radio value="r1" checked="true" color="#FC5A5A" />
                </view>
            </view>
            <view class="item">
                <view>
                    <view>微信支付</view>
                </view>
                <view>
                    <radio value="r1"  color="#FC5A5A" />
                </view>
            </view>
        </view>
        <view class="my-btn">确认支付</view>
    </view>
</template>

<script>
    export default {
        name: "order_pay",
        data() {
            return {

            }
        },
        methods: {

        },
    }
</script>

<style lang="scss">
    page{
        background: #ffffff;
        color: $color-primary-plain;
        font-size: $uni-font-size-base;
    }
    .sum-money{
        text-align: center;
        padding: 100upx 0;
        height: 54upx;
        line-height: 54upx;
        color: $color-primary-plain;
        .icon{
            font-size: $uni-font-size-sm;
        }
        .money{
            font-size: $uni-font-size-lg + $uni-font-size-sm;
        }
    }
    .box{
        width: 100%;
        padding: $uni-spacing-row-base;
        .item{
            @extend %border-color-solid-botton;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 36upx 0;
            .has-money{
                color: #808080;
                font-size: $uni-font-size-sm;
            }
        }
    }
    .my-btn{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        height:98upx;
        line-height: 98upx;
        color: #ffffff;
        background: $color-primary;
        font-size: $uni-font-size-lg;
    }
</style>
