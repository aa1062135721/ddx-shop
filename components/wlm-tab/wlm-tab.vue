<template>
    <scroll-view  scroll-x="true" :scroll-left="scrollLeft" :style="tabStyle">
        <div class="tab">
            <block  v-for="(item,index) in tabList" :key="index" :id="index">
            <div class="item" @tap="tabSelect(index,$event)" >
                <span :style="tabCur === index ? selectTitleStyle : ''" class="title" :class="titleClass">{{item.name}}</span>
                <span :style="tabCur === index ? selectSubTitleStyle : ''" class="sub-title" :class="subTitleClass">{{item.sub_title}}</span>
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
            titleClass: {
                type: String,
                default: ''
            },
            subTitleClass: {
                type: String,
                default: ''
            },
            selectTitleStyle: {
                type: String,
                default: ''
            },
            selectSubTitleStyle: {
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
        height: 100upx;
        display: flex;
        width: 100%;
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
            .title{
                font-size: $uni-font-size-lg;
                color: #1A1A1A;
            }
            .sub-title{
                font-size: $uni-font-size-sm - 2upx;
                color: #808080;
            }
        }
    }
</style>
