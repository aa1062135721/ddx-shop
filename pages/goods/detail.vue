<template>
	<view class="container">
		<!--	视频播放功能	-->
		<v-video :src="goodsInfo.video" :isTop="isShowVideoTop" @videoEnd="isShowVideo = false" v-show="isShowVideo && goodsInfo.video"></v-video>

		<view class="header">
			<!-- 头部-滚动渐变显示 -->
			<!-- <view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">-->
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
				<swiper-item v-for="(img_src,index) in goodsInfo.pics" :key="index">
					<image :src="img_src" @click="previewImg(img_src, goodsInfo.pics)" :lazy-load="true"></image>
					<div class="video-play" v-if="goodsInfo.video" @click="videoPlayOrStop">视频播放</div>
				</swiper-item>
			</swiper>
		</view>
		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="price">
				<view>
					<text class="one">￥{{goodsInfo.min_price}}</text>
					<text class="two" style="text-decoration: line-through;">￥{{goodsInfo.max_price}}</text>
				</view>
				<view>
					<text class="two">月销 {{goodsInfo.sales}}</text>
				</view>
			</view>
			<view class="title">
				<div class="title-left">
					<text class="tag" v-if="goodsInfo.mold">{{goodsInfo.mold}}</text>
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
			<view class="promise" v-if="goodsInfo.promise">
				{{goodsInfo.promise}}
			</view>
			<view class="promise">
				温馨提示：订单已恢复发货，我们将按照下单顺序进行发货，发货后派送时间可能会因地域封路问题有所延误，请您预留出收货时间，避免耽误您的商品使用。
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
			<view class="item" v-if="goodsInfo.specs_list.length" @click="open('chooses')">
				<view class="one">
					<text class="title">选择</text>
					<text class="comtent">
						<text>请选择规格</text>
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
				<text :class="{'on': showTabWho === 'know'}" @click="showTabWho = 'know'" v-if="buyYouKnow">购买须知</text>
			</view>
			<view class="content" v-if="showTabWho === 'detail'">
<!--				<image v-for="(img, index) in specsInfo.pic_info" :src="img" :key="index" style="width: 100%" :lazy-load="true" mode="widthFix"></image>-->
				<rich-text :nodes="goodsInfo.content"></rich-text>
			</view>
			<view class="content-know" v-if="showTabWho === 'know'">
