<template>
    <view>
        <view class="grace-idcard-main">
            <view class="grace-idcard-text">
                身份证照片 ( 正面 )
            </view>
            <view class="grace-idcard-items">
                <view class="grace-idcard-uper-btn" @click="previewImg1">
                    <view class="img"><image src="../../static/images/camera.png" mode="widthFix"></image></view>
                    <view class="text">单击查看大图</view>
                </view>
                <view class="grace-idcard-preview">
                    <img class="img" v-if="!idCard1" src="../../static/images/idcard1.png">
                    <img class="img" v-else :src="idCard1"  @click="previewImg1">
                </view>
            </view>
            <view class="grace-idcard-text">
                身份证照片 ( 背面 )
            </view>
            <view class="grace-idcard-items">
                <view class="grace-idcard-uper-btn" @click="previewImg2">
                    <view class="img"><image src="../../static/images/camera.png" mode="widthFix"></image></view>
                    <view class="text">单击查看大图</view>
                </view>
                <view class="grace-idcard-preview">
                    <img class="img" v-if="!idCard2" src="../../static/images/idcard2.png">
                    <img class="img" v-else :src="idCard2" @click="previewImg2">
                </view>
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
                idCard1 : '',
                idCard2 : ''
            }
        },
        onLoad:function(){
            _self = this
            this.$minApi.getAttestation().then(res => {
                console.log(res)
                if (res.code === 200) {
                    this.idCard1 = res.data.front
                    this.idCard2 = res.data.back
                }
            })
        },
        methods: {
            // 返回按钮
            _goBack() {
                uni.navigateBack()
            },
            previewImg1 : function(){
                    uni.previewImage({
                        urls:[_self.idCard1]
                    });
            },
            previewImg2 : function(){
                    uni.previewImage({
                        urls:[_self.idCard2]
                    });
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "id-card-authentication";
</style>
