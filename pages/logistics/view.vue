<template>
    <view class="example">
        <uni-steps :options="list2" :active="active" direction="column" activeColor="#FC5A5A"  activeTextColor="#1A1A1A"/>
        <button type="primary" @click="change">改变状态</button>
    </view>
</template>

<script>
    import uniSteps from '@/components/qingqing-steps/uni-steps.vue'

    export default {
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
                    desc: '<div style="text-align: left;">[重庆市]渝北区汽博中心公司小猪（<span style="color: #F68452;">15213710631</span>）正在派件。<br><span style="color:#808080;">2018-11-12</span></div>'
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
            change() {
                if (this.active < this.list2.length - 1) {
                    this.active += 1
                } else {
                    this.active = 0
                }
            }
        }
    }
</script>

<style>
    page {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        background-color: #fff
    }

    view {
        font-size: 28upx;
        line-height: inherit
    }

    .example {
        padding: 0 30upx 30upx
    }

    .example-title {
        font-size: 32upx;
        line-height: 32upx;
        color: #777;
        margin: 40upx 25upx;
        position: relative
    }

    .example .example-title {
        margin: 40upx 0
    }

    .example-body {
        padding: 0 40upx
    }

    button {
        margin: 30upx;
    }
</style>
