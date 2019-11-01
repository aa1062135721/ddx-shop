<template>
    <view>
        <rich-text :nodes="content"></rich-text>
    </view>
</template>

<script>
    export default {
        name: "rich-text",
        data() {
            return {
                content: ''
            }
        },
        onLoad(param) {
            console.log(param)
            console.log("带过来的参数",this.$parseURL())
            this.content = this.$parseURL().content

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

<style lang="scss">

</style>
