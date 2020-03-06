<template>
    <div>
        <div class="container">
            <div class="coupon">
                <div class="coupon-top">
                    <div class="title">{{responseData.c_name}}</div>
                    <div class="time">有效日期：{{ responseData.c_use_time | couponTime }}</div>
                </div>
                <hr class="coupon-hr">
                <div class="coupon-bottom">
                    <div class="price">
                        <div class="text">面值</div>
                        <div v-if="responseData.c_type === 1">
                            {{ responseData.c_amo_dis }}
                            <span>￥</span>
                        </div>
                        <div v-if="responseData.c_type === 2">
                            {{ responseData.c_amo_dis / 10 }}
                            <span>折</span>
                        </div>
                    </div>
                    <div class="price-sub">{{ responseData.c_use_cill === 0 ? '无使用门槛' : `满${responseData.c_use_cill}元可用` }}</div>
                </div>

                <div class="semicircle-left"></div>
                <div class="semicircle-right"></div>
            </div>
            <div class="box">
<!--                <div class="btn">-->
<!--                    <div class="now-use" @click="_goPage('home')">立即使用</div>-->
<!--                </div>-->
<!--                <div class="div-block"></div>-->
                <div class="footer">
                    <div class="item">
                        <div class="title">使用说明</div>
                        <div class="content">{{responseData.c_content}}</div>
                    </div>
                    <div class="item">
                        <div class="title">使用规则</div>
                        <div class="content">{{ responseData.c_use_price === 1 ? '原价上使用' : '会员价上使用' }}</div>
                    </div>
                    <div class="item">
                        <div class="title">优惠内容</div>
                        <div class="content">{{ responseData.c_use_scene | whoCanUse }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { timeStampToTime } from '@/filter/index'

    export default {
        data() {
            return {
                id: 0,
                responseData: {
                    id: 0,
                    c_name: "0",
                    c_type: 1,
                    c_amo_dis: 0,
                    c_use_scene: 0,
                    c_use_cill: 0,
                    c_use_price: 2,
                    c_use_time: 0,
                    c_content: "0",
                    cusScene_id: "",
                }
            }
        },
        methods: {
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            loadData() {
                this.$minApi.couponDetails({id: this.id}).then(res => {
                    if (res.code === 200) {
                        this.responseData = res.data
                    }
                }).catch(err => {

                })
            }
        },
        filters: {
            couponTime: function (value) {
                let str = ''
                if (value instanceof Object) {
                    str += timeStampToTime(value.start_time, true) + '至' + timeStampToTime(value.end_time, true)
                } else {
                    str += `领取日起${value}天内使用`
                }
                return str
            },
            // 0全部商品可用、1指定商品可用、2指定商品不可用、3指定品牌可用、4指定品牌不可用
            whoCanUse: function (val) {
                let str = ''
                switch (val) {
                    case 0:
                        str = '全部商品可用'
                        break
                    case 1:
                        str = '指定商品可用'
                        break
                    case 2:
                        str = '指定商品不可用'
                        break
                    case 3:
                        str = '指定品牌可用'
                        break
                    case 4:
                        str = '指定品牌不可用'
                        break
                }
                return str
            }
        },
        onLoad() {
            console.log("其他页面带过来的参数：", this.$parseURL())
            this.id = this.$parseURL().id
            this.loadData()
        },
    }
</script>

<style scoped lang="scss">
    .container{
        padding: $uni-spacing-row-base;
        border-radius:10upx;
        overflow: hidden;
        .coupon{
            height:380upx;
            background:rgba(250,71,71,1);
            border-radius:10upx;

            .coupon-top{
                height: 110upx;
                width: 100%;
                border:1px solid rgba(250,71,71,1);
                border-bottom: none;
                padding: 0 $uni-spacing-row-base * 2;
                display: flex;
                flex-direction: column;
                justify-content:space-around;
                color: #FFFFFF;
                .title{
                    font-size: $uni-font-size-base;
                }
                .time{
                    font-size: $uni-font-size-sm;
                }
            }
            .coupon-hr{
                height: 0;
                width: 100%;
                border:2upx dashed rgba(224,33,33,1);
            }
            .coupon-bottom{
                height: 268upx;
                width: 100%;

                padding: 0 $uni-spacing-row-base * 2;
                display: flex;
                flex-direction: column;
                justify-content:space-around;
                color: #FFFFFF;
                .price{
                    display: flex;
                    .text{
                        font-size: $uni-font-size-sm;
                        margin-right: 20upx;
                    }
                    font-size: $uni-font-size-base * 3;
                }
                .price-sub{
                    font-size: $uni-font-size-sm;
                }
            }

            overflow: hidden;
            position: relative;
            .semicircle-left{
                background-color: $background-color;
                top:calc(110upx - 20upx);
                left: -20upx;
                position: absolute;
                width: 40upx;
                height: 40upx;
                border-radius: 50%;
                box-sizing: border-box;
                border:1px solid rgba(250,71,71,1);
                z-index: 9;
            }
            .semicircle-right{
                background-color: $background-color;
                top:calc(110upx - 20upx);
                right: -20upx;
                position: absolute;
                width: 40upx;
                height: 40upx;
                border-radius: 50%;
                box-sizing: border-box;
                border:1px solid rgba(250,71,71,1);
                z-index: 9;
            }
        }
        .box{
            margin-top: -10upx;
            background-color: #fff;
            border:1px solid rgba(210,210,210,1);
            border-top: none;
            border-radius:0 0 10upx 10upx;
            box-sizing: border-box;
            overflow: hidden;
            .btn{
                background-color: #FFFFFF;
                display: flex;
                justify-content: center;
                box-sizing: border-box;
                .now-use{
                    margin-top: 55upx;
                    margin-bottom: 30upx;
                    background-color: #F42F2F;
                    width:254upx;
                    text-align: center;
                    height:60upx;
                    line-height: 60upx;
                    border-radius:6upx;
                    color: #FFFFFF;
                    font-size: $uni-font-size-base;
                }
            }
            .div-block{
                background: $background-color;
                width: 100%;
                height:14upx;
            }
            .footer{
                background-color: #FFFFFF;
                display: flex;
                flex-direction: column;
                padding: $uni-spacing-row-base;

                .item{
                    @extend %border-color-solid-botton;
                    font-size: $uni-font-size-base;
                    padding: $uni-spacing-row-sm * 2  0;
                    &:last-child{
                        border-bottom: none;
                    }
                    .title{
                        color: #666666;
                    }
                    .content{
                        color: #333333;
                    }
                }
            }
        }
    }
</style>
