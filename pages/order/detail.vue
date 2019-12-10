<template>
    <view class="container">
<!--        <view class="title">剩余12天20时自动确认</view>-->
<!--        <view class="info">-->
<!--            <view  class="express-delivery">-->
<!--                <view>-->
<!--                    <i class="iconfont icon-ddx-shop-location"></i>-->
<!--                </view>-->
<!--                <view class="text">-->
<!--                    <view class="two-info">[快递发货]北部新区快递员 小猪11211345634 正在为您派件，请您保持电话畅通正在为您派件...</view>-->
<!--                    <view class="time">2019-02-12 12:24:35</view>-->
<!--                </view>-->
<!--                <view>-->
<!--                    <i class="iconfont icon-ddx-shop-content_arrows"></i>-->
<!--                </view>-->
<!--            </view>-->
<!--        </view>-->
        <view class="info">
            <view  class="address">
                <view>
                    <i class="iconfont icon-ddx-shop-location"></i>
                </view>
                <view class="text">
                    <view>{{responseData.realname}}<span class="mobile">{{responseData.mobile}}</span></view>
                    <view class="address-detail">{{responseData.detail_address}}</view>
                </view>
                <view style="opacity: 0;">
                    <i class="iconfont icon-ddx-shop-content_arrows"></i>
                </view>
            </view>
        </view>
        <!-- 订单列表 -->
        <view class="car-list">
            <view class="section" v-for="(item, key) in responseData.goods" :key="key">
                <view class="shop-name">
                    <view>{{item.mold}}</view>
                    <view style="color: #FC5A5A;">
                       {{item.deliver}}
                    </view>
                </view>
                <view class="goods" @click="_goPage('goods_detail', {id: item.item_id})">
                    <view class="goods-img">
                        <image class="img" :src="item.pic"></image>
                    </view>
                    <view class="other">
                        <view class="goods-info">
                            <view class="goods-info-title">{{item.subtitle}}</view>
                            <view class="goods-info-specification" v-if="item.attr_name">
                                规格:{{item.attr_name}}
                            </view>
                            <view class="goods-info-specification">
                                <text v-if="item.status === 2" style="color: #FC5A5A;">退货成功</text>
                            </view>
                        </view>
                        <view class="goods-info-money">
                            <view class="goods-info">
                                <view class="money">
                                    ￥{{item.real_price}}
                                </view>
                                <view class="num">
                                    X{{item.num}}
                                </view>
                            </view>
                            <view class="goods-return-status" v-if="item.refund_status">
                                {{item.refund_status | refundStatusToText}}
                            </view>
                        </view>
                    </view>
                </view>
                <view class="btns">
                    <!--订单状态 1待付款 2待发货 3待收货  4 待评论 5已完成 -1已取消-->
                    <!--  退单状态 0:正常    1退款中 2 退款成功 3 退款关闭 4 待寄件 5 退款拒绝 6 退款取消（用户手动取消退款）7 退货寄件中-->
                    <button class="active" v-if="item.deliver_status === 1" @click="_goPage('logistics_view', {order_id: responseData.id,goods: item})">查看物流</button>
                    <button @click="_goPage('order_return_apply', {order_id: responseData.id, goods: item})" v-if="[2,3,4,5].indexOf(responseData.status) !== -1 && (item.refund_status === 0) && (item.mold_id !== 1)">申请售后</button>
                    <button class="active" v-if="item.refund_status === 4" @click="_goPage('order_return_refund',  {order_id: responseData.id, goods: item})">去寄件</button>
                    <button class="active" v-if="[1,2,3,5,6,7].indexOf(item.refund_status) !== -1" @click="_goPage('order_return_status', {order_id:responseData.id, goods_id: item.id, title: item.subtitle, spec: item.attr_name, pic: item.pic, item_id: item.item_id})">退款详情</button>
                </view>
            </view>
        </view>
        <!--汇总-->
        <view class="sum-section">
            <view class="item">
                <view>商品金额</view>
                <view>￥{{(parseFloat(responseData.amount) - parseFloat(responseData.postage)) | moneyToFixed}}</view>
            </view>
            <view class="item">
                <view>运费</view>
                <view>￥{{responseData.postage}}</view>
            </view>
