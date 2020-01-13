<template>
  <view class="container" style="background-color: #C20200;">
    <!-- #ifdef H5 -->
    <div id="my-h5-back" @click="_goBack"></div>
    <!-- #endif -->
    <div class="banner"></div>
    <div class="time">
      距离活动结束仅有
      <span class="timeS">{{timer.d}}</span>天
      <span class="timeS">{{timer.h}}</span>:
      <span class="timeS">{{timer.m}}</span>:
      <span class="timeS">{{timer.s}}</span>
    </div>
    <div class="content-nav" :class="isFix ? 'fix' : '' ">
      <div
        class="nav-item"
        v-for="(item,index) in typeList"
        :key="index"
        :style="reqData.st_id == item.id ? {color:active,fontWeight:400} : ''"
        @click="change(item.id)"
      >{{item.title}}</div>
    </div>
    <div class="content">
      <!-- <div class="ad"></div> -->
      <div
        class="item"
        v-for="(item,index) in shopList"
        :key="index"
        @click="_goPage('goods_detail', {id: item.item_id})"
        :class="index == shopList.length-1 ? 'lastItem':''"
      >
        <img :src="item.item_info.pic" class="item-img" />
        <p class="tit">{{item.item_info.title}}</p>
        <div class="bottom">
          <div class="price">
            <span class="min-price">￥{{item.item_info.min_price}}</span>
            <span class="max-price">￥{{item.item_info.max_price}}</span>
          </div>
          <div class="btn">立即购买</div>
        </div>
      </div>
    </div>
    <uni-load-more :status="moreStatus" :show-icon="true" class="load-more" color="#fff"></uni-load-more>
  </view>
</template>

<script>
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
let myTimer = null;
export default {
  data() {
    return {
      timer: {},
      shopList: [],
      typeList: [],
      reqData: {
        st_id: 1,
        page: 1,
        limit: 10
      },
      scrollTop: 0,
      active: "#F0000B",
      isFix: false,
      end_time: null,
      moreStatus: null
    };
  },
  watch: {
    scrollTop() {
      if (this.scrollTop >= 350) {
        this.active = "#F0000B";
      } else {
        this.active = "#F0000B";
      }

      if (this.scrollTop >= 350 && this.shopList.length > 4) {
        this.isFix = true;
      } else {
        this.isFix = false;
      }
    }
  },
  components: {
    uniLoadMore
  },
  onLoad() {
    this._getType();
    this._getList();
    // this.getRTime();
    this.$nextTick(() => {
      myTimer = setInterval(() => {
        this.getRTime();
      }, 1000);
    });
  },
  onUnload() {
    clearInterval(myTimer);
    myTimer = null;
  },
  onPageScroll(res) {
    // console.log("距离", res.scrollTop); // 距离页面顶部距离
    this.scrollTop = res.scrollTop;
  },
  onReachBottom() {
    console.log(1);
    setTimeout(() => {
      if (this.moreStatus == "noMore") {
        return false;
      } else {
        this.reqData.page++;
      }
      this._getList();
    }, 250);
  },
  methods: {
    getRTime() {
      let time_distance = 0; //时间差
      let now_time = new Date().getTime();
      // let end_time = (new Date('2020/1/12 23:59:59')).getTime()
      time_distance = this.end_time - now_time;

      let int_day, int_hour, int_minute, int_second;
      // 天时分秒换算
      int_day = Math.floor(time_distance / 86400000);
      time_distance -= int_day * 86400000;
      int_hour = Math.floor(time_distance / 3600000);
      time_distance -= int_hour * 3600000;
      int_minute = Math.floor(time_distance / 60000);
      time_distance -= int_minute * 60000;
      int_second = Math.floor(time_distance / 1000);

      // 时分秒为单数时、前面加零站位
      if (int_hour < 10) int_hour = "0" + int_hour;
      if (int_minute < 10) int_minute = "0" + int_minute;
      if (int_second < 10) int_second = "0" + int_second;
      this.timer = {
        d: int_day,
        h: int_hour,
        m: int_minute,
        s: int_second
      };
    },

    // 获取类型
    _getType() {
      this.$minApi.thematicType().then(res => {
        console.log(res);
        if (res.code == 200) {
          this.end_time = res.data.end_time * 1000;
          this.typeList = res.data.data;
          this.getRTime();
          console.log(this.typeList);
        }
      });
    },

    // 获取商品列表
    _getList() {
      this.moreStatus = "loading";
      this.$minApi.thematicList(this.reqData).then(res => {
        console.log("商品", res);
        if (res.code == 200) {
          if (this.reqData.page == 1) {
            this.shopList = res.data.data;
          } else {
            this.shopList.push(...res.data.data);
          }
          if (res.data.count == this.shopList.length) {
            this.moreStatus = "noMore";
          } else if (res.data.count > this.shopList.length) {
            this.moreStatus = "more";
          }
        }
      });
    },
    change(idx) {
      this.reqData.st_id = idx;
      this.reqData.page = 1;
      this._getList();
    },

    _goPage(url, query = {}) {
      this.$openPage({
        name: url,
        query
      });
    },

    _goBack() {
      if (getCurrentPages().length === 1) {
        this._goPage("home");
      } else {
        uni.navigateBack();
      }
    }
  }
};
</script>

