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
				<swiper-item v-for="(img_src,index) in swiperList" :key="index">
					<image :src="img_src" @click="previewImg(img_src, swiperList)"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 标题 价格 -->
		<view class="info-box pintuan" style="background: #FC5A5A;margin-bottom: 0;">
			<view class="one">
				<text class="one-title">拼团价</text>
				<text class="one-box">3人拼团</text>
			</view>
			<view class="two">
				<view>
					<text class="two-title">￥39.9</text>
					<text class="two-title2">￥68.88</text>
				</view>
				<view>
					<text>已团6万</text>
				</view>
			</view>
		</view>
		<view class="info-box goods-info">
			<view class="title">
				<text class="tag">直营</text>
				我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题我是商品标题
			</view>
		</view>

		<!-- 其他拼团信息 -->
		<view class="info-box comments" style="padding-bottom: 0;">
			<view class="row">
				<view class="text" style="font-size: 28upx;">有<text style="color: #FC5A5A;">10人</text>正在拼团，你可以直接参与哦~</view>
				<view class="arrow" @click="openMoreOtherGroupBuy">
					<view class="show">
						查看全部
						<view class="iconfont icon-ddx-shop-content_arrows"></view>
					</view>
				</view>
			</view>
			<view class="many-group-buy">
				<view class="one">
					<view><image src="../../static/images/goods.jpg" class="img"></image></view>
					<view>小可爱</view>
				</view>
				<view class="two">
					<view class="info">
						<view class="info-title">还差1人成团</view>
						<view class="info-time">仅剩 28:23:21</view>
					</view>
					<view class="btns">
						<view class="btn">
							一键成团
						</view>
					</view>
				</view>
			</view>
			<view class="many-group-buy">
				<view class="one">
					<view><image src="../../static/images/goods.jpg" class="img"></image></view>
					<view>小可爱</view>
				</view>
				<view class="two">
					<view class="info">
						<view class="info-title">还差1人成团</view>
						<view class="info-time">仅剩 28:23:21</view>
					</view>
					<view class="btns">
						<view class="btn">
							一键成团
						</view>
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
						<view class="item">
							<view class="left">
								<view>
									<image src="../../static/images/goods.jpg" class="img"></image>
								</view>
								<view class="info">
									<view>张三：还差一人成团</view>
									<view>仅剩 20:12:20</view>
								</view>
							</view>
							<view class="right">
								<view class="btn">一键成团</view>
							</view>
						</view>
						<view class="item">
							<view class="left">
								<view>
									<image src="../../static/images/goods.jpg" class="img"></image>
								</view>
								<view class="info">
									<view>张三：还差一人成团</view>
									<view>仅剩 20:12:20</view>
								</view>
							</view>
							<view class="right">
								<view class="btn">一键成团</view>
							</view>
						</view>
						<view class="item">
							<view class="left">
								<view>
									<image src="../../static/images/goods.jpg" class="img"></image>
								</view>
								<view class="info">
									<view>张三：还差一人成团</view>
									<view>仅剩 20:12:20</view>
								</view>
							</view>
							<view class="right">
								<view class="btn">一键成团</view>
							</view>
						</view>
						<view class="item">
							<view class="left">
								<view>
									<image src="../../static/images/goods.jpg" class="img"></image>
								</view>
								<view class="info">
									<view>张三：还差一人成团</view>
									<view>仅剩 20:12:20</view>
								</view>
							</view>
							<view class="right">
								<view class="btn">一键成团</view>
							</view>
						</view>
						<view class="item">
							<view class="left">
								<view>
									<image src="../../static/images/goods.jpg" class="img"></image>
								</view>
								<view class="info">
									<view>张三：还差一人成团</view>
									<view>仅剩 20:12:20</view>
								</view>
							</view>
							<view class="right">
								<view class="btn">一键成团</view>
							</view>
						</view>
						<view class="item">
							<view class="left">
								<view>
									<image src="../../static/images/goods.jpg" class="img"></image>
								</view>
								<view class="info">
									<view>张三：还差一人成团</view>
									<view>仅剩 20:12:20</view>
								</view>
							</view>
							<view class="right">
								<view class="btn">一键成团</view>
							</view>
						</view>
					</view>
					<view class="bottom">仅显示10个正在拼团</view>
				</view>
				<view class="iconfont icon-ddx-shop-close close" @click="closeMoreOtherGroupBuy"></view>
			</view>
		</uni-popup>

		<!--服务说明-->
		<view class="info-box goods-info2" v-if="item_service_ids.length" @click="openService">
			<view class="item">
				<view class="one">
					<text class="title">服务</text>
					<text class="comtent">
						<block v-for="(serviceItem, serviceIndex) in item_service_ids" :key="serviceIndex">
							<block v-if="serviceIndex + 1 !== item_service_ids.length">{{serviceItem.title + ' · '}}</block>
							<block v-else>{{serviceItem.title}}</block>
						</block>
					</text>
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
					<view class="item" v-for="(item, index) in item_service_ids" :key="index">
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
			<view class="content"><rich-text :nodes="descriptionStr"></rich-text></view>
		</view>

		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">
				<view class="box"  @click="this.$openPage('home')">
					<view class="iconfont icon-ddx-shop-shopping"></view>
					<view class="text">商城</view>
				</view>
				<view class="box" @click="this.$openPage('car')">
					<view class="iconfont icon-ddx-shop-shopping-cart-o"></view>
					<view class="text">购物车</view>
					<view class="number">11</view>
				</view>
			</view>
			<view class="btn">
				<view class="joinCart" @click="open()">
					<view class="inner">
						￥68 <br>
						单独够买
					</view>
				</view>
				<view class="buy" @click="open()">
					<view class="inner">
						￥28<br>
						一键开团
					</view>
				</view>
				<!-- <view class='over'>已售完</view> -->
			</view>
		</view>

		<!-- 购买的时候选择规格，数量…… -->
		<uni-popup ref="selectSpecification" type="bottom" :custom="true" @change="change">
			<view class="select-specification">
				<view class="goods-info">
					<view class="main">
						<view class="image">
							<image class="img" src='../../static/images/goods.jpg'></image>
						</view>
						<view class="info">
							<view class="price">￥398</view>
							<view class="stock">库存充足</view>
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
							<uni-number-box :min="1" :value="1" :step="1"></uni-number-box>
						</view>
					</view>
				</view>
				<view class="btns">
					<view class="btn" style="background:#FC8A8A;">
						<view class="inner">
							￥68 <br>
							单独够买
						</view>
					</view>
					<view class="btn">
						<view class="inner">
							￥28<br>
							一键开团
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import separator from "@/components/separator.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				item_service_ids: [       //服务
					{
						title: "品质保障",
						content: "大手大脚按时缴费等是否会受到返回到数据库恢复1"
					},
					{
						title: "品质保障",
						content: "大手大脚按时缴费等是否会受到返回到数据库恢复1"
					},
					{
						title: "品质保障",
						content: "大手大脚按时缴费等是否会受到返回到数据库恢复1"
					},
				],

				//控制渐变标题栏的参数
				beforeHeaderzIndex: 11,//层级
				afterHeaderzIndex: 10,//层级
				beforeHeaderOpacity: 1,//不透明度
				afterHeaderOpacity: 0,//不透明度

				//轮播主图数据
				swiperList: [
					'https://ae01.alicdn.com/kf/HTB1Mj7iTmzqK1RjSZFjq6zlCFXaP.jpg',
					'https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg',
					'https://ae01.alicdn.com/kf/HTB1dPUMThnaK1RjSZFtq6zC2VXa0.jpg',
					'https://ae01.alicdn.com/kf/HTB1OHZrTXzqK1RjSZFvq6AB7VXaw.jpg'
				],
				anchorlist:[],//导航条锚点
				selectAnchor:0,//选中锚点

				descriptionStr:'<div style="text-align:center;"><img width="100%" src="https://ae01.alicdn.com/kf/HTB1t0fUl_Zmx1VjSZFGq6yx2XXa5.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB1LzkjThTpK1RjSZFKq6y2wXXaT.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB18dkiTbvpK1RjSZPiq6zmwXXa8.jpg"/></div>',

			}
		},
		methods:{
			//轮播图放大预览
			previewImg(src,urls){
				uni.previewImage({
					indicator:'number',
					current:src,
					urls
				})
			},
			//商品评论
			toRatings(){
				uni.navigateTo({
					url:'ratings/ratings'
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
			//返回上一页
			back() {
				uni.navigateBack();
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
		},
		onLoad(option) {
			console.log("带过来的参数",this.$parseURL())
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
		components: {
			uniNumberBox,
			separator,
			uniPopup,
		}
	}
</script>

<style lang="scss">
	.container{
		.header {
			width: 100%;
			height: 100upx;
			position: fixed;
			top: 0;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
			/*  #endif  */
			/*  #ifdef  H5  */
			top: var(--window-top);
			/*  #endif  */
			z-index: 10;
			.after {
				background-color: #fff;
				width: 100%;
				height: 100upx;
				position: relative;
				top: 0;
				transition: opacity 0.05s linear;
				.middle {
					font-size: 32upx;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100upx;
					display: flex;
					justify-content: center;
					align-items: center;
					view {
						margin: 0 $uni-spacing-row-sm;
						display: flex;
						justify-content: center;
						align-items: center;
						&.on {
							color: $color-primary;
							border-bottom: solid 4upx $color-primary;
						}
					}
				}
				.icon-btn {
					position: absolute;
					right: $uni-spacing-row-sm;
					top: 0;
					height: 100upx;
					line-height: 100upx;
					flex-shrink: 0;
					display: flex;
					justify-content: flex-end;
					font-size: 42upx;
					color: #666;
				}
			}
		}
		.swiper-box {
			position: relative;
			width: 100%;
			height: 100vw;
			swiper {
				width: 100%;
				height: 100vw;
				swiper-item {
					image {
						width: 100%;
						height: 100vw;
					}
				}
			}
			.indicator{
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 25upx;
				height: 40upx;
				border-radius: 40upx;
				font-size: 22upx;
				position: absolute;
				bottom: 20upx;
				right: 20upx;
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
			}
		}
		.info-box {
			width: 100%;
			padding: 0 $uni-spacing-row-base;
			background-color: #fff;
			margin-bottom: 20upx;
		}
		.goods-info {
			padding: $uni-spacing-row-base;
			.price {
				display: flex;
				justify-content:space-between;
				align-items: center;
				margin-bottom: $uni-spacing-col-sm;
				.one{
					color: $color-primary;
					font-size: $uni-font-size-lg;
					margin-right: 20upx;
				}
				.two{
					color: #808080;
					font-size: $uni-font-size-base;
				}
			}
			.title {
				@extend %overflow-2-line;
				text-align: justify;
				color: $color-primary-plain;
				font-size: $uni-font-size-base;
				.tag{
					background: $color-primary;
					color: #ffffff;
					padding: 0 8upx;
					margin-right: $uni-spacing-row-base;
					border-radius: $uni-border-radius-sm;
				}
			}
		}
		.goods-info2{
			.item{
				display: flex;
				justify-content:space-between;
				align-items: center;
				width: 100%;
				height: 80upx;
				@extend  %border-color-solid-botton;
				@extend %overflow-1-line;
				font-size: $uni-font-size-base;
				color: $color-primary-plain;
				padding: $uni-spacing-col-lg 0;
				.one{
					width: 85%;
					display: flex;
					justify-content: flex-start;
					.title{
						width: 10%;
						margin-right: $uni-spacing-row-base;
					}
					.comtent{
						width: 75%;
					}
				}
				.two{
					width: 10%;
					text-align: right;
					.iconfont{
						font-size:$uni-font-size-sm;
					}
				}
				&:last-child{
					border: none;
				}
			}

		}
		.comments {
			padding: $uni-spacing-row-base;
			.row {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 0 0 30upx 0;
				.text {
					font-size: 30upx;
				}
				.arrow {
					font-size: 28upx;
					color: #cccccc;
					.show {
						display: flex;
						align-items: center;
						.iconfont {
							font-size: 30upx;
							color: #cccccc;
						}
					}
				}
			}
			.comment {
				width: 100%;
				.user-info {
					width: 100%;
					height: 40upx;
					display: flex;
					align-items: center;
					justify-content:space-between;
					.head-name{
						display: flex;
						align-items: center;
						.face {
							width: 40upx;
							height: 40upx;
							margin-right: 8upx;
							image {
								width: 40upx;
								height: 40upx;
								border-radius: 100%;
							}
						}
						.username {
							font-size: 24upx;
							color: #999;
						}
					}
					.time{
						font-size: 24upx;
						color: #999;
					}
				}
				.content {
					@extend  %overflow-2-line;
					text-align: justify;
					margin-top: 10upx;
					font-size: 26upx;
				}
			}
		}
		.description {
			margin-bottom: 100upx;
			.title {
				width: 100%;
				height: 80upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26upx;
				color: #999;
				background: #fff;
			}
		}

		.footer {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 98upx;
			background-color: #fff;
			z-index: 99;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.icons {
				display: flex;
				justify-content: center;
				height: 98upx;
				width: 30%;
				.box {
					position: relative;
					width: 98upx;
					height: 98upx;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					.iconfont {
						font-size: 60upx;
						color: #828282;
					}
					.text {
						display: flex;
						justify-content: center;
						width: 100%;
						font-size: 22upx;
						color: #666;
					}
					.number{
						background: $color-primary;
						border-radius:50%;
						color: #fff;
						font-size: $uni-font-size-sm;
						width: 34upx;
						height: 34upx;
						text-align: center;
						line-height: 34upx;
						position: absolute;
						top: 4upx;
						right: 0;
					}
				}
			}
			.btn {
				height: 98upx;
				width: 70%;
				overflow: hidden;
				display: flex;
				justify-content: flex-end;
				.joinCart,
				.buy,
				.over {
					height: 98upx;
					width: 250upx;
					display: table; /*重点*/
					text-align: center;
					.inner{
						display: table-cell;
						vertical-align:middle;
					}
					color: #fff;
					font-size: 28upx;
				}
				.joinCart {
					background-color: #FC8A8A;
				}
				.buy {
					background-color: #FC5A5A;
				}
				.over{
					background:#666666;
					width:100%;
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
						justify-content: flex-end;
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
					display: table;
					.inner{
						display: table-cell;
						vertical-align:middle;
					}
				}
			}
		}

		/* 服务说明  */
		.service{
			.service-point{
				padding: 0 8upx;
				font-size: $uni-font-size-lg;
				&:last-child{
					display: none;
				}
			}
		}
		.my-service {
			background: #fff;
			.my-service-title {
				@extend %border-color-solid-botton;
				line-height: 60upx;
				font-size: $uni-font-size-lg;
				padding: 15upx 0;
				text-align: center;
			}
			.my-service-box {
				background: #fff;
				padding: $uni-spacing-row-base;
				display: flex;
				flex-direction: column;
				.item{
					display: flex;
					flex-direction: column;
					padding:$uni-spacing-col-base;
					.title-and-point{
						padding: $uni-spacing-col-sm 0;
						font-size: $uni-font-size-lg;
						color: #1A1A1A;
						display: flex;
						flex-direction: row;
						align-items: center;
						.point{
							margin-right: 20upx;
							width: 14upx;
							height: 14upx;
							border-radius: 50%;
							background: #E4E4E4;
							&.on{
								opacity: 0;
							}
						}
						.title{
							font-size: $uni-font-size-lg;
							color: #1A1A1A;
							&.on{
								font-size: $uni-font-size-base;
								color: #808080;
							}
						}
					}
				}
			}
			.btn{
				margin-top: 300upx;
				width: 100%;
				height: 98upx;
				line-height: 98upx;
				font-size: $uni-font-size-lg;
				color: #ffffff;
				text-align: center;
				background: $color-primary;
			}
		}

		/* 拼团展示 */
		.pintuan{
			color:#ffffff;
			padding-top: $uni-spacing-col-base;
			padding-bottom: $uni-spacing-col-base;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.one{
				padding:6upx 0;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
				font-size: $uni-font-size-base;
				.one-title{
					margin-right: 10upx;
				}
				.one-box{
					font-size: 20upx;
					padding: 0 6upx;
					height:34upx;
					line-height: 34upx;
					text-align: center;
					border:1upx solid #fff;
					border-radius:4upx;
				}
			}
			.two{
				padding:6upx 0;
				display: flex;
				align-items: center;
				flex-direction: row;
				justify-content: space-between;
				font-size: $uni-font-size-base;
				.two-title{
					margin-right: 10upx;
					font-size: $uni-font-size-lg;
				}
				.two-title2{
					font-size: $uni-font-size-sm;
					text-decoration: line-through;
					color: #FBC7C7;
				}
			}

		}

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
	}
</style>
