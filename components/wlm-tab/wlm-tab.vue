<template>
    <scroll-view   scroll-with-animation scroll-x :scroll-left="scrollLeft">
        <div class="tab">
            <div class="item" :class="[index === tabCur ? selectClass + ' cur':'']" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabSelect(index,$event)">
                <span>{{item.name}}</span>
                <span>{{item.sub_title}}</span>
            </div>
        </div>
    </scroll-view>
</template>

<script>
    export default {
        name: "wlm-tab",
        props:{
            tabList: {
                type: Array,
                default() {
                    return [];
                }
            },
            tabCur: {
                type: Number,
                default() {
                    return 0;
                }
            },
            tabStyle: {
                type: String,
                default() {
                    return '';
                }
            },
            textFlex: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            selectClass: {
                type: String,
                default() {
                    return 'text-blue';
                }
            }
        },
        methods: {
            tabSelect(index, e) {
                if (this.currentTab === index) return false;
                this.$emit('update:tabCur', index);
                this.$emit('change', index);
            }
        },
        computed: {
            scrollLeft() {
                return (this.tabCur - 1) * 60;
            }
        }
    }
</script>

<style scoped lang="scss">
    div,
    scroll-view,
    swiper {
        box-sizing: border-box;
    }
    .tab{
        text-align: center;
        white-space: nowrap;
        height: 100upx;
        display: flex;
        width: 100%;
        .item{
            width: 20%;
            height: 100upx;
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
            border: 1px solid red;
            margin: 0 10upx;
            padding: 0 20upx;
        }
    }
</style>
