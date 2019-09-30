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
                请填写发货信息
            </view>
            <view class="chooses-why2">
                <input type="text" placeholder="请输入快递公司全称（必填）" style="width: 100%;">
            </view>
            <view class="chooses-why2">
                <input type="text" placeholder="请输入寄回商品的快递单号（必填）" style="width: 100%;">
            </view>
        </view>
        <view class="my-submit">
            提交
        </view>
    </view>
</template>

<script>
    export default {
        name: "order_return_refund",
        data(){
            return {
            }
        },

        methods: {

        },
    }
</script>

<style lang="scss">
    @import "./return.scss";
</style>
