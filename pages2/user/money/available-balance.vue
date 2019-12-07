<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <div class="banner banner-image">
            <div class="banner-money-box">
                <span class="fh">￥</span>
                <div class="box-money">{{userInfo.money}}</div>
            </div>
            <div class="footer-time">
               <div class="btn" @click="_goPage('user_recharge')">立即充值</div>
            </div>
            <img src="./images/cloud.png" alt="" class="footer-img">
        </div>

        <div class="tabs-btn">
            <div class="box">
                <div class="item" :class="{'active' : choosesWho === 1 }" @click="changeNum(1)">使用明细</div>
                <div class="item" :class="{'active' : choosesWho === 2 }" @click="changeNum(2)">充值明细</div>
            </div>
        </div>

        <div class="record-box">
            <div class="item" v-for="(item,index) in logList" :key="index">
                <div>
                    <div class="title">{{item.title}}</div>
                    <div class="sub-title">{{item.time}}</div>
                </div>
                <div>
                    <div class="price">{{item.price}}</div>
                </div>
            </div>
        </div>

        <uni-load-more :status="haveMore?'more':'nomore'" :show-icon="true"></uni-load-more>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）

    export default {
        name: "available-balance", // 可用金额
        data(){
          return {
                moreStatus: 'more',
                choosesWho: 1, //1 使用明细 2 充值明细
                logList:[], //记录列表
                requestData:{
                  page:1,
                  limit:10
              }
          }
        },

        onLoad(){
            this._getMoney();
        },

        onReachBottom(){
            if (this.requestData.loadStatus === 'noMore') {
                return
            }
            this.requestData.page++
            this._getMoney();
        },

        methods:{
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            // 返回按钮
            _goBack() {
                uni.navigateBack()
            },

            changeNum(num){
                this.choosesWho=num;
                this._getMoney();
            },

            //请求封装
            _getMoney(){
                this.moreStatus = 'loading'
                let requestData = {
                    type:this.choosesWho,
                    page: this.requestData.page,
                    limit: this.requestData.limit
                }
                this.$minApi.getMoney(requestData).then(res=>{
                    if(res.code === 200){
                        if (requestData.page === 1) {
                            this.logList = res.data
                        } else {
                            this.logList.push(...res.data)
                        }
                        if (res.data.length < requestData.limit){
                            this.moreStatus = 'noMore'
                        } else {
                            this.moreStatus = 'more'
                        }
                    }
                })
            }
        },
        computed:{
            ...mapState(['userInfo'])
        },
        components:{
            uniLoadMore,
        },
    }
</script>

<style scoped lang="scss">
    @import "css/style";
    .banner-image{
        background-image:linear-gradient(90deg,rgba(255,187,21,1),rgba(255,140,31,1));
    }
</style>
