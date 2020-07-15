<template>
    <view class="container">
        <view class="car-list">

            <view class="section" v-for="(item, key) in myResponseData" :key="key">
                <view class="shop-name" v-if="item.data.length">
                    <view class="name" @click="choosesCatgrayGoods(key)">
                        <view class="iconfont icon-ddx-shop-xuanze icon-color" v-if="item.is_checked"></view>
                        <view class="iconfont icon-ddx-shop-circle" v-else></view>
                        {{item.name}}
                    </view>
                    <view @click="deleteShop(key)"><i class="iconfont icon-ddx-shop-del"></i></view>
                </view>
            <block v-if="item.data.length">
                <uni-swipe-action v-for="(goods, goods_key) in item.data" :key="goods_key">
                    <uni-swipe-action-item
                            :auto-close="false"
                            :show="goods.isShowDel"
                            @change="change($event, key, goods_key)"
                            :options="[
                                 {
                                     text: '删除',
                                     key:key,
                                     goods_key:goods_key,
                                      style: {
                                          backgroundColor: '#FC5A5A'
                                      }
                                 }
                            ]" @click="delOneCar" class="goods">
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
                                        <uni-number-box v-if="goods.store === -1" :min="1"  :step="1" :value="goods.num" @change="changeStock($event, key, goods_key)"></uni-number-box>
                                        <uni-number-box v-else :min="1" :max="goods.store" :step="1" :value="goods.num" @change="changeStock($event, key, goods_key)"></uni-number-box>
                                    </view>
                                </view>
                            </view>
                    </uni-swipe-action-item>
                </uni-swipe-action>
            </block>

            </view>
            <uni-load-more :status="moreStatus" v-if="myResponseData.length !== 0"></uni-load-more>
        </view>
        <view class="no-car-list" v-if="myResponseData.length === 0">
            <view>
                <image src="../../static/images/car_empty.png" class="img"></image>
            </view>
			<view v-if="flag">
				<view>您的购物车空空如也!</view>
				<view class="btn">
					<text @click="_goPage('home')">
						去逛逛
					</text>
				</view>
			</view>
			<view v-else>
				<view>您还未登陆，请先登陆</view>
			</view>
        </view>
        <view class="fixed" v-if="myResponseData.length !== 0">
            <view class="chooses-all" @click="choosesAllGoods()">
                <i class="iconfont icon-ddx-shop-xuanze icon-color" v-if="mySum.is_checked"></i>
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
    import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
    import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
    import { mapState } from 'vuex'
    import { _debounce } from "@/utils/mUtils"

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
                  is_checked:false,//是否全选
                  sum_money:0.00,
                  num:0
              },
			  flag:false,
          }
        },
        async onShow(){
          if (this.userInfo.id) {
              this.responseData = []
              this.requestData.page = 1
              await this.loadData()
              this.getSumData()
          }
        },
        async onReachBottom() {
            if (this.moreStatus === 'noMore') {
                return
            }
            this.requestData.page ++
            await this.loadData()
        },
        methods:{
            // 删除购物车
            async delOneCar(e){
                console.log(e)
                let requestData = {
                    id: this.myResponseData[e.content.key].data[e.content.goods_key].id
                }
                await this.$minApi.carDel(requestData).then(res => {
                    if (res.code === 200){
                        this.myResponseData[e.content.key].data.splice(e.content.goods_key, 1)
                        if (this.myResponseData[e.content.key].data.length === 0) {
                            this.myResponseData.splice(e.content.key, 1)
                        }
                        this.getSumData()
                        this.$forceUpdate()
                    }
                })
            },
            change(open, key, goods_key){
                console.log(open, key, goods_key)
                this.myResponseData[key].data[goods_key].isShowDel = open
                this.$forceUpdate()
            },
            async loadData(){
                this.moreStatus = "loading"
                let data = {
                    page: this.requestData.page,
                    limit: this.requestData.limit,
                }
                await this.$minApi.carList(data).then(res => {
                  console.log(res)
                  if (res.code === 200){
                      if (data.page === 1) {
                          this.responseData = res.data
                      } else {
                          this.responseData.push(...res.data)
                      }
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
            // 提价订单了
            goPage(){
                let sumNum = 0, createOrderType = 'car', sumSum = 0, sumMoney = 0, myResponseData = []  //件数，下单方式，总量，总金额, 商品参数
                this.myResponseData.forEach((item1, index1) => {
                   console.log("SUB",item1)
                    let oneObj = {
                        mold_id: item1.mold_id,
                        name: item1.name,
                        data:[]
                   }
                    let subData = []
                    item1.data.forEach((item2, index2) => {
                        console.log("sub",item2)
                        if (item2.is_checked) {
                            subData.push(item2)
                            sumMoney += parseFloat(item2.num) * parseFloat(item2.price)
                            sumNum ++
                            sumSum += parseInt(item2.num)
                        }
                        if (subData.length) {
                            oneObj.data = subData
                        }
                    })
                    if (oneObj.data.length){
                        myResponseData.push(oneObj)
                    }
                })
                console.log("深拷贝出来的数据,二维数组，商品最里面的item_id是商品id，id就是购物车id，也是要传入结算页面的数据：",myResponseData)
                console.log("sumNum,也是要传入结算页面的数据：",sumNum)
                console.log("sumSum,也是要传入结算页面的数据：",sumSum)
                console.log("sumMoney,也是要传入结算页面的数据：",sumMoney)
                if (myResponseData.length) {
                    this._goPage('order_submit',{
                        myResponseData,//购买的商品数据
                        createOrderType,//下单方式
                        sumNum,//件数
                        sumSum,//总量
                        sumMoney,//总金额
                    })
                } else {
                    this.msg('没有选择商品哦')
                }
            },
            // 单击删除 一个分类 显示出部分 这个分类 下的所有商品的删除按钮
            async deleteShop(key){
                this.myResponseData[key].data.map((item) => {
                   item.isShowDel = true
                })
                this.$forceUpdate()
            },
            //全选一个类型的商品
            choosesCatgrayGoods(key){
                if (this.myResponseData[key].is_checked === false){
                    this.myResponseData[key].is_checked = true
                    console.log(key)
                    this.myResponseData[key].data.map((goods) => {
                        if (goods.status === 1){
                            goods.is_checked = true
                        }
                    })
                    this.choosesGoodsType(key)
                    this.$forceUpdate()
                    this.getSumData()
                } else { // 取消全选
                    this.myResponseData[key].is_checked = false
                    console.log(key)
                    this.myResponseData[key].data.map((goods) => {
                        goods.is_checked = false
                    })
                    this.$forceUpdate()
                    this.getSumData()
                }
            },
            //选择一个商品
            choosesGoods(key,goods_key){
                console.log("下标", key,goods_key)
                if (this.myResponseData[key].data[goods_key].status === 1) {
                    this.myResponseData[key].data[goods_key].is_checked = !this.myResponseData[key].data[goods_key].is_checked
                }

                let count = 0 //当前分类 选中的商品个数
                this.myResponseData[key].data.map((item) => {
                    if (item.is_checked) {
                        count ++
                    }
                })
                if (count === this.myResponseData[key].data.length) {
                    this.myResponseData[key].is_checked = true
                } else {
                    this.myResponseData[key].is_checked = false
                }
                this.choosesGoodsType(key)
                this.$forceUpdate()
                this.getSumData()
            },
            //全选商品
            choosesAllGoods(){
                if (this.mySum.is_checked) {
                    this.myResponseData.map((item) => {
                        item.is_checked = false
                        item.data.map(goods => {
                            goods.is_checked = false
                        })
                    })
                } else {

                    this.myResponseData.map((item) => {
                        let count = 0 //每个分类下 选中的商品个数
                        item.data.map(goods => {
                            if (goods.status === 1) {
                                goods.is_checked = true
                                count++
                            }
                        })
                        if (item.data.length === count) {
                            item.is_checked = true
                        } else {
                            item.is_checked = false
                        }
                        // 取消选择跨境商品
                        if (item.mold_id === 1 && this.myResponseData.length !== 1) {
                            item.data.map(goods => {
                                if (goods.status === 1) {
                                    goods.is_checked = false
                                }
                            })
                            item.is_checked = false
                        }
                    })
                }
                this.$forceUpdate()
                this.getSumData()
            },
            // 改变购买数量
            async changeStock(value1,key1,goods_key1){
                console.log('输入框的值：',value1,"下标：", key1,goods_key1)
                // 防抖
                _debounce((value = value1, key = key1, goods_key = goods_key1, _that = this) => {
                    let requestData = {
                        id: _that.myResponseData[key].data[goods_key].id,
                        num: value
                    }
                    _that.$minApi.carEdit(requestData).then(res => {
                        if (res.code === 200){
                            _that.myResponseData[key].data[goods_key].num = value
                            _that.$forceUpdate()
                            _that.getSumData()
                        }
                    })
                }, 1000)
            },
            //组合数据为想要的格式
            _myResponseData(){
                let map = {}, dest = []
                for(let i = 0; i < this.responseData.length; i++){
                    let ai = this.responseData[i] // 一个分类下的一个子商品
                    ai.is_checked = false // 一个分类下的一个子商品 是否被选中
                    ai.isShowDel = false  // 一个分类下的一个子商品 是否显示删除按钮
                    ai.categoryArr = this.responseData[i].key_name.length ? this.responseData[i].key_name.split('_') : [] // 一个分类下的一个子商品 规格
                    if(!map[ai.mold_id]){
                        dest.push({
                            is_checked: false,//是否全选一个分类
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
                console.log('把请求的数据组合成自己想要的格式：', dest)
                this.myResponseData = dest
            },
            //计算订单金额
            getSumData(){
                let temp = {sum_money:0.00,num:0, is_checked: false}, count = 0 //商品数量
                this.myResponseData.forEach((item1, index1) => {
                    item1.data.forEach((item2, index2) => {
                        count ++
                        if (item2.is_checked && item2.status === 1) {
                            temp.num ++
                            temp.sum_money += parseFloat(item2.price) * parseFloat(item2.num)
                        }
                    })
                })
                if (count === temp.num){
                    temp.is_checked = true
                } else {
                    temp.is_checked = false
                }
                this.mySum = temp
                this.$forceUpdate()
            },

            /**
             * 选择一个类型商品，如果这个商品为跨境商品，其他商品如果也选择了，取消选择其他商品
             * @param key
             */
            choosesGoodsType(key = 0){
                if (this.myResponseData[key].mold_id === 1){
                    this.myResponseData.map((item, index) => {
                        if (key !== index){
                            item.data.map(goods => {
                                if (goods.status === 1){
                                    goods.is_checked = false
                                }
                            })
                            item.is_checked = false
                        }
                    })
                } else {
                    this.myResponseData.map((item) => {
                        if (item.mold_id === 1){
                            item.data.map(goods => {
                                if (goods.status === 1){
                                    goods.is_checked = false
                                }
                            })
                            item.is_checked = false
                        }
                    })
                }
            },
			//判断有无token
			async landing(){
				const token = uni.getStorageSync('token')
				 if(token){
					this.flag = true;
				 }else{
					this.flag = false;
					let a = setInterval(()=>{
						uni.switchTab({
						  url: '/pages/tabs/mine'
						})
						 clearInterval(a); 
					 },1500)
				 }
			}
        },
		onLoad(){
			this.landing()
		},
        computed:{
            ...mapState(['userInfo']),
        },
        components: {
            uniNumberBox,
            uniLoadMore,
            uniSwipeAction,
            uniSwipeActionItem,
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        .car-list{
            padding-bottom: $uni-spacing-col-lg * 4;
            .section{
                background: #fff;
                margin-bottom: $uni-spacing-col-lg;
                .shop-name{
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #efefef;
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
                    @extend %border-color-solid-botton;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    box-sizing: border-box;
                    .chooses{
                        padding:0 $uni-spacing-row-sm;
                        display: flex;
                        align-items:center;
                    }
                    .goods-img{
                        padding:$uni-spacing-row-sm $uni-spacing-row-sm $uni-spacing-row-sm 0;
                        position: relative;
                        .img{
                            width: 180upx;
                            height: 180upx;
                            border-radius: 4px;
                        }
                        .mask{
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 180upx;
                            height: 180upx;
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
                        padding: $uni-spacing-row-sm 0;
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
        .no-car-list{
            padding: $uni-spacing-row-base;
            font-size: $uni-font-size-base;
            color: #AFAFAF;
            text-align: center;
            .img{
                width: 369upx;
                height: 316upx;
            }
            .btn{
                margin-top: 50upx;
                text{
                    color: #fff;
                    background: $color-primary;
                    text-align: center;
                    padding: $uni-spacing-col-base $uni-spacing-row-lg;
                    border-radius: 4upx;
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
            margin-bottom: var(--window-bottom);
            padding-bottom: 0;
			/* #endif */
            left: 0;
            display: flex;
            height: 100upx;
            line-height: 100upx;
            justify-content: space-between;
            font-size: $uni-font-size-lg;
            padding-left: $uni-spacing-row-sm;
            .chooses-all{
                height: 100upx;
                color: $color-primary-plain;
                display: flex;
                justify-content: flex-start;
                font-size: $uni-font-size-base;
                .iconfont{
                    margin-right: 10upx;
                }
            }
            .other{
                height: 100upx;
                display: flex;
                justify-content: flex-start;
                .money{
                    height: 100upx;
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
                    height: 100upx;
                }
            }
        }
    }
</style>
