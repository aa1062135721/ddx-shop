<template>
    <div class="container">
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <div class="bg-image">
            <img class="img" src="../../static/images/distributor-banner.png" alt="">
        </div>

        <div class="share-info">
            <div class="share-info-item">欢迎加入<span style="color: #FC5A5A;">捣蛋熊猫</span>，请填写申请消息</div>
            <div class="share-info-item">
                <div class="user-info-item-label">邀请人：</div>
                <div class="input">{{inviter}}</div>
            </div>
        </div>
        <div class="user-info" v-show="showMobileInput">
            <div class="user-info-item">
                <div class="user-info-item-label">手机号</div>
                <input class="input" type="text" placeholder="请填写手机号码，方便联系" maxlength="11" v-model="mobile">
                <div class="my-code" @click="getCode">获取验证码</div>
            </div>
            <div class="user-info-item">
                <div class="user-info-item-label">验证码</div>
                <input class="input" type="text" placeholder="请填写验证码" maxlength="11" v-model="code">
            </div>
        </div>

        <div class="confirm-btn">
            <div class="btn" @click="goSubmit">申请成为分销员</div>
        </div>

        <div class="privilege">
            <div class="privilege-title">
                分销员特权
            </div>
            <div class="privilege-box">
                <div class="privilege-box-item">
                    <div class="left">
                        <div class="circle">1</div>
                    </div>
                    <div class="right">
                        自购省钱、分销赚钱。
                    </div>
                </div>
                <div class="privilege-box-item">
                    <div class="left">
                        <div class="circle">2</div>
                    </div>
                    <div class="right">
                        销售拿佣金
                        <br>成为分销员后卖出商品，您可以获得佣金。
                    </div>
                </div>
                <div class="privilege-box-item">
                    <div class="left">
                        <div class="circle">3</div>
                    </div>
                    <div class="right">
                        分销员的商品销售统一由公司直接发货，并提供产品的售后服务。
                    </div>
                </div>
            </div>
        </div>

        <div class="my-footer">
            最终解释权归重庆捣蛋熊科技有限公司所有
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions} from 'vuex'

    export default {
        name: "distributor", // 成为分销员
        data() {
          return {
                inviter: '无', // 邀请者昵称
                user_id: 0,// 邀请者id
                mobile: '',
                code: '', // 验证码
                showMobileInput: false, // 是否显示用户输入手机号和验证码框
                openid:'',
          }
        },
        methods: {
            ...mapMutations(['setToken', 'setSubscribe', 'setUserInfo', 'setShopID']),
            ...mapActions(['asyncGetUserInfo']),

            _goPage(url, query = {}) {
                this.$openPage({name: url, query})
            },
            // 返回按钮
            _goBack() {
                if (getCurrentPages().length === 1) {
                    this._goPage('home')
                } else {
                    uni.navigateBack()
                }
            },

            // 点击成为分销员
            async goSubmit(){
                let requestData = {
                    openid: this.openid,
                    user_id: this.user_id,
                }
                if (this.showMobileInput) {
                    if (!this.isPoneAvailable(this.mobile, true)) {
                        return
                    }
                    if (!this.isEmpty(this.code, '请输入验证码')) {
                        return
                    }
                    requestData.mobile = this.mobile
                    requestData.code = this.code
                }

                await this.$minApi.becomeADistributor2(requestData).then(res => {
                    if (res.code === 200){
                        this.msg(res.msg)
                        this.setSubscribe(res.data.subscribe)
                        setTimeout(()=>{
                            this._goPage('mine')
                        }, 1500)
                    } else {
                        this.msg(res.msg)
                    }
                }).catch(err => {
                    this.msg('服务器繁忙，请稍后重试!')
                    console.log(err)
                })
            },

            /**
             * 获取验证码
             */
            async getCode(){
                if (!this.isPoneAvailable(this.mobile, true)) {
                    return
                }
                await this.$minApi.loginSendCode({
                    mobile: this.mobile,
                    agreement: 1
                }).then(res => {
                    if (res.code === 200) {
                        this.msg(res.msg)
                    }
                })
            },
        },
        onLoad() {
            this.setSubscribe(1)
            const token = uni.getStorageSync('token')

            if (token) {
                this.setToken(token)
                this.asyncGetUserInfo()
            } else {
                let code = this.getUrlParam("code") //是否存在code
                if (code == null || code === "") {
                    //不存在就打开上面的地址进行授权
                    this.loginWithOfficalAccount()
                } else {
                    //存在则通过code传向后台
                    let data = { code: code, }
                    this.$minApi.codeJudgeOpenid(data).then(res => {
                        console.log(res)
                        // 获取openid失败
                        if (res.code === 100){
                            this._goPage('home')
                        }
                        // 不是分销商
                        if (res.code === 200){
                            this.openid = res.data.openid
                            // 用户没有注册
                            if (res.data.is_retail === 0) {
                                this.showMobileInput = true
                            }
                        }
                        // 是分销商
                        if(res.code === 333){
                            this._goPage('mine')
                        }
                    }).catch(err => {
                        console.log(err)
                        this.msg('系统繁忙！')
                    })
                }
            }

            if (this.$parseURL().user_id) {
                this.user_id = this.$parseURL().user_id
            }
            if (this.$parseURL().user_name) {
                this.inviter = this.$parseURL().user_name
            }
            console.log('其他页面带过来的参数 ：', this.$parseURL())
        },
        watch: {
            userInfo: function(newVal, oldVal) {
                // 是分销员 直接去到分销中心
                if (newVal.retail === 1){
                    this._goPage('user_distribution_redirect')
                }
                // 不是分销员
                if (newVal.retail === 0) {
                    this.openid = newVal.openid
                }
            }
        },
        computed: {
            ...mapState(['userInfo']),
        }
    }
