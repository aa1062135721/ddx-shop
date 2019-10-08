<template>
    <view>
        <view class="section">
            <view class="left">
                <image class="img" :src="goods.pic"></image>
            </view>
            <view class="right">
                <view>快递公司：{{responseData.title}}</view>
                <view>物流单号：{{responseData.sn}}</view>
            </view>
        </view>

        <view class="step">
            <uni-steps :options="responseData.list" :active="active" direction="column" activeColor="#FC5A5A"  activeTextColor="#1A1A1A"/>
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
                goods: {
                  pic: '',
                },
                active: 0,
                responseData: {
                    sn: "",//运单号
                    title: "",//快递公司
                    list:[],//物流信息
                },
            }
        },
        onLoad(){
            console.log("其他页面带过来的参数：", this.$parseURL())
            this.goods = this.$parseURL().goods
            if (this.$parseURL().order_id){
                this.$minApi.express({
                    order_id: this.$parseURL().order_id,
                    orderGoodsId: this.$parseURL().goods.id
                }).then(res => {
                    console.log(res)
                    if (res.code === 200) {
                        this.responseData = res.data
                        this.active = res.data.list.length
                        this.$forceUpdate()
                    }
                })
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
