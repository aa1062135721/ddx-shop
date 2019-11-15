<template>
    <view class="spike-list-container">
        <view class="bg-image">
            <img class="img" src="./bg.png" alt="">
        </view>
        <view class="spike-list-content">
            <view class="spike-list-content-box" v-for="(item, index) in goodsData" :key="index" @click="_goPage('spike_detail', {item_id: item.item_id, seckill_id: item.id})">
                <view class="left">
                    <image :src="item.pic" class="img" :lazy-load="true"></image>
                </view>
                <view class="right">
                    <view class="top">
                        <view class="title">
                            {{item.item_name}}
                        </view>
                        <view class="specifications" v-if="item.status === 1">
                            已抢{{item.already_num}}件
                        </view>
                    </view>
                    <view class="bottom">
                        <view class="left-info">
                            <span class="price">￥{{item.price}}</span>
                            <span class="old-price">￥{{item.old_price}}</span>
                        </view>
                        <view class="right-info" v-show="item.status === 1 && item.is_over === 1">
                            <view class="btn on">立即秒杀</view>
                            <view class="tips-time">
                                <text class="text">距结束</text>
                                <block v-if="item.timer.d">{{item.timer.d}}天</block> {{item.timer.h}}:{{item.timer.m}}:{{item.timer.s}}
                            </view>
                        </view>
                        <view class="right-info" v-show="item.status === 1 && item.is_over === 2">
                            <view class="btn over">已抢完</view>
                            <view class="tips-time" style="opacity: 0;">
                                <text class="text">已抢完</text>
                                0天00:00:00
                            </view>
                        </view>
                        <view class="right-info" v-show="item.status === 2">
                            <view class="btn">还未开始</view>
                            <view class="tips-time">
                                <text class="text">距开始</text>
                                <block v-if="item.timer.d">{{item.timer.d}}天</block> {{item.timer.h}}:{{item.timer.m}}:{{item.timer.s}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <uni-load-more :status="requestData.loadStatus" :show-icon="true" color="#fff"></uni-load-more>
    </view>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
    let myTimer = null  //计时器，控制开关

    export default {
        name: "list",
        data(){
          return {
            requestData: {
                page: 1,
                limit: 10,
                loadStatus: 'noMore',
            },
            goodsData:[]
          }
        },
        async onLoad(){
            await this.loadData()
            this.$nextTick(()=>{
                if (this.goodsData.length){
                    // 10个人的组团倒计时
                    myTimer = setInterval(() => {
                        this.goodsData[0].now_time ++
                        this.timeStrChange()
                    }, 1000);//设置定时器 每一秒执行一次
                }
            })
        },

        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            // 获取秒杀商品列表
            async loadData() {
                this.requestData.loadStatus = 'loading'
                let requestData = {
                    page: this.requestData.page,
                    limit: this.requestData.limit,
                }
                await this.$minApi.getSeckillList(requestData).then(res => {
                    console.log(res)
                    if (res.code === 200) {
                        res.data.map(goods => {
                            goods.timer = {
                                d: 0,
                                h: '00',
                                m: '00',
                                s: '00',
                            }
                        })
                        if (requestData.page === 1) {
                            this.goodsData = res.data
                        } else {
                            this.goodsData.push(...res.data)
                        }
                        if (res.data.length < requestData.limit){
                            this.requestData.loadStatus = 'noMore'
                        } else {
                            this.requestData.loadStatus = 'more'
                        }
                    }
                }).catch(err => {
                    this.requestData.loadStatus = 'noMore'
                    console.log(err)
                })
            },
            // 倒计时 多个商品
            timeStrChange(){
                this.goodsData.map((item,index)=> {
                    let time_distance = 0
                    if (item.status === 1) {  // 正在秒杀
                        time_distance = item.end_time * 1000 - this.goodsData[0].now_time * 1000;
                        if (time_distance < 0) { //秒杀已结束
                            // this.goodsData.slice(index)
                        }
                    } else if (item.status === 2){  // 未开始
                        time_distance = this.goodsData[0].now_time * 1000 - item.start_time * 1000;
                        if (time_distance < 0) { // 秒杀开始了
                            item.status = 1
                        }
                    }

                    let int_day,int_hour,int_minute,int_second
                    // 天时分秒换算
                    int_day = Math.floor(time_distance/86400000)
                    time_distance -= int_day * 86400000;
                    int_hour = Math.floor(time_distance/3600000)
                    time_distance -= int_hour * 3600000;
                    int_minute = Math.floor(time_distance/60000)
                    time_distance -= int_minute * 60000;
                    int_second = Math.floor(time_distance/1000)

                    // 时分秒为单数时、前面加零站位
                    if(int_hour < 10)
                        int_hour = "0" + int_hour;
                    if(int_minute < 10)
                        int_minute = "0" + int_minute;
                    if(int_second < 10)
                        int_second = "0" + int_second;
                    item.timer =  {
                        d: int_day,
                        h: int_hour,
                        m: int_minute,
                        s: int_second,
                    }
                })
            },
        },
        async onReachBottom() {
            if (this.requestData.loadStatus === 'noMore') {
                return
            }
            this.requestData.page ++
            this.loadData()
        },
        onUnload(){
            clearInterval(myTimer)
            myTimer = null
        },
        components:{
            uniLoadMore,
        },
    }
</script>

<style scoped lang="scss">
    page {
        background: #CE00F2;
    }

    .spike-list-container{
        .bg-image{
            .img{
                width: 100%;
            }
        }
        .spike-list-content{
            padding: 0 $uni-spacing-row-sm;
            .spike-list-content-box{
                background: #FFFFFF;
                border-radius:10upx;
                box-shadow:0 0 10upx 0 #B7B7B7;
                width:100%;
                height:228upx;
                margin-bottom: 24upx;
                padding: 6upx 10upx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .left{
                    width: 188upx;
                    height: 188upx;
                    .img{
                        border-radius:8upx;
                        width:188upx;
                        height: 188upx;
                    }
                }
                .right{
                    width: calc(100% - 218upx);
                    height: 188upx;
                    font-size: $uni-font-size-base;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .top{
                        width: 100%;
                        .title{
                            @extend %overflow-2-line;
                            color: #1A1A1A;
                            font-size: $uni-font-size-sm;
                        }
                        .specifications{
                            @extend %overflow-1-line;
                            color: #808080;
                            font-size: 20upx;
                        }
                    }
                    .bottom{
                        margin-top: 15upx;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        .left-info{
                            display: flex;
                            align-items: flex-end;
                            .price{
                                margin-right: 10upx;
                                color: #FC2D2D;
                                font-size: $uni-font-size-base;
                            }
                            .old-price{
                                color: #999999;
                                text-decoration: line-through;
                                font-size: 20upx;
                            }
                        }
                        .right-info{
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            font-size: $uni-font-size-sm;
                            color: #999999;
                            position: relative;
                            .btn{
                                width: 120upx;
                                text-align: center;
                                border-radius: 6upx;
                                border: 1px solid #FC2D2D;
                                color: #FC2D2D;
                                background: #fff;
                                font-size: 20upx;
                                margin-bottom: 15upx;
                                &.on{
                                    background: #FC2D2D;
                                    color: #FFFFFF;
                                }
                                &.over{
                                    position: absolute;
                                    top: 10%;
                                    background: #D2D2D2;
                                    color: #FFFFFF;
                                    border-color: #D2D2D2;
                                }
                            }
                            .tips-time{
                                color: #FC2D2D;
                                display:flex;
                                align-items: center;
                                .text{
                                    font-size: 20upx;
                                    color: #999999;
                                    margin-right: 6upx;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
