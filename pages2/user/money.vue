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
                    <div class="money">{{userInfo.usable_money | moneyToFixed}}元</div>
                </div>
                <div class="footer">
                    <div class="time"></div>
                    <div class="btn" @click.stop="_goPage('user_recharge')">充值</div>
                </div>
            </div>

            <div class="item"
                 v-for="(item, index) in expireList" :key="index"
                 @click="_goPage('user_time_money',item)"
                :class="item.status==2?'grey expired':'blue'">
                <div class="header">
                    <div class="title">限时金额</div>
                    <div class="money">{{item.price | moneyToFixed }}元</div>
                </div>
                <div class="footer">
                    <div class="time">
                        <block v-show="item.status === 1"><text>{{item.status==0?'':'过期时间：'}}</text>{{item.expire_time}}</block>
                    </div>
                    <div class="btn" v-show="item.status === 0" @click.stop="openActiveTimeMoney(item)">激活</div>
                </div>
                <div class="expired-img" v-if="item.status==2"></div>
            </div>

            <uni-load-more :status="requestData.loadStatus" :show-icon="true"></uni-load-more>
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
                        <input type="number" class="input" focus placeholder="请输入验证码"  v-model="code"/>
                        <view class="btn" @click.stop="getCode">获取验证码</view>
                    </view>
                    <view class="footer">
                        <view class="btn" @click="closeActiveTimeMoney" style="background: #999;">取消</view>
                        <view class="btn" @click="activeTimeMoney">激活</view>
                    </view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import uniPopup from '@/components/uni-popup/uni-popup.vue'
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）

    export default {
        name: "user_money", // 钱包
        data(){
            return{
                money: '',
                expireList:[],
                requestData:{
                    page:1,//初始页码为1
                    limit:10,
                    loadStatus: 'noMore'//状态
                },
                code: '',// 激活限时余额 验证码
                tempActiveTimeMoney:null, //激活限时余额中间参数
            }
        },
        onShow(){
          this.requestData.page = 1
            this._getExpireList()
        },
        onReachBottom(){
            if (this.requestData.loadStatus === 'noMore') {
                return
            }
            this.requestData.page ++
            this._getExpireList()
        },
        methods:{
            ...mapActions(['asyncGetUserInfo']),
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
            openActiveTimeMoney(item){
                console.log(item)
                this.tempActiveTimeMoney = item
                this.$refs.activeTimeMoney.open()
            },
            closeActiveTimeMoney(){
                this.$refs.activeTimeMoney.close()
            },
            /**
             * 申请提现
             * @returns {Promise<void>}
             */
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
                        this.money = ''
                        this.msg('申请成功')
                        this.asyncGetUserInfo()
                    }
                }).catch(err => {
                    this.close()
                })
            },

            /**
             * 激活限时余额
             */
            async getCode(){
                await this.$minApi.loginSendCode({
                    mobile: this.userInfo.mobile,
                    agreement: 1
                }).then(res => {
                    if (res.code === 200) {
                        this.msg("发送成功")
                    }
                })
            },
            activeTimeMoney(){
                let requestData = {
                    id: this.tempActiveTimeMoney.id,
                    code: this.code,
                    mobile: this.userInfo.mobile,
                }
                this.$minApi.activeTimeMoney(requestData).then(res => {
                    if (res.code === 200){
                        this.code = ''
                        this.closeActiveTimeMoney()
                        this.msg(res.msg)
                        this.requestData.page = 1
                        this._getExpireList()
                    } else {
                        this.code = ''
                        this.closeActiveTimeMoney()
                        this.msg('验证码有误')
                    }
                }).catch(err => {
                    this.code = ''
                    this.closeActiveTimeMoney()
                    this.msg('服务器繁忙，请稍后重试！')
                })
            },
            // 限时余额接口封装
            _getExpireList(){
                this.requestData.loadStatus = 'loading'
                let requestData = {
                    page: this.requestData.page,
                    limit: this.requestData.limit
                }
                this.$minApi.getExpireList(requestData).then(res=>{
                    if(res.code===200){
                        if (requestData.page === 1) {
                            this.expireList = res.data
                        } else {
                            this.expireList.push(...res.data)
                        }
                        if (res.data.length < requestData.limit){
                            this.requestData.loadStatus = 'noMore'
                        } else {
                            this.requestData.loadStatus = 'more'
                        }
                    }
                }).catch(err=>{
                    this.requestData.loadStatus = 'noMore'
                })
            }
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
            margin-bottom: 40upx;
            height: 212upx;
            font-size: $uni-font-size-lg;
            color: #FFFFFF;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 0 $uni-spacing-row-lg;
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
                width:120upx;
                height:120upx;
                background-repeat: no-repeat;
                background-size: cover;
                background-image: url(./money/images/money-expired.png);
                position: absolute;
                left: 551upx;
                top: 78upx;
            }


            .header{
                display: flex;
                justify-content: space-between;
            }
            .footer{
                display: flex;
                justify-content: space-between;
                .time{
                    font-size: $uni-font-size-base;
                    color: #333333;
                }
                .btn{
                    width: 126upx;
                    line-height: 48upx;
                    text-align: center;
                    background: #FFFFFF;
                    font-size:  $uni-font-size-base;
                    color: #333333;
                    border-radius: 4upx;
                }
            }
        }
    }
</style>
