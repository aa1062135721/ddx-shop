<template>
    <view>
        <view class="goods">
            <view class="top">
                <view class="goods-info">
                    <view class="goods-img">
                        <image src="../../static/images/goods.jpg"></image>
                    </view>
                    <view class="goods-title">
                        衍生健康大师草本番茄膳面 12包装衍生健生健...
                    </view>
                </view>
                <view class="goods-comment">
                    <view class="name">商品评价</view>
                    <view>
                        <uni-rate  disabled="true" max="5" size="18" :value="evaluate.rate" active-color="#FC5A5A" :is-fill="false"></uni-rate>
                    </view>
                </view>
            </view>
            <view class="bottom">
                <textarea class="text" :maxlength="-1" placeholder="亲,收到的宝贝满意吗？说说您对商品的使用心得" />
                <view class="imgs">
                    <view class="up-img" @click="choosesImages(1)" >
                        <i class="iconfont icon-ddx-shop-circle"></i>
                        <view>添加图片</view>
                    </view>
                    <view class="img-show">
                        <image src="../../static/images/goods.jpg"></image>
                        <view class="close iconfont icon-ddx-shop-close"></view>
                    </view>
                    <view class="img-show">
                        <image src="../../static/images/goods.jpg"></image>
                        <view class="close iconfont icon-ddx-shop-close"></view>
                    </view>
                </view>
            </view>
        </view>
        <view class="goods">
            <view class="top">
                <view class="goods-info">
                    <view class="goods-img">
                        <image src="../../static/images/goods.jpg"></image>
                    </view>
                    <view class="goods-title">
                        衍生健康大师草本番茄膳面 12包装衍生健生健...
                    </view>
                </view>
                <view class="goods-comment">
                    <view class="name">商品评价</view>
                    <view>
                        <uni-rate  disabled="true" max="5" size="18" :value="evaluate.rate" active-color="#FC5A5A" :is-fill="false"></uni-rate>
                    </view>
                </view>
            </view>
            <view class="bottom">
                <textarea class="text" :maxlength="-1" placeholder="亲,收到的宝贝满意吗？说说您对商品的使用心得" />
                <view class="imgs">
                    <view class="up-img" @click="choosesImages(1)" >
                        <i class="iconfont icon-ddx-shop-circle"></i>
                        <view>添加图片</view>
                    </view>
                    <view class="img-show">
                        <image src="../../static/images/goods.jpg"></image>
                        <view class="close iconfont icon-ddx-shop-close"></view>
                    </view>
                </view>
            </view>
        </view>
        <view class="goods">
            <view class="top">
                <view class="goods-info">
                    <view class="goods-img">
                        <image src="../../static/images/goods.jpg"></image>
                    </view>
                    <view class="goods-title">
                        衍生健康大师草本番茄膳面 12包装衍生健生健...
                    </view>
                </view>
                <view class="goods-comment">
                    <view class="name">商品评价</view>
                    <view>
                        <uni-rate  disabled="true" max="5" size="18" :value="evaluate.rate" active-color="#FC5A5A" :is-fill="false"></uni-rate>
                    </view>
                </view>
            </view>
            <view class="bottom">
                <textarea class="text" :maxlength="-1" placeholder="亲,收到的宝贝满意吗？说说您对商品的使用心得" />
                <view class="imgs">
                    <view class="up-img" @click="choosesImages(1)" >
                        <i class="iconfont icon-ddx-shop-circle"></i>
                        <view>添加图片</view>
                    </view>
                    <view class="img-show">
                        <image src="../../static/images/goods.jpg"></image>
                        <view class="close iconfont icon-ddx-shop-close"></view>
                    </view>
                    <view class="img-show">
                        <image src="../../static/images/goods.jpg"></image>
                        <view class="close iconfont icon-ddx-shop-close"></view>
                    </view>
                    <view class="img-show">
                        <image src="../../static/images/goods.jpg"></image>
                        <view class="close iconfont icon-ddx-shop-close"></view>
                    </view>
                    <view class="img-show">
                        <image src="../../static/images/goods.jpg"></image>
                        <view class="close iconfont icon-ddx-shop-close"></view>
                    </view>
                    <view class="img-show">
                        <image src="../../static/images/goods.jpg"></image>
                        <view class="close iconfont icon-ddx-shop-close"></view>
                    </view>
                </view>
            </view>
        </view>
        <view class="my-submit">
            提交
        </view>
    </view>
