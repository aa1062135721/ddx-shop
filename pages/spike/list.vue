<template>
    <view class="spike-list-container">
        <wlm-tab :tab-list="tabList" :tabCur.sync="select_index"  @change="tabChange" tabStyle="background:#52CBF4;"
                 selectTitleStyle="color:#fff;" selectSubTitleStyle="color:#fff;">
        </wlm-tab>

        <view class="spike-status-info">
            <view class="spike-status-info-box">
                <view class="spike-status-info-box-title">
                    <view class="title-info">
                        <text class="iconfont icon-ddx-shop-time"></text>
                        <block v-if="tabList[select_index].begin === 1">
                            <text>秒杀中</text>
                            <text>请疯狂抢购</text>
                        </block>
                        <block v-if="tabList[select_index].begin === 2">
                            <text>即将开始</text>
                            <text>请耐心等候</text>
                        </block>
                        <block v-if="tabList[select_index].begin === 3">
                            <text>抢购结束</text>
                            <text>请参加下一次秒杀</text>
                        </block>
                    </view>
                    <view  class="title-time-info">
                        <block v-if="tabList[select_index].begin === 1">
                            <text class="text">距离结束</text>
                            <text class="text">
                                <text class="hour">{{tabList[select_index].timer.h}}</text>
                                <text>:</text>
                                <text class="minute">{{tabList[select_index].timer.m}}</text>
                                <text>:</text>
                                <text class="second">{{tabList[select_index].timer.s}}</text>
                            </text>
                        </block>
                        <block v-if="tabList[select_index].begin === 2">
                            <text class="text">距开始</text>
                            <text class="text">
                                <text class="hour">{{tabList[select_index].timer.h}}</text>
                                <text>:</text>
                                <text class="minute">{{tabList[select_index].timer.m}}</text>
                                <text>:</text>
                                <text class="second">{{tabList[select_index].timer.s}}</text>
                            </text>
                        </block>
                        <block v-if="tabList[select_index].begin === 3">
                            <text class="text">秒杀状态</text>
                            <text class="text">
                                <text class="hour">已</text>
                                <text class="minute">结</text>
                                <text class="second">束</text>
                            </text>
                        </block>
                    </view>
                </view>
            </view>
        </view>

        <view class="spike-list-content"  v-for="(item, index) in tabList" :key="index" v-show="select_index === index">
            <view class="spike-list-content-box" v-for="(subItem, subIndex) in item.goodsList" :key="subIndex" @click="_goPage('spike_detail', {id: subItem.id})">
                <view class="left">
                    <image :src="subItem.pic" class="img" :lazy-load="true"></image>
                    <view class="tips"  v-if="subItem.num_type === 2">抢光啦</view>
                </view>
                <view class="right">
                    <view class="top">
                        <view class="title">
                            {{subItem.item_name}}
                        </view>
                        <view class="specifications">
<!--                             规格：X 红色 20包-->
                        </view>
                    </view>
                    <view class="bottom">
                        <view class="num">
                            <view>
                                <view class="show-num" v-show="item.begin === 1">
                                    已抢{{subItem.already_num}}件
                                </view>
                            </view>
                        </view>
                        <view class="money-btn">
                            <view class="money">
                                <view class="new-money">￥{{subItem.price}}</view>
                                <view class="old-money">￥{{subItem.old_price}}</view>
                            </view>
                            <view>
                                <view class="btn" v-show="item.begin === 1">
                                    马上抢
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="mask" v-if="subItem.num_type === 2"></view>
            </view>

