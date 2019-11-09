<template>
    <div>
        <div class="bg">
            <img src="./bg.jpg" alt="背景图片">
        </div>
        <div class="goods-list">
            <img class="img" src="./1.jpg" alt="商品1" @click="_goPage('goods_detail', {id: 2431})">
            <img class="img" src="./2.jpg" alt="商品2" @click="_goPage('goods_detail', {id: 2432})">
            <img class="img" src="./3.jpg" alt="商品3" @click="_goPage('goods_detail', {id: 2436})">
            <img class="img" src="./4.jpg" alt="商品4" @click="_goPage('goods_detail', {id: 2433})">
            <img class="img" src="./5.jpg" alt="商品5" @click="_goPage('goods_detail', {id: 2434})">
            <img class="img" src="./6.jpg" alt="商品6" @click="_goPage('goods_detail', {id: 2435})">
            <img class="img" src="./7.jpg" alt="商品7" @click="_goPage('goods_detail', {id: 2438})">
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
        }
    }
</script>

<style scoped lang="scss">
    *{
        background: rgb(180, 143, 65);
    }
.bg{
    width: 100%;
    img {
        width: 100%;
    }
}
    .goods-list{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: $uni-spacing-row-base;
        .img{
            width:690upx;
            height:736upx;
            border-radius:8upx;
            overflow: hidden;
            margin: 8upx;
        }

    }
</style>
