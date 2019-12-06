<template>
   <view class="container">
      <!-- #ifdef H5 -->
      <div id="my-h5-back" @click="_goBack"></div>
      <!-- #endif -->

      <view class="banner">
         <img src="../../static/images/tab-group.png" style="width: 100%;">
      </view>

      <view class="spike-list-content">
         <view class="spike-list-content-box" v-for="(item, index) in groupBuyList" :key="index" @click="_goPage('group_buy_detail', {assemble_id: item.id, item_id: item.item_id})">
            <view class="left">
               <image :src="item.pic" class="img" :lazy-load="true"></image>
               <view class="flag">{{item.assemble_num}}人团</view>
            </view>
            <view class="right">
               <view class="top">
                  <view class="title">
                     {{item.item_name}}
                  </view>
                  <view class="specifications" v-if="item.status === 1">
                     已拼{{item.already_num}}件
                  </view>
               </view>
               <view class="bottom">
                  <view class="left-info">
                     <span class="price">￥{{item.price}}</span>
                     <span class="old-price">￥{{item.old_price}}</span>
                  </view>
                  <view class="right-info" v-show="item.status === 1 && item.is_over === 1">
                     <view class="btn on">去拼团</view>
                     <view class="tips-time">
                        <text class="text">距结束</text>
                        <block v-if="item.timer.d">{{item.timer.d}}天</block> {{item.timer.h}}:{{item.timer.m}}:{{item.timer.s}}
                     </view>
                  </view>
                  <view class="right-info" v-show="item.status === 1 && item.is_over === 2">
                     <view class="btn over">已拼完</view>
                     <view class="tips-time" style="opacity: 0;">
                        <text class="text">已拼完</text>
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
                  <view class="right-info" v-show="item.status === 3">
                     <view class="btn over">拼团结束</view>
                     <view class="tips-time" style="opacity: 0;">
                        <text class="text">拼团结束</text>
                        0天00:00:00
                     </view>
                  </view>
               </view>
            </view>
         </view>
      </view>
      <uni-load-more :status="requestData.moreStatus" :show-icon="true" color="#fff"></uni-load-more>
   </view>
</template>

<script>
   import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
   import * as Constant from '../../utils/constant'
   import { mapState } from 'vuex'
   let myTimer = null  //计时器，控制开关

    export default {
        name: "group-buy", // list 拼团列表
        data(){
          return {
             requestData:{
                moreStatus: 'loading',
                page: 1,
                limit: 10,
             },
             groupBuyList: [
                // {
                //    id: 5,    //拼团活动id
                //    title: "拼团",    //标签，拼团没用
                //    start_time: 1573747200,   //开始时间
                //    end_time: 1575043200,     //结束时间
                //    item_id: 2440,        //商品id
                //    item_name: "DQB小众童装2019秋季新品男女童装卫衣潮牌印花套头长袖刺绣卫衣", //商品名称
                //    old_price: "199.00",  //原价
                //    price: "10.00",   //现价
                //    already_num: 0,   //已抢数量
                //    assemble_num: 3,
                //    residue_num: -1,  //剩余可抢数量，-1不限制
                //    stock: -1,        //总共限制可买数量，暂时没用
                //    status: 1,        //状态：1正在拼团，2即将开始
                //    now_time: 1573886249, //服务器当前时间
                //    is_over: 1,   //是否已拼完
                //    pic: "http://picture.ddxm661.com/ad4df2019110916303286.jpg"   //商品图片
                // },
             ],
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
          let url = Constant[Constant.NODE_ENV].groupBuyList // 分享地址
          // 如果用户登录了，把自己的唯一id也分享出去
          if(this.userInfo.id) {
             url += `?user_id=${this.userInfo.id}`
          }
         await this._assembleList()
          this.$nextTick(()=>{
             if (this.groupBuyList.length){
                // 10个人的组团倒计时
                myTimer = setInterval(() => {
                   this.groupBuyList[0].now_time ++
                   this.timeStrChange()
                }, 1000);//设置定时器 每一秒执行一次
             }
             let param1 = {
                        title: `捣蛋熊商城-今日必团`, // 分享标题
                        desc: `拼团狂欢，嗨翻抢！`, // 分享描述
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: `${window.location.origin}/h5/static/images/share-group-banner.jpg`, // 分享图标
                        success: function () {}
                     },
                     param2 = {
                        title: `捣蛋熊商城-今日必团。拼团狂欢，嗨翻抢！`, // 分享标题
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: `${window.location.origin}/h5/static/images/share-group-banner.jpg`, // 分享图标
                        success: function () {}
                     }
             this.wxConigShareGoods(param1, param2)
          })
       },
        methods:{
           _goPage(url = '', query = {}){
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
           async _assembleList(){
              this.requestData.moreStatus = 'loading'
              let data = {
                 page: this.requestData.page,
                 limit: this.requestData.limit,
              }
              await this.$minApi.getAssembleList(data).then(res => {
                 console.log("拼团商品列表",res)
                 if (res.code === 200) {
                    res.data.map(goods => {
                       goods.timer = {
                          d: 0,
                          h: '00',
                          m: '00',
                          s: '00',
                       }
                    })
                    if (data.page === 1) {
                       this.groupBuyList = res.data
                    } else {
                       this.groupBuyList.push(...res.data)
                    }
                    if (res.data.length <  data.limit) {
                       this.requestData.moreStatus = 'noMore'
                    } else {
                       this.requestData.moreStatus = 'more'
                    }
                 }
              })
           },
           // 倒计时 多个商品
           timeStrChange(){
              this.groupBuyList.map((item,index)=> {
                 let time_distance = 0
                 if (item.status === 1) {  // 正在秒杀
                    time_distance = item.end_time * 1000 - this.groupBuyList[0].now_time * 1000;
                    if (time_distance <= 0) { //秒杀已结束
                       item.status = 3
                    }
                 } else if (item.status === 2){  // 未开始
                    time_distance = item.start_time * 1000 - this.groupBuyList[0].now_time * 1000;
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
        },
       onUnload(){
          clearInterval(myTimer)
          myTimer = null
       },
       async onReachBottom() {
          if (this.requestData.moreStatus === 'noMore') {
             return
          }
          this.requestData.page ++
          await this._assembleList()
       },
       components:{
          uniLoadMore,
       }

    }
</script>

<style scoped lang="scss">
   page {
      background: rgba(255,175,48,1);
   }
   .container{
      background:linear-gradient(180deg,rgba(255,27,40,1) 0%,rgba(255,175,48,1) 100%);

      .spike-list-content{
            padding: 0 $uni-spacing-row-sm;
            .spike-list-content-box{
               background: #FFFFFF;
               border-radius:4upx;
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
                  position: relative;
                  .flag{
                     background: #FFFFFF;
                     position: absolute;
                     left: 0;
                     bottom: 0;
                     padding: 0 14upx;
                     line-height: 30upx;
                     font-size: 20upx;
                     color: $color-primary;
                     border:1px solid $color-primary;
                     border-radius:4upx;
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
                           line-height: 44upx;
                           text-align: center;
                           border-radius:22upx;
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
