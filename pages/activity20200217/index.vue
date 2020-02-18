<template>
    <div class="container">
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->
        <div class="banner-and-firstGoods">
            <img src="../../static/images/activity20200217/0.jpg" alt="">
            <img src="../../static/images/activity20200217/1.jpg" alt="" @click="_goPage('spike_detail', {item_id: 2683, seckill_id: 1639})">
        </div>
        <div class="disinfectant">
            <div class="banner">
                <img src="../../static/images/activity20200217/disinfectant/banner.png" alt="" @click="_goPage('spike_detail', {item_id: 5002, seckill_id: 1634})">
            </div>
            <div class="goods">
                <img src="../../static/images/activity20200217/disinfectant/goods/1.png" @click="_goPage('spike_detail', {seckill_id: 1632, item_id: 5004})" alt="">
                <img src="../../static/images/activity20200217/disinfectant/goods/2.png" @click="_goPage('spike_detail', {seckill_id: 1633, item_id: 5003})" alt="">
                <img src="../../static/images/activity20200217/disinfectant/goods/3.png" @click="_goPage('spike_detail', {seckill_id: 1638, item_id: 5007})" alt="">
                <img src="../../static/images/activity20200217/disinfectant/goods/4.png" @click="_goPage('spike_detail', {seckill_id: 1635, item_id: 5001})" alt="">
                <img src="../../static/images/activity20200217/disinfectant/goods/5.png" @click="_goPage('spike_detail', {seckill_id: 1636, item_id: 5005})" alt="">
                <img src="../../static/images/activity20200217/disinfectant/goods/6.png" @click="_goPage('spike_detail', {seckill_id: 1637, item_id: 5006})" alt="">
            </div>
        </div>
        <div class="yansheng">
            <div class="banner">
                <img src="../../static/images/activity20200217/yansheng/banner1.png" @click="_goPage('spike_detail', {item_id: 4663, seckill_id: 1231})" alt="">
                <img src="../../static/images/activity20200217/yansheng/banner2.png" @click="_goPage('spike_detail', {item_id: 5008, seckill_id: 1647})" alt="">
                <img src="../../static/images/activity20200217/yansheng/banner3.png" @click="_goPage('goods_detail', {id: 2211})" alt="">
            </div>
            <div class="goods">
                <img src="../../static/images/activity20200217/yansheng/goods/01.png" @click="_goPage('goods_detail', {id: 2168})" alt="">
                <img src="../../static/images/activity20200217/yansheng/goods/02.png" @click="_goPage('goods_detail', {id: 2176})" alt="">
                <img src="../../static/images/activity20200217/yansheng/goods/03.png" @click="_goPage('goods_detail', {id: 2179})" alt="">
                <img src="../../static/images/activity20200217/yansheng/goods/04.png" @click="_goPage('goods_detail', {id: 2181})" alt="">
                <img src="../../static/images/activity20200217/yansheng/goods/05.png" @click="_goPage('goods_detail', {id: 2182})" alt="">
                <img src="../../static/images/activity20200217/yansheng/goods/06.png" @click="_goPage('goods_detail', {id: 2183})" alt="">
                <img src="../../static/images/activity20200217/yansheng/goods/07.png" @click="_goPage('goods_detail', {id: 2184})" alt="">
                <img src="../../static/images/activity20200217/yansheng/goods/08.png" @click="_goPage('goods_detail', {id: 2192})" alt="">
                <img src="../../static/images/activity20200217/yansheng/goods/09.png" @click="_goPage('goods_detail', {id: 2193})" alt="">
                <img src="../../static/images/activity20200217/yansheng/goods/10.png" @click="_goPage('goods_detail', {id: 2194})" alt="">
                <img src="../../static/images/activity20200217/yansheng/goods/11.png" @click="_goPage('goods_detail', {id: 2199})" alt="">
                <img src="../../static/images/activity20200217/yansheng/goods/12.png" @click="_goPage('goods_detail', {id: 2203})" alt="">
                <img src="../../static/images/activity20200217/yansheng/goods/13.png" @click="_goPage('goods_detail', {id: 2204})" alt="">
                <img src="../../static/images/activity20200217/yansheng/goods/14.png" @click="_goPage('goods_detail', {id: 2205})" alt="">
                <img src="../../static/images/activity20200217/yansheng/goods/15.png" @click="_goPage('goods_detail', {id: 2210})" alt="">
            </div>
        </div>
        <div class="zhongguojiu">
            <div class="banner">
                <img src="../../static/images/activity20200217/zhongguojiu/banner.png" @click="_goPage('goods_detail', {id: 2274})" alt="">
            </div>
            <div class="goods">
                <img src="../../static/images/activity20200217/zhongguojiu/goods/01.png" @click="_goPage('goods_detail', {id: 2282})" alt="">
                <img src="../../static/images/activity20200217/zhongguojiu/goods/02.png" @click="_goPage('goods_detail', {id: 2283})" alt="">
                <img src="../../static/images/activity20200217/zhongguojiu/goods/03.png" @click="_goPage('goods_detail', {id: 2275})" alt="">
                <img src="../../static/images/activity20200217/zhongguojiu/goods/04.png" @click="_goPage('goods_detail', {id: 2276})" alt="">
                <img src="../../static/images/activity20200217/zhongguojiu/goods/05.png" @click="_goPage('goods_detail', {id: 2277})" alt="">
                <img src="../../static/images/activity20200217/zhongguojiu/goods/06.png" @click="_goPage('goods_detail', {id: 2278})" alt="">
                <img src="../../static/images/activity20200217/zhongguojiu/goods/07.png" @click="_goPage('goods_detail', {id: 2279})" alt="">
                <img src="../../static/images/activity20200217/zhongguojiu/goods/08.png" @click="_goPage('goods_detail', {id: 2281})" alt="">
                <img src="../../static/images/activity20200217/zhongguojiu/goods/09.png" @click="_goPage('goods_detail', {id: 2286})" alt="">
                <img src="../../static/images/activity20200217/zhongguojiu/goods/10.png" @click="_goPage('goods_detail', {id: 2285})" alt="">
                <img src="../../static/images/activity20200217/zhongguojiu/goods/11.png" @click="_goPage('goods_detail', {id: 2280})" alt="">
                <img src="../../static/images/activity20200217/zhongguojiu/goods/12.png" @click="_goPage('goods_detail', {id: 2284})" alt="">
            </div>
        </div>
        <div class="footer">
            <div class="gotop" @click="goTop">
                回到顶部
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import * as Constant from '../../utils/constant'

    export default {
        computed: {
            ...mapState(['userInfo']),
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
        onLoad() {
            // 如果是安卓平台 每次进入商品详情页面就会调用微信配置，自定义分享商品
            if ((this.getPlatform()).isAndroid) {
                this.wxConfig()
            }
            let url = Constant[Constant.NODE_ENV].activity20200217URL
            if (this.userInfo.id) {
                url += `?user_id=${this.userInfo.id}`
            }
            url = Constant[Constant.NODE_ENV].shareRedirectURL + encodeURIComponent(url)
            this.$nextTick(async () => {
                let param1 = {
                        title: '捣蛋熊商城', // 分享标题
                        desc: `全民防护，共同战“役”`, // 分享描述
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: `${window.location.origin}/h5/static/images/activity20200217/share.png`, // 分享图标
                        success: function() {}
                    },
                    param2 = {
                        title: '捣蛋熊商城', // 分享标题
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: `${window.location.origin}/h5/static/images/activity20200217/share.png`, // 分享图标
                        success: function() {}
                    }
                await this.wxConigShareGoods(param1, param2)
            })
        },
    }
</script>

<style scoped lang="scss">
    #my-h5-back{
        position: fixed;
    }
    .container{
        background-color: #4ec8ff;
    }
    .banner-and-firstGoods{
        display: flex;
        flex-direction: column;
        img{
            width: 100%;
        }
    }
     /*消毒液 酒精*/
    .disinfectant{
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url(~@/static/images/activity20200217/disinfectant/bg.jpg);
        height: 1339upx;
        .banner{
            padding: 0 $uni-spacing-row-base;
            padding-top: 217upx;
            img{
                width: 100%;
                height: 357upx;
            }
        }
        .goods{
            padding: 0 $uni-spacing-row-base;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            img{
                width: 226upx;
                height: 347upx;
                margin: 8upx 0;
            }
        }
    }

    /*衍生*/
    .yansheng{
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url(~@/static/images/activity20200217/yansheng/bg.jpg);
        height: 3167upx;
        .banner{
            padding: 0 $uni-spacing-row-base;
            padding-top: 217upx;
            img{
                width: 100%;
                height: 347upx;
            }
        }
        .goods{
            padding: 0 $uni-spacing-row-base;
            padding-top: 26upx;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            img{
                width: 226upx;
                height: 347upx;
                margin: 8upx 0;
            }
        }
    }

    /*中国灸*/
    .zhongguojiu{
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url(~@/static/images/activity20200217/zhongguojiu/bg.png);
        height: 2054upx;
        .banner{
            padding: 0 $uni-spacing-row-base;
            padding-top: 217upx;
            img{
                width: 100%;
                height: 347upx;
            }
        }
        .goods{
            padding: 0 $uni-spacing-row-base;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            img{
                width: 226upx;
                height: 347upx;
                margin: 8upx 0;
            }
        }
    }

    .footer{
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url(~@/static/images/activity20200217/footer.png);
        height: 154upx;
        padding: 0 $uni-spacing-row-base;
        display: flex;
        align-items: center;
        .gotop{
            height:88upx;
            width: 100%;
            border-radius:8upx;
            background-color:#003A61;
            color: #ffffff;
            font-size: $uni-font-size-base;
            text-align: center;
            line-height: 88upx;
        }
    }
</style>

