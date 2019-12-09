<template>
    <div>
        <view class="navbar">
            <view
                    v-for="(item, index) in navList" :key="index"
                    class="nav-item"
                    :class="{current: tabCurrentIndex === index}"
                    @click="tabClick(index)">
                {{item.text}}
            </view>
        </view>

        <div class="my-block"></div>

        <div class="card-list" v-show="tabCurrentIndex === 0">
            <div class="item year">
                <div class="item-header">
                    <div class="header-title">活动专用水育次卡（2次）</div>
                    <div class="header-body">
                        <div class="header-body-top">
                            <span>水育共10次，还剩余5次</span>
                            <span>水育共10次，还剩余5次</span>
                        </div>
                        <div class="header-body-bottom">
                            <span>水育共10次，还剩余5次</span>
                            <span>水育共10次，还剩余5次</span>
                        </div>
                    </div>
                </div>
                <div class="item-footer">
                    <span class="time">有效期至：2019-12-30 12:24:30</span>
                    <span class="status">待使用</span>
                </div>

                <img src="./images/send-flag.png" alt="赠送" class="flag">
            </div>
            <div class="item month">
                <div class="item-header">
                    <div class="header-title">活动专用水育次卡（2次）</div>
                    <div class="header-body">
                        <div class="header-body-top">
                            <span>水育共10次，还剩余5次</span>
                            <span>水育共10次，还剩余5次</span>
                        </div>
                        <div class="header-body-bottom">
                            <span>水育共10次，还剩余5次</span>
                            <span>水育共10次，还剩余5次</span>
                        </div>
                    </div>
                </div>
                <div class="item-footer">
                    <span class="time">有效期至：2019-12-30 12:24:30</span>
                    <span class="status">待使用</span>
                </div>

                <img src="./images/send-flag.png" alt="赠送" class="flag">
            </div>
            <div class="item secondary">
                <div class="item-header">
                    <div class="header-title">活动专用水育次卡（2次）</div>
                    <div class="header-body">
                        <div class="header-body-top">
                            <span>水育共10次，还剩余5次</span>
                            <span>水育共10次，还剩余5次</span>
                        </div>
                        <div class="header-body-bottom">
                            <span>水育共10次，还剩余5次</span>
                            <span>水育共10次，还剩余5次</span>
                        </div>
                    </div>
                </div>
                <div class="item-footer">
                    <span class="time">有效期至：2019-12-30 12:24:30</span>
                    <span class="status">待使用</span>
                </div>

                <img src="./images/send-flag.png" alt="赠送" class="flag">
            </div>
            <div class="item expired">
                <div class="item-header">
                    <div class="header-title">活动专用水育次卡（2次）</div>
                    <div class="header-body">
                        <div class="header-body-top">
                            <span>水育共10次，还剩余5次</span>
                            <span>水育共10次，还剩余5次</span>
                        </div>
                        <div class="header-body-bottom">
                            <span>水育共10次，还剩余5次</span>
                            <span>水育共10次，还剩余5次</span>
                        </div>
                    </div>
                </div>
                <div class="item-footer">
                    <span class="time">有效期至：2019-12-30 12:24:30</span>
                    <span class="status">待使用</span>
                </div>

                <img src="./images/send-flag.png" alt="赠送" class="flag">
            </div>
        </div>

        <div class="footer">
            所有服务卡请在附近门店使用
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data(){
          return{
              tabCurrentIndex: 0,
              navList: [
                  {
                      text: '全部',
                      requestData:{
                          page:1,
                          limit:10,
                          loadingType: 'more',
                          state: 0,
                      },
                      list: []
                  },
                  {
                      text: '次卡',
                      requestData:{
                          page:1,
                          limit:10,
                          loadingType: 'more',
                          state: 0,
                      },
                      list: []
                  },
                  {
                      text: '月卡',
                      requestData:{
                          page:1,
                          limit:10,
                          loadingType: 'more',
                          state: 0,
                      },
                      list: []
                  },
                  {
                      text: '年卡',
                      requestData:{
                          page:1,
                          limit:10,
                          loadingType: 'more',
                          state: 0,
                      },
                      list: []
                  },
              ],
          }
        },
        methods:{
            //顶部tab点击
            async tabClick(index){
                if (index === this.tabCurrentIndex) {
                    return
                }
                this.tabCurrentIndex = index
                if (this.navList[this.tabCurrentIndex].requestData.page === 1) {
                    await this.loadData()
                }
            },
            //获取订单列表
            async loadData(){
                this.navList[this.tabCurrentIndex].requestData.loadingType = 'loading'
                let requestData = {
                    status: this.navList[this.tabCurrentIndex].requestData.state,
                    page: this.navList[this.tabCurrentIndex].requestData.page,
                    limit: this.navList[this.tabCurrentIndex].requestData.limit,
                }
                /*
                await this.$minApi.orderList(requestData).then(res => {
                    console.log("每次页面打开就要从新请求数据",res)
                    if (res.code === 200) {

                        if (this.navList[this.tabCurrentIndex].requestData.page === 1){
                            this.navList[this.tabCurrentIndex].list = res.data
                        } else {
                            this.navList[this.tabCurrentIndex].list.push(...res.data)
                        }

                        if (res.data.length <  this.navList[this.tabCurrentIndex].requestData.limit) {
                            this.navList[this.tabCurrentIndex].requestData.loadingType = 'noMore'
                        } else {
                            this.navList[this.tabCurrentIndex].requestData.loadingType = 'more'
                        }

                    }
                })

                 */
            },
        },
        components:{

        },
        computed:{

        },

    }
