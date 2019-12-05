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
                    <view style="color: #dd524d;">￥{{sumMoney | moneyToFixed}}</view>
                </view>
                <view class="shop-name" style="border: none;">
                    <view>运费</view>
                    <view style="color: #dd524d;">￥{{freight | moneyToFixed}}</view>
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
              address: {
                  id: 0
              },

              myResponseData:[],//购买的商品数据
              sumNum:0,//件数
              sumSum:0,//总量
              sumMoney:0.0,//总金额

              freight: 0.0, // 运费

              //提交订单，或者是获取运费需要上传的数据
              requestData: null,
              isDisableSubmitOrder: false,// 是否禁用  提交订单按钮
          }
        },
        async onLoad(){
            //获取默认收货地址
            await this.$minApi.addressList({default: 1}).then(res => {
                if (res.code === 200 && res.data.length) {
                    this.address = res.data[0]
                }
            })

            console.log("带过来的参数:",this.$parseURL())
            this.myResponseData = this.$parseURL().myResponseData
            this.sumNum = this.$parseURL().sumNum
            this.sumSum = this.$parseURL().sumSum
            this.sumMoney = this.$parseURL().sumMoney

            const inviteBuy =  uni.getStorageSync('inviteBuy')
            //根据当前订单类型 来获取运费，或者提交订单 普通/拼团/秒杀订单
            let goodsData = []
            switch (this.$parseURL().createOrderType) {
                case "buy_now":
                    this.$parseURL().myResponseData.forEach((item1, index1) => {
                        item1.data.forEach((item2, index2) => {
                            goodsData.push({
                                id: item2.item_id,
                                num: item2.num,
                                specs_ids: item2.key,
                            })
                        })
                    })
                    this.requestData = {
                        address_id: this.address.id,// 收货地址id
                        order_distinguish: 0, //普通订单
                        item: goodsData
                    }
                    if (
                        inviteBuy.type === 'buy_now' &&
                        inviteBuy.data.id == goodsData[0].id
                    ) {
                        this.requestData.share_id = inviteBuy.data.share_id
                    }
                    break
                case "car":
                    this.$parseURL().myResponseData.forEach((item1, index1) => {
                        item1.data.forEach((item2, index2) => {
                            goodsData.push({
                                id: item2.item_id,
                                num: item2.num,
                                specs_ids: item2.key,
                                card_id: item2.id,
                            })
                        })
                    })
                    this.requestData = {
                        address_id: this.address.id,// 收货地址id
                        order_distinguish: 0, //购物车订单（普通订单）
                        item: goodsData
                    }
                    break
                case "group":
                    this.$parseURL().myResponseData.forEach((item1, index1) => {
                        item1.data.forEach((item2, index2) => {
                            goodsData.push({
                                id: item2.item_id,
                                num: item2.num,
                                specs_ids: item2.key,
                            })
                        })
                    })
                    this.requestData = {
                        address_id: this.address.id,// 收货地址id
                        activity_id: this.$parseURL().activity_id, //拼团id
                        order_distinguish: 1, //拼团订单
                        commander: this.$parseURL().commander,//如果为拼团订单，则此参数1为团长，反之为团员   （非必传）
                        assemble_list_id: this.$parseURL().assemble_list_id,//如果上 参团，这个上参团的id
                        item: goodsData,
                    }
                    if (inviteBuy.type === 'group'){
                        if (inviteBuy.data.assemble_list_id){
                            if (
                                inviteBuy.data.assemble_list_id == this.requestData.assemble_list_id &&
                                inviteBuy.data.assemble_id == this.requestData.activity_id &&
                                inviteBuy.data.item_id == goodsData[0].id
                            ) {
                                this.requestData.share_id = inviteBuy.data.share_id
                            }
                        } else {
                            if (
                                inviteBuy.data.assemble_id == this.requestData.activity_id &&
                                inviteBuy.data.item_id == goodsData[0].id
                            ) {
                                this.requestData.share_id = inviteBuy.data.share_id
                            }
                        }
                    }

                    break
                case "spike":
                    this.$parseURL().myResponseData.forEach((item1, index1) => {
                        item1.data.forEach((item2, index2) => {
                            goodsData.push({
                                id: item2.item_id,
                                num: item2.num,
                                specs_ids: item2.key,
                            })
                        })
                    })
                    this.requestData = {
                        address_id: this.address.id,// 收货地址id
                        activity_id: this.$parseURL().seckill_id, //秒杀或者限时购 id
                        order_distinguish: 2, //秒杀或者限时购订单
                        item: goodsData,
                    }
                    if (
                        inviteBuy.type === 'spike' &&
                        inviteBuy.data.seckill_id == this.requestData.activity_id &&
                        inviteBuy.data.item_id == goodsData[0].id
                    ) {
                        this.requestData.share_id = inviteBuy.data.share_id
                    }
                    break
            }
            this.getFreight()

            // 选择地址 从其他页面传过来的值
            let _this = this
            this.$eventHub.$on('address', function (data) {
                _this.address = data
                _this.requestData.address_id = data.id
                _this.getFreight()
            })
        },
        /**
         * 页面卸载事件
         */
        onUnload(){
            this.$eventHub.$off('address')
        },
        methods:{
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },

            //获取运费
            async getFreight(){
                await this.$minApi.freight(this.requestData).then(res => {
                    console.log(res)
                    if (res.code === 200) {
                        this.freight = res.data
                    }
                    // 仅限新人购买
                    if (res.code === 403) {
                        this.isDisableSubmitOrder = true // 禁用下单按钮
                        setTimeout(() => {
                            uni.navigateBack()
                        }, 2500)
                    }
                })
            },
            //提交订单
            async submitOrder(){
                if (this.isDisableSubmitOrder) {
                    return
                }
                if (!this.address.id) {
                    this.msg('未选择收货地址')
                    return
                }
                switch (this.$parseURL().createOrderType){
                    case 'car': // 购物车下单
                        await this.$minApi.createOrder(this.requestData).then(res => {
                            if (res.code === 200) {
                                this._goPage('order_pay', res.data)
                            } else {
                                let _that = this
                                if([108, 107, 208].indexOf(res.code) !== -1){
                                    uni.showModal({
                                        title: '提示',
                                        content: res.msg,
                                        success: function (showModalRes) {
                                            if (showModalRes.confirm) {
                                                console.log('用户点击确定');
                                                if (res.code === 108) { // 需要实名认证
                                                    _that._goPage('id_card_authentication')
                                                }
                                                if (res.code === 107) { // 收件人姓名与实名认证信息不符,请修改或更换收件人信息
                                                    _that._goPage('address_chooses')
                                                }
                                                if (res.code === 208) { // 您当前存在未支付的秒杀订单,请先支付，需跳转到支付界面，返回的data为订单信息,order_id":3812,"amount":"119.00
                                                    // _that._goPage('order_pay', {
                                                    //     amount: res.data.amount,      //总金额
                                                    //     order_id: res.data.order_id      //订单id
                                                    // })
                                                    _that._goPage('order_detail', {
                                                        order_id: res.data.order_id      //订单id
                                                    })
                                                }
                                            } else if (showModalRes.cancel) {
                                                console.log('用户点击取消');
                                            }
                                        }
                                    });
                                } else {
                                    this.msg(res.msg)
                                }
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                        break
                    case 'buy_now':
                        await this.$minApi.createOrder(this.requestData).then(res => {
                            if (res.code === 200) {
                                this._goPage('order_pay', res.data)
                            } else {
                                let _that = this
                                if([108, 107, 208].indexOf(res.code) !== -1){
                                    uni.showModal({
                                        title: '提示',
                                        content: res.msg,
                                        success: function (showModalRes) {
                                            if (showModalRes.confirm) {
                                                console.log('用户点击确定');
                                                if (res.code === 108) { // 需要实名认证
                                                    _that._goPage('id_card_authentication')
                                                }
                                                if (res.code === 107) { // 收件人姓名与实名认证信息不符,请修改或更换收件人信息
                                                    _that._goPage('address_chooses')
                                                }
                                                if (res.code === 208) { // 您当前存在未支付的秒杀订单,请先支付，需跳转到支付界面，返回的data为订单信息,order_id":3812,"amount":"119.00
                                                    // _that._goPage('order_pay', {
                                                    //     amount: res.data.amount,      //总金额
                                                    //     order_id: res.data.order_id      //订单id
                                                    // })
                                                    _that._goPage('order_detail', {
                                                        order_id: res.data.order_id      //订单id
                                                    })
                                                }
                                            } else if (showModalRes.cancel) {
                                                console.log('用户点击取消');
                                            }
                                        }
                                    });
                                } else {
                                    this.msg(res.msg)
                                }
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                        break
                    case 'group':
                        // 当返回码code为208时，表示有未支付的订单，需跳转到支付界面，返回的data为订单信息
                        await this.$minApi.createAassembleOrder(this.requestData).then(res => {
                            if (res.code === 200) {
                                this._goPage('order_pay', res.data)
                            } else {
                                let _that = this
                                if([108, 107, 208].indexOf(res.code) !== -1){
                                    uni.showModal({
                                        title: '提示',
                                        content: res.msg,
                                        success: function (showModalRes) {
                                            if (showModalRes.confirm) {
                                                console.log('用户点击确定');
                                                if (res.code === 108) { // 需要实名认证
                                                    _that._goPage('id_card_authentication')
                                                }
                                                if (res.code === 107) { // 收件人姓名与实名认证信息不符,请修改或更换收件人信息
                                                    _that._goPage('address_chooses')
                                                }
                                                if (res.code === 208) { // 您当前存在未支付的秒杀订单,请先支付，需跳转到支付界面，返回的data为订单信息,order_id":3812,"amount":"119.00
                                                    // _that._goPage('order_pay', {
                                                    //     amount: res.data.amount,      //总金额
                                                    //     order_id: res.data.order_id      //订单id
                                                    // })
                                                    _that._goPage('order_detail', {
                                                        order_id: res.data.order_id      //订单id
                                                    })
                                                }
                                            } else if (showModalRes.cancel) {
                                                console.log('用户点击取消');
                                            }
                                        }
                                    });
                                } else {
                                    this.msg(res.msg)
                                }
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                        break
                    case 'spike':
                        await this.$minApi.createOrederSeckillDoPost(this.requestData).then(res => {
                            if (res.code === 200) {
                                this._goPage('order_pay', res.data)
                            } else {
                                let _that = this
                                if([108, 107, 208].indexOf(res.code) !== -1){
                                    uni.showModal({
                                        title: '提示',
                                        content: res.msg,
                                        success: function (showModalRes) {
                                            if (showModalRes.confirm) {
                                                console.log('用户点击确定');
                                                if (res.code === 108) { // 需要实名认证
                                                    _that._goPage('id_card_authentication')
                                                }
                                                if (res.code === 107) { // 收件人姓名与实名认证信息不符,请修改或更换收件人信息
                                                    _that._goPage('address_chooses')
                                                }
                                                if (res.code === 208) { // 您当前存在未支付的秒杀订单,请先支付，需跳转到支付界面，返回的data为订单信息,order_id":3812,"amount":"119.00
                                                    // _that._goPage('order_pay', {
                                                    //     amount: res.data.amount,      //总金额
                                                    //     order_id: res.data.order_id      //订单id
                                                    // })
                                                    _that._goPage('order_detail', {
                                                        order_id: res.data.order_id      //订单id
                                                    })
                                                }
                                            } else if (showModalRes.cancel) {
                                                console.log('用户点击取消');
                                            }
                                        }
                                    });
                                } else {
                                    this.msg(res.msg)
                                }
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
                    border-bottom: 1px solid #f2f2f2;
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
