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
                        <div style="color: #666666;font-size: 24upx;" v-if="item.attr_name">
                            规格：{{item.attr_name}}
                        </div>
                    </view>
                </view>
                <view class="goods-comment">
                    <view class="name">商品评价</view>
                    <view class="my-start">
                        <sunui-star :defaultStar="item.requestData.level" :maxStar="5"  :starSize='"1em"' :isTips="false" @changeStar="changeStar($event, index)" />
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
                        <image :src="img" mode="aspectFill" @click="previewImg(img, item.requestData.pics)"></image>
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
    import sunuiStar from "@/components/sunui-star/sunui-star.vue"

    export default {
        name: "order_evaluate",
        data(){
          return {
              // 多图上传 临时保存
              picList: [],
              goodsList:[]
          }
        },
        async onLoad(){
            await this.wxConfig();
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

                let _self = this
                _self.$wx.ready(() => {
                    _self.$wx.chooseImage({
                        count: 9 - _self.goodsList[index].requestData.pics.length,
                        needResult: 1,
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: async function (data) {
                            // 返回选定照片的本地ID列表，data.localIds[0]可以作为img标签的src属性显示图片
                            _self.picList = data.localIds
                            _self.myUploadImg(index)
                        },
                        fail: function (res) {
                            console.log(res)
                        }
                    })
                })
            },
            //多图上传
            async myUploadImg(index) {
                let _self = this
                let localId = _self.picList.pop();
                // 上传背面
                await _self.$wx.uploadImage({
                        localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 0, // 默认为1，显示进度提示
                        success: async function (res) {
                            await _self.$minApi.getFileFromWeChat({media_id: res.serverId}).then(res => {
                                if (res.code === 200){
                                    _self.goodsList[index].requestData.pics.push(res.data.url)
                                }
                                _self.myUploadImg(index)
                            }).catch(err => {
                                console.log(err)
                                _self.myUploadImg(index)
                            })
                        },
                        fail: function (error) {
                            console.log(error)
                        }
                    })
            },

            delImg(index, sIndex){
                console.log("下标：",index,sIndex)
                this.goodsList[index].requestData.pics.splice(sIndex,1)
            },
            // 评分
            changeStar: function(e, index) {
                console.log('curStar:', e.curStar)
                this.goodsList[index].requestData.level = e.curStar
            },
           async mySubmit(){
                let requestData = []

                this.goodsList.map((item) => {
                    let oRequest = {
                        level:0,//评分
                        order_id: this.$parseURL().data.id,//订单id
                        comment:'',//评论内容
                        goods_id: item.requestData.goods_id,//商品id
                        specs: item.requestData.specs,//规格参数
                        pic:'',//图片地址，用逗号相隔
                    }

                    if (item.requestData.level === 0) {
                        this.msg(`【${item.subtitle}】商品没有评分`)
                        return
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

                await requestData.map(async (item)=> {
                    await this.$minApi.addGoodsComment(item).then(res => {
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                })

                setTimeout(()=> {
                   uni.navigateBack()
                }, 400)
            },
        },
        components: {
            sunuiStar,
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
                justify-content: space-between;
                .name{
                    text-align: center;
                    width: 150upx;
                    color: $color-primary-plain;
                    font-size: $uni-font-size-lg;
                }
                .my-start{
                    width: calc(100% - 150upx)
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
