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

       <view class="step" v-if="rod">
            <uni-steps :options="responseData.list" :active="active" direction="column" activeColor="#FC5A5A"  activeTextColor="#1A1A1A"/>
        </view>
		<view class="jump" v-if="flag">
			<text @click="CheckLogistics">点击查看物流信息</text>
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
				otherSN:'',
				flag:false,
				rod:true
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
					console.log((res))
                    if (res.code === 200 ) {
                        this.responseData = res.data
                        this.active = res.data.list.length
                        this.$forceUpdate()
                    }
					if(res.brief_code==="JTSD"){
						this.otherSN=res.sn
						// window.location.href = 'https://m.kuaidi100.com/result.jsp?nu='+sn
						this.flag=true
						this.rod=false
						this.responseData.title = res.brief_code
						this.responseData.sn = res.sn
					}
                })
            }
        },
        methods: {
			CheckLogistics(){
				window.location.href = 'https://m.kuaidi100.com/result.jsp?nu='+this.otherSN
			}
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
	.jump{
		font-size: $uni-font-size-base;
		margin: auto;
		text-align: center;
		color: #fff;
		background: #FF7F02;
		width: 400rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 10rpx;
	}
</style>
