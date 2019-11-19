<template>
    <view class="container">
        <!-- 关注公众号 -->
        <view class="follow-official-account" v-if="!subscribe">
            <view class="box">
                <view class="left">
                    <view class="follow-logo">
                        <image class="img" src="../../static/images/pandalogo1.png" model="widthFill"></image>
                    </view>
                    <view class="follow-text">
                        <view class="follow-text-title">捣蛋熊猫</view>
                        <view>关注一下，万千豪礼敬情相送</view>
                    </view>
                </view>
                <view class="right">
                    <view @click="openFollowOfficialAccount">关注</view>
                </view>
            </view>
        </view>
        <!-- 关注公众号 弹窗，弹出二维码 -->
        <uni-popup ref="followOfficialAccountAlert" type="center" :custom="true">
            <view class="follow-official-account-alert">
                <view class="box">
                    <view>
                        <image class="img" src="../../static/images/main-qr-code.jpg" ></image>
                    </view>
                    <view>
                        长按识别二维码
                    </view>
                    <view>
                        关注公众号
                    </view>
                </view>
            </view>
        </uni-popup>

        <view class="goods-info">
            <view class="goods-info-img">
                <image :src="responseData.item_pic" class="img"></image>
            </view>
            <view class="goods-info-infos">
                <view class="infos-title">
                    {{responseData.item_name}}
                </view>
                <view class="infos-other">
                    <view class="top">
                        <view class="new-money">
                            ￥
                            <!--当前登录的用户是团长-->
                            <block v-if="responseData.info.length && responseData.info[0].member_id === userInfo.id">{{responseData.assemble_price}}</block>
                            <!--当前登录的用户不是团长-->
                            <block v-else>{{responseData.tuanyuan_price}}</block>
                        </view>
                        <view class="tag">
                            {{responseData.num}}人拼团
                        </view>
                    </view>
                    <view class="bottom">
                        <text>单买价</text>
                        <text class="old-money">￥{{responseData.old_price}}</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="group-detail">
            <view class="text">
                <!-- status  //1 拼团中 2拼团成功 3拼团失败' -->
                <text v-if="responseData.status === 1">
                    <text v-if="responseData.r_num">仅剩<text class="num">{{responseData.r_num}}</text>个名额，</text>
                    <text class="time"><block v-if="timer.d">{{timer.d + "天 "}}</block>{{timer.h + ":" + timer.m + ":" + timer.s }}</text>后结束
                </text>
                <text v-if="responseData.status === 2">拼团成功</text>
                <text v-if="responseData.status === 3">拼团失败，原因：{{responseData.reason}}</text>
            </view>
            <view class="heads">
                <view class="head" v-for="(item, index) in responseData.info" :key="index">
                    <image :src="item.pic" class="img"></image>
                    <view class="tag" v-if="item.commander === 1">团长</view>
                    <view class="tag" v-if="item.status === 0 && item.commander === 0">待支付</view>
                </view>
                <view class="head" v-for="index in responseData.r_num">
                    <image src="../../static/images/help.png" class="img no-img"></image>
                </view>
            </view>
            <view class="btns">
                <button class="btn active" v-if="responseData.status === 1 && responseData.r_num !== 0 && is_show_order" @click="shareGroup" open-type="share">已参团，邀请好友参团</button>
                <view class="btn plain" v-if="responseData.status === 2" @click="_goPage('group_buy')">再开一团</view>
                <view class="btn active" @click="addGroup" v-if="user_ids.indexOf(userInfo.id) === -1">加入拼团</view>
            </view>
        </view>

        <!-- 其他信息 -->
        <view class="other-group-info">
            <view class="other-group-info-box">
                <view class="info-item" @click="_goPage('goods_detail', {id: responseData.item_id})">
                    <view class="info-item-title">
                        商品名称
                    </view>
                    <view class="info-item-body">
                        <text class="content">{{responseData.item_name}}</text>
                        <text class="iconfont icon-ddx-shop-content_arrows"></text>
                    </view>
                </view>
                <view class="info-item" v-if="is_show_order" @click="goOderDetail">
                    <view class="info-item-title">
                        我的订单
                    </view>
                    <view class="info-item-body">
                        <text class="content">查看订单详情</text>
                        <text class="iconfont icon-ddx-shop-content_arrows"></text>
                    </view>
                </view>
                <view class="info-item">
                    <view class="info-item-title">
                        拼团须知
                    </view>
                    <view class="info-item-body">
                        <text class="content">好友拼团，人满成功，不满将退款</text>
                    </view>
                </view>
            </view>
        </view>

        <!--  h5邀请好友参团 引导箭头      -->
        <view class="share-guide-h5" v-show="isShowShareH5" @click="isShowShareH5 =  false">
            <view class="share-guide-h5-img"><image src="../../static/images/share/share-guide.png"></image></view>
            <view class="share-guide-h5-title">立即分享给好友吧</view>
            <view class="share-guide-h5-subtitle">点击屏幕右上角将本页分享给好友</view>
        </view>
    </view>
