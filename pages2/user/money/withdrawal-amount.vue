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
                <div class="btn" @click="open">申请提现</div>
            </div>
            <img src="./images/cloud.png" alt="" class="footer-img">
        </div>

        <div class="tabs-btn">
            <div class="box" style="border:1px solid rgba(255,72,96,1);color: #FC5A5A;">

                <div class="item" :class="{'active tabs-btn-active' : choosesWho === 1 }" @click="choosesWho = 1" >收益明细</div>
                <div class="item" :class="{'active tabs-btn-active' : choosesWho === 2 }" @click="choosesWho = 2">提现明细</div>
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
                        <div class="sub_price">申请失败</div>
                    </div>
            </div>
            <div class="item">
                <div>
                    <div class="title">申请提现</div>
                    <div class="sub-title">2019-11-11 11:11:11</div>
                </div>
                <div>
                    <div class="price">100.00</div>
                    <div class="sub_price">申请中</div>
                </div>
            </div>
            <div class="item">
                <div>
                    <div class="title">申请提现</div>
                    <div class="sub-title">2019-11-11 11:11:11</div>
                </div>
                <div>
                    <div class="price">100.00</div>
                    <div class="sub_price">申请失败</div>
                </div>
            </div>
        </div>

        <uni-load-more :status="moreStatus" :show-icon="true"></uni-load-more>

        <!-- 申请提现弹框 输入提现金额 -->
        <uni-popup ref="getMoneyToWx" type="center" :custom="true">
            <view class="active-time-money">
                <view class="box">
                    <view class="title">
                        请输入提现金额，要求最低提现10元哦
                    </view>
                    <view class="input-box">
                        <input type="number" class="input" focus placeholder="最低提现10元"  v-model="money" style=" border: 1px solid #FC5A5A; width: 100%;border-radius: 3px;"/>
                    </view>
                    <view class="footer">
                        <view class="btn" @click="close" style="background: #999;">取消</view>
                        <view class="btn" @click="getMoney">提现</view>
                    </view>
                </view>
            </view>
        </uni-popup>
    </div>
</template>

<script>
    import uniPopup from '@/components/uni-popup/uni-popup.vue'
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）

    export default {
        name: "available-balance", // 可提现金额
        data(){
          return {
              moreStatus: 'more',
              choosesWho:1, // 1收益明细  ,2提现明细
              money: '', // 提现金额
          }
        },
        onLoad(){
          console.log('其他页面带过来的参数：', this.$parseURL())
            if (this.$parseURL().choosesWho){
                this.choosesWho = this.$parseURL().choosesWho
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
            // 打开 提现 弹框
            open(){
                this.$refs.getMoneyToWx.open()
            },
            close(){
                this.$refs.getMoneyToWx.close()
            },
            async getMoney(){
                if (this.money === ''){
                    this.close()
                    this.msg('请输入提现金额')
                    return
                }
                if (parseFloat(this.money) > parseFloat(this.userInfo.out_money)){
                    this.close()
                    this.msg('申请提现金额大于可提现金额')
                    return
                }
                let data  = {
                    money: this.money
                }
                await this.$minApi.applyMoney(data).then(res => {
                    if (res.code === 200) {
                        this.close()
                        this.msg('申请成功')
                    }
                })
                this.close()
            },
        },
        components:{
            uniLoadMore,
            uniPopup,
        },
    }
</script>

<style scoped lang="scss">
    @import "css/style";
    @import "css/alert";
    .banner-image{
        background-image:linear-gradient(90deg,rgba(255,111,137,1),rgba(255,72,96,1));
    }
    .tabs-btn-active{
        background-image:linear-gradient(90deg,rgba(255,111,137,1),rgba(255,72,96,1))!important;
    }
</style>
