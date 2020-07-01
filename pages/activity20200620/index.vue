<template>
	<div class="box">
		<!-- #ifdef H5 -->
		<div id="my-h5-back" @click="_goBack"></div>
		<!-- #endif -->

		<div class="banner">
			<img src="http://picture.ddxm661.com/a0b19202006181450563785.gif">
		</div>
		<div class="hot-box">
			<div class="title-box" style="text-align: center; ">
				<image src="http://picture.ddxm661.com/92c4f202006181451406397.png" style="width: 417rpx; height: 80rpx;"></image>
			</div>
			<div class="hot-box-items">
				<image src="http://picture.ddxm661.com/1a716202006181455229619.png" @click="_receive(26)" :lazy-load="true" class="M_img"></image>
				<image src="http://picture.ddxm661.com/93bbc202006181455222607.png" @click="_receive(27)" :lazy-load="true" class="M_img"></image>
			</div>
		</div>
		<div class="assign">
			<div class="assignBg">
				<image src="http://picture.ddxm661.com/9f9ad20200618150016763.png" ></image>
			</div>
			<div class="bigBox">
				<div class="assignBox">
					<image src="http://picture.ddxm661.com/85b88202006181503344597.png"  @click="_goPage('goods_detail', {id:6378})"></image>
					<image src="http://picture.ddxm661.com/cbc60202006181503396184.png"  @click="_goPage('goods_detail', {id:5036})"></image>
				</div>
				<div class="assignBox">
					<image src="http://picture.ddxm661.com/69f8f202006181503455248.png" @click="_goPage('goods_detail', {id:3889})"></image>
					<image src="http://picture.ddxm661.com/68500202006181503507017.png" @click="_goPage('goods_detail', {id:5766})"></image>
				</div>
			</div>
		</div>
		<div class="brand" id="brand">
			<swiper :class="searchBarFixed ? 'isFixed' :''">
				<swiper-item class="barnd_item">
					<view style="display: flex;" @change="change">
						<view class="singer" @click="_goGoods(1)">
							<image src="http://picture.ddxm661.com/a1fa920200618152754971.gif"></image>
							<p style="font-size: 24rpx;" :class="flag ==1?'action':''">品质大牌</p>
						</view>
						<view @click="_goGoods(2)">
							<image src="http://picture.ddxm661.com/9f732202006181528071028.png"></image>
							<p style="font-size: 24rpx;" :class="flag ==2?'action':''" :style="{color: flag === 2 ? 'red' : '#000'}">花王</p>
						</view>
						<view @click="_goGoods(3)">
							<image src="http://picture.ddxm661.com/9374b202006181528245135.png"></image>
							<p style="font-size: 24rpx;" :class="flag ==3?'action':''">爱他美</p>
						</view>
						<view @click="_goGoods(4)">
							<image src="http://picture.ddxm661.com/cb1ed20200618152833832.png"></image>
							<p style="font-size: 24rpx;" :class="flag ==4?'action':''">飞鹤</p>
						</view>
						<view @click="_goGoods(5)">
							<image src="http://picture.ddxm661.com/ed872202006181528435510.png"></image>
							<p style="font-size: 24rpx;" :class="flag ==5?'action':''">尤妮佳</p>
						</view>
					</view>
				</swiper-item>
				<swiper-item class="barnd_item">
					<view style="display: flex;">
						<view @click="_goGoods(6)">
							<image src="http://picture.ddxm661.com/fb482202006181551587517.png"></image>
							<p style="font-size: 24rpx;" :class="flag ==6?'action':''">A2</p>
						</view>
						<view @click="_goGoods(7)">
							<image src="http://picture.ddxm661.com/63ab9202006181552052462.png"></image>
							<p style="font-size: 24rpx; " :class="flag ==7?'action':''">大王</p>
						</view>
						<view @click="_goGoods(8)">
							<image src="http://picture.ddxm661.com/2366a20200618155212584.png"></image>
							<p style="font-size: 24rpx;" :class="flag ==8?'action':''">帮宝适</p>
						</view>
						<view @click="_goGoods(9)">
							<image src="http://picture.ddxm661.com/7bcc8202006181552192944.png"></image>
							<p style="font-size: 24rpx; " :class="flag ==9?'action':''">美赞臣</p>
						</view>
						<view @click="_goGoods(10)">
							<image src="http://picture.ddxm661.com/57307202006181552273289.png"></image>
							<p style="font-size: 24rpx; " :class="flag ==10?'action':''">美素佳儿</p>
						</view>
					</view>
				</swiper-item>
				<swiper-item class="barnd_item">
					<view style="display: flex;">
						<view @click="_goGoods(11)">
							<image src="http://picture.ddxm661.com/fc14a202006181554116080.png"></image>
							<p style="font-size: 24rpx; " :class="flag ==11?'action':''">露安适</p>
						</view>
						<view @click="_goGoods(12)">
							<image src="http://picture.ddxm661.com/03a712020061815541893.png"></image>
							<p style="font-size: 24rpx;" :class="flag ==12?'action':''">伊利</p>
						</view>
						<view @click="_goGoods(13)">
							<image src="http://picture.ddxm661.com/3d7e1202006181554268452.png"></image>
							<p style="font-size: 24rpx; " :class="flag ==13?'action':''">澳优</p>
						</view>
						<view @click="_goGoods(14)">
							<image src="http://picture.ddxm661.com/7317620200618155433370.png"></image>
							<p style="font-size: 24rpx; " :class="flag ==14?'action':''">雅培</p>
						</view>
						<view @click="_goGoods(15)">
							<image src="http://picture.ddxm661.com/a0cbe202006181554423928.png"></image>
							<p style="font-size: 24rpx; " :class="flag ==15?'action':''">君乐宝</p>
						</view>
					</view>
				</swiper-item>
				<swiper-item class="barnd_item">
					<view style="display: flex;">
						<view @click="_goGoods(16)">
							<image src="http://picture.ddxm661.com/208ac202006181555463460.png"></image>
							<p style="font-size: 24rpx; " :class="flag ==16?'action':''">佳贝艾特</p>
						</view>
						<view @click="_goGoods(17)">
							<image src="http://picture.ddxm661.com/b66fb202006181555583753.png"></image>
							<p style="font-size: 24rpx; " :class="flag ==17?'action':''">惠氏</p>
						</view>
						<view @click="_goGoods(18)">
							<image src="http://picture.ddxm661.com/734c7202006181556053390.png"></image>
							<p style="font-size: 24rpx; " :class="flag ==18?'action':''">澳洲贝拉米</p>
						</view>
						<view @click="_goGoods(19)">
							<image src="http://picture.ddxm661.com/43722202006181556124208.png"></image>
							<p style="font-size: 24rpx;" :class="flag ==19?'action':''">好奇</p>
						</view>
						<view @click="_goGoods(20)">
							<image src="http://picture.ddxm661.com/97437202006181556199271.png"></image>
							<p style="font-size: 24rpx; " :class="flag ==20?'action':''">诺优能</p>
						</view>
					</view>
				</swiper-item>
				<swiper-item class="barnd_item1" style="padding: 20rpx;background: #FFFFFF;">
					<view style="display: flex  justify-content: left;">
						<view @click="_goGoods(21)">
							<image src="http://picture.ddxm661.com/87714202006181557041249.png" style="width:72rpx ;height: 72rpx;margin-left: 6rpx;"></image>
							<p style="font-size: 24rpx;  margin-left: 8rpx;" :class="flag ==21?'action':''">羊滋滋</p>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</div>
		<div class="goods-list" id="t1" :style="{'padding-top': searchBarFixed ? '88px' : '0'}">
			<div class="goods-title-box" style="text-align: center;">
				<image src="http://picture.ddxm661.com/b1b2a202006181558367852.png" style="width: 358rpx; height: 40rpx; margin: 40rpx 0 20rpx 0;"></image>
			</div>
			<div class="goods-box-items">
				<image src="http://picture.ddxm661.com/d8af0202006181559519792.png" :lazy-load="true" class="S_img" @click="goSearch('爱他美')"></image>
				<image src="http://picture.ddxm661.com/02730202006181559514409.png" :lazy-load="true" class="S_img" @click="goSearch('飞鹤')"></image>
				<image src="http://picture.ddxm661.com/f9cf9202006181559515642.png" :lazy-load="true" class="S_img" @click="goSearch('尤妮佳')"></image>
				<image src="http://picture.ddxm661.com/12bcf202006181601377946.png" :lazy-load="true" class="S_img" @click="goSearch('大王')"></image>
				<image src="http://picture.ddxm661.com/04e36202006181601372694.png" :lazy-load="true" class="S_img" @click="goSearch('帮宝适')"></image>
				<image src="http://picture.ddxm661.com/5e316202006181601379599.png" :lazy-load="true" class="S_img" @click="goSearch('君乐宝')"></image>
				<image src="http://picture.ddxm661.com/c6725202006181601379610.png" :lazy-load="true" class="S_img" @click="goSearch('美素佳儿')"></image>
				<image src="http://picture.ddxm661.com/fc90f202006181601375488.png" :lazy-load="true" class="S_img" @click="goSearch('至初')"></image>
				<image src="http://picture.ddxm661.com/0ef4b202006181603526921.png" :lazy-load="true" class="S_img" @click="goSearch('贝拉米')"></image>
				<image src="http://picture.ddxm661.com/a1b3b202006181603525525.png" :lazy-load="true" class="S_img" @click="goSearch('诺优能')"></image>
				<image src="http://picture.ddxm661.com/bc69e202006181603523148.png" :lazy-load="true" class="S_img" @click="goSearch('美赞臣')"></image>
				<image src="http://picture.ddxm661.com/c6724202006181603522725.png" :lazy-load="true" class="S_img" @click="goSearch('伊利')"></image>
			</div>
		</div>
		<div style="text-align: center; margin-top:20rpx ;">
			<image src="http://picture.ddxm661.com/1e332202006181605326017.png" style="width: 720rpx; height: 220rpx;"></image>
		</div>
		<div class="goods-list">
			<div class="goods-box-items1">
				<image src="http://picture.ddxm661.com/25bea202006181607295230.png" :lazy-load="true" class="S_img" @click="goSearch('A2')"></image>
				<image src="http://picture.ddxm661.com/83a85202006181607293738.png" :lazy-load="true" class="S_img" @click="goSearch('可瑞康')"></image>
				<image src="http://picture.ddxm661.com/c3b89202006181607295278.png" :lazy-load="true" class="S_img" @click="goSearch('露安适')"></image>
				<image src="http://picture.ddxm661.com/f2ad820200618160729475.png" :lazy-load="true" class="S_img"  @click="goSearch('澳优')"></image>
				<image src="http://picture.ddxm661.com/1f4ea202006181608467939.png" :lazy-load="true" class="S_img" @click="goSearch('雅培')"></image>
				<image src="http://picture.ddxm661.com/d9530202006181608463524.png" :lazy-load="true" class="S_img" @click="goSearch('好奇')"></image>
				<image src="http://picture.ddxm661.com/0042f202006181608469601.png" :lazy-load="true" class="S_img" @click="goSearch('海普诺凯')"></image>
				<image src="http://picture.ddxm661.com/f4869202006181608462111.png" :lazy-load="true" class="S_img" @click="goSearch('佳贝艾特')"></image>
				<image src="http://picture.ddxm661.com/4061a202006181608467703.png" :lazy-load="true" class="S_img" @click="goSearch('惠氏')"></image>
				<image src="http://picture.ddxm661.com/c0d47202006181610175067.png" :lazy-load="true" class="S_img" @click="goSearch('羊滋滋')"></image>
				<image src="http://picture.ddxm661.com/ad50f202006181610173684.png" :lazy-load="true" class="S_img" @click="goSearch('合生元')"></image>
				<image src="http://picture.ddxm661.com/2c541202006181610174781.png" :lazy-load="true" class="S_img" @click="goSearch('Arla')"></image>
			</div>
		</div>

		<div style="text-align: center; margin-top:20rpx ;" id="t2">
			<image src="http://picture.ddxm661.com/4cc6c202006181611566971.png" style="width: 385rpx; height: 40rpx; margin: 20rpx 0;"></image>
			<image src="http://picture.ddxm661.com/5e54d202006181618215974.png" style="width: 702rpx; height: 354rpx;" @click="goSearch('花王')"></image>
		</div>
		<!-- 花生系列 -->
		<!-- 爱他美 -->
		<div>
			<div class="goods-list" id="t3">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/1bc52202006181619212211.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('爱他美')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/ec151202006181620353276.png" @click="_goPage('goods_detail', {id:2078})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/22bcf202006181620353586.png" @click="_goPage('goods_detail', {id:2081})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/dd6f7202006181620357810.png" @click="_goPage('goods_detail', {id:2083})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/e23ff202006181620357475.png" @click="_goPage('goods_detail', {id:2090})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/6cc8c202006181621465122.png" @click="_goPage('goods_detail', {id:2093})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/cfcc4202006181621461724.png" @click="_goPage('goods_detail', {id:2094})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 飞鹤 -->
			<div class="goods-list" id="t4">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/91357202006181623243697.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('飞鹤')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/8f1a5202006181623341184.png" @click="_goPage('goods_detail', {id:2084})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/be13220200618162334652.png" @click="_goPage('goods_detail', {id:2086})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/33212202006181624356106.png" @click="_goPage('goods_detail', {id:2088})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/4bc26202006181624353243.png" @click="_goPage('goods_detail', {id:2092})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/151dc202006181624358090.png" @click="_goPage('goods_detail', {id:2095})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/7d0df202006181624353033.png" @click="_goPage('goods_detail', {id:2096})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 尤妮佳 -->
			<div class="goods-list" id="t5">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/bd3bf202006181627472887.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('尤妮佳')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/6ad0e202006181628074061.png" @click="_goPage('goods_detail', {id:2589})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/4b933202006181628071274.png" @click="_goPage('goods_detail', {id:2591})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/89aba202006181628071109.png" @click="_goPage('goods_detail', {id:2594})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/2c826202006181628072268.png" @click="_goPage('goods_detail', {id:2596})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/4fb11202006181629103740.png" @click="_goPage('goods_detail', {id:2598})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/9a1e4202006181629101438.png" @click="_goPage('goods_detail', {id:2600})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- A2 -->
			<div class="goods-list" id="t6">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/a25da202006181630198935.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('A2')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/a15d4202006181630285256.png" @click="_goPage('goods_detail', {id:2121})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/8558a202006181630288987.png" @click="_goPage('goods_detail', {id:2124})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/759ef202006181630281045.png" @click="_goPage('goods_detail', {id:2126})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/bbfb1202006181630282565.png" @click="_goPage('goods_detail', {id:2319})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/1855e202006181631553005.png" @click="_goPage('goods_detail', {id:2320})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/0a6d6202006181631555660.png" @click="_goPage('goods_detail', {id:2321})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 大王 -->
			<div class="goods-list" id="t7">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/6211c202006181631559584.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('大王')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/77500202006181634058160.png" @click="_goPage('goods_detail', {id:2582})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/01e16202006181634057840.png" @click="_goPage('goods_detail', {id:2583})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/48953202006191443524468.png" @click="_goPage('goods_detail', {id:2584})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/deb62202006181634056011.png" @click="_goPage('goods_detail', {id:2586})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/7ba5b202006181634059604.png" @click="_goPage('goods_detail', {id:2587})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/804d7202006181635307262.png" @click="_goPage('goods_detail', {id:2588})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 帮宝适 -->
			<div class="goods-list" id="t8">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/d5671202006181635303766.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('帮宝适')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/18f2c202006181635302408.png" @click="_goPage('goods_detail', {id:2552})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/54471202006181635302175.png" @click="_goPage('goods_detail', {id:2557})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/a8acb202006181635303923.png" @click="_goPage('goods_detail', {id:2562})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/886d1202006181637145999.png" @click="_goPage('goods_detail', {id:2577})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/96afe202006181637146863.png" @click="_goPage('goods_detail', {id:2565})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/d515e202006181638321291.png" @click="_goPage('goods_detail', {id:2569})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 美赞臣 -->
			<div class="goods-list" id="t9">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/9ed43202006181637148300.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('美赞臣')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/39dff202006181640424096.png" @click="_goPage('goods_detail', {id:2006})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/cbd12202006181640421101.png" @click="_goPage('goods_detail', {id:2013})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/1e4db20200618164042811.png" @click="_goPage('goods_detail', {id:2021})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/bd11b202006181640423048.png" @click="_goPage('goods_detail', {id:2334})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/ee8ea202006181640422686.png" @click="_goPage('goods_detail', {id:2335})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/a3f10202006181641469214.png" @click="_goPage('goods_detail', {id:2336})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 美素佳儿 -->
			<div class="goods-list" id="t10">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/7a22820200618164315708.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('美素佳儿')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/ec693202006181643163025.png" @click="_goPage('goods_detail', {id:2097})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/5ffac20200618164316919.png" @click="_goPage('goods_detail', {id:2103})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/6040e202006181643158134.png" @click="_goPage('goods_detail', {id:2106})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/a0e80202006181643161803.png" @click="_goPage('goods_detail', {id:2107})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/36183202006181643293372.png" @click="_goPage('goods_detail', {id:2116})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/1a47c202006181643291757.png" @click="_goPage('goods_detail', {id:2117})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!--lelch  -->
			<div class="goods-list" id="t11">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/baf49202006181645244425.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('露安适')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/bab2d202006191417251271.png" @click="_goPage('goods_detail', {id:6144})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/82bcf202006181645242021.png" @click="_goPage('goods_detail', {id:6145})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/c358b202006181647187437.png" @click="_goPage('goods_detail', {id:6146})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/bbf0e202006181648054288.png" @click="_goPage('goods_detail', {id:6147})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/d2a33202006181648222601.png" @click="_goPage('goods_detail', {id:6148})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/99ef520200618164831736.png" @click="_goPage('goods_detail', {id:6149})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 伊利 -->
			<div class="goods-list" id="t12">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/b7b4a202006181649461406.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('伊利')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/3629e202006181649468572.png" @click="_goPage('goods_detail', {id:2003})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/eed8520200618164946279.png" @click="_goPage('goods_detail', {id:2004})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/fa3e7202006181649466292.png" @click="_goPage('goods_detail', {id:2008})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/2df5f202006181649464260.png" @click="_goPage('goods_detail', {id:2009})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/bbcc7202006181650096930.png" @click="_goPage('goods_detail', {id:2022})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/99cf9202006181650093205.png" @click="_goPage('goods_detail', {id:2024})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 澳优 -->
			<div class="goods-list" id="t13">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/a2746202006181659523848.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('澳优')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/eef04202006181659524228.png" @click="_goPage('goods_detail', {id:2033})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/e7980202006181659523903.png" @click="_goPage('goods_detail', {id:2040})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/c3faa202006181659521053.png" @click="_goPage('goods_detail', {id:5969})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/054eb202006181659527130.png" @click="_goPage('goods_detail', {id:5967})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/326f1202006181700012784.png" @click="_goPage('goods_detail', {id:5970})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/dd3fa202006181700015742.png" @click="_goPage('goods_detail', {id:5971})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 雅培 -->
			<div class="goods-list" id="t14">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/ef572202006181701373990.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('雅培')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/d31ae202006181701374379.png" @click="_goPage('goods_detail', {id:2014})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/a8193202006181701376598.png" @click="_goPage('goods_detail', {id:2020})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/9f8c8202006181701374172.png" @click="_goPage('goods_detail', {id:2038})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/ed7ca202006181701374682.png" @click="_goPage('goods_detail', {id:2039})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/edfca202006181701502085.png" @click="_goPage('goods_detail', {id:2060})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/b1aa620200618170150460.png" @click="_goPage('goods_detail', {id:2068})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 君乐宝 -->
			<div class="goods-list" id="t15">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/7fbdd202006181703339215.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('君乐宝')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/8a54c202006181703335930.png" @click="_goPage('goods_detail', {id:2031})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/06ec7202006181703339683.png" @click="_goPage('goods_detail', {id:2041})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/78dc8202006181703336702.png" @click="_goPage('goods_detail', {id:2046})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/c468f202006181703335946.png" @click="_goPage('goods_detail', {id:2054})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/c719b202006181703422229.png" @click="_goPage('goods_detail', {id:2061})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/cabe1202006181703427013.png" @click="_goPage('goods_detail', {id:2066})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 佳贝艾特 -->
			<div class="goods-list" id="t16">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/26d59202006181705433511.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('佳贝艾特')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/10c41202006181705431263.png" @click="_goPage('goods_detail', {id:5102})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/04e9a202006181705433438.png" @click="_goPage('goods_detail', {id:5949})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/7d5c9202006181705436907.png" @click="_goPage('goods_detail', {id:5951})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/cb734202006181705437210.png" @click="_goPage('goods_detail', {id:5955})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/89421202006181705565685.png" @click="_goPage('goods_detail', {id:5957})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/0f34e202006181705569829.png" @click="_goPage('goods_detail', {id:5958})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 惠氏 -->
			<div class="goods-list" id="t17">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/9c9d0202006181707383866.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('惠氏')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/51231202006181707382272.png" @click="_goPage('goods_detail', {id:2058})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/0f0f8202006181707389432.png" @click="_goPage('goods_detail', {id:2070})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/3083c202006181707382627.png" @click="_goPage('goods_detail', {id:2071})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/18bed202006181707381433.png" @click="_goPage('goods_detail', {id:2074})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/ae0b4202006181707475666.png" @click="_goPage('goods_detail', {id:2080})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/0b280202006181707474488.png" @click="_goPage('goods_detail', {id:2580})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 贝拉米 -->
			<div class="goods-list-item1" id="t18">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/2e317202006181709294298.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('贝拉米')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/0a9e7202006181709297460.png" @click="_goPage('goods_detail', {id:2330})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/abd2a202006181709292152.png" @click="_goPage('goods_detail', {id:2331})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/418b5202006181709298134.png" @click="_goPage('goods_detail', {id:2332})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 好奇 -->
			<div class="goods-list-item1" id="t19">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/34a8e202006181711261138.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('好奇')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/31a4e202006181711266424.png" @click="_goPage('goods_detail', {id:2644})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/99e48202006181711263568.png" @click="_goPage('goods_detail', {id:2645})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/0570720200618171126406.png" @click="_goPage('goods_detail', {id:2647})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<!-- 诺优能 -->
			<div class="goods-list-item1" id="t20">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/4cd73202006181712552237.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('诺优能')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/884bf202006181712555471.png" @click="_goPage('goods_detail', {id:2134})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/817b5202006181712552590.png" @click="_goPage('goods_detail', {id:2136})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/1f444202006181712558949.png" @click="_goPage('goods_detail', {id:2138})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
			<div class="goods-list-item1" id="t21">
				<div style="text-align: center;">
					<image src="http://picture.ddxm661.com/adc70202006181713493374.png" style="width: 710rpx; height: 115rpx;" @click="goSearch('羊滋滋')"></image>
				</div>
				<div class="goods-box-items2">
					<image src="http://picture.ddxm661.com/b929b202006181713497947.png" @click="_goPage('goods_detail', {id:2128})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/8c637202006181713494062.png" @click="_goPage('goods_detail', {id:2129})"
					 :lazy-load="true" class="S_img"></image>
					<image src="http://picture.ddxm661.com/318c020200618171349599.png" @click="_goPage('goods_detail', {id:2130})"
					 :lazy-load="true" class="S_img"></image>
				</div>
			</div>
		</div>
		<div class="go-top" @click="goTop">
			<p>返回顶部</p>
		</div>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				tabIndex: 0,
				scroll: '',
				searchBarFixed: false,
				flag: 1,
                scrollVal: 0,
                scrollIndex: 1
			}
		},
		methods: {
			_goPage(url, query = {}) {
				this.$openPage({
					name: url,
					query
				})
			},

			// 返回按钮
			_goBack() {
				// if (getCurrentPages().length === 1) {
				// 	this._goPage('home')
				// } else {
				// 	uni.navigateBack()
				// }
				 this.$router.replace('/')
			},
			//title跳转
			goSearch(val){
			    console.log(val)
			    this._goPage('goods_search_redirect',{title:val})
			},
			// 满减
			_receive(id) {
				this.$minApi.collectCoupon({
					id
				}).then(res => {
					uni.showToast({
						title: res.msg,
						duration: 1500,
						mask: false,
						icon: 'none'
					})
					setTimeout(() => {
						if (!this.$store.state.token) {
							uni.switchTab({
								url: "/pages/tabs/mine"
							})
						}
					}, 500)
				})
			},
			// 回到顶部
			goTop() {

				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
				this.flag = 1
			},
			Jtop(val) {
			    console.log(this.searchBarFixed, 'this.searchBarFixed')
				uni.createSelectorQuery().select(".box").boundingClientRect(data => {
					uni.createSelectorQuery().select("#t" + val).boundingClientRect((res) => {
						uni.pageScrollTo({
							duration: 300,
							scrollTop: (this.searchBarFixed && val !== 1) ? res.top - data.top - 88 : res.top - data.top
						})
					}).exec()
				}).exec()
			},
			// //锚点跳转
			_goGoods(val) {
				this.Jtop(val)
				this.flag = val
			},
			menu() {
				this.scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				this.searchBarFixed = this.scroll >= 1212;

                for (let i = 0; i < 21; i++) {
                    let node = document.getElementById("t" + (i+1))
                    const offset = node.getBoundingClientRect();
                    const offsetTop = offset.top;
                    const offsetBottom = offset.bottom;
                    const offsetHeight = offset.height;
                    // 进入可视区域
                    if (offsetTop <= window.innerHeight && offsetBottom >= 0) {
                        // console.log(node.clientTop, this.scroll, node.offsetTop - 88, '进入可视区域', i)
                        if (this.scroll >= node.offsetTop - 105) {
                            this.flag = i+1
                        }
                    }
                }
			}
		},
		_clickBanner(key) {
			console.log(this.swiperList[key])
			// this.swiperList[key].type   类型：1不跳转，2:跳转外部页面，3跳转到内部界面'
			// this.swiperList[key].url 地址
			// this.swiperList[key].value 参数 {"t":"121","mumber":"2222"}
			switch (this.swiperList[key].type) {
				case 1:
					break
				case 2:
					this._goPage('web_view', {
						url: this.swiperList[key].url
					})
					break
				case 3:
					this._goPage(this.swiperList[key].url, JSON.parse(this.swiperList[key].value))
					break
			}
		},
		destroyed() {
			window.removeEventListener('scroll', this.menu)
		},
		mounted() {
			window.addEventListener('scroll', this.menu)
		},
		async onLoad() {
			await this.wxConfig();
			let url = `https://www.ddxm661.com/h5/#/pages/activity20200611/index`
			if (this.userInfo.id) {
				url += `?user_id=${this.userInfo.id}`
			}
			const param1 = {
					title: '捣蛋熊商城-端午节', // 分享标题
					desc: '祝朋友们节日快乐', // 分享描述
					link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: `http://picture.ddxm661.com/22b42202006010907087907.png`, // 分享图标
					success: function() {}
				},
				param2 = {
					title: '捣蛋熊商城-端午节', // 分享标题
					link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: `http://picture.ddxm661.com/22b42202006010907087907.png`, // 分享图标
					success: function() {}
				}
			await this.wxConigShareGoods(param1, param2)
			uni.getSystemInfo({
				success(res) {
					console.log(res.screenHeight) //屏幕高度
				}
			});
		},
		computed: {
			...mapState(['userInfo']),
		},
	}
