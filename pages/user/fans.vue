<template>
    <view>
        <view class="section">
            <view class="item">
                <view class="head">
                    <image class="img" src="../../static/images/goods.jpg"></image>
                    <view class="tag">推荐人</view>
                </view>
                <view class="info">
                    <view class="name">吴黎明大帅哥</view>
                    <view class="other">手机：156****0845</view>
                    <view class="other">2019-09-05 16:14:23</view>
                </view>
            </view>
            <view class="item">
                <view class="head">
                    <image class="img" src="../../static/images/goods.jpg"></image>
                </view>
                <view class="info">
                    <view class="name">吴黎明大帅哥</view>
                    <view class="other">手机：156****0845</view>
                    <view class="other">2019-09-05 16:14:23</view>
                </view>
            </view>
        </view>
        <uni-load-more :status="moreStatus" :show-icon="true"></uni-load-more>
    </view>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）

    export default {
        name: "user_fans",
        data() {
            return {
                moreStatus: 'noMore',
            }
        },
        methods: {

        },
        components: {
            uniLoadMore,
        },

    }
</script>

<style lang="scss">
.section{
    margin-top: $uni-spacing-row-lg;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    .item{
        padding: 34upx $uni-spacing-row-base;
        width: 100%;
        height: 168upx;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        @extend %border-color-solid-botton;
        &:last-child{
            border: none;
        }
        .head{
            position: relative;
            width:100upx;
            height: 100upx;
            margin-right: 40upx;
            .img{
                height: 100%;
                width: 100%;
                border-radius: 50%;
                box-shadow:0upx 0upx 20upx #aaa;
            }
            .tag{
                position: absolute;
                bottom: -10upx;
                left: 0;
                width: 100%;
                height: 36upx;
                line-height: 36upx;
                text-align: center;
                background: $color-primary;
                font-size: $uni-font-size-sm;
                color: #ffffff;
                border-radius:36upx;
            }
        }
        .info{
            height: 100%;
            width: calc(100% - 100upx - 40upx - 40upx);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .name{
                color: #1A1A1A;
                font-size: $uni-font-size-lg;
            }
            .other{
                color: #666666;
                font-size: $uni-font-size-base;
            }
        }
    }
}
</style>
