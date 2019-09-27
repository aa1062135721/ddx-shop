<template>
    <view class="container">
        <view class="title">剩余12天20时自动确认</view>
<!--        <view class="info">-->
<!--            <view  class="express-delivery">-->
<!--                <view>-->
<!--                    <i class="iconfont icon-ddx-shop-location"></i>-->
<!--                </view>-->
<!--                <view class="text">-->
<!--                    <view class="two-info">[快递发货]北部新区快递员 小猪11211345634 正在为您派件，请您保持电话畅通正在为您派件...</view>-->
<!--                    <view class="time">2019-02-12 12:24:35</view>-->
<!--                </view>-->
<!--                <view>-->
<!--                    <i class="iconfont icon-ddx-shop-content_arrows"></i>-->
<!--                </view>-->
<!--            </view>-->
<!--        </view>-->
        <view class="info">
            <view  class="address">
                <view>
                    <i class="iconfont icon-ddx-shop-location"></i>
                </view>
                <view class="text">
                    <view>{{responseData.realname}}<span class="mobile">{{responseData.mobile}}</span></view>
                    <view class="address-detail">{{responseData.detail_address}}</view>
                </view>
                <view style="opacity: 0;">
                    <i class="iconfont icon-ddx-shop-content_arrows"></i>
                </view>
            </view>
        </view>
        <!-- 订单列表 -->
        <view class="car-list">
            <view class="section" v-for="(item, key) in responseData.goods" :key="key">
                <view class="shop-name">
                    <view>{{item.mold}}</view>
                    <view style="color: #FC5A5A;">
                       {{item.deliver}}
                    </view>
                </view>
                <view class="goods">
                    <view class="goods-img">
                        <image class="img"  src="../../static/images/goods.jpg"></image>
                    </view>
                    <view class="other">
                        <view class="goods-info">
                            <view class="goods-info-title">{{item.subtitle}}</view>
                            <view class="goods-info-specification" v-if="item.attr_name">
                                规格:{{item.attr_name}}
                            </view>
                        </view>
                        <view class="money">
                            <view class="money">
                                ￥{{item.real_price}}
                            </view>
                            <view class="num">
                                X{{item.num}}
                            </view>
                        </view>
                    </view>
                </view>
                <view class="btns">
                    <button>查看物流</button>
                    <button class="active">申请售后</button>
                </view>
            </view>
        </view>
        <!--汇总-->
        <view class="sum-section">
            <view class="item">
                <view>商品金额</view>
                <view style="color: #dd524d;">￥{{responseData.amount}}</view>
            </view>
            <view class="item">
                <view>运费</view>
                <view>￥{{responseData.postage}}</view>
            </view>
            <view class="item" v-if="responseData.discount">
                <view>优惠券</view>
                <view>￥{{responseData.discount}}</view>
            </view>
        </view>
        <!--   订单号，时间等订单信息     -->
        <view class="order-info">
            <view>订单编号：{{responseData.sn}}</view>
            <view>下单时间：{{responseData.add_time}}</view>
            <view v-if="responseData.paytime !== '待支付'">付款时间：{{responseData.paytime}}</view>
            <view v-if="responseData.sendtime !== '待发货'">发货时间：{{responseData.sendtime}}</view>
        </view>
        <!--操作按钮-->
        <view class="fixed-btns">
            <button class="active">付款</button>
            <button @click="call">联系客服</button>
        </view>
    </view>
</template>

