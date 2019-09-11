<template>
   <view class="container">
      <view class="group-buy">
         <view class="item">
            <view class="left">
               <image src="../../static/images/goods.jpg" class="img"></image>
            </view>
            <view class="right">
                  <view class="top">
                     <view class="title">
                        我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题
                     </view>
                     <view class="specifications">
                        规格：X 红色
                     </view>
                  </view>
                  <view class="bottom">
                     <view class="num">
                        <view>
                           <view class="show-num">
                              已拼460件
                           </view>
                        </view>
                     </view>
                     <view class="money-btn">
                        <view class="money">
                           <view class="new-money">￥59</view>
                           <view class="old-money">￥210</view>
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
         <view class="item">
            <view class="left">
               <image src="../../static/images/goods.jpg" class="img"></image>
            </view>
            <view class="right">
               <view class="top">
                  <view class="title">
                     我是商品标
                  </view>
                  <view class="specifications">
                     规格：X 红色
                  </view>
               </view>
               <view class="bottom">
                  <view class="num">
                     <view>
                        <view class="show-num">
                           已拼460件
                        </view>
                     </view>
                  </view>
                  <view class="money-btn">
                     <view class="money">
                        <view class="new-money">￥59</view>
                        <view class="old-money">￥210</view>
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
      <uni-load-more :status="tabList[TabCur].requestData.moreStatus" :show-icon="true"></uni-load-more>
   </view>
</template>

<script>
   import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）

    export default {
        name: "group-buy",
        data(){
          return {
             moreStatus: 'loading',
          }
        },
        methods:{

        },
       components:{
          uniLoadMore,
       }

    }
</script>

<style lang="scss">
   .container{
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
            box-shadow:0upx 0upx 10upx 0upx #B7B7B7;
            border-radius:8upx;
            display: flex;
            justify-content: space-between;
            .left{
               width: 188upx;
               height: 188upx;
               .img{
                  border-radius:10upx;
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
                     flex-direction: row;
                     justify-content: flex-end;
                     .show-num{
                        width:118upx;
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
