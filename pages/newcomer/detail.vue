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
<!--				<view class="icon-btn" @click="openShareH5">-->
<!--					<view class="icon iconfont icon-ddx-shop-share"></view>-->
<!--				</view>-->
			</view>
		</view>
		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<swiper circular="true" :indicator-dots="true" indicator-active-color="#FC8A8A" @change="swiperHandle">
				<swiper-item style="display: flex;flex-direction: column;justify-content: center;background: #000;" v-if="goodsInfo.video">
					<video id="myVideo" :src="goodsInfo.video"
						   controls
						   style="width: 100%;"
					></video>
				</swiper-item>
				<swiper-item v-for="(img_src,index) in goodsInfo.pics" :key="index">
					<image :src="img_src" @click="previewImg(img_src, goodsInfo.pics)"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 标题 -->
		<view class="info-box goods-info">
            <view class="price">
				<view>
					<text class="one">￥{{item_specs[0].price}}</text>
					<text class="two" style="text-decoration: line-through;">￥{{item_specs[0].old_price}}</text>
				</view>
			</view>
			<view class="title">
				<div class="title-left">
					<text class="tag" v-if="goodsInfo.mold_id">{{goodsInfo.mold}}</text>
					{{goodsInfo.title}}
				</div>
				<div class="title-right" @click="openShareH5">
					<span class="iconfont icon-ddx-shop-share"></span>
					<span class="share-money" v-show="goodsInfo.ratio !== '0.00'">赚{{goodsInfo.ratio}}</span>
				</div>
			</view>
			<!-- 子标题  承诺  -->
			<view class="sub-title" v-if="goodsInfo.subtitle">
				{{goodsInfo.subtitle}}
			</view>
			<view class="promise">
				温馨提示：下单后48小时内发货
			</view>
			<view class="promise" v-if="goodsInfo.promise">
				{{goodsInfo.promise}}
			</view>
		</view>

		<!--	跨境购买 单独展示的文字 	-->
		<div class="cross-border-goods" v-if="goodsInfo.mold_id === 1">
			<view class="title">
				<text class="tag">提示</text>
				用户下单后，保税商品预计在2-3个工作日送达，直邮商品7-15个工作日送达。按照国家新政对跨境商品征收跨境综合税。跨境购订单需要顾客保持信息一致，要求顾客支付人姓名、收货人姓名、实名认证的姓名一致。
			</view>
			<view class="sub-title">
				<view class="tag">%</view>
				您购买成功后，实际支付的价格已含9.1%的跨境代扣税
			</view>
		</div>

		<!-- 其他拼团信息 -->
		<!-- <view class="info-box comments" style="padding-bottom: 0;" v-if="goodsInfo.assemble_group.length">
			<view class="row">
				<view class="text" style="font-size: 28upx;">有<text style="color: #FC5A5A;">{{goodsInfo.assemble_group.length}}人</text>正在拼团，你可以直接参与哦</view>
				<view class="arrow" @click="openMoreOtherGroupBuy">
					<view class="show">
						查看全部
						<view class="iconfont icon-ddx-shop-content_arrows"></view>
					</view>
				</view>
			</view>
			<view class="many-group-buy" v-for="(item, index) in goodsInfo.assemble_group" :key="index" v-if="index < 2">
				<view class="one">
					<view><image :src="item.commander_pic" class="img"></image></view>
					<view class="name-and-tips">
						<view>{{item.commander_nickname}}</view>
						<view class="tips">{{item.copywriting}}</view>
					</view>
				</view>
				<view class="two">
					<view class="info">
						<view class="info-title">还差{{item.r_num}}人成团</view>
						<view class="info-time" v-if="item.status === 1">仅剩 {{item.timeStr}}</view>
						<view class="info-time" v-if="item.status === 0">组团已结束</view>
					</view>
					<view class="btns">
						<view class="btn" @click="buyGroup(item)">去参团</view>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 其他拼团信息，查看更多 -->
		<!-- <uni-popup ref="moreOtherGroupBuy" type="center" :custom="true" :mask-click="false">
			<view class="more-other-group-buy">
				<view class="box">
					<view class="title">参与可直接成团</view>
					<view class="center">
						<view class="item" v-for="(item, index) in goodsInfo.assemble_group" :key="index">
							<view class="left">
								<view>
									<image :src="item.commander_pic" class="img"></image>
								</view>
								<view class="info">
									<view>{{item.commander_nickname}}：还差{{item.r_num}}人成团</view>
									<view v-if="item.status === 1">仅剩 {{item.timeStr}}</view>
									<view v-if="item.status === 0">组团已结束</view>
								</view>
							</view>
							<view class="right">
								<view class="btn" @click="buyGroup(item)">去参团</view>
							</view>
						</view>
					</view>
					<view class="bottom">最多仅显示10个正在拼团</view>
				</view>
				<view class="iconfont icon-ddx-shop-close close" @click="closeMoreOtherGroupBuy"></view>
			</view>
		</uni-popup> -->

		<!-- 拼团规则 -->
		<!-- <view class="group-buy-rule">
			<view class="title">
				<view class="one">拼团玩法</view>
				<view class="two" @click="goRulePage">
					规则详情<text style="margin-left: 6upx;" class="iconfont icon-ddx-shop-content_arrows"></text>
				</view>
			</view>
			<view class="content">
				<view class="item">
					<image src="../../static/icon/group-step1.png"></image>
					<view class="step-title">
						<view>下单</view>
						<view>开团或参团</view>
					</view>
				</view>
				<view class="item">
					<image src="../../static/icon/group-step2.png"></image>
					<view class="step-title">
						<view>邀请</view>
						<view>好友参团</view>
					</view>
				</view>
				<view class="item">
					<image src="../../static/icon/group-step3.png"></image>
					<view class="step-title">
						<view>成团</view>
						<view>购买成功</view>
					</view>
				</view>
			</view>
		</view> -->

		<!--服务说明-->
		<view class="my-service-title-btn" @click="openService">
			<view class="item">
				<view class="one">
					<view class="title">说明</view>
					<view class="content" v-if="goodsInfo.mold_id !== 1">
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
					<block v-if="goodsInfo.mold_id !== 1">
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
		<view class="info-box goods-info2" v-if="item_specs.length > 1">
			<view class="item" @click="open(2)">
				<view class="one">
					<text class="title">选择规格</text>
					<text class="comtent">
						<text>{{item_specs.attr_name}}</text>
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
				<view class="arrow" @click="_goPage('goods_evaluate', {id: goodsInfo.id})">
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
				<text :class="{'on': showTabWho === 'know'}" @click="showTabWho = 'know'" v-if="goodsInfo.mold_know">购买须知</text>
			</view>
			<view class="content"  v-if="showTabWho === 'detail'">
				<rich-text :nodes="goodsInfo.content"></rich-text>
			</view>
			<view class="content-know" v-if="showTabWho === 'know'">
				<view v-html="goodsInfo.mold_know"></view>
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
				<view class="joinCart my-vam" @click="_goPage('goods_detail', {id: goodsInfo.id})">
					<view class="inner">
