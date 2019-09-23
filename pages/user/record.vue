<template>
    <view>
        <wuc-tab :tab-list="tabList" :textFlex="true" :tabCur.sync="TabCur" tab-class="tabs"  select-class="tab-select" @change="tabChange"></wuc-tab>
        <view class="my-body">
            <view class="box">
                <view class="item" v-if="TabCur === 0" v-for="(item, index) in tabList[0].list" :key="index">
                    <view>
                        <view class="title">{{item.title}}</view>
                        <view class="sub-title">{{item.time}}</view>
                    </view>
                    <view>
                        <view class="price">{{item.money}}</view>
                        <view class="sub-price">{{item.state}}</view>
                    </view>
                </view>
                <view class="item"  v-if="TabCur === 1"  v-for="(item, index) in tabList[1].list" :key="index">
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
        <uni-load-more :status="tabList[TabCur].requestData.moreStatus" :show-icon="true"></uni-load-more>
    </view>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
    import WucTab from '@/components/wuc-tab/wuc-tab.vue'

    export default {
        name: "user_record",
        data(){
            return{
                tabList:[
                    {
                        cname: '提现记录',
                        state: 0,
                        requestData: {
                            page:1,
                            limit:10,
                            moreStatus: 'loading',
                        },
                        list:[],
                    },
                    {
                        cname: '收益记录',
                        state: 1,
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
        onLoad(){
            console.log("其他页面带过来的参数：",this.$parseURL())
            if (this.$parseURL().state){
                this.TabCur = this.$parseURL().state
            }
            this.loadData()
        },
        methods:{
            async tabChange(index) {
                this.TabCur = index
                await this.loadData()
            },
            async loadData(){
                this.tabList[this.TabCur].requestData.moreStatus = 'loading'
                let data ={
                    state: this.tabList[this.TabCur].state,
                    page: this.tabList[this.TabCur].requestData.page,
                    limit: this.tabList[this.TabCur].requestData.limit,
                }
                this.$minApi.profitList(data).then(res => {
                    if (res.code === 200) {
                        if (data.page === 1) {
                            this.tabList[this.TabCur].list = res.data
                        } else {
                            this.tabList[this.TabCur].list.push(...res.data)
                        }
                        if (res.data.length < data.limit){
                            this.tabList[this.TabCur].requestData.moreStatus = 'noMore'
                        } else {
                            this.tabList[this.TabCur].requestData.moreStatus = 'more'
                        }
                    }
                })
            },
        },
        async onReachBottom(){
            if (this.tabList[this.TabCur].requestData.moreStatus === 'noMore'){
                return
            }
            this.tabList[this.TabCur].requestData.page ++
            await this.loadData()
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
