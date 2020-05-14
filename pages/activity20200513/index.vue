<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <div class="banner">
            <img src="http://picture.ddxm661.com/3a12d202005131447581268.png" alt="">
        </div>

        <div class="goods-box">
            <div class="goods-box-title">
                <img src="http://picture.ddxm661.com/c4195202005131450106146.png" alt="">
            </div>
            <div class="goods-box-content">
                <img src="http://picture.ddxm661.com/3be6b20200513145044109.png"  @click="_goPage('spike_detail', {seckill_id: 2257,item_id: 5684})" class="banner">
                <img src="http://picture.ddxm661.com/8a586202005131451028222.png" @click="_goPage('spike_detail', {seckill_id: 2258,item_id: 5690})" class="banner">
                <img src="http://picture.ddxm661.com/8d1fb202005131451157012.png" @click="_goPage('spike_detail', {seckill_id: 2259,item_id: 5691})" class="banner">
            </div>
        </div>

        <div class="goods-box">
            <div class="goods-box-title">
                <img src="http://picture.ddxm661.com/86c61202005131452037087.png" alt="">
            </div>
            <div class="goods-box-content">
                <img src="http://picture.ddxm661.com/bdbe4202005131459502089.png" @click="_goPage('goods_detail', {id: 2827})">
                <img src="http://picture.ddxm661.com/0b5e0202005131459508409.png" @click="_goPage('goods_detail', {id: 2760})">
                <img src="http://picture.ddxm661.com/c6e182020051314595093.png"   @click="_goPage('goods_detail', {id: 2812})">
                <img src="http://picture.ddxm661.com/20aa0202005131502034565.png" @click="_goPage('goods_detail', {id: 2767})">
                <img src="http://picture.ddxm661.com/716f0202005131502033172.png" @click="_goPage('goods_detail', {id: 2800})">
                <img src="http://picture.ddxm661.com/566c8202005131502037785.png" @click="_goPage('goods_detail', {id: 2801})">
                <img src="http://picture.ddxm661.com/e6f0f202005131503478685.png" @click="_goPage('goods_detail', {id: 2814})">
                <img src="http://picture.ddxm661.com/2445c202005131503479726.png" @click="_goPage('goods_detail', {id: 2940})">
                <img src="http://picture.ddxm661.com/df718202005131503478876.png" @click="_goPage('goods_detail', {id: 2939})">
                <img src="http://picture.ddxm661.com/8ecf7202005141525437457.png" @click="_goPage('goods_detail', {id: 2938})">
                <img src="http://picture.ddxm661.com/af485202005131505087687.png" @click="_goPage('goods_detail', {id: 2817})">
                <img src="http://picture.ddxm661.com/b2421202005131505086717.png" @click="_goPage('goods_detail', {id: 2873})">
                <img src="http://picture.ddxm661.com/e229a202005131506541109.png" @click="_goPage('goods_detail', {id: 2769})">
                <img src="http://picture.ddxm661.com/f2e69202005131506542322.png" @click="_goPage('goods_detail', {id: 2804})">
                <img src="http://picture.ddxm661.com/0f40b202005131506546762.png" @click="_goPage('goods_detail', {id: 2810})">
            </div>
        </div>

        <div class="goods-box">
            <div class="goods-box-title">
                <img src="http://picture.ddxm661.com/daed7202005131508398090.png" alt="">
            </div>
            <div class="goods-box-content">
                <img src="http://picture.ddxm661.com/12b25202005131509332679.png" @click="_goPage('goods_detail', {id:2937})">
                <img src="http://picture.ddxm661.com/57fd1202005131509339435.png" @click="_goPage('goods_detail', {id:2877})">
                <img src="http://picture.ddxm661.com/703ca202005131509334578.png" @click="_goPage('goods_detail', {id:2808})">
                <img src="http://picture.ddxm661.com/dc591202005131510135886.png" @click="_goPage('goods_detail', {id:2786})">
                <img src="http://picture.ddxm661.com/7a1a0202005131510135528.png" @click="_goPage('goods_detail', {id:2824})">
                <img src="http://picture.ddxm661.com/c7a70202005131510132205.png" @click="_goPage('goods_detail', {id:2825})">
                <img src="http://picture.ddxm661.com/1fd7c202005131510546487.png" @click="_goPage('goods_detail', {id:2835})">
                <img src="http://picture.ddxm661.com/447d1202005131510547146.png" @click="_goPage('goods_detail', {id:2846})">
                <img src="http://picture.ddxm661.com/1edb3202005131510547122.png" @click="_goPage('goods_detail', {id:2848})">
                <img src="http://picture.ddxm661.com/fafb1202005131512001648.png" @click="_goPage('goods_detail', {id:2754})">
                <img src="http://picture.ddxm661.com/1720a202005131512001902.png" @click="_goPage('goods_detail', {id:2896})">
                <img src="http://picture.ddxm661.com/f5c31202005131512005940.png" @click="_goPage('goods_detail', {id:2892})">
                <img src="http://picture.ddxm661.com/c0968202005131513221160.png" @click="_goPage('goods_detail', {id:2793})">
                <img src="http://picture.ddxm661.com/7a1a0202005131510135528.png" @click="_goPage('goods_detail', {id:2824})">
                <img src="http://picture.ddxm661.com/4bd38202005131513222976.png" @click="_goPage('goods_detail', {id:2825})">
            </div>
        </div>

        <div class="goods-box">
            <div class="goods-box-title">
                <img src="http://picture.ddxm661.com/042e6202005131514572999.png" alt="">
            </div>
            <div class="goods-box-content">
                <img src="http://picture.ddxm661.com/a7c55202005131515343551.png" @click="_goPage('goods_detail', {id: 2908})">
                <img src="http://picture.ddxm661.com/511f0202005131515342375.png" @click="_goPage('goods_detail', {id: 5771})">
                <img src="http://picture.ddxm661.com/3a4d1202005131515346054.png" @click="_goPage('goods_detail', {id: 2780})">
                <img src="http://picture.ddxm661.com/af316202005131516331646.png" @click="_goPage('goods_detail', {id: 2840})">
                <img src="http://picture.ddxm661.com/77473202005131516337265.png" @click="_goPage('goods_detail', {id: 2749})">
                <img src="http://picture.ddxm661.com/1a3d4202005131516338033.png" @click="_goPage('goods_detail', {id: 2839})">
                <img src="http://picture.ddxm661.com/9225c202005131517376081.png" @click="_goPage('goods_detail', {id: 2842})">
                <img src="http://picture.ddxm661.com/32452202005131517379785.png" @click="_goPage('goods_detail', {id: 2843})">
                <img src="http://picture.ddxm661.com/c881b202005131517377164.png" @click="_goPage('goods_detail', {id: 2845})">
            </div>
        </div>

        <div class="go-top" @click="goTop">
            返回顶部
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data() {
            return {

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
            let url = `https://www.ddxm661.com/h5/#/pages/activity20200513/index`
            if (this.userInfo.id) {
                url += `?user_id=${this.userInfo.id}`
            }
            const param1 = {
                    title: '捣蛋熊商城-德国NUK厂家大放价', // 分享标题
                    desc: '德国NUK厂家大放价，不要错过哦', // 分享描述
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: `http://picture.ddxm661.com/53ad8202005131520182228.png`, // 分享图标
                    success: function() {}
                },
                param2 = {
                    title: '捣蛋熊商城-德国NUK厂家大放价', // 分享标题
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: `http://picture.ddxm661.com/53ad8202005131520182228.png`, // 分享图标
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
        background-color: #FFF3F4;
    }
    .banner{
        width: 100%;
        display: flex;
        flex-direction: column;
        img {
            width: 100%;
        }
    }

    .goods-box{
        margin-top: 40rpx;
        .goods-box-title{
            margin: auto;
            display: flex;
            justify-content: center;
            img{
                height: 33rpx;
                margin-bottom: 30rpx;
            }
        }
        .goods-box-content{
            margin: auto;
            display: flex;
            flex-wrap: wrap;
            width: 702rpx;
            justify-content: space-between;
            img{
                height: 435rpx;
                width: 228rpx;
                margin-bottom: 12rpx;
                &.banner{
                    width: 100%;
                }
            }
        }
    }

    .go-top{
        margin: 24rpx auto 70rpx auto;
        width: 702rpx;
        text-align: center;
        height: 88rpx;
        line-height: 88rpx;
        border-radius:12rpx;
        background-color: #DC0039;

        font-size: 28rpx;
        color: #fff;
    }
</style>
