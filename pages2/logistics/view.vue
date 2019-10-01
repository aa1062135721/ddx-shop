<template>
    <view>
        <view class="section">
            <view class="left">
                <image class="img" src="../../static/images/goods.jpg"></image>
            </view>
            <view class="right">
                <view>快递公司：中通快递</view>
                <view>物流单号：16154561325135615</view>
            </view>
        </view>

        <view class="step">
            <uni-steps :options="list2" :active="active" direction="column" activeColor="#FC5A5A"  activeTextColor="#1A1A1A"/>
        </view>
    </view>
</template>

<script>
    import uniSteps from '@/components/qingqing-steps/uni-steps.vue'

    export default {
        name: 'logistics_view', // 物流信息
        components: {
            uniSteps
        },
        data() {
            return {
                active: 1,
                list2: [{
                    title: '买家下单',
                    desc: '<div style="text-align: left;">[重庆市]渝北区汽博中心公司已签收签收人：前台感谢使用圆通快递，期待再次为您服务。<br><span style="color:#808080;">2018-11-12</span></div>'
                }, {
                    title: '卖家发货',
                    desc: '<div style="text-align: left;">[重庆市]渝北区汽博中心公司小猪<span style="color: #F68452;">15213710631</span>正在派件。<br><span style="color:#808080;">2018-11-12</span></div>'
                }, {
                    title: '买家签收',
                    desc: '2018-11-13'
                }, {
                    title: '交易完成',
                    desc: '2018-11-14'
                }]
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .section{
        background: #ffffff;
        font-size: $uni-font-size-base;
        padding:$uni-spacing-col-base $uni-spacing-row-base;
        margin-bottom: 26upx;
        width: 100%;
        display: flex;
        .left{
            .img{
                width:186upx;
                height:186upx;
                border-radius:4upx;
            }
            margin-right: 30upx;
        }
        .right{
            color: $color-primary-plain;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
    .step{
        font-size: $uni-font-size-base;
        padding:$uni-spacing-col-base $uni-spacing-row-base;
        background: #ffffff;
        width: 100%;
    }
</style>
