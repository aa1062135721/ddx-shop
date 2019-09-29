<template>
    <view class="container">
        <view class="goods-info">
            <view class="goods-info-img">
                <image :src="responseData.item_pic" class="img"></image>
            </view>
            <view class="goods-info-infos">
                <view class="infos-title">
                    {{responseData.item_name}}
                </view>
                <view class="infos-other">
                    <view class="top">
                        <view class="new-money">
                            ￥
                            <!--当前登录的用户是团长-->
                            <block v-if="responseData.info[0].member_id === userInfo.id">{{responseData.assemble_price}}</block>
                            <!--当前登录的用户不是团长-->
                            <block v-else>{{responseData.tuanyuan_price}}</block>
                        </view>
                        <view class="tag">
                            {{responseData.num}}人拼团
                        </view>
                    </view>
                    <view class="bottom">
                        <text>单买价</text>
                        <text class="old-money">￥{{responseData.old_price}}</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="group-detail">
            <view class="text">
                <!-- status  //1 拼团中 2拼团成功 3拼团失败' -->
                <text v-if="responseData.status === 1">
                    <text v-if="responseData.r_num">仅剩<text class="num">{{responseData.r_num}}</text>个名额，</text>
                    <text class="time">{{timer.h + ":" + timer.m + ":" + timer.s }}</text>后结束
                </text>
                <text v-if="responseData.status === 2">拼团成功</text>
                <text v-if="responseData.status === 3">拼团失败，原因：{{responseData.reason}}</text>
            </view>
            <view class="heads">
                <view class="head" v-for="(item, index) in responseData.info" :key="index">
                    <image :src="item.pic" class="img"></image>
                    <view class="tag" v-if="item.commander === 1">团长</view>
                    <view class="tag" v-if="item.status === 0 && item.commander === 0">待支付</view>
                </view>
                <view class="head" v-for="index of responseData.r_num" :key="index">
                    <image src="../../static/images/help.png" class="img no-img"></image>
                </view>
            </view>
            <view class="btns">
                <button class="btn active" v-if="responseData.status === 1 && responseData.r_num !== 0" @click="shareGroup" open-type="share">已参团，邀请好友参团</button>
                <view class="btn plain" v-if="responseData.status === 2" @click="_goPage('group-buy')">再开一团</view>
                <view class="btn active" @click="open" v-if="user_ids.indexOf(userInfo.id) === -1">加入拼团</view>
            </view>
        </view>
        <!-- 购买的数量…… -->
        <uni-popup ref="selectSpecification" type="bottom" :custom="true">
            <view class="select-specification">
                <view class="goods-info">
                    <view class="main">
                        <view class="image" @click="previewImg(responseData.item_pic, [responseData.item_pic])">
                            <image class="img" :src='responseData.item_pic'></image>
                        </view>
                        <view class="info">
                            <view class="price">￥{{responseData.tuanyuan_price}}</view>
                            <view class="stock">
                                库存:
                                <text v-if="responseData.remaining_stock !== -1"> {{ responseData.remaining_stock}}</text>
                                <text v-else> 库存充足</text>
                            </view>
                            <view class="stock" v-if="responseData.buy_num !== -1">限购: {{ responseData.buy_num}}</view>
                            <view class="chooses"></view>
                        </view>
                        <view class="close">
                            <text class="iconfont icon-ddx-shop-close" @click="close()"></text>
                        </view>
                    </view>
                </view>
                <view class="buy-num">
                    <view class="main">
                        <view class="title">
                            购买数量
                        </view>
                        <view class="content">
                            <uni-number-box v-if="responseData.buy_num <= responseData.remaining_stock && responseData.buy_num !== -1 && responseData.remaining_stock !== -1" :min="1" :max="responseData.buy_num" :value="choosesGoodsInfo.num" :step="1" @change="changeNum"></uni-number-box>
                            <uni-number-box v-else :min="1" :value="choosesGoodsInfo.num" :step="1" @change="changeNum"></uni-number-box>
                        </view>
                    </view>
                </view>
                <view class="btns">
                    <view class='over' style="background: #FC5A5A;" @click="addGroup">确定</view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    var myTimer = null
    import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
    import uniPopup from '@/components/uni-popup/uni-popup.vue'
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                id:0,
                timer: {
                    h:`00`,
                    m:`00`,
                    s:`00`
                },
                responseData: {
                    item_id: 0,    //商品id
                    mold_id: 0,       //分区id
                    mold: "", //分区名称
                    buy_num: 2,       //限购数量，
                    remaining_stock: 2,   //库存，为-1表示不限制
                    tuanyuan_price:0,//团员价格
                    assemble_price:0,//团长价
                    update:0,//版本
                    assemble_id:0,//拼团id
                    assemble_list_id:0,//拼团活动id
                    price: 0,       //金额
                    end_time: 0,  //结束时间
                    reason: null, //如果失败，为失败原因
                    status: 1,    //1 拼团中 2拼团成功 3拼团失败',
                    r_num: 1, //还差几人
                    old_price: 0,   //原价
                    num: 3,   //几人团
                    item_name: "",   //商品名
                    item_pic: "",   //商品图片
                    time: 1569399771, //服务器当前时间
                    info: [],//参团人员信息
                },
                //选择的数量
                choosesGoodsInfo:{
                    num:1,
                },
                //参加拼团人的id集合
                user_ids:[

                ],
            }
        },
        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            //轮播图放大预览
            previewImg(src,urls){
                uni.previewImage({
                    indicator:'number',
                    current:src,
                    urls
                })
            },

            //倒计时
            getRTime(){
                // js获取的时间戳是13位的，精确到毫秒，而php获取的时间戳用strtotime是10位的，
                let t =(this.responseData.end_time * 1000) - (this.responseData.time * 1000)
                if (t<=0){
                    this.timer = { h:`00`, m: `00`, s: `00`}
                    clearInterval(myTimer)
                    return
                }
                let h=Math.floor(t/1000/60%24) //时
                let m=Math.floor(t/1000/60%60) //分
                let s=Math.floor(t/1000%60) //秒
                if(parseInt(h)<10){
                    h="0"+h
                }
                if(parseInt(m)<10){
                    m="0"+m
                }
                if(parseInt(s)<10){
                    s="0"+s
                }
                this.responseData.time ++
                this.timer = {h, m, s,}
            },
            // 分享拼团
            shareGroup(){

            },
            //加入拼团
            addGroup(){
                //件数，订单类型，总量，总金额, 商品参数
                let sumNum = 1,
                    createOrderType = 'group',
                    sumSum = this.choosesGoodsInfo.num,
                    sumMoney = parseFloat(this.choosesGoodsInfo.num) * parseFloat(this.responseData.tuanyuan_price),
                    myResponseData = [
                        {
                            mold_id: this.responseData.mold_id,
                            name: this.responseData.mold,
                            data:[]
                        }
                    ]
                let goods = {
                    categoryArr: [],//["S", "通过热望各位梵蒂冈如果", "还惹我"],//当前选中的规格名组合成数组
                    id: 0,//购物车id,这里是直接够买不是购物车够买，所以这里的数据设置为0
                    is_checked: false,//购物车里被选中为结算商品,这里是直接够买不是购物车够买，所以这里的数据设置为false
                    item_id: this.responseData.item_id, // 商品id
                    key: "",//"10_15_17",//当前选中的规格id组合
                    key_name: "",// "S_通过热望各位梵蒂冈如果_还惹我", //当前选中的规格名组合
                    mold: myResponseData[0].name,//"第一.1类型",//
                    mold_id: myResponseData[0].mold_id,//2,//
                    num: this.choosesGoodsInfo.num,//2,//够买数量
                    pic: this.responseData.item_pic,//"http://picture.ddxm661.com/75b9420190906171730779.jpg",//商品图片
                    price: this.responseData.tuanyuan_price,//"15.00",//商品价格
                    status: 1,// 1,//商品状态
                    store: this.responseData.buy_num, // -1,//商品库存
                    title: this.responseData.item_name,// "测试2",//商品标题
                }
                myResponseData[0].data.push(goods)
                this._goPage('order_submit', {
                    myResponseData,//购买的商品数据
                    sumNum,//件数
                    createOrderType,//订单类型
                    sumSum,//总量
                    sumMoney,//总金额
                    assemble_id: this.responseData.assemble_id,     //拼团活动id
                    num: this.choosesGoodsInfo.num,//购买数量
                    update: this.responseData.update,          //版本，拼团组详情的id
                    assemble_list_id: this.responseData.assemble_list_id,    //拼团组的id，非必传，不传表示自己开团，否则表示与别人成团
                })
            },

            //打开选择数量
            open(){
                this.$refs.selectSpecification.open()
            },
            close(){
                this.$refs.selectSpecification.close()
            },
            //购买数量更改
            changeNum(e){
                console.log(e)
                this.choosesGoodsInfo.num = e
            },
        },
        // 分享到朋友
        onShareAppMessage(res) {
            if (res.from === 'button') {// 来自页面内分享按钮
                console.log(res.target)
            }
            return {
                title: `${this.responseData.item_name}`,
                path: `pages/group-buy/group?id=${this.id}`
            }
        },
        onLoad(param){
            console.log("第一个参数", param)

            console.log("其他页面带过来的参数：", this.$parseURL())

            let requestData = {
                id: 0
            }
            if (param.id)   {
                requestData.id = param.id
                this.id = param.id
            }
            if (this.$parseURL().id){
                requestData.id = this.$parseURL().id
                this.id = this.$parseURL().id
            }

            this.$minApi.groupBuyDetail(requestData).then(res => {
                console.log(res)
                if (res.code === 200){

                    let user_ids = []
                    res.data.info.map(item => {
                        user_ids.push(item.member_id)
                    })
                    this.user_ids = user_ids

                    this.responseData = res.data
                    myTimer = setInterval(this.getRTime, 1000)//设置定时器 每一秒执行一次
                }
            })
        },
        onUnload(){
            clearInterval(myTimer);
        },
        components: {
            uniNumberBox,
            uniPopup,
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
    }
