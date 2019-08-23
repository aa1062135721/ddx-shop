<template>
    <view class="container">
        <span @click="checkMobile">提交订单</span>
    </view>
</template>

<script>
    export default {
        name: "submit",
        methods:{
            checkMobile(){
                this.isPoneAvailable('15013710631',true)
            },
        }
    }
</script>

<style scoped>

</style>
