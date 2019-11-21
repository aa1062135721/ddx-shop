<template>
    <view>
        <view class="tps">
            <view class="box">
                <text class="iconfont icon-ddx-shop-icon_notice"></text>
                <text>请确保你上传的身份证姓名、身份证号、付款账号姓名、身份证号保持一致</text>
            </view>
        </view>
        <view class="grace-idcard-main">
            <view class="grace-idcard-text">
                身份证照片 ( 正面 )
            </view>
            <view class="grace-idcard-items">
                <view class="grace-idcard-uper-btn" @click="selectImg1">
                    <view class="img"><image src="../../static/images/camera.png" mode="widthFix"></image></view>
                    <view class="text">拍摄或选择照片</view>
                </view>
                <view class="grace-idcard-preview">
                    <img class="img" :src="idCard1"  @click="previewImg1">
                </view>
            </view>
            <view class="grace-idcard-text">
                身份证照片 ( 背面 )
            </view>
            <view class="grace-idcard-items">
                <view class="grace-idcard-uper-btn" @click="selectImg2">
                    <view class="img"><image src="../../static/images/camera.png" mode="widthFix"></image></view>
                    <view class="text">拍摄或选择照片</view>
                </view>
                <view class="grace-idcard-preview">
                    <img class="img" :src="idCard2" @click="previewImg2">
                </view>
            </view>
            <view style="margin-top:38upx;">
                <button type="primary" @tap="uploadCards" style="background: #FC5A5A;">上传</button>
            </view>
        </view>
    </view>
</template>

<script>
    var _self;
    export default {
        name: 'id-card-authentication',
        data() {
            return {
                //上次到自己服务器后返回的图片唯一 key
                responseData:{
                    idCard1: '',
                    idCard2: '',
                },

                idCard1 : '../static/idcard1.png',
                idCard2 : '../static/idcard2.png'
            }
        },
        onLoad:function(){
            // 如果是安卓平台 每次进入商品详情页面就会调用微信配置，自定义分享商品
            if ((this.getPlatform()).isAndroid){
                this.wxConfig()
            }
            _self = this
        },
        methods: {
            selectImg1 : function() {
                _self.$wx.chooseImage({
                        count: 1,
                        needResult: 1,
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: async function (data) {
                            // _self.idCard1 = data.localIds[0];   // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            // 上传背面
                            await _self.$wx.uploadImage({
                                localId: data.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: async function (res) {
                                    await _self.$minApi.getFileFromWeChat({media_id: res.serverId}).then(res1 => {
                                        if (res1.code === 200){
                                            _self.idCard1 = res1.data.url
                                            _self.responseData.idCard1 = res1.data.key
                                        }
                                    }).catch(err1 => {
                                        console.log(err1)
                                    })
                                },
                                fail: function (error) {
                                    console.log(error)
                                }
                            })
                        },
                        fail: function (res) {
                            console.log(res)
                        }
                })
            },
            selectImg2 : function() {
                    _self.$wx.chooseImage({
                        count: 1,
                        needResult: 1,
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: async function (data) {
                            // _self.idCard2 = data.localIds[0]   // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            // // 上传背面
                            await _self.$wx.uploadImage({
                                localId: data.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: async function (res) {
                                    await _self.$minApi.getFileFromWeChat({media_id: res.serverId}).then(res1 => {
                                        if (res1.code === 200){
                                            _self.idCard2 = res1.data.url
                                            _self.responseData.idCard2 = res1.data.key
                                        }
                                    }).catch(err1 => {
                                        console.log(err1)
                                    })
                                },
                                fail: function (error) {
                                    console.log(error)
                                }
                            })
                        },
                        fail: function (res) {
                            console.log(res)
                        }
                    })
            },
            previewImg1 : function(){
                if ( this.idCard1 !== '../static/idcard1.png' ){
                    uni.previewImage({
                        urls:[_self.idCard1]
                    });
                }
            },
            previewImg2 : function(){
                if (this.idCard2 !== '../static/idcard2.png'){
                    uni.previewImage({
                        urls:[_self.idCard2]
                    });
                }
            },
            uploadCards : async function(){
                if(this.responseData.idCard1 === '' || this.responseData.idCard2 === ''){
                    uni.showToast({title:"请上传身份证图片", icon:"none"});
                    return;
                }
                let requestData = {
                    front: _self.responseData.idCard1,
                    back: _self.responseData.idCard2,
                }
                /**
                 * 验证上传的图片是不是身份证
                 */
                await _self.$minApi.checkingIdCard(requestData).then(res => {
                    if (res.code === 200){
                        _self.$store.dispatch('asyncGetUserInfo') //异步更新用户信息
                        //返回
                        uni.navigateBack({
                            delta: 1,
                            success: function (res) {
                            },
                            fail: function (err) {
                            },
                            complete: function (ss) {
                            }
                        })
                    } else {
                        uni.showToast({title:"图片信息读取不成功，请重新规范拍摄上传", icon:"none"});
                    }
                })
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "id-card-authentication";
</style>
