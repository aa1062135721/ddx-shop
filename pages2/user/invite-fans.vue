<template>
    <view class="invite-fans">
        <image src="../static/share-fans.png" style="width: 100%;" mode="widthFix"></image>
        <view class="share-image-box">
            <image class="img" :src="shareData.pic"></image>
            <view class="text">长按识别二维码</view>
        </view>
        <button class="btn" open-type="share">分享好友</button>
    </view>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "invite-fans",//邀请好友页面
        data(){
          return {
              //分享数据
              shareData:{
                  price:0,
                  pic:'',
              },
          }
        },
        methods:{
        },
        // 分享到朋友
        onShareAppMessage(res) {
            if (res.from === 'button') {// 来自页面内分享按钮
                console.log(res.target)
            }
            return {
                title: `分享好友得福利哦`,
                path: `pages/tabs/home?user_id=${this.userInfo.id}`
            }
        },
        onLoad(){
            if (!this.shareData.pic){
                let requestData = {
                    scene: `user_id=${this.userInfo.id}`,
                    page: 'pages/tabs/home',
                }
                this.$minApi.shareFriend(requestData).then(res => {
                    console.log("邀请好友：", res)
                    if (res.code === 200) {
                        this.shareData = res.data
                    }
                })
            }
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
    }
</script>

<style lang="scss">
.invite-fans{
    position: relative;
    width: 100vm;
    height: 100vh;
    overflow: hidden;
    background:linear-gradient(14deg,rgba(255,90,58,1) 0%,rgba(253,65,28,1) 100%);
    .share-image-box{
        background: #ffffff;
        width:436upx;
        height:568upx;
        border-radius:10upx;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -218upx;
        margin-top: -284upx;
        display: flex;
        padding-top: 114upx;
        padding-bottom: 70upx;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        .img{
            width:304upx;
            height:304upx;
            border:1upx solid rgba(238,238,238,1);
        }
        .text{
            font-size: $uni-font-size-base;
            text-align: center;
            width: 100%;
            color: #808080;
        }
    }
    .btn{
        position: absolute;
        bottom: 60upx;
        left: 50%;
        margin-left: -170upx;
        width:340upx;
        height:88upx;
        line-height: 88upx;
        background:#F9C22D;
        box-shadow:0 8upx 34upx 0 #8E210B;
        border-radius:44upx;
        text-align: center;
        color: #ffffff;
    }
}
</style>
