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
                console.log('form发生了submit事件，携带数据为：',e)
                // 推送模板消息所需的数据
                let sendTemplateMessageData = {
                    form_id: e.detail.formId,//模板id
                    page: `pages/order/detail?order_id=${this.orderData.order_id}`,//模板消息推送后可以跳转的页面
                    oid: `${this.orderData.order_id}`,//订单id
                    state: 0,//订单状态，0 未支付 1：支付成功；2：订单取消
                }

                let data ={
                    order_id: this.orderData.order_id,
                    pay_way: this.payWay,
                }
                /**
                 * 请求接口，传订单id，和支付方式
                 * 如果支付方式为 微信和钱包支付
                 */
                await this.$minApi.payWay(data).then(async res => {
                    console.log(res)
                    if (res.code === 200) {
                        if (this.payWay === '3'){ //钱包支付
                            res.data.result = true
                            sendTemplateMessageData.state = 1
                            await this.$minApi.sendTemplateMessage(sendTemplateMessageData).then(res=>{
                                console.log(res)
                            })
                            await this._goPage('order_result', res.data)
                        }
                        if (this.payWay === '1') { // 微信支付
                            await uni.requestPayment({
                                provider: 'wxpay',
                                timeStamp: res.data.timeStamp,
                                nonceStr: res.data.nonceStr,
                                package: res.data.package,
                                signType: res.data.signType,
                                paySign: res.data.paySign,
                                success: async (payRes) => {
                                    res.data.result = true
                                    sendTemplateMessageData.state = 1
                                    await this.$minApi.sendTemplateMessage(sendTemplateMessageData).then(res=>{
                                        console.log(res)
                                    })
                                    await this._goPage('order_result', res.data)
                                },
                                fail: async (payErr) =>{
                                    res.data.result = false
                                    sendTemplateMessageData.state = 0
                                    await this.$minApi.sendTemplateMessage(sendTemplateMessageData).then(res=>{
                                        console.log(res)
                                    })
                                    await this._goPage('order_result', res.data)
                                }
                            })
                        }
                    } else {
                        res.data.result = false
                        sendTemplateMessageData.state = 0
                        await this.$minApi.sendTemplateMessage(sendTemplateMessageData).then(res=>{
                            console.log(res)
                        })
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