</script>

<style scoped lang="scss">
	.box {
		background-color: #E65721;
	}

	#my-h5-back {
		position: fixed;
		top: 70rpx;
	}

	page {
		background-color: #DE0063;
	}

	.banner {
		width: 100%;
		display: flex;
		flex-direction: column;

		img {
			width: 100%;
		}
	}

	.hot-box {
		width: 100%;

		.hot-box-items {
			display: flex;
			justify-content: space-around;
			margin-bottom: 30rpx;

			.M_img {
				width: 350rpx;
				height: 220rpx;
			}
		}
	}

	.assign {
		position: relative;

		.assignBg {
			text-align: center;

			>image {
				width: 700rpx;
				height: 1200rpx;
			}
		}

		.bigBox {
			position: absolute;
			top: 15%;
			left: 8%;

			.assignBox {
				display: flex;
				justify-content: space-around;
				margin-bottom: 20rpx;
			}

			image {
				width: 300rpx;
				height: 453rpx;
				margin-right: 40rpx;
			}
		}

	}

	.brand {
		.barnd_item {
			padding: 20rpx;
			background: #FFFFFF;
			box-sizing: border-box;

			>view {
				display: flex;
				justify-content: space-around;
				text-align: center;
			}

			image {
				width: 72rpx;
				height: 72rpx;
				margin-left: 6rpx;
			}
		}
	}

	.brand {
		.isFixed {
			width: 100%;
			height: 160rpx;
			position: fixed;
			top: 0;
			z-index: 10;
		}
	}

	swiper {
		height: 140rpx;
	}

	.goods-list {
		width: 100%;
		min-height: 920rpx;
		// background-color: blue;
	}

	.goods-list-item {
		width: 100%;
		min-height: 560rpx;
	}

	.goods-list-item1 {
		width: 100%;
		min-height: 540rpx;
	}

	.goods-box-items {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 0 15rpx;
		box-sizing: border-box;

		.S_img {
			width: 226rpx;
			height: 401rpx;
			margin-top: 10rpx;
		}
	}

	.goods-box-items1 {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 0 15rpx;
		box-sizing: border-box;

		.S_img {
			width: 226rpx;
			height: 297rpx;
			margin-top: 10rpx;
		}
	}

	.goods-box-items2 {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 0 15rpx;
		box-sizing: border-box;

		.S_img {
			width: 230rpx;
			height: 375rpx;
			margin-bottom: 8rpx;
		}
	}

	.go-top {
		width: 100%;
		text-align: center;
		padding-bottom: 20rpx;
		box-sizing: border-box;

		p {
			width: 300rpx;
			height: 60rpx;
			background: #ffffff;
			color: #999999;
			margin: auto;
			border-radius: 20rpx;
			font-size: 34rpx;
			line-height: 60rpx;
			box-sizing: border-box;
		}
	}

	.action {
		color: red;
		font-weight: bold;
	}
</style>
