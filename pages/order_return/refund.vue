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
            <view class="chooses-why">
                <label><radio value="r1" checked="true" color="#FC5A5A" style="transform:scale(0.7)" />退款（无需退货）</label>
                <label><radio value="r2" color="#FC5A5A" style="transform:scale(0.7)"  />退款退货</label>
            </view>
            <view class="chooses-why2" @click="open">
                <view>退款原因</view>
                <view class="chooses-ba">请选择 <text class="iconfont icon-ddx-shop-content_arrows"></text></view>
            </view>
        </view>

        <view class="section2">
            <view class="chooses-why" style="justify-content: flex-start;">
                退款金额：<text style="color: #FC5A5A;">￥88.88</text>
            </view>
            <view class="chooses-why2">
                <input type="text" placeholder="退款说明（选填）" style="width: 100%;">
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

        <view class="section3">
            <view class="bottom">
                <view class="title">
                    上传凭证 <text style="color: #808080;">（最多3张）</text>
                </view>
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

        <!-- 选择退货原因  我的弹框-->
        <uni-popup ref="returns" type="top" :custom="true" v-if="returnOrderWhy.length">
            <view class="my-pop">
                <view class="item" v-for="(item, index) in returnOrderWhy" :key="index">
                    <text>{{item.why}}</text>
                    <text class="iconfont icon-ddx-shop-content_arrows"></text>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import uniPopup from '@/components/uni-popup/uni-popup.vue'

    export default {
        name: "order_return_refund",
        data(){
            return {
                returnOrderWhy: [
                    {why: '不想要了', id:0 },
                    {why: '其他', id:0 },
                    {why: '没有钱了', id:0 },
                    {why: '一个字，穷', id:0 },
                ]
            }
        },

        methods: {
            open(){
                this.$refs.returns.open()
                // this.$refs.returns.close()
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

        components:{
            uniPopup,

        },
    }
</script>

<style lang="scss">
    @import "./return.scss";
    /*我的弹框*/
    .my-pop{
        background: #ffffff;
        height: auto;
        width: 100%;
        padding: 0  $uni-spacing-row-base;
        font-size: $uni-font-size-base;
        color: $color-primary-plain;
        .item{
            display: flex;
            justify-content: space-between;
            padding: 28upx 0;
            @extend %border-color-solid-botton;
            &:last-child{
                border: none;
            }
            .iconfont{
                font-size: $uni-font-size-base;
                color: #AAAAAA;
            }
        }
    }
</style>