<!--            <view class="item" v-if="responseData.discount">-->
<!--                <view>优惠券</view>-->
<!--                <view>￥{{responseData.discount}}</view>-->
<!--            </view>-->
            <view class="item">
                <view>付款总金额</view>
                <view style="color: #dd524d;">￥{{responseData.amount | moneyToFixed}}</view>
            </view>
        </view>
        <!--   订单号，时间等订单信息     -->
        <view class="order-info">
            <view v-if="responseData.status_attr">订单状态：{{responseData.status_attr}}</view>
            <view>订单编号：{{responseData.sn}}</view>
            <view>下单时间：{{responseData.add_time}}</view>
            <!--订单状态 1待付款 2待发货 3待收货  4 待评论 5已完成 -1已取消-->
            <view v-if="responseData.status !== 1 && responseData.status !== -1">付款时间：{{responseData.paytime}}</view>
            <view v-if="responseData.status === 3 || responseData.status === 4 ||  responseData.status === 5">发货时间：{{responseData.sendtime}}</view>
        </view>
        <view class="block"></view>
        <!--操作按钮-->
        <view class="fixed-btns">
<!--            <button @click="call">手机客服</button>-->
            <button @click="contactCustomerService">在线客服</button>
            <form @submit="cancelFormSubmit" :report-submit="true" v-if="responseData.status === 1">
                <button form-type="submit">取消</button>
            </form>
            <button class="active" v-if="responseData.status === 1" @click="payNow">去付款</button>
            <button class="active" v-if="responseData.status === 3" @click="overOrder">确认收货</button>
            <button class="active" v-if="responseData.status === 4" @click="evaluate">评价</button>
            <button v-if="responseData.status === 5 || responseData.status === -1" @click="delOrder">删除</button>
        </view>
    </view>
</template>

