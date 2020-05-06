<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->
        <div class="banner">
            <img src="http://picture.ddxm661.com/19abd202004221614071092.png" alt="">
        </div>
        <div class="coupon-list">
            <img src="http://picture.ddxm661.com/f101920200423093627979.png"  @click="getCoupon(13)" alt="">
            <img src="http://picture.ddxm661.com/5305320200423093627644.png"  @click="getCoupon(14)" alt="">
            <img src="http://picture.ddxm661.com/0079120200423093627397.png"  @click="getCoupon(15)" alt="">
            <img src="http://picture.ddxm661.com/7beb3202004230936276589.png" @click="getCoupon(16)" alt="">
        </div>
        <div class="goods-title">
            <img src="http://picture.ddxm661.com/5730d202004230942076013.png" alt="">
        </div>
        <div class="goods-boxes">
            <img src="http://picture.ddxm661.com/be440202004230946416564.png" @click="_goPage('goods_detail', {id:2425})" alt="">
            <img src="http://picture.ddxm661.com/b7b30202004230947481662.png" @click="_goPage('goods_detail', {id:2410})" alt="">
            <img src="http://picture.ddxm661.com/b5ab1202004230948209039.png" @click="_goPage('goods_detail', {id:2413})" alt="">
            <img src="http://picture.ddxm661.com/4e508202004230950429212.png" @click="_goPage('goods_detail', {id:2427})" alt="">
            <img src="http://picture.ddxm661.com/b3e22202004230951005434.png" @click="_goPage('goods_detail', {id:2417})" alt="">
            <img src="http://picture.ddxm661.com/e7999202004230951156424.png" @click="_goPage('goods_detail', {id:2420})" alt="">
            <img src="http://picture.ddxm661.com/b3e22202004230951005434.png" @click="_goPage('goods_detail', {id:2416})" alt="">
            <img src="http://picture.ddxm661.com/f95fc202004230951402040.png" @click="_goPage('goods_detail', {id:2412})" alt="">
            <img src="http://picture.ddxm661.com/c4ef1202004230951581618.png" @click="_goPage('goods_detail', {id:2406})" alt="">
            <img src="http://picture.ddxm661.com/6fde4202004230952165610.png" @click="_goPage('goods_detail', {id:2411})" alt="">
            <img src="http://picture.ddxm661.com/eee95202004230953106896.png" @click="_goPage('goods_detail', {id:2407})" alt="">
            <img src="http://picture.ddxm661.com/eed6e202004230953275758.png" @click="_goPage('goods_detail', {id:2404})" alt="">
            <img src="http://picture.ddxm661.com/89f8f202004230953443260.png" @click="_goPage('goods_detail', {id:2405})" alt="">
            <img src="http://picture.ddxm661.com/79b12202004230954492653.png" @click="_goPage('goods_detail', {id:2403})" alt="">
            <img src="http://picture.ddxm661.com/9b45e202004231000424150.png" @click="_goPage('goods_detail', {id:2401})" alt="">
            <img src="http://picture.ddxm661.com/a7841202004231001048513.png" @click="_goPage('goods_detail', {id:2395})" alt="">
            <img src="http://picture.ddxm661.com/b7cb720200423100116988.png"  @click="_goPage('goods_detail', {id:2400})" alt="">
            <img src="http://picture.ddxm661.com/9ad89202004231002186813.png" @click="_goPage('goods_detail', {id:2398})" alt="">
            <img src="http://picture.ddxm661.com/9fbb7202004231002366825.png" @click="_goPage('goods_detail', {id:2429})" alt="">
            <img src="http://picture.ddxm661.com/ca652202004231002528205.png" @click="_goPage('goods_detail', {id:2396})" alt="">
            <img src="http://picture.ddxm661.com/a32fe202004231003109868.png" @click="_goPage('goods_detail', {id:5665})" alt="">
        </div>
        <div class="go-top" @click="goTop">
            返回顶部
        </div>
    </div>
</template>

<script>
    import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'

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

            // 领取优惠券
            getCoupon(id) {
                this.$minApi.collectCoupon({ id }).then(res => {
                    uni.showToast({title: res.msg, duration: 1500, mask: false, icon: 'none'})
                }).catch(err => {
                    console.log(err)
                })
            },
        },
        components: {
            uniNoticeBar
        }
    }
</script>

<style scoped lang="scss">
    #my-h5-back{
        position: fixed;
        top:70rpx;
    }
    page{
        background-color: #dff5ca;
    }

    .banner{
        width: 100%;
        display: flex;
        flex-direction: column;
        img {
            width: 100%;
        }
    }
    .coupon-list{
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        width: 702rpx;
        height: 266rpx;
        img{
            width: 345rpx;
            height: 127rpx;
        }
    }
    .goods-title{
        margin: 40rpx auto 30rpx auto;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            height: 30rpx;
            width: 284rpx;
        }
    }

    .goods-boxes{
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 702rpx;
        img{
            width: 226rpx;
            height: 344rpx;
            margin-bottom: 12rpx;
        }
    }
    .go-top{
        margin: 24rpx auto 70rpx auto;
        width: 702rpx;
        text-align: center;
        height: 88rpx;
        line-height: 88rpx;
        background:linear-gradient(0deg,rgba(135,182,91,1) 0%,rgba(149,202,98,1) 100%);
        box-shadow:0rpx 6rpx 10rpx 0rpx rgba(25,41,0,0.31);
        border-radius:12rpx;

        font-size: 28rpx;
        color: rgba(33, 68, 0, 1);
    }
</style>
