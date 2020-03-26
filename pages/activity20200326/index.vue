<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <div class="one">
            <img src="http://picture.ddxm661.com/8eab7202003251642369436.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1946,item_id: 5104})">
            <img src="http://picture.ddxm661.com/36dac202003251642368096.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1945,item_id: 5103})">
            <img src="http://picture.ddxm661.com/f7b07202003251642367164.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/2e0d9202003251644248433.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/3bb1e202003251644242954.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/65320202003251644249251.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/27879202003251645336601.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/57810202003251645333202.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/58873202003251645338219.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/7b669202003251647301928.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/7a7a4202003251647301346.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/2f56b202003251647303392.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/2dfbb202003251648512700.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/1101c202003251648516921.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/ee24b202003251648512391.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/9663020200325165106891.png"  alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/780d8202003251651065144.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/804fe202003251651064355.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/505aa202003251652365839.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/d3fa6202003251652364508.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/28728202003251652361061.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/654af20200325165435838.png"  alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/76ec5202003251654356054.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
            <img src="http://picture.ddxm661.com/73609202003251654359580.png" alt="" @click="_goPage('spike_detail', {seckill_id: 1947,item_id: 5105})">
        </div>

        <div class="footer">
            <div class="box">
                <div class="btn" @click="_goPage('home')"></div>
                <div class="btn" @click="goTop"></div>
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
        height: 8509upx;
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url(http://picture.ddxm661.com/2e94b202003251637127528.jpg);
    }
    img{
        width: 702upx;
        height: 280upx;
        margin-bottom: 24upx;
    }
    .one{
        padding-top: 1102upx;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    .footer{
        display: flex;
        justify-content: center;
        .box{
            width: 702upx;
            height: 92upx;
            display: flex;
            text-align: center;
            align-items: center;
            flex-direction: row;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url(http://picture.ddxm661.com/bf38f202003251657195798.png);
            .btn{
                height: 92upx;
                width: 50%;
            }
        }
    }
</style>
