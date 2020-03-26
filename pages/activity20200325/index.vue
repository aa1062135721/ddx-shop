<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <div class="one">
            <img src="http://picture.ddxm661.com/3ee61202003251603597577.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1945,item_id: 5103})">
            <img src="http://picture.ddxm661.com/15743202003251603594422.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1946,item_id: 5104})">
            <img src="http://picture.ddxm661.com/4cac7202003251603597011.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/b9187202003251606166786.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1948,item_id: 5106})">
            <img src="http://picture.ddxm661.com/a4787202003251606169964.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1949,item_id: 5108})">
            <img src="http://picture.ddxm661.com/06cf5202003251606165677.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1950,item_id: 5110})">
            <img src="http://picture.ddxm661.com/039bc202003251609297411.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1951,item_id: 5114})">
            <img src="http://picture.ddxm661.com/03a1920200325160929107.png" alt="" @click="_goPage('spike_detail',  {seckill_id: 1952,item_id: 2535})">
            <img src="http://picture.ddxm661.com/a31c7202003251609297464.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1953,item_id: 2528})">
            <img src="http://picture.ddxm661.com/872a8202003251611308692.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1954,item_id: 2539})">
            <img src="http://picture.ddxm661.com/5ab61202003251611307687.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1955,item_id: 5116})">
            <img src="http://picture.ddxm661.com/e75c1202003251611304780.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1956,item_id: 2687})">
            <img src="http://picture.ddxm661.com/4fe5a202003251613264264.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1957,item_id: 2548})">
            <img src="http://picture.ddxm661.com/b672f202003251613268467.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1958,item_id: 2684})">
            <img src="http://picture.ddxm661.com/fed45202003251613267728.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1959,item_id: 2536})">
            <img src="http://picture.ddxm661.com/f7d17202003251614478615.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1960,item_id: 2524})">
            <img src="http://picture.ddxm661.com/b43b8202003251614476673.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1961,item_id: 2534})">
            <img src="http://picture.ddxm661.com/d7550202003251614472394.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1962,item_id: 2532})">
            <img src="http://picture.ddxm661.com/043d8202003251616021360.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1963,item_id: 5122})">
            <img src="http://picture.ddxm661.com/9630b202003251616023.png" alt="" @click="_goPage('spike_detail',    {seckill_id: 1964,item_id: 5121})">
            <img src="http://picture.ddxm661.com/b6494202003251616026554.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1965,item_id: 5120})">
        </div>

        <div class="two">
            <img src="http://picture.ddxm661.com/3f687202003251618583635.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1966,item_id: 5119})">
            <img src="http://picture.ddxm661.com/c9e90202003251618585079.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1967,item_id: 5118})">
            <img src="http://picture.ddxm661.com/9933f202003251618581917.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1968,item_id: 5117})">
            <img src="http://picture.ddxm661.com/c027d202003251619478694.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1969,item_id: 5115})">
            <img src="http://picture.ddxm661.com/f4053202003251619479491.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1970,item_id: 5113})">
            <img src="http://picture.ddxm661.com/57f5f202003251619478631.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1971,item_id: 5111})">
            <img src="http://picture.ddxm661.com/6a45e202003251620367323.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1972,item_id: 5112})">
            <img src="http://picture.ddxm661.com/aa085202003251620368159.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1973,item_id: 5109})">
            <img src="http://picture.ddxm661.com/267e220200325162036211.png" alt="" @click="_goPage('spike_detail',  {seckill_id: 1974,item_id: 5107})">

        </div>

        <div class="goTop">
            <img src="http://picture.ddxm661.com/923a3202003251622191378.png" @click="goTop" alt="">
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
        height: 5349upx;
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url(http://picture.ddxm661.com/d8594202003251602188730.png);
    }
    img{
        width: 210upx;
        height: 415upx;
        margin: 6upx;
    }
    .one{
        padding-top: 737upx;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .two{
        margin-top: 196upx;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .goTop{
        display: flex;
        justify-content: center;
        margin-top: 48upx;
        img{
            width: 702upx;
            height: 98upx;
        }
    }
</style>
