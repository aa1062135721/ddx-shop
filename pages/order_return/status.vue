<template>
    <view>
        <view class="section">
            <view class="left">
                <image class="img" src="../../static/images/goods.jpg"></image>
            </view>
            <view class="right">
                <view class="title">衍生健康大师草本番茄膳面 12包装衍生健生健衍生健康大师草本番茄膳面 12包装衍生健生健衍生健康大师草本番茄膳面 12包装衍生健生健</view>
                <view class="other">颜色：红色；型号：大号；尺寸：XXL</view>
            </view>
        </view>

        <view class="section2">
            <view class="chooses-why" style="justify-content: flex-start;">
                退款金额：<text style="color: #FC5A5A;">￥88.88</text>
            </view>
            <view class="chooses-why" style="justify-content: flex-start;">
                退款状态：<text style="color: #808080;">退款失败</text>
            </view>
            <view class="chooses-why" style="justify-content: flex-start;">
                失败原因：<text style="color: #808080;">XXXXXXXXXXXXX</text>
            </view>
        </view>

        <view class="section2">
            <view class="chooses-why" style="justify-content: flex-start;">
                快递公司：<text style="color: #808080;">韵达快递</text>
            </view>
            <view class="chooses-why2" @click="_goPage('logistics_view')">
                <view>快递单号</view>
                <view class="chooses-ba">12345678901234567 <text class="iconfont icon-ddx-shop-content_arrows"></text></view>
            </view>
        </view>

        <view class="section-status">
            <view>
                退款说明：XXXXXXXXXXXXX
            </view>
            <view class="chooses-why">
                退款原因：XXXXXXXXXXXXX
            </view>
            <view>
                退款单号：12345678901234567
            </view>
            <view>
                申请时间：2019-02-03 13:15:25
            </view>
        </view>


    </view>
</template>

<script>
    export default {
        name: "order_return_status",
        data(){
          return {

          }
        },

        methods:{
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
        },
    }
</script>

<style lang="scss">
    @import './return.scss';
</style>
