<template>
    <view>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <web-view :src="url"></web-view>
    </view>
</template>

<script>
    export default {
        name: "web-view",
        data() {
            return {
                url: ''
            }
        },
        onLoad() {
            console.log("带过来的参数",this.$parseURL())
            this.url = this.$parseURL().url

            if (this.$parseURL().title) {
                uni.setNavigationBarTitle({
                    title: this.$parseURL().title
                })
            }
        },
        methods: {
            // 返回按钮
            _goBack() {
                uni.navigateBack()
            },
        }
    }
</script>

<style>

</style>
