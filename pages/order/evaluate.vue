<template>
    <view>
        <view class="goods" v-for="(item, index) in goodsList" :key="index">
            <view class="top">
                <view class="goods-info">
                    <view class="goods-img">
                        <image :src="item.pic"></image>
                    </view>
                    <view class="goods-title">
                        {{item.subtitle}}
                    </view>
                </view>
                <view class="goods-comment">
                    <view class="name">商品评价</view>
                    <view>
                        <uni-rate  max="5" size="18" :value="item.requestData.level" active-color="#FC5A5A" :is-fill="true" @change="changeRate($event, index)"></uni-rate>
                    </view>
                </view>
            </view>
            <view class="bottom">
                <textarea class="text" :maxlength="-1" placeholder="亲,收到的宝贝满意吗？说说您对商品的使用心得" v-model="item.requestData.comment"/>
                <view class="imgs">
                    <view class="up-img" @click="choosesImages(index)" v-if="item.requestData.pics.length < 9">
                        <i class="iconfont icon-ddx-shop-tubiaozhizuomoban"></i>
                        <view>添加图片</view>
                    </view>
                    <view class="img-show" v-for="(img, imgIndex) in item.requestData.pics" :key="imgIndex">
                        <image :src="img" mode="widthFix" @click="previewImg(img, item.requestData.pics)"></image>
                        <view class="close iconfont icon-ddx-shop-close" @click="delImg(index, imgIndex)"></view>
                    </view>
                </view>
            </view>
        </view>

        <view class="my-submit" @click="mySubmit">
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
              goodsList:[]
          }
        },
        onLoad(){
            console.log('其他页面带过来的参数：', this.$parseURL())
            let myData = []
            this.$parseURL().data.item_list.map((goods, index) => {
                let requestData = {
                    level:0,//评分
                    comment:'',//评论内容
                    pics:[],//商品被评论的图片地址
                    goods_id: goods.id,//商品明细id
                    specs: goods.attr_name,//规格参数
                }
                goods.requestData = requestData
                myData.push(goods)
            })
            this.goodsList = myData
            console.log("组合成自己想要的格式：",this.goodsList)
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
            async choosesImages(index){
                console.log("下标：",index)
                let _that = this
                await uni.chooseImage({
                    count:9 - _that.goodsList[index].requestData.pics.length,
                    success:async (res) =>{
                        console.log(res)
                        _that.upLoadFiles(index, res.tempFilePaths)
                    }
                })
            },
            async upLoadFiles(index, data){
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
                                    _that.goodsList[index].requestData.pics.push(JSON.parse(uploadFileRes1.data).data.url)
                                }
                            }else{
                                if (uploadFileRes1.data.code === 200) {
                                    _that.goodsList[index].requestData.pics.push(uploadFileRes1.data.data.url)
                                }
                            }
                        },
                        fail: function (err) {
                        }
                    })
                })
            },
            delImg(index, sIndex){
                console.log("下标：",index,sIndex)
                this.goodsList[index].requestData.pics.splice(sIndex,1)
            },
            //评分
            changeRate(e,index){
                console.log(e, index)
                this.goodsList[index].requestData.level = e.value
            },
            mySubmit(){
                console.log(this.goodsList)
                let requestData = []
                this.goodsList.map((item) => {
                    let oRequest = {
                        level:0,//评分
                        comment:'',//评论内容
                        goods_id: item.requestData.goods_id,//商品id
                        specs: item.requestData.specs,//规格参数
                        pic:'',//图片地址，用逗号相隔
                    }

                    if (!item.requestData.level) {
                        this.msg(`【${item.subtitle}】商品没有评分`)
                    }
                    oRequest.level = item.requestData.level

                    if (!item.requestData.comment) {
                        this.msg(`请输入【${item.subtitle}】商品的评论`)
                        return
                    }
                    oRequest.comment = item.requestData.comment

                    if (item.requestData.pics.length) {
                        oRequest.pic = item.requestData.pics.join(",")
                    }

                    requestData.push(oRequest)
                })

                if (requestData.length === this.goodsList.length){
                    console.log("要提交的数据",requestData)
                    requestData.map((item, index)=> {
                        this.$minApi.addGoodsComment(item).then(res => {
                            console.log(res)
                            if (index === requestData.length){
                                uni.navigateBack()
                            }
                        })
                    })
                } else {
                    console.log("请完善数据后在提交")
                }
            },
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
                        color: $color-primary;
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
