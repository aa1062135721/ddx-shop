<template>
    <view class="container">
        <view class="text-area">
            <textarea class="text" :maxlength="-1" placeholder="请输入反馈内容，我们将不断改进" v-model="text"/>
        </view>
        <view class="mobile">
            <view class="title">联系方式</view>
            <input type="text" placeholder="留下联系方式便于我们联系您" v-model="mobile">
        </view>
        <view class="btns">
            <view class="btn">提交</view>
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
        padding: $uni-spacing-row-base;
        background: #ffffff;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: $uni-font-size-base;
        .title{
            margin-right: 10upx;
        }
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
