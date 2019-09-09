<template>
    <view class="container">
        <view class="car-list">

            <view class="section" v-for="(item, key) in myResponseData" :key="key">
                <view class="shop-name">
                    <view class="name" @click="choosesCatgrayGoods(key)">
                        <view class="iconfont icon-ddx-shop-circle"></view>
                        {{item.name}}
                    </view>
                    <view @click="deleteShop(key)"><i class="iconfont icon-ddx-shop-del"></i></view>
                </view>
                <view class="goods" v-for="(goods, goods_key) in item.data" :key="goods_key">
                    <view class="chooses">
                        <i class="iconfont icon-ddx-shop-xuanze icon-color" v-if="goods.is_checked" @click="choosesGoods(key,goods_key)"></i>
                        <i class="iconfont icon-ddx-shop-circle" v-else @click="choosesGoods(key,goods_key)"></i>
                    </view>
                    <view class="goods-img" @click="_goPage('goods_detail', {id: goods.item_id})">
                        <image class="img"  :src="goods.pic"></image>
                        <view class="mask" v-if="goods.status !== 1"></view>
                        <view class="tips" v-if="goods.status === 0">已下架</view>
                        <view class="tips" v-if="goods.status === 3">已失效</view>
                    </view>
                    <view class="other">
                        <view class="title-specification">
                            <view class="title">{{goods.title}}</view>
                            <view class="specification" v-if="goods.key_name">
                                规格:
                                <text v-for="(category, category_key) in goods.categoryArr" :key="category_key">{{category}} </text>
                            </view>
                        </view>
                        <view class="money">
                            <view class="money-num">￥{{goods.price}}</view>
                            <view>
                                <uni-number-box :min="1" :max="goods.store" :step="1" :value="goods.num" @change="changeStock($event, key, goods_key)"></uni-number-box>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <uni-load-more :status="moreStatus" v-if="myResponseData.length !== 0"></uni-load-more>
        </view>
        <view class="fixed">
            <view class="chooses-all" @click="choosesAllGoods()">
                <i class="iconfont icon-ddx-shop-xuanze icon-color" v-if="isCheckedAll"></i>
                <i class="iconfont icon-ddx-shop-circle" v-else></i>
                全选
            </view>
            <view class="other">
                <view class="money">合计：<span class="money-num">￥{{mySum.sum_money | moneyToFixed}}</span></view>
                <view class="btn" @click="goPage()">结算({{mySum.num}})</view>
            </view>
        </view>
    </view>
</template>

