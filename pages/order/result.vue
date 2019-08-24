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
            <view class="msg">{{msg}}</view>
        </view>
        <view class="button">
            <button type="warn">查看订单</button>
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
              msg: '您已经成功下单，我们将及时为您处理', // 您已经成功下单，我们将及时为您处理 or 您已经成功下单，但您未支付
          }
        },
        methods:{
        }
    }
</script>

<style scoped lang="scss">
.container{
    width: 100%;
	padding-top: 200upx;
    display: flex;
    flex-direction: column;
    align-items: center;
	align-content:center;
    justify-content: center;
    .success{
        color: #6B9FE7;
		text-align: center;
        .image{
            width:170upx;
            height:170upx;
            margin-bottom: 40upx;
        }
    }
    .failure{
        color: #fc5a5a;
		text-align: center;
        .image{
            width:170upx;
            height:170upx;
            margin-bottom: 40upx;
        }
    }
    .text{
        margin-top: 120upx;
        color: #1A1A1A;
		font-size: $uni-font-size-lg;
		.msg{
			margin-top: $uni-spacing-col-sm;
			color: #808080;
			font-size: $uni-font-size-base;
			text-align: center;
		}
		margin-bottom: $uni-font-size-lg * 3;
    }
	.button{
		button{
			color: #fff;
			padding-left: $uni-spacing-row-sm;
			padding-right: $uni-spacing-row-sm;
			background: $color-primary;	
			width: 268upx;
			font-size: $uni-font-size-base;
		}
	}
}

</style>
