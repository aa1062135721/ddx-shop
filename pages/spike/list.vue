<template>
    <view class="spike-list-container">
        <!-- #ifdef H5 -->
<!--        <div id="my-h5-back" @click="_goBack"></div>-->
        <!-- #endif -->

<!--        <img class="bg-image" src="../../static/images/spike-banner.png" alt="">-->

        <div class="time-list">
            <wlm-tab :tab-list="tabList2" :tabCur.sync="TabCur2"  @change="tabChange2"
                     tabStyle="background:#2B2B2B;"
                     titleStyle="color:#fff;"
                     subTitleStyle="color:#fff;"
                     selectTitleStyle="color:#F5E25C;padding:0 4px;"
                     selectSubTitleStyle="color:#FFD800;"
            ></wlm-tab>
        </div>
        <div style="height: 20upx;width: 100%;"></div>
        <view class="spike-list-content">
            <img v-show="TabCur2 === 0" src="./images/0.png" alt="" style="margin:0 auto 10px auto;display: block;width: 120px;">
            <img v-show="TabCur2 === 1" src="./images/1.png" alt="" style="margin:0 auto 10px auto;display: block;width: 120px;">
            <img v-show="TabCur2 === 2" src="./images/2.png" alt="" style="margin:0 auto 10px auto;display: block;width: 120px;">
            <img v-show="TabCur2 === 3" src="./images/3.png" alt="" style="margin:0 auto 10px auto;display: block;width: 120px;">
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
                            <view class="btn on">立即抢购</view>
                            <view class="tips-time">
                                <text class="text">距结束</text>
                                <block v-if="item.timer.d">{{item.timer.d}}天</block> {{item.timer.h}}:{{item.timer.m}}:{{item.timer.s}}
                            </view>
                        </view>
                        <view class="right-info" v-show="item.status === 1 && item.is_over === 2">
                            <view class="btn over">已抢完啦</view>
                            <view class="tips-time" style="opacity: 0;">
                                <text class="text">已抢完</text>
                                0天00:00:00
                            </view>
                        </view>
                        <view class="right-info" v-show="item.status === 2">
                            <view class="btn">即将开始</view>
                            <view class="tips-time">
                                <text class="text">距开始</text>
                                <block v-if="item.timer.d">{{item.timer.d}}天</block> {{item.timer.h}}:{{item.timer.m}}:{{item.timer.s}}
                            </view>
                        </view>
                        <view class="right-info" v-show="item.status === 3">
                            <view class="btn over">秒杀结束</view>
                            <view class="tips-time" style="opacity: 0;">
                                <text class="text">已结束</text>
                                0天00:00:00
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <uni-load-more :status="requestData.loadStatus" :show-icon="true"></uni-load-more>
    </view>
</template>

