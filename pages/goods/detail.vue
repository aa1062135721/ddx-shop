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
		<uni-popup ref="myService" type="bottom" :custom="true" v-if="goodsInfo.item_service_ids.length" >
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
			<view class="title">
				<text :class="{'on': showTabWho === 'detail'}" @click="showTabWho = 'detail'">图文详情</text>
				<text :class="{'on': showTabWho === 'know'}" @click="showTabWho = 'know'" v-if="buyYouKnow">购买须知</text>
			</view>
			<view class="content" v-if="showTabWho === 'detail'">
				<image v-for="(img, index) in specsInfo.pic_info" :src="img" :key="index" style="width: 100%" :lazy-load="true" mode="widthFix"></image>
			</view>
			<view class="content-know" v-if="showTabWho === 'know'">
				<rich-text :nodes="buyYouKnow"></rich-text>
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
				<block v-if="goodsInfo.status === 1">
					<block v-if="specsInfo.store === 0">
						<view class='over'>已售完</view>
					</block>
					<block  v-else>
						<view class="joinCart" @click="open('car')">加入购物车</view>
						<view class="buy" @click="open('buy')">立即购买</view>
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
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import { mapGetters } from 'vuex'
	import {mapActions} from 'vuex'

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
					id: 0,   //id
					title: "",    //名称
					mold_id: 0,
					price: "00.00",   //  金额
					initial_sales: 0,
					reality_sales: 0,
					lvid: 0,
					content: [],//图文详情
					pics: [],//图片
					sales: 36,        //销量
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
					store: 0, //库存，注意：库存为-1表示无限库存，反正则为库存剩余数
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
			...mapActions(['saveShareID']),
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

			console.log("带过来的参数2:",this.$parseURL())
			if (this.$parseURL().id){
				requestData.id = this.$parseURL().id
			}
			await this.$minApi.goodsDetail(requestData).then(res => {
				console.log("商品详情：", res)
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
			uniPopup,
		},
		computed: {
			...mapGetters(['userInfo'])
		},
	}
</script>

<style lang="scss">
.container{
	@import '../../static/css/goods_detail.scss';
}
</style>
