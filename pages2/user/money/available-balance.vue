<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <div class="banner banner-image">
            <div class="banner-money-box">
                <span class="fh">￥</span>
                <div class="box-money">451.18</div>
            </div>
            <div class="footer-time">
               <div class="btn" @click="_goPage('user_recharge')">立即充值</div>
            </div>
            <img src="./images/cloud.png" alt="" class="footer-img">
        </div>

        <div class="tabs-btn">
            <div class="box">
                <div class="item" :class="{'active' : choosesWho === 1 }" @click="choosesWho = 1">使用明细</div>
                <div class="item" :class="{'active' : choosesWho === 2 }" @click="choosesWho = 2">充值明细</div>
            </div>
        </div>

        <div class="record-box">
            <div class="item">
                <div>
                    <div class="title">申请提现</div>
                    <div class="sub-title">2019-11-11 11:11:11</div>
                </div>
                <div>
                    <div class="price">100.00</div>
                </div>
            </div>
            <div class="item">
                <div>
                    <div class="title">申请提现</div>
                    <div class="sub-title">2019-11-11 11:11:11</div>
                </div>
                <div>
                    <div class="price">100.00</div>
                </div>
            </div>
            <div class="item">
                <div>
                    <div class="title">申请提现</div>
                    <div class="sub-title">2019-11-11 11:11:11</div>
                </div>
                <div>
                    <div class="price">100.00</div>
                </div>
            </div>
        </div>

        <uni-load-more :status="moreStatus" :show-icon="true"></uni-load-more>
    </div>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）

    export default {
        name: "available-balance", // 可用金额
        data(){
          return {
                moreStatus: 'more',
                choosesWho: 1, //1 使用明细 2 充值明细
          }
        },
        methods:{
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            // 返回按钮
            _goBack() {
                uni.navigateBack()
            },
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
