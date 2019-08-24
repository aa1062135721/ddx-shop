<template>
    <view class="container">
        <view class="address">
            <view  class="has-address" v-if="address.name">
                <view>
                    <i class="iconfont icon-ddx-shop-location"></i>
                </view>
                <view class="text">
                    <view>{{address.name}}<span class="mobile">{{address.mobile}}</span></view>
                    <view class="address-detail">{{address.detail}}</view>
                </view>
                <view>
                    <i class="iconfont icon-ddx-shop-content_arrows"></i>
                </view>
            </view>
            <view  class="no-address" v-else>
                <view>
                    <i class="iconfont icon-ddx-shop-anonymous-iconfont icon-color"></i>
                </view>
                <view>新增收货地址</view>
            </view>
        </view>
        <view class="car-list">
            <view class="section" v-for="(item, key) in category" :key="key">
                <view class="shop-name">
                    <view>{{item.shop_name}}</view>
                    <view>共{{item.goods.length}}件</view>
                </view>
                <view class="goods" v-for="(goods, goods_key) in item.goods" :key="goods_key">
                    <view class="goods-img">
                        <image class="img"  :src="goods.img"></image>
                    </view>
                    <view class="other">
                        <view class="title">{{goods.title}}</view>
                        <view class="specification">规格: <span v-for="(category, category_key) in goods.specification" :key="category_key">{{category}}</span></view>
                        <view class="money">
                            <view class="money-num"></view>
                            <view>
                                X{{goods.in_stock}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="section">
                <view class="shop-name" style="border: none;">
                    <view>商品金额</view>
                    <view style="color: #dd524d;">￥3000</view>
                </view>
                <view class="shop-name" style="border: none;">
                    <view>运费</view>
                    <view>￥10</view>
                </view>
            </view>
        </view>

        <view class="fixed">
            <view class="other">
                <view class="num">共3件，</view>
                <view class="money">合计：<span class="money-num">￥{{500}}</span></view>
                <view class="btn" @click="goPage()">提交订单</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "submit",
        data(){
          return {
              address: {
                  name: '小可爱',
                  mobile: '15213710631',
                  detail: '重庆 重庆市 渝北区 汽博中心 重庆市渝北区汽博中心线外城市花园4栋22楼捣蛋熊猫'
              },
              category:[
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
              ],
          }
        },
        methods:{
            checkMobile(){
                this.isPoneAvailable('15013710631',true)
            },
            goPage(){
                this.$openPage('order_result')
            }
        }
    }
</script>

<style scoped lang="scss">
    .container{
        color: #1A1A1A;
        .address{
            background: #fff;
            width: 100%;
            height: 168upx;
            font-size: $uni-font-size-base;
            color: #1A1A1A;
            padding: $uni-spacing-row-sm;
            .no-address{
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                font-size: $uni-font-size-lg;
                i{
                    margin-right: $uni-spacing-row-sm;
                }
            }
            .has-address{
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                padding-left: $uni-spacing-row-sm;
                padding-right: $uni-spacing-row-sm;
                justify-content: space-between;
                .text{
                    width: 80%;
                    .address-detail{
                        @extend %overflow-2-line;
                    }
                    .mobile{
                        margin-left: $uni-spacing-row-lg;
                        color: #cccccc!important;
                    }
                }
            }
        }
        .car-list{
            padding-top: $uni-spacing-col-lg;
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
                            border-radius: $uni-border-radius-sm;
                        }
                    }
                    .other{
                        width: 75%;
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
                            color: #808080;
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
            z-index: 99;
            background: #fff;
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 100upx;
            line-height: 100upx;
            display: flex;
            flex-direction:row;
            flex-flow:nowrap;
            justify-content: flex-end;
            font-size: $uni-font-size-lg;
            padding-left: $uni-spacing-row-sm;
            .other{
                display: flex;
                justify-content: flex-end;
                .num{
                    font-size: $uni-font-size-base;
                    color: #808080;
                }
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
