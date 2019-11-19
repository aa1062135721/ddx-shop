<template>
    <view class="container">
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack">
            <i class="iconfont icon-ddx-shop-content_arrows"></i>
        </div>
        <!-- #endif -->

        <view class="bg">
            <view class="user-info">
                <view class="head">
                    <image :src="userInfo.pic" v-if="userInfo.id"></image>
                </view>
                <view class="name">
                    <text class="one" v-if="userInfo.id">{{userInfo.nickname || '昵称'}}</text>
                    <text class="two" v-if="userInfo.shop_name">归属门店：{{userInfo.shop_name}}</text>
                </view>
            </view>
        </view>
        <view class="section1">
            <view class="item" @click="_goPage('user_distribution_sum_order',{whichState: 1, whichDate: 1})">
                <view class="num">{{responseData.accumulated_income}}</view>
                <view class="text">累计收益（元）</view>
            </view>
            <view class="item" @click="_goPage('user_distribution_sum_order')">
                <view class="num">{{responseData.sales_volume}}</view>
                <view class="text">团队累计销售额（元）</view>
            </view>
            <view class="item" @click="_goPage('user_distribution_sum_order')">
                <view class="num">{{responseData.cumulative_order}}</view>
                <view class="text">累计订单</view>
            </view>
            <view class="item" @click="_goPage('user_distribution_sum_customer')">
                <view class="num">{{responseData.cumulative_member}}</view>
                <view class="text">累计客户</view>
            </view>
        </view>
        <view class="section2">
            <view class="box">
                <view class="item" @click="_goPage('user_distribution_sum_order', {whichState: 2, whichDate: 1})">
                    <view class="num">{{responseData.balance_accounts}}</view>
                    <view class="text">待结算收益（元）</view>
                </view>
                <view class="item" @click="_goPage('user_money')">
                    <view class="num">{{responseData.can_use_amount}}</view>
                    <view class="text">可提现金额（元）</view>
                </view>
                <view class="item" @click="_goPage('user_record')">
                    <view class="num">{{responseData.use_amount}}</view>
                    <view class="text">已提现金额（元）</view>
                </view>
            </view>
        </view>
        <view class="section2">
            <view class="box">
                <view class="item" @click="_goPage('user_distribution_sum_order', {whichState: 2, whichDate: 2})">
                    <view class="num">{{responseData.today_estimated_revenue}}</view>
                    <view class="text">今日预估收益（元）</view>
                </view>
                <view class="item" @click="_goPage('user_distribution_sum_order', {whichState: 0, whichDate: 2})">
                    <view class="num">{{responseData.today_order}}</view>
                    <view class="text">今日订单</view>
                </view>
                <view class="item" @click="_goPage('user_distribution_sum_customer', {whichDate: 2})">
                    <view class="num">{{responseData.today_member}}</view>
                    <view class="text">今日新增客户</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import { mapState, } from 'vuex'

    export default {
        name: "distribution",
        data(){
          return {
            responseData:{
                accumulated_income: "0.00",       //累积收益
                sales_volume: "0.00",             //团队累积销售额
                cumulative_order: "0",        //累计订单
                cumulative_member: "0",       //累计客户
                balance_accounts: "0.00",     //待结算收益
                can_use_amount: "0.00",       //可提现金额
                use_amount: "0.00",           //已提现金额
                today_estimated_revenue: "0.00",      //今日预估收益
                today_order: "0.00",      //今日订单
                today_member: "0.00"      //今日新增客户
            }
          }
        },
        onLoad(){
          this.$minApi.distribution().then(res => {
              console.log('后台传出来的分销数据：', res)
              if (res.code === 200) {
                  this.responseData = res.data
              }
          })
        },
        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            // 返回按钮
            _goBack() {
                uni.navigateBack()
            },
        },
        computed: {
            ...mapState(['userInfo']),
        }
    }
</script>

<style scoped lang="scss">
    .container{
        .bg{
            width: 100%;
            height:268upx;
            background-color: #F65D5C;
            background-repeat: no-repeat;
            background-size: cover;
            .user-info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                align-content: center;
                padding: 40upx $uni-spacing-row-base;
                .head{
                    image{
                        height: 100upx;
                        width: 100upx;
                        border-radius:50%;
                        margin-right: 10upx;
                        border: 2px solid #FBA2A1;
                    }
                }
                .name{
                    display: flex;
                    flex-direction: column;
                    width: 60%;
                    color: #FFFFFF;
                    .one{
                        text-align: center;
                        font-size: $uni-font-size-lg;
                    }
                    .two{
                        text-align: center;
                        font-size: $uni-font-size-base;
                    }
                }
            }
        }
        .section1{
            width: 100%;
            margin-bottom: 20upx;
            background: #FFFFFF;
            display: flex;
            flex-wrap: wrap;
            .item{
                width: 50%;
                padding: 25upx 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                .num{
                    color: $color-primary-plain;
                    font-size: $uni-font-size-lg;
                }
                .text{
                    color:#666666;
                    font-size: $uni-font-size-sm;
                }
                &:nth-child(1){
                    border-right: 1px solid #efefef;
                    border-bottom: 1px solid #efefef;
                    .num{
                        color: #FC5A5A;
                    }
                }
                &:nth-child(2){
                    border-bottom: 1px solid #efefef;
                    .num{
                        color: #FC5A5A;
                    }
                }
                &:nth-child(3){
                    border-right: 1px solid #efefef;
                }
            }
        }
        .section2{
            width: 100%;
            margin-bottom: 20upx;
            background: #FFFFFF;
            .box{
                display: flex;
                flex-wrap: nowrap;
                padding: 10upx;
                .item{
                    width: 33.3333%;
                    padding: 25upx 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    box-sizing: border-box;
                    .num{
                        color: $color-primary-plain;
                        font-size: $uni-font-size-lg;
                    }
                    .text{
                        color:#666666;
                        font-size: $uni-font-size-sm;
                    }
                    &:nth-child(1){
                        border-right: 1px solid #efefef;
                    }
                    &:nth-child(3){
                        border-left: 1px solid #efefef;
                    }
                }
            }
        }
    }
</style>
