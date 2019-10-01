<template>
    <view class="container">
        <view class="input">
            <input type="number" placeholder="请输入原手机号码" maxlength="11" v-model="oldMobile">
        </view>
        <view class="input">
            <input type="number" placeholder="请输入新手机号码" maxlength="11" v-model="mobile">
        </view>
        <view class="input input-flex">
            <input type="number" placeholder="请输入验证码" v-model="code" maxlength="8">
            <button class="seed-msg" size="mini" plain :class="{'on': canGetCode}" :disabled="!canGetCode" @click="getCode">获取验证码</button>
        </view>
        <view>
            <view class="btn" :class="{'on': (!canGetCode) || (code.length === 0)}" @click="modify">修改</view>
        </view>
    </view>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "user_modify-mobile",
        data(){
          return{
              oldMobile: '',
              mobile: '',
              code: '',
              canGetCode: false,
          }
        },
        onLoad(){
            console.log("带过来的参数",this.$parseURL())
        },
        methods:{
            ...mapActions(['saveToken', 'saveUserInfo']),
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
            async modify(){
                if (this.oldMobile !== this.userInfo.mobile){
                    this.msg('原手机号不正确')
                    return
                }
                if (this.isPoneAvailable(this.mobile, true) &&  this.code.length > 0) {
                    await this.$minApi.modifyMobile({
                        mobile: this.mobile,
                        code: this.code,
                    }).then(res => {
                        if (res.code === 200) {
                            this.msg(res.msg)
                            this.$minApi.getUserInfo().then(userInfo => {
                                if (userInfo.code === 200) {
                                    this.saveUserInfo(userInfo.data)
                                    uni.navigateBack({
                                        delta: 1
                                    })
                                }
                            })
                        }
                    })
                }
            },
        },
        watch:{
            oldMobile(newData, oldData) {
                if (newData.length === 11){
                    if (!this.isPoneAvailable(newData)) {
                        this.msg('原手机号格式不正确')
                    }
                }
            },
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
        computed: {
            ...mapGetters(['userInfo'])
        },
    }
</script>

<style lang="scss">
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