<script>
    import { mapState, } from 'vuex'

    export default {
        name: "detail",
        data(){
          return {
              responseData:{
                   id: 0,
                   sn: "",
                   realname: "",
                   detail_address: "",
                   mobile: "",
                   amount: 0.00,
                   postage: 0.00,
                   discount: 0,
                   add_time: "",
                   paytime: "",
                   sendtime: "",
                   status: 0,
                   status_attr: "",
                   goods: [
                      {
                          subtitle: "",
                          item_id: 0,
                          real_price: 0,
                          deliver_status: 0,
                          deliver: "",
                          num: 10,
                          status: 1,
                          attr_name: null,
                          mold_id: 0,
                          mold: "",
                          pic: "",
                          express_id: 0
                      },
                  ]
              },
          }
        },
        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            // 联系客服
            call(){
                uni.makePhoneCall({
                    phoneNumber: '17384094352' //仅为示例
                })
            },
            // 在线客服 打开合从聊天弹窗
            contactCustomerService(){
                if (this.userInfo.id){
                    _AIHECONG('customer',{
                        head : this.userInfo.pic, //该字段可以将顾客头像同步过来
                        '名称' : this.userInfo.nickname,  // '属性名' : '值'
                        '邮箱' : '暂无',
                        '手机' : this.userInfo.mobile,
                        '会员账号' : "会员id：" + this.userInfo.id,
                        '会员等级' : '暂无',
                        '订单号' : JSON.stringify({title: this.responseData.sn})
                    })
                }
                _AIHECONG('showChat')
            },

            //支付
            async payNow(){
                let  orderData = {
                    amount: this.responseData.amount,      //总金额
                    order_id: this.responseData.id      //订单id
                }
                await this._goPage('order_pay_navigate', orderData)
            },

            //取消订单
            async cancelFormSubmit(e) {
                let requestData = {
                        order_id: this.responseData.id
                    },
                    _that = this
                uni.showModal({
                    title: '提示',
                    content: "是否取消订单？",
                    success: function (showModalRes) {
                        if (showModalRes.confirm) {
                            _that.$minApi.cancelOrder(requestData).then(res => {
                                if (res.code === 200) {
                                    _that.msg('取消成功')
                                    _that.loadData()
                                }
                            })
                        } else if (showModalRes.cancel) {

                        }
                    }
                })
            },

            //确认收货
            async overOrder(){
                let requestData = {
                        order_id: this.responseData.id
                    },
                    _that = this
                uni.showModal({
                    title: '提示',
                    content: "是否确认收货？",
                    success: function (showModalRes) {
                        if (showModalRes.confirm) {
                            _that.$minApi.overOrder(requestData).then(res => {
                                if (res.code === 200) {
                                    _that.msg('确认收货成功')
                                    _that.loadData()
                                }
                            })
                        } else if (showModalRes.cancel) {

                        }
                    }
                })
            },

            // 删除订单
            async delOrder(){
                let requestData = {
                        order_id: this.responseData.id
                    },
                    _that = this
                uni.showModal({
                    title: '提示',
                    content: "是否删除订单？",
                    success: function (showModalRes) {
                        if (showModalRes.confirm) {
                            _that.$minApi.delOrder(requestData).then(res => {
                                if (res.code === 200) {
                                    _that.msg('删除成功')
                                    uni.navigateBack()
                                }
                            })
                        } else if (showModalRes.cancel) {

                        }
                    }
                })
            },

            //获取订单详情
            async loadData(){
                await this.$minApi.orderDetail({order_id: this.responseData.id}).then(res => {
                    console.log("订单详情：",res)
                    if (res.code === 200) {
                        this.responseData = res.data
                    }
                })
            },

            //评价
            evaluate(){
                console.log("评价数据",this.responseData.goods)
                let data = []
                this.responseData.goods.map(item => {
                    let oGoods = {
                        attr_name: item.attr_name,
                        id: item.id,//商品明细id
                        item_id: item.item_id, //商品id
                        mold: item.mold, //区分
                        mold_id: item.mold_id, //区分
                        num: item.num, //购买数量
                        pic: item.pic, //商品图片
                        real_price: item.real_price,//商品价格
                        subtitle: item.subtitle,//商品价格
                    }
                    data.push(oGoods)
                })
                console.log('组合成自己想要的数据：',{item_list: data})
                this._goPage('order_evaluate', {data: {item_list: data}})
            },
        },
        onLoad(param) {
            console.log("参数1",param)
            console.log("参数2", this.$parseURL())
            if (param.order_id){
                this.responseData.id = param.order_id
            }
            if (this.$parseURL().order_id){
                this.responseData.id = this.$parseURL().order_id
            }
        },
        onShow(){
            this.loadData()
        },
        computed: {
            ...mapState(['userInfo'])
        },
        filters:{
            /**
             * 退单状态 0:正常    1退款中 2 退款成功 3 退款关闭 4 待寄件 5 退款拒绝 6 退款取消（用户手动取消退款）7 退货寄件中
             * @param status
             */
            refundStatusToText(status){
                let text = ''
                switch (status) {
                    case 0:
                        text = '正常'
                        break
                    case 1:
                        text = '退款中'
                        break
                    case 2:
                        text = '退款成功'
                        break
                    case 3:
                        text = '退款关闭'
                        break
                    case 4:
                        text = '待寄件'
                        break
                    case 5:
                        text = '退款拒绝'
                        break
                    case 6:
                        text = '退款取消'
                        break
                    case 7:
                        text = '退货寄件中'
                        break
                }
                return text
            },
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        font-size: $uni-font-size-base;
        color: $color-primary-plain;
        .title{
            @extend %border-color-solid-botton;
            width: 100%;
            height: 80upx;
            line-height: 80upx;
            text-align: center;
            background: #fff;
        }
        .info{
            background: #fff;
            width: 100%;
            margin: auto;
            font-size: $uni-font-size-base;
            color: #1A1A1A;
            padding:0 $uni-spacing-row-sm;
            .address{
                width: calc(100% - 10px);
                height: auto;
                padding: $uni-spacing-row-sm 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .text{
                    width: 85%;
                    .address-detail{
                        @extend %overflow-2-line;
                    }
                    .mobile{
                        margin-left: $uni-spacing-row-lg;
                        color: #cccccc!important;
                    }
                }
            }
            .express-delivery{
                width: calc(100% - 10px);
                @extend %border-color-solid-botton;
                height: auto;
                padding: $uni-spacing-row-sm 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .text{
                    width: 85%;
                    .two-info{
                        font-size: $uni-font-size-base;
                        color: #6B9FE7;
                        @extend %overflow-2-line;
                    }
                    .time{
                        font-size: $uni-font-size-sm;
                        color: #808080;
                    }
                }
            }
        }
        .car-list{
            padding: $uni-spacing-col-lg 0;
            .section{
                background: #fff;
                margin-bottom: $uni-spacing-col-lg;
                &:last-child{
                    margin-bottom: 0;
                }
                .shop-name{
                    display: flex;
                    justify-content: space-between;
                    @extend %border-color-solid-botton;
                    padding: $uni-spacing-row-sm;
                    color: #000000;
                    font-size: $uni-font-size-lg;
                }
                .goods{
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
                        .goods-info{
                            display: flex;
                            flex-direction:column;
                            width: 70%;
                            .goods-info-title{
                                @extend %overflow-2-line;
                                color: #1A1A1A;
                                font-size: $uni-font-size-base;
                            }
                            .goods-info-specification{
                                color: #808080;
                                font-size: $uni-font-size-sm;
                            }
                        }
                        .goods-info-money{
                            width: 30%;
                            color: #808080;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            .goods-info{
                                width: 100%;
                                display: flex;
                                flex-direction: column;
                                align-items: flex-end;
                                .money{
                                    color: #1A1A1A;
                                    font-size:$uni-font-size-base;
                                }
                                .num{
                                    font-size: $uni-font-size-sm;
                                }
                            }
                            .goods-return-status{
                                font-size: $uni-font-size-sm;
                                color: $color-primary;
                                display: flex;
                                justify-content: flex-end;
                            }
                        }
                    }
                }
                .btns{
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    text-align: right;
                    padding: $uni-spacing-col-lg 0;
                    button{
                        height: 54upx;
                        line-height: 54upx;
                        border-radius:4upx;
                        color: $color-primary-plain;
                        font-size: $uni-font-size-base;
                        background: #ffffff;
                        margin: 0 12upx;
                        &:last-child{
                            margin-right: $uni-spacing-row-base;
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
        .sum-section{
            background: #fff;
            margin-bottom: $uni-spacing-col-lg;
            .item{
                display: flex;
                justify-content: space-between;
                padding: $uni-spacing-row-sm;
                color: #000000;
                font-size: $uni-font-size-lg;
            }
        }
        .order-info{
            padding: $uni-spacing-col-lg $uni-spacing-row-base;
            background: #fff;
            font-size: $uni-font-size-base;
            color: #808080;
            margin-bottom: 20upx;
            view{
                width: 100%;
                text-align: left;
                height: $uni-font-size-base * 2;
                line-height: $uni-font-size-base * 2;
            }
        }
        .block{
            height: 110upx;
            padding: $uni-spacing-col-lg 0;
        }
        .fixed-btns{
            z-index: 99;
            background: #fff;
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            display: flex;
            justify-content: flex-end;
            text-align: right;
            padding: $uni-spacing-col-lg 0;
            button{
                height: 54upx;
                line-height: 54upx;
                border-radius:4upx;
                color: $color-primary-plain;
                font-size: $uni-font-size-base;
                background: #ffffff;
                margin: 0 12upx;
                &:last-child{
                    margin-right: $uni-spacing-row-base;
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
</style>
