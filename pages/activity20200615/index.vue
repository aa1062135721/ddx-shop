<template>
    <div class="box">
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->
		<div class="banner">
		   <img src="http://picture.ddxm661.com/e97fa202006101548034543.png" alt="">
		</div>
		<div class="hot-box">
			<div class="title-box" style="text-align: center; padding-top: 10rpx; margin-bottom: 20rpx;">
				<image src="http://picture.ddxm661.com/032c7202006101549111333.png" style="width: 420rpx; height: 60rpx;"></image>
			</div>
			<div class="hot-box-items">
				<image src="http://picture.ddxm661.com/f4ecb202006121611531785.png" @click="_goPage('spike_detail', {seckill_id: 2709,item_id: 6359})" :lazy-load="true" class="M_img"></image>
			</div>
			<div class="hot-box-items">
				<image src="http://picture.ddxm661.com/58af9202006101534378166.png" @click="_goPage('spike_detail', {seckill_id: 2710,item_id: 6360})" :lazy-load="true" class="M_img"></image>
			</div>
			<div class="hot-box-items">
				<image src="http://picture.ddxm661.com/b5a7620200610153443531.png"  @click="_goPage('goods_detail', {id:6193})" :lazy-load="true" class="M_img"></image>
			</div>
		</div>
        <div class="goods-list">
			<div class="goods-title-box" style="text-align: center; margin-bottom: 10rpx;">
				<image src="http://picture.ddxm661.com/4fee8202006101549424066.png" style="width: 420rpx; height: 60rpx;"></image>
			</div>
            <div class="goods-box-items">
               <image src="http://picture.ddxm661.com/1f7b920200610153928621.png" @click="_goPage('spike_detail', {seckill_id: 2595,item_id: 6131})" :lazy-load="true" class="S_img"></image>
			   <image src="http://picture.ddxm661.com/6d4ee20200610153928270.png" @click="_goPage('spike_detail', {seckill_id: 2594,item_id: 6130})" :lazy-load="true" class="S_img"></image>
            </div>
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
        },
        async onLoad(){
            await this.wxConfig();
            let url = `https://www.ddxm661.com/h5/#/pages/activity20200611/index`
            if (this.userInfo.id) {
                url += `?user_id=${this.userInfo.id}`
            }
            const param1 = {
                    title: '捣蛋熊商城-三周年', // 分享标题
                    desc: '祝朋友们节日快乐', // 分享描述
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: `http://picture.ddxm661.com/e97fa202006101548034543.png`, // 分享图标
                    success: function() {}
                },
                param2 = {
                    title: '捣蛋熊商城-三周年', // 分享标题
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: `http://picture.ddxm661.com/e97fa202006101548034543.png`, // 分享图标
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
		background-image: url(http://picture.ddxm661.com/31e04202006101550563322.png);
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
		position: relative;
		.title-box{
			image{
				position: absolute;
				top: -80rpx;
				left: 23%;
			}
		}
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
	.goods-box-items{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 0 15rpx;
		padding-bottom: 40rpx;
		.S_img{
			width: 350rpx;
			margin-top: 10rpx;
			height: 450rpx;
		}
	}
</style>