</template>

<script>
    import uniRate from "@/components/uni-rate/uni-rate.vue"

    export default {
        name: "order_evaluate",
        data(){
          return {
            data: {

            }
          }
        },
        methods: {
            pay(){
                uni.request({
                    url: 'http://testmd.ddxm661.com/wxshop/test/pay', //仅为示例，并非真实接口地址。
                    data: {
                        // text: 'uni.request'
                    },
                    header: {
                        // 'custom-header': 'hello' //自定义请求头信息
                    },
                    success: (res) => {
                        console.log(res.data);
                        this.data = res.data;
                    }
                });

            },
            pay2(){
                uni.requestPayment({
                    provider: 'wxpay',
                    timeStamp: this.data.timeStamp,
                    nonceStr: this.data.nonceStr,
                    package: this.data.package,
                    signType: this.data.signType,
                    paySign: this.data.paySign,
                    success: function (res) {
                        console.log('success:' + JSON.stringify(res));
                    },
                    fail: function (err) {
                        console.log('fail:' + JSON.stringify(err));
                    }
                });
            },
            choosesImages(index){
                uni.chooseImage({
                    count:9,
                    success:function(res){
                        console.log(res)
                        // res.tempFilePaths[0];
                    }
                })
            }
        },
        components: {
            uniRate,
        }
    }
</script>

<style lang="scss">
    .goods{
        background: #ffffff;
        margin-bottom: 24upx;
        .top{
            width: 100%;
            height: auto;
            padding: $uni-spacing-row-base;
            @extend %border-color-solid-botton;
            .goods-info{
                display: flex;
                margin-bottom: 50upx;
                .goods-img{
                    margin-right: 20upx;
                    image{
                        width: 150upx;
                        height: 150upx;
                    }
                }
                .goods-title{
                    @extend %overflow-2-line;
                    color: $color-primary-plain;
                    font-size: $uni-font-size-base;
                }
            }
            .goods-comment{
                display: flex;
                align-items: center;
                .name{
                    text-align: center;
                    width: 150upx;
                    margin-right: 20upx;
                    color: $color-primary-plain;
                    font-size: $uni-font-size-lg;
                }
            }
        }
        .bottom{
            width: 100%;
            .text{
                height:200upx;
                width: 100%;
                background: #fff;
                color: $color-primary-plain;
                font-size: $uni-font-size-base;
                padding:$uni-spacing-row-base;
            }
            .imgs{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                padding: $uni-spacing-row-base;
                .up-img{
                    width:136upx;
                    height:136upx;
                    border-radius:4upx;
                    margin: 40upx 20upx;
                    border:1upx dashed #D2D2D2;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    font-size: $uni-font-size-base;
                    align-items: center;
                    color: #AAAAAA;
                    .iconfont{
                        font-size: $uni-font-size-lg;
                        color: #AAAAAA;
                    }
                }
                .img-show{
                    width:136upx;
                    height:136upx;
                    border-radius:4upx;
                    margin: 40upx 20upx;
                    position: relative;
                    image{
                        width:136upx;
                        height:136upx;
                        border-radius:4upx;
                    }
                    .close{
                       color: black;
                        position: absolute;
                        top: -30upx;
                        right: -30upx;
                    }
                }
            }

        }
    }
    .my-submit{
        color: #ffffff;
        font-size: $uni-font-size-lg;
        background: $color-primary;
        text-align: center;
        width: 100%;
        height: 98upx;
        line-height: 98upx;
    }
</style>
