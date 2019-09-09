<template>
    <view class="content">
        <view class="navbar">
            <view
                    v-for="(item, index) in navList" :key="index"
                    class="nav-item"
                    :class="{current: tabCurrentIndex === index}"
                    @click="tabClick(index)"
            >
                {{item.text}}
            </view>
        </view>
        <swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
            <swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
                <scroll-view
                        class="list-scroll-content"
                        scroll-y
                        @scrolltolower="loadData"
                >
                    <!-- 空白页 -->
                    <view v-if="tabItem.loaded === true && tabItem.orderList.length === 0">
                        暂无数据……
                    </view>

                    <!-- 订单列表 -->
                    <view class="car-list">
                        <view class="section" v-for="(item, key) in tabItem.orderList" :key="key" @click="goPage('order_detail',{id:item.id})">
                            <view class="shop-name">
                                <view>{{item.shop_name}}</view>
                                <view>订单状态</view>
                            </view>
                            <view class="goods" v-for="(goods, goods_key) in item.goods" :key="goods_key">
                                <view class="goods-img">
                                    <image class="img"  :src="goods.img"></image>
                                </view>
                                <view class="other">
                                    <view class="info">
                                        <view class="title">{{goods.title}}</view>
                                        <view class="specification">规格: <span v-for="(category, category_key) in goods.specification" :key="category_key">{{category}}</span></view>
                                    </view>
                                    <view class="money">
                                        <view class="money">
                                            ￥{{goods.price}}
                                        </view>
                                        <view class="num">
                                            X{{goods.in_stock}}
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="goods-operating">
                                <view class="title">共计 {{item.goods.length}}件商品 合计￥<text class="money">500</text></view>
                                <view class="btns">
                                    <view class="btn">按钮</view>
                                    <view class="btn">按钮</view>
                                    <view class="btn">按钮</view>
                                    <view class="btn">按钮</view>
                                </view>
                            </view>
                        </view>
                    </view>

                    <uni-load-more :status="tabItem.loadingType"></uni-load-more>

                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

    export default {
        components: {
            uniLoadMore
        },
        data() {
            return {
                tabCurrentIndex: 0,
                navList: [
                    {
                        state: 0,
                        text: '全部',
                        loadingType: 'more',
                        orderList: [
                            {
                                id:100,
                                shop_name:'江与城店',
                                shop_id:1,
                                goods:[
                                    {title: '我是商品1法第三方的的方法第三方',img:'../../static/images/goods.jpg',stock:8,price:10.88,in_stock:1,specification:['8*23','个'],is_checked:false},
                                    {title: '我是商品1法第三方的的方法第三方',img:'../../static/images/goods.jpg',stock:8,price:90.98,in_stock:2,specification:['8*23','个'],is_checked:true},
                                    {title: '我是商品1法第三方的的方法第三方',img:'../../static/images/goods.jpg',stock:8,price:50.28,in_stock:3,specification:['8*23','个'],is_checked:false},
                                ]
                            },
                            {
                                id:100,
                                shop_name:'爱情海店',
                                shop_id:1,
                                goods:[
                                    {title: '我是爱情海店的商品',img:'../../static/images/goods.jpg',stock:8,price:80.08,in_stock:4,specification:['8*23','个'],is_checked:true},
                                ]
                            },
                        ]
                    },
                    {
                        state: 1,
                        text: '待付款',
                        loadingType: 'more',
                        orderList: []
                    },
                    {
                        state: 2,
                        text: '待发货',
                        loadingType: 'more',
                        orderList: []
                    },
                    {
                        state: 3,
                        text: '待收货',
                        loadingType: 'more',
                        orderList: []
                    },
                    {
                        state: 4,
                        text: '待评价',
                        loadingType: 'more',
                        orderList: []
                    },
                ],
            };
        },

        onLoad(){

        },

        methods: {
            goPage(url,query = {}){
                this.$openPage({name: url, query: query})
            },
            //获取订单列表
            loadData(source){
                //这里是将订单挂载到tab列表下
                let index = this.tabCurrentIndex;
                let navItem = this.navList[index];
                let state = navItem.state;

                if(source === 'tabChange' && navItem.loaded === true){
                    //tab切换只有第一次需要加载数据
                    return;
                }
                if(navItem.loadingType === 'loading'){
                    //防止重复加载
                    return;
                }

                navItem.loadingType = 'loading';

                setTimeout(()=>{
                    let orderList = [
                        {
                            id:100,
                            shop_name:'江与城店',
                            shop_id:1,
                            goods:[
                                {title: '我是商品1法第三方的的方法第三方',img:'../../static/images/goods.jpg',stock:8,price:10.88,in_stock:1,specification:['8*23','个'],is_checked:false},
                                {title: '我是商品1法第三方的的方法第三方',img:'../../static/images/goods.jpg',stock:8,price:90.98,in_stock:2,specification:['8*23','个'],is_checked:true},
                                {title: '我是商品1法第三方的的方法第三方',img:'../../static/images/goods.jpg',stock:8,price:50.28,in_stock:3,specification:['8*23','个'],is_checked:false},
                            ]
                        },
                    ]
                    orderList.forEach(item=>{
                        navItem.orderList.push(item);
                    })
                    //loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
                    this.$set(navItem, 'loaded', true);

                    //判断是否还有数据， 有改为 more， 没有改为noMore
                    navItem.loadingType = 'more';
                }, 600);
            },

            //swiper 切换
            changeTab(e){
                this.tabCurrentIndex = e.target.current;
                this.loadData('tabChange');
            },
            //顶部tab点击
            tabClick(index){
                this.tabCurrentIndex = index;
            },
        },
    }
