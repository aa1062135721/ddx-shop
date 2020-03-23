<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <div class="waitaozhuanqu">
            <img src="http://picture.ddxm661.com/14b69202003230929549598.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1884,item_id: 5046})">
            <img src="http://picture.ddxm661.com/c1593202003230933013579.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1891,item_id: 5067})">
            <img src="http://picture.ddxm661.com/b7bdf202003230934141484.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1892,item_id: 5066})">
            <img src="http://picture.ddxm661.com/3ef40202003230935092417.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1893,item_id: 4531})">
            <img src="http://picture.ddxm661.com/f94bb202003230935326898.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1899,item_id: 5063})">
            <img src="http://picture.ddxm661.com/10be2202003230936153054.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1900,item_id: 5062})">
            <img src="http://picture.ddxm661.com/0645d202003230937076602.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1901,item_id: 5061})">
            <img src="http://picture.ddxm661.com/d1959202003230937453074.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1902,item_id: 5060})">
            <img src="http://picture.ddxm661.com/2ca6e202003230938068665.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1903,item_id: 5059})">
            <img src="http://picture.ddxm661.com/22666202003230938256843.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1904,item_id: 5058})">
            <img src="http://picture.ddxm661.com/5e507202003230938474250.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1890,item_id: 4529})">
            <img src="http://picture.ddxm661.com/a48c4202003230939027584.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1907,item_id: 5055})">
        </div>

        <div class="T-shirt">
            <div class="T-shirt-banner" @click="_goPage('spike_detail', {seckill_id: 1882,item_id: 5044})"></div>
            <div class="T-shirt-goods-all">
                <img src="http://picture.ddxm661.com/7a597202003230947587193.png" @click="_goPage('spike_detail', {seckill_id: 1898,item_id: 5064})">
                <img src="http://picture.ddxm661.com/b1fdb202003230947584906.png" @click="_goPage('spike_detail', {seckill_id: 1886,item_id: 4526})">
                <img src="http://picture.ddxm661.com/720be202003230947587184.png" @click="_goPage('spike_detail', {seckill_id: 1883,item_id: 5045})">
            </div>
        </div>

        <div class="pants">
            <div class="pants-banner" style="background-image: url('http://picture.ddxm661.com/b117b202003230951564764.png');" @click="_goPage('spike_detail', {seckill_id: 1894,item_id: 4534})"></div>
            <div class="pants-banner" style="background-image: url('http://picture.ddxm661.com/ddcc4202003230951563218.png');" @click="_goPage('spike_detail', {seckill_id: 1885,item_id: 5047})"></div>
            <div class="pants-goods-all">
                <img src="http://picture.ddxm661.com/5a0b2202003230953315960.png" @click="_goPage('spike_detail', {seckill_id: 1895,item_id: 4535})">
                <img src="http://picture.ddxm661.com/3edb620200323095331434.png"  @click="_goPage('spike_detail', {seckill_id: 1896,item_id: 5065})">
                <img src="http://picture.ddxm661.com/b176b202003230953319702.png" @click="_goPage('spike_detail', {seckill_id: 1897,item_id: 4537})">
                <img src="http://picture.ddxm661.com/29cc4202003230953315341.png" @click="_goPage('spike_detail', {seckill_id: 1905,item_id: 5057})">
                <img src="http://picture.ddxm661.com/c7c6f202003230953318107.png" @click="_goPage('spike_detail', {seckill_id: 1910,item_id: 5052})">
                <img src="http://picture.ddxm661.com/09bac202003230956312110.png" @click="_goPage('spike_detail', {seckill_id: 1911,item_id: 5051})">
            </div>
        </div>

        <div class="weiyi">
            <img src="http://picture.ddxm661.com/08bee202003231016537961.png" @click="_goPage('spike_detail', {seckill_id: 1887,item_id: 4530})">
            <img src="http://picture.ddxm661.com/5245e202003231001327859.png" @click="_goPage('spike_detail', {seckill_id: 1908,item_id: 5054})">
            <img src="http://picture.ddxm661.com/c3252202003231001324818.png" @click="_goPage('spike_detail', {seckill_id: 1909,item_id: 5053})">
        </div>

        <div class="lianyiqun">
            <img src="http://picture.ddxm661.com/4c1fc202003231007265860.png" @click="_goPage('spike_detail', {seckill_id: 1889,item_id: 4528})">
            <img src="http://picture.ddxm661.com/2c479202003231007267602.png" @click="_goPage('spike_detail', {seckill_id: 1906,item_id: 5056})">
            <img src="http://picture.ddxm661.com/ce003202003231007265004.png" @click="_goPage('spike_detail', {seckill_id: 1888,item_id: 4527})">
        </div>

        <div class="goTop">
            <img src="http://picture.ddxm661.com/77363202003231013082913.png" alt="" @click="goTop">
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

            // 回到顶部
            goTop(){
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 200
                });
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
        height: 6484upx;
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url(http://picture.ddxm661.com/91d11202003230921389429.jpg);
    }
    .waitaozhuanqu{
        padding-top: 854upx;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        img{
            width: 226upx;
            height: 391upx;
            margin: 6upx;
        }
    }
    .T-shirt{
        padding-top: 168upx;
        display: flex;
        flex-direction: column;
        align-items: center;
        .T-shirt-banner{
            height: 391upx;
            width: 702upx;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url(http://picture.ddxm661.com/8f00e202003230943422453.png);
        }
        .T-shirt-goods-all{
            margin-top: 10upx;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            img{
                width: 226upx;
                height: 391upx;
                margin: 6upx;
            }
        }
    }
    .pants{
        padding-top: 168upx;
        display: flex;
        flex-direction: column;
        align-items: center;
        .pants-banner{
            height: 391upx;
            width: 702upx;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            margin-top: 10upx;
        }
        .pants-goods-all{
            margin-top: 10upx;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            img{
                width: 226upx;
                height: 391upx;
                margin: 6upx;
            }
        }
    }
    .weiyi{
        margin-top: 199upx;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        img{
            width: 226upx;
            height: 391upx;
            margin: 6upx;
        }
    }
    .lianyiqun{
        margin-top: 168upx;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        img{
            width: 226upx;
            height: 391upx;
            margin: 6upx;
        }
    }
    .goTop{
        display: flex;
        justify-content: center;
        margin-top: 12upx;
        img{
            width: 336upx;
            height: 78upx;
        }
    }
</style>
