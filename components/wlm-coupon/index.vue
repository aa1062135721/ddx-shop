<template>
    <uni-popup ref="coupon" type="bottom" :custom="true" @change="change">
            <div class="coupon">
                <div class="my-coupon-title">领取优惠券</div>
                <div class="my-coupon-box">
                    <div class="item" @click="_goPage('coupon_details', {id: 10})">
                        <div class="left">
                            <div class="content">
                                <div class="content-left">
                                    <div class="content-left-price">
                                        <span>￥</span>
                                        20
                                    </div>
                                </div>
                                <div class="content-right">
                                    <div class="content-right-title">
                                        单订金额满168元可使用
                                    </div>
                                    <div class="content-right-time">
                                        有效期至：2019-08-20
                                    </div>
                                </div>
                            </div>
                            <div class="semicircle-top"></div>
                            <div class="semicircle-bottom"></div>
                        </div>
                        <div class="right">
                            <div class="content">
                                去使用
                                <div class="sub-has-more">持有1张</div>
                            </div>
                            <div class="semicircle-top"></div>
                            <div class="semicircle-bottom"></div>
                        </div>
                        <!-- 波浪线 -->
                        <div class="circle1"></div>
                    </div>
                    <div class="item" @click="_goPage('coupon_details', {id: 10})">
                        <div class="left">
                            <div class="content">
                                <div class="content-left">
                                    <div class="content-left-price">
                                        <span>￥</span>
                                        20
                                    </div>
                                </div>
                                <div class="content-right">
                                    <div class="content-right-title">
                                        单订金额满168元可使用
                                    </div>
                                    <div class="content-right-time">
                                        有效期至：2019-08-20
                                    </div>
                                </div>
                            </div>
                            <div class="semicircle-top"></div>
                            <div class="semicircle-bottom"></div>
                        </div>
                        <div class="right">
                            <div class="content">
                                去使用
                            </div>
                            <div class="semicircle-top"></div>
                            <div class="semicircle-bottom"></div>
                        </div>
                        <!-- 波浪线 -->
                        <div class="circle1"></div>
                    </div>
                    <div class="item" @click="_goPage('coupon_details', {id: 10})">
                        <div class="left">
                            <div class="content">
                                <div class="content-left">
                                    <div class="content-left-price">
                                        <span>￥</span>
                                        20
                                    </div>
                                </div>
                                <div class="content-right">
                                    <div class="content-right-title">
                                        单订金额满168元可使用
                                    </div>
                                    <div class="content-right-time">
                                        有效期至：2019-08-20
                                    </div>
                                </div>
                            </div>
                            <div class="semicircle-top"></div>
                            <div class="semicircle-bottom"></div>
                        </div>
                        <div class="right">
                            <div class="content">
                                去使用
                            </div>
                            <div class="semicircle-top"></div>
                            <div class="semicircle-bottom"></div>
                        </div>
                        <!-- 波浪线 -->
                        <div class="circle1"></div>
                    </div>
                    <div class="item grey" @click="_goPage('coupon_details', {id: 10})">
                        <div class="left">
                            <div class="content">
                                <div class="content-left">
                                    <div class="content-left-price">
                                        <span>￥</span>
                                        20
                                    </div>
                                </div>
                                <div class="content-right">
                                    <div class="content-right-title">
                                        单订金额满168元可使用
                                    </div>
                                    <div class="content-right-time">
                                        有效期至：2019-08-20
                                    </div>
                                </div>
                            </div>
                            <div class="semicircle-top"></div>
                            <div class="semicircle-bottom"></div>
                        </div>
                        <div class="right">
                            <div class="content grey-border grey-bg grey-font">
                                已领取
                            </div>
                            <div class="semicircle-top grey-border"></div>
                            <div class="semicircle-bottom grey-border"></div>
                        </div>
                        <!-- 波浪线 -->
                        <div class="circle1"></div>
                    </div>
                </div>
                <div class="btn" @click="close">确定</div>
            </div>
        </uni-popup>
</template>

<script>
    import uniPopup from '@/components/uni-popup/uni-popup.vue'

    export default {
        name: 'coupon', // 商品/秒杀/拼团 详情领取优惠券弹框
        data() {
            return {
            }
        },
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
        },
        watch: {
            isShow(newValue, oldValue) {
                if (newValue) {
                    this.open()
                }
            }
        },
        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            open(){
                this.$refs.coupon.open()
            },
            close(){
                this.$refs.coupon.close()
            },
            change(e){
               if (!e.show){
                   this.$emit("update:isShow", false)
               }
            },
        },
        components: {
            uniPopup,
        },
    }
</script>