<!--            <view class="spike-list-content-box">-->
<!--                <view class="left">-->
<!--                    <image src="../../static/images/goods.jpg" class="img"></image>-->
<!--                </view>-->
<!--                <view class="right">-->
<!--                    <view class="top">-->
<!--                        <view class="title">-->
<!--                            我是商品标-->
<!--                        </view>-->
<!--                        <view class="specifications">-->
<!--                            尺寸：X 颜色：红-->
<!--                        </view>-->
<!--                    </view>-->
<!--                    <view class="bottom">-->
<!--                        <view class="num">-->
<!--                            <view>-->
<!--                                <view class="show-num">-->
<!--                                    已抢99件-->
<!--                                </view>-->
<!--                            </view>-->
<!--                        </view>-->
<!--                        <view class="money-btn">-->
<!--                            <view class="money">-->
<!--                                <view class="new-money">￥99.88</view>-->
<!--                                <view class="old-money">￥199.99</view>-->
<!--                            </view>-->
<!--                            <view>-->
<!--                                <view class="btn">-->
<!--                                    马上抢-->
<!--                                </view>-->
<!--                            </view>-->
<!--                        </view>-->
<!--                    </view>-->
<!--                </view>-->
<!--            </view>-->
        </view>

        <uni-load-more :status="tabList[select_index].requestData.moreStatus" :show-icon="true"></uni-load-more>
    </view>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
    import WlmTab from '@/components/wlm-tab/wlm-tab.vue'
    let myTimer = null  //计时器，控制开关

    export default {
        name: "list",
        data(){
          return {
              select_index: 0,
              tabList: [
                  // {
                  //     begin:1,//1：正在抢购，2即将开始，3已结束
                  //     goodsList:[],
                  //     id: 1,
                  //     end_time: 1571967717,
                  //     now_time: 1571967717,
                  //     start: '10:00',
                  //     start_time: 1571967717,
                  //     requestData: {
                  //         page: 1,
                  //         limit: 10,
                  //         moreStatus: "loading",
                  //     },
                  //    timer:{
                  //        h: 0,
                  //        m: 0,
                  //        s: 0
                  //    }
                  // },
              ],
          }
        },
        onLoad(){
            this.spikeTimeList()
        },

        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            tabChange(index) {
                this.select_index = index;
                if (this.tabList[index].requestData.page === 1 && this.tabList[index].requestData.moreStatus !== 'noMore'){
                    this.$nextTick(()=>{
                        this.getGoodsList()
                    })
                }
            },
            /**
             * 获取秒杀时间段
             * @returns {Promise<void>}
             */
            async spikeTimeList(){
                await this.$minApi.seckillTime().then(res => {
                    if (res.code === 200) {
                        for (let i = 0; i < res.data.length; i++){
                               res.data[i].goodsList = []
                               res.data[i].requestData = {
                                   page: 1,
                                   limit: 4,
                                   moreStatus: "more",
                               }
                               res.data[i].timer = {
                                   h:`00`,
                                   m:`00`,
                                   s:`00`
                               }
                        }
                        this.tabList = res.data
                        console.log('获取秒杀时间段,并组合成自己要的数据', this.tabList )
                        this.$nextTick(()=>{
                            if(this.tabList.length === 0){
                                return
                            }
                            myTimer = setInterval(()=>{
                                this.$set(this.tabList[0], 'now_time', this.tabList[0].now_time + 1);
                                this.getRTime()
                            }, 1000) //设置定时器 每一秒执行一次
                            this.getGoodsList()
                        })
                    }
                })
            },
            /**
             * 根据秒杀时间的开始时间去获取该时间段的秒杀商品
             */
            async getGoodsList(){
                this.tabList[this.select_index].requestData.moreStatus = 'loading'
                let requestData = {
                    page: this.tabList[this.select_index].requestData.page,
                    limit: this.tabList[this.select_index].requestData.limit,
                    start_time: this.tabList[this.select_index].start_time,
                }
                await this.$minApi.seckillGoodsList(requestData).then(res => {
                    console.log('请求这个时间段的商品数据：', res)
                    if (res.code === 200) {
                        this.tabList[this.select_index].goodsList.push(...res.data)
                        if (res.data.length <  this.tabList[this.select_index].requestData.limit) {
                            this.tabList[this.select_index].requestData.moreStatus = 'noMore'
                        } else {
                            this.tabList[this.select_index].requestData.moreStatus = 'more'
                        }
                    }
                })
            },

            //秒杀倒计时
            getRTime(){
                console.log('秒杀倒计时功能')
                //1：正在抢购，2即将开始，3已结束
                let sum = 0
                for(let i = 0; i < this.tabList.length; i++){
                    if (this.tabList[i].start_time  > this.tabList[0].now_time) {
                        this.$set(this.tabList[i], 'begin', 2)


                        let t = this.tabList[i].start_time - this.tabList[0].now_time
                        t = t % (86400 * 365)
                        t = t % (86400 * 30)
                        t = t % 86400;
                        let h=Math.floor(t/3600) //时
                        t = t % 3600
                        let m=Math.floor(t/60) //分
                        t = t % 60
                        let s = t  //秒
                        if(parseInt(h)<10){
                            h="0"+h
                        }
                        if(parseInt(m)<10){
                            m="0"+m
                        }
                        if(parseInt(s)<10){
                            s="0"+s
                        }
                        this.tabList[i].timer = {h, m, s,}
                    }

                    if ( this.tabList[i].start_time  <= this.tabList[0].now_time && this.tabList[0].now_time <=  this.tabList[i].end_time) {
                        this.$set(this.tabList[i], 'begin', 1)

                        let t = this.tabList[i].end_time - this.tabList[0].now_time
                        t = t % (86400 * 365)
                        t = t % (86400 * 30)
                        t = t % 86400;
                        let h=Math.floor(t/3600) //时
                        t = t % 3600
                        let m=Math.floor(t/60) //分
                        t = t % 60
                        let s = t  //秒
                        if(parseInt(h)<10){
                            h="0"+h
                        }
                        if(parseInt(m)<10){
                            m="0"+m
                        }
                        if(parseInt(s)<10){
                            s="0"+s
                        }
                        this.tabList[i].timer = {h, m, s,}
                    }

                    if (this.tabList[i].end_time  < this.tabList[0].now_time) {
                        this.$set(this.tabList[i], 'begin', 3)
                        sum ++
                    }
                }
                if (sum === this.tabList.length) {
                    console.log('秒杀活动全部结束，清空计时器功能')
                    clearInterval(myTimer)
                }
            },
        },
        async onReachBottom() {
            if (this.tabList[this.select_index].requestData.moreStatus === 'noMore') {
                return
            }
            this.tabList[this.select_index].requestData.page ++
            await this.getGoodsList()
        },
        onUnload(){
            clearInterval(myTimer)
        },
        components:{
            uniLoadMore,
            WlmTab,
        },
    }
