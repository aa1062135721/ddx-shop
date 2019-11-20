<template>
    <view>
        <view class="navbar">
            <view
                    v-for="(item, index) in navList" :key="index"
                    class="nav-item"
                    :class="{current: tabCurrentIndex === index}"
                    @click="tabClick(index)">
                {{item.text}}
            </view>
        </view>


        <view class="title-bar">
            <view class="btns">
                <view class="btn" :class="{'on': navList[tabCurrentIndex].btnIndex === 1}" @click="changeBtnIndex(1)">全部</view>
                <view class="btn" :class="{'on': navList[tabCurrentIndex].btnIndex === 2}" @click="changeBtnIndex(2)">今日</view>
                <view class="btn" :class="{'on': navList[tabCurrentIndex].btnIndex === 3}" @click="changeBtnIndex(3)">昨日</view>
                <view class="btn" :class="{'on': navList[tabCurrentIndex].btnIndex === 4}" @click="changeBtnIndex(4)">本周</view>
            </view>
            <view class="select-date">
                <view v-if="navList[tabCurrentIndex].btnIndex !== 0" @click="onShowDatePicker()">自定义时间</view>
                <view  class="red" v-else @click="onShowDatePicker()">{{navList[tabCurrentIndex].requestData.start_time}}至{{navList[tabCurrentIndex].requestData.end_time}}</view>
                <view class="iconfont icon-ddx-shop-content_arrows" :class="{'red' : navList[tabCurrentIndex].btnIndex === 0}"></view>
            </view>
        </view>
        <view class="sub-title-bar">
            <view>共<text>{{navList[tabCurrentIndex].responseData.count}}</text>个客户</view>
            <view>共获得商品佣金<text class="on">{{navList[tabCurrentIndex].responseData.allPrice}}</text>元</view>
        </view>

        <!-- 订单列表 -->
        <view class="order-list">
            <view class="order-item" v-for="(item, index) in navList[tabCurrentIndex].responseData.data" :key="index" :class="{'opacity-tips': [6, 7].indexOf(item.order_info.status) !== -1}">
                <view class="order-item-title">
                    <view class="one">
                        <view>买家：{{item.order_info.member_name}}</view>
                        <view>{{item.order_info.status | orderStatusToString}}</view>
                    </view>
                    <view class="two">
                        下单时间：{{item.order_info.add_time}}
                    </view>
                </view>
                <view class="order-item-content" v-for="(goods, goods_index) in item.order_info.item_list" :key="goods_index">
                    <view class="goods-image">
                        <image class="img" :src="goods.pic"></image>
                    </view>
                    <view class="goods-info">
                        <text>{{goods.subtitle}}</text>
                    </view>
                    <view class="goods-order-info">
                        <text>￥{{goods.real_price}}</text>
                        <text>X{{goods.num}}</text>
                    </view>
                </view>
                <view class="order-item-footer">
                    共{{item.order_info.all_item_num}}件商品&nbsp;&nbsp;&nbsp;订单总金额 ¥{{item.amount}}
                </view>
                <view class="order-item-footer">
                    预估佣金：<text class="red">{{item.price}}</text>
                </view>
                <view class="tips" v-if="[6, 7].indexOf(item.order_info.status) !== -1">已失效</view>
            </view>

            <!---

            <view class="order-item">
                <view class="order-item-title">
                    <view class="one">
                        <view>买家：张三</view>
                        <view>待发货</view>
                    </view>
                    <view class="two">
                        下单时间：2019-10-20 12:30
                    </view>
                </view>
                <view class="order-item-content">
                    <view class="goods-image">
                        <image class="img" src="../../../static/images/goods.jpg"></image>
                    </view>
                    <view class="goods-info">

                        <text>澳洲Bubs贝儿婴幼儿配方羊奶粉3段800g澳洲Bubs贝儿婴幼儿配方羊奶粉3段800g</text>
                    </view>
                    <view class="goods-order-info">
                        <text>￥299.99</text>
                        <text>X1</text>
                    </view>
                </view>
                <view class="order-item-content">
                    <view class="goods-image">
                        <image class="img" src="../../../static/images/goods.jpg"></image>
                    </view>
                    <view class="goods-info">
                        <text>澳洲Bubs贝儿婴幼儿配方羊奶粉3段800g澳洲Bubs贝儿婴幼儿配方羊奶粉3段800g</text>
                    </view>
                    <view class="goods-order-info">
                        <text>￥299.99</text>
                        <text>X1</text>
                    </view>
                </view>
                <view class="order-item-footer">
                    共2件商品&nbsp;&nbsp;&nbsp;订单总金额 ¥289.08
                </view>
                <view class="order-item-footer">
                    预估佣金：<text class="red">22.55</text>
                </view>
            </view>

            ---->
        </view>

        <uni-load-more :status="navList[tabCurrentIndex].requestData.moreStatus" style="margin-bottom: 20upx;"></uni-load-more>
        <mx-date-picker :show="showPicker" type="range" :show-tips="true" :begin-text="'开始'" :end-text="'结束'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
    </view>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
    import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue" // 日期时间选择器

    export default {
        name: "sum-order", // 累计订单
        data() {
            return {
                showPicker: false, //日期选择器是否显示

                tabCurrentIndex: 0,
                navList: [
                    {
                        btnIndex: 1, // 1全部  2今日 3昨日 4本周 0自定义时间
                        text: '全部',
                        requestData:{
                            page:1,
                            limit:10,
                            moreStatus: 'more',
                            start_time: '',
                            end_time: '',
                            status: '',//状态：全部：不传，1已结算，0待结算，2已失效
                        },
                        // 服务器返回的数据
                        responseData:{
                            count: 0,     //共多少订单
                            allPrice: 0.00, //共获得多少商品佣金
                            data:[]
                        },
                    },
                    {
                        btnIndex: 1, // 1全部  2今日 3昨日 4本周 0自定义时间
                        text: '已结算',
                        requestData:{
                            page:1,
                            limit:10,
                            moreStatus: 'more',
                            start_time: '',
                            end_time: '',
                            status: '1',//状态：全部：不传，1已结算，0待结算，2已失效
                        },
                        // 服务器返回的数据
                        responseData:{
                            count: 0,     //共多少订单
                            allPrice: 0.00, //共获得多少商品佣金
                            data:[]
                        },
                    },
                    {
                        btnIndex: 1, // 1全部  2今日 3昨日 4本周 0自定义时间
                        text: '待结算',
                        requestData:{
                            page:1,
                            limit:10,
                            moreStatus: 'more',
                            start_time: '',
                            end_time: '',
                            status: '0',//状态：全部：不传，1已结算，0待结算，2已失效
                        },
                        // 服务器返回的数据
                        responseData:{
                            count: 0,     //共多少订单
                            allPrice: 0.00, //共获得多少商品佣金
                            data:[]
                        },
                    },
                    {
                        btnIndex: 1, // 1全部  2今日 3昨日 4本周 0自定义时间
                        text: '已失效',
                        requestData:{
                            page:1,
                            limit:10,
                            moreStatus: 'more',
                            start_time: '',
                            end_time: '',
                            status: '2',//状态：全部：不传，1已结算，0待结算，2已失效
                        },
                        // 服务器返回的数据
                        responseData:{
                            count: 0,     //共多少订单
                            allPrice: 0.00, //共获得多少商品佣金
                            data:[]
                        },
                    },
                ],
            }
        },
        onLoad(){
            console.log("其他页面传过来的参数：", this.$parseURL())
            if (this.$parseURL().whichState){
                this.tabCurrentIndex = this.$parseURL().whichState
            }
            if (this.$parseURL().whichDate) {
                this.changeBtnIndex(this.$parseURL().whichDate)
            }

            this.loadData()
        },
        methods: {
            // 显示日期选择器弹框
            onShowDatePicker(){
                this.showPicker = true
            },
            // 选择日期
            onSelected(e) {
                this.showPicker = false
                if(e) {
                    console.log(e)
                    if (e.date.length){
                        this.navList[this.tabCurrentIndex].requestData.start_time = this.timstampToDate(e.date[0])
                        this.navList[this.tabCurrentIndex].requestData.end_time = this.timstampToDate(e.date[1])
                        this.navList[this.tabCurrentIndex].btnIndex = 0
                        this.navList[this.tabCurrentIndex].requestData.page = 1

                        this.loadData()
                    }
                }
            },

            changeBtnIndex(index) {
                if (index === this.navList[this.tabCurrentIndex].btnIndex) {
                    return
                }

                this.navList[this.tabCurrentIndex].responseData.count = 0
                this.navList[this.tabCurrentIndex].responseData.allPrice = 0.00
                this.navList[this.tabCurrentIndex].responseData.data = []

                let startAndEndDate = {
                    start_date: '',
                    end_date: '',
                }
                switch (index) {
                    case 1:
                        break
                    case 2:
                        startAndEndDate = this.getStartDateAndEndDate("today")
                        break
                    case 3:
                        startAndEndDate = this.getStartDateAndEndDate("yesterday")
                        break
                    case 4:
                        startAndEndDate = this.getStartDateAndEndDate("thisWeek")
                        break
                }
                console.log(startAndEndDate)

                this.navList[this.tabCurrentIndex].btnIndex = index
                this.navList[this.tabCurrentIndex].requestData.start_time = startAndEndDate.start_date
                this.navList[this.tabCurrentIndex].requestData.end_time = startAndEndDate.end_date
                this.navList[this.tabCurrentIndex].requestData.page = 1

                this.loadData()
            },


            //顶部tab点击
            async tabClick(index){
                if (index === this.tabCurrentIndex) {
                    return
                }

                this.tabCurrentIndex = index
                if (this.navList[this.tabCurrentIndex].requestData.page === 1) {
                    await this.loadData()
                }
            },

            //加载数据
            async loadData(){
                this.navList[this.tabCurrentIndex].requestData.moreStatus = "loading"
                let requestData = {
                    page: this.navList[this.tabCurrentIndex].requestData.page,
                    limit: this.navList[this.tabCurrentIndex].requestData.limit,
                    start_time: this.navList[this.tabCurrentIndex].requestData.start_time,
                    end_time: this.navList[this.tabCurrentIndex].requestData.end_time,
                    status: this.navList[this.tabCurrentIndex].requestData.status,
                }
                if (this.navList[this.tabCurrentIndex].btnIndex === 1) {
                    delete requestData.start_time
                    delete requestData.end_time
                }
                if (this.tabCurrentIndex === 0) {
                    delete requestData.status
                }

                this.$minApi.getRetailOrder(requestData).then(res => {
                    console.log(res)
                    if (res.code === 200) {
                        this.navList[this.tabCurrentIndex].responseData.count = res.count
                        this.navList[this.tabCurrentIndex].responseData.allPrice = res.allPrice
                        if (requestData.page === 1) {
                            this.navList[this.tabCurrentIndex].responseData.data = res.data
                        } else {
                            this.navList[this.tabCurrentIndex].responseData.data(...res.data)
                        }
                        if (res.data.length < this.navList[this.tabCurrentIndex].requestData.limit){
                            this.navList[this.tabCurrentIndex].requestData.moreStatus = 'noMore'
                        } else {
                            this.navList[this.tabCurrentIndex].requestData.moreStatus = 'more'
                        }
                    }
                })
            },
        },
        /**
         * 上拉加载更多
         */
        async onReachBottom(){
            if (this.navList[this.tabCurrentIndex].requestData.moreStatus === 'noMore') {
                return
            }
            this.navList[this.tabCurrentIndex].requestData.page ++

            await this.loadData()
        },
        components:{
            uniLoadMore,
            MxDatePicker,
        }
    }
