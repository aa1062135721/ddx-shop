<template>
    <div>
        <!-- 一级tab栏 -->
        <wuc-tab :tab-list="tabList" :textFlex="true" :tabCur.sync="TabCur" tab-class="tabs"  @change="tabChange"
                 style="position: fixed;left: 0;width: 100%;z-index: 999;background-color: #fff;"
        ></wuc-tab>
        <div class="div-block"></div>
        <div class="coupon-box" v-show="TabCur === 0">
            <div class="item" @click="_goPage('coupon_details', {id: 10})">
                <div class="left">
                    <div class="content">
                        <div class="content-left">
                            <div class="content-left-price">
                                <span>￥</span>
                                20
                            </div>
                            <div class="content-left-text">满498元可用</div>
                        </div>
                        <div class="content-right">
                            <div class="content-right-title">
                                全部商品可用全部商品可用全部商品可用全部商品可用全部商品可用
                            </div>
                            <div class="content-right-time">
                                有效期至：2019-08-20
                            </div>
                        </div>
                    </div>
                    <div class="semicircle-top"></div>
                    <div class="semicircle-bottom"></div>
                </div>
                <div class="right">
                    <div class="content">
                        去使用
                    </div>
                    <div class="semicircle-top"></div>
                    <div class="semicircle-bottom"></div>
                </div>
                <!-- 波浪线 -->
                <div class="circle1"></div>
            </div>
        </div>
        <div class="coupon-box" v-show="TabCur === 1">
            <div class="item grey" @click="_goPage('coupon_details', {id: 10})">
                <div class="left">
                    <div class="content">
                        <div class="content-left">
                            <div class="content-left-price grey-font">
                                <span>￥</span>
                                20
                            </div>
                            <div class="content-left-text">满498元可用</div>
                        </div>
                        <div class="content-right">
                            <div class="content-right-title">
                                全部商品可用全部商品可用全部商品可用全部商品可用全部商品可用
                            </div>
                            <div class="content-right-time">
                                有效期至：2019-08-20
                            </div>
                        </div>
                    </div>
                    <div class="semicircle-top"></div>
                    <div class="semicircle-bottom"></div>
                </div>
                <div class="right">
                    <div class="content grey-border grey-bg">
                        <img src="../../../static/images/used.png" class="img" alt="已使用">
                    </div>
                    <div class="semicircle-top grey-border"></div>
                    <div class="semicircle-bottom grey-border"></div>
                </div>
                <!-- 波浪线 -->
                <div class="circle1"></div>
            </div>
        </div>
        <div class="coupon-box" v-show="TabCur === 2">
            <div class="item grey" @click="_goPage('coupon_details', {id: 10})">
                <div class="left">
                    <div class="content">
                        <div class="content-left">
                            <div class="content-left-price grey-font">
                                <span>￥</span>
                                20
                            </div>
                            <div class="content-left-text">满498元可用</div>
                        </div>
                        <div class="content-right">
                            <div class="content-right-title">
                                全部商品可用全部商品可用全部商品可用全部商品可用全部商品可用
                            </div>
                            <div class="content-right-time">
                                有效期至：2019-08-20
                            </div>
                        </div>
                    </div>
                    <div class="semicircle-top"></div>
                    <div class="semicircle-bottom"></div>
                </div>
                <div class="right">
                    <div class="content grey-border grey-bg">
                        <img src="../../../static/images/expired.png" class="img" alt="失效了">
                    </div>
                    <div class="semicircle-top grey-border"></div>
                    <div class="semicircle-bottom grey-border"></div>
                </div>
                <!-- 波浪线 -->
                <div class="circle1"></div>
            </div>
        </div>
        <div v-if="tabList[TabCur].list.length === 0" class="no-coupon">
            <img src="../../../static/images/no-coupon.png" alt="">
            <div class="text">亲，暂无优惠券哦~~</div>
        </div>
        <uni-load-more v-show="tabList[TabCur].list.length !== 0" :status="tabList[TabCur].requestData.moreStatus" :show-icon="true"></uni-load-more>
    </div>
</template>

<script>
    import WucTab from '@/components/wuc-tab/wuc-tab.vue'
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）

    export default {
        data() {
            return {
                TabCur: 0,//当前选中的下标
                tabList: [
                    {
                        cname: '待使用(5)',
                        requestData: {
                            page:1,
                            limit:10,
                            moreStatus: 'loading',
                        },
                        list:[
                            {name: '优惠券名',}
                        ],
                    },
                    {
                        cname: '已使用(5)',
                        requestData: {
                            page:1,
                            limit:10,
                            moreStatus: 'loading',
                        },
                        list:[],
                    },
                    {
                        cname: '已失效(3)',
                        requestData: {
                            page:1,
                            limit:10,
                            moreStatus: 'loading',
                        },
                        list:[],
                    },
                ],
            }
        },
        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            async tabChange(index) {
                this.TabCur = index
            },
        },
        components: {
            WucTab,
            uniLoadMore,

        },
    }
