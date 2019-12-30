<template>
    <view class="container">
        <view class="bg">
            <view class="user-info">
                <view class="head">
                    <image :src="userInfo.pic" v-if="userInfo.id"></image>
                    <image src="../../static/images/head.png" v-else @click="login"></image>
                </view>
                <view class="name">
                    <text class="one" v-if="userInfo.id">{{userInfo.nickname}}</text>
                    <text class="one" v-else @click="login">未登录</text>
                </view>
            </view>
            <view class="setting" @click="goPage('setting')">
                <text class="iconfont icon-ddx-shop-setting"></text>
            </view>
        </view>
        <view class="card-box">
            <view class="card">
                <view class="title-bar" style="border: none;">
                    <view class="left">
                        <text>我的财富</text>
                    </view>
                </view>
                <view class="box" style="justify-content: space-between;">
                    <view class="item" @click="goPage('user_money')">
                        <view>
                            <view class="icon-text" style="color:#FC5A5A;">
                                <block v-if="userInfo.money">{{userInfo.money}}</block>
                                <block v-else>0.00</block>
                                <text class="unit" style="color:#FC5A5A;">元</text>
                            </view>
                        </view>
                        <text class="text" style="margin-top: 6upx;">钱包</text>
                    </view>
                    <view class="item">
                        <view>
                            <view class="icon-text">
                                0<text class="unit">分</text>
                            </view>
                        </view>
                        <text class="text" style="margin-top: 6upx;">积分</text>
                    </view>
                    <view class="item" @click="goPage('coupon_list')">
                        <view>
                            <view class="icon-text">
                                0<text class="unit">张</text>
                            </view>
                        </view>
                        <text class="text" style="margin-top: 6upx;">优惠券</text>
                    </view>
                    <view class="item"><!--  @click="goPage('user_card_list')"  -->
                        <view>
                            <view class="icon-text">
                                0<text class="unit">张</text>
                            </view>
                        </view>
                        <text class="text" style="margin-top: 6upx;">卡包</text>
                    </view>
                </view>
            </view>
            <view class="ad" @click="goPage('pre_store')"></view>
			<view class="card">
                <view class="title-bar">
                    <view class="left">
                        <text>我的订单</text>
                    </view>
                    <view class="right" @click="goPage('order_list', {status: 0})">
                        <text>查看全部</text>
                        <text class="iconfont icon-ddx-shop-content_arrows"></text>
                    </view>
                </view>
                <view class="box" style="justify-content: space-between;">
                    <view class="item" @click="goPage('order_list',{status: 1})">
                        <view>
                            <image src="../../static/icon/order/pre-payment.png"></image>
                        </view>
                        <text class="text">待付款</text>
                        <view class="red" v-if="userInfo.stay_pay">{{userInfo.stay_pay}}</view>
                    </view>
                    <view class="item" @click="goPage('order_list',{status: 2})">
                        <view>
                            <image src="../../static/icon/order/to-be-delivered.png"></image>
                        </view>
                        <text class="text">待发货</text>
                        <view class="red" v-if="userInfo.stay_sendout">{{userInfo.stay_sendout}}</view>
                    </view>
                    <view class="item" @click="goPage('order_list',{status: 3})">
                        <view>
                            <image src="../../static/icon/order/pending-receipt.png"></image>
                        </view>
                        <text class="text">待收货</text>
                        <view class="red" v-if="userInfo.stay_takeover">{{userInfo.stay_takeover}}</view>
                    </view>
                    <view class="item" @click="goPage('order_list',{status:4})">
                        <view>
                            <image src="../../static/icon/order/comment.png"></image>
                        </view>
                        <text class="text">待评价</text>
                        <view class="red" v-if="userInfo.stay_discuss">{{userInfo.stay_discuss}}</view>
                    </view>
                    <view class="item" @click="goPage('order_list',{status:5})">
                        <view>
                            <image src="../../static/icon/order/refund-after-sale.png"></image>
                        </view>
                        <text class="text">退款/售后</text>
                        <view class="red" v-if="userInfo.stay_sale">{{userInfo.stay_sale}}</view>
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
                    <view class="item" style="width: 25%;" @click="goDistribution()">
                        <view>
                            <image src="../../static/icon/distribution.png"></image>
                        </view>
                        <text class="text">分销中心</text>
                    </view>
                    <view class="item" style="width: 25%;" v-if="userInfo.isShareholder" @click="goPage('web_view', {url: newShareholderDataUrl})">
                        <view>
                            <image src="../../static/icon/business-data.png"></image>
                        </view>
                        <text class="text">经营数据</text>
                    </view>
                    <view class="item" style="width: 25%;" v-if="userInfo.isShareholder" @click="goPage('web_view', {url: oldShareholderDataUrl})">
                        <view>
                            <image src="../../static/icon/business-data.png"></image>
                        </view>
                        <text class="text">经营数据(原)</text>
                    </view>
                    <view class="item" style="width: 25%;" @click="goPage('address_list')">
                        <view>
                            <image src="../../static/icon/location.png"></image>
                        </view>
                        <text class="text">收货地址</text>
                    </view>
                    <view class="item" style="width: 25%;display: none;">
                        <view>
                            <image src="../../static/icon/collection.png"></image>
                        </view>
                        <text class="text">我的收藏</text>
                    </view>
                    <view class="item" style="width: 25%;display: none;">
                        <view>
                            <image src="../../static/icon/footprint.png"></image>
                        </view>
                        <text class="text">我的足迹</text>
                    </view>
                    <view class="item" style="width: 25%;" @click="goPage('feedback')">
                        <view>
                            <image src="../../static/icon/suggestion.png"></image>
                        </view>
                        <text class="text">意见反馈</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import * as Constant from '../../utils/constant'
    import {  mapState, mapActions } from 'vuex'

    export default {
        name: "mine",
        data(){
            return {

            }
        },
        onShow(){
            if (this.userInfo.id){
                console.log('每次打开我的页面，就会从新去获取新的用户数据')
                this.asyncGetUserInfo()
            }
        },
		methods: {
            ...mapActions(['asyncGetUserInfo']),
            goPage(url,query = {}){
                this.$openPage({name: url, query: query})
            },
            // 去分销中心，如果不是分销员，先到 成为分销员 页面
            goDistribution(){
                // 用户未登录 调用登录接口
                if (!this.userInfo.id){
                    this.login()
                }
                // 是分销员
                if (this.userInfo.retail === 1){
                    this.goPage('user_distribution')
                }
                // 不是分销员
                if (this.userInfo.retail === 0){
                    this.goPage('user_distributor')
                }
                console.log('点击了分销中心')
            },
            login(){
                this.loginWithOfficalAccount()
            }
		},
        computed: {
            ...mapState(['userInfo']),
            oldShareholderDataUrl(){
                return Constant[Constant.NODE_ENV].oldShareholderDataUrl
            },
            newShareholderDataUrl(){
                return  Constant[Constant.NODE_ENV].newShareholderDataUrl + this.$store.state.userInfo.mobile
            },
        }
    }
