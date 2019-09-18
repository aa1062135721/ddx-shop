<template>
    <view>
        <wuc-tab :tab-list="tabList" :textFlex="true" :tabCur.sync="TabCur" tab-class="tabs"  select-class="tab-select" @change="tabChange"></wuc-tab>
        <view class="my-body">
            <view class="box">
                <view class="item">
                    <view>
                        <view class="title">订单收益</view>
                        <view class="sub-title">2019-08-12 8:20</view>
                    </view>
                    <view>
                        <view class="price">100.81</view>
                        <view class="sub-price">未到账</view>
                    </view>
                </view>
                <view class="item">
                    <view>
                        <view class="title">订单收益</view>
                        <view class="sub-title">2019-08-12 8:20</view>
                    </view>
                    <view>
                        <view class="price">100.81</view>
                        <view class="sub-price">已到账</view>
                    </view>
                </view>
                <view class="item">
                    <view>
                        <view class="title">订单收益</view>
                        <view class="sub-title">2019-08-12 8:20</view>
                    </view>
                    <view>
                        <view class="price">100.81</view>
                    </view>
                </view>
                <view class="item">
                    <view>
                        <view class="title">申请提现</view>
                        <view class="sub-title">2019-08-12 8:20</view>
                    </view>
                    <view>
                        <view class="price">100.81</view>
                        <view class="sub-price on">已到账</view>
                    </view>
                </view>
                <view class="item">
                    <view>
                        <view class="title">申请提现</view>
                        <view class="sub-title">2019-08-12 8:20</view>
                    </view>
                    <view>
                        <view class="price">100.81</view>
                        <view class="sub-price">申请中</view>
                    </view>
                </view>
                <view class="item">
                    <view>
                        <view class="title">申请提现</view>
                        <view class="sub-title">2019-08-12 8:20</view>
                    </view>
                    <view>
                        <view class="price">100.81</view>
                        <view class="sub-price">申请中</view>
                    </view>
                </view>
                <view class="item">
                    <view>
                        <view class="title">订单收益</view>
                        <view class="sub-title">2019-08-12 8:20</view>
                    </view>
                    <view>
                        <view class="price">100.81</view>
                    </view>
                </view>
                <view class="item">
                    <view>
                        <view class="title">申请提现</view>
                        <view class="sub-title">2019-08-12 8:20</view>
                    </view>
                    <view>
                        <view class="price">100.81</view>
                        <view class="sub-price on">已到账</view>
                    </view>
                </view>
                <view class="item">
                    <view>
                        <view class="title">申请提现</view>
                        <view class="sub-title">2019-08-12 8:20</view>
                    </view>
                    <view>
                        <view class="price">100.81</view>
                        <view class="sub-price">申请中</view>
                    </view>
                </view>
                <view class="item">
                    <view>
                        <view class="title">申请提现</view>
                        <view class="sub-title">2019-08-12 8:20</view>
                    </view>
                    <view>
                        <view class="price">100.81</view>
                        <view class="sub-price">申请中</view>
                    </view>
                </view>
            </view>
        </view>
        <uni-load-more :status="moreStatus" :show-icon="true"></uni-load-more>
    </view>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
    import WucTab from '@/components/wuc-tab/wuc-tab.vue'

    export default {
        name: "user_record",
        data(){
            return{
                moreStatus: 'loading',
                tabList:[
                    {
                        cname: '提现记录',
                        requestData: {
                            page:1,
                            limit:10,
                            moreStatus: 'loading',
                        },
                        list:[],
                    },
                    {
                        cname: '收益明细',
                        requestData: {
                            page:1,
                            limit:10,
                            moreStatus: 'loading',
                        },
                        list:[],
                    },
                ],
                TabCur:0,
            }
        },
        methods:{
            async tabChange(index) {
                this.TabCur = index
            },
        },
        components:{
            uniLoadMore,
            WucTab,

        },
    }
</script>

<style lang="scss">
    .tab-select{
        color: $color-primary;
        border-color: $color-primary;
        font-size: $uni-font-size-base;
    }
    .tabs{
        background: #ffffff;
        color: $color-primary-plain;
        font-size: $uni-font-size-base;
        text-align: center;
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
    }
    .my-body{
        background: #ffffff;
        margin-top: 100upx;
        width: 100%;
        .box{
            width: 100%;
            .item{
                font-size: $uni-font-size-base;
                color: $color-primary-plain;
                width: 100%;
                padding: 44upx $uni-spacing-row-base;
                display: flex;
                justify-content: space-between;
                @extend %border-color-solid-botton;
                &:last-child{
                    border: none;
                }
                .sub-title{
                    font-size: $uni-font-size-sm;
                    color: #808080;
                }
                .sub-price{
                    font-size: $uni-font-size-sm;
                    color: #808080;
                    &.on{
                        color: $color-primary-plain;
                    }
                }
            }
        }
    }
</style>
