<template>
    <view>
        <view class="section">
            <view class="left">
                <image class="img" :src="orderGoodsData.pic"></image>
            </view>
            <view class="right">
                <view class="title">{{orderGoodsData.subtitle}}</view>
                <view class="other" v-if="orderGoodsData.attr_name">规格：{{orderGoodsData.attr_name}}</view>
            </view>
        </view>

        <!-- 选择服务类型-->
        <view class="chooses-return-type" v-if="!requestData.type">
            <view class="item-type" @click="requestData.type = 1">
                <view class="one">
                    <view class="my-head">
                        <image src="../../static/images/order_return_money.png" class="img"></image>
                    </view>
                    <view class="my-body">
                        <view class="title">我要退款(无需退货）</view>
                        <view class="my-content">没收到货，或与客服协商同意不用退货只退款</view>
                    </view>
                </view>
                <view class="two">
                    <text class="iconfont icon-ddx-shop-content_arrows"></text>
                </view>
            </view>
            <view class="item-type" @click="requestData.type = 2">
                <view class="one">
                    <view class="my-head">
                        <image src="../../static/images/order_return_return.png" class="img"></image>
                    </view>
                    <view class="my-body">
                        <view class="title">我要退款退货</view>
                        <view class="my-content">已收到货，需要退还收到的货物</view>
                    </view>
                </view>
                <view class="two">
                    <text class="iconfont icon-ddx-shop-content_arrows"></text>
                </view>
            </view>
            <view class="item-type" @click="requestData.type = 3">
                <view class="one">
                    <view class="my-head">
                        <image src="../../static/images/order_return_change.png" class="img"></image>
                    </view>
                    <view class="my-body">
                        <view class="title">换货</view>
                        <view class="my-content">商品存在质量问题，联系客服协商退货</view>
                    </view>
                </view>
                <view class="two">
                    <text class="iconfont icon-ddx-shop-content_arrows"></text>
                </view>
            </view>
        </view>

        <view class="section2" v-if="requestData.type">
            <view class="chooses-why" style="justify-content: flex-start;">
                退款金额：<text style="color: #FC5A5A;">￥{{orderGoodsData.real_price * orderGoodsData.num}}</text>
            </view>
            <view class="chooses-why2" @click="open">
                <view>退款原因</view>
                <view class="chooses-ba">{{requestData.reason || '请选择'}} <text class="iconfont icon-ddx-shop-content_arrows"></text></view>
            </view>
            <view class="chooses-why2">
                <input type="text" placeholder="退款说明（选填）" style="width: 100%;" v-model="requestData.remarks">
            </view>
        </view>

        <view class="section3" v-if="requestData.type">
            <view class="bottom">
                <view class="title">
                    上传凭证 <text style="color: #808080;">（最多3张）</text>
                </view>
                <view class="imgs">
                    <view class="up-img" @click="choosesImages()" v-if="requestData.pics.length < 3">
                        <i class="iconfont icon-ddx-shop-tubiaozhizuomoban"></i>
                        <view>添加图片</view>
                    </view>
                    <view class="img-show" v-for="(img, index) in requestData.pics" :key="index">
                        <image :src="img" mode="aspectFill" @click="previewImg(img, requestData.pics)"></image>
                        <view class="close iconfont icon-ddx-shop-close" @click="delImg(index)"></view>
                    </view>
                </view>
            </view>
        </view>

        <view class="my-submit" @click="mySubmint" v-if="requestData.type">
            提交
        </view>

        <!-- 选择退货原因  我的弹框-->
        <uni-popup ref="returns" type="top" :custom="true" v-if="returnOrderWhy.length">
            <view class="my-pop">
                <view class="item" v-for="(item, index) in returnOrderWhy" :key="index" @click="choosesReason(item.why)">
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
                // 多图上传 临时保存
                picList: [],

                orderGoodsData:{
                    attr_name: "",
                    deliver: "",
                    deliver_status: 1,
                    item_id: 0,
                    mold: "",
                    mold_id: 5,
                    num: 0,
                    pic: "",
                    real_price: "",
                    status: 1,
                    subtitle: "",
                },
                requestData:{
                    order_id:0,//订单id
                    goods_id:0,//商品明细id，子订单id
                    remarks:'',//说明
                    reason:'',//原因
                    type:'',//退单类型 1为退货  2 为退款
                    pic:'',//图片地址 已, 隔开
                    pics:[],//图片地址 数组
                },
                returnOrderWhy: [
                    {why: '订单信息拍错（规格/尺码/颜色等）', id:0 },
                    {why: '我不想要了', id:0 },
                    {why: '地址/电话信息填写错误', id:0 },
                    {why: '缺货', id:0 },
                    {why: '无理由退货', id:0 },
                ]
            }
        },
        async onLoad(){
            console.log("其他页面穿过来的参数：", this.$parseURL())
            this.orderGoodsData = this.$parseURL().goods
            this.requestData.order_id = this.$parseURL().order_id
            this.requestData.goods_id = this.$parseURL().goods.id
            await this.wxConfig();
        },
        methods: {
            //图片放大预览
            previewImg(src,urls){
                uni.previewImage({
                    indicator:'number',
                    current:src,
                    urls
                })
            },

            //上传图片
            choosesImages(){
                let _self = this
                _self.$wx.ready(() => {
                    _self.$wx.chooseImage({
                        count: 3 - _self.requestData.pics.length,
                        needResult: 1,
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: async function (data) {
                            // 返回选定照片的本地ID列表，data.localIds[0]可以作为img标签的src属性显示图片
                            _self.picList = data.localIds
                        },
                        fail: function (res) {
                            console.log(res)
                        }
                    })
                })
            },

            //多图上传
            async myUploadImg() {
                let _self = this
                let localId = _self.picList.pop()
                // 上传背面
                await _self.$wx.uploadImage({
                        localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 0, // 默认为1，显示进度提示
                        success: async function (res) {
                            await _self.$minApi.getFileFromWeChat({media_id: res.serverId}).then(res1 => {
                                if (res1.code === 200){
                                    _self.requestData.pics.push(res1.data.url)
                                }
                                _self.myUploadImg() // 调用自己
                            }).catch(err => {
                                console.log(err)
                                _self.myUploadImg()  // 调用自己
                            })
                        },
                        fail: function (error) {
                            console.log(error)
                        }
                })
            },

            //删除图片
            delImg(sIndex){
                this.requestData.pics.splice(sIndex,1)
            },

            //选择退货原因
            open(){
                this.$refs.returns.open()
            },
            choosesReason(text){
                this.requestData.reason = text
                this.$refs.returns.close()
            },

            //只退款或退货退款
            radioChange(evt) {
                this.requestData.type = evt.target.value
            },

            //提交申请
            async mySubmint(){
                if (this.requestData.type === ''){
                    this.msg('请选择是否退货')
                    return
                }
                if (this.requestData.reason === ''){
                    this.msg('请选择退款原因')
                    return
                }
                if (this.requestData.pics.length) {
                    this.requestData.pic = this.requestData.pics.join(",")
                }
                await this.$minApi.returnOrderGoodsApply(this.requestData).then(res => {
                    if(res.code  === 200){
                        this.msg("您的退货申请已提交，请耐心等待审核")
                        setTimeout(()=>{ uni.navigateBack() }, 1000)
                    }
                })
            },
        },

        components:{
            uniPopup,

        },
    }
</script>

<style lang="scss">
    @import "./return.scss";
    /* 选择服务类型 */
    .chooses-return-type{
        background: #fff;
        margin-top: 20upx;
        display: flex;
        flex-direction: column;
        .item-type{
            padding: 24upx $uni-spacing-row-base;
            border-bottom: 1px solid #F2F2F2;
            &:last-child{
                border: none;
            }
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            .one{
                display: flex;
                align-items: center;
                height: 70upx;
                .my-head{
                    height: 70upx;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin-right: 10upx;
                    .img{
                        height: 38upx;
                        width: 38upx;
                    }
                }
                .my-body{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 70upx;
                    .title{
                        color: $color-primary-plain;
                        font-size: $uni-font-size-base;
                    }
                    .my-content{
                        color: #808080;
                        font-size: $uni-font-size-sm;
                    }
                }

            }
            .two{
                height: 70upx;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .iconfont{
                    font-size: $uni-font-size-base;
                    color: #D4D4D4;
                }
            }
        }
    }

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
                color: #D4D4D4;
            }
        }
    }
</style>
