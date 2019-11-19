<template>
    <view>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

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
            this.content = this.formatRichText2(this.$parseURL().content)

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

<style lang="scss">

</style>
