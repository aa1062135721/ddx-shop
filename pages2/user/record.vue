<template>
    <view>
        <view class="my-body">
            <view class="box">
                <view class="item" v-for="(item, index) in list" :key="index">
                    <view>
                        <view class="title">{{item.title}}</view>
                        <view class="sub-title">{{item.time}}</view>
                    </view>
                    <view>
                        <view class="price">{{item.money}}</view>
                        <view class="sub-price">{{item.state}}</view>
                    </view>
                </view>
            </view>
        </view>
        <uni-load-more :status="requestData.moreStatus" :show-icon="true"></uni-load-more>
    </view>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
    import WucTab from '@/components/wuc-tab/wuc-tab.vue'

    export default {
        name: "user_record",//提现记录
        data(){
            return{
                requestData: {
                    page:1,
                    limit:10,
                    moreStatus: 'loading',
                },
                list:[],
            }
        },
        onLoad(){
            console.log("其他页面带过来的参数：",this.$parseURL())
            this.loadData()
        },
        methods:{
            async loadData(){
                this.requestData.moreStatus = 'loading'
                let data ={
                    state: 0,
                    page: this.requestData.page,
                    limit: this.requestData.limit,
                }
                this.$minApi.profitList(data).then(res => {
                    if (res.code === 200) {
                        if (data.page === 1) {
                            this.list = res.data
                        } else {
                            this.list.push(...res.data)
                        }
                        if (res.data.length < data.limit){
                            this.requestData.moreStatus = 'noMore'
                        } else {
                            this.requestData.moreStatus = 'more'
                        }
                    }
                })
            },
        },
        async onReachBottom(){
            if (this.requestData.moreStatus === 'noMore'){
                return
            }
            this.requestData.page ++
            await this.loadData()
        },
        components:{
            uniLoadMore,
            WucTab,

        },
    }
</script>

<style lang="scss">
    .my-body{
        background: #ffffff;
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
