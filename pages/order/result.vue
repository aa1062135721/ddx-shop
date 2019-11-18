<template>
    <view class="container">
        <div class="banner">
            <div class="banner-result-type-icon">
                    <i class="iconfont icon-ddx-shop-tick"></i>
            </div>
            <div class="banner-result-text">
                <span>下单成功</span>
                <span>等待商户发货</span>
            </div>
        </div>
        <div class="address">
            <div class="item">
                <div class="title">收货人：</div>
                <div class="content">{{nickname}}</div>
            </div>
            <div class="item">
                <div class="title">收货地址：</div>
                <div class="content">{{address}}</div>
            </div>
        </div>
        <div class="address">
            <div class="item">
                <div class="title">订单号：</div>
                <div class="content">{{order_sn}}</div>
            </div>
            <div class="item">
                <div class="title">合计：</div>
                <div class="content red">￥{{money}}</div>
            </div>
        </div>
        <div class="btns">
            <div class="box">
                <div class="btn" @click="viewOrder">
                    查看订单
                </div>
                <div class="btn" @click="goOnShopping">
                    继续购物
                </div>
            </div>
        </div>

    </view>
</template>

<script>
    export default {
        name: "result", // 下单成功 or 失败
        data(){
          return {
              nickname: '收货人',
              address: '收货地址',
              order_id:0,//订单id
              order_sn: '',//订单号
              money: '0.00', //订单金额
          }
        },
        onLoad(){
            console.log("其他页面带过来的参数：", this.$parseURL())
            this.order_sn = this.$parseURL().sn
            this.order_id = this.$parseURL().id
            this.nickname = this.$parseURL().nickname
            this.address = this.$parseURL().address
            this.money = this.$parseURL().money
        },
        methods:{
            goOnShopping(){
                this.$openPage({name:'home', query: {}})
            },
            viewOrder(){
                console.log('这里跳转到订单详情，订单id：', this.order_id)
                this.$openPage({name:'order_detail_redirect', query:{order_id: this.order_id}})
            }
        }
    }
</script>

<style scoped lang="scss">
.banner{
    background-color: $color-primary;
    color: #fff;
    display: flex;
    width: 100%;
    padding: 50upx $uni-spacing-row-base;
    .banner-result-type-icon{
        margin-left: 20upx;
        margin-right: 20upx;
        .iconfont{
            font-size: 60upx;
            color: #FFFFFF;
        }
    }
    .banner-result-text{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-size: $uni-font-size-base;
        margin-top: 10upx;
    }
}
.address{
        padding: 50upx $uni-spacing-row-base;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        margin-bottom: 20upx;
        .item{
            width: 100%;
            font-size: $uni-font-size-base;
            display: flex;
            .title{
                color: #999999;
                white-space: nowrap;
                margin-right: 10upx;
            }
            .content{
                color: $color-primary-plain;
                &.red{
                    color: $color-primary;
                }
            }
            &:first-child{
                margin-bottom: 10upx;
            }
        }
    }
.btns{
    padding: 50upx $uni-spacing-row-base;
    .box{
        width: 100%;
        display: flex;
        justify-content: space-around;
        .btn{
            background-color: #FFFFFF;
            width:288upx;
            line-height: 78upx;
            text-align: center;
            color: #000033;
            font-size: $uni-font-size-base;
            border: 1px solid #D2D2D2;
        }
    }

}
</style>
