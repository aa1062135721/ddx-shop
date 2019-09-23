<template>
    <view>
        <view class="section">
            <view class="item" v-for="(item, index) in fansData" :key="index">
                <view class="head">
                    <image class="img" :src="item.pic"></image>
                    <view class="tag" v-if="item.istop">推荐人</view>
                </view>
                <view class="info">
                    <view class="name">{{item.nickname}}</view>
                    <view class="other">手机：{{item.phone}}</view>
                    <view class="other">{{item.createtime}}</view>
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
                moreStatus: 'loading',
                requestData: {
                  page: 1,
                  limit: 10,
                },
                fansData: []
            }
        },
        onLoad(){
          this.loadData()
        },
        methods: {
            async loadData(){
                this.moreStatus = 'loading'
                let data = {
                    page: this.requestData.page,
                    limit: this.requestData.limit,

                }
                this.$minApi.fansList(data).then(res => {
                    console.log('粉丝列表：',res)
                    if (res.code === 200) {
                        if (data.page === 1) {
                            this.fansData = res.data
                        } else {
                            this.fansData.push(...res.data)
                        }
                        if (res.data.length < data.limit){
                            this.moreStatus = 'noMore'
                        } else {
                            this.moreStatus = 'more'
                        }
                    }
                })
            },

        },
        onReachBottom(){
            if (this.moreStatus === 'noMore') {
                return
            }
            this.requestData.page ++
            this.loadData()
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
