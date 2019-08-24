<template>
    <view class="container">
        <view class="success" v-if="result">
            <image class="image" src="../../static/icon/icon-pay-succeed.png"></image>
            <view>下单成功</view>
        </view>
        <view class="failure" v-else>
            <image class="image" src="../../static/icon/icon-pay-failure.png"></image>
            <view>支付失败</view>
        </view>
        <view class="text">
            <view>订单编号：{{orderSn}}</view>
            <view>{{msg}}</view>
        </view>
        <view>
            <button>查看订单</button>
        </view>
    </view>
</template>

<script>
    export default {
        name: "result", // 下单成功 or 失败
        data(){
          return {
              result: false,//支付结果
              orderSn: 'OR12546815fa3dsf45415461',
              msg: '您已经成功下单，但您未支付', // 您已经成功下单，我们将及时为您处理 or 您已经成功下单，但您未支付
          }
        },
        methods:{
        }
    }
</script>

<style scoped lang="scss">
.container{
    height: 100%;
    width: 100%;
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .success{
        color: #6B9FE7;
        .image{
            width:170upx;
            height:170upx;
            margin-bottom: 80upx;
        }
    }
    .failure{
        color: #fc5a5a;
        .image{
            width:170upx;
            height:170upx;
            margin-bottom: 80upx;
        }
    }
    .text{
        margin-top: 120upx;
        color: #1A1A1A;
    }
}

</style>