</template>

<script>
    let myTimer = null
    import uniPopup from '@/components/uni-popup/uni-popup.vue'
    import { mapState, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                id:0,
                timer: {
                    d: 0,
                    h:`00`,
                    m:`00`,
                    s:`00`
                },
                responseData: {
                    item_id: 0,    //商品id
                    mold_id: 0,       //分区id
                    mold: "", //分区名称
                    buy_num: 2,       //限购数量，
                    remaining_stock: 2,   //库存，为-1表示不限制
                    tuanyuan_price:0,//团员价格
                    assemble_price:0,//团长价
                    update:0,//版本
                    assemble_id:0,//拼团id
                    assemble_list_id:0,//拼团活动id
                    price: 0,       //金额
                    end_time: 0,  //结束时间
                    reason: null, //如果失败，为失败原因
                    status: 1,    //1 拼团中 2拼团成功 3拼团失败',
                    r_num: 1, //还差几人
                    old_price: 0,   //原价
                    num: 3,   //几人团
                    item_name: "",   //商品名
                    item_pic: "",   //商品图片
                    time: 1569399771, //服务器当前时间
                    info: [],//参团人员信息
                },

                //参加拼团人的id集合
                user_ids:[

                ],

                //其他人进入本页面，如果登录了的，且自己参加拼团了，则显示查看拼团详情
                is_show_order: false,

                // 分享到好友，引导箭头是否显示
                isShowShareH5: false,
            }
        },
        methods: {
            ...mapMutations(['setShareID']),
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },

            //倒计时
            getRTime(){
                let time_distance = this.responseData.end_time * 1000 - this.responseData.time * 1000 // 结束时间减去当前时间
                if (time_distance <= 0){
                    this.timer = { d: 0, h:`00`, m: `00`, s: `00`}
                    this.responseData.status = 3
                    this.responseData.reason = '在规定的时间内未完成拼团'
                    clearInterval(myTimer)
                    return
                }
                let int_day, int_hour, int_minute, int_second
                // 天时分秒换算
                int_day = Math.floor(time_distance/86400000)
                time_distance -= int_day * 86400000
                int_hour = Math.floor(time_distance/3600000)
                time_distance -= int_hour * 3600000
                int_minute = Math.floor(time_distance/60000)
                time_distance -= int_minute * 60000
                int_second = Math.floor(time_distance/1000)

                // 时分秒为单数时、前面加零站位
                if(int_hour < 10){
                    int_hour = "0" + int_hour
                }
                if(int_minute < 10){
                    int_minute = "0" + int_minute
                }
                if(int_second < 10){
                    int_second = "0" + int_second
                }
                this.timer = {d:int_day, h:int_hour, m:int_minute, s:int_second}
            },

            // 分享拼团
            shareGroup(){
                this.isShowShareH5 = true
            },
            //打开关注公众号二维码弹框follow-official-account
            openFollowOfficialAccount(){
                this.$refs.followOfficialAccountAlert.open()
            },


            //加入拼团
            addGroup(){
                this._goPage('group_buy_detail', {
                    assemble_id: this.responseData.assemble_id,     //拼团活动id
                    item_id: this.responseData.item_id,//商品id
                    assemble_list_id: this.responseData.assemble_list_id, // 该组团 的唯一id，表明可以加入该拼团
                })
            },


            // 去到订单详情
            goOderDetail(){
                let order_id = 0
                this.responseData.info.map((item) => {
                    if(item.member_id === this.userInfo.id){
                        order_id = item.order_id
                    }
                })
                this._goPage('order_detail', {order_id: order_id})
            },


        },
        async onLoad(param){
            // 如果是安卓平台 每次进入商品详情页面就会调用微信配置，自定义分享商品
            if (this.getPlatform().isAndroid){
                await this.wxConfig()
            }
            let url = ''
            if(this.userInfo.id) {
                url = window.location.href + '&user_id=' + this.userInfo.id
            } else {
                url = window.location.href
            }

            let requestData = {
                id: 0
            }

            if (param.user_id){
                this.setShareID(param.user_id)
            }
            if (param.id) {
                requestData.id = param.id
                this.id = param.id
                console.log("通过分享带进来的参数：", param)
            }


            if (this.$parseURL().id){
                console.log("其他页面带过来的参数：", this.$parseURL())
                requestData.id = this.$parseURL().id
                this.id = this.$parseURL().id
            }

            await this.$minApi.groupBuyDetail(requestData).then(async res => {
                if (res.code === 200){

                    let user_ids = [] // 所有参加拼团人的id
                    let order_id = 0 // 当前登录者 是否参团，如果参团，者这个order_id 就为当前登录者的订单id
                    res.data.info.map(item => {
                        user_ids.push(item.member_id)
                        if((this.userInfo.id) && (item.member_id === this.userInfo.id)){
                            order_id = item.order_id
                        }
                    })
                    if (order_id && this.userInfo.id) { //如果当前用户登录了，且参加拼团了， 则显示跳转到该自己拼团的订单详情
                        this.is_show_order = true
                    }
                    this.user_ids = user_ids // 所有参加拼团人的id

                    this.responseData = res.data
                    this.$nextTick(()=>{
                        myTimer = setInterval(()=>{
                            this.responseData.time ++
                            this.getRTime()
                        }, 1000)//设置定时器 每一秒执行一次

                        /**
                         * 分享
                         */
                        let param1 = {
                                title: `捣蛋熊拼团-${res.data.item_name}`, // 分享标题
                                desc: `仅限${res.data.tuanyuan_price}元，立省${(parseFloat(res.data.old_price) - parseFloat(res.data.tuanyuan_price)).toFixed(2)}元，先到先得`, // 分享描述
                                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: res.data.item_pic, // 分享图标
                                success: function () {}
                            },
                            param2 = {
                                title: `捣蛋熊拼团-${res.data.item_name}`, // 分享标题
                                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: res.data.item_pic, // 分享图标
                                success: function () {}
                            }
                        this.wxConigShareGoods(param1, param2)
                    })
                }
            })
        },
        onUnload(){
            clearInterval(myTimer);
            myTimer = null
        },
        components: {
            uniPopup,
        },
        computed: {
            ...mapState(['userInfo', 'subscribe'])
        },
    }
