<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <div class="banner">
            <img src="http://picture.ddxm661.com/6ee70202005061548067342.png" alt="">
        </div>

        <div class="nav">
            <img src="http://picture.ddxm661.com/dd29320200506154951183.png"  @click="_goPage('goods_search', {title: '帮宝适'})" alt="">
            <img src="http://picture.ddxm661.com/f0abe202005061549511720.png" @click="_goPage('goods_search', {title: '大王'})" alt="">
            <img src="http://picture.ddxm661.com/62222202005061549518266.png" @click="_goPage('goods_search', {title: '尤妮佳'})" alt="">
            <img src="http://picture.ddxm661.com/7b80f202005061549516238.png" @click="_goPage('goods_search', {title: '好奇'})" alt="">
        </div>

        <div class="goods-box">
            <div class="goods-box-title">
                <img src="http://picture.ddxm661.com/be9d0202005061612398853.png" alt="">
            </div>
            <div class="goods-box-content">
                <img src="http://picture.ddxm661.com/53afa202005061632142151.png" @click="_goPage('spike_detail', {seckill_id: 2301,item_id: 2576})" class="banner">
                <img src="http://picture.ddxm661.com/994e420200506163227514.png"  @click="_goPage('spike_detail', {seckill_id: 2302,item_id: 2572})" >
                <img src="http://picture.ddxm661.com/34229202005061632401180.png" @click="_goPage('spike_detail', {seckill_id: 2303,item_id: 2571})" >
                <img src="http://picture.ddxm661.com/308b2202005061632547966.png" @click="_goPage('spike_detail', {seckill_id: 2304,item_id: 2570})" >
                <img src="http://picture.ddxm661.com/db5b4202005061637426065.png" @click="_goPage('spike_detail', {seckill_id: 2305,item_id: 2569})" >
                <img src="http://picture.ddxm661.com/da8b1202005061637423642.png" @click="_goPage('spike_detail', {seckill_id: 2306,item_id: 2558})" >
                <img src="http://picture.ddxm661.com/38229202005061637426051.png" @click="_goPage('spike_detail', {seckill_id: 2307,item_id: 2560})" >
                <img src="http://picture.ddxm661.com/a3a48202005061705357953.png" @click="_goPage('spike_detail', {seckill_id: 2308,item_id: 2561})" >
                <img src="http://picture.ddxm661.com/f6ae2202005061705352914.png" @click="_goPage('spike_detail', {seckill_id: 2309,item_id: 2562})" >
                <img src="http://picture.ddxm661.com/105ad202005061705352225.png" @click="_goPage('spike_detail', {seckill_id: 2310,item_id: 2565})" >
                <img src="http://picture.ddxm661.com/0a0b3202005061709124096.png" @click="_goPage('spike_detail', {seckill_id: 2311,item_id: 2567})" >
                <img src="http://picture.ddxm661.com/fe612202005061709123207.png" @click="_goPage('spike_detail', {seckill_id: 2312,item_id: 2552})" >
                <img src="http://picture.ddxm661.com/31b78202005061709128877.png" @click="_goPage('spike_detail', {seckill_id: 2313,item_id: 2554})" >
                <img src="http://picture.ddxm661.com/99114202005061710128267.png" @click="_goPage('spike_detail', {seckill_id: 2314,item_id: 2555})" >
                <img src="http://picture.ddxm661.com/1dcf4202005061710122455.png" @click="_goPage('spike_detail', {seckill_id: 2315,item_id: 2557})" >
                <img src="http://picture.ddxm661.com/a6bc6202005061710129450.png" @click="_goPage('spike_detail', {seckill_id: 2316,item_id: 2577})" >
                <img src="http://picture.ddxm661.com/7eed4202005061711158580.png" @click="_goPage('spike_detail', {seckill_id: 2317,item_id: 2564})" >
                <img src="http://picture.ddxm661.com/0ac09202005061711156290.png" @click="_goPage('spike_detail', {seckill_id: 2318,item_id: 2563})" >
                <img src="http://picture.ddxm661.com/c2c14202005061711155299.png" @click="_goPage('spike_detail', {seckill_id: 2319,item_id: 2559})" >
                <img src="http://picture.ddxm661.com/1d2ce202005061712432281.png" @click="_goPage('spike_detail', {seckill_id: 2320,item_id: 2556})" >
                <img src="http://picture.ddxm661.com/3a4ce202005061712434911.png" @click="_goPage('spike_detail', {seckill_id: 2321,item_id: 2574})" >
                <img src="http://picture.ddxm661.com/f9dae202005061712434875.png" @click="_goPage('spike_detail', {seckill_id: 2322,item_id: 2573})" >
                <img src="http://picture.ddxm661.com/e8558202005061713511864.png" @click="_goPage('spike_detail', {seckill_id: 2323,item_id: 2575})" >
                <img src="http://picture.ddxm661.com/2747620200506171351643.png"  @click="_goPage('spike_detail', {seckill_id: 2324,item_id: 2553})" >
                <img src="http://picture.ddxm661.com/0274c20200506171351952.png"  @click="_goPage('spike_detail', {seckill_id: 2325,item_id: 2566})" >
            </div>
        </div>

        <div class="goods-box">
            <div class="goods-box-title">
                <img src="http://picture.ddxm661.com/0b93b202005070918405012.png" alt="">
            </div>
            <div class="goods-box-content">
                <img src="http://picture.ddxm661.com/21197202005070919387073.png" @click="_goPage('spike_detail', {seckill_id: 2326,item_id: 2587})">
                <img src="http://picture.ddxm661.com/3e95f20200507091938875.png"  @click="_goPage('spike_detail', {seckill_id: 2327,item_id: 2586})">
                <img src="http://picture.ddxm661.com/fb3e2202005070919381573.png" @click="_goPage('spike_detail', {seckill_id: 2328,item_id: 2583})">
                <img src="http://picture.ddxm661.com/9f704202005070920279338.png" @click="_goPage('spike_detail', {seckill_id: 2329,item_id: 2582})">
                <img src="http://picture.ddxm661.com/c46a7202005070920275905.png" @click="_goPage('spike_detail', {seckill_id: 2330,item_id: 2584})">
                <img src="http://picture.ddxm661.com/b7fa520200507092027360.png"  @click="_goPage('spike_detail', {seckill_id: 2331,item_id: 2588})">
            </div>
        </div>

        <div class="goods-box">
            <div class="goods-box-title">
                <img src="http://picture.ddxm661.com/bd8c4202005070923009168.png" alt="">
            </div>
            <div class="goods-box-content">
                <img src="http://picture.ddxm661.com/fd81d202005070923389996.png" @click="_goPage('spike_detail', {seckill_id: 2332,item_id: 2673})" class="banner">
                <img src="http://picture.ddxm661.com/3442a202005070923598775.png" @click="_goPage('spike_detail', {seckill_id: 2333,item_id: 2606})" alt="">
                <img src="http://picture.ddxm661.com/be82720200507092359870.png"  @click="_goPage('spike_detail', {seckill_id: 2334,item_id: 2604})" alt="">
                <img src="http://picture.ddxm661.com/0a563202005070923591657.png" @click="_goPage('spike_detail', {seckill_id: 2335,item_id: 2602})" alt="">
                <img src="http://picture.ddxm661.com/ae4f620200507092806129.png"  @click="_goPage('spike_detail', {seckill_id: 2336,item_id: 2600})" alt="">
                <img src="http://picture.ddxm661.com/a5f3a202005070928061747.png" @click="_goPage('spike_detail', {seckill_id: 2337,item_id: 2675})" alt="">
                <img src="http://picture.ddxm661.com/4e059202005070928063438.png" @click="_goPage('spike_detail', {seckill_id: 2338,item_id: 2598})" alt="">
                <img src="http://picture.ddxm661.com/6da19202005070929187097.png" @click="_goPage('spike_detail', {seckill_id: 2339,item_id: 2596})" alt="">
                <img src="http://picture.ddxm661.com/84459202005070929181213.png" @click="_goPage('spike_detail', {seckill_id: 2340,item_id: 2594})" alt="">
                <img src="http://picture.ddxm661.com/0323b202005070929182131.png" @click="_goPage('spike_detail', {seckill_id: 2341,item_id: 2593})" alt="">
                <img src="http://picture.ddxm661.com/26541202005070930504238.png" @click="_goPage('spike_detail', {seckill_id: 2342,item_id: 2591})" alt="">
                <img src="http://picture.ddxm661.com/fed33202005070930501580.png" @click="_goPage('spike_detail', {seckill_id: 2343,item_id: 2590})" alt="">
                <img src="http://picture.ddxm661.com/e8980202005070930506916.png" @click="_goPage('spike_detail', {seckill_id: 2344,item_id: 2589})" alt="">
            </div>
        </div>

        <div class="goods-box">
            <div class="goods-box-title">
                <img src="http://picture.ddxm661.com/771c7202005070932412124.png" alt="">
            </div>
            <div class="goods-box-content">
                <img src="http://picture.ddxm661.com/9b5e4202005070932414278.png" @click="_goPage('spike_detail', {seckill_id: 2345,item_id: 2647})" class="banner" alt="">
                <img src="http://picture.ddxm661.com/1e7aa202005070932416833.png" @click="_goPage('spike_detail', {seckill_id: 2346,item_id: 2644})" class="banner" alt="">
                <img src="http://picture.ddxm661.com/ad46a202005070934207768.png" @click="_goPage('spike_detail', {seckill_id: 2347,item_id: 2649})" alt="">
                <img src="http://picture.ddxm661.com/bcc112020050709342065.png"   @click="_goPage('spike_detail', {seckill_id: 2348,item_id: 2648})" alt="">
                <img src="http://picture.ddxm661.com/5170a202005070934206989.png" @click="_goPage('spike_detail', {seckill_id: 2349,item_id: 2645})" alt="">
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

            // 领取优惠券
            getCoupon(id) {
                this.$minApi.collectCoupon({ id }).then(res => {
                    uni.showToast({title: res.msg, duration: 1500, mask: false, icon: 'none'})
                }).catch(err => {
                    console.log(err)
                })
            },
        },
        async onLoad(){
            await this.wxConfig();
            let url = `https://www.ddxm661.com/h5/#/pages/activity20200506/index`
            if (this.userInfo.id) {
                url += `?user_id=${this.userInfo.id}`
            }
            const param1 = {
                    title: '捣蛋熊商城-纸尿裤专场', // 分享标题
                    desc: '纸尿裤专场、单件低至74.75元起', // 分享描述
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: `http://picture.ddxm661.com/58d96202005071004149548.jpg`, // 分享图标
                    success: function() {}
                },
                param2 = {
                    title: '捣蛋熊商城-纸尿裤专场', // 分享标题
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: `http://picture.ddxm661.com/58d96202005071004149548.jpg`, // 分享图标
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
        background-color: #D65887;
    }
    .banner{
        width: 100%;
        display: flex;
        flex-direction: column;
        img {
            width: 100%;
        }
    }

    .nav{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 702rpx;
        margin: auto;
        img{
            width:345rpx;
            height:206rpx;
            margin-bottom: 15rpx;
        }
    }

    .goods-box{
        .goods-box-title{
            margin: auto;
            display: flex;
            justify-content: center;
            img{
                height: 57rpx;
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
                height: 367rpx;
                width: 226rpx;
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
        background:rgba(210,51,100,1);

        font-size: 28rpx;
        color: #fff;
    }
</style>
