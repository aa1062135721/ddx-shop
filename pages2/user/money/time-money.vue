<template>
    <div>
        <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
        <!-- #endif -->

        <div class="banner banner-image">
            <div class="banner-money-box">
                <span class="fh">￥</span>
                <div class="box-money">451.18</div>
            </div>
            <div class="footer-time">
                过期时间：2019-12-24 12:24:56
                <div class="btn" @click="openActiveTimeMoney">激活</div>
            </div>
            <img src="./images/cloud.png" alt="" class="footer-img">
        </div>

        <div class="record-box-title">
            余额明细
        </div>
        <div class="record-box">
            <div class="item">
                <div>
                    <div class="title">申请提现</div>
                    <div class="sub-title">2019-11-11 11:11:11</div>
                </div>
                <div>
                    <div class="price">100.00</div>
                </div>
            </div>
            <div class="item">
                <div>
                    <div class="title">申请提现</div>
                    <div class="sub-title">2019-11-11 11:11:11</div>
                </div>
                <div>
                    <div class="price">100.00</div>
                </div>
            </div>
            <div class="item">
                <div>
                    <div class="title">申请提现</div>
                    <div class="sub-title">2019-11-11 11:11:11</div>
                </div>
                <div>
                    <div class="price">100.00</div>
                </div>
            </div>
        </div>

        <uni-load-more :status="moreStatus" :show-icon="true"></uni-load-more>

        <!-- 限时余额激活弹框 -->
        <uni-popup ref="activeTimeMoney" type="center" :custom="true">
            <view class="active-time-money">
                <view class="box">
                    <view class="title">
                        为了您的账户信息安全，请验证{{userInfo.mobile | filterMobile}}的验证码
                    </view>
                    <view class="input-box">
                        <input type="number" class="input" focus placeholder="请输入验证码" />
                        <view class="btn">获取验证码</view>
                    </view>
                    <view class="footer">
                        <view class="btn" @click="closeActiveTimeMoney" style="background: #999;">取消</view>
                        <view class="btn">激活</view>
                    </view>
                </view>
            </view>
        </uni-popup>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import uniPopup from '@/components/uni-popup/uni-popup.vue'
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）

    export default {
        name: "time-money", // 限时余额查看详情
        data(){
          return {
              moreStatus: 'more',
          }
        },
        methods:{
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
            // 返回按钮
            _goBack() {
                uni.navigateBack()
            },
            // 打开激活限时余额  弹框
            openActiveTimeMoney(){
                this.$refs.activeTimeMoney.open()
            },
            closeActiveTimeMoney(){
                this.$refs.activeTimeMoney.close()
            },
        },
        computed: {
            ...mapState(['userInfo'])
        },
        components:{
            uniLoadMore,
            uniPopup,
        },
    }
</script>

<style scoped lang="scss">
    @import "css/style";
    @import "css/alert";
    *{
        font-size: $uni-font-size-base;
    }
    .banner-image{
        background-image:linear-gradient(90deg,rgba(122,196,255,1),rgba(57,149,255,1));
    }
    .record-box-title{
        color: #333333;
        padding: $uni-spacing-row-base;
    }
</style>
