<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <div class="banner">
            <img src="http://picture.ddxm661.com/d3afc202005161124426725.png" alt="">
        </div>

        <div class="goods-box" style="margin-top: -80rpx;">
            <div class="goods-box-content">
                <img src="http://picture.ddxm661.com/b4479202005161126191617.png"  @click="_goPage('spike_detail', {seckill_id: 2427,item_id: 5898})" class="img banner">
                <img src="http://picture.ddxm661.com/352b8202005161126191733.png"  @click="_goPage('spike_detail', {seckill_id: 2428,item_id: 5036})" class="img banner">
                <img src="http://picture.ddxm661.com/82cf120200516112619965.png"   @click="_goPage('spike_detail', {seckill_id: 2429,item_id: 5637})" class="img banner">
            </div>
        </div>

        <div class="goods-box">
            <div class="goods-box-title">
                <div class="font" :class="{'active' : tabIndex === 0}" @click="tabIndex = 0">个护健康</div>
                <div class="solider"></div>
                <div class="font" :class="{'active' : tabIndex === 1}" @click="tabIndex = 1">生活日用</div>
                <div class="solider"></div>
                <div class="font" :class="{'active' : tabIndex === 2}" @click="tabIndex = 2">辅食零食</div>
            </div>
            <div class="goods-box-content" v-show="tabIndex === 0">
                <image src="http://picture.ddxm661.com/fec4b202005161200205986.png" @click="_goPage('spike_detail', {seckill_id: 2430,item_id: 5013})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/a8a85202005161200209960.png" @click="_goPage('spike_detail', {seckill_id: 2431,item_id: 5014})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/3d06f202005161200206248.png" @click="_goPage('spike_detail', {seckill_id: 2432,item_id: 5015})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/a8560202005161200586939.png" @click="_goPage('spike_detail', {seckill_id: 2433,item_id: 5888})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/54d1d20200516120058689.png"  @click="_goPage('spike_detail', {seckill_id: 2434,item_id: 5889})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/43062202005161200585781.png" @click="_goPage('spike_detail', {seckill_id: 2435,item_id: 5890})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/7e313202005161332023037.png" @click="_goPage('spike_detail', {seckill_id: 2436,item_id: 5891})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/55a97202005161332023515.png" @click="_goPage('spike_detail', {seckill_id: 2437,item_id: 5892})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/536a9202005161332024663.png" @click="_goPage('spike_detail', {seckill_id: 2438,item_id: 5893})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/0d887202005161333023827.png" @click="_goPage('spike_detail', {seckill_id: 2439,item_id: 5894})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/a656e202005161333021420.png" @click="_goPage('spike_detail', {seckill_id: 2440,item_id: 5895})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/13a38202005161333024339.png" @click="_goPage('spike_detail', {seckill_id: 2441,item_id: 5896})" :lazy-load="true" class="img"></image>
            </div>
            <div class="goods-box-content" v-show="tabIndex === 1">
                <image src="http://picture.ddxm661.com/af975202005161339492995.png"  @click="_goPage('spike_detail', {seckill_id: 2442,item_id: 5007})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/75151202005161339498771.png"  @click="_goPage('spike_detail', {seckill_id: 2443,item_id: 5003})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/e39cd202005161340433985.png"  @click="_goPage('spike_detail', {seckill_id: 2444,item_id: 4674})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/29e60202005161340436281.png"  @click="_goPage('spike_detail', {seckill_id: 2445,item_id: 4656})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/46911202005161341105052.png"  @click="_goPage('spike_detail', {seckill_id: 2446,item_id: 4654})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/0be9b202005161341109737.png"  @click="_goPage('spike_detail', {seckill_id: 2447,item_id: 4646})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/6ea4d202005161341433850.png"  @click="_goPage('spike_detail', {seckill_id: 2448,item_id: 5012})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/fc5ca202005161341438673.png"  @click="_goPage('spike_detail', {seckill_id: 2449,item_id: 5040})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/8210d202005161342363325.png"  @click="_goPage('spike_detail', {seckill_id: 2450,item_id: 5043})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/d3ad9202005161342361446.png"  @click="_goPage('spike_detail', {seckill_id: 2451,item_id: 5349})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/2cefa202005161343052330.png"  @click="_goPage('spike_detail', {seckill_id: 2452,item_id: 4373})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/3d41e202005161343058829.png"  @click="_goPage('spike_detail', {seckill_id: 2453,item_id: 5392})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/707c0202005161343359023.png"  @click="_goPage('spike_detail', {seckill_id: 2454,item_id: 4673})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/896c2202005161343358844.png"  @click="_goPage('spike_detail', {seckill_id: 2455,item_id: 4665})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/27138202005161345135262.png"  @click="_goPage('spike_detail', {seckill_id: 2456,item_id: 5071})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/1c363202005161345133697.png"  @click="_goPage('spike_detail', {seckill_id: 2457,item_id: 5073})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/04a4c202005161345442294.png"  @click="_goPage('spike_detail', {seckill_id: 2458,item_id: 5897})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/8a16c202005161345443361.png"  @click="_goPage('spike_detail', {seckill_id: 2459,item_id: 5337})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/e1a7b202005161347074173.png"  @click="_goPage('spike_detail', {seckill_id: 2460,item_id: 5338})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/1b852202005161347076472.png"  @click="_goPage('spike_detail', {seckill_id: 2461,item_id: 4446})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/982cf202005161347561449.png"  @click="_goPage('spike_detail', {seckill_id: 2462,item_id: 5780})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/ca964202005161347567675.png"  @click="_goPage('spike_detail', {seckill_id: 2463,item_id: 5820})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/eb28a202005161348285120.png"  @click="_goPage('spike_detail', {seckill_id: 2464,item_id: 5821})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/77e14202005161348282509.png"  @click="_goPage('spike_detail', {seckill_id: 2465,item_id: 5822})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/74404202005161349159135.png"  @click="_goPage('spike_detail', {seckill_id: 2466,item_id: 5823})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/d55ce202005161349151095.png"  @click="_goPage('spike_detail', {seckill_id: 2467,item_id: 5824})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/c736e202005161350006097.png"  @click="_goPage('spike_detail', {seckill_id: 2468,item_id: 5372})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/f886020200516135000552.png"   @click="_goPage('spike_detail', {seckill_id: 2469,item_id: 2684})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/a7270202005161350441845.png"  @click="_goPage('spike_detail', {seckill_id: 2470,item_id: 3889})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/7d669202005161350441132.png"  @click="_goPage('spike_detail', {seckill_id: 2471,item_id: 5798})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/077b12020051613514440.png"    @click="_goPage('spike_detail', {seckill_id: 2472,item_id: 5799})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/c9c9a202005161351448056.png"  @click="_goPage('spike_detail', {seckill_id: 2473,item_id: 5800})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/122f9202005161352207564.png"  @click="_goPage('spike_detail', {seckill_id: 2474,item_id: 5801})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/a0e33202005161352202652.png"  @click="_goPage('spike_detail', {seckill_id: 2475,item_id: 5802})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/99d84202005161353538857.png"  @click="_goPage('spike_detail', {seckill_id: 2476,item_id: 5803})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/b95d4202005161353537679.png"  @click="_goPage('spike_detail', {seckill_id: 2477,item_id: 4393})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/9dd9520200516135434515.png"   @click="_goPage('spike_detail', {seckill_id: 2478,item_id: 4421})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/f7a44202005161354343828.png"  @click="_goPage('spike_detail', {seckill_id: 2479,item_id: 5818})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/a911c20200516135534209.png"   @click="_goPage('spike_detail', {seckill_id: 2480,item_id: 4561})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/68cba202005161355347840.png"  @click="_goPage('spike_detail', {seckill_id: 2481,item_id: 2536})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/0d39320200516135611743.png"   @click="_goPage('spike_detail', {seckill_id: 2482,item_id: 5016})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/9c014202005161356115789.png"  @click="_goPage('spike_detail', {seckill_id: 2483,item_id: 3913})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/b4f08202005161356464324.png"  @click="_goPage('spike_detail', {seckill_id: 2484,item_id: 2549})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/873c6202005161356469766.png"  @click="_goPage('spike_detail', {seckill_id: 2485,item_id: 2741})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/05695202005161357162003.png"  @click="_goPage('spike_detail', {seckill_id: 2486,item_id: 5831})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/3494a202005161357162977.png"  @click="_goPage('spike_detail', {seckill_id: 2487,item_id: 5834})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/c8d85202005161358292894.png"  @click="_goPage('spike_detail', {seckill_id: 2488,item_id: 5837})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/98300202005161358291689.png"  @click="_goPage('spike_detail', {seckill_id: 2489,item_id: 5842})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/c5500202005161358565980.png"  @click="_goPage('spike_detail', {seckill_id: 2490,item_id: 5845})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/43ff0202005161358564389.png"  @click="_goPage('spike_detail', {seckill_id: 2491,item_id: 5846})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/0e5f1202005161359281911.png"  @click="_goPage('spike_detail', {seckill_id: 2492,item_id: 5847})" :lazy-load="true" class="img mohu"></image>
                <image src="http://picture.ddxm661.com/8e5d2202005161359281092.png"  @click="_goPage('spike_detail', {seckill_id: 2493,item_id: 5414})" :lazy-load="true" class="img mohu"></image>
            </div>
            <div class="goods-box-content" v-show="tabIndex === 2">
                <image src="http://picture.ddxm661.com/d5e01202005161335012075.png" @click="_goPage('spike_detail', {seckill_id: 2494,item_id: 3921})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/9cad2202005161335013322.png" @click="_goPage('spike_detail', {seckill_id: 2495,item_id: 5636})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/e175b202005161335018491.png" @click="_goPage('spike_detail', {seckill_id: 2496,item_id: 3941})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/fcf92202005161336261054.png" @click="_goPage('spike_detail', {seckill_id: 2497,item_id: 3928})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/4f23f202005161336266922.png" @click="_goPage('spike_detail', {seckill_id: 2498,item_id: 4225})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/23962202005161336264120.png" @click="_goPage('spike_detail', {seckill_id: 2499,item_id: 5669})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/648c9202005161337224921.png" @click="_goPage('spike_detail', {seckill_id: 2500,item_id: 5670})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/5b5bf202005161337224153.png" @click="_goPage('spike_detail', {seckill_id: 2501,item_id: 5671})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/97ef9202005161337223084.png" @click="_goPage('spike_detail', {seckill_id: 2502,item_id: 4409})" :lazy-load="true" class="img"></image>
                <image src="http://picture.ddxm661.com/43adf202005161337229896.png" @click="_goPage('spike_detail', {seckill_id: 2503,item_id: 5668})" :lazy-load="true" class="img"></image>
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
            let url = `https://www.ddxm661.com/h5/#/pages/activity20200520/index`
            if (this.userInfo.id) {
                url += `?user_id=${this.userInfo.id}`
            }
            const param1 = {
                    title: '捣蛋熊商城-520放肆爱', // 分享标题
                    desc: '520放肆爱', // 分享描述
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: `http://picture.ddxm661.com/a1101202005161439536268.png`, // 分享图标
                    success: function() {}
                },
                param2 = {
                    title: '捣蛋熊商城-520放肆爱', // 分享标题
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: `http://picture.ddxm661.com/a1101202005161439536268.png`, // 分享图标
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
        background-color: #bc006a;
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
            width: 702rpx;
            height: 69rpx;
            background-color: #ffffff;
            border-radius: 12rpx;
            box-sizing: border-box;
            border: 4rpx solid #FF67AB;
            margin: auto;
            margin-bottom: 20rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            .font{
                width: 30%;
                text-align: center;
                line-height: 69rpx;
                font-size: $uni-font-size-base;
                &.active{
                    color: #bc006a;
                }
            }
            .solider{
                width: 4rpx;
                height: $uni-font-size-base;
                background-color: #FF67AB;
            }
        }
        .goods-box-content{
            margin: auto;
            display: flex;
            flex-wrap: wrap;
            width: 702rpx;
            justify-content: space-between;
            .img{
                height: 496rpx;
                width: 345rpx;
                margin-bottom: 12rpx;
                &.banner{
                    width: 100%;
                    height: 305rpx;
                }
                &.mohu{
                    /*width: 186rpx;*/
                    /*height: 268rpx;*/
                    /*margin: 10rpx;*/
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
