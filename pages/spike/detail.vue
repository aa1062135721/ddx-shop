<template>
    <view class="container">

        <view class="header">
            <!-- 头部-滚动渐变显示 -->
            <view class="after">
                <view class="icon-btn-left" @click="_goBack">
                    <view class="icon iconfont icon-ddx-shop-content_arrows"></view>
                </view>
                <view class="middle">
                    <view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</view>
                </view>
<!--                <view class="icon-btn" @click="openShareH5">-->
<!--                    <view class="icon iconfont icon-ddx-shop-share"></view>-->
<!--                </view>-->
            </view>
        </view>
        <!-- 商品主图轮播 -->
        <view class="swiper-box">
            <swiper circular="true" :indicator-dots="true" indicator-active-color="#FC8A8A" @change="swiperHandle">
                <swiper-item style="display: flex;flex-direction: column;justify-content: center;background: #000;" v-if="goodsInfo.item.video">
                    <video id="myVideo" :src="goodsInfo.item.video"
                           controls
                           style="width: 100%;"
                    ></video>
                </swiper-item>
                <swiper-item v-for="(img_src,index) in goodsInfo.item.pics" :key="index">
                    <image :src="img_src" @click="previewImg(img_src, goodsInfo.item.pics)" :lazy-load="true"></image>
                </swiper-item>
            </swiper>
        </view>
        <!-- 秒杀倒计时  -->
        <view class="info-box miaosha">
            <view class="left">
                <view class="top">
                    <text class="price">
                        ￥{{goodsInfo.item.price}}
                    </text>
                    <text class="time-kill">
                        {{goodsInfo.title}}
                    </text>
                </view>
                <view class="bottom">
                    <span class="old-price">
                        ￥{{goodsInfo.item.old_price}}
                    </span>
                    <span class="mei-ren-xian-gou">每人限购:
                        <block v-if="goodsInfo.people_num === -1">
                            不限购
                        </block>
                        <block v-else>
                        {{goodsInfo.people_num}}件
                        </block>
                    </span>
                    <span class="mei-ren-xian-gou" v-if="goodsInfo.item_specs.length === 1">
                        <block v-if="goodsInfo.type === 2">已秒杀</block>
                        <block v-if="goodsInfo.type === 1">已抢购</block>
                        {{choosesGoodsInfo.specs.already_num}}件
                        <block v-if="choosesGoodsInfo.specs.over_num !== -1">
                            ,剩余{{choosesGoodsInfo.specs.over_num}}件
                        </block>
                    </span>
                </view>
            </view>
            <view class="right">
                <view class="one" v-if="goodsInfo.status === 1">
                    <view class="title">距离结束还剩</view>
                    <view class="time">
                        <block v-if="timer.d">
                            <text class="tag">{{timer.d}}</text>
                            <text class="no-tag">天</text>
                        </block>
                        <text class="tag">{{timer.h}}</text>
                        <text class="no-tag">:</text>
                        <text class="tag">{{timer.m}}</text>
                        <text class="no-tag">:</text>
                        <text class="tag">{{timer.s}}</text>
                    </view>
                </view>
                <view class="one" v-if="goodsInfo.status === 3">
                    <view class="title">秒杀状态</view>
                    <view class="time">
                        <text class="tag">已经结束</text>
                    </view>
                </view>
                <view class="one" v-if="goodsInfo.status === 2">
                    <view class="title">距离开始还剩</view>
                    <view class="time">
                            <block v-if="timer.d">
                                <text class="tag">{{timer.d}}</text>
                                <text class="no-tag">天</text>
                            </block>
                            <text class="tag">{{timer.h}}</text>
                            <text class="no-tag">:</text>
                            <text class="tag">{{timer.m}}</text>
                            <text class="no-tag">:</text>
                            <text class="tag">{{timer.s}}</text>
                    </view>
                </view>
            </view>
        </view>
        <!-- 标题 -->
        <view class="info-box goods-info">
            <view class="title">
                <div class="title-left">
                    <text class="tag" v-if="goodsInfo.item.mold_id">{{goodsInfo.item.mold}}</text>
                    {{goodsInfo.item.title}}
                </div>
                <div class="title-right" @click="openShareH5">
                    <span class="iconfont icon-ddx-shop-share"></span>
                    <span class="share-money" v-show="goodsInfo.item.ratio !== '0.00'">赚{{goodsInfo.item.ratio}}</span>
                </div>
            </view>
            <!-- 子标题 -->
            <view class="sub-title" v-if="goodsInfo.item.subtitle">
                {{goodsInfo.item.subtitle}}
            </view>
            <view class="promise">
                温馨提示：下单后48小时内发货
            </view>
            <!--  承诺  -->
            <view class="promise" v-if="goodsInfo.item.promise">
                {{goodsInfo.item.promise}}
            </view>
        </view>

        <!--	跨境购买 单独展示的文字 	-->
        <div class="cross-border-goods" v-if="goodsInfo.item.mold_id === 1">
            <view class="title">
                <text class="tag">提示</text>
                用户下单后，保税商品预计在2-3个工作日送达，直邮商品7-15个工作日送达。按照国家新政对跨境商品征收跨境综合税。跨境购订单需要顾客保持信息一致，要求顾客支付人姓名、收货人姓名、实名认证的姓名一致。
            </view>
            <view class="sub-title">
                <view class="tag">%</view>
                您购买成功后，实际支付的价格已含9.1%的跨境代扣税
            </view>
        </div>

        <!--服务说明-->
        <view class="my-service-title-btn" @click="openService">
            <view class="item">
                <view class="one">
                    <view class="title">说明</view>
                    <view class="content" v-if="goodsInfo.item.mold_id !== 1">
                        <view>
                            <text class="iconfont icon-ddx-shop-tick"></text>捣蛋熊发货&售后
                        </view>
                        <view>
                            <text class="iconfont icon-ddx-shop-tick"></text> 全国配送
                        </view>
                        <view>
                            <text class="iconfont icon-ddx-shop-tick"></text> 极速达
                        </view>
                        <view>
                            <text class="iconfont icon-ddx-shop-tick"></text> 极速退款
                        </view>
                        <view>
                            <text class="iconfont icon-ddx-shop-tick"></text>支持7天无理由退货
                        </view>
                        <view>
                            <text class="iconfont icon-ddx-shop-tick"></text> 满99元包邮
                        </view>
                    </view>
                    <view class="content" v-else>
                        <view>
                            <text class="iconfont icon-ddx-shop-tick"></text>捣蛋熊发货&售后
                        </view>
                        <view>
                            <text class="iconfont icon-ddx-shop-tick"></text> 全国包邮
                        </view>
                        <view>
                            <text class="iconfont icon-ddx-shop-tick"></text> 海关监管
                        </view>
                        <view>
                            <text class="iconfont icon-ddx-shop-tick"></text> 满99元包邮
                        </view>
                        <view>
                            <text class="iconfont icon-ddx-shop-jinyong" style="color: #CCCCCC;"></text>不支持无理由退换货
                        </view>
                    </view>
                </view>
                <view class="two">
                    <text class="iconfont icon-ddx-shop-content_arrows"></text>
                </view>
            </view>
        </view>
        <!-- 服务说明 -->
        <uni-popup ref="myService" type="bottom" :custom="true">
            <view class="my-service">
                <view class="my-service-title">服务说明</view>
                <view class="my-service-box">
                    <block v-if="goodsInfo.item.mold_id !== 1">
                        <view class="item">
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick"></view>
                                <view class="title">捣蛋熊发货&售后</view>
                            </view>
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick on"></view>
                                <view class="title on">由捣蛋熊猫发货并提供售后服务</view>
                            </view>
                        </view>
                        <view class="item">
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick"></view>
                                <view class="title">满99元包邮</view>
                            </view>
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick on"></view>
                                <view class="title on">满足条件99元均可包邮发货 除西藏、新疆、青海、内蒙古以及港澳台不包邮</view>
                            </view>
                        </view>
                        <view class="item">
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick"></view>
                                <view class="title">全国配送</view>
                            </view>
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick on"></view>
                                <view class="title on">满足条件全国范围均可包邮发货 除西藏、新疆、青海、内蒙古以及港澳台不包邮</view>
                            </view>
                        </view>
                        <view class="item">
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick"></view>
                                <view class="title">极速达</view>
                            </view>
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick on"></view>
                                <view class="title on">商城自营部分商品，重庆主城区3点前下单，当天送达，3点后下单，次日达。（除了自然灾害、天气因素外）</view>
                            </view>
                        </view>
                        <view class="item">
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick"></view>
                                <view class="title">支持7天无理由退货</view>
                            </view>
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick on"></view>
                                <view class="title on">支持7天无理由退货</view>
                            </view>
                        </view>
                        <view class="item">
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick"></view>
                                <view class="title">极速退款</view>
                            </view>
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick on"></view>
                                <view class="title on">满足相应条件时，申请退款后，24小时内到账。</view>
                            </view>
                        </view>
                    </block>
                    <block v-else>
                        <view class="item">
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick"></view>
                                <view class="title">捣蛋熊发货&售后</view>
                            </view>
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick on"></view>
                                <view class="title on">由捣蛋熊猫发货并提供售后服务</view>
                            </view>
                        </view>
                        <view class="item">
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick"></view>
                                <view class="title">满99元包邮</view>
                            </view>
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick on"></view>
                                <view class="title on">满足条件99元均可包邮发货 除西藏、新疆、青海、内蒙古以及港澳台不包邮</view>
                            </view>
                        </view>
                        <view class="item">
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick"></view>
                                <view class="title">全国包邮</view>
                            </view>
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick on"></view>
                                <view class="title on">所有商品均可包邮发货，除西藏、新疆、青海、内蒙古以及港澳台不包邮</view>
                            </view>
                        </view>
                        <view class="item">
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick"></view>
                                <view class="title">海关监管</view>
                            </view>
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-tick on"></view>
                                <view class="title on">订单均有海关监管，正品保障</view>
                            </view>
                        </view>
                        <view class="item">
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-jinyong" style="color: #CCCCCC;"></view>
                                <view class="title">不支持无理由退换货</view>
                            </view>
                            <view class="title-and-point">
                                <view class="iconfont icon-ddx-shop-jinyong on"></view>
                                <view class="title on">因跨境订单的特殊性，不享受无理由退换货</view>
                            </view>
                        </view>
                    </block>
                </view>
                <view class="btn" @click="closeService">确定</view>
            </view>
        </uni-popup>

        <!-- 选择商品 商品信息  -->
        <view class="info-box goods-info2" v-if="goodsInfo.attributes">
            <view class="item" @click="open">
                <view class="one">
                    <text class="title">选择规格</text>
                    <text class="comtent">
                        <text>{{goodsInfo.attributes}}</text>
                    </text>
                </view>
                <view class="two">
                    <text class="iconfont icon-ddx-shop-content_arrows"></text>
                </view>
            </view>
        </view>

        <!-- 评价 -->
        <view class="info-box comments" id="comments">
            <view class="row">
                <view class="text">商品评价({{commentResponseData.count}})</view>
                <view class="arrow" @click="_goPage('goods_evaluate', {id: goodsInfo.item.id})">
                    <view class="show">
                        查看全部
                        <text class="iconfont icon-ddx-shop-content_arrows"></text>
                    </view>
                </view>
            </view>
            <view class="comment" v-for="(item, index) in commentResponseData.data" :key="index">
                <view class="user-info">
                    <view class="head-name">
                        <view class="face"><image :src="item.m_pic"></image></view>
                        <view class="username">{{item.nickname}}</view>
                    </view>
                    <view class="time">{{item.add_time}}</view>
                </view>
                <view class="content">
                    {{item.comment}}
                </view>
            </view>
        </view>

        <!-- 详情 -->
        <view class="description" id="description">
            <view class="title">
                <text :class="{'on': showTabWho === 'detail'}" @click="showTabWho = 'detail'">图文详情</text>
                <text :class="{'on': showTabWho === 'know'}" @click="showTabWho = 'know'" v-if="goodsInfo.item.mold_know">购买须知</text>
            </view>
            <view class="content"  v-if="showTabWho === 'detail'">
                <rich-text :nodes="goodsInfo.item.content"></rich-text>
            </view>
            <view class="content-know" v-if="showTabWho === 'know'">
                <view v-html="goodsInfo.item.mold_know"></view>
            </view>
        </view>

        <!-- 底部菜单 -->
        <view class="footer">
            <view class="icons">
                <view class="box"  @click="_goPage('home')">
                    <view class="iconfont icon-ddx-shop-shopping"></view>
                    <view class="text">商城</view>
                </view>
                <view class="box" @click="contactCustomerService">
                    <view class="iconfont icon-ddx-shop-pingjia-"></view>
                    <view class="text">客服</view>
                </view>
                <view class="box" @click="_goPage('car')">
                    <view class="iconfont icon-ddx-shop-shopping-cart-o"></view>
                    <view class="text">购物车</view>
                    <view class="number" v-if="carNum">{{carNum}}</view>
                </view>
            </view>
            <view class="btn">
                <view class="joinCart" @click="_goPage('goods_detail', {id: goodsInfo.item.id})">
                    <view class="inner">
                        单独购买
                    </view>
                </view>
                <view class="buy" @click="open()" v-if="goodsInfo.status === 1">
                    <block v-if="goodsInfo.type === 2">立即秒杀</block>
                    <block v-if="goodsInfo.type === 1">立即抢购</block>
                </view>
                <view class="buy" style="background:#F9A13A;" v-if="goodsInfo.status === 2">
                    待开始
                </view>
                <view class="buy" style="background:#F9A13A;" v-if="goodsInfo.status === 3">
                    已结束
                </view>
            </view>
        </view>

        <!-- 购买的时候选择规格，数量…… -->
        <uni-popup ref="selectSpecification" type="bottom" :custom="true">
            <view class="select-specification">
                <view class="goods-info">
                    <view class="main">
                        <view class="image">
                            <image class="img" :src='choosesGoodsInfo.specs.pic' @click="previewImg(choosesGoodsInfo.specs.pic, [choosesGoodsInfo.specs.pic])"></image>
                        </view>
                        <view class="info">
                            <view class="price">￥{{choosesGoodsInfo.specs.price}}</view>