</script>

<style lang="scss" scoped>
    .container {
        .goods-info{
            padding: $uni-spacing-row-base;
            width: 100%;
            display: flex;
            background: #ffffff;
            justify-content: space-between;
            border-bottom: 1upx dashed #E4E4E4;
            .goods-info-img{
                width: 240upx;
                height: 240upx;
                .img{
                    height: 100%;
                    width: 100%;
                    border-radius: 8upx;
                }
            }
            .goods-info-infos{
                height: 240upx;
                width: calc(100% -  240upx - 30upx);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .infos-title{
                    @extend %overflow-2-line;
                    font-size: $uni-font-size-base;
                    color: $color-primary-plain;
                }
                .infos-other{
                    font-size: $uni-font-size-base;
                    color: #808080;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    .top{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .new-money{
                            color: #F82B2B;
                            margin-right: 8upx;
                        }
                        .tag{
                            height:32upx;
                            line-height: 32upx;
                            border-radius:0 16upx 16upx 0;
                            padding: 0 20upx;
                            background: #FC5A5A;
                            color: #ffffff;
                            font-size: $uni-font-size-sm;
                        }
                    }
                    .bottom{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        font-size: $uni-font-size-sm;
                        .old-money{
                            font-size: 20upx;
                            text-decoration: line-through;
                            margin-left: 8upx;
                        }
                    }
                }
            }
        }

        .group-detail{
            background: #fff;
            padding: $uni-spacing-row-base * 2;
            .text{
                text-align: center;
                font-size: $uni-font-size-base;
                color: $color-primary-plain;
                margin-bottom: 38upx;
                .num{
                    color: $color-primary;
                }
                .time{
                    color: #000;
                }
            }
            .heads{
                border: 1uxp solid red;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                margin-bottom: 38upx;
                .head{
                    position: relative;
                    width: 88upx;
                    height: 88upx;
                    margin: 20upx;
                    .img{
                        border-radius: 50%;
                        border: 1upx solid $color-primary;
                        width: 88upx;
                        height: 88upx;
                    }
                    .no-img{
                        border: 1upx dashed #D2D2D2;
                    }
                    .tag{
                        position: absolute;
                        left: 0;
                        bottom: -14upx;
                        height: 28upx;
                        line-height: 28upx;
                        width: 88upx;
                        text-align: center;
                        background: $color-primary;
                        font-size: $uni-font-size-sm;
                        color: #ffffff;
                        border-radius: 14upx;
                    }
                }
            }
            .btns{
                .btn{
                    width: 100%;
                    text-align: center;
                    line-height: 88upx;
                    height: 88upx;
                    border-radius:44upx;
                    font-size: $uni-font-size-base;
                    margin-bottom: 40upx;
                    &.active{
                        background: $color-primary;
                        color: #fff;
                    }
                    &.plain{
                        background: #fff;
                        color: $color-primary;
                        border: 1px solid $color-primary;
                    }
                }
            }
        }
        .other-group-info{
            background: #FFFFFF;
            margin-top: 20upx;
            .other-group-info-box{
                display: flex;
                flex-direction: column;
                padding: 0 $uni-spacing-row-base;
                .info-item{
                    padding: 30upx 0;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    border-bottom: 1px solid #F2F2F2;
                    .info-item-title{
                        width: 20%;
                        color: $color-primary-plain;
                        font-size: $uni-font-size-base;
                    }
                    .info-item-body{
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        width: 80%;
                        .content{
                            width: 78%;
                            @extend %overflow-1-line;
                            color: #808080;
                            font-size: $uni-font-size-base;
                            text-align: right;
                        }
                        .iconfont{
                            font-size: 20upx;
                            color: #D4D4D4;
                            margin-left: 2%;
                        }
                    }
                }
            }
        }

        /* 关注工作号 */
        .follow-official-account{
            z-index: 99;
            width: 100%;
            position: fixed;
            top: calc(0upx + 100upx);
            /*  #ifdef  APP-PLUS  */
            top: calc(var(--status-bar-height) + 100upx);
            /*  #endif  */
            /*  #ifdef  H5  */
            top: calc(var(--window-top) + 100upx);
            /*  #endif  */
            background: #FC5A5A;
            padding: $uni-spacing-row-base;
            .box{
                width: 100%;
                display: flex;
                justify-content: space-between;
                .left{
                    display: flex;
                    .follow-logo{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        .img{
                            width: 60upx;
                            height: 75upx;
                            margin-right: 10upx;
                        }
                    }
                    .follow-text{
                        color: #FFFFFF;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        font-size: $uni-font-size-base;
                        .follow-text-title{
                            font-size:$uni-font-size-sm;
                        }
                    }
                }
                .right{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    view{
                        border-radius:4upx;
                        background: #FFFFFF;
                        padding: 4upx 18upx;
                        font-size: $uni-font-size-base;
                    }
                }
            }
        }
        /* 关注公众号 弹窗，弹出二维码 */
        .follow-official-account-alert{
            background: #fff;
            position: relative;
            overflow: hidden;
            width: 100%;
            height: auto;
            .box{
                padding: 34upx;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .img{
                    height: 414upx;
                    width: 414upx;
                    margin-bottom: 20upx;
                }
                view{
                    color: #333333;
                    font-size:$uni-font-size-lg;
                    text-align: center;
                    font-weight:500;
                }

            }
        }

        /*  h5邀请好友参团 引导箭头  */
        .share-guide-h5{
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            z-index: 99999;
            background: rgba(0,0,0,.5);
            display: flex;
            flex-direction: column;
            .share-guide-h5-img{
                display: flex;
                justify-content: flex-end;
                margin: 30upx;
                margin-top: 0;
                image{
                    width:250upx;
                    height:262upx;
                }
            }
            .share-guide-h5-title{
                text-align: center;
                font-size: $uni-font-size-lg;
                color: #fff;
                margin-bottom: 30upx;
            }
            .share-guide-h5-subtitle{
                text-align: center;
                font-size: $uni-font-size-base;
                color: #fff;
            }
        }
    }
</style>
