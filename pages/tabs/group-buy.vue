<template>
   <view class="container">
      <view class="group-buy">

         <view class="item" v-for="(item, index) in groupBuyList" :key="index" @click="_goPage('group_buy_detail', {id: item.id})">
            <view class="left">
               <image :src="item.pic" class="img"></image>
            </view>
            <view class="right">
                  <view class="top">
                     <view class="title">
                        {{item.title}}
                     </view>
                     <view class="specifications">
                     <!-- 规格：X 红色-->
                     </view>
                  </view>
                  <view class="bottom">
                     <view class="num">
                        <view>
                           <view class="show-num">
                              已拼{{item.assemble_num}}件
                           </view>
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
      <uni-load-more :status="moreStatus" :show-icon="true"></uni-load-more>
   </view>
</template>

<script>
   import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）

    export default {
        name: "group-buy",
        data(){
          return {
             moreStatus: 'loading',
             requestData:{
                page: 1,
                limit: 10,
             },
             groupBuyList: [
               //  {
               //     id: 8,    //拼团活动id
               //     pic: "http://picture.ddxm661.com/6dae4201909051617308036.jpg",    //图片
               //     title: "奶粉罐装",    //标题
               //     old_price: "90.00",   //原价
               //     price: "80.00",       //拼团价
               //     assemble_num: 0,       //已成功拼团人数
               //     people_num: 50,   //开团人数
               // }
             ],
          }
        },
       async onLoad(){
         await this._assembleList()
       },
        methods:{
           _goPage(url = '', query = {}){
              this.$openPage({name:url, query})
           },
           async _assembleList(){
              this.moreStatus = 'loading'
              let data = {
                 page: this.requestData.page,
                 limit: this.requestData.limit,
              }
              await this.$minApi.assembleList(data).then(res => {
                 console.log("拼团商品列表",res)
                 if (res.code === 200) {
                    if (data.page === 1) {
                       this.groupBuyList = res.data
                    } else {
                       this.groupBuyList.push(...res.data)
                    }
                    if (res.data.length <  this.requestData.limit) {
                       this.moreStatus = 'noMore'
                    } else {
                       this.moreStatus = 'more'
                    }
                 }
              })
           },
        },
       async onReachBottom() {
          if (this.moreStatus === 'noMore') {
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
            box-shadow:0px 0px 20px 0px rgba(183,183,183,0.3);
            border-radius:8upx;
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