<style lang="scss">
.container {
  .banner {
    height: 538upx;
    background: url(../../static/images/thematic/thematicBanner.jpg);
    background-size: 100% 100%;
  }

  .time {
    line-height: 88upx;
    background-color: #fffce7;
    color: #222222;
    font-size: 26upx;
    text-align: center;

    .timeS {
      display: inline-block;
      width: 44upx;
      line-height: 44upx;
      text-align: center;
      background-color: #222222;
      color: #ffffff;
      border-radius: 8upx;
      margin: 0 6upx;
    }
  }
  .content-nav {
    width: 690upx;
    height: 98upx;
    border-radius: 8upx;
    margin: 30upx auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #666666;
    font-size: 32upx;
    background-color: #ffffff;
    &.fix {
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 999;
      margin: 0;
      background-color: rgb(250, 217, 169);
      border-radius: 0;
      color: #333333;
    }
  }
  .content {
    background-color: #c20200;
    padding: 40upx 30upx;
    padding-bottom: 0;
    display: flex;
    flex-wrap: wrap;
    .ad {
      width: 100%;
      height: 88upx;
      background: url(../../static/images/thematic/ad.png);
      background-size: 100% 100%;
      margin-bottom: 32upx;
    }

    .item {
      box-sizing: border-box;
      width: 345upx;
      height: 456upx;
      margin-bottom: 16upx;
      background: url(../../static/images/thematic/shopBack.jpg);
      background-size: 100% 100%;
      padding: 0 28upx;
      position: relative;
      //   &.lastItem {
      //     border-radius: 6upx !important;
      //   }
      &:nth-child(2n) {
        border-radius: 0 6upx 6upx 0 !important;
      }
      &:nth-child(1n) {
        border-radius: 6upx 0 0 6upx;
      }
      .item-img {
        width: 284upx;
        height: 284upx;
        margin: 22upx auto;
        margin-bottom: 14upx;
        display: block;
      }
      .tit {
        @extend %overflow-1-line;
        font-size: 26upx;
        color: #222222;
        font-weight: 500;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 8upx;
        .price {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .min-price {
            font-size: 28upx;
            color: #f0000b;
          }
          .max-price {
            font-size: 20upx;
            color: #999999;
            text-decoration: line-through;
          }
        }
        .btn {
          width: 130upx;
          line-height: 36upx;
          text-align: center;
          font-size: 22upx;
          color: #fff;
          border-radius: 6upx;
          background-color: #f0000b;
        }
      }
    }
  }
}
</style>
