<template>
    <view>
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

        }
    }
</script>

<style>

</style>
