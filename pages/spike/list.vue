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
                        <!-- 秒杀中   疯狂抢购-->
                        <text>即将开始</text>
                        <text>请耐心等候</text>
                    </view>
                    <view  class="title-time-info">
                        <text class="text">距离结束</text>
                        <text class="text">
                            <text class="hour">15</text>
                            <text>:</text>
                            <text class="minute">08</text>
                            <text>:</text>
                            <text class="second">24</text>
                        </text>
                    </view>
                </view>
            </view>
        </view>

        <view class="spike-list-content">
            <view class="spike-list-content-box">
                <view class="left">
                    <image src="../../static/images/goods.jpg" class="img"></image>
                </view>
                <view class="right">
                    <view class="top">
                        <view class="title">
                            我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题
                        </view>
                        <view class="specifications">
                             规格：X 红色 20包
                        </view>
                    </view>
                    <view class="bottom">
                        <view class="num">
                            <view>
                                <view class="show-num">
                                    已抢999999件
                                </view>
                            </view>
                        </view>
                        <view class="money-btn">
                            <view class="money">
                                <view class="new-money">￥99.88</view>
                                <view class="old-money">￥199.99</view>
                            </view>
                            <view>
                                <view class="btn">
                                    马上抢
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="spike-list-content-box">
                <view class="left">
                    <image src="../../static/images/goods.jpg" class="img"></image>
                </view>
                <view class="right">
                    <view class="top">
                        <view class="title">
                            我是商品标
                        </view>
                        <view class="specifications">
                            尺寸：X 颜色：红
                        </view>
                    </view>
                    <view class="bottom">
                        <view class="num">
                            <view>
                                <view class="show-num">
                                    已抢99件
                                </view>
                            </view>
                        </view>
                        <view class="money-btn">
                            <view class="money">
                                <view class="new-money">￥99.88</view>
                                <view class="old-money">￥199.99</view>
                            </view>
                            <view>
                                <view class="btn">
                                    马上抢
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="spike-list-content-box">
                <view class="left">
                    <image src="../../static/images/goods.jpg" class="img"></image>
                </view>
                <view class="right">
                    <view class="top">
                        <view class="title">
                            我是商品标
                        </view>
                        <view class="specifications">
                            尺寸：X 颜色：红
                        </view>
                    </view>
                    <view class="bottom">
                        <view class="num">
                            <view>
                                <view class="show-num">
                                    已抢99件
                                </view>
                            </view>
                        </view>
                        <view class="money-btn">
                            <view class="money">
                                <view class="new-money">￥99.88</view>
                                <view class="old-money">￥199.99</view>
                            </view>
                            <view>
                                <view class="btn">
                                    马上抢
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <uni-load-more :status="moreStatus" :show-icon="true"></uni-load-more>
    </view>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
    import WlmTab from '@/components/wlm-tab/wlm-tab.vue'


    export default {
        name: "list",
        data(){
          return {
              select_index: 0,
              tabList: [
                  {
                      begin:1,//1：正在抢购，2即将开始，3已结束
                      goodsList:[],
                      id: 1,
                      end_time: 1571967717,
                      now_time: 1571967717,
                      start: '10:00',
                      start_time: 1571967717,
                  },
                  {
                      begin:2,//1：正在抢购，2即将开始，3已结束
                      goodsList:[],
                      id: 2,
                      end_time: 1571967717,
                      now_time: 1571967717,
                      start: '12:00',
                      start_time: 1571967717,
                  },
                  {
                      begin:3,//1：正在抢购，2即将开始，3已结束
                      goodsList:[],
                      id: 3,
                      end_time: 1571967717,
                      now_time: 1571967717,
                      start: '14:00',
                      start_time: 1571967717,
                  },
                  {
                      begin:2,//1：正在抢购，2即将开始，3已结束
                      goodsList:[],
                      id: 4,
                      end_time: 1571967717,
                      now_time: 1571967717,
                      start: '16:00',
                      start_time: 1571967717,
                  },
              ],
              moreStatus: "more",
              requestData: {
                  page: 1,
                  limit: 10,
              }
          }
        },
        methods: {
            tabChange(index) {
                this.select_index = index;
            },
        },
        async onReachBottom() {
            if (this.moreStatus === 'noMore') {
                return
            }
            this.moreStatus = 'loading'
            this.requestData.page ++
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

            }
        }
    }
</style>
