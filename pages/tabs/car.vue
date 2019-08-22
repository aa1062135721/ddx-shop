<template>
    <view class="container">
        <view class="car-list">
            <view class="section">
                <view class="shop-name">
                    <view>江与城店</view>
                    <view><i class="iconfont icon-ddx-shop-del icon-color"></i></view>
                </view>
                <view class="goods">
                    <view class="chooses">
                        <i class="iconfont icon-ddx-shop-circle icon-color"></i>
                    </view>
                    <view class="goods-img">
                        <image class="img"  src="../../static/images/goods.jpg"></image>
                    </view>
                    <view class="other">
                        <view class="title">衍生山楂蜜梅膏植物饮品生山楂蜜梅膏植生山楂蜜梅膏植 (10G＊10生山楂蜜梅膏植生山楂蜜梅膏植)生山楂蜜梅膏植</view>
                        <view class="specification">规格:10G＊10</view>
                        <view class="money">
                            <view class="money-num">￥88.08</view>
                            <view><uni-number-box :min="1" :max="5" :step="1"></uni-number-box></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="fixed">
            <view class="chooses-all"><i class="iconfont icon-ddx-shop-circle"></i>全选</view>
            <view class="other">
                <view class="money">合计：<span class="money-num">￥88.08</span></view>
                <view class="btn" @click="goPage()">结算(2)</view>
            </view>
        </view>
    </view>
</template>

<script>
    import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
    export default {
        name: "car",
        data(){
          return {

          }
        },
        methods:{
            goPage(){
                this.$openPage('order_submit')
            }
        },
        components: {uniNumberBox}
    }
</script>

<style lang="scss">
    .container{
        padding-top: $uni-spacing-col-lg;
        .car-list{
            padding-bottom: $uni-spacing-col-lg * 4;
            .section{
                background: #fff;
                margin-bottom: $uni-spacing-col-lg;
                .shop-name{
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #cccccc;
                    padding: $uni-spacing-row-sm;
                    color: #000000;
                    font-size: $uni-font-size-lg;
                }
                .goods{
                    display: flex;
                    justify-content: space-between;
                    padding: $uni-spacing-row-sm;
                    width: 100%;
                    height: 23.5%;
                    .chooses{
                        display: flex;
                        align-items:center;
                        margin-right: $uni-spacing-row-sm;
                    }
                    .goods-img{
                        margin-right: $uni-spacing-row-sm;
                        .img{
                            width: 200upx;
                            height: 200upx;
                        }
                    }
                    .other{
                        width: 57%;
                        display: flex;
                        flex-direction:column;
                        .title{
                           @extend %overflow-2-line;
                            color: #1A1A1A;
                            font-size: $uni-font-size-base;
                        }
                        .specification{
                            color: #808080;
                            font-size: $uni-font-size-sm;
                        }
                        .money{
                            font-size:$uni-font-size-base;
                            .money-num{
                                color: $color-primary;
                            }
                            display: flex;
                            justify-content: space-between;
                        }
                    }
                }
            }
        }
        .fixed{
            @extend %border-color-solid-top;
            background: #fff;
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            display: flex;
            height: 100upx;
            line-height: 100upx;
            justify-content: space-between;
            font-size: $uni-font-size-lg;
            padding-left: $uni-spacing-row-sm;
            .chooses-all{
                color: #cccccc;
                display: flex;
                justify-content: flex-start;
                font-size: $uni-font-size-lg;
            }
            .other{
                display: flex;
                justify-content: flex-start;
                .money{
                    color:  #1A1A1A;
                    .money-num{
                        color: $color-primary;
                    }
                    margin-right: $uni-spacing-row-lg;
                }
                .btn{
                    padding: 0 $uni-spacing-row-lg + $uni-spacing-row-lg;
                    background: $color-primary;
                    color: #fff;
                }
            }
        }
    }
</style>
