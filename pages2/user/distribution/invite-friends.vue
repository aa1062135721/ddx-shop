<template>
    <div class="invite-friends" :style="{backgroundImage: 'url(' + bgImg + ')'}">
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "invite-friends", // 邀请好友成为分销员
        data() {
            return {
                bgImg: '', //背景图片地址
            }
        },
        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            // 返回按钮
            _goBack() {
                uni.navigateBack()
            },
        },
        onLoad() {
            this.$minApi.becomeADistributorGetBackGroundImg().then(res => {
                this.bgImg = res
            }).catch(err => {
                console.log(err)
            })

            // 如果是安卓平台 每次进入商品详情页面就会调用微信配置，自定义分享商品
            if ((this.getPlatform()).isAndroid){
                this.wxConfig()
            }
            let url = 'https://www.ddxm661.com/h5/pages2/user/distributor'
            if(this.userInfo.id) {
                url += `?&user_id=${this.userInfo.id}&user_name=${this.userInfo.nickname}`
            }

            let param1 = {
                    title: `捣蛋熊商城-邀请你成为分销员`, // 分享标题
                    desc: `高品质、一站式服务平台`, // 分享描述
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl:`${window.location.origin}/h5/static/images/pandalogo.png`, // 分享图标
                    success: function () {}
                },
                param2 = {
                    title: `捣蛋熊商城-邀请你成为分销员`, // 分享标题
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: `${window.location.origin}/h5/static/images/pandalogo.png`, // 分享图标
                    success: function () {}
                }
            this.wxConigShareGoods(param1, param2)
        },
        computed: {
            ...mapState(['userInfo']),
        },
    }
</script>

<style scoped lang="scss">
    .invite-friends{
        height: 100vh;
        width: 100vm;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>
