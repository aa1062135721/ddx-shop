<template>
    <view class="container">
        <view class="text-area">
            <textarea class="text" :maxlength="-1" placeholder="请输入反馈内容，我们将不断改进" v-model="text"/>
        </view>
        <view class="mobile">
            <input type="text" style="width: 100%;" placeholder="留下联系方式便于我们联系您" v-model="mobile">
        </view>
        <view class="btns">
            <view class="btn" @click="goFeedback">提交</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "feedback",
        data() {
            return {
                text: '',
                mobile: '',
            }
        },
        methods: {
            goFeedback(){
                if (!this.mobile){
                    this.msg('请输入电话号码')
                    return
                }
                if (!this.text){
                    this.msg('请输入反馈内容')
                    return
                }
                let requestData = {
                    content: this.text,
                    mobile: this.mobile,
                }
                this.$minApi.postFeedback(requestData).then(res => {
                    if (res.code === 200){
                        this.msg("反馈成功")
                        setTimeout(()=>{ uni.navigateBack() }, 1000)
                    }
                })

            },
        }
    }
</script>

<style lang="scss">
.container{
    .text-area{
        background: #fff;
        padding: $uni-spacing-row-base;
        .text{
            width: 100%;
            height: 500upx;
            background: #EEEEEE;
            font-size: $uni-font-size-base;
            padding: $uni-spacing-row-sm;
        }
    }
    .mobile{
        margin-top: 40upx;
        width: 100%;
        padding: $uni-spacing-row-base;
        background: #ffffff;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: $uni-font-size-base;
    }
    .btns{
        margin-top: 40upx;
        padding: $uni-spacing-row-base;
       .btn{
           color: #ffffff;
           line-height:98upx;
           height:98upx;
           width: 100%;
           text-align: center;
           background: $color-primary;
           border-radius:4upx;
       }
    }

}
</style>
