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
        },
        methods: {

        }
    }
</script>

<style>

</style>
