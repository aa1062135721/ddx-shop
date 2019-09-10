<template>
    <view class="container">
        <view class="search">
            <mSearch v-model="searchVal" :show="true" @search="goSearch"></mSearch>
        </view>
        <view class="my-content">
            <view class="title">
                <view>
                    <text class="iconfont icon-ddx-shop-hot"></text> 热门搜索
                </view>
            </view>
            <view class="tags">
                <text class="tag" v-for="(item, index) in responseData.hot" @click="clickTag(item.title)" :key="index">{{item.title}}</text>
            </view>
        </view>
        <view class="my-content" v-if="responseData.history.length">
            <view class="title">
                <view>
                    <text class="iconfont icon-ddx-shop-time"></text> 历史搜索
                </view>
                <view>
                    <text class="iconfont icon-ddx-shop-del" @click="del"></text>
                </view>
            </view>
            <view class="tags">
                <text class="tag" v-for="(item, index) in responseData.history" @click="clickTag(item.title)" :key="index">{{item.title}}</text>
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
              responseData:{
                  hot:[
                      // {
                      //     id: 1,
                      //     title: "奶粉" //热搜名称
                      // },
                  ],
                  history:[
                      // {
                      //     id: 1,
                      //     title: "奶粉"
                      // },
                  ]
              }
          }
        },
        components: {
            mSearch,
        },
        methods:{
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            clickTag(val){
                console.log("选中",val)
                this.searchVal = val
                this._goPage('goods_search_redirect',{title:val})
            },
            goSearch(val){
                console.log(val)
                this._goPage('goods_search_redirect',{title:val})
                // console.log("返回页面，带上这个",val)
                // let _this = this
                // uni.navigateBack({
                //     delta: 1,
                //     success: function (res) {
                //     },
                //     fail: function (err) {
                //     },
                //     complete: function (ss) {
                //         _this.$eventHub.$emit('search_word', val);
                //     }
                // })
            },
            async del(){
                await this.$minApi.searchHistoryDel().then(res => {
                    if (res.code === 200){
                        this.responseData.history = []
                    }
                })
            }
        },
        async onShow(){
            await this.$minApi.searchHistoryOrHot().then(res => {
                if (res.code === 200){
                   this.responseData = res.data
                }
            })
        }
    }
</script>

<style  lang="scss">
    page{
        background: #fff;
    }
    .container{
        width: 100%;
        .search{
            border-bottom: none!important;
        }
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
