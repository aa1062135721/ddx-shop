<template>
    <view>
        <view class="my-tabs">
            <view class="items">
                <view class="item" :class="{'active' : chooseWho === 1}" @click="clickChangeWho(1)">分类</view>
                <view class="item" :class="{'active' : chooseWho === 2}" @click="clickChangeWho(2)">品牌</view>
            </view>
            <view v-if="chooseWho === 1">
                <mSearch  :show="true"></mSearch>
            </view>
        </view>

        <view class="category" v-if="chooseWho === 1">
            <view class="category-wrapper" v-if="catrgoryList.length>0">
                <!-- 左边导航 -->
                <scroll-view scroll-y="true" class="left-wrapper" scroll-with-animation="true" :scroll-top="left_scroll">
                    <view class="left-content">
                        <view class="title-content" :class="select_index === index?'onSelected':''" v-for="(title,index) in catrgoryList"
                              :key="title.id" @tap="choose(index)">{{title.name}}</view>
                    </view>
                </scroll-view>
                <!-- 右边内容 -->
                <scroll-view scroll-y="true" class="right-wrapper" scroll-with-animation="true" :scroll-top="right_scroll" @scroll="myscroll">
                    <view class="right-content">
                        <!-- 产品区 -->
                        <view class="product-wrapper">
                            <view class="category-item" :id="'list'+c_index" v-for="(c_item,c_index) in catrgoryList" :key="c_item.id">
                                <view class="category-title">
                                    <view class="hr"></view>
                                    {{c_item.name}}
                                    <view class="hr"></view>
                                </view>

                                <view class="category-content">
                                    <view class="product-item" v-for="(p_item,p_index) in c_item.content" :key="p_item.id">
                                        <image class="product-img" :src="p_item.thumb"></image>
                                        <text class="product-title">{{p_item.cname}}</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>

<script>
    import classifyData from './category'
    import mSearch from '@/components/search/mehaotian-search.vue'


    export default {
        data() {
            return {
                chooseWho:1,// 1=分类，2=品牌


                windows_height: 0, //屏幕高度
                catrgoryList: [],
                select_index: 0,
                right_height: [], //右侧每个内容的高度集合
                right_scroll: 0, //右侧的滑动值
                left_height: 0, //左侧总高度
                left_scroll: 0, //左侧滑动值
                last: 0,
            }
        },
        onLoad() {
            this.init();
            this.windows_height = uni.getSystemInfoSync().windowHeight;
        },
        methods: {
            clickChangeWho(key) {
                console.log(key)
                this.chooseWho = key
            },

            init() {
                this.catrgoryList = classifyData.list;
                this.$nextTick(() => {
                    this.getHeightList();
                })
            },
            getHeightList() {
                let _this = this;
                let selectorQuery = uni.createSelectorQuery();
                selectorQuery.select('.left-content').boundingClientRect(function(rects) {
                    console.log(rects)
                    _this.left_height = rects.height;
                });
                selectorQuery.selectAll('.category-item').boundingClientRect(function(rects) {
                    console.log(rects)
                    _this.right_height = rects.map((item) => item.top);
                    console.log(_this.right_height)
                }).exec();
            },
            choose(index) {
                if (this.select_index === index) {
                    return;
                }
                this.select_index = index;
                // 加入防抖
                if (this.timeout) {
                    clearTimeout(this.timeout); //清除计时器
                }
                this.timeout = setTimeout(() => {
                    this.right_scroll = this.right_height[index]-90;
                }, 300)
            },
            myscroll(e) {
                //引入节流
                let right_content_height = e.detail.scrollHeight - this.windows_height;
                if (right_content_height == e.detail.scrollTop) {
                    return;
                }
                let scroll_top = e.detail.scrollTop;
                //判断当前的scrollTop在哪个区间内;
                let now = +new Date();
                if (now - this.last > 100) {
                    this.last = now;
                    let active_index = this.right_height.findIndex((value, index, arr) => value <= scroll_top && scroll_top < arr[index + 1]);
                    this.select_index = active_index;
                    if (this.left_height - this.windows_height) {
                        //如果有超出部分
                        let diff = this.left_height - this.windows_height
                        this.left_scroll = Math.round((active_index * diff) / (this.catrgoryList.length - 1))
                    }
                }
            }
        },
        components: {
            mSearch,
        }
    }
</script>

<style lang="scss">

    .my-tabs{
        width: 100%;
        background: #ffffff;
        position: fixed;
        top: 0;
        left: 0;
        .items{
            display: flex;
            justify-content: center;
            .item{
                font-size: $uni-font-size-lg;
                color: $color-primary-plain;
                padding: 0 20upx;
                height: 90upx;
                line-height: 90upx;
                box-sizing: border-box;
                &.active{
                    color: $color-primary;
                    border-bottom: 4upx solid $color-primary;
                }
            }
        }
    }
    .category {
        position: fixed;
        width: 100%;
        top: 180upx;
        left: 0;
        bottom: 0;


        .category-wrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
            position: absolute;
            top: 0;
            bottom: 0;

            .left-wrapper {
                width: 200rpx;
                flex: 0 0 200rpx;
                background-color: #F2F2F2;

                .left-content {

                    .title-content {
                        width: 100%;
                        height: 100rpx;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 25rpx;

                        &.onSelected {
                            background-color: #fff;
                            position: relative;
                            color: $color-primary;

                            &::before {
                                content: '';
                                position: absolute;
                                left: 0;
                                top: 20%;
                                width: 6rpx;
                                height: 60%;
                                background: $color-primary;
                            }
                        }
                    }
                }
            }

            .right-wrapper {
                flex: 1;
                background: #fff;

                .right-content {
                    width: 100%;
                    /*padding: 20rpx 0;*/
                    box-sizing: border-box;

                    .product-wrapper {
                        .category-item {

                            .category-title {
                                font-size: 26rpx;
                                width: 100%;
                                height: 80upx;
                                line-height: 80upx;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                .hr{
                                    height: 2upx;
                                    width: 40upx;
                                    border-radius: 1upx;
                                    background: #E4E4E4;
                                    margin: 0 10upx;
                                }
                            }

                            .category-content {
                                display: flex;
                                flex-direction: row;
                                flex-flow: wrap;
                                padding: 20rpx 20rpx 0;


                                .product-item {
                                    width: 33%;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    align-items: center;
                                    margin-bottom: 20rpx;

                                    .product-img {
                                        width: 120rpx;
                                        height: 140rpx;
                                        margin-bottom: 10rpx;
                                    }

                                    .product-title {
                                        font-size: 23rpx;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    }
</style>
