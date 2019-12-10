<template>
    <view class="container">
        <view class="input">
            <input type="number" placeholder="请输入您的手机号码" maxlength="11" v-model="mobile">
        </view>
        <view class="input input-flex">
            <input type="number" placeholder="请输入验证码" v-model="code" maxlength="8">
            <button class="seed-msg" size="mini" plain :class="{'on': canGetCode}" :disabled="!canGetCode" @click="getCode">获取验证码</button>
        </view>
        <view>
            <view class="btn" @click="login">登录</view>
        </view>
    </view>
</template>

<script>
    import {mapMutations, mapActions} from 'vuex'

    export default {
        name: "login-with-mobile",//微信公众号
        data(){
          return {
              mobile: '',
              code: '',
              canGetCode: false,
          }
        },
        onLoad(){
          console.log("带过来的参数",this.$parseURL())
        },
        methods:{
            ...mapMutations(['setToken']),
            ...mapActions(['asyncGetUserInfo']),
            async getCode(){
                if ( !this.isPoneAvailable(this.mobile, true) || !this.canGetCode){
                    return
                }
                await this.$minApi.loginSendCode({
                    mobile: this.mobile,
                    agreement: 1
                }).then(res => {
                    if (res.code === 200) {
                        this.canGetCode = false
                        this.msg(res.msg)
                    }
                })
            },
            async login(){
                if (this.isPoneAvailable(this.mobile, true) &&  this.code.length > 0) {
                    await this.$minApi.bindMobilePublic({
                        mobile: this.mobile,
                        code: this.code,
                        member: this.$parseURL().member,
                        user_id: uni.getStorageSync('shareID'),
                        shop_id: uni.getStorageSync('shopID'),
                    }).then(res => {
                        if (res.code === 200){
                            this.setToken(res.data.token) //保存用户token，并存vuex，永久存储
                            this.asyncGetUserInfo() //获取用户数据 并存vuex 临时存储
                            // 微信那边授权跳转回来的，携带了code
                            // https://ddxm661.com/h5/?code=23412341asdfasdf1341d&state=1#/pages/goods/detail?id=1140
                            // 把用户token存好了后，重定向一下，解决地址栏中有code, 支付出现页面未注册的情况。
                            window.location.href = window.location.href.substring(0, window.location.href.indexOf('h5/') + 3) + '#/pages/tabs/mine'
                        }
                    })
                }
            },
        },
        watch:{
            mobile(newData, oldData) {
                if (newData.length === 11){
                    if (this.isPoneAvailable(newData, true)) {
                        this.canGetCode = true
                    } else {
                        this.canGetCode = false
                    }
                    return
                }
                if (this.isPoneAvailable(newData)) {
                    this.canGetCode = true
                } else {
                    this.canGetCode = false
                }
            }
        },

    }
</script>

<style  lang="scss">
    page{
        background: #ffffff;
        font-size: $uni-font-size-base;
    }
    .container{
        padding: $uni-spacing-row-base;
        .input{
            height: 58px;
            @extend %border-color-solid-botton;
            display: flex;
            /*border: 1upx solid #000;*/
            align-items: center;
            input{
                width: 70%;
                /*border: 1upx solid red;*/
            }
            button{
                /*width: 30%;*/
            }
        }
        .input-flex{
            flex-direction: row;
            justify-content: space-between;
            align-content: center;
            align-items: center;

        }
        .seed-msg{
            color: #BABABA;
            font-size: $uni-font-size-sm;
            height:$uni-font-size-sm * 2;
            line-height: $uni-font-size-sm * 2;
            background: #ffffff;
            border:1upx solid #BABABA;
            border-radius:4upx;
            &.on{
                color: #FC5A5A;
                border-color: #FC5A5A;
            }
        }
        .btn{
            width: 100%;
            height: 100upx;
            line-height: 100upx;
            text-align: center;
            background: #FC5A5A;
            margin-top: 50upx;
            color: #ffffff;
            font-size: $uni-font-size-base;
            border-radius:2upx;
            &.on{
                opacity:0.5;
            }
        }
    }
</style>
