<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->
        <div class="banner">
            <img src="http://picture.ddxm661.com/41ad0202004151027444430.png" alt="">
        </div>
        <luBarTabNav class="all-goods" :tabList="tabs.arr" :barFixed="true" :barId="tabs.index" ref="barTabNav">
            <div id="goodsBox0">
                <div class="my-title">
                    <img src="http://picture.ddxm661.com/3b675202004151727196902.png" alt="">
                </div>
                <div class="goods-box">
                    <div class="item-banner">
                        <img src="http://picture.ddxm661.com/71ffd20200415110835881.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2213,item_id: 2435})">
                    </div>
                    <div class="item-box">
                        <img src="http://picture.ddxm661.com/08ee2202004151108546585.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2214,item_id: 5639})">
                        <img src="http://picture.ddxm661.com/b725c202004151109077380.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2215,item_id: 5640})">
                        <img src="http://picture.ddxm661.com/4d212202004151112007024.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2216,item_id: 5641})">
                        <img src="http://picture.ddxm661.com/545d8202004151112192675.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2217,item_id: 5642})">
                        <img src="http://picture.ddxm661.com/e462b202004151112498753.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2218,item_id: 5643})">
                        <img src="http://picture.ddxm661.com/2e7e3202004151113532209.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2219,item_id: 5644})">
                    </div>
                </div>
            </div>
            <div id="goodsBox1">
                <div class="my-title">
                    <img src="http://picture.ddxm661.com/4416f202004151720494785.png" alt="">
                </div>
                <div class="goods-box">
                    <div class="item-box">
                        <img src="http://picture.ddxm661.com/f413f202004151138376058.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2220,item_id: 5645})">
                        <img src="http://picture.ddxm661.com/5b6ad202004171351339915.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2221,item_id: 5646})">
                        <img src="http://picture.ddxm661.com/d7a23202004151139158601.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2222,item_id: 5647})">
                        <img src="http://picture.ddxm661.com/eeaa3202004151139294952.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2223,item_id: 5648})">
                        <img src="http://picture.ddxm661.com/6edf8202004151139438401.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2224,item_id: 5649})">
                        <img src="http://picture.ddxm661.com/2cf89202004151139572517.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2225,item_id: 5650})">
                    </div>
                </div>
            </div>
            <div id="goodsBox2">
                <div class="my-title">
                    <img src="http://picture.ddxm661.com/7485d202004151726432324.png" alt="">
                </div>
                <div class="goods-box">
                    <div class="item-banner">
                        <img src="http://picture.ddxm661.com/64acd202004151358453764.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2226,item_id: 5651})">
                    </div>
                    <div class="item-box">
                        <img src="http://picture.ddxm661.com/5a5a9202004151143007112.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2227,item_id: 5652})">
                        <img src="http://picture.ddxm661.com/f324e202004151143153316.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2228,item_id: 5653})">
                        <img src="http://picture.ddxm661.com/a5c3e202004151143302209.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2229,item_id: 5654})">
                        <img src="http://picture.ddxm661.com/e69ee202004151143516222.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2230,item_id: 5655})">
                        <img src="http://picture.ddxm661.com/70ae1202004151144039985.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2231,item_id: 5656})">
                        <img src="http://picture.ddxm661.com/61dae202004151144167282.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2232,item_id: 5657})">
                        <img src="http://picture.ddxm661.com/ef375202004151144311271.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2233,item_id: 5658})">
                        <img src="http://picture.ddxm661.com/61def202004151144447680.png" alt="" @click="_goPage('spike_detail', {seckill_id: 2234,item_id: 5659})">
                    </div>
                </div>
            </div>
        </luBarTabNav>
    </div>
</template>

<script>
    import luBarTabNav from "@/components/lu-bar-tab-nav/lu-bar-tab-nav.vue";

    export default {
        data() {
            return {
                tabs: {
                    index: 0,// 当前选中的下边
                    arr: [
                        {
                            text: '防晒热销',
                            navTarget: `#goodsBox0`,
                            nav:`goodsBox0`,
                            id: 0,
                        },
                        {
                            text: '口红热销',
                            navTarget: `#goodsBox1`,
                            nav:`goodsBox1`,
                            id: 1,
                        },
                        {
                            text: '面膜热销',
                            navTarget: `#goodsBox2`,
                            nav:`goodsBox2`,
                            id: 2,
                        }
                    ]
                },
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
        components: { luBarTabNav },
        onPageScroll(res) {
            this.$refs.barTabNav._selectedTab(res.scrollTop);
        },
    }
</script>

<style scoped lang="scss">
    #my-h5-back{
        position: fixed;
        top:70rpx;
    }
    page{
        background-color: #ffd2df;
    }
    .all-goods{
        margin-top: -780rpx;
    }
    .banner{
        width: 100%;
        height: 1359rpx;
        img {
            width: 100%;
        }
    }

    .goods-box{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding-bottom: 40rpx;
        .item-banner{
            img{
                width: 750rpx;
                height: 442rpx;
            }
        }
        .item-box{
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            img{
                width: 345rpx;
                height: 502rpx;
                margin:0 7rpx 14rpx 7rpx;
                &:nth-child(1){
                    margin-left: 0;
                }
                &:nth-child(2){
                    margin-right: 0;
                }
            }
        }
    }
    .my-title{
        text-align: center;
        img{
            height: 109rpx;
            width: 520rpx;
        }
        margin-bottom: 24rpx;
        &:first-child{
            margin-top: 50rpx;
        }
    }
</style>
