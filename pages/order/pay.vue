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
                            <radio value="3" color="#FC5A5A" />
                        </view>
                    </view>
                    <view class="item">
                        <view>
                            <view>微信支付</view>
                        </view>
                        <view>
                            <radio value="1" color="#FC5A5A" />
                        </view>
                    </view>
                </radio-group>
            </view>
            <button form-type="submit" class="my-btn">确认支付</button>
        </form>
    </view>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "order_pay",
        data() {
            return {
                orderData:{
                    amount: 0.00,      //总金额
                    order_id: 0      //订单id
                },
                payWay: 1,//支付方式：1微信支付，3钱包支付
            }
        },
        onLoad(){
            console.log("其他页面带过来的参数：", this.$parseURL())
            this.orderData = this.$parseURL()
            if (parseFloat(this.$parseURL().amount) <= parseFloat(this.userInfo.usable_money)){
                this.payWay = 3
            } else {
                this.payWay = 1
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
                console.log(evt.target.value)
                this.payWay = evt.target.value
            },
            formSubmit: function(e) {
                console.log(e)
                console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                uni.request({
                    method:'POST',
                    url: 'http://testmd.ddxm661.com/wxshop/user/test', //仅为示例，并非真实接口地址。
                    header: {
                        'XX-Token': 'fda1c450fa4d59d61db9f1f1e291047cc39ee074d3702cd80cf2002835c21f20' //自定义请求头信息
                    },
                    data: {
                        form_id:e.detail.formId,
                        page: 'pages/logistics/view'
                    },
                    success: (res) => {
                        console.log(res.data)
                    }
                })
                this._goPage('order_result')
            },
        },
        computed: {
            ...mapGetters(['userInfo'])
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
