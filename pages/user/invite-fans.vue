<template>
    <view class="invite-fans" :style="{backgroundImage:`url(${shareData.pic})`}">
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
    background-size: cover;
    background-repeat: no-repeat;
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
    }
}
</style>