</script>

<style lang="scss">
    .container {
        .goods-info{
            padding: $uni-spacing-row-base;
            width: 100%;
            display: flex;
            background: #ffffff;
            justify-content: space-between;
            border-bottom: 1upx dashed #E4E4E4;
            .goods-info-img{
                width: 240upx;
                height: 240upx;
                .img{
                    height: 100%;
                    width: 100%;
                    border-radius: 8upx;
                }
            }
            .goods-info-infos{
                height: 240upx;
                width: calc(100% -  240upx - 30upx);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .infos-title{
                    @extend %overflow-2-line;
                    font-size: $uni-font-size-base;
                    color: $color-primary-plain;
                }
                .infos-other{
                    font-size: $uni-font-size-base;
                    color: #808080;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    .top{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .new-money{
                            color: #F82B2B;
                            margin-right: 8upx;
                        }
                        .tag{
                            height:32upx;
                            line-height: 32upx;
                            border-radius:0 16upx 16upx 0;
                            padding: 0 20upx;
                            background: #FC5A5A;
                            color: #ffffff;
                            font-size: $uni-font-size-sm;
                        }
                    }
                    .bottom{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        font-size: $uni-font-size-sm;
                        .old-money{
                            font-size: 20upx;
                            text-decoration: line-through;
                            margin-left: 8upx;
                        }
                    }
                }
            }
        }

        .group-detail{
            background: #fff;
            padding: $uni-spacing-row-base * 2;
            .text{
                text-align: center;
                font-size: $uni-font-size-base;
                color: $color-primary-plain;
                margin-bottom: 38upx;
                .num{
                    color: $color-primary;
                }
                .time{
                    color: #000;
                }
            }
            .heads{
                border: 1uxp solid red;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                margin-bottom: 38upx;
                .head{
                    position: relative;
                    width: 88upx;
                    height: 88upx;
                    margin: 20upx;
                    .img{
                        border-radius: 50%;
                        border: 1upx solid $color-primary;
                        width: 88upx;
                        height: 88upx;
                    }
                    .no-img{
                        border: 1upx dashed #D2D2D2;
                    }
                    .tag{
                        position: absolute;
                        left: 0;
                        bottom: -14upx;
                        height: 28upx;
                        line-height: 28upx;
                        width: 88upx;
                        text-align: center;
                        background: $color-primary;
                        font-size: $uni-font-size-sm;
                        color: #ffffff;
                        border-radius: 14upx;
                    }
                }
            }
            .btns{
                .btn{
                    width: 100%;
                    text-align: center;
                    line-height: 88upx;
                    height: 88upx;
                    border-radius:44upx;
                    font-size: $uni-font-size-base;
                    border: 1upx solid $color-primary;
                    margin-bottom: 40upx;
                    &.active{
                        border: 1upx solid $color-primary;
                        background: $color-primary;
                        color: #fff;
                    }
                    &.plain{
                        border: 1upx solid $color-primary;
                        background: #fff;
                        color: $color-primary;
                    }
                }
            }
        }

        /*  选择规格，数量后加入该购物车或者立即购买 */
        .select-specification{
            background: #fff;
            .goods-info{
                width: 100%;
                padding: 0 $uni-spacing-col-base;
                .main{
                    padding-top: $uni-spacing-col-base;
                    padding-bottom: $uni-spacing-col-base;
                    border-bottom:1upx #E4E4E4 solid;
                    display: flex;
                    flex-wrap: nowrap;
                    width: 100%;
                    justify-content: space-between;
                    .image{
                        width: 30%;
                        height: 100%;
                        .img{
                            width: 208upx;
                            height: 208upx;
                            border-radius: 4upx;
                        }
                    }
                    .info{
                        width: 60%;
                        height: 100%;
                        padding-left:$uni-spacing-col-base;
                        display: flex;
                        flex-direction: column;
                        .price{
                            color: $color-primary;
                            font-size: $uni-font-size-lg;
                        }
                        .stock{
                            color: #808080;
                            font-size: $uni-font-size-base;
                        }
                        .chooses{
                            color: $color-primary-plain;
                            font-size: $uni-font-size-lg;
                        }
                    }
                    .close{
                        width: 10%;
                        height: 100%;
                        position: relative;
                        .iconfont{
                            position: absolute;
                            top: 0;
                            right: 0;
                            font-size: $uni-font-size-lg + $uni-font-size-sm;
                        }
                    }
                }

            }
            .specification{
                width: 100%;
                padding:0 $uni-spacing-col-base;
                .main{
                    padding-top: $uni-spacing-col-base;
                    padding-bottom: $uni-spacing-col-base;
                    border-bottom:1upx #E4E4E4 solid;
                    .title{
                        color: $color-primary-plain;
                        font-size: $uni-font-size-lg;
                        padding-bottom: $uni-spacing-col-base;
                    }
                    .content{
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        text{
                            background: #F2F2F2;
                            border: 1upx solid #F2F2F2;
                            color: $color-primary-plain;
                            font-size: $uni-font-size-base;
                            margin-right: 20upx;
                            margin-bottom: 20upx;
                            padding:10upx 24upx;
                            border-radius:4upx;
                            &.on{
                                color: $color-primary;
                                border: 1upx solid $color-primary;
                                background: #FAE8E8;
                            }
                        }
                    }
                }
            }
            .buy-num{
                width: 100%;
                margin-bottom: 20upx;
                .main{
                    padding: $uni-spacing-col-base;
                    display: flex;
                    justify-content: space-between;
                    .title{
                        color: $color-primary-plain;
                        font-size: $uni-font-size-lg;
                        padding-bottom: $uni-spacing-col-base;
                    }
                    .content{
                        font-size: $uni-font-size-sm;
                    }
                }
            }
            .btns{
                width: 100%;
                height: 98upx;
                display: flex;
                justify-content:space-between;
                color: #fff;
                .btn{
                    background: $color-primary;
                    font-size: $uni-font-size-lg;
                    text-align: center;
                    height: 98upx;
                    width: 50%;
                    display: flex;
                    align-content: center;
                    align-items: center;
                    justify-content:center;
                }
                .over{
                    background: #666666;;
                    font-size: $uni-font-size-lg;
                    text-align: center;
                    height: 98upx;
                    line-height: 98upx;
                    width: 100%;
                    display: flex;
                    align-content: center;
                    align-items: center;
                    justify-content:center;
                }
            }
        }
    }
</style>