<style scoped lang="scss">
    .coupon {
        background: #fff;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: auto;
        .my-coupon-title {
            @extend %border-color-solid-botton;
            line-height: 60upx;
            font-size: $uni-font-size-lg;
            padding: 15upx 0;
            text-align: center;
        }
        .my-coupon-box {
            overflow: auto;
            height: 550upx;
            padding: $uni-spacing-row-base;
            .item{
                position: relative;
                display: flex;
                justify-content: space-between;
                height:200upx;
                overflow: hidden;
                margin-bottom: 20upx;
                &.grey{
                    opacity: 0.8;
                }
                .left{
                    background-color: #FFFFFF;
                    border-radius:10upx 0 0 10upx;
                    width: calc(100% - 134upx);
                    height: 200upx;
                    .content{
                        background-color: #FFFFFF;
                        border-radius:10upx 0 0 10upx;
                        width: calc(100% - 20upx);
                        padding: 20upx;
                        height: 100%;
                        box-sizing: border-box;
                        border:1px solid rgba(220,220,220,1);
                        border-right: none;

                        display: flex;
                        justify-content: space-between;
                        .content-left{
                            height: 100%;
                            width: 30%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            .content-left-price{
                                text-align: center;
                                font-size: $uni-font-size-lg * 2;
                                color: $color-primary;
                                span{
                                    font-size: $uni-font-size-sm;
                                }
                            }
                            .content-left-text{
                                @extend %overflow-1-line;
                                text-align: center;
                                color: #333333;
                                font-size: $uni-font-size-sm;
                            }
                        }
                        .content-right{
                            height: 100%;
                            width: 60%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            .content-right-title{
                                @extend %overflow-2-line;
                                font-size: $uni-font-size-base;
                            }
                            .content-right-time{
                                color: #808080;
                                font-size: $uni-font-size-sm;
                            }
                        }
                    }

                    overflow: hidden;
                    position: relative;
                    .semicircle-top{
                        background-color: #FFFFFF;
                        top: -20upx;
                        right: -20upx;
                        position: absolute;
                        width: 40upx;
                        height: 40upx;
                        border-radius: 50%;
                        box-sizing: border-box;
                        border:1px solid rgba(220,220,220,1);
                        z-index: 9;
                    }
                    .semicircle-bottom{
                        background-color: #FFFFFF;
                        bottom: -20upx;
                        right: -20upx;
                        position: absolute;
                        width: 40upx;
                        height: 40upx;
                        border-radius: 50%;
                        box-sizing: border-box;
                        border:1px solid rgba(220,220,220,1);
                        z-index: 9;
                    }
                }
                .right{
                    border-radius:0 10upx 10upx 0;
                    background-color:$color-primary;
                    width:134upx;
                    height: 200upx;

                    .content{
                        background-color: $color-primary;
                        border-radius:10upx 0 0 10upx;
                        height: 200upx;
                        box-sizing: border-box;
                        border:1px solid $color-primary;
                        border-left: none;
                        color: #FFFFFF;
                        font-size: $uni-font-size-base;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        &.grey-font{
                            color: #999999;
                        }
                        .sub-has-more{
                            color: #FDBFBF;
                            font-size: $uni-font-size-sm - 4upx;
                        }
                    }


                    overflow: hidden;
                    position: relative;
                    .semicircle-top{
                        background-color: #FFFFFF;
                        top: -20upx;
                        left: -20upx;
                        position: absolute;
                        width: 40upx;
                        height: 40upx;
                        border-radius: 50%;
                        box-sizing: border-box;
                        border:1px solid $color-primary;
                        z-index: 9;
                    }
                    .semicircle-bottom{
                        background-color: #FFFFFF;
                        bottom: -20upx;
                        left: -20upx;
                        position: absolute;
                        width: 40upx;
                        height: 40upx;
                        border-radius: 50%;
                        box-sizing: border-box;
                        border:1px solid $color-primary;
                        z-index: 9;
                    }

                    .grey-border{
                        border:1px solid #D4D4D4;
                    }
                    .grey-bg{
                        background-color: #EEEEEE;
                    }

                }
                /*波浪线*/
                .circle1 {
                    position: absolute;
                    top: 10upx;
                    left: calc(100% - 134upx);
                    transform-origin: center left;
                    transform: rotate(90deg);
                    width: 180upx;
                    height: 20upx;
                    background-image: radial-gradient(circle, #fff, #fff 4px, transparent 0px, transparent 2px, transparent 22px, transparent);
                    background-size: 10px 10px;
                    background-repeat: repeat-x;
                }
            }
        }
        .btn{
            width: 100%;
            height: 98upx;
            line-height: 98upx;
            font-size: $uni-font-size-lg;
            color: #ffffff;
            text-align: center;
            background: $color-primary;
        }
    }
</style>
