<template>
   <view class="container">
      <!-- #ifdef H5 -->
      <div id="my-h5-back" @click="_goBack"></div>
      <!-- #endif -->

      <view class="banner">
         <img src="../../static/images/tab-group.png" style="width: 100%;">
      </view>
      <view class="group-buy">

         <view class="item" v-for="(item, index) in groupBuyList" :key="index" @click="_goPage('group_buy_detail', {assemble_id: item.id, item_id: item.item_id})">
            <view class="left">
               <image :src="item.pic" class="img"></image>
            </view>
            <view class="right">
                  <view class="top">
                     <view class="title">
                        {{item.item_name}}
                     </view>
                     <view class="specifications">
                     <!-- 规格：X 红色-->
                     </view>
                  </view>
                  <view class="bottom">
                     <view class="num">
                        <view class="show-people">
                           {{item.assemble_num}}人团
                        </view>
                        <view class="show-num" v-if="item.status === 1">
                           已拼{{item.already_num}}件
                        </view>
                     </view>
                     <view class="money-btn">
                        <view class="money">
                           <view class="new-money">￥{{item.price}}</view>
                           <view class="old-money">￥{{item.old_price}}</view>
                        </view>
                        <view>
                           <view class="btn">
                              去拼团
                           </view>
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
      .group-buy{
         padding: $uni-spacing-row-base;
         display: flex;
         flex-direction: column;
         justify-content: center;
         .item{
            margin-top: 24upx;
            padding: 20upx;
            width:100%;
            height:auto;
            background: #fff;
            box-shadow:0px 0px 20px 0px rgba(183,183,183,0.3);
            border-radius:4upx;
            display: flex;
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
                  }
                  .specifications{
                     @extend %overflow-2-line;
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
                     justify-content: space-between;
                     .show-people{
                        font-size: 20upx;
                        color: $color-primary;
                        padding: 2upx 8upx;
                        border: 1px solid $color-primary;
                        border-radius: 4upx;
                     }
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
