<template>
  <div>
    <!-- #ifdef H5 -->
    <div id="my-h5-back" @click="_goBack"></div>
    <!-- #endif -->
    <div class="bg">
      <img src="./bg.jpg" />
    </div>
    <luBarTabNav :tabList="tabList" :barFixed="barFixed" :barId="barId" ref="barTabNav">
      <div class="goods-box">
        <view id="item1" class="goods">
          <view class="type">
            <div class="icon-left"></div>
            <div class="typeTitle">爆款推荐</div>
            <div class="icon-right"></div>
          </view>
          <div class="hot-goods">
            <div class="hot-img">
              <img src="./shop.jpg" />
            </div>
            <div class="hot-info">
              <div class="content">露安适甜睡新生护理礼盒护理礼盒 1盒装</div>
              <div class="hot-price">
                <div class="price-left">
                  <div class="old">原价399</div>
                  <div class="new">促销价:</div>
                </div>
                <div class="price-right">199</div>
              </div>
              <div class="hot-btn">立即购买</div>
            </div>
          </div>
        </view>
        <view id="item2" class="goods">
          <view class="type">
            <div class="icon-left"></div>
            <div class="typeTitle">母婴用品</div>
            <div class="icon-right"></div>
          </view>
          <div class="typeGoods">
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
          </div>
        </view>
        <view id="item3" class="goods">
          <view class="type">
            <div class="icon-left"></div>
            <div class="typeTitle">童鞋童装</div>
            <div class="icon-right"></div>
          </view>
          <div class="typeGoods">
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
          </div>
        </view>
        <view id="item4" class="goods">
          <view class="type">
            <div class="icon-left"></div>
            <div class="typeTitle">家居清洁</div>
            <div class="icon-right"></div>
          </view>
          <div class="typeGoods">
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
            <div class="goods-item">
              <img src="./6.png" />
            </div>
          </div>
        </view>
      </div>
    </luBarTabNav>
  </div>
</template>

<script>
import luBarTabNav from "@/components/lu-bar-tab-nav/lu-bar-tab-nav.vue";
export default {
  name: "newcomer", // 新人专享
  data() {
    return {
      barFixed: true,
      barTop: 0,
      iconShow: true,
      barId: "0",
      tabList: [
        // {
        //   text: "爆款推荐",
        //   navTarget: "#item1",
        // },
        // {
        //   text: "母婴用品",
        //   navTarget: "#item2"
        // },
        // {
        //   text: "童装童鞋",
        //   navTarget: "#item3"
        // },
        // {
        //   text: "家居清洁",
        //   navTarget: "#item4"
        // }
      ],
      // 类型id 数组,
      typeID: [],
      // 爆款数组
      hotList: [],
      // 普通数组
      typeList: []
    };
  },
  components: { luBarTabNav },
  onPageScroll(res) {
    // console.log("距离", res.scrollTop); // 距离页面顶部距离
    this.$refs.barTabNav._selectedTab(res.scrollTop);
  },
  created() {
    this._getType();
  },
  methods: {
    // 获取类型接口
    _getType() {
      this.$minApi
        .newmanType({
          type: 2
        })
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            res.data.data.forEach((item, index) => {
              let obj = {
                text: item.title,
                navTarget: `#${index}`
              };
              this.tabList.push(obj);
              this.typeID.push(item.id);
            });
            this._getGoods();
          }
        });
    },

    // 获取商品
    _getGoods() {
      // console.log(this.typeID)
      this.typeID.forEach(item => {
        console.log(item);
        this.$minApi.newmanList({
          st_id:item
        }).then(res=>{
          console.log("输出每个类型的商品",res.data.data)
        })
      });
    },

    _goPage(url, query = {}) {
      this.$openPage({ name: url, query });
    },

    // 返回按钮
    _goBack() {
      uni.navigateBack();
    },

    _go(idx) {
      this.num = idx;
      console.log(this.num);
    }
  }
};
</script>

<style scoped lang="scss">
.bg {
  width: 100%;
  height: 1016upx;
  img {
    width: 100%;
  }
}
.nav {
  width: 100%;
  height: 88upx;
  background-color: #fff;
  color: #333333;
  font-size: 26upx;
  .nav-item {
    width: 25%;
    height: 88upx;
    line-height: 88upx;
    text-align: center;
    float: left;
    &.active {
      background-color: #d2251e;
    }
  }
}
.goods-box {
  padding: 0 20upx;
  background-color: #be0c13;
  .goods {
    .type {
      height: 110upx;
      line-height: 110upx;
      text-align: center;
      color: #fff;
      font-weight: 450;
      & > div {
        display: inline-block;
      }
      .typeTitle {
        margin: 0 15upx;
      }
      .icon-left {
        width: 114upx;
        height: 28upx;
        background: url(./left.png) no-repeat;
        background-size: 100% 100%;
      }
      .icon-right {
        width: 114upx;
        height: 28upx;
        background: url(./right.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .hot-goods {
      width: 710upx;
      height: 388upx;
      box-sizing: border-box;
      border-radius: 10upx;
      background-color: #fdecc2;
      padding: 30upx;
      margin-bottom: 24upx;
      & > div {
        float: left;
      }
      &.right {
        & > div {
          float: right;
        }
        .hot-img {
          margin-right: 0;
          margin-left: 20upx !important;
        }
      }
      .hot-info {
        .content {
          margin-top: 10upx;
          color: #333333;
          font-size: 30upx;
          width: 302upx;
          line-height: 40upx;
          font-weight: 400;
        }
        .hot-price {
          margin-top: 20upx;
          // display: flex;
          // justify-content: space-between;
          // align-items: flex-end;
          color: #f81f1f;
          font-size: 30upx;
          & > div {
            display: inline-block;
          }
          .old {
            font-size: 24upx;
            text-decoration: line-through;
            color: #999999;
          }
          .price-right {
            font-size: 84upx;
            font-weight: bold;
            margin-left: 10upx;
          }
        }
        .hot-btn {
          width: 142upx;
          line-height: 48upx;
          margin-top: 20upx;
          text-align: center;
          background-color: #e30c14;
          color: #fff;
          font-size: 26upx;
          border-radius: 10upx;
        }
      }
      .hot-img {
        width: 328upx;
        height: 328upx;
        margin-right: 20upx;
        border-radius: 10upx;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .typeGoods {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .goods-item {
        width: 348upx;
        height: 512upx;
        margin-bottom: 14upx;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
