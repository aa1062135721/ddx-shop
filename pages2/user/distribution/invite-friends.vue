<template>
    <div class="invite-friends">
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->
        <img :src="bgImg" alt="" style="width: 100%;height: 100%;">
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import * as Constant from '../../../utils/constant'

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
        async onLoad() {
            await this.wxConfig();

            this.$minApi.becomeADistributorGetBackGroundImg().then(res => {
                this.bgImg = res
            }).catch(err => {
                console.log(err)
            })

            let url = Constant[Constant.NODE_ENV].inviteFriends // 分享地址
            if(this.userInfo.id) {
                url += `?user_id=${this.userInfo.id}&user_name=${this.userInfo.nickname}`
            }
            url = Constant[Constant.NODE_ENV].shareRedirectURL + encodeURIComponent(url)
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
        width: 100vw;
        height: 100vh;
       overflow: hidden;
    }
</style>
