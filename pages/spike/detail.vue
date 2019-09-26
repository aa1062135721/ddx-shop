<template>
    <view class="container">
        <view class="header">
            <!-- 头部-滚动渐变显示 -->
            <view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
                <view class="middle">
                    <view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</view>
                </view>
                <view class="icon-btn" @click="openShare">
                    <view class="icon iconfont icon-ddx-shop-share"></view>
                </view>
            </view>
        </view>
        <!-- 商品主图轮播 -->
        <view class="swiper-box">
            <swiper circular="true" autoplay="true" :indicator-dots="true" indicator-active-color="#FC8A8A">
                <swiper-item v-for="(img_src,index) in goodsInfo.pics" :key="index">
                    <image :src="img_src" @click="previewImg(img_src, goodsInfo.pics)" :lazy-load="true"></image>
                </swiper-item>
            </swiper>
        </view>
        <!-- 秒杀  -->
        <view class="info-box miaosha">
            <view class="left">
                <view class="top">
                    <text class="price">
                        ￥{{goodsInfo.price}}
                    </text>
                    <text class="time-kill">
                        限时秒杀
                    </text>
                </view>
                <view class="bottom">
                    <text class="old-price">
                        ￥{{goodsInfo.old_price}}
                    </text>
                </view>
            </view>
            <view class="right">
                <view class="one" v-if="goodsInfo.begin === 1">
                    <view class="title">距离结束还剩</view>
                    <view class="time">
                        <text class="tag">{{timer.h}}</text>
                        <text class="no-tag">:</text>
                        <text class="tag">{{timer.m}}</text>
                        <text class="no-tag">:</text>
                        <text class="tag">{{timer.s}}</text>
                    </view>
                </view>
                <view class="one" v-if="goodsInfo.begin === 3">
                    <view class="title">秒杀状态</view>
                    <view class="time">
                        <text class="tag">已经结束</text>
                    </view>
                </view>
                <view class="one" v-if="goodsInfo.begin === 2">
                    <view class="title">秒杀状态</view>
                    <view class="time">
                        <text class="tag">即将开始</text>
                    </view>
                </view>
                <view>
                    <i class="iconfont icon-ddx-shop-content_arrows"></i>
                </view>
            </view>
        </view>
        <!-- 标题 -->
        <view class="info-box goods-info">
            <view class="title">
                <text class="tag" v-if="goodsInfo.mold_id">{{goodsInfo.mold}}</text>
                {{goodsInfo.title}}
            </view>
        </view>

        <!--服务说明-->
        <view class="info-box goods-info2" v-if="goodsInfo.item_service_ids.length" @click="openService">
            <view class="item">
                <view class="one">
                    <text class="title">服务</text>
                    <text class="comtent">
                        <block v-for="(serviceItem, serviceIndex) in goodsInfo.item_service_ids" :key="serviceIndex">
                            <!-- 标题只渲染 0,1,2-->
                            <block v-if="serviceIndex < 3">
                                {{serviceItem.title + '  '}}
                            </block>
                        </block>
                    </text>
                </view>
                <view class="two">
                    <text class="iconfont icon-ddx-shop-content_arrows"></text>
                </view>
            </view>
        </view>
        <!-- 服务说明 -->
        <uni-popup ref="myService" type="bottom" :custom="true" v-if="goodsInfo.item_service_ids.length">
            <view class="my-service">
                <view class="my-service-title">服务说明</view>
                <view class="my-service-box">
                    <view class="item" v-for="(item, index) in goodsInfo.item_service_ids" :key="index">
                        <view class="title-and-point">
                            <view class="point"></view>
                            <view class="title">{{item.title}}</view>
                        </view>
                        <view class="title-and-point">
                            <view class="point on"></view>
                            <view class="title on">{{item.content}}</view>
                        </view>
                    </view>
                </view>
                <view class="btn" @click="closeService">确定</view>
            </view>
        </uni-popup>

        <!-- 评价 -->
        <view class="info-box comments" id="comments">
            <view class="row">
                <view class="text">商品评价(500)</view>
                <view class="arrow" @click="this.$openPage('goods_evaluate')">
                    <view class="show">
                        查看全部
                        <view class="iconfont icon-ddx-shop-content_arrows"></view>
                    </view>
                </view>
            </view>
            <view class="comment">
                <view class="user-info">
                    <view class="head-name">
                        <view class="face"><image src="../../static/images/goods.jpg"></image></view>
                        <view class="username">用户名</view>
                    </view>
                    <view class="time">2019-11-11</view>
                </view>
                <view class="content">
                    评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容
                </view>
            </view>
        </view>

        <!-- 详情 -->
        <view class="description">
            <view class="title">
                <text :class="{'on': showTabWho === 'detail'}" @click="showTabWho = 'detail'">图文详情</text>
                <text :class="{'on': showTabWho === 'know'}" @click="showTabWho = 'know'" v-if="buyYouKnow">购买须知</text>
            </view>
            <view class="content"  v-if="showTabWho === 'detail'">
                <image v-for="(img, index) in goodsInfo.content" :src="img" :key="index" style="width: 100%;" :lazy-load="true" mode="widthFix"></image>
            </view>
            <view class="content-know" v-if="showTabWho === 'know'">
                <rich-text :nodes="buyYouKnow"></rich-text>
            </view>
        </view>

        <!-- 底部菜单 -->
        <view class="footer">
            <view class="icons">
                <view class="box"  @click="_goPage('home')">
                    <view class="iconfont icon-ddx-shop-shopping"></view>
                    <view class="text">商城</view>
                </view>
                <view class="box" @click="_goPage('car')">
                    <view class="iconfont icon-ddx-shop-shopping-cart-o"></view>
                    <view class="text">购物车</view>
                    <view class="number">11</view>
                </view>
            </view>
            <view class="btn">
                <view class="joinCart" @click="_goPage('goods_detail_redirect', {id:goodsInfo.item_id})">
                    <view class="inner">
                        ￥{{goodsInfo.old_price}}
                        <br>
                        单独购买
                    </view>
                </view>
                <view class="buy" @click="open()" v-if="goodsInfo.begin === 1">
                    立即秒杀
                </view>
                <view class="buy" style="background:#F9A13A;" v-if="goodsInfo.begin === 2">
                    待开始
                </view>
                <view class="buy" style="background:#F9A13A;" v-if="goodsInfo.begin === 3">
                    已结束
                </view>
            </view>
        </view>

        <!-- 购买的时候选择规格，数量…… -->
        <uni-popup ref="selectSpecification" type="bottom" :custom="true" @change="change">
            <view class="select-specification">
                <view class="goods-info">
                    <view class="main">
                        <view class="image">
                            <image class="img" :src='goodsInfo.pics[0]'></image>
                        </view>
                        <view class="info">
                            <view class="price">￥{{goodsInfo.price}}</view>
                            <view class="stock">限购: 1</view>
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
                            <uni-number-box  :min="1" :max="1" :value="1" :step="1" @change="changeNum"></uni-number-box>
                        </view>
                    </view>
                </view>
                <view class="btns">
                    <view class="btn" style="background:#FC8A8A;" @click="_goPage('goods_detail_redirect', {id:goodsInfo.item_id})">
                        <view class="inner">
                            ￥{{goodsInfo.old_price}}
                            <br>
                            单独购买
                        </view>
                    </view>
                    <view class="btn" @click="createOreder" v-if="goodsInfo.begin === 1">
                       立即秒杀
                    </view>
                    <view class="btn" style="background:#F9A13A;" v-if="goodsInfo.begin === 2">
                        待开始
                    </view>
                    <view class="btn" style="background:#F9A13A;" v-if="goodsInfo.begin === 3">
                        已结束
                    </view>
                </view>
            </view>
        </uni-popup>

        <!-- 分享转发功能 -->
        <uni-popup ref="share" type="center" :custom="true">
            <view class="share-goods">
                <view class="share-title">
                    <view class="titles">
                        <view class="title">分享给好友</view>
                        <view class="sub-title" v-if="shareData.price">可获得佣金 最高 <span class="share-money">{{ shareData.price | moneyToFixed }}元</span></view>
                    </view>
                    <view class="share-images">
                        <image src="../../static/images/share/share-red-envelope.png" class="img" mode="widthFix"></image>
                    </view>
                </view>
                <view class="goods-image">
                    <image :src="shareData.pic" mode="widthFix" class="goods-img"></image>
                </view>
                <view class="share-btns">
                    <view class="content">
                        <button class="box" open-type="share">
                            <image src="../../static/images/share/share-wx.png" class="img"></image>
                            <view class="tag">微信好友</view>
                        </button>
                        <button class="box" @click="downLoadShareImage">
                            <image src="../../static/images/share/share-download.png" class="img"></image>
                            <view class="tag">保存图片</view>
                        </button>
                    </view>
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
    import {mapActions} from 'vuex'

    export default {
        name: "detail",
        data() {
            return {
                timer: {
                    h:`00`,
                    m:`00`,
                    s:`00`
                },

                goodsInfo: {
                     id: 0,
                     item_id: 0,
                     old_price: "0.00",
                     price: "0.00",
                     start_time: 1569027600,
                     end_time: 1569031200,
                     title: "",
                     item_service_ids: [],
                     num: 0,
                     pics: [],
                     content: [],
                     mold_id: 0,
                     begin: 1,
                     end_or_start: "",
                     now_time: 1569054271,
                     mold: ""
                },
                //购买须知
                buyYouKnow:'',
                showTabWho:'detail',// detail 图文详情    know 购买须知
                //分享数据
                shareData:{
                    price:0,
                    pic:'',
                },

                //控制渐变标题栏的参数
                beforeHeaderzIndex: 11,//层级
                afterHeaderzIndex: 10,//层级
                beforeHeaderOpacity: 1,//不透明度
                afterHeaderOpacity: 0,//不透明度

                anchorlist:[],//导航条锚点
                selectAnchor:0,//选中锚点

                //当前已经选择了的商品，数量
                choosesGoodsInfo:{
                    num:1,//选择购物数量
                },
            }
        },
        methods: {
            ...mapActions(['saveShareID']),
            _goPage(url, query = {}) {
                this.$openPage({name: url, query})
            },
            //轮播图放大预览
            previewImg(src, urls) {
                uni.previewImage({
                    indicator: 'number',
                    current: src,
                    urls
                })
            },
            //商品评论
            toRatings() {
                uni.navigateTo({
                    url: 'ratings/ratings'
                })
            },
            //跳转锚点
            toAnchor(index){
                this.selectAnchor = index;
                uni.pageScrollTo({scrollTop: this.anchorlist[index].top,duration: 200});
            },
            //计算锚点高度
            calcAnchor(){
                this.anchorlist=[
                    {name:'主图',top:0},
                    {name:'评价',top:0},
                    {name:'详情',top:0}
                ]
                let commentsView = uni.createSelectorQuery().select("#comments");
                commentsView.boundingClientRect((data) => {
                    let statusbarHeight = 0;
                    //APP内还要计算状态栏高度
                    // #ifdef APP-PLUS
                    statusbarHeight = plus.navigator.getStatusbarHeight()
                    // #endif
                    let headerHeight = uni.upx2px(100);
                    this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
                    this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;

                }).exec();
            },
            //打开选择规格弹框
            open(){
                this.$refs.selectSpecification.open()
            },
            close(){
                this.$refs.selectSpecification.close()
            },
            //选择规格
            change(e) {
                console.log(e.show)
            },

            //打开服务说明
            openService(){
                this.$refs.myService.open()
            },
            closeService(){
                this.$refs.myService.close()
            },

            //秒杀倒计时
            getRTime(){
                // js获取的时间戳是13位的，精确到毫秒，而php获取的时间戳用strtotime是10位的，
                let t =(this.goodsInfo.end_time * 1000) - (this.goodsInfo.now_time * 1000)
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
                this.goodsInfo.now_time ++
                this.timer = {h, m, s,}
            },

            /**
             * 下单
             */
            createOreder(){
                this.close()
                //件数，订单类型，总量，总金额, 商品参数
                let sumNum = 1,
                    createOrderType = 'spike',
                    sumSum = 1,
                    sumMoney = this.goodsInfo.price,
                    myResponseData = [
                        {
                            mold_id: this.goodsInfo.mold_id,
                            name: this.goodsInfo.mold,
                            data:[]
                        }
                    ]
                let goods = {
                    categoryArr: [],//["S", "通过热望各位梵蒂冈如果", "还惹我"],//当前选中的规格名组合成数组
                    id: 0,//购物车id,这里是直接够买不是购物车够买，所以这里的数据设置为0
                    is_checked: false,//购物车里被选中为结算商品,这里是直接够买不是购物车够买，所以这里的数据设置为false
                    item_id: this.goodsInfo.item_id, // 商品id
                    key: "",//"10_15_17",//当前选中的规格id组合
                    key_name: "",// "S_通过热望各位梵蒂冈如果_还惹我", //当前选中的规格名组合
                    mold: myResponseData[0].name,//"第一.1类型",//
                    mold_id: myResponseData[0].mold_id,//2,//
                    num: 1,//2,//够买数量
                    pic: this.goodsInfo.pics[0],//"http://picture.ddxm661.com/75b9420190906171730779.jpg",//商品图片
                    price:  this.goodsInfo.price,//"15.00",//商品价格
                    status: 1,// 1,//商品状态
                    store: -1, // -1,//商品库存
                    title: this.goodsInfo.title,// "测试2",//商品标题
                }
                myResponseData[0].data.push(goods)
                this._goPage('order_submit', {
                    myResponseData,//购买的商品数据
                    sumNum,//件数
                    createOrderType,//订单类型
                    sumSum,//总量
                    sumMoney,//总金额
                    seckill_id: this.goodsInfo.id,//秒杀商品id
                })
            },

            //打开分享弹框
            async openShare(){
                if (!this.shareData.pic){
                    uni.showLoading({
                        title: '加载中…',
                        mask:true,
                    })
                    let requestData = {
                        scene: `user_id=${this.userInfo.id}&id=${this.goodsInfo.id}`,
                        page: 'pages/spike/detail',
                        pic: this.goodsInfo.pics[0],
                        title: this.goodsInfo.title,
                        price: `￥${this.goodsInfo.price}`,
                        goods_id: this.goodsInfo.item_id,
                    }
                    await this.$minApi.shareGoods(requestData).then(res => {
                        console.log("获取分享数据：", res)
                        if (res.code === 200) {
                            this.shareData = res.data
                            this.$refs.share.open()
                            uni.hideLoading()
                        } else {
                            uni.hideLoading()
                        }
                    }).catch(err => {
                        uni.hideLoading()
                    })
                } else {
                    this.$refs.share.open()
                }
            },
            closeShare(){
                this.$refs.share.close()
            },
            //下载分享图片
            downLoadShareImage(){
                uni.downloadFile({
                    url: this.shareData.pic,
                    success: (res) => {
                        if (res.statusCode === 200) {
                            uni.saveImageToPhotosAlbum({
                                filePath:res.tempFilePath,
                                success:()=>{
                                    this.closeShare()
                                    this.msg('下载成功')
                                }
                            })
                        }
                    }
                })
            },
        },
        components: {
            uniNumberBox,
            uniPopup,
        },
        // 分享到朋友
        onShareAppMessage(res) {
            if (res.from === 'button') {// 来自页面内分享按钮
                console.log(res.target)
            }
            return {
                title: `${this.goodsInfo.title}`,
                path: `pages/spike/detail?user_id=${this.userInfo.id}&id=${this.goodsInfo.id}`
            }
        },
        async onLoad(param){
            let requestData = {
                id:0,
            }
            console.log("带过来的参数1:", param)
            if (param.id){
                requestData.id = param.id
            }
            if (param.user_id){
                this.saveShareID(param.user_id)
            }

            if (this.$parseURL().id){
                requestData.id = this.$parseURL().id
            }
            console.log("其他页面带过来的参数2：",this.$parseURL())

            await this.$minApi.seckillGoodsInfo(requestData).then(res => {
                if (res.code === 200) {
                    this.goodsInfo = res.data
                    //1：正在抢购，2即将开始，3已结束
                    if (res.data.begin === 1){
                        myTimer = setInterval(this.getRTime, 1000);//设置定时器 每一秒执行一次
                    }

                }
            })
            // 购买须知
            if (this.goodsInfo.mold_id) {
                await this.$minApi.buyYouKnow({id:this.goodsInfo.mold_id}).then(res => {
                    console.log("购买须知：",res)
                    if (res.code === 200) {
                        this.buyYouKnow = res.data.content
                    }
                })
            }
        },
        onReady(){
            this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
        },
        onUnload(){
            clearInterval(myTimer);
        },
        onPageScroll(e) {
            //锚点切换
            this.selectAnchor = e.scrollTop>=this.anchorlist[2].top?2:e.scrollTop>=this.anchorlist[1].top?1:0;
            //导航栏渐变
            let tmpY = 375;
            e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
            this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
            this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
            //切换层级
            this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
            this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
    }
</script>

<style lang="scss">
    @import '../../static/css/goods_detail.scss';

    .miaosha{
        background: #FC5A5A;
        margin-bottom: 0;
        color: #ffffff;
        padding-top: $uni-spacing-col-base;
        padding-bottom: $uni-spacing-col-base;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .left{
            .top{
                font-size: $uni-font-size-base;
                .price{
                    margin-right: 28upx;
                }
                .time-kill{

                }
            }
            .bottom{
                .old-price{
                    text-decoration: line-through;
                    color: #FBC7C7;
                    font-size: $uni-font-size-sm;
                }
            }
        }
        .right{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .one{
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-right: 18upx;
                .title{
                    font-size: $uni-font-size-base;
                }
                .time{
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    font-size: $uni-font-size-sm;
                    .tag{
                        background: #ffffff;
                        border-radius: 2upx;
                        padding: 0 4upx;
                        height: 28upx;
                        line-height: 28upx;
                        color: $color-primary;
                    }
                    .no-tag{
                        height: 28upx;
                        line-height: 28upx;
                        padding: 0 2upx;
                    }
                }
            }
            .iconfont{
                color: #ffffff;
                font-size: $uni-font-size-base;
            }
        }
    }
</style>