<script>
    import wlmTab from '@/components/wlm-tab/wlm-tab.vue'
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
    let myTimer = null  //计时器，控制开关
    let myTimerTimeList = null  //计时器，控制时间段的开关
    import * as Constant from '../../utils/constant'
    import { mapState } from 'vuex'

    export default {
        name: "list",
        data(){
          return {
              TabCur2: 0,
              tabList2: [
                  // {
                  //     "start_time": 1576029600,   //开始的具体时间
                  //     "title": "十点秒杀3个(21点结算)",   //标题暂时没用
                  //     "start_title": "10:00",     //开始的时间点
                  //     "status": 1,        //状态：1正在秒杀,2即将开始
                  //     "now_time": 1576053368, //当前时间
                  // },
              ],
            requestData: {
                page: 1,
                limit: 10,
                loadStatus: 'noMore',
            },
            goodsData:[]
          }
        },
        computed:{
          ...mapState(['userInfo'])
        },
        async onLoad(){
            // 如果是安卓平台 每次进入商品详情页面就会调用微信配置，自定义分享商品
            if ((await this.getPlatform()).isAndroid){
                await this.wxConfig()
            }
            let url = Constant[Constant.NODE_ENV].spikeList // 分享地址
            // 如果用户登录了，把自己的唯一id也分享出去
            if(this.userInfo.id) {
                url += `?user_id=${this.userInfo.id}`
            }
            url = Constant[Constant.NODE_ENV].shareRedirectURL + encodeURIComponent(url)
            await this.getSpikeTimeList() // 获取秒杀时间段
            await this.loadData() // 根据秒杀时间段获取 该段下面的秒杀商品

            this.$nextTick(()=>{
                let param1 = {
                        title: `捣蛋熊商城-每日秒杀`, // 分享标题
                        desc: `限时秒杀，疯狂嗨购！`, // 分享描述
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: `${window.location.origin}/h5/static/images/share-spike-banner.jpg`, // 分享图标
                        success: function () {}
                    },
                    param2 = {
                        title: `捣蛋熊商城-每日秒杀。限时秒杀，疯狂嗨购！`, // 分享标题
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: `${window.location.origin}/h5/static/images/share-spike-banner.jpg`, // 分享图标
                        success: function () {}
                    }
                this.wxConigShareGoods(param1, param2)
            })
        },

        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            // 返回按钮
            _goBack() {
                if (getCurrentPages().length === 1) {
                    this._goPage('home')
                } else {
                    uni.navigateBack()
                }
            },
            // 获取秒杀商品列表
            async loadData() {
                this.requestData.loadStatus = 'loading'
                let requestData = {
                    page: this.requestData.page,
                    limit: this.requestData.limit,
                    start_time: this.tabList2[this.TabCur2].start_time
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
                            this.$nextTick(() => {
                                if (this.goodsData.length){
                                    myTimer = setInterval(() => {
                                        this.goodsData[0].now_time ++
                                        this.timeStrChange()
                                    }, 1000) // 设置定时器 每一秒执行一次
                                }
                            })
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
                        if (time_distance <= 0) { //秒杀已结束
                            item.status = 3
                        }
                    } else if (item.status === 2){  // 未开始
                        time_distance = item.start_time * 1000 - this.goodsData[0].now_time * 1000;
                        if (time_distance <= 0) { // 秒杀开始了
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

            // 倒计时 获取时间段
            async getSpikeTimeList(){
                await this.$minApi.spikeTimeList().then(res => {
                    if (res.code === 200) {
                        this.tabList2 = res.data
                        this.$nextTick(() => {
                            if (res.data.length) {
                                myTimerTimeList = setInterval(()=>{
                                    this.$set(this.tabList2[0], 'now_time', this.tabList2[0].now_time + 1)
                                    this.getRTime()
                                }, 1000) //设置定时器 每一秒执行一次
                            }
                        })
                    }
                })
            },

            // 秒杀时间段 tab切换
            tabChange2(index) {
                this.TabCur2 = index
                this.requestData.page = 1
                this.goodsData = []
                clearInterval(myTimer)
                myTimer = null
                this.loadData()
            },
            //秒杀倒计时
            getRTime(){
                //1：正在抢购，2即将开始，3已结束
                for(let i = 0; i < this.tabList2.length; i++){
                    if (this.tabList2[i].start_time  > this.tabList2[0].now_time) {
                        this.$set(this.tabList2[i], 'begin', 2)
                    }

                    if ( this.tabList2[i].start_time  <= this.tabList2[0].now_time && this.tabList2[0].now_time <=  this.tabList2[i].end_time) {
                        this.$set(this.tabList2[i], 'begin', 1)
                    }

                    if (this.tabList2[i].end_time  < this.tabList2[0].now_time) {
                        this.$set(this.tabList2[i], 'begin', 3)
                    }
                }
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
            clearInterval(myTimerTimeList)
            myTimerTimeList = null
        },
        components:{
            uniLoadMore,
            wlmTab,
        },
    }
</script>

<style scoped lang="scss">
    page {
        /*background: #FE5B50;*/
    }
    .time-list{
        background:#2B2B2B;
        padding: 0 $uni-spacing-row-sm;
    }
    .spike-list-container{
        .bg-image{
            display: block;
            width: 100%;
        }
        .spike-list-content{
            padding: 0 $uni-spacing-row-sm;
            .spike-list-content-box{
                background: #FFFFFF;
                border-radius:10upx;
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
                                width: 126upx;
                                height: 40upx;
                                line-height: 40upx;
                                text-align: center;
                                border-radius: 20upx;
                                background:#CCCCCC;
                                color: #FFFFFF;
                                font-size: 18upx;
                                margin-bottom: 5upx;
                                &.on{
                                    background:linear-gradient(-45deg,rgba(252,69,60,1) 0%,rgba(252,123,178,1) 100%);
                                    color: #FFFFFF;
                                }
                                &.over{
                                    position: absolute;
                                    top: 10%;
                                    background: #D2D2D2;
                                    color: #FFFFFF;
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
