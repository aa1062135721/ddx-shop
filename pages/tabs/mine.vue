<template>
    <view class="container">
        <view class="bg">
            <view class="user-info">
                <view class="head-name">
                    <view class="head">
                        <image src="../../static/images/goods.jpg"></image>
                    </view>
                    <view class="name">
                        小可爱的小可爱
                    </view>
                </view>
                <view class="setting">
                    <text class="iconfont icon-ddx-shop-circle icon-ddx-shop-setting"></text>
                </view>
            </view>
        </view>
        <view class="card-box">
            <view class="card">
                <view class="title-bar">
                    <view class="left">
                        <text>我的订单</text>
                    </view>
                    <view class="right">
                        <text>查看全部</text>
                        <text class="iconfont icon-ddx-shop-content_arrows"></text>
                    </view>
                </view>
                <view class="box">
                    <view class="item">
                        <view>
                            <i class="iconfont icon-ddx-shop-close"></i>
                        </view>
                        <view>
                            <text>待付款</text>
                        </view>
                    </view>
                    <view class="item">
                        <view>
                            <i class="iconfont icon-ddx-shop-close icon-ddx-shop-daichengtuan"></i>
                        </view>
                        <view>
                            <text>待成团</text>
                        </view>
                    </view>
                    <view class="item">
                        <view>
                            <i class="iconfont icon-ddx-shop-close"></i>
                        </view>
                        <view>
                            <text>待发货</text>
                        </view>
                    </view>
                    <view class="item">
                        <view>
                            <i class="iconfont icon-ddx-shop-close"></i>
                        </view>
                        <view>
                            <text>待收货</text>
                        </view>
                    </view>
                    <view class="item">
                        <view>
                            <i class="iconfont icon-ddx-shop-close"></i>
                        </view>
                        <view>
                            <text>待评价</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="card">
                <view class="box" style="justify-content: space-between;">
                    <view class="item">
                        <view>
                            <i class="iconfont icon-ddx-shop-close"></i>
                        </view>
                        <view>
                            <text>我的收益</text>
                        </view>
                    </view>
                    <view class="item">
                        <view>
                            <i class="iconfont icon-ddx-shop-close"></i>
                        </view>
                        <view>
                            <text>我的粉丝</text>
                        </view>
                    </view>
                    <view class="item">
                        <view>
                            <i class="iconfont icon-ddx-shop-close"></i>
                        </view>
                        <view>
                            <text>邀请好友</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="card">
                <view class="title-bar">
                    <view class="left">
                        <text>我的常用</text>
                    </view>
                    <view class="right">
                    </view>
                </view>
                <view class="box">
                    <view class="item" style="width: 25%;">
                        <view>
                            <i class="iconfont icon-ddx-shop-close"></i>
                        </view>
                        <view>
                            <text>经营数据</text>
                        </view>
                    </view>
                    <view class="item" style="width: 25%;">
                        <view>
                            <i class="iconfont icon-ddx-shop-close"></i>
                        </view>
                        <view>
                            <text>收货地址</text>
                        </view>
                    </view>
                    <view class="item" style="width: 25%;">
                        <view>
                            <i class="iconfont icon-ddx-shop-close"></i>
                        </view>
                        <view>
                            <text>我的收藏</text>
                        </view>
                    </view>
                    <view class="item" style="width: 25%;">
                        <view>
                            <i class="iconfont icon-ddx-shop-close"></i>
                        </view>
                        <view>
                            <text>我的足迹</text>
                        </view>
                    </view>
                    <view class="item" style="width: 25%;">
                        <view>
                            <i class="iconfont icon-ddx-shop-close"></i>
                        </view>
                        <view>
                            <text>意见反馈</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "mine",
		methods: {

		}
    }
</script>

<style lang="scss">
.container{
    .bg{
        height:316upx;
        width: 100%;
        background: #FFCCCC;
        .user-info{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 10upx $uni-spacing-row-base;
            .head-name{
                padding-top: 34upx  ;
                width: 80%;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                .head{
                    image{
                        height: 100upx;
                        width: 100upx;
                        border: 1upx solid #fff;
                        border-radius:50%;
                        margin-right: 10upx;
                    }
                }
                .name{
                    color: #ffffff;
                    font-size: $uni-font-size-lg;
                }
            }
            .setting{
                width: 20%;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
    .card-box{
        padding: $uni-spacing-row-base;
        .card{
            margin: 20upx auto;
            width:100%;
            background: #ffffff;
            border:1upx solid #fff;
            box-shadow:0 0 13upx 0 #D2D2D2;
            border-radius:10upx;
            .title-bar{
                display:flex;
                flex-direction:row;
                flex-wrap: nowrap;
                align-items: center;
                justify-content: space-between;
                font-size: $uni-font-size-base;
                color: $color-primary-plain;
                padding: 20upx $uni-spacing-row-base;
                border-bottom: 1px solid #CCCCCC;
                .left{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: $uni-font-size-lg;
                }
                .right{
                    color: #808080;
                    .iconfont{
                        margin-left: 6upx;
                        font-size: $uni-font-size-base;
                    }
                }

            }
            .box{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                padding: $uni-spacing-row-base 0;
                .item{
                    display: flex;
                    flex-wrap: nowrap;
                    flex-direction: column;
                    align-items: center;
                    width: 20%;
                    padding: $uni-spacing-col-sm 0;
                    .iconfont{
                        width:90upx;
                        height: 90upx;
                        font-size: 90upx;
                    }
                    text{
                        font-size: $uni-font-size-base;
                        color: $color-primary-plain;
                    }
                }
            }
        }
    }
}
</style>
