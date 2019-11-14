<template>
    <view class="spike-list-container">
        <view class="bg-image">
            <img class="img" src="./bg.png" alt="">
        </view>
        <view class="spike-list-content">
            <view class="spike-list-content-box">
                <view class="left">
                    <image src="../../static/images/goods.jpg" class="img" :lazy-load="true"></image>
                </view>
                <view class="right">
                    <view class="top">
                        <view class="title">
                            我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题
                        </view>
                        <view class="specifications">
                            已有99人抢购
                        </view>
                    </view>
                    <view class="bottom">
                        <view class="left-info">
                            <span class="price">￥99.99</span>
                            <span class="old-price">￥99.99</span>
                        </view>
                        <view class="right-info">
                            <view class="btn on">立即秒杀</view>
                            <view class="tips-time">
                                <text class="text">距结束&nbsp;</text>
                                28天12:59:10
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="spike-list-content-box">
                <view class="left">
                    <image src="../../static/images/goods.jpg" class="img" :lazy-load="true"></image>
                </view>
                <view class="right">
                    <view class="top">
                        <view class="title">
                            我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题
                        </view>
                        <view class="specifications">
                            已有99人抢购
                        </view>
                    </view>
                    <view class="bottom">
                        <view class="left-info">
                            <span class="price">￥99.99</span>
                            <span class="old-price">￥99.99</span>
                        </view>
                        <view class="right-info">
                            <view class="btn">立即秒杀</view>
                            <view class="tips-time">
                                <text class="text">距开始&nbsp;</text>
                                28天12:59:10
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="spike-list-content-box">
                <view class="left">
                    <image src="../../static/images/goods.jpg" class="img" :lazy-load="true"></image>
                </view>
                <view class="right">
                    <view class="top">
                        <view class="title">
                            我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题
                        </view>
                        <view class="specifications">
                            已有99人抢购
                        </view>
                    </view>
                    <view class="bottom">
                        <view class="left-info">
                            <span class="price">￥99.99</span>
                            <span class="old-price">￥99.99</span>
                        </view>
                        <view class="right-info">
                            <view class="btn over">已抢完</view>
                            <view class="tips-time" style="opacity: 0;">
                                <text class="text">距开始</text>
                                28天12:59:10
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <uni-load-more status="noMore" :show-icon="true" color="#fff"></uni-load-more>
    </view>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
    let myTimer = null  //计时器，控制开关

    export default {
        name: "list",
        data(){
          return {

          }
        },
        onLoad(){

        },

        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
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

        },
        onUnload(){
            clearInterval(myTimer)
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
