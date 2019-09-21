<template>
    <view class="content">
        <view class="navbar">
            <view
                v-for="(item, index) in navList" :key="index"
                class="nav-item"
                :class="{current: tabCurrentIndex === index}"
                @click="tabClick(index)">
                {{item.text}}
            </view>
        </view>
        <swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
            <swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
                <scroll-view
                    class="list-scroll-content"
                    scroll-y
                    @scrolltolower="myOnReachBottom"
                >
                    <!-- 订单列表 -->
                    <view class="car-list">
                        <view class="section" v-for="(item, key) in tabItem.orderList" :key="key" @click="goPage('order_detail',{id:item.id})">
                            <view class="shop-name">
                                <view>{{item.sn}}</view>
                                <view>{{item.status | orderStatusToString}}</view>
                            </view>
                            <view class="goods" v-for="(goods, goods_key) in item.item_list" :key="goods_key">
                                <view class="goods-img">
                                    <image class="img"  :src="goods.pic"></image>
                                </view>
                                <view class="other">
                                    <view class="info">
                                        <view class="title">{{goods.subtitle}}</view>
                                        <view class="specification" v-if="goods.attr_name">规格: {{goods.attr_name}}</view>
                                    </view>
                                    <view class="money">
                                        <view class="money">
                                            ￥{{goods.real_price}}
                                        </view>
                                        <view class="num">
                                            X{{goods.num}}
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="goods-operating">
                                <view class="title">共计 {{item.number}}件商品 合计￥<text class="money">{{item.amount}}</text></view>
                                    <!-- 1待付款，2待发货，3待收货，4待评价，5已完成，6已经取消订单 -->
                                    <form class="btns" @submit="formSubmit" :report-submit="true">

                                        <button class="active" v-if="item.status === 1" @click.stop="payNow(key)">支付</button>
                                        <button form-type="submit" v-if="item.status === 1">取消</button>

                                        <button  v-if="item.status === 3" >确认收货</button>

                                        <button class="active" v-if="item.status === 4" >评价</button>

                                        <button v-if="item.status === 5 || item.status === 6" >删除</button>

                                        <button v-if="item.order_distinguish === 1" class="active" @click.stop="goPage('group_buy_group')">查看拼团</button>

                                    </form>
                            </view>
                        </view>
                    </view>

                    <uni-load-more :status="tabItem.loadingType" style="margin-bottom: 20upx;"></uni-load-more>

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
                        requestData:{
                          page:1,
                          limit:10,
                        },
                        orderList: []
                    },
                    {
                        state: 1,
                        text: '待付款',
                        loadingType: 'more',
                        requestData:{
                            page:1,
                            limit:10,
                        },
                        orderList: []
                    },
                    {
                        state: 2,
                        text: '待发货',
                        loadingType: 'more',
                        requestData:{
                            page:1,
                            limit:10,
                        },
                        orderList: []
                    },
                    {
                        state: 3,
                        text: '待收货',
                        loadingType: 'more',
                        requestData:{
                            page:1,
                            limit:10,
                        },
                        orderList: []
                    },
                    {
                        state: 4,
                        text: '待评价',
                        loadingType: 'more',
                        requestData:{
                            page:1,
                            limit:10,
                        },
                        orderList: []
                    },
                ],
            };
        },

        onLoad(){
            console.log("其他页面带过来的参数",this.$parseURL())
            //查询条件：不传表示全部，1待付款，2待发货，3待收货，4待评价
            switch (this.$parseURL().status) {
                case 1://待付款
                    this.tabCurrentIndex = 1
                    break
                case 2://待发货
                    this.tabCurrentIndex = 2
                    break
                case 3://待收货
                    this.tabCurrentIndex = 3
                    break
                case 4://待评价
                    this.tabCurrentIndex = 4
                    break
                default://全部
                    this.tabCurrentIndex = 0
                    break
            }
        },
        onShow(){
            console.log("每次页面打开就要从新请求数据")
            this.loadData()
        },

        methods: {
            goPage(url,query = {}){
                this.$openPage({name: url, query: query})
            },

            //获取订单列表
            async loadData(){
                this.navList[this.tabCurrentIndex].loadingType = 'loading'
                let requestData = {
                    status: this.navList[this.tabCurrentIndex].state,
                    page: this.navList[this.tabCurrentIndex].requestData.page,
                    limit: this.navList[this.tabCurrentIndex].requestData.limit,
                }
                await this.$minApi.orderList(requestData).then(res => {
                    if (res.code === 200) {

                        if (this.navList[this.tabCurrentIndex].requestData.page === 1){
                            this.navList[this.tabCurrentIndex].orderList = res.data
                        } else {
                            this.navList[this.tabCurrentIndex].orderList.push(...res.data)
                        }

                        if (res.data.length <  this.navList[this.tabCurrentIndex].requestData.limit) {
                            this.navList[this.tabCurrentIndex].loadingType = 'noMore'
                        } else {
                            this.navList[this.tabCurrentIndex].loadingType = 'more'
                        }

                    }
                })
            },

            //swiper 切换
            async changeTab(e){
                this.tabCurrentIndex = e.target.current
                if (this.navList[this.tabCurrentIndex].requestData.page === 1) {
                    await this.loadData()
                }
            },

            //顶部tab点击
            async tabClick(index){
                this.tabCurrentIndex = index
                if (this.navList[this.tabCurrentIndex].requestData.page === 1) {
                    await this.loadData()
                }
            },

            //上拉加载更多
            async myOnReachBottom(){
                if (this.navList[this.tabCurrentIndex].loadingType === 'noMore') {
                    return
                }
                this.navList[this.tabCurrentIndex].requestData.page ++
                await this.loadData()
            },

            //订单操作
            async formSubmit(e) {
                console.log('form发生了submit事件，携带数据为：',e)
                return
                // 推送模板消息所需的数据
                let sendTemplateMessageData = {
                    form_id: e.detail.formId,//模板id
                    page: `pages/order/detail?order_id=${this.orderData.order_id}`,//模板消息推送后可以跳转的页面
                    oid: `${this.orderData.order_id}`,//订单id
                    state: 0,//订单状态，0 未支付 1：支付成功；2：订单取消
                }

                let data ={
                    order_id: this.orderData.order_id,
                    pay_way: this.payWay,
                }
                /**
                 * 请求接口，传订单id，和支付方式
                 * 如果支付方式为 微信和钱包支付
                 */
                await this.$minApi.payWay(data).then(async res => {
                    console.log(res)
                    if (res.code === 200) {
                        if (this.payWay === '3'){ //钱包支付
                            res.data.result = true
                            sendTemplateMessageData.state = 1
                            await this.$minApi.sendTemplateMessage(sendTemplateMessageData).then(res=>{
                                console.log(res)
                            })
                            await this._goPage('order_result', res.data)
                        }
                        if (this.payWay === '1') { // 微信支付
                            await uni.requestPayment({
                                provider: 'wxpay',
                                timeStamp: res.data.timeStamp,
                                nonceStr: res.data.nonceStr,
                                package: res.data.package,
                                signType: res.data.signType,
                                paySign: res.data.paySign,
                                success: async (payRes) => {
                                    res.data.result = true
                                    sendTemplateMessageData.state = 1
                                    await this.$minApi.sendTemplateMessage(sendTemplateMessageData).then(res=>{
                                        console.log(res)
                                    })
                                    await this._goPage('order_result', res.data)
                                },
                                fail: async (payErr) =>{
                                    res.data.result = false
                                    sendTemplateMessageData.state = 0
                                    await this.$minApi.sendTemplateMessage(sendTemplateMessageData).then(res=>{
                                        console.log(res)
                                    })
                                    await this._goPage('order_result', res.data)
                                }
                            })
                        }
                    } else {
                        res.data.result = false
                        sendTemplateMessageData.state = 0
                        await this.$minApi.sendTemplateMessage(sendTemplateMessageData).then(res=>{
                            console.log(res)
                        })
                        await this._goPage('order_result', res.data)
                    }
                }).catch(async err => {
                    console.log(err)
                    sendTemplateMessageData.state = 0
                    await this.$minApi.sendTemplateMessage(sendTemplateMessageData).then(res=>{
                        console.log(res)
                    })
                    await this._goPage('order_result', {result: false, sn: '', id: 0})
                })
            },

            //支付
            async payNow(key){
                console.log(this.navList[this.tabCurrentIndex])
                let  orderData = {
                        amount: this.navList[this.tabCurrentIndex].orderList[key].amount,      //总金额
                        order_id: this.navList[this.tabCurrentIndex].orderList[key].id      //订单id
                }
                await this.goPage('order_pay_navigate', orderData)
            }
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
        padding-bottom: $uni-spacing-col-sm;
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
                    flex-direction: row;
                    justify-content: flex-end;
                    button{
                        display: inline-flex;
                        height: 54upx;
                        line-height: 54upx;
                        border-radius:4upx;
                        color: $color-primary-plain;
                        font-size: $uni-font-size-base;
                        background: #ffffff;
                        margin: 0 12upx;
                        &:last-child{
                            margin-right: 0;
                        }
                        &:after{
                            border-color: #D2D2D2;
                            border-radius:0;
                        }
                        &.active{
                            color: $color-primary;
                            &:after{
                                border-color: $color-primary;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
