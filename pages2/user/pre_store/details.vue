<template>
  <view>
    <!-- #ifdef H5 -->
        <div id="my-h5-back" @click="_goBack"></div>
    <!-- #endif -->

      <view class="topCard">
          <view class="avatar"></view>
          <view class="title">{{detail.card_name}}</view>
          <view class="time">{{detail.start_time}}-{{detail.end_time}}</view>
          <view class="btn">立即使用</view>
      </view>
      <view class="cardInfo">
          <view class="infoTitle">卡项信息</view>
          <view class="infoTimeBox">
              <view class="timeText">获得时间：2019-11-02  12:03:35</view>
              <view class="timeText">领取时间：2019-02-03 13:15:25</view>
              <view class="timeText">领取过期时间：2019-02-03  13:15:25</view>
              <view class="timeText">使用过期时间：2019-02-03 13:15:25</view>
          </view>
      </view>
      <view class="cardInfo bottom">
          <view class="infoTitle">使用记录</view>
          <view class="infoTimeBox">
              <view class="timeText">获得时间：2019-11-02  12:03:35</view>
              <view class="timeText">领取时间：2019-02-03 13:15:25</view>
              <view class="timeText">领取过期时间：2019-02-03  13:15:25</view>
              <view class="timeText">使用过期时间：2019-02-03 13:15:25</view>
          </view>
      </view>
  </view>
</template>

<script>
export default {
    name:'detail',
    data(){
        return {
			detail:{}
		}
    },
	
	onLoad(){
		this.detail=this.$parseURL()
	},
	
    methods:{
		
        _goBack(){
            uni.navigateBack()
        },
		
    }
}
</script>

<style lang='scss' scoped>
    .topCard{
        height: 384upx;
        background-color: #fff;
        text-align: center;
        overflow: hidden;
        .avatar{
            width: 100upx;
            height: 100upx;
            margin: 32upx auto;
            border-radius: 50%;
            background: url(./images/avatar.png) no-repeat center center;
            background-size: cover;
        }
        .title{
            margin-bottom:18upx; 
            font-size: 30upx;
            font-weight: 600;
            color: #333333;
        }
        .time{
            font-size: 26upx;
            font-weight: 400;
            color: #999999;
        }
        .btn{
            width: 142upx;
            line-height: 48upx;
            text-align: center;
            background-color: #FCB442;
            color: #fff;
            font-size: 24upx;
            margin: 49upx auto;
        }
    }
    .cardInfo{
        color: #666666;
        background-color: #fff;
        margin-top: 24upx;
        &.bottom{
            height: 474upx;
        }
        .infoTitle{
            line-height: 88upx;
            padding: 0 21upx;
            font-size: 28upx;
            border-bottom: 1px solid #f2f2f2;
        }
        .infoTimeBox{
            padding: 10upx 21upx;
            height: 216upx;
            font-size: 26upx;
            .timeText{
                margin-bottom: 19upx;
            }
        }
    }
</style>