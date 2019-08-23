<template>
    <view class="container">
        <view class="car-list">

            <view class="section" v-for="(item, key) in category" :key="key">
                <view class="shop-name">
                    <view>{{item.shop_name}}</view>
                    <view @click="deleteShop(item.shop_id, key)"><i class="iconfont icon-ddx-shop-del"></i></view>
                </view>
                <view class="goods" v-for="(goods, goods_key) in item.goods" :key="goods_key">
                    <view class="chooses">
                        <i class="iconfont icon-ddx-shop-xuanze icon-color" v-if="goods.is_checked" @click="choosesGoods(key,goods_key)"></i>
                        <i class="iconfont icon-ddx-shop-circle" v-else @click="choosesGoods(key,goods_key)"></i>
                    </view>
                    <view class="goods-img">
                        <image class="img"  :src="goods.img"></image>
                    </view>
                    <view class="other">
                        <view class="title">{{goods.title}}</view>
                        <view class="specification">规格: <span v-for="(category, category_key) in goods.specification" :key="category_key">{{category}}</span></view>
                        <view class="money">
                            <view class="money-num">￥{{goods.price}}</view>
                            <view>
                                <uni-number-box :min="1" :max="goods.stock" :step="1" :value="goods.in_stock" @change="changeStock($event, key, goods_key)"></uni-number-box>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

        </view>
        <view class="fixed">
            <view class="chooses-all" @click="choosesAllGoods()">
                <i class="iconfont icon-ddx-shop-xuanze icon-color" v-if="isCheckedAll"></i>
                <i class="iconfont icon-ddx-shop-circle" v-else></i>
                全选
            </view>
            <view class="other">
                <view class="money">合计：<span class="money-num">￥{{getSomeData.sum_money | moneyToFixed}}</span></view>
                <view class="btn" @click="goPage()">结算({{getSomeData.num}})</view>
            </view>
        </view>
    </view>
</template>

<script>
    import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
    export default {
        name: "car",
        data(){
          return {
              category:[
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
              ],
          }
        },
        methods:{
            goPage(){
                this.$openPage('order_submit')
            },
            deleteShop(shop_id, key){
                console.log(shop_id,key)
                this.category.splice(key,1)
            },
            choosesGoods(key,goods_key){
                this.category[key].goods[goods_key].is_checked = !this.category[key].goods[goods_key].is_checked
            },
            choosesAllGoods(){
                this.category.map((item) => {
                    item.goods.map(goods => {
                        goods.is_checked = true
                    })
                })
            },
            changeStock(value,key,goods_key){
                this.category[key].goods[goods_key].in_stock = value
            },
        },
        computed:{
            //计算订单金额
            getSomeData(){
                let temp = {sum_money:0.00,num:0}
                this.category.forEach((item1, index1) => {
                    item1.goods.forEach((item2, index2) => {
                        if (item2.is_checked) {
                            temp.num ++
                            temp.sum_money += item2.price * item2.in_stock
                        }
                    })
                })
                return temp
            },
            //是否全选
            isCheckedAll(){
                let sum = 0, checked_num = 0
                this.category.forEach((item1, index1) => {
                    item1.goods.forEach((item2, index2) => {
                        sum ++
                        if (item2.is_checked) {
                            checked_num ++
                        }
                    })
                })
                return sum === checked_num ? sum !== 0 || false : false
            },
        },
        watch:{
            'getSomeData': function(newVal,oldVal){
                console.log('newVal', newVal)
            },
        },
        components: {uniNumberBox}
    }
</script>

<style lang="scss">
    .container{
        padding-top: $uni-spacing-col-lg;
        .car-list{
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
                        }
                    }
                    .other{
                        width: 57%;
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
			/* #ifdef H5 */
			margin-bottom:100upx;
			/* #endif */
            left: 0;
            display: flex;
            height: 100upx;
            line-height: 100upx;
            justify-content: space-between;
            font-size: $uni-font-size-lg;
            padding-left: $uni-spacing-row-sm;
            .chooses-all{
                color: #cccccc;
                display: flex;
                justify-content: flex-start;
                font-size: $uni-font-size-lg;
            }
            .other{
                display: flex;
                justify-content: flex-start;
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