<!--                            <view class="stock">限购: 5</view>-->
<!--                            <view class="chooses"></view>-->
                            <view class="stock">
                                已秒杀{{choosesGoodsInfo.specs.already_num}}件，剩余
                                <block v-if="choosesGoodsInfo.specs.over_num === -1">99<sup>+</sup></block>
                                <block v-else>{{choosesGoodsInfo.specs.over_num}}</block>
                                件
                            </view>
                        </view>
                        <view class="close">
                            <text class="iconfont icon-ddx-shop-close" @click="close()"></text>
                        </view>
                    </view>
                </view>
                <view class="specification" v-if="goodsInfo.attributes">
                    <view class="main">
                        <view class="title">
                            请选择规格
                        </view>
                        <view class="content">
                            <text  v-for="(item, index) in goodsInfo.item_specs" :key="index" :class="{on: item === choosesGoodsInfo.specs}" @click="choosesSpecs(index, item)" >{{item.specs_names}}</text>
                        </view>
                    </view>
                </view>
                <view class="buy-num">
                    <view class="main">
                        <view class="title">
                            购买数量
                        </view>
                        <view class="content">
                            <uni-number-box v-if="choosesGoodsInfo.specs.residue_num === -1" :min="1" :step="1" :value="choosesGoodsInfo.num" @change="changeNum"></uni-number-box>
                            <uni-number-box v-else :min="1" :max="choosesGoodsInfo.specs.residue_num"  :step="1" :value="choosesGoodsInfo.num" @change="changeNum"></uni-number-box>
                        </view>
                    </view>
                </view>
                <view class="btns">
                    <block v-if="goodsInfo.status === 1">
                        <view class="over" v-if="choosesGoodsInfo.specs.residue_num === 0">
                            已抢完
                        </view>
                        <view class="over" style="background: #FC5A5A;" @click="createOreder" v-else>
                            确定
                        </view>
                    </block>
                    <view class="over" v-if="goodsInfo.status === 2">
                        待开始
                    </view>
                    <view class="over" v-if="goodsInfo.status === 3">
                        已结束
                    </view>
                </view>
            </view>
        </uni-popup>

        <!-- h5分享	-->
        <uni-popup ref="shareH5" type="bottom" :custom="true">
            <view class="share-goods-h5">
                <view class="share-title-h5-box">
                    <view class="share-title-h5-box-titles" v-show="goodsInfo.item.ratio !== '0.00'">
                        分享后预计最高可赚取佣金¥{{goodsInfo.item.ratio}}
                    </view>
                    <view class="share-title-h5-box-sub-title">
                        朋友通过你分享的页面成功购买后，你可获得对应的佣金。佣金可“我的-分销中心”里查看
                    </view>
                </view>
                <view class="share-content-h5-box">
                    <view class="items">
                        <view class="item" @click="shareFriendH5">
                            <view><image src="../../static/images/share/share-wx.png"></image></view>
                            <text>分享到微信</text>
                        </view>
                        <view class="item" @click="copyUrl">
                            <view><image src="../../static/images/share/copy-url.png"></image></view>
                            <text>复制链接</text>
                        </view>
                    </view>
                </view>
                <view class="share-goto-btn-box">
                    <view class="btn" @click="goDistribution()">分销中心</view>
                </view>

                <view class="share-btn-h5-box" @click="closeShareH5">
                    取消
                </view>
            </view>
        </uni-popup>
        <view class="share-guide-h5" v-show="isShowShareH5" @click="isShowShareH5 =  false">
            <view class="share-guide-h5-img"><image src="../../static/images/share/share-guide.png"></image></view>
            <view class="share-guide-h5-title">立即分享给好友吧</view>
            <view class="share-guide-h5-subtitle">点击屏幕右上角将本页分享给好友</view>
        </view>
    </view>
