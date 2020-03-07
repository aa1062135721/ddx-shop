<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->
        <div class="banner"></div>
        <div class="xiang-wo-suo-xuan">
            <div class="xiang-wo-suo-xuan-banner">
                <img src="http://picture.ddxm661.com/21c97202003071039523695.png" @click="_goPage('spike_detail', {item_id: 4108, seckill_id: 1728})">
            </div>
            <div class="xiang-wo-suo-xuan-goods">
                <img src="http://picture.ddxm661.com/d359e202003071046546646.png" @click="_goPage('spike_detail', {item_id: 4638, seckill_id: 1729})">
                <img src="http://picture.ddxm661.com/41583202003071351065478.png" @click="_goPage('spike_detail', {item_id: 4637, seckill_id: 1730})">
                <img src="http://picture.ddxm661.com/6313920200307135134712.png"  @click="_goPage('spike_detail', {item_id: 4595, seckill_id: 1731})">
                <img src="http://picture.ddxm661.com/e284b202003071351581454.png" @click="_goPage('spike_detail', {item_id: 4594, seckill_id: 1732})">
                <img src="http://picture.ddxm661.com/50568202003071352182317.png" @click="_goPage('spike_detail', {item_id: 4568, seckill_id: 1733})">
                <img src="http://picture.ddxm661.com/128cd202003071352428215.png" @click="_goPage('spike_detail', {item_id: 4111, seckill_id: 1734})">
            </div>
        </div>
        <div class="mo-li-huan-fu">
            <div class="mo-li-huan-fu-banner" style="padding-top: 390upx;">
                <img src="http://picture.ddxm661.com/5fb44202003071353499204.png" @click="_goPage('spike_detail', {item_id: 5015, seckill_id: 1735})">
            </div>
            <div class="mo-li-huan-fu-banner" style="padding-top: 14upx;">
                <img src="http://picture.ddxm661.com/21f98202003071354072681.png" @click="_goPage('spike_detail', {item_id: 5009, seckill_id: 1736})">
            </div>
            <div class="mo-li-huan-fu-goods">
                <img src="http://picture.ddxm661.com/e3bbb202003071355064282.png" @click="_goPage('spike_detail', {item_id: 4337, seckill_id: 1737})">
                <img src="http://picture.ddxm661.com/90724202003071355269340.png" @click="_goPage('spike_detail', {item_id: 4385, seckill_id: 1738})">
                <img src="http://picture.ddxm661.com/d670b202003071355429628.png" @click="_goPage('spike_detail', {item_id: 4389, seckill_id: 1739})">
            </div>
        </div>
        <div class="yi-ai-wei-ming">
            <div class="yi-ai-wei-ming-banner" style="padding-top: 400upx;">
                <img src="http://picture.ddxm661.com/e7b13202003071356081333.png" @click="_goPage('spike_detail', {item_id: 5014, seckill_id: 1740})">
            </div>
            <div class="yi-ai-wei-ming-banner" style="padding-top: 16upx;">
                <img src="http://picture.ddxm661.com/2d646202003071356383922.png" @click="_goPage('spike_detail', {item_id: 5013, seckill_id: 1741})">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                key: "value"
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

    }
</script>

<style scoped lang="scss">
    #my-h5-back{
        position: fixed;
    }
    page{
        background-color: #FFE2E9;
    }
    .banner{
        height: 378upx;
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url(http://picture.ddxm661.com/d508a202003071412145091.png);
    }
    .xiang-wo-suo-xuan{
        height: 1446upx;
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url(http://picture.ddxm661.com/ecf2620200307141233709.png);
        .xiang-wo-suo-xuan-banner{
            padding: 0 $uni-spacing-row-base * 2;
            padding-top: 380upx;
            text-align: center;
            img{
                height: 329upx;
            }
        }
        .xiang-wo-suo-xuan-goods{
            padding: 0 $uni-spacing-row-base * 2;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            margin-top: 12upx;
            img{
                width: 210upx;
                height: 327upx;
                margin-bottom: 12upx;
            }
        }
    }
    .mo-li-huan-fu{
        height: 1467upx;
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url(http://picture.ddxm661.com/fc0cc20200307141404559.png);
        .mo-li-huan-fu-banner{
            padding: 0 $uni-spacing-row-base * 2;
            text-align: center;
            img{
                height: 327upx;
            }
        }
        .mo-li-huan-fu-goods{
            padding: 0 $uni-spacing-row-base * 2;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            margin-top: 14upx;
            img{
                width: 210upx;
                height: 327upx;
            }
        }
    }
    .yi-ai-wei-ming{
        height: 1125upx;
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url(http://picture.ddxm661.com/aa71f202003071422135985.png);
        .yi-ai-wei-ming-banner{
            padding: 0 $uni-spacing-row-base * 2;
            text-align: center;
            img{
                height: 329upx;
            }
        }
    }
</style>
