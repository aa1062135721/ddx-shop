<template>
    <div>
        <div class="container">
            <div class="coupon">
                <div class="coupon-top">
                    <div class="title">奶粉纸尿裤专场</div>
                    <div class="time">有效日期：领券次日起5天内可用</div>
                </div>
                <hr class="coupon-hr">
                <div class="coupon-bottom">
                    <div class="price">
                        <div class="text">面值</div>
                        <div>20.00</div>
                    </div>
                    <div class="price-sub">有效日期：领券次日起5天内可用</div>
                </div>

                <div class="semicircle-left"></div>
                <div class="semicircle-right"></div>
            </div>
            <div class="box">
                <div class="btn">
                    <div class="now-use">立即使用</div>
                </div>
                <div class="div-block"></div>
                <div class="footer">
                    <div class="item">
                        <div class="title">使用说明</div>
                        <div class="content">奶粉纸尿裤专场</div>
                    </div>
                    <div class="item">
                        <div class="title">优惠内容</div>
                        <div class="content">全部商品可用，满200元，减免20元优惠券</div>
                    </div>
                    <div class="item">
                        <div class="title">使用时间</div>
                        <div class="content">领券次日起5天内可用</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                key: "dfasd"
            }
        },
        methods: {
            name() {

            }
        },
        onLoad() {
          console.log("其他页面带过来的参数：", this.$parseURL())
        },
    }
</script>

<style scoped lang="scss">
    .container{
        padding: $uni-spacing-row-base;
        border-radius:10upx;
        overflow: hidden;
        .coupon{
            height:380upx;
            background:rgba(250,71,71,1);
            border-radius:10upx;

            .coupon-top{
                height: 110upx;
                width: 100%;
                border:1px solid rgba(250,71,71,1);
                border-bottom: none;
                padding: 0 $uni-spacing-row-base * 2;
                display: flex;
                flex-direction: column;
                justify-content:space-around;
                color: #FFFFFF;
                .title{
                    font-size: $uni-font-size-base;
                }
                .time{
                    font-size: $uni-font-size-sm;
                }
            }
            .coupon-hr{
                height: 0;
                width: 100%;
                border:2upx dashed rgba(224,33,33,1);
            }
            .coupon-bottom{
                height: 268upx;
                width: 100%;

                padding: 0 $uni-spacing-row-base * 2;
                display: flex;
                flex-direction: column;
                justify-content:space-around;
                color: #FFFFFF;
                .price{
                    display: flex;
                    .text{
                        font-size: $uni-font-size-sm;
                        margin-right: 20upx;
                    }
                    font-size: $uni-font-size-base * 3;
                }
                .price-sub{
                    font-size: $uni-font-size-sm;
                }
            }

            overflow: hidden;
            position: relative;
            .semicircle-left{
                background-color: $background-color;
                top:calc(110upx - 20upx);
                left: -20upx;
                position: absolute;
                width: 40upx;
                height: 40upx;
                border-radius: 50%;
                box-sizing: border-box;
                border:1px solid rgba(250,71,71,1);
                z-index: 9;
            }
            .semicircle-right{
                background-color: $background-color;
                top:calc(110upx - 20upx);
                right: -20upx;
                position: absolute;
                width: 40upx;
                height: 40upx;
                border-radius: 50%;
                box-sizing: border-box;
                border:1px solid rgba(250,71,71,1);
                z-index: 9;
            }
        }
        .box{
            margin-top: -10upx;
            background-color: #fff;
            border:1px solid rgba(210,210,210,1);
            border-top: none;
            border-radius:0 0 10upx 10upx;
            box-sizing: border-box;
            overflow: hidden;
            .btn{
                background-color: #FFFFFF;
                display: flex;
                justify-content: center;
                box-sizing: border-box;
                .now-use{
                    margin-top: 55upx;
                    margin-bottom: 30upx;
                    background-color: #F42F2F;
                    width:254upx;
                    text-align: center;
                    height:60upx;
                    line-height: 60upx;
                    border-radius:6upx;
                    color: #FFFFFF;
                    font-size: $uni-font-size-base;
                }
            }
            .div-block{
                background: $background-color;
                width: 100%;
                height:14upx;
            }
            .footer{
                background-color: #FFFFFF;
                display: flex;
                flex-direction: column;
                padding: $uni-spacing-row-base;

                .item{
                    @extend %border-color-solid-botton;
                    font-size: $uni-font-size-base;
                    padding: $uni-spacing-row-sm * 2  0;
                    &:last-child{
                        border-bottom: none;
                    }
                    .title{
                        color: #666666;
                    }
                    .content{
                        color: #333333;
                    }
                }
            }
        }
    }
</style>
