<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <div class="banner banner-image">
            <div class="banner-money-box">
                <div class="box-money">总金额：￥{{responseData.total_amount || 0}}</div>
            </div>
            <div class="footer-time">
                {{responseData.expires_tips}}
            </div>
            <img src="../../../pages2/user/money/images/cloud.png" alt="" class="footer-img">
        </div>

        <div class="record-box-title">
            使用记录
            <span style="font-size: 20upx;">（已使用：￥{{responseData.used_amount}}）</span>
        </div>
        <div class="record-box">
            <div class="item" v-for="(item,index) in responseData.list.data" :key="index">
                <div>
                    <div class="title">{{item.sn}}</div>
                    <div class="sub-title">{{item.create_time}}</div>
                </div>
                <div>
                    <div class="price">{{item.type}}{{item.discount_price}}</div>
                </div>
            </div>
        </div>

        <uni-load-more :status="requestData.moreStatus" :show-icon="true"></uni-load-more>


        <div class="xuanfu-log" @click="_goPage('discount_coupon')">
            <img class="img" src="http://picture.ddxm661.com/7f343202003171535236962.png" alt="">
        </div>
    </div>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）

    export default {
        data() {
            return {
                requestData: {
                    page: 1,
                    moreStatus: 'loading'
                },
                responseData: {
                    list: {
                        total: 0,
                        per_page: 10,
                        current_page: 1,
                        last_page: 1,
                        data: [
                            // {
                            //     remain_price: "185.02",
                            //     create_time: "2020-03-17 16:31",//使用时间
                            //     discount_price: "7.49",//使用金额
                            //     type: "使用",//使用、退会
                            //     sn: "WM20200317975310018766"//单号
                            // }
                        ]
                    },
                    total_amount: "",//总金额
                    used_amount: '',//已使用金额
                    expires_tips: ""//过期提示
                }
            }
        },
        onLoad(){
          this.loadData();
        },
        methods: {
            _goPage(url, query = {}) {
                this.$openPage({
                    name: url,
                    query
                })
            },
            // 返回按钮
            _goBack() {
                if (getCurrentPages().length === 1) {
                    this._goPage('home')
                } else {
                    uni.navigateBack()
                }
            },
            loadData(){
                this.requestData.moreStatus = 'loading';
                const requestData = {
                  page: this.requestData.page
                }
                this.$minApi.getRechargeFlow(requestData).then(res => {
                  if (res.code === 200){
                      if (requestData.page === 1) {
                          this.responseData = res.data
                      } else {
                          this.responseData.list.data.push(...res.data.list.data)
                      }
                      if (requestData.page === res.data.list.last_page || res.data.list.total === 0) {
                          this.requestData.moreStatus = 'noMore'
                      } else {
                          this.requestData.moreStatus = 'more'
                      }
                  }
                }).catch(err => {
                  this.requestData.moreStatus = 'noMore'
                })
            },
        },
        onReachBottom(){
          if (this.requestData.moreStatus === 'noMore') {
              return;
          }
          this.requestData.page ++;
          this.loadData();
        },
        components:{
            uniLoadMore,
        },

    }
</script>

<style scoped lang="scss">
    #my-h5-back{
        position: fixed;
    }

    .banner{
        width: 100%;
        height:388upx;
        background-color: #FFFFFF;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .banner-money-box{
            margin: 20upx;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            color: #FFFFFF;
            .box-money{
                font-size: $uni-font-size-lg * 2;
            }
        }
        .footer-time{
            margin: 20upx;
            font-size: $uni-font-size-base;
            color: #333333;
            text-align: center;
            display: flex;
            justify-content: center;
            .btn{
                background: #FFFFFF;
                width:186upx;
                text-align: center;
                height: 54upx;
                line-height: 54upx;
                border-radius: 4upx;
            }
        }
        .footer-img{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
        }
    }
    .banner-image{
        background-image:linear-gradient(90deg,rgba(122,196,255,1),rgba(57,149,255,1));
    }

    .record-box-title{
        color: #333333;
        padding: $uni-spacing-row-base;
    }
    /* 使用记录 充值记录 …… */
    .record-box{
        background: #FFFFFF;
        width: 100%;
        .item{
            font-size: $uni-font-size-base;
            color: $color-primary-plain;
            padding: 20upx $uni-spacing-row-base;
            display: flex;
            justify-content: space-between;
            @extend %border-color-solid-botton;
            &:last-child{
                border: none;
            }
            .title{
                margin: 10upx 0;
            }
            .sub-title{
                margin: 10upx 0;
                font-size: $uni-font-size-sm;
                color: #808080;
            }
            .price{
                margin: 10upx 0;
            }
            .sub-price{
                margin: 10upx 0;
                font-size: $uni-font-size-sm;
                color: #808080;
                &.on{
                    color: $color-primary-plain;
                }
            }
        }
    }


    /* 悬浮logo */
    .xuanfu-log{
        position: fixed;
        bottom: 100upx;
        right: 60upx;
        .img{
            width: 144upx;
            height: 118upx;
        }
    }
</style>
