<template>
    <view>
        <view class="sum-money">
            <text class="icon">￥</text>
            <text class="money">{{orderData.amount}}</text>
        </view>
        <form @submit="formSubmit" :report-submit="true">
            <view class="box">
                <radio-group @change="radioChange">
                    <view class="item">
                        <view>
                            <view>钱包</view>
                            <view class="has-money">可用余额：¥{{userInfo.usable_money}}</view>
                        </view>
                        <view>
                            <radio value="3" :checked="payWay === '3'" :disabled="disabledMoney" color="#FC5A5A" />
                        </view>
                    </view>
                    <view class="item">
                        <view>
                            <view>微信支付</view>
                        </view>
                        <view>
                            <radio value="1" :checked="payWay === '1'" color="#FC5A5A" />
                        </view>
                    </view>
                </radio-group>
            </view>
            <button form-type="submit" class="my-btn">确认支付</button>
        </form>
    </view>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "order_pay",
        data() {
            return {
                orderData:{
                    amount: 0.00,      //总金额
                    order_id: 0      //订单id
                },

                payWay: '1',//支付方式：1微信支付，3钱包支付
                disabledMoney: false,//禁用余额支付按钮
            }
        },
        onLoad(){
            console.log("其他页面带过来的参数：", this.$parseURL())
            this.orderData = this.$parseURL()
            if (parseFloat(this.$parseURL().amount) <= parseFloat(this.userInfo.usable_money)){
                this.payWay = '3'
            } else {
                this.disabledMoney = true
                this.payWay = '1'
            }
        },
        onShow(){
            let url = encodeURIComponent(window.location.href.split('#')[0])
            this.$minApi.getWxConfig({url}).then(res => {
                console.log(res)
                if (res.code === 200) {
                    this.$wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
                        appId: res.data.appid, // 必填，公众号的唯一标识
                        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                        signature: res.data.signature,// 必填，签名，见附录1
                        jsApiList: [
                            "chooseWXPay",//微信h5支付
                        ]
                    })
                    this.$wx.error((res) => {
                        this.msg(res)
                    })
                }
            })
        },
        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            payResult(){
                this._goPage('order_result')
            },
            radioChange(evt) {
                switch (evt.target.value) {
                    case '3':
                        console.log("支付方式（钱包）: ",evt.target.value)
                        if (parseFloat(this.$parseURL().amount) > parseFloat(this.userInfo.usable_money)){
                            this.msg('钱包余额不足')
                            this.payWay = "1"
                            this.disabledMoney = true
                        } else {
                            this.payWay = evt.target.value
                        }
                        break
                    case '1':
                        console.log("支付方式（微信）: ",evt.target.value)
                        this.payWay = evt.target.value
                        break
                }
            },
            async formSubmit(e) {
                let data ={
                    order_id: this.orderData.order_id,
                    pay_way: this.payWay,
                }
                /**
                 * 请求接口，传订单id，和支付方式
                 * 如果支付方式为 微信和钱包支付
                 */
                await this.$minApi.payWay(data).then(async res => {
                    /**
                     * res.data.id  //订单id
                     * res.data.sn  //订单编号
                     * res.data.order_distinguish // 0: 普通订单 1：拼团订单 2：抢购订单
                     * 如果您选择的是微信支付，res.data 下还有许多微信支付需要的数据
                     */
                    console.log("需要支付的订单信息：", res)
                    if (res.code === 200) {
                        if (this.payWay === '3'){ //钱包支付
                            res.data.result = true
                            await this._goPage('order_result', res.data)
                        }
                        if (this.payWay === '1') { // 微信支付
                            this.$wx.ready(() => {
                                this.$wx.chooseWXPay({
                                    timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                    nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
                                    package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                    signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                    paySign: res.data.paySign, // 支付签名
                                    success: async (success) => {
                                        console.log("用户支付成功：", success)
                                        res.data.result = true
                                    },
                                    fail: async (fail) => {
                                        console.log("用户支付失败：",fail)
                                        res.data.result = false
                                    },
                                    cancel: async (cancel) => {
                                        console.log("用户取消支付：",cancel)
                                        res.data.result = false
                                    },
                                    complete: async (complete) => {
                                        console.log("无论支付结果为是成功/失败/取消：",complete)
                                        // 拼团订单直接查看拼团详情
                                        if (res.data.order_distinguish === 1){
                                            this._goPage('group_buy_detail', {id: res.data.id})
                                            return
                                        }
                                        this._goPage('order_result', res.data)
                                    }
                                })
                            })
                            // await uni.requestPayment({
                            //     provider: 'wxpay',
                            //     timeStamp: res.data.timeStamp,
                            //     nonceStr: res.data.nonceStr,
                            //     package: res.data.package,
                            //     signType: res.data.signType,
                            //     paySign: res.data.paySign,
                            //     success: async (payRes) => {
                            //         res.data.result = true
                            //         sendTemplateMessageData.state = 1
                            //         await this.$minApi.sendTemplateMessage(sendTemplateMessageData).then(res=>{
                            //             console.log(res)
                            //         })
                            //         await this._goPage('order_result', res.data)
                            //     },
                            //     fail: async (payErr) =>{
                            //         res.data.result = false
                            //         sendTemplateMessageData.state = 0
                            //         await this.$minApi.sendTemplateMessage(sendTemplateMessageData).then(res=>{
                            //             console.log(res)
                            //         })
                            //         await this._goPage('order_result', res.data)
                            //     }
                            // })
                        }
                    } else {
                        res.data.result = false
                        await this._goPage('order_result', res.data)
                    }
                }).catch(async err => {
                    console.log(err)
                    this.msg('服务器发生错误')
                })
            },
        },
        computed: {
            ...mapState(['userInfo'])
        },
    }
</script>

<style lang="scss">
    page{
        background: #ffffff;
        color: $color-primary-plain;
        font-size: $uni-font-size-base;
    }
    .sum-money{
        text-align: center;
        padding: 100upx 0;
        height: 54upx;
        line-height: 54upx;
        color: $color-primary-plain;
        .icon{
            font-size: $uni-font-size-sm;
        }
        .money{
            font-size: $uni-font-size-lg + $uni-font-size-sm;
        }
    }
    .box{
        width: 100%;
        padding: $uni-spacing-row-base;
        .item{
            @extend %border-color-solid-botton;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 36upx 0;
            .has-money{
                color: #808080;
                font-size: $uni-font-size-sm;
            }
        }
    }
    .my-btn{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        height:98upx;
        line-height: 98upx;
        color: #ffffff;
        background: $color-primary;
        font-size: $uni-font-size-lg;
        border-radius: 0;
    }
</style>