</script>

<style scoped lang="scss">
    .spike-list-container{
        .spike-status-info{
            padding: 0 $uni-spacing-row-sm;
            .spike-status-info-box{
                box-shadow: -1upx -1upx 10upx -2upx #B7B7B7;
                background: #FFFFFF;
                width: 100%;
                padding: 22upx;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-bottom: 1px solid #E4E4E4;
                box-sizing: border-box;
                .spike-status-info-box-title{
                    text-align: center;
                    .title-info{
                        text{
                            color: $color-primary;
                            font-size: $uni-font-size-base;
                            margin: 0 8upx;
                        }
                    }
                    .title-time-info{
                        text-align: center;
                        .text{
                            margin: 0 8upx;
                            font-size: $uni-font-size-base;
                            color: $color-primary-plain;
                            &:first-child{
                                color: #808080;
                            }
                            .hour, .minute, .second{
                                color: #FFFFFF;
                                background:#313131;
                                padding: 4upx;
                                border-radius: 4upx;
                            }
                            text{
                                margin: 0 2upx;
                            }
                        }
                    }


                }
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
                padding: 20upx;
                display: flex;
                justify-content: space-between;
                &:first-child{
                    border-radius: 0 0 10upx 10upx;
                    box-shadow:0 5upx 10upx 0 #B7B7B7;
                }
                .left{
                    width: 188upx;
                    height: 188upx;
                    .img{
                        border-radius:8upx;
                        width:188upx;
                        height: 188upx;
                    }

                    /* 被抢光啦 */
                    position: relative;
                    .tips{
                        width: 150upx;
                        height: 150upx;
                        line-height: 150upx;
                        text-align: center;
                        border-radius: 50%;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        margin-top: -75upx;
                        margin-left: -75upx;
                        background: rgba(0,0,0,0.5);
                        color: #FFFFFF;
                        font-size: $uni-font-size-base;
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
                        }
                        .specifications{
                            @extend %overflow-1-line;
                            color: #808080;
                            font-size: $uni-font-size-sm;
                        }
                    }
                    .bottom{
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        .num{
                            display: flex;
                            flex-direction: row;
                            justify-content: flex-end;
                            .show-num{
                                min-width:118upx;
                                text-align: center;
                                color: #808080;
                                font-size: 20upx;
                            }
                        }
                        .money-btn{
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            .money{
                                display: flex;
                                flex-direction: row;
                                justify-content: flex-start;
                                align-items: center;
                                .new-money{
                                    font-size: $uni-font-size-base;
                                    margin-right: 6upx;
                                    color: #F83D3D;
                                }
                                .old-money{
                                    font-size: $uni-font-size-sm;
                                    color: #808080;
                                    text-decoration: line-through;
                                }
                            }

                            .btn{
                                color: #ffffff;
                                font-size: $uni-font-size-sm;
                                width:118upx;
                                height:48upx;
                                line-height: 48upx;
                                text-align: center;
                                background:linear-gradient(90deg,#FE8181 0%,#F93939 100%);
                                border-radius:24px;
                            }
                        }
                    }

                }

                /* 被抢光啦 */
                position: relative;
                .mask{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width:100%;
                    height:228upx;
                    background: #FFFFFF;
                    opacity: 0.5;
                }
            }
        }
    }
</style>
