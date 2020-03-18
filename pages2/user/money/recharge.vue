<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->
        <div class="my-money">
            <div class="my-money-money">
                <div class="my-money-title">
                    我的余额
                </div>
                <div class="my-money-num">
                    ￥{{userInfo.money | moneyToFixed}}
                </div>
            </div>

            <div class="money-input-box">
                <div class="title">
                    充值方式：微信支付
                </div>
                <div class="box">
                    <div class="item" @click="inputMoney(1000.00)">1000</div>
                    <div class="item" @click="inputMoney(2000.00)">2000</div>
                    <div class="item" @click="inputMoney(3000.00)">3000</div>
                </div>
            </div>

            <div class="money-input-box">
                <div class="title">
                    充值金额 <span style="font-size: 28upx;color: #666;">（充值金额仅限微信商城使用）</span>
                </div>
                <div class="input">
                    <span class="fh">￥</span>
                    <input type="number" placeholder="请输入充值金额" v-model="money">
                </div>
            </div>

        </div>
        <div class="my-btn">
            <div class="btn" @click="addMoney">充值</div>
        </div>
        <!--
        <div class="recharge">
            <div class="privilege">
                <div class="privilege-title">
                    分销员特权
                </div>
                <div class="privilege-box">
                    <div class="privilege-box-item">
                        <div class="left">
                            <div class="circle">1</div>
                        </div>
                        <div class="right">
                            预存 1000元 送2次水育卡；
                        </div>
                    </div>
                    <div class="privilege-box-item">
                        <div class="left">
                            <div class="circle">2</div>
                        </div>
                        <div class="right">
                            预存 2000元 送6次水育卡；
                        </div>
                    </div>
                    <div class="privilege-box-item">
                        <div class="left">
                            <div class="circle">3</div>
                        </div>
                        <div class="right">
                            预存 3000元 送一个月无限水育卡；
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="recharge">
            <div class="privilege">
                <div class="privilege-title" style="color: #666;">
                    活动细节
                </div>
                <div class="privilege-box" style="color: #666;">
                    <div class="privilege-box-item">
                        <div class="right">
                            1. 本活动预存金额仅限捣蛋熊猫线上商城消费使用，消费时长无限制；
                        </div>
                    </div>
                    <div class="privilege-box-item">
                        <div class="right">
                            2. 参与本活动获得的赠礼，从办理本活动次日（遇非工作日顺延）开始计算，限时30天内使用完。
                        </div>
                    </div>
                    <div class="privilege-box-item">
                        <div class="right">
                            3. 赠礼可转赠亲友，但不可兑换现金，不能延期，逾期不可使用；
                        </div>
                    </div>
                    <div class="privilege-box-item">
                        <div class="right">
                            4. 双胞胎可共用赠礼，但赠送次数为一个宝贝15次。（注：其他双孩家庭不可共用赠礼）；
                        </div>
                    </div>
                    <div class="privilege-box-item">
                        <div class="right">
                            5. 线上会员福利以“熊猫商城”会员福利和会员规则为准。
                        </div>
                    </div>
                </div>
            </div>
        </div>
        -->

        <div class="xuanfu-log" @click="_goPage('discount_coupon')">
            <img class="img" src="http://picture.ddxm661.com/7f343202003171535236962.png" alt="">
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { _debounce } from "@/utils/mUtils"

    export default {
        name: "recharge", //充值页面
        data(){
          return {
              money: '',
          }
        },
        async onLoad(){
            await this.wxConfig();
        },
        methods:{
            ...mapActions(['asyncGetUserInfo']),
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            // 返回按钮
            _goBack() {
                if (getCurrentPages().length === 1) {
                    this._goPage('user_money_redirect')
                } else {
                    uni.navigateBack()
                }
            },
            inputMoney(money = 0) {
                this.money = money
            },
            /* 防抖 */
            addMoney(){
                _debounce((_that = this) => {
                    _that._investMoney()
                }, 1000)
            },
            _investMoney(){
                if (this.money === '') {
                    this.msg('请输入充值金额')
                    return
                }
                let data={
                        money: this.money
                    },
                    _that = this
                _that.$minApi.investMoney(data).then(res=>{
                    console.log(data)
                    if(res.code === 200){
                        let data = JSON.parse(res.data)
                        _that.$wx.ready(()=>{
                            _that.$wx.chooseWXPay({
                                timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                                package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                paySign: data.paySign, // 支付签名
                                success: async (success) => {
                                    console.log("用户支付成功：", success)
                                    _that._goPage('user_money_redirect')
                                },
                                fail: async (fail) => {
                                   console.log("支付失败：",fail)
                                },
                                cancel: async (cancel) => {
                                    console.log("用户取消支付：",cancel)
                                },
                                complete: async (complete) => {
                                    console.log("无论支付结果为是成功/失败/取消：",complete)
                                    _that.asyncGetUserInfo()
                                }
                            })
                        })
                    }
                }).catch(err => {
                    console.log(err)
                    this.msg('服务器繁忙，请稍后重试。')
                })
            }
        },
        computed:{
            ...mapState(['userInfo'])
        }
    }
</script>

<style scoped lang="scss">

    *{
        font-size: $uni-font-size-base;
    }
    .privilege{
        background-color: #FFFFFF;
        margin-bottom: 20upx;
        .privilege-title{
            @extend %border-color-solid-botton;
            padding: $uni-spacing-row-base;
        }
        .privilege-box{
            padding: 0 $uni-spacing-row-base;
            .privilege-box-item{
                display: flex;
                align-items: center;
                padding: $uni-spacing-row-base 0;
                .left{
                    margin-right: 10upx;
                    .circle{
                        background: #000;
                        border-radius: 50%;
                        color: #FFFFFF;
                        width: 30upx;
                        text-align: center;
                        height: 30upx;
                        line-height: 30upx;
                        font-size: $uni-font-size-sm;
                    }
                }
                .right{
                    text-align: justify;
                }
            }
        }
    }

    .my-money{
        .my-money-money{
            background: #FFFFFF;
            padding: 80upx 0 100upx 0;
            .my-money-title{
                text-align: center;
                font-size: $uni-font-size-lg;
                margin-bottom: 100upx;
            }
            .my-money-num{
                color: $color-primary;
                font-size: $uni-font-size-lg * 2;
                text-align: center;
            }
        }
        .money-input-box{
            background: #FFFFFF;
            padding: $uni-spacing-row-base;
            .title{
                font-size: $uni-font-size-lg;
                margin-bottom: 40upx;
            }
            .box{
                display: flex;
                justify-content: space-around;
                .item{
                    width:126upx;
                    height:68upx;
                    line-height: 68upx;
                    text-align: center;
                    background:#F2F2F2;
                }
            }
            .input{
                font-size: $uni-font-size-lg;
                display: flex;
                align-items: center;
                .fh{
                    margin-right: 20px;
                    font-size: $uni-font-size-lg * 2;
                }
                input{
                    font-size: $uni-font-size-lg;
                }
            }
        }
    }
    .my-btn{
        padding: $uni-spacing-row-base;
        margin: $uni-spacing-row-base 0;
        .btn{
            height:98upx;
            line-height: 98upx;
            text-align: center;
            background: $color-primary;
            border-radius:8upx;
            color: #FFFFFF;
            font-size: $uni-font-size-lg;
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
