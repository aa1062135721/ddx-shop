<template>
	<view class="container">
		<!-- 关注公众号 -->
		<view class="follow-official-account" v-if="!subscribe">
			<view class="box">
				<view class="left">
					<view class="follow-logo">
						<image class="img" src="../../static/images/pandalogo1.png" model="widthFill"></image>
					</view>
					<view class="follow-text">
						<view class="follow-text-title">捣蛋熊猫</view>
						<view>关注一下，万千豪礼敬情相送</view>
					</view>
				</view>
				<view class="right">
					<view @click="openFollowOfficialAccount">关注</view>
				</view>
			</view>
		</view>
		<!-- 关注公众号 弹窗，弹出二维码 -->
		<uni-popup ref="followOfficialAccountAlert" type="center" :custom="true">
			<view class="follow-official-account-alert">
				<view class="box">
					<view>
						<image class="img" :src="qrCodeUrl" ></image>
					</view>
					<view>
						长按识别二维码
					</view>
					<view>
						关注公众号
					</view>
				</view>
			</view>
		</uni-popup>

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
				<swiper-item style="display: flex;flex-direction: column;justify-content: center;background: #000;" v-if="goodsInfo.item.video">
					<video id="myVideo" :src="goodsInfo.item.video"
						   controls
						   style="width: 100%;"
					></video>
				</swiper-item>
				<swiper-item v-for="(img_src,index) in goodsInfo.item.pics" :key="index">
					<image :src="img_src" @click="previewImg(img_src, goodsInfo.item.pics)"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 倒计时  -->
		<view class="info-box miaosha">
			<view class="left">
				<view class="top">
					<text class="price">
						￥{{goodsInfo.item.price}}
					</text>
					<text class="time-kill">
						{{goodsInfo.assemble_num}}人团
					</text>
				</view>
				<view class="bottom">
					<span class="old-price">
						￥{{goodsInfo.item.old_price}}
					</span>
					<span class="mei-ren-xian-gou">每人限购:{{goodsInfo.people_num}}件</span>
					<span class="mei-ren-xian-gou" v-if="goodsInfo.item_specs.length === 1">
                        已秒杀{{choosesGoodsInfo.specs.already_num}}件,剩余
                        <block v-if="choosesGoodsInfo.specs.over_num === -1">99<sup>+</sup></block>
                        <block v-else>{{choosesGoodsInfo.specs.over_num}}</block>
                        件
                    </span>
				</view>
			</view>
			<view class="right">
				<view class="one" v-if="goodsInfo.status === 1">
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
				<view class="one" v-if="goodsInfo.status === 3">
					<view class="title">拼团状态</view>
					<view class="time">
						<text class="tag">已经结束</text>
					</view>
				</view>
				<view class="one" v-if="goodsInfo.status === 2">
					<view class="title">距离开始还剩</view>
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
			<!-- 子标题  承诺  -->
			<view class="sub-title" v-if="goodsInfo.item.subtitle">
				{{goodsInfo.item.subtitle}}
			</view>
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

		<!-- 其他拼团信息 -->
		<view class="info-box comments" style="padding-bottom: 0;" v-if="goodsInfo.assemble_group.length">
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
		</view>
		<!-- 其他拼团信息，查看更多 -->
		<uni-popup ref="moreOtherGroupBuy" type="center" :custom="true" :mask-click="false">
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
				<view class="joinCart my-vam" @click="_goPage('goods_detail', {id: goodsInfo.item.id})">
					<view class="inner">
