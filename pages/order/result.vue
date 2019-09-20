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
            <view>订单编号：{{order_sn}}</view>
            <view class="msg">{{msg}}</view>
        </view>
        <view class="button">
            <button type="warn" @click="viewOrder">查看订单</button>
        </view>
    </view>
</template>

<script>
    export default {
        name: "result", // 下单成功 or 失败
        data(){
          return {
              result: false,//支付结果
              order_id:0,//订单id
              order_sn: '',//订单号
              msg: '', // 您已经成功下单，我们将及时为您处理 or 您已经成功下单，但您未支付
          }
        },
        onLoad(){
            console.log("其他页面带过来的参数：", this.$parseURL())
            this.order_sn = this.$parseURL().sn
            this.order_id = this.$parseURL().id
            this.result = this.$parseURL().result
            if (this.$parseURL().result) {
                this.msg = '您已经成功下单，我们将及时为您处理'
            } else {
                this.msg = '您已经成功下单，但您未支付'
            }
        },
        methods:{
            viewOrder(){
                console.log('这里跳转到订单详情，订单id：', this.order_id)
                this.$openPage({name:'order_detail_redirect', query:{order_id: this.order_id}})
            }
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