<script>
    import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

    export default {
        name: "car",
        data(){
          return {
              responseData: [],
              myResponseData: [],
              requestData:{
                  page:1,
                  limit:10,
              },
              moreStatus: 'noMore',
              //统计
              mySum:{
                  sum_money:0.00,
                  num:0
              }
          }
        },
        async onLoad(){
            await this.loadData()
        },
        async onReachBottom() {
            if (this.moreStatus === 'noMore') {
                return
            }
            this.requestData.page ++
            await this.loadData()
        },
        methods:{
            async loadData(){
                this.moreStatus = "loading"
                let data = {
                    page: this.requestData.page,
                    limit: this.requestData.limit,
                }
                await this.$minApi.carList(data).then(res => {
                  console.log(res)
                  if (res.code === 200){
                      this.responseData.push(...res.data)
                      if (res.data.length <  this.requestData.limit) {
                          this.moreStatus = 'noMore'
                      } else {
                          this.moreStatus = 'more'
                      }
                  }
                })
                this._myResponseData()
            },
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            goPage(){
                this.$openPage('order_submit')
            },
            async deleteShop(key){
                let arr_ids = this.myResponseData[key].data.map((item) => {
                    return item.id
                })
                let data = {
                    id: arr_ids.join(','),
                }
                console.log("下标: ",key , '要删除的ids', arr_ids)
                await this.$minApi.carDel(data).then(res => {
                    if (res.code === 200){
                        this.myResponseData.splice(key,1)
                        this.getSumData()
                    }
                })
            },
            //全选一个类型的商品
            choosesCatgrayGoods(key){
                console.log(key)
                this.myResponseData[key].data.map((goods) => {
                    if (goods.status === 1){
                        goods.is_checked = true
                    }
                })
                this.$forceUpdate()
                this.getSumData()
            },
            //选择一个商品
            choosesGoods(key,goods_key){
                console.log("下标", key,goods_key)
                if (this.myResponseData[key].data[goods_key].status === 1) {
                    this.myResponseData[key].data[goods_key].is_checked = !this.myResponseData[key].data[goods_key].is_checked
                }
                this.$forceUpdate()
                this.getSumData()
            },
            //全选商品
            choosesAllGoods(){
                this.myResponseData.map((item) => {
                    item.data.map(goods => {
                        if (goods.status === 1){
                            goods.is_checked = true
                        }
                    })
                })
                this.$forceUpdate()
                this.getSumData()
            },
            // 改变购买数量
            async changeStock(value,key,goods_key){
                console.log('输入框的值：',value,"下标：", key,goods_key)
                let data = {
                    id: this.myResponseData[key].data[goods_key].id,
                    num: value
                }
                await this.$minApi.carEdit(data).then(res => {
                    console.log(res)
                    if (res.code === 200){
                        this.myResponseData[key].data[goods_key].num = value
                        this.$forceUpdate()
                        this.getSumData()
                    }
                })
            },
            //组合数据为想要的格式
            _myResponseData(){
                let map = {}, dest = []
                for(let i = 0; i < this.responseData.length; i++){
                    let ai = this.responseData[i]
                    ai.is_checked = false
                    ai.categoryArr = this.responseData[i].key_name.split('_').map((item) => {
                            return item
                    })
                    if(!map[ai.mold_id]){
                        dest.push({
                            mold_id: ai.mold_id,
                            name: ai.mold,
                            data: [ai]
                        })
                        map[ai.mold_id] = ai
                    }else{
                        for(let j = 0; j < dest.length; j++){
                            let dj = dest[j]
                            if(dj.mold_id === ai.mold_id){
                                dj.data.push(ai)
                                break
                            }
                        }
                    }
                }
                console.log('ssssssss', dest)
                this.myResponseData = dest
            },
            //计算订单金额
            getSumData(){
                let temp = {sum_money:0.00,num:0}
                this.myResponseData.forEach((item1, index1) => {
                    item1.data.forEach((item2, index2) => {
                        if (item2.is_checked && item2.status === 1) {
                            temp.num ++
                            temp.sum_money += parseFloat(item2.price) * parseFloat(item2.num)
                        }
                    })
                })
                this.mySum = temp
                this.$forceUpdate()
            },
        },
        computed:{
            //是否全选
            isCheckedAll(){
                let sum = 0, checked_num = 0
                this.myResponseData.forEach((item1, index1) => {
                    item1.data.forEach((item2, index2) => {
                        sum ++
                        if (item2.is_checked) {
                            checked_num ++
                        }
                    })
                })
                return sum === checked_num ? sum !== 0 || false : false
            },
        },
        components: {uniNumberBox,uniLoadMore,}
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
                    .name{
                        display: flex;
                        justify-content: flex-start;
                        font-size: $uni-font-size-lg;
                        .iconfont{
                            margin-right: 6upx;
                        }
                    }
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
                        position: relative;
                        margin-right: $uni-spacing-row-sm;
                        .img{
                            width: 200upx;
                            height: 200upx;
                            border-radius: $uni-border-radius-sm;
                        }
                        .mask{
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 200upx;
                            height: 200upx;
                            background: #FFFFFF;
                            opacity: 0.5;
                        }
                        .tips{
                            width: 130upx;
                            height: 130upx;
                            line-height: 130upx;
                            text-align: center;
                            border-radius: 50%;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            margin-top: -75upx;
                            margin-left: -75upx;
                            background: rgba(0,0,0,0.5);
                            color: #FFFFFF;
                            font-size: $uni-font-size-base;
                            transform:rotate(-50deg);
                        }
                    }
                    .other{
                        width: 57%;
                        display: flex;
                        flex-direction:column;
                        justify-content: space-between;
                        .title-specification{
                            .title{
                                @extend %overflow-2-line;
                                color: #1A1A1A;
                                font-size: $uni-font-size-base;
                            }
                            .specification{
                                color: #808080;
                                font-size: $uni-font-size-sm;
                                text{
                                    margin-right: 6upx;
                                }
                            }
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
