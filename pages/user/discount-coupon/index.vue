<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->
        <div class="my-background">
            <div class="item-box">
                <img class="img" src="http://picture.ddxm661.com/92b9420200317105038160.png" alt="" @click="addMoney(2000.00)">
                <img class="img" src="http://picture.ddxm661.com/469a6202003171059175690.png" alt="" @click="addMoney(4000.00)">
                <img class="img" src="http://picture.ddxm661.com/2dab8202003171059342741.png" alt="" @click="addMoney(8000.00)">
                <img class="img" src="http://picture.ddxm661.com/4ab79202003171059489546.png" alt="" @click="addMoney(12000.00)">
            </div>
        </div>
    </div>
</template>

<script>
    import { _debounce } from "@/utils/mUtils";

    export default {
        data() {
            return {

            }
        },
        async onLoad(){
            await this.wxConfig();
        },
        methods: {
            _goPage(url, query = {}) {
                this.$openPage({
                    name: url,
                    query
                })
            },
            // 返回按钮
            _goBack() {
                if (getCurrentPages().length === 1) {
                    this._goPage('home')
                } else {
                    uni.navigateBack()
                }
            },

            /* 防抖 */
            addMoney(money){
                _debounce((_that = this) => {
                    _that._investMoney(money)
                }, 1000)
            },
            _investMoney(money){
                let data={
                        money: money,
                        type: 8,
                    },
                    _that = this
                _that.$minApi.investMoney(data).then(res=>{
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
                                    _that._goPage('discount_coupon_details')
                                },
                                fail: async (fail) => {
                                    console.log("支付失败：",fail)
                                },
                                cancel: async (cancel) => {
                                    console.log("用户取消支付：",cancel)
                                },
                                complete: async (complete) => {
                                    console.log("无论支付结果为是成功/失败/取消：",complete)
                                }
                            })
                        })
                    }
                }).catch(err => {
                    this.msg('服务器繁忙，请稍后重试。')
                })
            }
        },
    }
</script>

<style scoped lang="scss">
    #my-h5-back{
        position: fixed;
    }
    .my-background{
        height: 2041upx !important;
        height: 100vw;
        background-image: url("http://picture.ddxm661.com/81021202003171046577841.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;

        .item-box{
            padding: 0 $uni-spacing-row-base;
            padding-top: 740upx;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            .img{
                width: 315upx;
                height: 394upx;
                margin: 12upx;
            }
        }
    }
</style>
