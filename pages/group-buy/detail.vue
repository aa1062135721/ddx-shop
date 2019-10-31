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
		<!-- 倒计时  -->
		<view class="info-box miaosha">
			<view class="left">
				<view class="top">
					<text class="price">
						￥{{goodsInfo.commander_price}}
					</text>
					<text class="time-kill">
						{{goodsInfo.people_num}}人拼团
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
						<text class="tag" v-if="timer.d">{{timer.d + '天'}}</text>
						<text class="no-tag" v-if="timer.d"></text>
						<text class="tag">{{timer.h}}</text>
						<text class="no-tag">:</text>
						<text class="tag">{{timer.m}}</text>
						<text class="no-tag">:</text>
						<text class="tag">{{timer.s}}</text>
					</view>
				</view>
				<view class="one" v-if="goodsInfo.begin === 3">
					<view class="title">拼团状态</view>
					<view class="time">
						<text class="tag">已经结束</text>
					</view>
				</view>
				<view class="one" v-if="goodsInfo.begin === 2">
					<view class="title">拼团状态</view>
					<view class="time">
						<text class="tag">即将开始</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 标题 -->
		<view class="info-box goods-info">
			<view class="title">
				<text class="tag" v-if="goodsInfo.mold_id">{{goodsInfo.mold}}</text>
				{{goodsInfo.title}}
			</view>
			<!-- 子标题  承诺  -->
			<view class="sub-title" v-if="goodsInfo.subtitle">
				{{goodsInfo.subtitle}}
			</view>
			<view class="promise" v-if="goodsInfo.promise">
				{{goodsInfo.promise}}
			</view>
		</view>

		<!-- 其他拼团信息 -->
		<view class="info-box comments" style="padding-bottom: 0;" v-if="goodsInfo.count">
			<view class="row">
				<view class="text" style="font-size: 28upx;">有<text style="color: #FC5A5A;">{{goodsInfo.count}}人</text>正在拼团，你可以直接参与哦</view>
				<view class="arrow" @click="openMoreOtherGroupBuy">
					<view class="show">
						查看全部
						<view class="iconfont icon-ddx-shop-content_arrows"></view>
					</view>
				</view>
			</view>
			<view class="many-group-buy" v-for="(item, index) in goodsInfo.assemble_list" :key="index" v-if="index < 2">
				<view class="one">
					<view><image :src="item.pic" class="img"></image></view>
					<view>{{item.nickname}}</view>
				</view>
				<view class="two">
					<view class="info">
						<view class="info-title">还差{{item.r_num}}人成团</view>
						<view class="info-time" v-if="item.begin === 1">仅剩 {{item.timeStr}}</view>
						<view class="info-time" v-if="item.begin === 0">组团已结束</view>
					</view>
					<view class="btns" v-if="item.begin === 1">
						<view class="btn" @click="_goPage('group_buy_group', {id: item.order_id})"  v-if="item.order_id">查看详情</view>
						<view class="btn" @click="buyGroup(item.id)" v-else>去参团</view>
					</view>
				</view>
			</view>

		</view>
		<!-- 其他拼团信息，查看更多 -->
		<uni-popup ref="moreOtherGroupBuy" type="center" :custom="true" :mask-click="false" v-if="goodsInfo.assemble_list.length">
			<view class="more-other-group-buy">
				<view class="box">
					<view class="title">参与可直接成团</view>
					<view class="center">
						<view class="item" v-for="(item, index) in goodsInfo.assemble_list" :key="index">
							<view class="left">
								<view>
									<image :src="item.pic" class="img"></image>
								</view>
								<view class="info">
									<view>{{item.nickname}}：还差{{item.r_num}}人成团</view>
									<view>仅剩 {{item.timeStr}}</view>
								</view>
							</view>
							<view class="right">
								<view class="btn" @click="_goPage('group_buy_group', {id: item.order_id})" v-if="item.order_id">查看详情</view>
								<view class="btn" @click="buyGroup(item.id)" v-else>去参团</view>
							</view>
						</view>
					</view>
					<view class="bottom">最多仅显示10个正在拼团</view>
				</view>
				<view class="iconfont icon-ddx-shop-close close" @click="closeMoreOtherGroupBuy"></view>
			</view>
		</uni-popup>

		<!-- 拼团规则 -->
		<view class="group-buy-rule">
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
		</view>

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

		<!--商品信息  -->
		<view class="info-box goods-info2">
			<view class="item">
				<view class="one">
					<view class="title">数量</view>
					<view class="comtent">
						<uni-number-box v-if="goodsInfo.buy_num <= goodsInfo.remaining_stock" :min="1" :max="goodsInfo.buy_num" :value="1" :step="1" @change="changeNum"></uni-number-box>
						<uni-number-box v-else :min="1" :max="goodsInfo.remaining_stock" :value="1" :step="1" @change="changeNum"></uni-number-box>
					</view>
				</view>
				<view class="two">