<!--						￥{{ (parseFloat(goodsInfo.old_price) * parseFloat(choosesGoodsInfo.num)) | moneyToFixed }}<br />-->
						单独购买
					</view>
				</view>
				<view class="buy my-vam" @click="open(user_type.pay_status)" :style="user_type.pay_status == 1 ? {background:'#999999'} : {background:'#FC5A5A'}">
						<block>新人专享</block>
				</view>
			</view>
		</view>

		<!-- 购买的时候选择规格，数量…… -->
		<uni-popup ref="selectSpecification" type="bottom" :custom="true" :maskClick="false">
			<view class="select-specification">
				<view class="goods-info">
					<view class="main">
						<view class="image" @click="previewImg(choosesGoodsInfo.specs.item_pic, [choosesGoodsInfo.specs.item_pic])">
							<image class="img" :src='choosesGoodsInfo.specs.item_pic'></image>
						</view>
						<view class="info">
							<view class="price">新人价：￥{{choosesGoodsInfo.specs.price}}</view>
							<view class="stock">原价：￥{{choosesGoodsInfo.specs.old_price}}</view>
						</view>
						<view class="close">
							<text class="iconfont icon-ddx-shop-close" @click="close()"></text>
						</view>
					</view>
				</view>
				<view class="specification" v-if="item_specs.length > 1">
					<view class="main">
						<view class="title">
							请选择规格
						</view>
						<view class="content">
							<text  v-for="(item, index) in item_specs" :key="index" :class="{on: item === choosesGoodsInfo.specs}" @click="choosesSpecs(index, item)" >{{item.attr_name}}</text>
						</view>
					</view>
				</view>
				<view class="buy-num">
					<view class="main">
						<view class="title">
							购买数量
						</view>
						<view class="content">
							<uni-number-box :min="1" :step="1" :max="1" :value="choosesGoodsInfo.num" :disabled="true"></uni-number-box>
						</view>
					</view>
				</view>
				<view class="btns">
					<block>
						<view class='over' @click="buyNow" style="background:#FC5A5A">
							<block>立即购买</block>
						</view>
					</block>
				</view>
			</view>
		</uni-popup>

		<!-- h5分享	-->
		<uni-popup ref="shareH5" type="bottom" :custom="true">
			<view class="share-goods-h5">
				<view class="share-title-h5-box">
					<view class="share-title-h5-box-titles" v-show="goodsInfo.ratio !== '0.00'">
						分享后预计最高可赚取佣金¥{{goodsInfo.ratio}}
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
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import { mapState,mapMutations } from 'vuex'
	import * as Constant from '../../utils/constant'

	let myTimer = null, myTimer1 = null //用来关闭定时器 用于10组拼团信息    用来关闭定时器 用于拼团商品倒计时

	export default {
		data() {
			return {

				goodsInfo: {
                    id: 0,
                    status: 0,
                    title: "",
                    subtitle: "",
                    mold_id: 0,
                    video: "",
                    initial_sales: 0,
                    reality_sales: 0,
                    lvid: 0,
                    content: "",
                    pics: [],
                    ratio: "0.00",
                    mold: "",
                    mold_know: "",
                    promise: "",
                    price: "",
                    old_price: ""
                },
                item_specs: [ //商品规格信息
                    // {
                    // 	specs_ids: "20_26",
                    // 	item_name: "DQB小众童装2019秋季新品男女童装卫衣潮牌印花套头长袖刺绣卫衣",
                    // 	specs_names: "红色_140",
                    // 	old_price: "199.00",
                    // 	price: "20.00",
                    // 	commander_price: "15.00",
                    // 	item_id: 2440,
                    // 	residue_num: 2,
                    // 	pic: "http://picture.ddxm661.com/5dc9f201911081520373607.jpg"
                    // },
                ],
                user_type:{},

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
				],//导航条锚点
				selectAnchor:0,//选中锚点

				//当前已经选择了的商品，数量
				choosesGoodsInfo:{
					num:1,//选择购物数量
					specs_index: -1,// 选中的规格下标 -1表示未选中
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
		methods:{
			// 商品banner滑动到非视频页面时候停止视频的播放
			swiperHandle(e){
				if (this.goodsInfo.video && e.detail.current !== 0) {
					uni.createVideoContext('myVideo').pause()
				}
			},
			_goPage(url, query = {}){
				this.$openPage({name:url, query})
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
			previewImg(src,urls){
				uni.previewImage({
					indicator:'number',
					current:src,
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
			open(idx){
                if(idx == 2){
                    this.$refs.selectSpecification.open()
                }
			},
			close(){
				this.$refs.selectSpecification.close()
			},
			//选择规格
			choosesSpecs(index, item){
				this.choosesGoodsInfo.specs_index = index
				this.choosesGoodsInfo.specs = item
			},

			//打开服务说明
			openService(){
				this.$refs.myService.open();
			},
			closeService(){
				this.$refs.myService.close();
			},

			//打开更多拼团信息
			openMoreOtherGroupBuy(){
				this.$refs.moreOtherGroupBuy.open()
			},
			closeMoreOtherGroupBuy(){
				this.$refs.moreOtherGroupBuy.close()
			},

			/**
			 * 新人专享或者单独购买
			 * type = 1,2
			 */
			buyNow(){
                let price = this.choosesGoodsInfo.specs.price

				//件数，订单类型，总量，总金额, 商品参数
				let 	sumNum = 1,
						createOrderType = 'newman_buy',
						sumSum = this.choosesGoodsInfo.num,
						sumMoney = parseFloat(this.choosesGoodsInfo.num) * parseFloat(price),
						myResponseData = [
							{
								mold_id: this.goodsInfo.mold_id,
								name: this.goodsInfo.mold,
								data:[]
							}
						]
				let goods = {
					categoryArr: this.choosesGoodsInfo.specs.attr_name ? this.choosesGoodsInfo.specs.attr_name.split('_') : [],//["S", "通过热望各位梵蒂冈如果", "还惹我"],//当前选中的规格名组合成数组
                    item_id: this.goodsInfo.id, // 商品id
                    activity_id:this.goodsInfo.activity_id, // 活动ID
					key: this.choosesGoodsInfo.specs.attr_ids,//"10_15_17",//当前选中的规格id组合
					key_name: this.choosesGoodsInfo.specs.attr_name,// "S_通过热望各位梵蒂冈如果_还惹我", //当前选中的规格名组合
					mold: myResponseData[0].name,//"第一.1类型",//
					mold_id: myResponseData[0].mold_id,//2,//
					num: this.choosesGoodsInfo.num,//2,//够买数量
					pic: this.choosesGoodsInfo.specs.item_pic,//"http://picture.ddxm661.com/75b9420190906171730779.jpg",//商品图片
					price:  price,//"15.00",//商品价格
					store: -1, // -1,//商品库存
					title: this.choosesGoodsInfo.specs.item_name,// "测试2",//商品标题
				}
				myResponseData[0].data.push(goods)
				this._goPage('order_submit', {
					myResponseData,//购买的商品数据
					sumNum,//件数
					createOrderType,//订单类型
					sumSum,//总量
					sumMoney,//总金额
					num: this.choosesGoodsInfo.num,//购买数量
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
		async onLoad() {
			let requestData = this.$parseURL()

			await this.$minApi.newmanDetail(requestData).then(res=>{
                console.log(res)
                if(res.code == 200){
                    res.data.item_info.content = this.formatRichText2(res.data.item_info.content)
                    this.item_specs = res.data.item_attr
                    this.choosesGoodsInfo.specs = res.data.item_attr[0]
                    this.goodsInfo = res.data.item_info
                    this.user_type = res.data.item_type
                }
            })

			//商品评论
			await this.$minApi.goodsDetailComment({item_id: requestData.item_id}).then(res => {
				console.log("获取商品评论：",res)
				if (res.code === 200) {
					this.commentResponseData.count = res.count
					this.commentResponseData.data = res.data
				}
			})
		},
		async onShow() {
			if (!this.$parseURL().assemble_list_id) {
				this.choosesGoodsInfo.assemble_list_id = 0
			}
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
        mounted () {
          this.calcAnchor();  
        },
		onUnload(){

		},
		onPageScroll(e) {
			//锚点切换
			this.selectAnchor = e.scrollTop>=this.anchorlist[2].top?2:e.scrollTop>=this.anchorlist[1].top?1:0;
		},
		components: {
			uniNumberBox,
			uniPopup,
		},
		computed: {
			...mapState(['userInfo', 'subscribe'])
		}
	}
</script>

<style lang="scss">
	.container{
		@import '../../static/css/goods_detail.scss';

		/*	其他人正在拼团*/
		.many-group-buy{
			width: 100%;
			padding: 20upx 0;
			color: $color-primary-plain;
			font-size: $uni-font-size-base;
			@extend %border-color-solid-botton;
			&:last-child{
				border-bottom: none;
			}
			display: flex;
			justify-content: space-between;
			.one{
				display: flex;
				align-items: center;
				width: 50%;
				.img{
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
					margin-right: 16upx;
				}
				.name-and-tips{
					display: flex;
					flex-direction: column;
					.tips{
						color: #808080;
						font-size: $uni-font-size-sm;
					}
				}
			}
			.two{
				width: 50%;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.info{
					width: 60%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					text-align: center;
					.info-title{
						width: 100%;
						text-align: center;
					}
					.info-time{
						width: 100%;
						text-align: center;
						color: #808080;
						font-size: $uni-font-size-sm;
					}
				}
				.btns{
					display: flex;
					width: 40%;
					justify-content: space-around;
					.btn{
						font-size: $uni-font-size-sm;
						padding: 0 $uni-spacing-row-base;
						color:#ffffff;
						background: #FC5A5A;
						border-radius:4upx;
						height:48upx;
						line-height: 48upx;
					}
				}
			}
		}
		/*更多其他人的拼团信息*/
		.more-other-group-buy{
			position: relative;
			width:650upx;
			height: 800upx;
			background: #ffffff;
			border-radius:8px;
			.box{
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				.title{
					position: absolute;
					top: 0;
					width: 100%;
					height:80upx;
					line-height: 80upx;
					text-align: center;
					font-size: $uni-font-size-base;
					color: $color-primary-plain;
					@extend %border-color-solid-botton;
				}
				.center{
					position: absolute;
					top: 81upx;
					left: 0;
					height: calc(100% - 81upx - 81upx);
					width: 100%;
					overflow-x: hidden;
					overflow-y: auto;
					.item{
						width: 100%;
						@extend %border-color-solid-botton;
						&:last-child{
							border-bottom: 0;
						}
						padding:$uni-spacing-row-base 0;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.left{
							margin-left: $uni-spacing-row-base;
							display: flex;
							flex-direction: row;
							justify-content: flex-start;
							font-size: $uni-font-size-sm;
							.img{
								width: 70upx;
								height: 70upx;
								border-radius: 50%;
								margin-right: 16upx;
							}
							.info{
								height: 70upx;
								color: #808080;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
							}
						}
						.right{
							margin-right: $uni-spacing-row-base;
							height: 70upx;
							display: flex;
							align-items: center;
							.btn{
								height: 48upx;
								color: #ffffff;
								line-height: 48upx;
								text-align: center;
								padding: 0 6upx;
								border-radius: 4upx;
								background: #FC5A5A;
								font-size: $uni-font-size-sm;
							}
						}
					}
				}
				.bottom{
					@extend %border-color-solid-top;
					position: absolute;
					left: 0;
					bottom: 0;
					height: 80upx;
					line-height: 80upx;
					width: 100%;
					text-align: center;
					font-size: $uni-font-size-sm;
					color: #808080;
				}
			}
			.close{
				position: absolute;
				right: -40upx;
				top: -40upx;
				z-index: 2;
			}
		}

		/* 拼团规则 */
		.group-buy-rule{
			padding: 20upx 0;
			margin-bottom: 20upx;
			border-top: 1px solid #F2F2F2;
			background: #fff;
			.title{
				padding: 0 $uni-spacing-row-sm;
				display: flex;
				justify-content: space-between;
				.one{
					color: $color-primary-plain;
					font-size: $uni-font-size-base;
				}
				.two{
					color:  #808080;
					font-size: $uni-font-size-sm;
					text{
						font-size: $uni-font-size-sm;
					}
				}
			}
			.content{
				padding: $uni-spacing-row-sm;
				display: flex;
				justify-content: space-between;
				.item{
					display: flex;
					font-size: $uni-font-size-base;
					color: $color-primary-plain;
					align-items: center;
					image{
						width: 30upx;
						height: 44upx;
						margin-right: 10upx;
					}
					.step-title{
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						view:last-child{
							color: #808080;
						}
					}
				}
			}
		}
	}
	.my-vam{
		display: table;
		.inner{
			display: table-cell;
			vertical-align:middle;
		}
	}
</style>
