<template>
    <view>
        <view class="my-tabs">
            <view class="items">
                <view class="item" :class="{'active' : chooseWho === 1}" @click="clickChangeWho(1)">分类</view>
                <view class="item" :class="{'active' : chooseWho === 2}" @click="clickChangeWho(2)">品牌</view>
                <view class="item" :class="{'active' : chooseWho === 3}" @click="clickChangeWho(3)">摩登汽车</view>
            </view>
            <view v-if="chooseWho === 1">
                <mSearch  :show="false" v-model="searchVal" @search="goSearch"></mSearch>
            </view>
        </view>

        <view class="category" v-if="chooseWho === 1">
            <view class="category-wrapper" v-if="catrgoryList.length>0">
                <!-- 左边导航 -->
                <scroll-view scroll-y="true" class="left-wrapper" scroll-with-animation="true">
                    <view class="left-content">
                        <view class="title-content" :class="{'onSelected': select_index === index}" v-for="(title, index) in catrgoryList"
                              :key="index" @click="choose(index)">{{title.cname}}</view>
                    </view>
                </scroll-view>
                <!-- 右边内容 -->
                <scroll-view scroll-y="true" class="right-wrapper" scroll-with-animation="true">
                    <view class="right-content">
                        <!-- 产品区 -->
                        <view class="product-wrapper">
                                <view class="category-item">
                                    <block v-for="(twoItem, twoIndex) in catrgoryList[select_index].child" :key="twoIndex">
                                        <block v-if="twoItem.child.length">
                                            <view class="category-title">
                                                <view class="hr"></view>
                                                {{twoItem.cname}}
                                                <view class="hr"></view>
                                            </view>
                                            <view class="category-content">
                                                <view class="product-item" v-for="(threeItem,threeIndex) in twoItem.child" :key="threeIndex"  @click="clickItem(threeItem)">
                                                    <image class="product-img" :src="threeItem.thumb"></image>
                                                    <text class="product-title">{{threeItem.cname}}</text>
                                                </view>
                                            </view>
                                        </block>
                                        <block v-else>
                                            <view class="category-content">
                                                <view class="product-item" @click="clickItem(twoItem)">
                                                    <image class="product-img" :src="twoItem.thumb"></image>
                                                    <text class="product-title">{{twoItem.cname}}</text>
                                                </view>
                                            </view>
                                        </block>
                                    </block>
                                </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>

        <view class="city-select" v-if="chooseWho === 2">
            <scroll-view :scroll-top="right_scroll" scroll-y="true" class="city-select-main" id="city-select-main">
                <!-- 热门品牌 -->
                <view class="hot-brand" id="city-letter-hot" v-if="brandArr[0].name === 'hot' && brandArr[0].data.length">
                    <view class="title">热门品牌</view>
                    <view class="box">
                        <view class="item" v-for="(item, index) in brandArr[0].data" :key="index" @click="clickBrand(item)">
                            <image :src="item.thumb"></image>
                            <text>{{item.title}}</text>
                        </view>
                    </view>
                </view>
                <view class="citys">
                    <view v-for="(item, index) in brandArr" :key="index">
                        <block v-if="item.name !== 'hot' && item.data.length">
                            <view class="citys-item-letter" :id="'city-letter-'+item.name">{{item.name}}</view>
                            <view class="citys-item" v-for="(ite, inx) in item.data" :key="inx"  @click="clickBrand(ite)">
                                <image :src="ite.thumb"></image><text>{{ite.title}}</text>
                            </view>
                        </block>
                    </view>
                </view>
            </scroll-view>
            <!-- 城市选择索引-->
            <view class="city-indexs-view">
                <view class="city-indexs">
                    <block  v-for="(item, index) in brandArr" :key="index" >
                        <view @click="cityindex(item.name)" v-if="item.data.length">
                            {{item.name === 'hot' ? '#' : item.name}}
                        </view>
                    </block>
                </view>
            </view>
        </view>

        <view class="city-select" v-if="chooseWho === 3">
            <scroll-view :scroll-top="right_scroll_car" scroll-y="true" class="city-select-main" id="city-select-main">
                <!-- 热门品牌 -->
                <view class="hot-brand" id="city-letter-hot" v-if="brandArr_car[0].name === 'hot' && brandArr_car[0].data.length">
                    <view class="title">热门品牌</view>
                    <view class="box">
                        <view class="item" v-for="(item, index) in brandArr_car[0].data" :key="index" @click="clickBrandCar(item)">
                            <image :src="item.thumb"></image>
                            <text>{{item.title}}</text>
                        </view>
                    </view>
                </view>
                <view class="citys">
                    <view v-for="(item, index) in brandArr_car" :key="index">
                        <block v-if="item.name !== 'hot' && item.data.length">
                            <view class="citys-item-letter" :id="'city-letter-car-'+item.name">{{item.name}}</view>
                            <view class="citys-item" v-for="(ite, inx) in item.data" :key="inx"  @click="clickBrandCar(ite)">
                                <image :src="ite.thumb"></image><text>{{ite.title}}</text>
                            </view>
                        </block>
                    </view>
                </view>
            </scroll-view>
            <!-- 城市选择索引-->
            <view class="city-indexs-view">
                <view class="city-indexs">
                    <block  v-for="(item, index) in brandArr_car" :key="index" >
                        <view @click="cityindexCar(item.name)" v-if="item.data.length">
                            {{item.name === 'hot' ? '#' : item.name}}
                        </view>
                    </block>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import mSearch from '@/components/search/mehaotian-search.vue'

    export default {
        data() {
            return {
                chooseWho:1,// 1=分类，2=品牌  3=摩登汽车

                searchVal: '',//搜索的内容

                // 分类
                catrgoryList: [],
                // catrgoryList: [
                //     {
                //         id: 195,  //一级分类id
                //         cname: "爸爸首选",    //一级标题
                //         thumb: "",
                //         cate_id: 0,
                //         child: [  //一级分类下的二级分类合集
                //             {
                //                 id: 197,  //二级分类id
                //                 cname: "爸爸第二选",  //二级分类标题
                //                 thumb: "http://picture.ddxm661.com/80fdc201910231109423799.jpg",  //二级分类的图标 ，必有
                //                 cate_id: 0,
                //                 child: []     //三级分类，有可能有三级分类，三级分类下的图标也必有
                //             }
                //         ]
                //     },
                //     {
                //         id: 193,
                //         cname: "妈妈一选",
                //         thumb: "",
                //         cate_id: 0,
                //         child: [
                //             {
                //                 id: 196,
                //                 cname: "妈妈二选2",
                //                 thumb: "http://picture.ddxm661.com/30cb5201910231010121190.jpg",
                //                 cate_id: 0,
                //                 child: []
                //             },
                //             {
                //                 id: 196,
                //                 cname: "妈妈二选2",
                //                 thumb: "http://picture.ddxm661.com/30cb5201910231010121190.jpg",
                //                 cate_id: 0,
                //                 child: [
                //                     {
                //                         id: 196,
                //                         cname: "妈妈二选2",
                //                         thumb: "http://picture.ddxm661.com/30cb5201910231010121190.jpg",
                //                         cate_id: 0,
                //                         child: []
                //                     },                            {
                //                         id: 196,
                //                         cname: "妈妈二选2",
                //                         thumb: "http://picture.ddxm661.com/30cb5201910231010121190.jpg",
                //                         cate_id: 0,
                //                         child: []
                //                     },
                //                     {
                //                         id: 196,
                //                         cname: "妈妈二选2",
                //                         thumb: "http://picture.ddxm661.com/30cb5201910231010121190.jpg",
                //                         cate_id: 0,
                //                         child: []
                //                     },
                //                 ]
                //             },
                //             {
                //                 id: 196,
                //                 cname: "妈妈二选2",
                //                 thumb: "http://picture.ddxm661.com/30cb5201910231010121190.jpg",
                //                 cate_id: 0,
                //                 child: []
                //             },
                //             {
                //                 id: 196,
                //                 cname: "妈妈二选2",
                //                 thumb: "http://picture.ddxm661.com/30cb5201910231010121190.jpg",
                //                 cate_id: 0,
                //                 child: []
                //             },
                //             {
                //                 id: 196,
                //                 cname: "妈妈二选2",
                //                 thumb: "http://picture.ddxm661.com/30cb5201910231010121190.jpg",
                //                 cate_id: 0,
                //                 child: []
                //             },
                //             {
                //                 id: 194,
                //                 cname: "妈妈二选",
                //                 thumb: "http://picture.ddxm661.com/9bb26201910231008408671.jpg",
                //                 cate_id: 0,
                //                 child: [
                //                     {
                //                         id: 198,
                //                         cname: "妈妈三选",
                //                         thumb: "http://picture.ddxm661.com/11fdd201910231110383458.jpg",
                //                         cate_id: 0,
                //                         child: []
                //                     },
                //                     {
                //                         id: 198,
                //                         cname: "妈妈三选",
                //                         thumb: "http://picture.ddxm661.com/11fdd201910231110383458.jpg",
                //                         cate_id: 0,
                //                         child: []
                //                     },
                //                     {
                //                         id: 198,
                //                         cname: "妈妈三选",
                //                         thumb: "http://picture.ddxm661.com/11fdd201910231110383458.jpg",
                //                         cate_id: 0,
                //                         child: []
                //                     },
                //                     {
                //                         id: 198,
                //                         cname: "妈妈三选",
                //                         thumb: "http://picture.ddxm661.com/11fdd201910231110383458.jpg",
                //                         cate_id: 0,
                //                         child: []
                //                     },
                //                     {
                //                         id: 198,
                //                         cname: "妈妈三选",
                //                         thumb: "http://picture.ddxm661.com/11fdd201910231110383458.jpg",
                //                         cate_id: 0,
                //                         child: []
                //                     },
                //                     {
                //                         id: 198,
                //                         cname: "妈妈三选",
                //                         thumb: "http://picture.ddxm661.com/11fdd201910231110383458.jpg",
                //                         cate_id: 0,
                //                         child: []
                //                     },
                //                     {
                //                         id: 198,
                //                         cname: "妈妈三选",
                //                         thumb: "http://picture.ddxm661.com/11fdd201910231110383458.jpg",
                //                         cate_id: 0,
                //                         child: []
                //                     },
                //                     {
                //                         id: 198,
                //                         cname: "妈妈三选",
                //                         thumb: "http://picture.ddxm661.com/11fdd201910231110383458.jpg",
                //                         cate_id: 0,
                //                         child: []
                //                     },
                //                 ]
                //             }
                //         ]
                //     }
                // ],
                select_index: 0,// 选中当前分类的下标


                // 品牌
                brandArr: [],
                // brandArr: [
                //     {
                //         name: "hot",
                //         data: [
                //             {
                //                 id: 3,
                //                 title: "啊啊啊啊啊啊啊啊",
                //                 tag: "A",
                //                 is_hot: 1,
                //                 thumb: "http://picture.ddxm661.com/0e5f5201910231336273784.jpg"
                //             },
                //             {
                //                 id: 6,
                //                 title: "次",
                //                 tag: "C",
                //                 is_hot: 1,
                //                 thumb: "http://picture.ddxm661.com/edcc020191023133725850.jpg"
                //             },
                //             {
                //                 id: 3,
                //                 title: "啊啊",
                //                 tag: "A",
                //                 is_hot: 1,
                //                 thumb: "http://picture.ddxm661.com/0e5f5201910231336273784.jpg"
                //             },
                //             {
                //                 id: 6,
                //                 title: "次",
                //                 tag: "C",
                //                 is_hot: 1,
                //                 thumb: "http://picture.ddxm661.com/edcc020191023133725850.jpg"
                //             },
                //             {
                //                 id: 3,
                //                 title: "啊啊",
                //                 tag: "A",
                //                 is_hot: 1,
                //                 thumb: "http://picture.ddxm661.com/0e5f5201910231336273784.jpg"
                //             },
                //             {
                //                 id: 6,
                //                 title: "次",
                //                 tag: "C",
                //                 is_hot: 1,
                //                 thumb: "http://picture.ddxm661.com/edcc020191023133725850.jpg"
                //             }
                //         ]
                //     },
                //     {
                //         name: "A",
                //         data: [
                //             {
                //                 id: 2,
                //                 title: "阿迪",
                //                 tag: "A",
                //                 is_hot: 0,
                //                 thumb: "http://picture.ddxm661.com/d77ba201910231335515970.jpg"
                //             },
                //             {
                //                 id: 3,
                //                 title: "啊啊",
                //                 tag: "A",
                //                 is_hot: 1,
                //                 thumb: "http://picture.ddxm661.com/0e5f5201910231336273784.jpg"
                //             }
                //         ]
                //     },
                //     {
                //         name: "B",
                //         data: [
                //             {
                //                 id: 1,
                //                 title: "布谷鸟",
                //                 tag: "B",
                //                 is_hot: 0,
                //                 thumb: "http://picture.ddxm661.com/ae642201910231336048958.jpg"
                //             },
                //             {
                //                 id: 4,
                //                 title: "布尔",
                //                 tag: "B",
                //                 is_hot: 0,
                //                 thumb: "http://picture.ddxm661.com/b3a7f20191023133645838.jpg"
                //             }
                //         ]
                //     },
                //     {
                //         name: "C",
                //         data: [
                //             {
                //                 id: 5,
                //                 title: "册",
                //                 tag: "C",
                //                 is_hot: 0,
                //                 thumb: "http://picture.ddxm661.com/3e1e4201910231337121369.jpg"
                //             },
                //             {
                //                 id: 6,
                //                 title: "次",
                //                 tag: "C",
                //                 is_hot: 1,
                //                 thumb: "http://picture.ddxm661.com/edcc020191023133725850.jpg"
                //             }
                //         ]
                //     },
                //     {
                //         name: "D",
                //         data: []
                //     }
                // ],
                right_scroll: 0, //滑动值

                // 摩登汽车
                brandArr_car: [],
                right_scroll_car: 0, //滑动值
            }
        },
        onLoad() {
            // 获取分类
            this.$minApi.getCategory().then(res => {
                console.log('获取分类：', res)
                if (res.code === 200) {
                    this.catrgoryList =  res.data
                }
            }).catch(err => {
                console.log(err)
            })

            // 获取品牌
            this.$minApi.getBrand({type: 1}).then(res => {
                console.log('获取品牌：', res)
                if (res.code === 200) {
                    this.brandArr =  res.data
                }
            }).catch(err => {
                console.log(err)
            })

            // 摩登汽车
            this.$minApi.getBrand({type: 2}).then(res => {
                console.log('获取品牌：', res)
                if (res.code === 200) {
                    this.brandArr_car =  res.data
                }
            }).catch(err => {
                console.log(err)
            })
        },
        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            // 分类 品牌之间的切换
            clickChangeWho(key) {
                console.log(key)
                this.chooseWho = key
            },

            //每个分类之间的 切换
            choose(index) {
                console.log(index)
                this.select_index = index;
            },
            // 单个分类被点击
            clickItem(item){
                console.log(item)
                this._goPage('goods_search', {title: item.cname, id: item.id})
            },

            // 品牌 索引点击
            cityindex(id) {
                //创建节点查询器
                const query = uni.createSelectorQuery().in(this);
                let that = this;
                that.right_scroll = 0;
                //滑动到指定位置(解决方法:重置到顶部，重新计算，影响:页面会闪一下)
                setTimeout(() => {
                    query.select('#city-letter-' + id).boundingClientRect(data => {
                        console.log("得到布局位置信息" + JSON.stringify(data));
                        let statusbarHeight = 0;
                        //APP内还要计算状态栏高度
                        // #ifdef APP-PLUS
                        statusbarHeight = plus.navigator.getStatusbarHeight()
                        // #endif
                        let headerHeight = uni.upx2px(90);
                        that.right_scroll = data.top - headerHeight - statusbarHeight;
                    }).exec();
                }, 100);
            },
            //品牌被点击
            clickBrand(item){
                console.log(item)
                this._goPage('goods_search', {brand: item.id, title: item.title})
            },

            // 品牌 索引点击
            cityindexCar(id) {
                //创建节点查询器
                const query = uni.createSelectorQuery().in(this);
                let that = this;
                that.right_scroll_car = 0;
                //滑动到指定位置(解决方法:重置到顶部，重新计算，影响:页面会闪一下)
                setTimeout(() => {
                    query.select('#city-letter-car-' + id).boundingClientRect(data => {
                        console.log("得到布局位置信息" + JSON.stringify(data));
                        let statusbarHeight = 0;
                        //APP内还要计算状态栏高度
                        // #ifdef APP-PLUS
                        statusbarHeight = plus.navigator.getStatusbarHeight()
                        // #endif
                        let headerHeight = uni.upx2px(90);
                        that.right_scroll_car = data.top - headerHeight - statusbarHeight;
                    }).exec();
                }, 0);
            },
            //品牌被点击
            clickBrandCar(item){
                console.log(item)
                this._goPage('goods_search', {brand: item.id, title: item.title})
            },

            //跳转到搜索商品页面
            goSearch(val){
                console.log(val)
                this._goPage('goods_search',{title:val})
            },
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
                    /* #ifdef H5 */
                    padding-bottom: var(--window-bottom);
                    /* #endif */
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
                    /* #ifdef H5 */
                    padding-bottom: var(--window-bottom);
                    /* #endif */
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
                                    height: 1px;
                                    width: 40upx;
                                    border-radius: 1px;
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

    .city-select {
        position: relative;
        top: 90upx;
        width: 100vw;
        height: calc(100vh - 90upx);
        background: #F6F5FA;
        //宽度转换vw
        @function vww($number) {
            @return ($number / 375)*750+rpx;
        }

        view {
            box-sizing: border-box;
        }


        .city-select-main {
            position: relative;
            // overflow: scroll;
            // -webkit-overflow-scrolling: touch;
            width: 100%;
            height: 100%;
            /* #ifdef H5 */
            height: calc(100% - var(--window-bottom));
            /* #endif */
            background: #F6F5FA;
            // overflow-y: auto;

            /*热门品牌*/
            .hot-brand{
                background: #FFFFFF;
                padding: $uni-spacing-col-base;
                .title{
                    width: 100%;
                    margin: 1%;
                    color: $color-primary-plain;
                    font-size: $uni-font-size-base;
                }
                .box{
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    .item{
                        box-sizing: border-box;
                        border: 1px solid #F2F2F2;
                        margin: 1%;
                        width: 23%;
                        height: 164upx;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        overflow: hidden;
                        align-items: center;
                        image{
                            height: 100upx;
                            width: 100upx;
                        }
                        text{
                            @extend %overflow-1-line;
                            width: 100upx;
                            font-size: $uni-font-size-sm;
                            text-align: center;
                        }
                    }
                }
            }

            .citys {
                > view {
                    padding-left: vww(18);
                    width: 100%;
                    font-size: 14px;
                    background: #FFF;

                    .citys-item-letter {
                        margin-left: vww(-18);
                        padding-left: vww(18);
                        margin-top: -1px;
                        width: 100vw;
                        line-height: vww(30);
                        font-size: $uni-font-size-base;
                        color: $color-primary-plain;
                        background: #F2F2F2;
                        border-top: none;
                    }

                    .citys-item {
                        width: 100%;
                        line-height: vww(50);
                        color: $color-primary-plain;
                        border-bottom: 1px solid #EBEBF0;
                        display: flex;
                        align-items: center;
                        image{
                            width: 60upx;
                            height: 60upx;
                            margin-right: 20upx;
                        }
                        &:last-child {
                            border: none;
                        }
                    }
                }
            }
        }


        .city-indexs-view {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: vww(20);
            height: calc(100% - var(--window-bottom));
            text-align: center;

            .city-indexs {
                width: vww(20);
                text-align: center;
                vertical-align: middle;
                align-self: center;

                > view {
                    width: vww(20);
                    font-size: $uni-font-size-base;
                    color: $color-primary-plain;
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
</style>
