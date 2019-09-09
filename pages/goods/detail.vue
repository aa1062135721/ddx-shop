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
		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="price">
				<view>
					<text class="one">￥{{goodsInfo.price}}</text>
<!--					<text class="two">￥680</text>-->
				</view>
				<view>
					<text class="two">月销 {{goodsInfo.sales}}</text>
				</view>
			</view>
			<view class="title">
				<text class="tag" v-if="goodsInfo.mold">{{goodsInfo.mold}}</text>
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
							<block v-if="serviceIndex + 1 !== goodsInfo.item_service_ids.length">{{serviceItem.title + ' · '}}</block>
							<block v-else>{{serviceItem.title}}</block>
						</block>
					</text>
				</view>
				<view class="two">
					<text class="iconfont icon-ddx-shop-content_arrows"></text>
				</view>
			</view>
		</view>
		<!-- 购买的时候选择规格，数量…… -->
		<uni-popup ref="myService" type="bottom" :custom="true">
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

		<!--商品信息  -->
		<view class="info-box goods-info2">
<!--			<view class="item">-->
<!--				<view class="one">-->
<!--					<text class="title">配送</text>-->
<!--					<text class="comtent">重庆市 市辖区 渝北区</text>-->
<!--				</view>-->
<!--				<view class="two">-->
<!--					<text class="iconfont icon-ddx-shop-content_arrows"></text>-->
<!--				</view>-->
<!--			</view>-->
			<view class="item" v-if="goodsInfo.specs_list.length" @click="open('chooses')">
				<view class="one">
					<text class="title">选择</text>
					<text class="comtent">
						<text v-for="(item, index) in choosesGoodsInfo.specs_ids" :key="index" style="margin-right: 4upx;">{{item.name}}</text>
						<text v-if="!choosesGoodsInfo.specs_ids.length">请选择规格</text>
					</text>
				</view>
				<view class="two">
					<text class="iconfont icon-ddx-shop-content_arrows"></text>
				</view>
			</view>
<!--			<view class="item">-->
<!--				<view class="one">-->
<!--					<text class="title">运费</text>-->
<!--					<text class="comtent">10元邮费</text>-->
<!--				</view>-->
<!--				<view class="two">-->
<!--					<text class="iconfont icon-ddx-shop-content_arrows"></text>-->
<!--				</view>-->
<!--			</view>-->
			<view class="item">
				<view class="one">
					<view class="title">数量</view>
					<view class="comtent">
						<uni-number-box v-if="specsInfo.store !== -1" :min="1" :step="1" :max="specsInfo.store" :value="choosesGoodsInfo.num" @change="changeNum"></uni-number-box>
						<uni-number-box v-else :min="1" :step="1" :value="choosesGoodsInfo.num" @change="changeNum"></uni-number-box>
					</view>
				</view>
				<view class="two">
					<text class="iconfont icon-ddx-shop-content_arrows"></text>
				</view>
			</view>
		</view>

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
				<block v-if="specsInfo.store">
					<view class="joinCart" @click="open('car')">加入购物车</view>
					<view class="buy" @click="open('buy')">立即购买</view>
				</block>
				<view class='over' v-else>已售完</view>
			</view>
		</view>

		<!-- 购买的时候选择规格，数量…… -->
		<uni-popup ref="selectSpecification" type="bottom" :custom="true" @change="change">
			<view class="select-specification">
				<view class="goods-info">
					<view class="main">
						<view class="image">
							<image class="img" :src='specsInfo.pic'></image>
						</view>
						<view class="info">
							<view class="price">￥{{specsInfo.price}}</view>
							<view class="stock">
								<text v-if="specsInfo.store === -1">库存充足</text>
								<text v-else>库存：{{specsInfo.store}}</text>
							</view>
							<view class="chooses">已选：
								<text v-for="(item, index) in choosesGoodsInfo.specs_ids" :key="index" style="margin-right: 4upx;">{{item.name}}</text>
							</view>
						</view>
						<view class="close">
							<text class="iconfont icon-ddx-shop-close" @click="close()"></text>
						</view>
					</view>
				</view>
				<view class="specification">
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
					<block v-if="specsInfo.store">
						<view class="btn" style="background:#FC8A8A;" @click="open('car')">
							加入购物车
						</view>
						<view class="btn" @click="open('buy')">
							立即购买
						</view>
					</block>
					<view class='over' v-else>已售完</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import separator from "@/components/separator.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import add from "../address/add";
	export default {
		data() {
			return {

				//控制渐变标题栏的参数
				beforeHeaderzIndex: 11,//层级
				afterHeaderzIndex: 10,//层级
				beforeHeaderOpacity: 1,//不透明度
				afterHeaderOpacity: 0,//不透明度

				// 商品信息
				goodsInfo:{
					id: 17,   //id
					title: "奶粉罐装",    //名称
					mold_id: 2,
					price: "90.00",   //  金额
					initial_sales: 36,
					reality_sales: 0,
					lvid: 2,
					content: [],//图文详情
					pics: ["http://picture.ddxm661.com/6dae4201909051617308036.jpg"],//图片
					sales: 36,        //销量
					specs_list: [
						{
							tid: "1",
							tname: "颜色",        //规格组名称
							value:[     //详细规格
								{
									id: 35,       //规格id（注意，选规格时传入此id的组合）
									name: "黄色"  //规格名称
								},
							],
							cont: 2
						},
					],
					mold: "第一.1类型"    //类型
				},
				specsInfo:{
					price: 0.00,//金额
					store: 0, //库存，注意：库存为-1表示无限库存，反正则为库存剩余数
					pic: '', //对应规格的图片
				},

				anchorlist:[],//导航条锚点
				selectAnchor:0,//选中锚点

				//当前已经选择了的商品，数量
				choosesGoodsInfo:{
					specs_ids:[],//规格子id的组合
					num:1,//选择购物数量
				},
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
						id: this.$parseURL().id,
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
					item_id: this.$parseURL().id,
					specs_ids: arr.join('_'),
					num: this.choosesGoodsInfo.num
				}
				await this.$minApi.carAdd(data).then(res => {
					console.log(res)
					if (res.code === 200){
						// TODO
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

		},
		async onLoad() {
			console.log("带过来的参数",this.$parseURL())
			await this.$minApi.goodsDetail({id:this.$parseURL().id}).then(res => {
				console.log(res)
				if (res.code === 200){
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
				}
			})
			if (this.goodsInfo.specs_list.length){
				await this.choosesSpecsInfo()
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
				line-height: 98upx;
				text-align: center;
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
				line-height: 98upx;
				width: 50%;
			}
			.over{
				background: #666666;;
				font-size: $uni-font-size-lg;
				text-align: center;
				height: 98upx;
				line-height: 98upx;
				width: 100%;
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
}
</style>
