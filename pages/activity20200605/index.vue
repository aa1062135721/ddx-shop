<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <div class="banner">
           <image src="http://picture.ddxm661.com/f33bf202006021608311447.png"></image>
			<div class="preferential_title">
				 <image src="http://picture.ddxm661.com/8843a202006031009351360.png"></image>
			</div>
			<div class="preferential">
				<image src="http://picture.ddxm661.com/71a36202006031009463494.png"  @click="getCoupon(21)"></image>
				<image src="http://picture.ddxm661.com/4377420200603100946425.png"   @click="getCoupon(22)"></image>
			</div>
		</div>
        <div class="goods-box">
			<div class="goods-box-title">
				<image src="http://picture.ddxm661.com/ab5c920200603103840770.png"></image>
			</div>
            <div class="goods-box-items">
                <image src="http://picture.ddxm661.com/01405202006031044238883.png" @click="_goPage('goods_detail', {id: 6312})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/f86c4202006031044323214.png" @click="_goPage('goods_detail', {id: 6314})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/68704202006031044416761.png" @click="_goPage('goods_detail', {id: 6319})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/b9ee1202006031046086257.png" @click="_goPage('goods_detail', {id: 6322})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/7422a202006031046178576.png" @click="_goPage('goods_detail', {id: 6324})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/f1dea202006031046318543.png" @click="_goPage('goods_detail', {id: 6316})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/44519202006031047366726.png" @click="_goPage('goods_detail', {id: 6325})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/25d16202006031047457414.png" @click="_goPage('goods_detail', {id: 6328})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/ee78c202006031047511790.png" @click="_goPage('goods_detail', {id: 6330})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/1c58d202006031048575405.png" @click="_goPage('goods_detail', {id: 6331})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/ee1b9202006031049071868.png" @click="_goPage('goods_detail', {id: 6332})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/7996d202006031049188485.png" @click="_goPage('goods_detail', {id: 6334})" :lazy-load="true" class="img"></image>
				<image src="http://picture.ddxm661.com/c3e11202006031050286805.png" @click="_goPage('goods_detail', {id: 6335})" :lazy-load="true" class="img"></image>
				<image src="http://picture.ddxm661.com/7fa6e202006031050426091.png" @click="_goPage('goods_detail', {id: 6303})" :lazy-load="true" class="img"></image>
				<image src="http://picture.ddxm661.com/7b56220200603112005551.png" @click="_goPage('goods_detail', {id: 6312})" :lazy-load="true" class="img"></image>
            </div>
        </div>
		<div class="goods-box">
			<div class="goods-box-title">
				<image src="http://picture.ddxm661.com/6aaaf202006031052024945.png"></image>
			</div>
		    <div class="goods-box-items">
		        <image src="http://picture.ddxm661.com/6dafa202006031052173645.png" @click="_goPage('goods_detail', {id: 6306})" :lazy-load="true" class="img"></image>
		        <image src="http://picture.ddxm661.com/14c7a20200603105225430.png" @click="_goPage('goods_detail', {id: 6308})" :lazy-load="true" class="img"></image>
		        <image src="http://picture.ddxm661.com/4916a202006031052326505.png" @click="_goPage('goods_detail', {id: 6310})" :lazy-load="true" class="img"></image>
		        <image src="http://picture.ddxm661.com/8b8b720200603105331458.png" @click="_goPage('goods_detail', {id: 6311})" :lazy-load="true" class="img"></image>
		        <image src="http://picture.ddxm661.com/ba7e3202006031053425628.png" @click="_goPage('goods_detail', {id: 6313})" :lazy-load="true" class="img"></image>
		        <image src="http://picture.ddxm661.com/76b5b202006031053492154.png" @click="_goPage('goods_detail', {id: 6315})" :lazy-load="true" class="img"></image>
		        <image src="http://picture.ddxm661.com/90c9c202006031055272032.png" @click="_goPage('goods_detail', {id: 6317})" :lazy-load="true" class="img"></image>
		        <image src="http://picture.ddxm661.com/b3d44202006031055357814.png" @click="_goPage('goods_detail', {id: 6320})" :lazy-load="true" class="img"></image>
		        <image src="http://picture.ddxm661.com/2068a202006031055439873.png" @click="_goPage('goods_detail', {id: 6321})" :lazy-load="true" class="img"></image>
		        <image src="http://picture.ddxm661.com/ced50202006031056334171.png" @click="_goPage('goods_detail', {id: 6323})" :lazy-load="true" class="img"></image>
		        <image src="http://picture.ddxm661.com/5d296202006031056415181.png" @click="_goPage('goods_detail', {id: 6326})" :lazy-load="true" class="img"></image>
		        <image src="http://picture.ddxm661.com/c2438202006031056497467.png" @click="_goPage('goods_detail', {id: 6327})" :lazy-load="true" class="img"></image>
				<image src="http://picture.ddxm661.com/61605202006031057366254.png" @click="_goPage('goods_detail', {id: 6329})" :lazy-load="true" class="img"></image>
				<image src="http://picture.ddxm661.com/4b650202006031057503911.png" @click="_goPage('goods_detail', {id: 6333})" :lazy-load="true" class="img"></image>
				<image src="http://picture.ddxm661.com/a8506202006031058001122.png" @click="_goPage('goods_detail', {id: 5768})" :lazy-load="true" class="img"></image>
				<image src="http://picture.ddxm661.com/096b9202006031058367284.png" @click="_goPage('goods_detail', {id: 5777})" :lazy-load="true" class="img"></image>
				<image src="http://picture.ddxm661.com/ce489202006031058432997.png" @click="_goPage('goods_detail', {id: 5790})" :lazy-load="true" class="img"></image>
				<image src="http://picture.ddxm661.com/d3f2e202006031059296715.png" @click="_goPage('goods_detail', {id: 6306})" :lazy-load="true" class="img"></image>
		    </div>
		</div>
		<div class="go-top" @click="goTop">
			<image src="http://picture.ddxm661.com/dc6dc202006031059364288.png"></image>
		</div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	   
    export default {
        data() {
            return {
                tabIndex: 0,
				id:''
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
			// 领取优惠券
			getCoupon(id) {
			    this.$minApi.collectCoupon({id}).then(res => {
			    uni.showToast({title: res.msg, duration: 1500, mask: false, icon: 'none'})	
				// 判断有无token，如果没有跳到登录页
				setTimeout(()=>{
					if(!this.$store.state.token){
						uni.switchTab({
						    url: '/pages/tabs/mine'
						});
					}
				},500)
			  })
			},
        },
        async onLoad(){
            await this.wxConfig();
            let url = `https://www.ddxm661.com/h5/#/pages/activity20200605/index`
            if (this.userInfo.id) {
                url += `?user_id=${this.userInfo.id}`
            }
            const param1 = {
                    title: '捣蛋熊商城-咱佳宝贝', // 分享标题
                    desc: '祝小朋友们快乐每一天', // 分享描述
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: `http://picture.ddxm661.com/d8ba2202006031002493502.png`, // 分享图标
                    success: function() {}
                },
                param2 = {
                    title: '捣蛋熊商城-咱佳宝贝', // 分享标题
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: `http://picture.ddxm661.com/d8ba2202006031002493502.png`, // 分享图标
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
    #my-h5-back{
        position: fixed;
        top:70rpx;
    }
    page{
        background-image: url(http://picture.ddxm661.com/a8b5c202006031030465973.png);
    }
    .banner{
        width: 100%;
        display: flex;
        flex-direction: column;
		position:relative;
        >image {
            width: 100%;
			height: 650rpx;
        }
		.preferential_title{
			position: absolute;
			top: 420rpx;
			left: 50%;
			margin-left: -150rpx;
			image{
				width: 300rpx;
				height: 50rpx;
			}
		}
		.preferential{
			position: absolute;
			top: 500rpx;
			display: flex;
			image{
				margin-left: 3%;
				width: 365rpx;
				height: 140rpx;
			}
		}
    }
    .goods-box{
        width: 100%;
        min-height: 1600rpx;
        background-repeat: no-repeat;
        // background-size: 100% 100%;
        // background-image: url("http://picture.ddxm661.com/0e1a5202005200939579879.png");
        margin-bottom: 10rpx;
        .goods-box-items{
            margin: auto;
            padding-top: 20rpx;
            width: 702rpx;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            .img{
                height: 367rpx;
                width: 226rpx;
                margin-bottom: 12rpx;
            }
        }
    }
	.goods-box-title{
		margin-top:20rpx ;
		text-align: center;
		image{
			width: 300rpx;
			height: 40rpx;
		}
	}
    .go-top{
		text-align: center;
		width: 100%;
		image{
			width: 90%;
			height: 100rpx;
		}
    }
</style>