</script>

<style lang="scss">
    page, .content{
        height: 100%;
    }
    .swiper-box{
        height: calc(100% - 40px);
    }
    .list-scroll-content{
        height: 100%;
    }
    .navbar{
        display: flex;
        height: 40px;
        padding: 0 5px;
        background: #fff;
        box-shadow: 0 1px 5px rgba(0,0,0,.06);
        position: relative;
        z-index: 10;
        .nav-item{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            font-size: 15px;
            color: $color-primary-plain;
            position: relative;
            &.current{
                color: $color-primary;
                &:after{
                    content: '';
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    transform: translateX(-50%);
                    width: 44px;
                    height: 0;
                    border-bottom: 2px solid $color-primary;
                }
            }
        }
    }
    .car-list{
        padding-top: $uni-spacing-col-lg;
        padding-bottom: $uni-spacing-col-lg * 4;
        .section{
            background: #fff;
            margin-bottom: $uni-spacing-col-lg;
            .shop-name{
                display: flex;
                justify-content: space-between;
                @extend %border-color-solid-botton;
                padding: $uni-spacing-row-sm;
                color: #000000;
                font-size: $uni-font-size-lg;
            }
            .goods{
                @extend %border-color-solid-botton;
                &:last-child{
                    border-bottom:none ;
                }
                display: flex;
                margin: auto;
                justify-content: space-between;
                padding: $uni-spacing-row-sm;
                width: calc(100% - 10px);
                height: 23.5%;
                .chooses{
                    display: flex;
                    align-items:center;
                    margin-right: $uni-spacing-row-sm;
                }
                .goods-img{
                    margin-right: $uni-spacing-row-sm;
                    .img{
                        width: 200upx;
                        height: 200upx;
                        border-radius: $uni-border-radius-sm;
                    }
                }
                .other{
                    width: 75%;
                    display: flex;
                    flex-direction:row;
                    justify-content: space-between;
                    .info{
                        display: flex;
                        flex-direction:column;
                        width: 70%;
                        .title{
                            @extend %overflow-2-line;
                            color: #1A1A1A;
                            font-size: $uni-font-size-base;
                        }
                        .specification{
                            color: #808080;
                            font-size: $uni-font-size-sm;
                        }
                    }
                    .money{
                        width: 30%;
                        color: #808080;
                        .money{
                            color: #1A1A1A;
                            font-size:$uni-font-size-base;
                        }
                        .num{
                            font-size: $uni-font-size-sm;
                        }
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                    }
                }
            }
            .goods-operating{
                padding: $uni-spacing-row-sm;
                text-align: right;
                font-size: $uni-font-size-base;
                color: $color-primary-plain;
                .title{
                    .money{
                        font-size: $uni-font-size-lg;
                    }
                }
                .btns{
                    margin-top: 10upx;
                    display: flex;
                    justify-content: flex-end;
                    .btn{
                        font-size: $uni-font-size-base;
                        border-radius:8upx;
                        background: #fff;
                        border: 1upx solid #D2D2D2;
                        margin: 0 $uni-spacing-col-sm;
                        padding: $uni-spacing-col-sm $uni-spacing-row-sm;
                        &:last-of-type{
                            margin: 0;
                        }
                    }
                }
            }
        }
    }
</style>
