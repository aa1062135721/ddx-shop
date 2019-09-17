<template>
    <view class="container">
        <view class="header">
            <!-- 头部-滚动渐变显示 -->
            <view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
                <view class="middle">
                    <view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</view>
                </view>
                <view class="icon-btn">
                    <view class="icon iconfont icon-ddx-shop-share"></view>
                </view>
            </view>
        </view>
        <!-- 商品主图轮播 -->
        <view class="swiper-box">
            <swiper circular="true" autoplay="true" :indicator-dots="true" indicator-active-color="#FC8A8A">
                <swiper-item v-for="(img_src,index) in goodsInfo.pics" :key="index">
                    <image :src="img_src" @click="previewImg(img_src, goodsInfo.pics)"></image>
                </swiper-item>
            </swiper>
        </view>
        <!-- 秒杀  -->
        <view class="info-box miaosha">
            <view class="left">
                <view class="top">
                    <text class="price">
                        ￥39.9
                    </text>
                    <text class="time-kill">
                        限时秒杀
                    </text>
                </view>
                <view class="bottom">
                    <text class="old-price">
                        ￥50.89
                    </text>
                </view>
            </view>
            <view class="right">
                <view class="one">
                    <view class="title">距离结束还剩</view>
                    <view class="time">
                        <text class="tag">{{timer.h}}</text>
                        <text class="no-tag">:</text>
                        <text class="tag">{{timer.m}}</text>
                        <text class="no-tag">:</text>
                        <text class="tag">{{timer.s}}</text>
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
                                <block v-if="serviceIndex !== 2">{{serviceItem.title + ' · '}}</block>
                                <block v-else>{{serviceItem.title}}</block>
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
            <separator title="图文详情" bgColor="#fff"></separator>
            <view class="content">
                <image v-for="(img, index) in goodsInfo.content" :src="img" :key="index" style="width: 100%;"></image>
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
                <block v-if="goodsInfo.remaining_stock === 0">
                    <view class='over'>已售完</view>
                </block>
                <block v-else>
                    <view class="joinCart" @click="open()">
                        加入购物车
                    </view>
                    <view class="buy" @click="open()">
                      立即购买
                    </view>
                </block>
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
                            <view class="stock">库存:{{goodsInfo.all_stock}}</view>
                            <view class="stock">限购:{{goodsInfo.buy_num}}</view>
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
                            <uni-number-box v-if="goodsInfo.buy_num <= goodsInfo.remaining_stock" :min="1" :max="goodsInfo.buy_num" :value="1" :step="1" @change="changeNum"></uni-number-box>
                            <uni-number-box v-else :min="1" :max="goodsInfo.remaining_stock" :value="1" :step="1" @change="changeNum"></uni-number-box>
                        </view>
                    </view>
                </view>
                <view class="btns">
                    <block v-if="goodsInfo.remaining_stock === 0">
                        <view class='over'>已下架</view>
                    </block>
                    <block v-else>
                        <view class="btn" style="background:#FC8A8A;" @click="buyNow(2)">
                            加入购物车
                        </view>
                        <view class="btn" @click="buyNow(1)">
                           立即购买
                        </view>
                    </block>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    var myTimer = null
    import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
    import separator from "@/components/separator.vue"
    import uniPopup from '@/components/uni-popup/uni-popup.vue'

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
                    id: 7,
                    update: 4,
                    pics: [
                        "http://picture.ddxm661.com/eb01020190906170524340.jpg"
                    ],
                    mold_id: 3,
                    content: [        //详情图片
                        "http://picture.ddxm661.com/77ee2201909061705302142.jpg",
                        "http://picture.ddxm661.com/d0830201909061705309030.jpg"
                    ],
                    title: "商品标题商品标题商品标题商品标题商品标题商品标题商品标题",   //名称
                    item_id: 21,  //商品id
                    item_name: "测试shang",
                    old_price: "0.00",    //原价
                    price: "2.00",        //拼团价
                    commander_price: "2.00",
                    people_num: 2,    //拼团一个需要多少人
                    buy_num: 2,   //每人限购数量
                    all_stock: 2,
                    remaining_stock: 2,       //剩余可拼团购买的数量
                    retail: 1,
                    begin_time: 1568251746,
                    end_time: 1568251748,
                    now_time: 1568251746,
                    hot: 0,
                    postage_id: 0,
                    mold: "熊猫自营",
                    item_service_ids: [       //服务
                        {
                            title: "品质保障",
                            content: "大手大脚按时缴费等是否会受到返回到数据库恢复1"
                        },
                        {
                            title: "质量保障",
                            content: "的撒发个递四方速递高富帅对光反射"
                        },
                        {
                            title: "权益保障",
                            content: "的挥洒复活点速发货速度符合速递会受到核辐射的回复数"
                        }
                    ],
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
        },
        components: {
            uniNumberBox,
            separator,
            uniPopup,
        },
        onReady(){
            this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
            myTimer = setInterval(this.getRTime, 1000);//设置定时器 每一秒执行一次
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
