<template>
    <div class="box">
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <div class="banner">
           <img src="http://picture.ddxm661.com/54f4c202005291653431204.png" alt="">
        </div>
		<div class="hot-box">
			<div class="title-box" style="text-align: center; padding-top: 10rpx; margin-bottom: 20rpx;">
				<image src="http://picture.ddxm661.com/d1bf7202005291659512884.png" style="width: 420rpx; height: 70rpx;"></image>
			</div>
			<div class="hot-box-items">
				<image src="http://picture.ddxm661.com/4fcbe202005291710466623.png" @click="_goPage('spike_detail', {seckill_id: 2639,item_id: 5972})" :lazy-load="true" class="M_img"></image>
			</div>
			<div class="hot-box-items">
				<image src="http://picture.ddxm661.com/79fc920200529171810530.png" @click="_goPage('spike_detail', {seckill_id: 2640,item_id: 6061})" :lazy-load="true" class="M_img"></image>
			</div>
			<div class="hot-box-items">
				<image src="http://picture.ddxm661.com/45588202005291718324857.png" @click="_goPage('spike_detail', {seckill_id: 2641,item_id: 6001})" :lazy-load="true" class="M_img"></image>
			</div>
		</div>
        <div class="goods-list">
			<div class="goods-title-box" style="text-align: center; padding-top: 20rpx; margin-bottom: 10rpx;">
				<image src="http://picture.ddxm661.com/c7bde202005300907175189.png" style="width: 420rpx; height: 70rpx;"></image>
			</div>
            <div class="goods-box-items">
               <image src="http://picture.ddxm661.com/5b32b2020053009080530.png" @click="_goPage('spike_detail', {seckill_id: 2642,item_id: 5964})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/834a5202005300908058243.png" @click="_goPage('spike_detail', {seckill_id: 2643,item_id: 5965})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/97dc5202005300920083902.png" @click="_goPage('spike_detail', {seckill_id: 2644,item_id: 5966})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/50c7f202005300920089784.png" @click="_goPage('spike_detail', {seckill_id: 2645,item_id: 5974})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/75cc8202005300920088236.png" @click="_goPage('spike_detail', {seckill_id: 2646,item_id: 5973})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/b0242202005300920082971.png" @click="_goPage('spike_detail', {seckill_id: 2647,item_id: 5975})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/3614b202005300922048903.png" @click="_goPage('spike_detail', {seckill_id: 2648,item_id: 5976})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/d3b9a20200530092204999.png" @click="_goPage('spike_detail', {seckill_id: 2649,item_id: 5977})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/285a7202005300922049111.png" @click="_goPage('spike_detail', {seckill_id: 2650,item_id: 5979})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/1f58c202005300922045615.png" @click="_goPage('spike_detail', {seckill_id: 2651,item_id: 5962})" :lazy-load="true" class="S_img"></image>
            </div>
        </div>
		<div class="goods-list">
			<div class="goods-title-box" style="text-align: center; padding-top: 30rpx; margin-bottom: 10rpx;">
				<image src="http://picture.ddxm661.com/3bce9202005300926049878.png" style="width: 420rpx; height: 70rpx;"></image>
			</div>
		    <div class="goods-box-items">
		       <image src="http://picture.ddxm661.com/dfa07202005300926452449.png" @click="_goPage('spike_detail', {seckill_id: 2652,item_id: 6058})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/8683e202005300926597381.png" @click="_goPage('spike_detail', {seckill_id: 2653,item_id: 6059})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/ec67220200530092712439.png" @click="_goPage('spike_detail', {seckill_id: 2654,item_id: 6060})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/1309a202005300927125747.png" @click="_goPage('spike_detail', {seckill_id: 2655,item_id: 4222})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/a8f5920200530092811161.png" @click="_goPage('spike_detail', {seckill_id: 2656,item_id: 5986})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/9ab65202005300928261632.png" @click="_goPage('spike_detail', {seckill_id: 2657,item_id: 5978})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/5daf6202005300928337523.png" @click="_goPage('spike_detail', {seckill_id: 2658,item_id: 5981})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/70e9e202005300928412174.png" @click="_goPage('spike_detail', {seckill_id: 2659,item_id: 5980})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/3e2a1202005300941542433.png" @click="_goPage('spike_detail', {seckill_id: 2660,item_id: 5982})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/7c6e5202005300941541565.png" @click="_goPage('spike_detail', {seckill_id: 2661,item_id: 5983})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/d8f38202005300931271848.png" @click="_goPage('spike_detail', {seckill_id: 2662,item_id: 5985})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/59951202005300931359746.png" @click="_goPage('spike_detail', {seckill_id: 2663,item_id: 5987})" :lazy-load="true" class="S_img"></image>
				<image src="http://picture.ddxm661.com/535a8202005300931494637.png" @click="_goPage('spike_detail', {seckill_id: 2664,item_id: 5988})" :lazy-load="true" class="S_img"></image>
				<image src="http://picture.ddxm661.com/a903d202005300931598929.png" @click="_goPage('spike_detail', {seckill_id: 2665,item_id: 5990})" :lazy-load="true" class="S_img"></image>
				<image src="http://picture.ddxm661.com/9264f202005300933346172.png" @click="_goPage('spike_detail', {seckill_id: 2666,item_id: 5991})" :lazy-load="true" class="S_img"></image>
				<image src="http://picture.ddxm661.com/9032f202005300933412614.png" @click="_goPage('spike_detail', {seckill_id: 2667,item_id: 5992})" :lazy-load="true" class="S_img"></image>
				<image src="http://picture.ddxm661.com/f87ce202005300933504127.png" @click="_goPage('spike_detail', {seckill_id: 2668,item_id: 5993})" :lazy-load="true" class="S_img"></image>
				<image src="http://picture.ddxm661.com/455f820200530093357740.png" @click="_goPage('spike_detail', {seckill_id: 2669,item_id: 5994})" :lazy-load="true" class="S_img"></image>
				<image src="http://picture.ddxm661.com/f46c8202005300935171948.png" @click="_goPage('spike_detail', {seckill_id: 2670,item_id: 5995})" :lazy-load="true" class="S_img"></image>
				<image src="http://picture.ddxm661.com/6513b202005300935294196.png" @click="_goPage('spike_detail', {seckill_id: 2671,item_id: 5996})" :lazy-load="true" class="S_img"></image>
				<image src="http://picture.ddxm661.com/86b1820200530093540403.png" @click="_goPage('spike_detail', {seckill_id: 2672,item_id: 5997})" :lazy-load="true" class="S_img"></image>
				<image src="http://picture.ddxm661.com/7a7c3202005300935491654.png" @click="_goPage('spike_detail', {seckill_id: 2673,item_id: 5998})" :lazy-load="true" class="S_img"></image>
				<image src="http://picture.ddxm661.com/0bd92202005300936029116.png" @click="_goPage('spike_detail', {seckill_id: 2674,item_id: 5999})" :lazy-load="true" class="S_img"></image>
				<image src="http://picture.ddxm661.com/549b5202005300937512239.png" @click="_goPage('spike_detail', {seckill_id: 2675,item_id: 6000})" :lazy-load="true" class="S_img"></image>
				<image src="http://picture.ddxm661.com/74dcf202005300937581806.png" @click="_goPage('spike_detail', {seckill_id: 2676,item_id: 6002})" :lazy-load="true" class="S_img"></image>
				<image src="http://picture.ddxm661.com/bf656202005300938068335.png" @click="_goPage('spike_detail', {seckill_id: 2652,item_id: 6058})" :lazy-load="true" class="S_img"></image>
			</div>
		</div>
 
       <div class="go-top" @click="goTop">
           <image src="http://picture.ddxm661.com/5b8c6202005300945109822.png" class="top_img"></image>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                tabIndex: 0,
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
                if (getCurrentPages().length === 1) {
                    this._goPage('home')
                } else {
                    uni.navigateBack()
                }
            },

            // 回到顶部
            goTop(){
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 200
                });
            },
        },
        async onLoad(){
            await this.wxConfig();
            let url = `https://www.ddxm661.com/h5/#/pages/activity20200601/index`
            if (this.userInfo.id) {
                url += `?user_id=${this.userInfo.id}`
            }
            const param1 = {
                    title: '捣蛋熊商城-六一儿童节', // 分享标题
                    desc: '祝小朋友们节日快乐', // 分享描述
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: `http://picture.ddxm661.com/4fd28202005201355028061.png`, // 分享图标
                    success: function() {}
                },
                param2 = {
                    title: '捣蛋熊商城-六一儿童节', // 分享标题
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: `http://picture.ddxm661.com/4fd28202005201355028061.png`, // 分享图标
                    success: function() {}
                }
            await this.wxConigShareGoods(param1, param2)
        },
        computed: {
            ...mapState(['userInfo']),
        },
    }
</script>

<style scoped lang="scss">
	.box{
		background-image:url(../../static/images/acitity618/bg.png);
	}
    #my-h5-back{
        position: fixed;
        top:70rpx;
    }
    page{
        background-color: #DE0063;
    }
    .banner{
        width: 100%;
        display: flex;
        flex-direction: column;
        img {
            width: 100%;
        }
    }
	.hot-box{
		width: 100%;
		min-height: 1200rpx;
		.hot-box-items{
			display: flex;
			justify-content: space-around;
			margin-bottom: 30rpx;
			.M_img{
				width: 95%;
				height: 360rpx;
			}
		}
	}
	.goods-list{
		width: 100%;
		min-height: 1600rpx;
		// background-color: blue;
	}
	.goods-box-items{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 0 15rpx;
		.S_img{
			width: 350rpx;
			margin-top: 10rpx;
		}
	}

    .go-top{
		width: 100%;
		text-align: center;
		padding:20rpx 0;
		.top_img{
			width: 94%;
			height: 80rpx;
		}
    }
</style>
