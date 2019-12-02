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
                    ￥500.00
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
                    充值金额
                </div>
                <div class="input">
                    <span class="fh">￥</span>
                    <input type="number" placeholder="请输入充值金额" v-model="money">
                </div>
            </div>

        </div>
        <div class="my-btn">
            <div class="btn">充值</div>
        </div>
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
                <div class="privilege-title">
                    活动细节
                </div>
                <div class="privilege-box">
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
    </div>
</template>

<script>
    export default {
        name: "recharge", //充值页面
        data(){
          return {
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
            inputMoney(money = 0) {
                this.money = money
            },
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
</style>
