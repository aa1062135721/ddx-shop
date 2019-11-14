<template>
    <view class="container">
        <view class="address">
            <view  class="has-address" v-if="address.id" @click="_goPage('address_chooses')">
                    <view>
                        <i class="iconfont icon-ddx-shop-location"></i>
                    </view>
                    <view class="text">
                        <view>{{address.name}}<span class="mobile">{{address.phone}}</span></view>
                        <view class="address-detail">{{address.addres}}</view>
                    </view>
                    <view>
                        <i class="iconfont icon-ddx-shop-content_arrows"></i>
                    </view>
            </view>
            <view  class="no-address" v-else @click="_goPage('address_chooses')">
                <view>
                    <i class="iconfont icon-ddx-shop-anonymous-iconfont icon-color"></i>
                </view>
                <view>选择收货地址</view>
            </view>
        </view>
        <view class="car-list">
            <view class="section" v-for="(item, key) in myResponseData" :key="key">
                <view class="shop-name">
                    <view>{{item.name}}</view>
                    <view>共{{item.data.length}}件</view>
                </view>
                <view class="goods" v-for="(sItem, sKey) in item.data" :key="sKey">
                    <view class="goods-img">
                        <image class="img"  :src="sItem.pic"></image>
                    </view>
                    <view class="other">
                        <view class="title">{{sItem.title}}</view>
                        <view class="specification" v-if="sItem.categoryArr.length">
                            规格:
                            <text style="margin-right:6upx;" v-for="(category, category_key) in sItem.categoryArr" :key="category_key">{{category}}</text>
                        </view>
                        <view class="money">
                            <view class="money-num"></view>
                            <view>
                                X{{sItem.num}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="section">
                <view class="shop-name" style="border: none;">
                    <view>商品金额</view>
                    <view style="color: #dd524d;">￥{{sumMoney}}</view>
                </view>
                <view class="shop-name" style="border: none;">
                    <view>运费</view>
                    <view>￥{{freight}}</view>
                </view>
            </view>
        </view>

        <view class="fixed">
            <view class="other">
                <view class="num">共{{sumNum}}件，</view>
                <view class="money">合计：<span class="money-num">￥{{(parseFloat(sumMoney) + parseFloat(freight)) | moneyToFixed}}</span></view>
                <view class="btn" @click="submitOrder">提交订单</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "submit",
        data(){
          return {
              address: {},

              myResponseData:[],//购买的商品数据
              sumNum:0,//件数
              sumSum:0,//总量
              sumMoney:0.0,//总金额

              freight: 0.0, // 运费
          }
        },
        async onLoad(){
            console.log("带过来的参数:",this.$parseURL())
            this.myResponseData = this.$parseURL().myResponseData
            this.sumNum = this.$parseURL().sumNum
            this.sumSum = this.$parseURL().sumSum
            this.sumMoney = this.$parseURL().sumMoney

            let _this = this
            this.$eventHub.$on('address', function (data) {
                _this.address = data
                console.log("从其他页面传过来的值",data)
            })
        },
        /**
         * 页面卸载事件
         */
        onUnload(){
            this.$eventHub.$off('address')
        },
        async onShow(){
            await this.getFreight()
        },
        methods:{
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },

            //获取运费
            async getFreight(){
                let data = {
                    address_id: this.address.id || '',
                    item: []
                }

                let order_distinguish = 0    //订单类型：0普通订单，1拼团订单，2秒杀订单
                let commander =  0            //如果为拼团订单：则传入此参数：1表示团长，反正为团员
                let activity_id = 0        //如果为拼团或秒杀订单：则此参数表示为拼团或者秒杀订单的id，必传

                //根据当前订单类型 来获取运费，普通/拼团/秒杀订单
                switch (this.$parseURL().createOrderType) {
                    case "buy_now":
                        order_distinguish = 0
                        break
                    case "car":
                        order_distinguish = 0
                        break
                    case "group":
                        order_distinguish = 1
                        commander = this.$parseURL().commander // 团长开团，或者团员组团
                        activity_id =this.$parseURL().assemble_id     //拼团活动id
                        break
                    case "spike":
                        order_distinguish = 2
                        activity_id =this.$parseURL().seckill_id     //秒杀活动id
                        break
                }
                this.myResponseData.forEach((item1, index1) => {
                    let obj =  {
                            id:16,        //商品id
                            num:6,        //商品数量
                            specs_ids:"",  //规格的id组，注意：如果是统一规格，也必须传此字段，值为空字符串
                            order_distinguish: order_distinguish,
                    }
                    // 拼团订单
                    if (this.$parseURL().createOrderType === 'group') {
                        obj.commander = commander
                        obj.activity_id = activity_id
                    }
                    // 秒杀订单
                    if (this.$parseURL().createOrderType === 'spike') {
                        obj.activity_id = activity_id
                    }
                    item1.data.forEach((item2, index2) => {
                        obj.id = item2.item_id
                        obj.num = item2.num
                        obj.specs_ids = item2.key || ''
                        data.item.push(obj)
                    })
                })

                await this.$minApi.freight(data).then(res => {
                    console.log(res)
                    if (res.code === 200) {
                        this.freight = res.data
                    }
                    if (res.code === 403) {
                        setTimeout(() => {
                            uni.navigateBack()
                        }, 2500)
                    }
                })
            },
            //提交订单
            async submitOrder(){
                if (!this.address.id) {
                    this.msg('未选择收货地址')
                    return
                }
                let requestData = {
                    address_id: this.address.id,
                    item: [],
                }
                switch (this.$parseURL().createOrderType){
                    case 'car': // 购物车下单
                        this.myResponseData.forEach((item1) => {
                            item1.data.forEach((item2) => {
                                let obj =  {
                                    id:0,        //商品id
                                    num:0,        //商品数量
                                    specs_ids: '',  //规格的id组，注意：如果是统一规格，也必须传此字段，值为空字符串
                                    card_id:0,   //购物车id
                                }
                                obj.card_id = item2.id || ''
                                obj.id = item2.item_id
                                obj.num = item2.num
                                obj.specs_ids = item2.key || ''
                                requestData.item.push(obj)
                            })
                        })
                        console.log('购物车下单', requestData)
                        await this.$minApi.createOrder(requestData).then(res => {
                            if (res.code === 200) {
                                this._goPage('order_pay', res.data)
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                        break
                    case 'buy_now':
                        this.myResponseData.forEach((item1, index1) => {
                            let obj =  {
                                id:0,        //商品id
                                num:0,        //商品数量
                                specs_ids:""  //规格的id组，注意：如果是统一规格，也必须传此字段，值为空字符串
                            }
                            item1.data.forEach((item2, index2) => {
                                obj.id = item2.item_id
                                obj.num = item2.num
                                obj.specs_ids = item2.key || ''
                                requestData.item.push(obj)
                            })
                        })
                        console.log('直接下单', requestData)
                        await this.$minApi.createOrder(requestData).then(res => {
                            if (res.code === 200) {
                                this._goPage('order_pay', res.data)
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                        break
                    case 'group':
                        console.log('拼团下单提交了')
                        let groupRequestData = {
                            address_id: this.address.id,
                            assemble_id: this.$parseURL().assemble_id,     //拼团活动id
                            num: this.$parseURL().num,//购买数量
                            update: this.$parseURL().update,          //版本，拼团组详情的id
                            assemble_list_id: this.$parseURL().assemble_list_id,    //拼团组的id，非必传，不传表示自己开团，否则表示与别人成团
                        }
                        await this.$minApi.createOrderByGroup(groupRequestData).then(res => {
                            if (res.code === 200) {
                                this._goPage('order_pay', res.data)
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                        break
                    case 'spike':
                        console.log('秒杀下单提交了')
                        let skillRequestData = {
                            address_id: this.address.id,
                            seckill_id: this.$parseURL().seckill_id
                        }
                        await this.$minApi.createOrderBySeckill(skillRequestData).then(res => {
                            if (res.code === 200) {
                                this._goPage('order_pay', res.data)
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                        break
                }
            }
        },
        components: {

        }
    }
</script>

<style scoped lang="scss">
    .container{
        color: #1A1A1A;
        .address{
            background: #fff;
            width: 100%;
            height: 168upx;
            font-size: $uni-font-size-base;
            color: #1A1A1A;
            padding: $uni-spacing-row-sm;
            .no-address{
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                font-size: $uni-font-size-lg;
                i{
                    margin-right: $uni-spacing-row-sm;
                }
            }
            .has-address{
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                padding-left: $uni-spacing-row-sm;
                padding-right: $uni-spacing-row-sm;
                justify-content: space-between;
                .text{
                    width: 80%;
                    .address-detail{
                        @extend %overflow-2-line;
                    }
                    .mobile{
                        margin-left: $uni-spacing-row-lg;
                        color: #cccccc!important;
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
                    border-bottom: 1px solid #cccccc;
                    padding: $uni-spacing-row-sm;
                    color: #000000;
                    font-size: $uni-font-size-lg;
                }
                .goods{
                    display: flex;
                    justify-content: space-between;
                    padding: $uni-spacing-row-sm;
                    width: 100%;
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
                        flex-direction:column;
                        .title{
                            @extend %overflow-2-line;
                            color: #1A1A1A;
                            font-size: $uni-font-size-base;
                        }
                        .specification{
                            color: #808080;
                            font-size: $uni-font-size-sm;
                        }
                        .money{
                            font-size:$uni-font-size-base;
                            color: #808080;
                            .money-num{
                                color: $color-primary;
                            }
                            display: flex;
                            justify-content: space-between;
                        }
                    }
                }
            }
        }
        .fixed{
            @extend %border-color-solid-top;
            z-index: 99;
            background: #fff;
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 100upx;
            line-height: 100upx;
            display: flex;
            flex-direction:row;
            flex-flow:nowrap;
            justify-content: flex-end;
            font-size: $uni-font-size-lg;
            padding-left: $uni-spacing-row-sm;
            .other{
                display: flex;
                justify-content: flex-end;
                .num{
                    font-size: $uni-font-size-base;
                    color: #808080;
                }
                .money{
                    color:  #1A1A1A;
                    .money-num{
                        color: $color-primary;
                    }
                    margin-right: $uni-spacing-row-lg;
                }
                .btn{
                    padding: 0 $uni-spacing-row-lg + $uni-spacing-row-lg;
                    background: $color-primary;
                    color: #fff;
                }
            }
        }
    }
</style>
