<template>
    <view>
        <view class="section">
            <view class="left">
                <image class="img" :src="orderGoodsData.pic"></image>
            </view>
            <view class="right">
                <view class="title">{{orderGoodsData.subtitle}}</view>
                <view class="other">{{orderGoodsData.attr_name}}</view>
            </view>
        </view>

        <view class="section2">
            <view class="chooses-why">
                <radio-group @change="radioChange">
                    <!-- 退单类型 1为退货  2 为退款-->
                    <label><radio value="2" :checked="requestData.type === '2'"  color="#FC5A5A" style="transform:scale(0.7)" />退款（无需退货）</label>
                    <label><radio value="1" :checked="requestData.type === '1'" color="#FC5A5A" style="transform:scale(0.7)"  />退款退货</label>
                </radio-group>
            </view>
            <view class="chooses-why2" @click="open">
                <view>退款原因</view>
                <view class="chooses-ba">{{requestData.reason || '请选择'}} <text class="iconfont icon-ddx-shop-content_arrows"></text></view>
            </view>
        </view>

        <view class="section2">
            <view class="chooses-why" style="justify-content: flex-start;">
                退款金额：<text style="color: #FC5A5A;">￥{{orderGoodsData.real_price * orderGoodsData.num}}</text>
            </view>
            <view class="chooses-why2">
                <input type="text" placeholder="退款说明（选填）" style="width: 100%;" v-model="requestData.remarks">
            </view>
        </view>

        <view class="section3">
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

        <view class="my-submit" @click="mySubmint">
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
                orderGoodsData:{
                    attr_name: "",
                    deliver: "已发货",
                    deliver_status: 1,
                    item_id: 276,
                    mold: "熊猫自营",
                    mold_id: 5,
                    num: 1,
                    pic: "http://picture.ddxm661.com/ef473201909291639357921.png",
                    real_price: "14.80",
                    status: 1,
                    subtitle: "重粮 有机荞麦米 400g",
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
                    {why: '不想要了', id:0 },
                    {why: '其他', id:0 },
                    {why: '没有钱了', id:0 },
                    {why: '一个字，穷', id:0 },
                ]
            }
        },
        onLoad(){
            console.log("其他页面穿过来的参数：", this.$parseURL())
            this.orderGoodsData = this.$parseURL().goods
            this.requestData.order_id = this.$parseURL().order_id
            this.requestData.goods_id = this.$parseURL().goods.id
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
                let _that = this
                uni.chooseImage({
                    count:3 - _that.requestData.pics.length,
                    success:async (res) =>{
                        _that.upLoadFiles(res.tempFilePaths)
                    }
                })
            },
            async upLoadFiles(data){
                let _that = this
                data.map(async (item) => {
                    await uni.uploadFile({
                        url: _that.$minApi.urls.upload,
                        filePath: item,
                        fileType: 'image',
                        name: 'file',
                        success: async (uploadFileRes1) => {
                            if("string" === typeof uploadFileRes1.data){
                                if (JSON.parse(uploadFileRes1.data).code === 200) {
                                    _that.requestData.pics.push(JSON.parse(uploadFileRes1.data).data.url)
                                }
                            }else{
                                if (uploadFileRes1.data.code === 200) {
                                    _that.requestData.pics.push(uploadFileRes1.data.data.url)
                                }
                            }
                        },
                        fail: function (err) {
                        }
                    })
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