<script>
    export default {
        name: "detail",
        data(){
          return {
              responseData:{
              },
              orderList: [
                  {
                      id:100,
                      shop_name:'江与城店',
                      shop_id:1,
                      goods:[
                          {title: '我是商品1法第三方的的方法第三方',img:'../../static/images/goods.jpg',stock:8,price:10.88,in_stock:1,specification:['8*23','个'],is_checked:false},
                          {title: '我是商品1法第三方的的方法第三方',img:'../../static/images/goods.jpg',stock:8,price:90.98,in_stock:2,specification:['8*23','个'],is_checked:true},
                          {title: '我是商品1法第三方的的方法第三方',img:'../../static/images/goods.jpg',stock:8,price:50.28,in_stock:3,specification:['8*23','个'],is_checked:false},
                      ]
                  },
                  {
                      id:100,
                      shop_name:'爱情海店',
                      shop_id:1,
                      goods:[
                          {title: '我是爱情海店的商品',img:'../../static/images/goods.jpg',stock:8,price:80.08,in_stock:4,specification:['8*23','个'],is_checked:true},
                      ]
                  },
              ]
          }
        },
        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            // 联系客服
            call(){
                uni.makePhoneCall({
                    phoneNumber: '17384094352' //仅为示例
                })
            },
        },
        onLoad(param) {
            console.log("参数1",param)
            console.log("参数2", this.$parseURL())
            let requestData = {
                order_id: 0,
            }
            if (param.order_id){
                requestData.order_id = param.order_id
            }
            if (this.$parseURL().order_id){
                requestData.order_id = this.$parseURL().order_id
            }
            this.$minApi.orderDetail(requestData).then(res => {
                console.log("订单详情：",res)
                if (res.code === 200) {
                    this.responseData = res.data
                }
            })
        }
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
        .car-list{
            padding: $uni-spacing-col-lg 0;
            .section{
                background: #fff;
                margin-bottom: $uni-spacing-col-lg;
                &:last-child{
                    margin-bottom: 0;
                }
                .shop-name{
                    display: flex;
                    justify-content: space-between;
                    @extend %border-color-solid-botton;
                    padding: $uni-spacing-row-sm;
                    color: #000000;
                    font-size: $uni-font-size-lg;
                }
                .goods{
                    &:last-child{
                        border-bottom:none ;
                    }
                    display: flex;
                    margin: auto;
                    justify-content: space-between;
                    padding: $uni-spacing-row-sm;
                    width: calc(100% - 10px);
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
                            border-radius: $uni-border-radius-sm;
                        }
                    }
                    .other{
                        width: 75%;
                        display: flex;
                        flex-direction:row;
                        justify-content: space-between;
                        .goods-info{
                            display: flex;
                            flex-direction:column;
                            width: 70%;
                            .goods-info-title{
                                @extend %overflow-2-line;
                                color: #1A1A1A;
                                font-size: $uni-font-size-base;
                            }
                            .goods-info-specification{
                                color: #808080;
                                font-size: $uni-font-size-sm;
                            }
                        }
                        .money{
                            width: 30%;
                            color: #808080;
                            .money{
                                color: #1A1A1A;
                                font-size:$uni-font-size-base;
                            }
                            .num{
                                font-size: $uni-font-size-sm;
                            }
                            display: flex;
                            flex-direction: column;
                            align-items: flex-end;
                        }
                    }
                }
                .btns{
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    text-align: right;
                    padding: $uni-spacing-col-lg 0;
                    button{
                        height: 54upx;
                        line-height: 54upx;
                        border-radius:4upx;
                        color: $color-primary-plain;
                        font-size: $uni-font-size-base;
                        background: #ffffff;
                        margin: 0 12upx;
                        &:last-child{
                            margin-right: $uni-spacing-row-base;
                        }
                        &:after{
                            border-color: #D2D2D2;
                            border-radius:0;
                        }
                        &.active{
                            color: $color-primary;
                            &:after{
                                border-color: $color-primary;
                            }
                        }
                    }
                }
            }
        }
        .sum-section{
            background: #fff;
            margin-bottom: $uni-spacing-col-lg;
            .item{
                display: flex;
                justify-content: space-between;
                padding: $uni-spacing-row-sm;
                color: #000000;
                font-size: $uni-font-size-lg;
            }
        }
        .order-info{
            padding: $uni-spacing-col-lg $uni-spacing-row-base;
            background: #fff;
            font-size: $uni-font-size-base;
            color: #808080;
            margin-bottom: $uni-spacing-col-lg * 6;
            view{
                width: 100%;
                text-align: left;
                height: $uni-font-size-base * 2;
                line-height: $uni-font-size-base * 2;
            }
        }
        .fixed-btns{
            z-index: 99;
            background: #fff;
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            display: flex;
            justify-content: flex-end;
            text-align: right;
            padding: $uni-spacing-col-lg 0;
            button{
                height: 54upx;
                line-height: 54upx;
                border-radius:4upx;
                color: $color-primary-plain;
                font-size: $uni-font-size-base;
                background: #ffffff;
                margin: 0 12upx;
                &:last-child{
                    margin-right: $uni-spacing-row-base;
                }
                &:after{
                    border-color: #D2D2D2;
                    border-radius:0;
                }
                &.active{
                    color: $color-primary;
                    &:after{
                        border-color: $color-primary;
                    }
                }
            }
        }
    }
</style>
