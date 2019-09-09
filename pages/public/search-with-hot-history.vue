<template>
    <view class="container">
        <view class="search">
            <mSearch  mode=2 v-model="searchVal" :show="true" @search="goSearch"></mSearch>
        </view>
        <view class="my-content">
            <view class="title">
                <view>
                    <text class="iconfont icon-ddx-shop-hot"></text> 热门搜索
                </view>
            </view>
            <view class="tags">
                <text class="tag" @click="clickTag('iphone X')">iphone X</text>
                <text class="tag" @click="clickTag('iphone XS max')">iphone XS max</text>
                <text class="tag" @click="clickTag('华为')">华为</text>
                <text class="tag" @click="clickTag('荣耀手机')">荣耀手机</text>
                <text class="tag" @click="clickTag('智博会')">智博会</text>
            </view>
        </view>
        <view class="my-content">
            <view class="title">
                <view>
                    <text class="iconfont icon-ddx-shop-time"></text> 历史搜索
                </view>
                <view>
                    <text class="iconfont icon-ddx-shop-del"></text>
                </view>
            </view>
            <view class="tags">
                <text class="tag" @click="clickTag('iphone X')">iphone X</text>
                <text class="tag" @click="clickTag('iphone XS max')">iphone XS max</text>
                <text class="tag" @click="clickTag('华为')">华为</text>
                <text class="tag" @click="clickTag('荣耀手机')">荣耀手机</text>
                <text class="tag" @click="clickTag('智博会')">智博会</text>
            </view>
        </view>
    </view>
</template>

<script>
    import mSearch from '@/components/search/mehaotian-search.vue'

    export default {
        name: "search-with-hot-history",
        data(){
          return {
              searchVal: '',
          }
        },
        components: {
            mSearch,
        },
        methods:{
            clickTag(val){
                console.log("选中",val)
                this.searchVal = val
            },
            goSearch(val){
                console.log("返回页面，带上这个",val)
                let _this = this
                uni.navigateBack({
                    delta: 1,
                    success: function (res) {
                    },
                    fail: function (err) {
                    },
                    complete: function (ss) {
                        _this.$eventHub.$emit('search_word', val);
                    }
                })
            },
        },
    }
</script>

<style  lang="scss">
    page{
        background: #fff;
    }
    .container{
        width: 100%;
        /*.search{*/
        /*    border-bottom: none!important;*/
        /*}*/
        .my-content{
            padding: $uni-spacing-row-base;
            .title{
                color: #808080;
                font-size: $uni-font-size-lg;
                display: flex;
                justify-content: space-between;
                .iconfont{
                    font-size: $uni-font-size-base;
                    margin-right: 6upx;
                }
            }
            .tags{
                padding: $uni-spacing-row-base;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: flex-start;
                text{
                    background: #fff;
                    border: 1upx solid #D2D2D2;
                    color: #000000;
                    font-size: $uni-font-size-base;
                    margin-right: 20upx;
                    margin-bottom: 20upx;
                    padding:10upx 24upx;
                }
            }
        }
    }
</style>