</script>

<style lang="scss">
.container{
    .bg{
        width: 100%;
        height:268upx;
        background-color: #FE6969;
        background-image: url('~@/static/images/mine-bg.png');
        background-repeat: no-repeat;
        background-size: cover;
        .user-info{
            display: flex;
            flex-direction: row;
            align-items: center;
            align-content: center;
            padding: 40upx $uni-spacing-row-base;
            .head{
                image{
                    height: 100upx;
                    width: 100upx;
                    border-radius:50%;
                    margin-right: 40upx;
                }
            }
            .name{
                display: flex;
                flex-direction: column;
                width: 60%;
                color: #FFFFFF;
                .one{
                    font-size: $uni-font-size-lg;
                }
                .two{
                    font-size: $uni-font-size-base;
                }
            }
        }
        .setting{
            position: absolute;
            top: 18upx;
            right: 40upx;
            display: flex;
            justify-content: flex-end;
            .iconfont{
                color: #FFFFFF;
            }
        }
    }
    .card-box{
        margin-top: -130upx;
        padding: $uni-spacing-row-base;
		.ad{
			margin: 26upx auto;
			height: 170upx;
			background: url(../../static/images/ad.png) no-repeat center center;
			background-size: cover;
		}
        .card{
            margin: 20upx auto;
            width:100%;
            background: #ffffff;
            border:1px solid #fff;
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
                border-bottom: 1px solid #F2F2F2;
                .left{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: $uni-font-size-base;
                    font-weight:500;
                }
                .right{
                    color: #808080;
                    font-size: $uni-font-size-sm;
                    .iconfont{
                        margin-left: 6upx;
                        font-size: $uni-font-size-sm;
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
                    position: relative;
                    view{
                        .iconfont{
                            font-size: 60upx;
                        }
                        image{
                            width: 60upx;
                            height: 60upx;
                        }
                        .icon-text{
                            color: $color-primary-plain;
                            font-size: $uni-font-size-lg;
                            .unit{
                                font-size: 20upx;
                            }
                        }
                    }
                    .text{
                        font-size: $uni-font-size-sm;
                        color: $color-primary-plain;
                    }
                    .red{
                        position: absolute;
                        top: 4upx;
                        right: 16upx;
                        background: red;
                        border-radius: 50%;
                        color: #ffffff;
                        font-size: $uni-font-size-sm;
                        width: 34upx;
                        height: 34upx;
                        text-align: center;
                        line-height: 34upx;
                    }
                }
            }
        }
    }
}
</style>