</script>

<style scoped lang="scss">
    .navbar{
        position: fixed;
        top: 0;
        /* #ifdef H5 */
        top: var(--window-top);
        /* #endif */
        left: 0;
        display: flex;
        height: 40px;
        padding: 0 5px;
        background: #fff;
        box-shadow: 0 1px 5px rgba(0,0,0,.06);
        z-index: 10;
        width: 100%;
        text-align: center;
        white-space: nowrap;
        .nav-item{
            background: #FFFFFF;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            font-size: 15px;
            color: $color-primary-plain;
            position: relative;
            padding: 0 20upx;
            &.current{
                color: $color-primary;
                &:after{
                    content: '';
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    transform: translateX(-50%);
                    width: 44px;
                    height: 0;
                    border-bottom: 1px solid $color-primary;
                }
            }
        }
    }
    .my-block{
        width: 100%;
        height: 40px;
    }
    .card-list{
        display: flex;
        flex-direction: column;
        padding: $uni-spacing-row-base;
        .item{
            height: 298upx;
            border-radius: 10upx;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: relative;
            overflow: hidden;
            margin: 16upx 0;
            .flag{
                position: absolute;
                top: -20upx;
                right: 20upx;
                width: 110upx;
                height: 110upx;
                border-radius: 50%;
            }
            &.year{
                background-image: url(./images/year-card.png);
            }
            &.month{
                background-image: url(./images/month-card.png);
            }
            &.secondary{
                background-image: url(./images/secondary-card.png);
            }
            &.expired{
                background-image: url(./images/expired-card.png);
            }
            display: flex;
            flex-direction: column;
            .item-header{
                font-size: $uni-font-size-base;
                height:166upx;
                padding: 30upx 40upx 44upx 30upx;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .header-title{
                    color: #FFFFFF;
                }
                .header-body{
                    color: #FFFFFF;
                    font-size: $uni-font-size-sm;
                    display: flex;
                    flex-direction: column;
                    .header-body-top,.header-body-bottom{
                        display: flex;
                        justify-content: space-between;
                        span{
                            @extend %overflow-1-line;
                            width: 48%;
                            &:last-child{
                                text-align: right;
                            }
                        }
                    }
                    .header-body-top{
                        margin-bottom: 20upx;
                    }
                }
            }
            .item-footer{
                line-height: 58upx;
                height:58upx;
                display: flex;
                justify-content: space-between;
                font-size: $uni-font-size-base;
                padding: 0 40upx;
                .time{
                    color: #999999;
                }
                .status{
                    color: #999999;
                }
            }
        }
    }

    .footer{
        color: #999999;
        font-size: $uni-font-size-sm;
        padding: 32upx;
        text-align: center;
    }
</style>