</template>

<script>
    let myTimer = null

    import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
    import uniPopup from '@/components/uni-popup/uni-popup.vue'
    import { mapState, mapMutations } from 'vuex'
    import * as Constant from '../../utils/constant'

    export default {
        name: "detail",
        data() {
            return {
                timer: {
                    d: 0,
                    h:`00`,
                    m:`00`,
                    s:`00`
                },

                goodsInfo: {
                    id: 0,
                    title: "",        //标签
                    start_time: 0,   //开始时间
                    end_time: 0, //结束时间
                    now_time: 0, //服务器当前时间
                    status: 1,    //状态：1正在秒杀/抢购，2已结束
                    is_over: 0,   //是否已抢完
                    attributes: "",  //规格组的名称，如果是单规格则此字段为空
                    item: {       //商品信息
                        id: 0, //商品id
                        status: 0,    //商品状态，暂时没用
                        title: "0", //商品名
                        subtitle: "", //副标题
                        mold_id: 0,   //分区id
                        video: "",    //视频
                        initial_sales: 0,    //销量。暂时没用
                        reality_sales: 0,     //实际销量，暂时没用
                        lvid: 0,  //运费id，暂时没用
                        content: "",
                        //详情   //商品组图
                        pics: [],
                        ratio: "0.00",    //分销金额，暂时没用
                        mold: "", //分区名称
                        mold_know: "",
                        //购买需知
                        price: "",   //现价
                        old_price: ""   //原价
                    },
                    item_specs: [     //规格组，如果是多规格的话，此参数就只有一个值，多规格有一个或一个以上的值
                        {
                            specs_ids: "",   //规格id组，单规格为空
                            item_name: "",
                            specs_names: "",  //规格组合名称
                            old_price: "",  //此规格组合的原价
                            price: "",       //此规格组合的现价
                            item_id: 0,
                            stock: -1,        //单人限购，如果为-1表示为不限购，反之为限购数量
                            pic: "" //此规格组的名称
                        },
                    ]
                },

                //选中 商品详情 还是 购买须知
                showTabWho:'detail',// detail 图文详情    know 购买须知

                //商品评论
                commentResponseData:{
                    count: 0,
                    data: [],
                },

                //购物车数量
                carNum:0,

                //导航条锚点 高度，要根据ajax返回的数据并渲染到页面后，去计算
                anchorlist:[
                    {name:'主图',top:0},
                    {name:'评价',top:0},
                    {name:'详情',top:0}
                ],
                selectAnchor:0,//选中锚点

                //当前已经选择了的商品，数量
                choosesGoodsInfo:{
                    num:1,//选择购物数量
                    // 选中的规格下标
                    specs_index: -1,// -1表示未选择
                    // 选中的规格
                    specs: {
                        specs_ids: "",   //规格id组，单规格为空
                        item_name: "",
                        specs_names: "",  //规格组合名称
                        old_price: "",  //此规格组合的原价
                        price: "",       //此规格组合的现价
                        item_id: 0,
                        residue_num: -1,        //单人限购，如果为-1表示为不限购，反之为限购数量
                        pic: "" //此规格组的名称
                    },
                },

                //h5的分享引导显示与否
                isShowShareH5: false,
            }
        },
        methods: {
            ...mapMutations(['setShareID']),
            // 商品banner滑动到非视频页面时候停止视频的播放
            swiperHandle(e){
                if (this.goodsInfo.item.video && e.detail.current !== 0) {
                    uni.createVideoContext('myVideo').pause()
                }
            },
            _goPage(url, query = {}) {
                this.$openPage({name: url, query})
            },
            // 返回按钮
            _goBack() {
                if (getCurrentPages().length === 1) {
                    this._goPage('home')
                } else {
                    uni.navigateBack()
                }
            },
            //轮播图放大预览
            previewImg(src, urls) {
                uni.previewImage({
                    indicator: 'number',
                    current: src,
                    urls
                })
            },

            //跳转锚点
            toAnchor(index){
                this.selectAnchor = index;
                uni.pageScrollTo({scrollTop: this.anchorlist[index].top,duration: 200});
            },
            //计算锚点高度
            calcAnchor(){
                uni.createSelectorQuery().select("#comments").boundingClientRect((data) => {
                    let statusbarHeight = 0;
                    //APP内还要计算状态栏高度
                    // #ifdef APP-PLUS
                    statusbarHeight = plus.navigator.getStatusbarHeight()
                    // #endif
                    let headerHeight = uni.upx2px(100);
                    this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
                }).exec();
                uni.createSelectorQuery().select("#description").boundingClientRect(data => {
                    let statusbarHeight1 = 0;
                    //APP内还要计算状态栏高度
                    // #ifdef APP-PLUS
                    statusbarHeight1 = plus.navigator.getStatusbarHeight()
                    // #endif
                    let headerHeight = uni.upx2px(100);
                    this.anchorlist[2].top = data.top - headerHeight - statusbarHeight1;
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
            choosesSpecs(index, item){
                this.choosesGoodsInfo.specs_index = index
                this.choosesGoodsInfo.num = 1
                this.choosesGoodsInfo.specs = item
                this.goodsInfo.attributes = item.specs_names
            },
            //购买数量更改
            changeNum(e){
                this.choosesGoodsInfo.num = e
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
                let time_distance = 0 //时间差

                //1：正在抢购，2即将开始，3已结束
                if (this.goodsInfo.start_time  > this.goodsInfo.now_time) {
                    this.$set(this.goodsInfo, 'status', 2)
                    time_distance = this.goodsInfo.start_time * 1000 - this.goodsInfo.now_time * 1000
                    if (time_distance <= 0){
                        this.$set(this.goodsInfo, 'status', 1)
                    }
                    console.log("秒杀活动还未开始")
                }

                if ( this.goodsInfo.start_time  <= this.goodsInfo.now_time && this.goodsInfo.now_time <=  this.goodsInfo.end_time) {
                    this.$set(this.goodsInfo, 'status', 1)
                    time_distance = this.goodsInfo.end_time * 1000 - this.goodsInfo.now_time * 1000
                    console.log("秒杀活正在进行中")
                }

                if (this.goodsInfo.end_time  < this.goodsInfo.now_time) {
                    this.$set(this.goodsInfo, 'status', 3)
                    clearInterval(myTimer)
                    console.log("秒杀活动已经结束")
                }

                let int_day, int_hour, int_minute, int_second
                // 天时分秒换算
                int_day = Math.floor(time_distance/86400000)
                time_distance -= int_day * 86400000;
                int_hour = Math.floor(time_distance/3600000)
                time_distance -= int_hour * 3600000;
                int_minute = Math.floor(time_distance/60000)
                time_distance -= int_minute * 60000;
                int_second = Math.floor(time_distance/1000)

                // 时分秒为单数时、前面加零站位
                if(int_hour < 10)
                    int_hour = "0" + int_hour
                if(int_minute < 10)
                    int_minute = "0" + int_minute
                if(int_second < 10)
                    int_second = "0" + int_second
                this.timer =  {
                    d: int_day,
                    h: int_hour,
                    m: int_minute,
                    s: int_second,
                }
            },

            /**
             * 下单
             */
            createOreder(){
                this.close()
                //件数，订单类型，总量，总金额, 商品参数
                let sumNum = 1,
                    createOrderType = 'spike',
                    sumSum = this.choosesGoodsInfo.num,
                    sumMoney = (parseFloat(this.choosesGoodsInfo.num) * parseFloat(this.choosesGoodsInfo.specs.price)).toFixed(2),
                    myResponseData = [
                        {
                            mold_id: this.goodsInfo.item.mold_id,
                            name: this.goodsInfo.item.mold,
                            data:[]
                        }
                    ]
                let goods = {
                    categoryArr: this.choosesGoodsInfo.specs.specs_names ? this.choosesGoodsInfo.specs.specs_names.split('_') : [],//["S", "通过热望各位梵蒂冈如果", "还惹我"],//当前选中的规格名组合成数组
                    item_id: this.goodsInfo.item.id, // 商品id
                    key: this.choosesGoodsInfo.specs.specs_ids,//"10_15_17",//当前选中的规格id组合
                    key_name: this.choosesGoodsInfo.specs.specs_names,// "S_通过热望各位梵蒂冈如果_还惹我", //当前选中的规格名组合
                    mold: myResponseData[0].name,//"第一.1类型",//
                    mold_id: myResponseData[0].mold_id,//2,//
                    num: this.choosesGoodsInfo.num,//2,//够买数量
                    pic: this.choosesGoodsInfo.specs.pic,//"http://picture.ddxm661.com/75b9420190906171730779.jpg",//商品图片
                    price: this.choosesGoodsInfo.specs.price, //"15.00",//商品价格
                    store: this.choosesGoodsInfo.specs.residue_num, // -1,//商品库存
                    title: this.choosesGoodsInfo.specs.item_name,// "测试2",//商品标题
                }
                myResponseData[0].data.push(goods)
                this._goPage('order_submit', {
                    myResponseData,//购买的商品数据
                    sumNum,//件数
                    createOrderType,//订单类型
                    sumSum,//总量
                    sumMoney,//总金额
                    seckill_id: this.goodsInfo.id,//秒杀id
                })
            },

            /**
             * h5 公众号的分享功能
             */
            openShareH5(){
                this.$refs.shareH5.open()
            },
            closeShareH5(){
                this.$refs.shareH5.close()
            },
            copyUrl(){
                let url = ''
                let _that = this
                if(window.location.href.indexOf("?") != -1 && this.userInfo.id) {
                    url = window.location.href + '&user_id=' + this.userInfo.id
                } else {
                    url = window.location.href
                }
                _that.$copyText(url).then((e) => {
                    _that.closeShareH5()
                    _that.msg('复制成功')
                    console.log(e)
                }, (e) => {
                    _that.msg('复制失败')
                    console.log(e)
                })
            },
            shareFriendH5(){
                this.closeShareH5()
                this.isShowShareH5 = true
            },

            // 打开合从聊天弹窗
            contactCustomerService(){
                if (this.userInfo.id){
                    _AIHECONG('customer',{
                        head : this.userInfo.pic, //该字段可以将顾客头像同步过来
                        '名称' : this.userInfo.nickname,  // '属性名' : '值'
                        '邮箱' : '暂无',
                        '手机' : this.userInfo.mobile,
                        '会员账号' : "会员id：" + this.userInfo.id,
                        '会员等级' : '暂无'
                    })
                }
                _AIHECONG('showChat')
            },
            // 去分销中心，如果不是分销员，先到 成为分销员 页面
            goDistribution(){
                // 用户未登录 调用登录接口
                if (!this.userInfo.id){
                    this.loginWithOfficalAccount()
                }
                // 是分销员
                if (this.userInfo.retail === 1){
                    this._goPage('user_distribution')
                }
                // 不是分销员
                if (this.userInfo.retail === 0){
                    this._goPage('user_distributor')
                }
            },
        },
        async onLoad(){
            let requestData = {
                    item_id: 0,
                    seckill_id: 0
                },
                url = Constant[Constant.NODE_ENV].shareSpikeGoodsDetail // 分享地址

                if (this.$parseURL().item_id && this.$parseURL().seckill_id){
                    requestData.item_id = this.$parseURL().item_id
                    requestData.seckill_id = this.$parseURL().seckill_id
                    url += `?item_id=${this.$parseURL().item_id}&seckill_id=${this.$parseURL().seckill_id}`
                    console.log("其他页面带过来的参数：",this.$parseURL())
                }

            // 如果用户登录了，把自己的唯一id也分享出去
            if(this.userInfo.id) {
                url += `&user_id=${this.userInfo.id}`
            }
            url = Constant[Constant.NODE_ENV].shareRedirectURL + encodeURIComponent(url)
            await this.$minApi.seckill_info(requestData).then(async res => {
                console.log('秒杀详情：', res)
                if (res.code === 200) {
                    res.data.item.content = this.formatRichText2(res.data.item.content)
                    this.goodsInfo = res.data
                    this.choosesGoodsInfo.specs = res.data.item_specs[0]

                    // 如果是安卓平台 每次进入商品详情页面就会调用微信配置，自定义分享商品
                    if ((await this.getPlatform()).isAndroid){
                        await this.wxConfig()
                    }

                    await this.$nextTick(async () => {
                        //设置定时器 每一秒执行一次
                        myTimer = setInterval(()=> {
                            this.goodsInfo.now_time ++
                            this.getRTime()
                        }, 1000)
                        await this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确

                        let param1 = {
                                title: `捣蛋熊商城-${res.data.item.title}`, // 分享标题
                                desc: `原价${res.data.item.old_price}，现价仅需${res.data.item.price}，先到先得`, // 分享描述
                                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: res.data.item.pics[0], // 分享图标
                                success: function () {}
                            },
                            param2 = {
                                title: `捣蛋熊商城-${res.data.item.title}`, // 分享标题
                                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: res.data.item.pics[0], // 分享图标
                                success: function () {}
                            }
                        await this.wxConigShareGoods(param1, param2)
                    })
                } else {
                    this.msg('活动结束')
                    setTimeout(()=> {
                        uni.navigateBack()
                    }, 1000)
                }
            }).catch(err => {
                console.log(err)
                this.msg('活动结束')
                setTimeout(()=> {
                    uni.navigateBack()
                }, 1000)
            })

            //商品评论
            await this.$minApi.goodsDetailComment({item_id: this.goodsInfo.item.id}).then(res => {
                console.log("获取商品评论：",res)
                if (res.code === 200) {
                    this.commentResponseData.count = res.count
                    this.commentResponseData.data = res.data
                }
            })

        },
        async onShow() {
            if (this.userInfo.id){
                //购物车数量
                await this.$minApi.getCarNum().then(res => {
                    console.log("购物车数量：", res)
                    if(res.code === 200){
                        this.carNum = res.data
                    }
                })
            }
        },
        onUnload(){
            clearInterval(myTimer)
            myTimer = null
        },
        onPageScroll(e) {
            //锚点切换
            this.selectAnchor = e.scrollTop>=this.anchorlist[2].top?2:e.scrollTop>=this.anchorlist[1].top?1:0;
        },
        computed: {
            ...mapState(['userInfo', 'subscribe'])
        },
        components: {
            uniNumberBox,
            uniPopup,
        },
    }
</script>

<style lang="scss">
    @import '../../static/css/goods_detail.scss';
</style>