</script>

<style scoped lang="scss">
    /* tab栏 */
    .tabs{
        color: #333333;
        font-size: $uni-font-size-base;
        text-align: center;
        width: 100%;
    }
    .div-block{
        height: 90upx;
    }

    .coupon-box{
        padding: $uni-spacing-row-base;
        .item{
            position: relative;
            display: flex;
            justify-content: space-between;
            height:200upx;
            overflow: hidden;
            margin-bottom: 20upx;
            &.grey{
                opacity: 0.8;
            }
            .left{
                background-color: #FFFFFF;
                border-radius:10upx 0 0 10upx;
                width: calc(100% - 134upx);
                height: 200upx;
                .content{
                    background-color: #FFFFFF;
                    border-radius:10upx 0 0 10upx;
                    width: calc(100% - 20upx);
                    padding: 20upx;
                    height: 100%;
                    box-sizing: border-box;
                    border:1px solid rgba(220,220,220,1);
                    border-right: none;

                    display: flex;
                    justify-content: space-between;
                    .content-left{
                        height: 100%;
                        width: 30%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        .content-left-price{
                            text-align: center;
                            font-size: $uni-font-size-lg * 2;
                            color: $color-primary;
                            span{
                                font-size: $uni-font-size-sm;
                            }
                            &.grey-font{
                                color: #999999;
                            }
                        }
                        .content-left-text{
                            @extend %overflow-1-line;
                            text-align: center;
                            color: #333333;
                            font-size: $uni-font-size-sm;
                        }
                    }
                    .content-right{
                        height: 100%;
                        width: 60%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .content-right-title{
                            @extend %overflow-2-line;
                            font-size: $uni-font-size-base;
                        }
                        .content-right-time{
                            color: #808080;
                            font-size: $uni-font-size-sm;
                        }
                    }
                }

                overflow: hidden;
                position: relative;
                .semicircle-top{
                    background-color: $background-color;
                    top: -20upx;
                    right: -20upx;
                    position: absolute;
                    width: 40upx;
                    height: 40upx;
                    border-radius: 50%;
                    box-sizing: border-box;
                    border:1px solid rgba(220,220,220,1);
                    z-index: 9;
                }
                .semicircle-bottom{
                    background-color: $background-color;
                    bottom: -20upx;
                    right: -20upx;
                    position: absolute;
                    width: 40upx;
                    height: 40upx;
                    border-radius: 50%;
                    box-sizing: border-box;
                    border:1px solid rgba(220,220,220,1);
                    z-index: 9;
                }
            }
            .right{
                border-radius:0 10upx 10upx 0;
                background-color:$color-primary;
                width:134upx;
                height: 200upx;

                .content{
                    background-color: $color-primary;
                    border-radius:10upx 0 0 10upx;
                    height: 200upx;
                    box-sizing: border-box;
                    border:1px solid $color-primary;
                    border-left: none;
                    color: #FFFFFF;
                    font-size: $uni-font-size-base;
                    line-height: 200upx;
                    text-align: center;
                    /* 过期 或者 失效 图片*/
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .img{
                        width:98upx;
                        height:98upx;
                    }
                }


                overflow: hidden;
                position: relative;
                .semicircle-top{
                    background-color: $background-color;
                    top: -20upx;
                    left: -20upx;
                    position: absolute;
                    width: 40upx;
                    height: 40upx;
                    border-radius: 50%;
                    box-sizing: border-box;
                    border:1px solid $color-primary;
                    z-index: 9;
                }
                .semicircle-bottom{
                    background-color: $background-color;
                    bottom: -20upx;
                    left: -20upx;
                    position: absolute;
                    width: 40upx;
                    height: 40upx;
                    border-radius: 50%;
                    box-sizing: border-box;
                    border:1px solid $color-primary;
                    z-index: 9;
                }

                .grey-border{
                    border:1px solid #D4D4D4;
                }
                .grey-bg{
                    background-color: #D4D4D4;
                }

            }
            /*波浪线*/
            .circle1 {
                position: absolute;
                top: 10upx;
                left: calc(100% - 134upx);
                transform-origin: center left;
                transform: rotate(90deg);
                width: 180upx;
                height: 20upx;
                background-image: radial-gradient(circle, #fff, #fff 4px, transparent 0px, transparent 2px, transparent 22px, transparent);
                background-size: 10px 10px;
                background-repeat: repeat-x;
            }
        }
    }

    .no-coupon{
        margin-top: calc(90upx + 60upx);
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            width:280upx;
            height:242upx;
        }
        .text{
            margin-top: 20upx;
            color: #999999;
            font-size: $uni-font-size-base;
        }
    }
</style>
