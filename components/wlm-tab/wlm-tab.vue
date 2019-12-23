<template>
    <scroll-view  scroll-x="true" :scroll-left="scrollLeft" :style="tabStyle">
        <div class="tab">
            <block  v-for="(item,index) in tabList" :key="index" :id="index">
            <div class="item" @click="tabSelect(index,$event)" >
                <span :style="tabCur === index ? selectTitleStyle : titleStyle" class="title">{{item.start_title}}</span>
                <span :style="tabCur === index ? selectSubTitleStyle : subTitleStyle" class="sub-title">{{item.status | statusToString}}</span>
                <span :style="tabCur === index ? selectThreeTitleStyle : threeTitleStyle" class="three-title">{{index | catgrayToString}}</span>
            </div>
            </block>
        </div>
    </scroll-view>
</template>

<script>
    export default {
        name: "wlm-tab",
        props:{
            tabList: {
                type: Array,
                default() {
                    return [];
                }
            },
            tabCur: {
                type: Number,
                default() {
                    return 0;
                }
            },
            selectTitleStyle: {
                type: String,
                default: ''
            },
            selectSubTitleStyle: {
                type: String,
                default: ''
            },
            titleStyle:{
                type: String,
                default: ''
            },
            subTitleStyle:{
                type: String,
                default: ''
            },
            threeTitleStyle:{
                type: String,
                default: ''
            },
            selectThreeTitleStyle:{
                type: String,
                default: ''
            },
            tabStyle:{
                type: String,
                default: ''
            },
        },
        methods: {
            tabSelect(index, e) {
                if (this.currentTab === index) return false;
                this.$emit('update:tabCur', index);
                this.$emit('change', index);
            }
        },
        computed: {
            scrollLeft() {
                return (this.tabCur - 1) * 60;
            }
        },
        filters:{
            //1：正在抢购，2即将开始，3已结束
            statusToString(status){
                let str = '即将开始'
                switch (status) {
                    case 1:
                        str = '正在疯抢'
                        break
                    case 2:
                        str = '即将开始'
                        break
                    case 3:
                        str = '已结束'
                        break
                }
                return str
            },
            // 0居家用品 粮油大米 母婴用品 童装童车
            catgrayToString(index){
                let str = '居家用品'
                switch (index) {
                    case 0:
                        str = '居家用品'
                        break
                    case 1:
                        str = '粮油大米'
                        break
                    case 2:
                        str = '母婴用品'
                        break
                    case 3:
                        str = '童装童车'
                        break
                }
                return str
            },
        }
    }
</script>

<style scoped lang="scss">
    div,
    scroll-view,
    swiper {
        box-sizing: border-box;
    }
    .text-color{
        color: $color-primary;
    }
    .tab{
        text-align: center;
        white-space: nowrap;
        height: 174upx;
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        .item{
            width: 20%;
            height: 100upx;
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
            justify-content: center;
            margin: 0 10upx;
            padding: 0 20upx;
            &:first-child{
                margin: 0;
                padding: 0;
            }
            .title{
                font-size: $uni-font-size-lg;
                color: #C0E8FB;
                width:120upx;
                height:36upx;
                line-height: 36upx;
                border-radius: 20upx;
                text-align: center;
            }
            .sub-title{
                font-size: $uni-font-size-sm - 2upx;
                color: #C0E8FB;
                width:120upx;
                height:36upx;
                line-height: 36upx;
                border-radius: 20upx;
                margin: 14upx 0;
            }
            .three-title{
                font-size: $uni-font-size-base;
                color: #C0E8FB;
                width:120upx;
                height:36upx;
                line-height: 36upx;
                border-radius: 20upx;
                text-align: center;
            }
        }
    }
</style>
