<template>
    <view class="container">
        <view class="goods-info">
            <view class="goods-info-img">
                <image src="../../static/images/goods.jpg" class="img"></image>
            </view>
            <view class="goods-info-infos">
                <view class="infos-title">
                    我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题
                </view>
                <view class="infos-other">
                    <view class="top">
                        <view class="new-money">
                            ￥360
                        </view>
                        <view class="tag">
                            3人拼团
                        </view>
                    </view>
                    <view class="bottom">
                        <text>单买价</text>
                        <text class="old-money">￥500.00</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="group-detail">
            <view class="text">
                <text>紧剩<text class="num">2</text>个名额，<text class="time">20:30:04</text>后结束</text>
            </view>
            <view class="heads">
                <view class="head">
                    <image src="../../static/images/goods.jpg" class="img"></image>
                    <view class="tag">团长</view>
                </view>
                <view class="head">
                    <image src="../../static/images/goods.jpg" class="img"></image>
                </view>
                <view class="head">
                    <image src="../../static/images/goods.jpg" class="img"></image>
                </view>
                <view class="head">
                    <image src="../../static/images/goods.jpg" class="img"></image>
                </view>
                <view class="head">
                    <image src="../../static/images/goods.jpg" class="img"></image>
                </view>
                <view class="head">
                    <image src="../../static/images/goods.jpg" class="img"></image>
                </view>
                <view class="head">
                    <image src="../../static/images/help.png" class="img no-img"></image>
                </view>
            </view>
            <view class="btns">
                <view class="btn active">已参团，邀请好友参团</view>
                <view class="btn plain">一键开团</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                responseData: {

                }
            }
        },
        methods: {

        },
        onLoad(param){
            console.log("第一个参数", param)

            console.log("其他页面带过来的参数：", this.$parseURL())

            let requestData = {
                id: 0
            }
            if (param.id)   {
                requestData.id = param.id
            }
            if (this.$parseURL().id){
                requestData.id = this.$parseURL().id
            }

            this.$minApi.groupBuyDetail(requestData).then(res => {
                console.log(res)
                if (res.code === 200){
                    this.responseData = res.data
                }
            })
        },
        components: {
        }
    }
</script>

<style lang="scss">
    .container {
        .goods-info{
            padding: $uni-spacing-row-base;
            width: 100%;
            display: flex;
            background: #ffffff;
            justify-content: space-between;
            border-bottom: 1upx dashed #E4E4E4;
            .goods-info-img{
                width: 240upx;
                height: 240upx;
                .img{
                    height: 100%;
                    width: 100%;
                    border-radius: 8upx;
                }
            }
            .goods-info-infos{
                height: 240upx;
                width: calc(100% -  240upx - 30upx);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .infos-title{
                    @extend %overflow-2-line;
                    font-size: $uni-font-size-base;
                    color: $color-primary-plain;
                }
                .infos-other{
                    font-size: $uni-font-size-base;
                    color: #808080;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    .top{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .new-money{
                            color: #F82B2B;
                            margin-right: 8upx;
                        }
                        .tag{
                            height:32upx;
                            line-height: 32upx;
                            border-radius:0 16upx 16upx 0;
                            padding: 0 20upx;
                            background: #FC5A5A;
                            color: #ffffff;
                            font-size: $uni-font-size-sm;
                        }
                    }
                    .bottom{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        font-size: $uni-font-size-sm;
                        .old-money{
                            font-size: 20upx;
                            text-decoration: line-through;
                            margin-left: 8upx;
                        }
                    }
                }
            }
        }

        .group-detail{
            background: #fff;
            padding: $uni-spacing-row-base * 2;
            .text{
                text-align: center;
                font-size: $uni-font-size-base;
                color: $color-primary-plain;
                margin-bottom: 38upx;
                .num{
                    color: $color-primary;
                }
                .time{
                    color: #000;
                }
            }
            .heads{
                border: 1uxp solid red;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                margin-bottom: 38upx;
                .head{
                    position: relative;
                    width: 88upx;
                    height: 88upx;
                    margin: 20upx;
                    .img{
                        border-radius: 50%;
                        border: 1upx solid $color-primary;
                        width: 88upx;
                        height: 88upx;
                    }
                    .no-img{
                        border: 1upx dashed #D2D2D2;
                    }
                    .tag{
                        position: absolute;
                        left: 0;
                        bottom: -14upx;
                        height: 28upx;
                        line-height: 28upx;
                        width: 88upx;
                        text-align: center;
                        background: $color-primary;
                        font-size: $uni-font-size-sm;
                        color: #ffffff;
                        border-radius: 14upx;
                    }
                }
            }
            .btns{
                .btn{
                    width: 100%;
                    text-align: center;
                    line-height: 88upx;
                    height: 88upx;
                    border-radius:44upx;
                    font-size: $uni-font-size-base;
                    border: 1upx solid $color-primary;
                    margin-bottom: 40upx;
                    &.active{
                        border: 1upx solid $color-primary;
                        background: $color-primary;
                        color: #fff;
                    }
                    &.plain{
                        border: 1upx solid $color-primary;
                        background: #fff;
                        color: $color-primary;
                    }
                }
            }
        }
    }
</style>
