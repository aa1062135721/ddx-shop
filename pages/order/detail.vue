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
        <!-- 订单列表 -->
        <view class="car-list">
            <view class="section" v-for="(item, key) in orderList" :key="key">
                <view class="shop-name">
                    <view>{{item.shop_name}}</view>
                    <view>共{{item.goods.length}}件</view>
                </view>
                <view class="goods" v-for="(goods, goods_key) in item.goods" :key="goods_key">
                    <view class="goods-img">
                        <image class="img"  :src="goods.img"></image>
                    </view>
                    <view class="other">
                        <view class="goods-info">
                            <view class="goods-info-title">{{goods.title}}</view>
                            <view class="goods-info-specification">规格: <span v-for="(category, category_key) in goods.specification" :key="category_key">{{category}}</span></view>
                        </view>
                        <view class="money">
                            <view class="money">
                                ￥{{goods.price}}
                            </view>
                            <view class="num">
                                X{{goods.in_stock}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!--汇总-->
        <view class="sum-section">
            <view class="item">
                <view>商品金额</view>
                <view style="color: #dd524d;">￥3000</view>
            </view>
            <view class="item">
                <view>运费</view>
                <view>￥10</view>
            </view>
        </view>
        <!--   订单号，时间等订单信息     -->
        <view class="order-info">
            <view>订单编号：13215614561fasdf1ad</view>
            <view>下单时间：2019-02-03 13:15:25</view>
            <view>订单编号：13215614561fasdf1ad</view>
            <view>付款时间：2019-02-03 13:15:25</view>
        </view>
        <!--操作按钮-->
        <view class="fixed-btns">
            <button class="active">付款</button>
            <button>查看物流</button>
            <button @click="_goPage('group_buy_group')">查看拼团</button>
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
        },
        onLoad(data) {
            console.log("参数1",data)
            console.log("参数2", this.$parseURL())
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
                    @extend %border-color-solid-botton;
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
