<template>
    <view>
        <div class="box">
            <div class="item red" @click="_goPage('user_withdrawal_amount')">
                <div class="header">
                    <div class="title">可提现金额</div>
                    <div class="money">{{userInfo.out_money | moneyToFixed}}元</div>
                </div>
                <div class="footer">
                    <div class="time"></div>
                    <div class="btn" @click.stop="open">提现</div>
                </div>
            </div>
            <div class="item yellow" @click="_goPage('user_available-balance')">
                <div class="header">
                    <div class="title">可用金额</div>
                    <div class="money">{{userInfo.money | moneyToFixed}}元</div>
                </div>
                <div class="footer">
                    <div class="time"></div>
                    <div class="btn" @click="_goPage('user_recharge')">充值</div>
                </div>
            </div>

            <div class="item blue" v-for="(item, index) in userInfo.expireList" :key="index" @click="_goPage('user_time_money', {money: item})">
                <div class="header">
                    <div class="title">限时金额</div>
                    <div class="money">{{item.price | moneyToFixed }}元</div>
                </div>
                <div class="footer">
                    <div class="time">
                        <block v-show="item.status === 1">过期时间：{{item.expire_time}}</block>
                    </div>
                    <div class="btn" v-show="item.status === 0" @click.stop="openActiveTimeMoney">激活</div>
                </div>
            </div>

            <!--
            <div class="item blue">
                <div class="header">
                    <div class="title">限时金额</div>
                    <div class="money">3000.99元</div>
                </div>
                <div class="footer">
                    <div class="time"></div>
                    <div class="btn">激活</div>
                </div>
            </div>
            <div class="item grey expired">
                <div class="header">
                    <div class="title">限时金额</div>
                    <div class="money">3000.99元</div>
                </div>
                <div class="footer">
                    <div class="time">过期时间：2019-11-12 12:50:20</div>
                </div>
                <div class="expired-img"></div>
            </div>
            --->

            <uni-load-more status="more" :show-icon="true"></uni-load-more>
        </div>

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

        <!-- 限时余额激活弹框 -->
        <uni-popup ref="activeTimeMoney" type="center" :custom="true">
            <view class="active-time-money">
                <view class="box">
                    <view class="title">
                        为了您的账户信息安全，请验证{{userInfo.mobile | filterMobile}}的验证码
                    </view>
                    <view class="input-box">
                        <input type="number" class="input" focus placeholder="请输入验证码" />
                        <view class="btn">获取验证码</view>
                    </view>
                    <view class="footer">
                        <view class="btn" @click="closeActiveTimeMoney" style="background: #999;">取消</view>
                        <view class="btn">激活</view>
                    </view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import { mapState } from 'vuex'
    import uniPopup from '@/components/uni-popup/uni-popup.vue'
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）

    export default {
        name: "user_money", // 钱包
        data(){
            return{
                money: '',
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
            open(){
                this.$refs.getMoneyToWx.open()
            },
            close(){
                this.$refs.getMoneyToWx.close()
            },
            openActiveTimeMoney(){
                this.$refs.activeTimeMoney.open()
            },
            closeActiveTimeMoney(){
                this.$refs.activeTimeMoney.close()
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
        computed: {
            ...mapState(['userInfo'])
        },
        components: {
            uniPopup,
            uniLoadMore,
        }
    }
</script>

<style lang="scss" scoped>
    @import "money/css/alert";
    .box{
        padding: $uni-spacing-row-base;
        display: flex;
        flex-direction: column;
        .item{
            height: 250upx;
            font-size: $uni-font-size-lg;
            color: #FFFFFF;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: $uni-spacing-row-lg;
            border-radius:10upx;
            background-image:linear-gradient(90deg,rgba(255,111,137,1),rgba(255,72,96,1));
            background-repeat: no-repeat;
            /*background-size: cover;*/
            background-size: 100% 100%;
            overflow: hidden;
            &.red{
                background-image: url(./money/images/money-red.png);
            }
            &.yellow{
                background-image: url(./money/images/money-yellow.png);
            }
            &.blue{
                background-image: url(./money/images/money-blue.png);
            }
            &.grey{
                background-image: url(./money/images/money-grey.png);
            }
            position: relative;
            &.expired{
                opacity: 0.8;
                color: #333333;
            }
            .expired-img{
                width:160upx;
                height:160upx;
                background-repeat: no-repeat;
                background-size: cover;
                background-image: url(./money/images/money-expired.png);
                position: absolute;
                left: 50%;
                top: 50%;
                margin: -100upx 0 0 -80upx;
            }


            .header{
                display: flex;
                justify-content: space-between;
            }
            .footer{
                margin-bottom: 60upx;
                display: flex;
                justify-content: space-between;
                .time{
                    font-size: $uni-font-size-base;
                    color: #333333;
                }
                .btn{
                    background: #FFFFFF;
                    font-size:  $uni-font-size-sm;
                    color: #333333;
                    border-radius: 4upx;
                    padding: 4upx 16upx;
                }
            }
        }
    }
</style>