</script>

<style scoped lang="scss">
    .container{
        font-size: $uni-font-size-base;
        .bg-image{
           display: block;
            background: #FFFFFF;
            .img{
                width: 100%;
            }
        }
        .share-info{
            @extend %border-color-solid-botton;
            padding: $uni-spacing-row-base;
            background-color: #FFFFFF;
            display: flex;
            flex-direction: column;
            font-size: $uni-font-size-base;
            .share-info-item{
                display: flex;
                justify-content: flex-start;
                .user-info-item-label{
                    width: 20%;
                }
                .input{
                    width: 60%;
                    font-size: $uni-font-size-base;
                }
                &:first-child{
                    margin-bottom: $uni-spacing-row-base;
                }
            }
        }
        .user-info{
            background-color: #fff;
            .user-info-item{
                @extend %border-color-solid-botton;
                &:last-child{
                    border-bottom: none;
                }
                display: flex;
                justify-content: flex-start;
                padding: $uni-spacing-row-base;
                .user-info-item-label{
                    width: 20%;
                }
                .input{
                    width: 60%;
                    font-size: $uni-font-size-base;
                }
                .my-code{
                    color: $color-primary;
                    font-size: 18upx;
                    padding:8upx 14upx;
                    text-align: center;
                    border:1px solid $color-primary;
                    border-radius:4px;
                }
            }
        }

        .confirm-btn{
            margin: $uni-spacing-row-base 0;
            padding: $uni-spacing-row-base;
            .btn{
                background: $color-primary;
                color: #FFFFFF;
                text-align: center;
                width: 100%;
                line-height:80upx;
                border-radius:4px;
            }
        }

        .privilege{
            background-color: #FFFFFF;
            .privilege-title{
                @extend %border-color-solid-botton;
                padding: $uni-spacing-row-base;
            }
            .privilege-box{
                padding: 0 $uni-spacing-row-base;
                .privilege-box-item{
                    display: flex;
                    align-items: center;
                    padding: $uni-spacing-row-base 0;
                    .left{
                        margin-right: 10upx;
                        .circle{
                            background: #000;
                            border-radius: 50%;
                            color: #FFFFFF;
                            width: 30upx;
                            text-align: center;
                            height: 30upx;
                            line-height: 30upx;
                            font-size: $uni-font-size-sm;
                        }
                    }
                    .right{

                    }
                }
            }
        }

        .my-footer{
            color: #999999;
            padding: 38upx 0;
            text-align: center;
            width: 100%;
        }
    }

</style>
