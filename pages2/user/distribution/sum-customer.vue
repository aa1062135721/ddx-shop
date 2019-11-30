<template>
    <view>
        <view class="title-bar">
            <view class="btns">
                <view class="btn" :class="{'on': btnIndex === 1}" @click="changeBtnIndex(1)">全部</view>
                <view class="btn" :class="{'on': btnIndex === 2}" @click="changeBtnIndex(2)">今日</view>
                <view class="btn" :class="{'on': btnIndex === 3}" @click="changeBtnIndex(3)">昨日</view>
                <view class="btn" :class="{'on': btnIndex === 4}" @click="changeBtnIndex(4)">本周</view>
            </view>
            <view class="select-date">
                <view v-if="btnIndex !== 0" @click="onShowDatePicker()">自定义时间</view>
                <view  class="red" v-else @click="onShowDatePicker()">{{requestData.start_time}}至{{requestData.end_time}}</view>
                <view class="iconfont icon-ddx-shop-content_arrows" :class="{'red' : btnIndex === 0}"></view>
            </view>
        </view>
        <view class="sub-title-bar">
            共<text>{{responseData.count}}</text>个客户
        </view>
        <view class="main-box">


            <view class="one-box" v-for="(item, index) in responseData.list" :key="index">
                <view class="left">
                    <view class="avatar">
                        <image class="img" :src="item.pic"></image>
                    </view>
                </view>
                <view class="right">
                    <view class='user-name'>
                        {{item.nickname}}
                        <span class="my-tag" v-if="item.type === 1">直属分销员</span>
                        <span class="my-tag" v-if="item.type === 2">二级分销员</span>
                    </view>
                    <view class='sum-data'>
                        成交额：<text>{{item.money}}</text>
                        订单数：<text>{{item.count}}</text>
                    </view>
                    <view class="near-order-time">
                        最近下单时间：{{item.time}}
                    </view>
                </view>
            </view>

        </view>
        <uni-load-more :status="requestData.moreStatus" :show-icon="true"></uni-load-more>
        <mx-date-picker :show="showPicker" type="range" :show-tips="true" :begin-text="'开始'" :end-text="'结束'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
    </view>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
    import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue" // 日期时间选择器

    export default {
        name: "sum-customer", // 累计客户
        data() {
            return {
                showPicker: false, //日期选择器是否显示

                btnIndex: 1, // 1全部  2今日 3昨日 4本周 0自定义时间
                requestData: {
                    start_time: '',
                    end_time: '',
                    page:1,
                    limit:10,
                    moreStatus: 'loading',
                },
                responseData: {
                    count: 0,
                    list: [],
                }
            }
        },
        methods: {
            // 显示日期选择器弹框
            onShowDatePicker(){
                this.showPicker = true
            },
            // 选择日期
            onSelected(e) {
                this.showPicker = false
                if(e) {
                    console.log(e)
                    if (e.date.length){
                        this.requestData.start_time = this.timstampToDate(e.date[0])
                        this.requestData.end_time = this.timstampToDate(e.date[1])
                        this.btnIndex = 0
                        this.requestData.page = 1
                        this.loadData()
                    }
                }
            },

            changeBtnIndex(index) {
                if (index === this.btnIndex) {
                    return
                }
                let startAndEndDate = {
                    start_date: '',
                    end_date: '',
                }
                this.responseData.count = 0
                this.responseData.list = []
                switch (index) {
                    case 1:
                        break
                    case 2:
                        startAndEndDate = this.getStartDateAndEndDate("today")
                        break
                    case 3:
                        startAndEndDate = this.getStartDateAndEndDate("yesterday")
                        break
                    case 4:
                        startAndEndDate = this.getStartDateAndEndDate("thisWeek")
                        break
                }
                console.log(startAndEndDate)
                this.btnIndex = index
                this.requestData.start_time = startAndEndDate.start_date
                this.requestData.end_time = startAndEndDate.end_date
                this.requestData.page = 1
                this.loadData()
            },


            async loadData() {
                this.requestData.moreStatus = "loading"
                let requestData = {
                    page: this.requestData.page,
                    limit: this.requestData.limit,
                    start_time: this.requestData.start_time,
                    end_time: this.requestData.end_time
                }
                if (this.btnIndex === 1) {
                    delete requestData.start_time
                    delete requestData.end_time
                }

                await this.$minApi.getRetailMember(requestData).then(res => {
                    console.log(res)
                    if (res.code === 200) {
                        this.responseData.count = res.count
                        if (requestData.page === 1) {
                            this.responseData.list = res.data
                        } else {
                            this.responseData.list.push(...res.data)
                        }
                        if (res.data.length < requestData.limit){
                            this.requestData.moreStatus = 'noMore'
                        } else {
                            this.requestData.moreStatus = 'more'
                        }
                    }
                })
            }
        },
        onLoad(){
            console.log("其他页面带过来的参数：", this.$parseURL())
            if (this.$parseURL().whichDate){
                this.changeBtnIndex(this.$parseURL().whichDate)
            }
            this.loadData()
        },

        /**
         * 上拉加载更多
         */
        onReachBottom(){
            if (this.requestData.moreStatus === 'noMore') {
                return
            }
            this.requestData.page ++
            this.loadData()
        },
        components:{
            uniLoadMore,
            MxDatePicker,
        },
    }
</script>

<style scoped lang="scss">
    @import "./public-style";
    .main-box{
        padding: 0 $uni-spacing-row-base;
        display: flex;
        flex-direction: column;
        .one-box{
            background: #FFFFFF;
            border-radius:6upx;
            margin-bottom: 24upx;
            display: flex;
            justify-content: flex-start;
            padding: 20upx;
            .left{
                .avatar{
                    margin-right: 20upx;
                  .img{
                      height: 80upx;
                      width: 80upx;
                      border-radius: 50%;
                  }
                }
            }
            .right{
                display: flex;
                flex-direction: column;
                font-size: $uni-font-size-base;
                color: #999;
                .user-name{
                    color: $color-primary-plain;
                    margin-bottom: 20upx;
                    .my-tag{
                        background-color: $color-primary;
                        color: #FFFFFF;
                        font-size: 16upx;
                        padding: 4upx 20upx;
                        margin-left: 10px;
                        border-radius: 19upx;
                    }
                }
                .sum-data{
                    margin-bottom: 20upx;
                    text{
                        color: $color-primary-plain;
                        &:first-child{
                            margin-right: 20upx;
                        }
                    }
                }
            }
        }
    }
</style>
