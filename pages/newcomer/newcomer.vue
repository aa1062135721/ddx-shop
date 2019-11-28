<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <div class="bg">
            <img src="./bg.png" alt="背景图片">
        </div>
        <div class="goods-list">
            <img class="img" src="./1.png" alt="商品1" @click="_goPage('spike_detail', {seckill_id: 7, item_id: 2227})">
            <img class="img" src="./2.png" alt="商品2" @click="_goPage('spike_detail', {seckill_id: 8, item_id: 2228})">
            <img class="img" src="./3.png" alt="商品3" @click="_goPage('spike_detail', {seckill_id: 9, item_id: 2345})">
            <img class="img" src="./4.png" alt="商品4" @click="_goPage('spike_detail', {seckill_id: 10, item_id: 2354})">
            <img class="img" src="./5.png" alt="商品5" @click="_goPage('spike_detail', {seckill_id: 11, item_id: 2358})">
            <img class="img" src="./6.png" alt="商品6" @click="_goPage('spike_detail', {seckill_id: 12, item_id: 2406})">
            <img class="img" src="./7.png" alt="商品7" @click="_goPage('spike_detail', {seckill_id: 13, item_id: 2395})">
            <img class="img" src="./8.png" alt="商品8" @click="_goPage('spike_detail', {seckill_id: 14, item_id: 2428})">
            <img class="img" src="./9.png" alt="商品9" @click="_goPage('spike_detail', {seckill_id: 15, item_id: 2430})">
            <img class="img" src="./10.png" alt="商品10" @click="_goPage('spike_detail', {seckill_id: 16, item_id: 2360})">
            <img class="img" src="./11.png" alt="商品11" @click="_goPage('spike_detail', {seckill_id: 17, item_id: 2367})">
            <img class="img" src="./12.png" alt="商品12" @click="_goPage('spike_detail', {seckill_id: 18, item_id: 2384})">
            <img class="img" src="./13.png" alt="商品13" @click="_goPage('spike_detail', {seckill_id: 19, item_id: 2379})">
            <img class="img" src="./14.png" alt="商品14" @click="_goPage('spike_detail', {seckill_id: 22, item_id: 2160})">
        </div>
    </div>
</template>

<script>
    export default {
        name: "newcomer", // 新人专享
        methods:{
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            // 返回按钮
            _goBack() {
                uni.navigateBack()
            },
        }
    }
</script>

<style scoped lang="scss">
    *{
        background: #FF3F48;
    }
.bg{
    width: 100%;
    height: 1239upx;
    img {
        width: 100%;
    }
}
    .goods-list{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: $uni-spacing-row-base;
        margin-top: -250upx;
        .img{
            width:338upx;
            height:512upx;
            border-radius:8upx;
            overflow: hidden;
            margin: 8upx;
        }

    }
</style>