<!--				<rich-text :nodes="buyYouKnow"></rich-text>-->
				<view v-html="buyYouKnow"></view>
			</view>
		</view>

		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">
				<view class="box"  @click="_goPage('home')">
					<view class="iconfont icon-ddx-shop-shopping"></view>
					<view class="text">商城</view>
				</view>
				<button class="box" open-type="contact" :session-from="userInfo"   @click="contactCustomerService">
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
				<block v-if="goodsInfo.status === 1">
					<block v-if="specsInfo.store === 0">
						<view class='over'>已售完</view>
					</block>
					<block  v-else>
						<view class="joinCart" @click="open('chooses')">加入购物车</view>
						<view class="buy" @click="open('chooses')">立即购买</view>
					</block>
				</block>
				<block  v-else>
					<view class='over'>已下架</view>
				</block>
			</view>
		</view>

		<!-- 购买的时候选择规格，数量…… -->
		<uni-popup ref="selectSpecification" type="bottom" :custom="true" @change="change">
			<view class="select-specification">
				<view class="goods-info">
					<view class="main">
						<view class="image" @click="previewImg(specsInfo.pic, specsInfo.pic)">
							<image class="img" :src='specsInfo.pic'></image>
						</view>
						<view class="info">
							<view class="price">￥{{specsInfo.price}}</view>
							<view class="stock">
								<text v-if="specsInfo.store === -1">库存充足</text>
								<text v-else>库存：{{specsInfo.store}}</text>
							</view>
							<view class="chooses" v-if="choosesGoodsInfo.specs_ids.length">已选：
								<text v-for="(item, index) in choosesGoodsInfo.specs_ids" :key="index" style="margin-right: 4upx;">{{item.name}}</text>
							</view>
						</view>
						<view class="close">
							<text class="iconfont icon-ddx-shop-close" @click="close()"></text>
						</view>
					</view>
				</view>
				<view class="specification" v-show="goodsInfo.specs_list.length !== 0">
					<view class="main" v-for="(item, index) in goodsInfo.specs_list" :key="index">
						<view class="title">
							{{item.tname}}
						</view>
						<view class="content">
							<text v-for="(sItem, sIndex) in item.value" :key="sIndex" @click="choosesSpecs(index, sIndex)" :class="{on: sItem.isActive}">{{sItem.name}}</text>
						</view>
					</view>
				</view>
				<view class="buy-num">
					<view class="main">
						<view class="title">
							购买数量
						</view>
						<view class="content">
							<uni-number-box v-if="specsInfo.store !== -1" :min="1" :step="1" :max="specsInfo.store" :value="choosesGoodsInfo.num" @change="changeNum"></uni-number-box>
							<uni-number-box v-else :min="1" :step="1" :value="choosesGoodsInfo.num" @change="changeNum"></uni-number-box>
						</view>
					</view>
				</view>
				<view class="btns">
					<block v-if="goodsInfo.status === 1">
						<block v-if="specsInfo.store === 0">
							<view class='over'>已售完</view>
						</block>
						<block  v-else>
							<view class="btn" style="background:#FC8A8A;" @click="open('car')">加入购物车</view>
							<view class="btn" @click="open('buy')">立即购买</view>
						</block>
					</block>
					<block  v-else>
						<view class='over'>已下架</view>
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
	import { mapState, mapMutations, } from 'vuex'
	import * as Constant from '../../utils/constant'
	import vVideo from "../../components/vdieo/video";

	export default {
		data() {
			return {
				// 是否显示视频播放
				isShowVideo:false,
				isShowVideoTop: true, // 视频全屏显示/非全屏显示

				//控制渐变标题栏的参数
				beforeHeaderzIndex: 11,//层级
				afterHeaderzIndex: 10,//层级
				beforeHeaderOpacity: 1,//不透明度
				afterHeaderOpacity: 0,//不透明度

				// 商品信息
				goodsInfo:{
					id: 0,   //id
					title: "",    //名称
					mold_id: 0,
					price: "00.00",   //  金额
					initial_sales: 0,
					reality_sales: 0,
					lvid: 0,
					status: 1,
					content: [],//图文详情
					pics: [],//图片
					sales: 0,        //销量
					specs_list: [
						{
							tid: "",
							tname: "",        //规格组名称
							value:[     //详细规格
								{
									id: 0,       //规格id（注意，选规格时传入此id的组合）
									name: ""  //规格名称
								},
							],
							cont: 0
						},
					],
					mold: ""    //类型
				},
				//当前选中的规格，返回的数据
				specsInfo:{
					price: 0.00,//金额
					store: -1, //库存，注意：库存为-1表示无限库存，反正则为库存剩余数
					pic: '', //对应规格的图片
					pic_info:[],//图文详情，全是图片
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

				anchorlist:[
					{name:'主图',top:0},
					{name:'评价',top:0},
					{name:'详情',top:0}
				],//导航条锚点
				selectAnchor:0,//选中锚点

				//当前已经选择了的商品，数量
				choosesGoodsInfo:{
					specs_ids:[],//规格子id的组合
					num:1,//选择购物数量
				},

				//h5的分享引导显示与否
				isShowShareH5: false,
			}
		},
		methods:{
			...mapMutations(['setShareID']),
			// 商品banner滑动到非视频页面时候停止视频的播放
			swiperHandle(e){
			},
			videoPlayOrStop(){
				this.isShowVideo = true
				this.$nextTick(()=>{
					uni.createVideoContext('myVideo').play()
				})
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
			//返回上一页
			back() {
				uni.navigateBack();
			},
			// 如果没有选择规格，则打开选择规格弹框,如果选择了规格，则加入购物车或者立即够买
			open(type){
				switch (type) {
					case 'car':
						if (this.choosesGoodsInfo.specs_ids.length !== this.goodsInfo.specs_list.length){
							this.$refs.selectSpecification.open()
						} else {
							console.log('购物车按钮')
							this.addCar()
						}
						break
					case 'buy':
						if (this.choosesGoodsInfo.specs_ids.length !== this.goodsInfo.specs_list.length){
							this.$refs.selectSpecification.open()
						} else {
							console.log('立即购买')
							this.buyNow()
						}
						break
					case 'chooses':
						console.log('选择规格')
						this.$refs.selectSpecification.open()
						break
				}
			},
			close(){
				this.$refs.selectSpecification.close()
			},
			//购买数量更改
			changeNum(e){
				console.log(e)
				this.choosesGoodsInfo.num = e
			},
			//选择规格
			change(e) {
				console.log(e.show)
			},
			choosesSpecs(index, sIndex){
				console.log(index,sIndex)
				console.log(this.goodsInfo.specs_list[index].value[sIndex])
				this.goodsInfo.specs_list[index].value.map((item) => {
					return item.isActive = false
				})
				this.goodsInfo.specs_list[index].value[sIndex].isActive = !this.goodsInfo.specs_list[index].value[sIndex].isActive
				this.choosesSpecsInfo()
			},
			async choosesSpecsInfo() {
				let arr = []
				this.goodsInfo.specs_list.map((item) => {
					item.value.map((sItem) => {
						if (sItem.isActive){
							arr.push(sItem)
						}
					})
				})
				console.log(arr)
				this.choosesGoodsInfo.specs_ids = arr
				if (arr.length === this.goodsInfo.specs_list.length){
					let arr_ids = []
					arr.map((item) => {
						arr_ids.push(item.id)
					})
					let data = {
						specs_ids: arr_ids.join('_'),
						id: this.goodsInfo.id,
					}
					await this.$minApi.goodsDetailSpecs(data).then(res => {
						console.log(res)
						if (res.code === 200) {
							this.specsInfo = res.data
						}
					})
				}
			},
			//加入购物车
			async addCar(){
				this.close()
				console.log('需要添加到购物车里的数据：', this.choosesGoodsInfo)
				let arr = []
				this.choosesGoodsInfo.specs_ids.map((item) => {
					arr.push(item.id)
				})
				let data = {
					item_id: this.goodsInfo.id,
					specs_ids: arr.join('_'),
					num: this.choosesGoodsInfo.num
				}
				await this.$minApi.carAdd(data).then(res => {
					console.log("加入购物车返回数据：",res)
					if (res.code === 200){
						this.carNum++
						this.msg(res.msg)
					}
				})
			},

			//打开服务说明
			openService(){
				this.$refs.myService.open()
			},
			closeService(){
				this.$refs.myService.close()
			},

			//立即购买
			async buyNow(){
				console.log("当前选中的商品信息，规格和数量",this.choosesGoodsInfo)
				let categoryIdArr = [], categoryNameArr = []
				this.choosesGoodsInfo.specs_ids.forEach(item => {
					categoryIdArr.push(item.id)
					categoryNameArr.push(item.name)
				})
				//件数，下单方式，总量，总金额, 商品参数
				let 	sumNum = 1,
						createOrderType = 'buy_now',
						sumSum = this.choosesGoodsInfo.num,
						sumMoney = parseFloat(this.choosesGoodsInfo.num) * parseFloat(this.specsInfo.price),
						myResponseData = [
							{
								mold_id: this.goodsInfo.mold_id,
								name: this.goodsInfo.mold,
								data:[]
							}
						]
				let goods = {
					categoryArr: categoryNameArr,//["S", "通过热望各位梵蒂冈如果", "还惹我"],//当前选中的规格名组合成数组
					id: 0,//购物车id,这里是直接够买不是购物车够买，所以这里的数据设置为0
					is_checked: false,//购物车里被选中为结算商品,这里是直接够买不是购物车够买，所以这里的数据设置为false
					item_id: this.goodsInfo.id, // 商品id
					key: categoryIdArr.join('_'),//"10_15_17",//当前选中的规格id组合
					key_name: categoryNameArr.join('_'),// "S_通过热望各位梵蒂冈如果_还惹我", //当前选中的规格名组合
					mold: myResponseData[0].name,//"第一.1类型",//
					mold_id: myResponseData[0].mold_id,//2,//
					num: this.choosesGoodsInfo.num,//2,//够买数量
					pic: this.specsInfo.pic,//"http://picture.ddxm661.com/75b9420190906171730779.jpg",//商品图片
					price:  this.specsInfo.price,//"15.00",//商品价格
					status: this.goodsInfo.status,// 1,//商品状态
					store: this.specsInfo.store, // -1,//商品库存
					title: this.goodsInfo.title,// "测试2",//商品标题
				}
				myResponseData[0].data.push(goods)
				console.log("深拷贝出来的数据,二维数组，商品最里面的item_id是商品id，id就是购物车id，也是要传入结算页面的数据：",myResponseData)
				console.log("sumNum,也是要传入结算页面的数据：",sumNum)
				console.log("sumSum,也是要传入结算页面的数据：",sumSum)
				console.log("sumMoney,也是要传入结算页面的数据：",sumMoney)
				this._goPage('order_submit', {
					myResponseData,//购买的商品数据
					sumNum,//件数
					createOrderType,//下单方式
					sumSum,//总量
					sumMoney,//总金额
				})
			},

			/**
			 * 小程序的分享功能
			 * @returns {Promise<void>}
			 */
			//打开分享弹框
			async openShare(){
				if (!this.shareData.pic){
					uni.showLoading({
						title: '加载中…',
						mask:true,
					})
					let requestData = {
						scene: `user_id=${this.userInfo.id}&id=${this.goodsInfo.id}`,
						page: 'pages/goods/detail',
						pic: this.goodsInfo.pics[0],
						title: this.goodsInfo.title,
						price: `￥${this.goodsInfo.price}`,
						goods_id: this.goodsInfo.id,
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
		// 分享到朋友
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: `${this.goodsInfo.title}`,
				path: `pages/goods/detail?user_id=${this.userInfo.id}&id=${this.goodsInfo.id}`
			}
		},
		async onLoad() {
			let requestData = {
					id:0,
				},
				url = Constant[Constant.NODE_ENV].shareGoodsDetail // 分享地址
				if (this.$parseURL().id){
					requestData.id = this.$parseURL().id
					url += `?id=${this.$parseURL().id}`
					console.log("其他页面带过来的参数:",this.$parseURL())
				}
			// 如果用户登录了，把自己的唯一id也分享出去
			if(this.userInfo.id) {
				url += `&user_id=${this.userInfo.id}`
			}
			url = Constant[Constant.NODE_ENV].shareRedirectURL + encodeURIComponent(url)
			await this.$minApi.goodsDetail(requestData).then(async res => {
				console.log("商品详情：", res)
				if (res.code === 200){
					res.data.content = this.formatRichText2(res.data.content)
					if(!res.data.specs_list){
						res.data.specs_list = []
					}
					res.data.specs_list.map((item, index) => {
						res.data.specs_list[index].value.map((sItem, sIndex) => {
							if (sIndex === 0) {
								return sItem.isActive = true
							} else {
								return sItem.isActive = false
							}
						})
					})
					this.goodsInfo = res.data


					// 如果是安卓平台 每次进入商品详情页面就会调用微信配置，自定义分享商品
					if ((await this.getPlatform()).isAndroid){
						await this.wxConfig()
					}

					this.$nextTick(() => {
						this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
						let param1 = {
									title: `捣蛋熊商城-${res.data.title}`, // 分享标题
									desc: `高品质、一站式服务平台`, // 分享描述
									link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
									imgUrl: res.data.pics[0], // 分享图标
									success: function () {}
								},
								param2 = {
									title: `捣蛋熊商城-${res.data.title}`, // 分享标题
									link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
									imgUrl: res.data.pics[0], // 分享图标
									success: function () {}
								}
						this.wxConigShareGoods(param1, param2)
					})
				}
			})
			if (this.goodsInfo.specs_list.length){
				// 多规格获取 商品库存，价格，图片
				await this.choosesSpecsInfo()
			} else {
				// 单规格获取 商品库存，价格，图片
				let data = {
					id: requestData.id,
					specs_ids: '',
				}
				await this.$minApi.goodsDetailSpecs(data).then(res => {
					console.log("获取规格：", res)
					if (res.code === 200) {
						this.specsInfo = res.data
					}
				})
			}
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
			await this.$minApi.goodsDetailComment({item_id: requestData.id}).then(res => {
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
		// onReady(){
		// 	this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
		// },
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

			if (e.scrollTop >= 375){
				this.isShowVideoTop = false
			} else {
				this.isShowVideoTop = true
			}
		},
		components: {
			uniNumberBox,
			uniPopup,
			vVideo
		},
		computed: {
			...mapState(['userInfo', 'subscribe'])
		},
	}
</script>

<style lang="scss">
.container{
	@import '../../static/css/goods_detail.scss';
}
</style>
