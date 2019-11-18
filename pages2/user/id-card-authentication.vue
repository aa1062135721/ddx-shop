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
                <view class="grace-idcard-uper-btn" @tap="selectImg1">
                    <view class="img"><image src="../../static/images/camera.png" mode="widthFix"></image></view>
                    <view class="text">拍摄或选择照片</view>
                </view>
                <view class="grace-idcard-preview">
                    <image :src="idCard1"  @tap="previewImg1"></image>
                </view>
            </view>
            <view class="grace-idcard-text">
                身份证照片 ( 背面 )
            </view>
            <view class="grace-idcard-items">
                <view class="grace-idcard-uper-btn" @tap="selectImg2">
                    <view class="img"><image src="../../static/images/camera.png" mode="widthFix"></image></view>
                    <view class="text">拍摄或选择照片</view>
                </view>
                <view class="grace-idcard-preview">
                    <image :src="idCard2" @tap="previewImg2"></image>
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
                idCard1 : '../static/idcard1.png',
                idCard2 : '../static/idcard2.png'
            }
        },
        onLoad:function(){
            _self = this
        },
        methods: {
            selectImg1 : function() {
                uni.chooseImage({
                    count:1,
                    success:function(res){
                        _self.idCard1 = res.tempFilePaths[0];
                    }
                })
            },
            selectImg2 : function() {
                uni.chooseImage({
                    count:1,
                    success:function(res){
                        _self.idCard2 = res.tempFilePaths[0];
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
            uploadCards : function(){
                if(this.idCard1 === '../static/idcard1.png' || this.idCard2 === '../static/idcard2.png'){
                    uni.showToast({title:"请选择身份证照片", icon:"none"});
                    return;
                }
                //图片上传成功后返回的信息
                let checkingIdCardData = {
                    front: '',
                    back: ''
                }

                // 因底层限制一次上传一个
                uni.showLoading({title:"上传中"});
                // 上传正面
                let uploadTask1 = uni.uploadFile({
                    url: _self.$minApi.urls.upload,
                    filePath: _self.idCard1,
                    fileType: 'image',
                    name: 'file',
                    success: function (uploadFileRes1) {
                        // 上传成功后返回服务器端保存的路径
                        console.log(uploadFileRes1.data)

                        if("string" === typeof uploadFileRes1.data){
                            if (JSON.parse(uploadFileRes1.data).code === 200) {
                                checkingIdCardData.front =  JSON.parse(uploadFileRes1.data).data.key
                            }
                        }else{
                            if (uploadFileRes1.data.code === 200) {
                                checkingIdCardData.front = uploadFileRes1.data.data.key
                            }
                        }

                        // 上传背面
                        var uploadTask2 = uni.uploadFile({
                            url: _self.$minApi.urls.upload,
                            filePath: _self.idCard2,
                            fileType: 'image',
                            name: 'file',
                            success: function (uploadFileRes2) {
                                // 上传成功后返回服务器端保存的路径
                                console.log(uploadFileRes2.data);
                                if("string" === typeof uploadFileRes2.data){
                                    if (JSON.parse(uploadFileRes2.data).code === 200) {
                                        checkingIdCardData.back =  JSON.parse(uploadFileRes2.data).data.key
                                    }
                                }else{
                                    if (uploadFileRes2.data.code === 200) {
                                        checkingIdCardData.back = uploadFileRes2.data.data.key
                                    }
                                }
                                /**
                                 * 验证上传的图片是不是身份证
                                 */
                                _self.$minApi.checkingIdCard(checkingIdCardData).then(res => {
                                    console.log(res)
                                    if (res.code === 200){
                                        _self.$store.dispatch('asyncGetUserInfo')
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
                                    uni.hideLoading()
                                })

                                // 至此2张照片上传完毕
                            },
                            fail: function (err) {
                                console.log(err)
                                uni.hideLoading()
                            }
                        });
                    },
                    fail: function (err) {
                        console.log(err)
                        uni.hideLoading()
                    }
                });
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "id-card-authentication";
</style>