</script>

<style scoped lang="scss">
    @import "./public-style";
    .navbar{
        display: flex;
        height: 40px;
        padding: 0 5px;
        background: #fff;
        border-bottom: 1px solid #efefef;
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
                    border-bottom: 1px solid $color-primary;
                }
            }
        }
    }

    .order-list{
        display: flex;
        flex-direction: column;
        width: 100%;
        .order-item{
            display: flex;
            flex-direction: column;
            background: #fff;
            color: $color-primary-plain;
            font-size: $uni-font-size-base;
            margin-bottom: 20upx;
            .order-item-title{
                padding: $uni-spacing-row-base;
                border-bottom: 1px solid #efefef;
                .one{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: $uni-spacing-row-base;
                }
                .two{
                    color: #666666;
                    font-size: $uni-font-size-sm;
                    margin-bottom: $uni-spacing-row-base;
                }
            }
            .order-item-content{
                padding: $uni-spacing-row-base;
                border-bottom: 1px solid #efefef;
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-between;
                .goods-image{
                    .img{
                        height: 170upx;
                        width: 170upx;
                    }
                }
                .goods-info{
                    width: 45%;
                    text{
                        @extend %overflow-2-line;
                    }
                }
                .goods-order-info{
                    display: flex;
                    flex-direction: column;
                    text-align: right;
                }
            }
            .order-item-footer{
                padding: $uni-spacing-row-base;
                width: 100%;
                text-align: right;
                border-bottom: 1px solid #efefef;
                .red{
                    color: $color-primary;
                }
                &:last-child{
                    border: none;
                }
            }

            /* 已失效 */
            position: relative;
            &.opacity-tips{
                opacity: .5;
            }
            .tips{
                width: 150upx;
                height: 150upx;
                line-height: 150upx;
                text-align: center;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -75upx;
                margin-left: -75upx;
                background: rgba(0,0,0,0.5);
                color: #FFFFFF;
                font-size: $uni-font-size-lg;
                transform:rotate(-50deg);
            }
        }
    }
</style>