<!--					<text class="iconfont icon-ddx-shop-content_arrows"></text>-->
				</view>
			</view>
		</view>

		<!-- 评价 -->
		<view class="info-box comments" id="comments">
			<view class="row">
				<view class="text">商品评价({{commentResponseData.count}})</view>
				<view class="arrow" @click="this._goPage('goods_evaluate', {id: goodsInfo.item_id})">
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
		<view class="description">
			<view class="title">
				<text :class="{'on': showTabWho === 'detail'}" @click="showTabWho = 'detail'">图文详情</text>
				<text :class="{'on': showTabWho === 'know'}" @click="showTabWho = 'know'" v-if="buyYouKnow">购买须知</text>
			</view>
			<view class="content"  v-if="showTabWho === 'detail'">
				<rich-text :nodes="goodsInfo.content"></rich-text>
<!--				<image v-for="(img, index) in goodsInfo.content" :src="img" :key="index" style="width: 100%;" :lazy-load="true" mode="widthFix"></image>-->
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
				<button class="box" open-type="contact" :session-from="userInfo">
					<view class="iconfont icon-ddx-shop-pingjia-"></view>
					<view class="text">客服</view>
				</button>
				<view class="box" @click="_goPage('car')">
					<view class="iconfont icon-ddx-shop-shopping-cart-o"></view>
					<view class="text">购物车</view>
					<view class="number" v-if="carNum">{{carNum}}</view>
				</view>
			</view>
			<view class="btn">
				<block v-if="goodsInfo.remaining_stock === 0">
					 <view class='over'>已售完</view>
				</block>
				<block v-else>
					<view class="joinCart my-vam" @click="open()">
						<view class="inner">
							￥{{ (parseFloat(goodsInfo.old_price) * parseFloat(choosesGoodsInfo.num)) | moneyToFixed }}<br />
							单独购买
						</view>
					</view>
					<view class="buy my-vam" @click="open()">
						<view class="inner">
							￥{{ (parseFloat(goodsInfo.commander_price) * parseFloat(choosesGoodsInfo.num)) | moneyToFixed }}<br />
							一键开团
						</view>
					</view>
				</block>
			</view>
		</view>

		<!-- 购买的时候选择规格，数量…… -->
		<uni-popup ref="selectSpecification" type="bottom" :custom="true" @change="change">
			<view class="select-specification">
				<view class="goods-info">
					<view class="main">
						<view class="image" @click="previewImg(goodsInfo.pics[0], goodsInfo.pics)">
							<image class="img" :src='goodsInfo.pics[0]'></image>
						</view>
						<view class="info">
							<view class="price">￥{{goodsInfo.commander_price}}</view>
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
						<view class="btn my-vam" style="background:#FC8A8A;" @click="buyNow(2)">
							<view class="inner">
								￥{{ (parseFloat(goodsInfo.old_price) * parseFloat(choosesGoodsInfo.num)) | moneyToFixed }}<br />
								单独购买
							</view>
						</view>
						<view class="btn my-vam" @click="buyNow(1)">
							<view class="inner">
								￥{{ (parseFloat(goodsInfo.commander_price) * parseFloat(choosesGoodsInfo.num)) | moneyToFixed }}<br />
								一键开团
							</view>
						</view>
					</block>
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
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import { mapGetters } from 'vuex'
	import {mapActions} from 'vuex'

	let myTimer = null, myTimer1 = null //用来关闭定时器 用于10组拼团信息    用来关闭定时器 用于拼团商品倒计时

	export default {
		data() {
			return {
				timer: {
					d:`0`,
					h:`00`,
					m:`00`,
					s:`00`
				},

				goodsInfo: {
					id: 0,//拼团活动id
					update: 0,    //版本
					pics: [],
					mold_id: 0,
					content: [],
					title: "",   //名称
					item_id: 0,  //商品id
					item_name: "",
					old_price: "",    //原价
					price: "",        //拼团价
					commander_price: "",
					people_num: 0,    //拼团一个需要多少人
					buy_num: 0,   //每人限购数量
					all_stock: 2,
					remaining_stock: 2,       //剩余可拼团购买的数量
					retail: 0,
					begin_time: 0,
					end_time: 0,
					hot: 0,
					postage_id: 0,
					count: 0,     //一共有多少人拼团。如果为0的话下面的  assemble_list为 [];
					assemble_list: [],
					mold: "",
					all_people: 0     //已成功拼团人数
				},
				//购买须知
				buyYouKnow:'',
				showTabWho:'detail',// detail 图文详情    know 购买须知
				//分享数据
				shareData:{
					price:0,
					pic:'',
				},
				//商品评论
				commentResponseData:{
					count: 0,
					data: [],
				},
				//购物车数量
				carNum:0,

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
					assemble_list_id: 0,//拼团组的id，非必传，不传表示自己开团，否则表示与别人成团
				},
			}
		},
		methods:{
			...mapActions(['saveShareID']),
			// 商品banner滑动到非视频页面时候停止视频的播放
			swiperHandle(e){
				if (this.goodsInfo.video && e.detail.current !== 0) {
					uni.createVideoContext('myVideo').pause()
				}
			},
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

			//打开更多拼团信息
			openMoreOtherGroupBuy(){
				this.$refs.moreOtherGroupBuy.open()
			},
			closeMoreOtherGroupBuy(){
				this.$refs.moreOtherGroupBuy.close()
			},

			//购买数量更改
			changeNum(e){
				console.log(e)
				this.choosesGoodsInfo.num = e
			},

			/**
			 * 倒计时
			 */
			// 整个拼团商品的 倒计时
			getRTime(){
				//1：正在拼团，2即将开始，3已结束
				if (this.goodsInfo.begin_time  > this.goodsInfo.now_time) {
					console.log("拼团活动还未开始呢")
					this.$set(this.goodsInfo, 'begin', 2)
				}

				if (this.goodsInfo.begin_time  <= this.goodsInfo.now_time &&
						this.goodsInfo.now_time <=  this.goodsInfo.end_time
				) {
					console.log('拼团活动 running')
					let time_distance = this.goodsInfo.end_time * 1000 - this.goodsInfo.now_time * 1000; // 结束时间减去当前时间
					let int_day,int_hour,int_minute,int_second
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
						int_hour = "0" + int_hour;
					if(int_minute < 10)
						int_minute = "0" + int_minute;
					if(int_second < 10)
						int_second = "0" + int_second;
					this.timer = {d:int_day, h:int_hour, m:int_minute, s:int_second}
					this.$set(this.goodsInfo, 'begin', 1)
				}

				if (this.goodsInfo.end_time  < this.goodsInfo.now_time) {
					console.log("拼团活动已经结束啦")
					this.$set(this.goodsInfo, 'begin', 3)
					clearInterval(myTimer1)
				}
			},
			// 倒计时 (10组拼团人的倒计时)
			timeStrChange(){
				this.goodsInfo.assemble_list.map(item => {
					let time_distance = item.end_time * 1000 - this.goodsInfo.assemble_list[0].now_time * 1000; // 结束时间减去当前时间
					if (time_distance < 0) {
						item.begin = 0
					}
					let int_day,int_hour,int_minute,int_second
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
						int_hour = "0" + int_hour;
					if(int_minute < 10)
						int_minute = "0" + int_minute;
					if(int_second < 10)
						int_second = "0" + int_second;
					if (int_day > 0) {
						item.timeStr =  `${int_day}天 ${int_hour}:${int_minute}:${int_second}`
					} else {
						item.timeStr =  `${int_hour}:${int_minute}:${int_second}`
					}
				})
			},

			/**
			 * 一键开团或者单独购买
			 * type = 1,2
			 */
			buyNow(type = 1){
				this.close()
				console.log("商品信息: ",this.goodsInfo, ', 购买参数：', this.choosesGoodsInfo)
				let price = 0.0
				switch (type) {
					case 1:
						price = this.goodsInfo.commander_price // price 拼团价
						break
					case 2:
						price = this.goodsInfo.old_price // old_price 原价 单独购买
						break
					case 3:
						price = this.goodsInfo.price // 和别人组团 组团价
						break
				}

				//件数，订单类型，总量，总金额, 商品参数
				let 	sumNum = 1,
						createOrderType = ((type === 1 || type === 3) ? 'group' : 'buy_now'),
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
					categoryArr: [],//["S", "通过热望各位梵蒂冈如果", "还惹我"],//当前选中的规格名组合成数组
					id: 0,//购物车id,这里是直接够买不是购物车够买，所以这里的数据设置为0
					is_checked: false,//购物车里被选中为结算商品,这里是直接够买不是购物车够买，所以这里的数据设置为false
					item_id: this.goodsInfo.item_id, // 商品id
					key: "",//"10_15_17",//当前选中的规格id组合
					key_name: "",// "S_通过热望各位梵蒂冈如果_还惹我", //当前选中的规格名组合
					mold: myResponseData[0].name,//"第一.1类型",//
					mold_id: myResponseData[0].mold_id,//2,//
					num: this.choosesGoodsInfo.num,//2,//够买数量
					pic: this.goodsInfo.pics[0],//"http://picture.ddxm661.com/75b9420190906171730779.jpg",//商品图片
					price:  price,//"15.00",//商品价格
					status: 1,// 1,//商品状态
					store: this.goodsInfo.buy_num, // -1,//商品库存
					title: this.goodsInfo.title,// "测试2",//商品标题
				}
				myResponseData[0].data.push(goods)
				this._goPage('order_submit', {
					myResponseData,//购买的商品数据
					sumNum,//件数
					createOrderType,//订单类型
					sumSum,//总量
					sumMoney,//总金额
					commander: (type === 1 ? 1 : 0),// 如果为拼团订单，此参数拿去获取运费：1表示团长，2表示为团员
					assemble_id: this.goodsInfo.id,     //拼团活动id
					num: this.choosesGoodsInfo.num,//购买数量
					update: this.goodsInfo.update,          //版本，拼团组详情的id
					assemble_list_id: this.choosesGoodsInfo.assemble_list_id,    //拼团组的id，非必传，不传表示自己开团，否则表示与别人成团
				})
			},

			// 一键成团
			buyGroup(assemble_list_id = 0){
				this.choosesGoodsInfo.assemble_list_id = assemble_list_id
				this.buyNow(3)
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
						page: 'pages/group-buy/detail',
						pic: this.goodsInfo.pics[0],
						title: this.goodsInfo.title,
						price: `￥${this.goodsInfo.commander_price}`,
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

			/**
			 * 拼团规则详情
			 */
			async goRulePage(){
				await this.$minApi.assembleRuleInfo().then(res => {
					console.log("获取拼团规则，并跳转页面",res)
					if (res.code === 200) {
						this._goPage('rich_text', {content: this.formatRichText2(res.data.content),title: '拼团规则',})
					}
				})
			},
		},
		// 分享到朋友
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: `${this.goodsInfo.title}`,
				path: `pages/group-buy/detail?user_id=${this.userInfo.id}&id=${this.goodsInfo.id}`
			}
		},
		async onLoad(param) {
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

			console.log("带过来的参数2",this.$parseURL())
			if (this.$parseURL().id){
				requestData.id = this.$parseURL().id
			}

			await this.$minApi.assembleDetail(requestData).then(res => {
				console.log("拼团详情：",res)
				if (res.code === 200){
					res.data.content = this.formatRichText2(res.data.content)
					if (res.data.assemble_list.length) {
						res.data.assemble_list.map((item) => {
							// 是否可以参加拼团 //1为可以，参加，0为不可以
							item.begin = 1
							// 还剩多少时间可以参加拼团
							item.timeStr = ''
						})
					}
					this.goodsInfo = res.data
					this.$nextTick(()=>{
						if (this.goodsInfo.assemble_list.length){
							// 10个人的组团倒计时
							myTimer = setInterval(() => {
								this.goodsInfo.assemble_list[0].now_time ++
								this.timeStrChange()
							}, 1000);//设置定时器 每一秒执行一次
						}
						//整个商品的拼团倒计时
						myTimer1 = setInterval(() =>{
							this.goodsInfo.now_time ++
							this.getRTime()
						}, 1000) //设置定时器 每一秒执行一次
					})
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

			//商品评论
			await this.$minApi.goodsDetailComment({item_id: this.goodsInfo.item_id}).then(res => {
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
				this.$minApi.getCarNum().then(res => {
					console.log("购物车数量：", res)
					if(res.code === 200){
						this.carNum = res.data
					}
				})
			}
		},
		onReady(){
			this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
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
		onUnload(){
			clearInterval(myTimer)
			clearInterval(myTimer1)
			myTimer = null
			myTimer1 = null
		},
		components: {
			uniNumberBox,
			uniPopup,
		},
		computed: {
			...mapGetters(['userInfo'])
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
					margin-right: 8upx;
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
