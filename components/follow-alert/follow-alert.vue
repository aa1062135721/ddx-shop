<template>
    <div class="follow-official-account-alert-box" v-if="!subscribe">
        <view class="box">
            <view class="logo">
                <image class="logo-img" :src="logoUrl"></image>
            </view>
            <view class="header-font" style="margin-top: 100upx;">
                亲爱的会员，为了保障您的账户安全，请先关注我们的公众号
            </view>
            <view class="qr-code">
                <image class="qr-code-img" :src="qrCodeUrl"></image>
            </view>
            <view class="footer-font" style="font-size: 26upx;">
                长按识别二维码关注公众号
            </view>
        </view>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import * as Constant from '@/utils/constant'

    export default {
        name: "follow-alert",
        computed: {
            ...mapState(['subscribe']),
            logoUrl: () => `${window.location.origin}/h5/static/images/pandalogo.png`,
            qrCodeUrl: () => {
                let url = ''
                switch (Constant.NODE_ENV) {
                    case 'development':
                        url = `${window.location.origin}/h5/static/images/main-qr-code1.jpg`
                        break
                    case 'production':
                        url = `${window.location.origin}/h5/static/images/main-qr-code.jpg`
                        break
                }
                return url
            }
        },
        created () {
            // console.log("是否关注公众号：", this.subscribe)
        },
    }
</script>

<style lang="scss">
    .follow-official-account-alert-box{
        z-index: 999999999;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,.5);
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .box{
            border-radius: 6upx;
            background: #FFFFFF;
            padding: 55upx;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            .logo{
                position: absolute;
                top: -100upx;
                left: 50%;
                margin-left: -100upx;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 200upx;
                height: 200upx;
                border-radius: 50%;
                background-color: #42BDD8;
                .logo-img{
                    width: 150upx;
                    height: 150upx;
                }
            }
            .qr-code{
                display: flex;
                justify-content: center;
                margin: 20upx 0;
                .qr-code-img{
                    height: 414upx;
                    width: 414upx;
                }
            }
            .header-font,.footer-font{
                width: 480upx;
                color: #333333;
                font-size:$uni-font-size-lg;
                text-align: center;
                font-weight:500;
            }
        }
    }
</style>