<!--						￥{{ (parseFloat(goodsInfo.item.old_price) * parseFloat(choosesGoodsInfo.num)) | moneyToFixed }}<br />-->
						单独购买
					</view>
				</view>
				<view class="buy my-vam" @click="open()" v-if="goodsInfo.status === 1">
						<block v-if="choosesGoodsInfo.assemble_list_id">一键参团</block>
						<block v-else>一键开团</block>
				</view>
				<view class="buy my-vam" v-if="goodsInfo.status === 2"  style="background:#F9A13A;">
						待开始
				</view>
				<view class="buy my-vam" v-if="goodsInfo.status === 3" style="background:#F9A13A;">
						已结束
				</view>
			</view>
		</view>

		<!-- 购买的时候选择规格，数量…… -->
		<uni-popup ref="selectSpecification" type="bottom" :custom="true" :maskClick="false">
			<view class="select-specification">
				<view class="goods-info">
					<view class="main">
						<view class="image" @click="previewImg(choosesGoodsInfo.specs.pic, [choosesGoodsInfo.specs.pic])">
							<image class="img" :src='choosesGoodsInfo.specs.pic'></image>
						</view>
						<view class="info">
							<view class="price">团长价：￥{{choosesGoodsInfo.specs.commander_price}}</view>
							<view class="stock">团员价：￥{{choosesGoodsInfo.specs.price}}</view>
							<view class="stock">
								已团{{choosesGoodsInfo.specs.already_num}}件，剩余
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
							<uni-number-box v-if="choosesGoodsInfo.specs.residue_num === -1" :min="1" :step="1"  :value="choosesGoodsInfo.num" @change="changeNum"></uni-number-box>
							<uni-number-box v-else :min="1" :step="1" :max="choosesGoodsInfo.specs.residue_num" :value="choosesGoodsInfo.num" @change="changeNum"></uni-number-box>
						</view>
					</view>
				</view>
				<view class="btns">
					<block v-if="choosesGoodsInfo.specs.residue_num === 0">
						<view class='over'>已拼完</view>
					</block>
					<block v-else>
						<view class='over' style="background:#FC5A5A;" @click="buyNow(1)">
							<block v-if="choosesGoodsInfo.assemble_list_id">参团</block>
							<block v-else>一键开团</block>
						</view>
					</block>
				</view>
			</view>
		</uni-popup>

		<!-- h5分享	-->
		<uni-popup ref="shareH5" type="bottom" :custom="true">
			<view class="share-goods-h5">
				<view class="share-title-h5-box">
					<view class="share-title-h5-box-titles" v-show="goodsInfo.item.ratio !== '0.00'">
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
					<view class="btn" @click="_goPage('user_distribution')">分销中心</view>
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
				timer: {
					d: 0,
					h:`00`,
					m:`00`,
					s:`00`
				},

				goodsInfo: {
					id: 0,    //拼团id
					title: "",
					start_time: 1573747200,   //开始时间
					end_time: 1575043200, //结束时间
					type: 0,
					people_num: 0,    //每人限购
					assemble_num: 0,  //几人团
					now_time: 1573906737, //服务器当前时间
					status: 1,    //1正在拼团，2立即开始 3平图案
					is_over: 0,   //是否拼完
					attributes: "",  //规格组
					item: {       //商品信息
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
					assemble_group: [ //有几组正在拼团
						// {
						// 	id: 22,
						// 	r_num: 2, //还差几人
						// 	end_time: 1573731184, //结束时间
						// 	commander_nickname: "夜未央", //团长名
						// 	status:1,
						// 	timeStr: '1天22:33:20',
						// 	commander_pic: "http://thirdwx.qlogo.cn/mmopen/RzbvdRz23xicxuLkiccicV8r9Q5ySQgcDia3xImBdVUibbcy6fP840tRice4ua7BUibxgvfRYq0ibj3teu7420m4lb5SIozU04FWTv40/132", //团长头像
						// }
					],
					order_info: { //加入当前登录的用户已经加入此团蛋还未成功的订单信息，
						// order_id: 3822,   //订单id
						// order_status: 0,  //支付状态：0 为待支付  1为已支付，    待支付跳支付，已支付跳拼团详情
						// order_amount: "5.80"  //订单总额
					}
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
					assemble_list_id: 0,//拼团组的id，非必传，不传表示自己开团，否则表示与别人成团
				},

				//h5的分享引导显示与否
				isShowShareH5: false,
				qrCodeUrl: Constant[Constant.NODE_ENV].qrCodeUrl, // 微信公众号二维码
			}
		},
		methods:{
			...mapMutations(['setShareID']),
			// 商品banner滑动到非视频页面时候停止视频的播放
			swiperHandle(e){
				if (this.goodsInfo.item.video && e.detail.current !== 0) {
					uni.createVideoContext('myVideo').pause()
				}
			},
			_goPage(url, query = {}){
				this.$openPage({name:url, query})
			},
			// 返回按钮
			_goBack() {
				uni.navigateBack()
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
			 * 倒计时
			 */
			// 整个拼团商品的 倒计时
			getRTime(){
				let time_distance = 0 //时间差
				//1：正在拼团，2即将开始，3已结束
				if (this.goodsInfo.start_time  > this.goodsInfo.now_time) {
					this.$set(this.goodsInfo, 'status', 2)
					time_distance = this.goodsInfo.start_time * 1000 - this.goodsInfo.now_time * 1000
					console.log("拼团活动还未开始呢")
				}

				if (this.goodsInfo.start_time  <= this.goodsInfo.now_time && this.goodsInfo.now_time <=  this.goodsInfo.end_time) {
					this.$set(this.goodsInfo, 'status', 1)
					time_distance = this.goodsInfo.end_time * 1000 - this.goodsInfo.now_time * 1000
					console.log("秒杀活正在进行中")
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
				this.timer = {d:int_day, h:int_hour, m:int_minute, s:int_second}

				if (this.goodsInfo.end_time  < this.goodsInfo.now_time) {
					this.$set(this.goodsInfo, 'status', 3)
					clearInterval(myTimer1)
					console.log("拼团活动已经结束啦")
				}
			},
			// 倒计时 (10组拼团人的倒计时)
			timeStrChange(){
				this.goodsInfo.assemble_group.map(item => {
					let time_distance = item.end_time * 1000 - this.goodsInfo.now_time * 1000; // 结束时间减去当前时间
					if (time_distance < 0) {
						item.status = 0
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
				//判断是否为开团
				if (this.choosesGoodsInfo.assemble_list_id) {
					type = 3
				}
				this.close()
				let price = 0.0
				switch (type) {
					case 1:
						price = this.choosesGoodsInfo.specs.commander_price // price 拼团价
						break
					case 3:
						price = this.choosesGoodsInfo.specs.price // 和别人组团 组团价
						break
				}

				//件数，订单类型，总量，总金额, 商品参数
				let 	sumNum = 1,
						createOrderType = 'group',
						sumSum = this.choosesGoodsInfo.num,
						sumMoney = parseFloat(this.choosesGoodsInfo.num) * parseFloat(price),
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
					price:  price,//"15.00",//商品价格
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
					num: this.choosesGoodsInfo.num,//购买数量
					activity_id: this.goodsInfo.id,//拼团活动id
					commander: (type === 1 ? 1 : 0),// 如果为拼团订单，此参数拿去获取运费：1表示团长，2表示为团员
					assemble_list_id: this.choosesGoodsInfo.assemble_list_id,    //拼团组的id，非必传，不传表示自己开团，否则表示与别人成团
				})
			},

			// 一键成团
			buyGroup(item){
				console.log(item)
				// "order_info": { //加入当前登录的用户已经加入此团蛋还未成功的订单信息，
				// 	"order_id": 3822,   //订单id
				//	"order_status": 0,  //支付状态：0 为待支付  1为已支付，    待支付跳支付，已支付跳拼团详情
				// "order_amount": "5.80"  //订单总额
				// }
				if(this.goodsInfo.order_info.order_id) {
					let _that = this
					if (this.goodsInfo.order_info.order_status === 0) {
						uni.showModal({
							title: '提示',
							content: '该商品你还有拼团未支付,请取消订单或者现在去支付',
							success: function (showModalRes) {
								if (showModalRes.confirm) {
									console.log('用户点击确定');
									_that._goPage('order_pay', {
										order_id: this.goodsInfo.order_info.order_id,
										amount: this.goodsInfo.order_info.order_amount,
									})
								} else if (showModalRes.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
					if (this.goodsInfo.order_info.order_status === 1) {
						uni.showModal({
							title: '提示',
							content: '你已经参加过拼团了，是否查看？',
							success: function (showModalRes) {
								if (showModalRes.confirm) {
									console.log('用户点击确定');
									_that._goPage('group_buy_group', {id: this.goodsInfo.order_info.order_id})
								} else if (showModalRes.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
					return
				}
				this.choosesGoodsInfo.assemble_list_id = item.id
				this.open()
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

			/**
			 * 拼团规则详情
			 */
			async goRulePage(){
				await this.$minApi.assembleRuleInfo().then(res => {
					console.log("获取拼团规则，并跳转页面",res)
					if (res.code === 200) {
						this._goPage('rich_text', {content: res.data.content,title: '拼团规则',})
					}
				})
			},

			//打开关注公众号二维码弹框follow-official-account
			openFollowOfficialAccount(){
				this.$refs.followOfficialAccountAlert.open()
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
		},
		async onLoad(param) {
			let requestData = {
				assemble_id:0,
				item_id:0,
			}

			if (param.user_id){
				this.setShareID(param.user_id)
			}
			if (param.item_id){
				requestData.item_id = param.item_id
				requestData.assemble_id = param.assemble_id
				console.log("通过分享进入页面，带过来的参数:", param)
			}

			if (this.$parseURL().item_id){
				requestData.item_id = this.$parseURL().item_id // 商品id
				requestData.assemble_id = this.$parseURL().assemble_id // 拼团活动id
				if (this.$parseURL().assemble_list_id) { // 别人通过的分享，参团的团组 id
					this.choosesGoodsInfo.assemble_list_id = this.$parseURL().assemble_list_id
				}
				console.log("其他页面带过来的参数：",this.$parseURL())
			}

			await this.$minApi.assembleInfo(requestData).then(async res => {
				console.log("拼团详情：",res)
				if (res.code === 200){
					res.data.item.content = this.formatRichText2(res.data.item.content)
					if (res.data.assemble_group.length) {
						res.data.assemble_group.map((item) => {
							// 是否可以参加拼团 //1为可以，参加，0为不可以
							item.status = 1
							// 还剩多少时间可以参加拼团
							item.timeStr = ''
						})
					}
					this.choosesGoodsInfo.specs = res.data.item_specs[0]
					this.goodsInfo = res.data

					// 如果是安卓平台 每次进入商品详情页面就会调用微信配置，自定义分享商品
					if (await(this.getPlatform()).isAndroid){
						await this.wxConfig()
					}
					let url = this.currentUrlDelParam('user_id')
					url = this.urlDelParam(url, 'code')
					url = this.urlDelParam(url, 'state')
					if(this.userInfo.id) {
						url  += '&user_id=' + this.userInfo.id
					}

					this.$nextTick(async ()=>{
						//整个商品的拼团倒计时
						myTimer1 = setInterval(() =>{
							this.goodsInfo.now_time ++
							this.getRTime()
						}, 1000) //设置定时器 每一秒执行一次

						this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确

						if (this.goodsInfo.assemble_group.length){
							// 10个人的组团倒计时
							myTimer = setInterval(() => {
								this.timeStrChange()
							}, 1000);//设置定时器 每一秒执行一次
						}

						let param1 = {
									title: `捣蛋熊拼团-${res.data.item.title}`, // 分享标题
									desc: `仅限${res.data.item.price}元，立省${(parseFloat(res.data.item.old_price) - parseFloat(res.data.item.price)).toFixed(2)}元，先到先得`, // 分享描述
									link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
									imgUrl: res.data.item.pics[0], // 分享图标
									success: function () {}
								},
							param2 = {
								title: `捣蛋熊拼团-${res.data.item.title}`, // 分享标题
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
		onUnload(){
			clearInterval(myTimer)
			clearInterval(myTimer1)
			myTimer = null
			myTimer1 = null
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
