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
        <view id="item0" class="goods">
          <view class="type">
            <div class="icon-left"></div>
            <div class="typeTitle">{{tabList[0].text}}</div>
            <div class="icon-right"></div>
          </view>
          <div class="hot-goods" v-for="(item,index) in tabList[0].data" :key="index" :class="index % 2 == 1 ? 'right':''" @click="_goPage('newcomer_detail',{id:item.id,item_id:item.item_id})">
            <div class="hot-img">
              <img :src="item.item_pic" />
            </div>
            <div class="hot-info">
              <div class="content">{{item.item_info[0].item_name}}</div>
              <div class="hot-price">
                <div class="new-price">促销价：<span class="word">{{item.item_info[0].price}}</span></div>
                <div class="old-price">原价{{item.item_info[0].old_price}}</div>
              </div>
              <div class="hot-btn">立即购买</div>
            </div>
          </div>
        </view>
        <view :id="item.nav" class="goods" v-for="(item,index) in tabList.slice(1)" :key="index" >
          <view class="type">
            <div class="icon-left"></div>
            <div class="typeTitle">{{item.text}}</div>
            <div class="icon-right"></div>
          </view>
          <div class="typeGoods">
            <div class="goods-item" v-for="(goods,idx) in item.data" :key="idx" @click="_goPage('newcomer_detail',{id:goods.id,item_id:goods.item_id})">
              <img :src="goods.item_pic" class="itemImag"/>
              <p class="goods-word">{{goods.item_name}}</p>
              <div><span class="new">￥{{goods.item_info[0].price}}</span><span class="old">{{goods.item_info[0].old_price}}</span></div>
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
      tabList: [],
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
                navTarget: `#item${index}`,
                nav:`item${index}`,
                id:item.id,
                data:[]
              };
              this.tabList.push(obj);
            });
            this._getGoods();
          }
        });
    },

    // 获取商品
    _getGoods() {
      // console.log(this.typeID)
      this.tabList.forEach(item=>{
        this.$minApi.newmanList({
          st_id:item.id
        }).then(res=>{
          if(res.code == 200){
            item.data = res.data.data
          }
        })
      })
      console.log("处理之后的tabList",this.tabList)
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
      padding: 20upx;
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
          @extend %overflow-2-line;
          margin-top: 30upx;
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
          .old-price {
            font-size: 24upx;
            text-decoration: line-through;
            color: #999999;
          }
          .new-price{
            font-size: 28upx;
            .word{
              font-size: 50upx;
              font-weight: 600;
            }
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
        // margin-right: 20upx;
        margin: 10upx 20upx 0 0 ;
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
        background-color: #fff;
        border-radius: 10upx;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 348upx;
        }
        .goods-word{
          @extend %overflow-2-line;
          height: 70upx;
          margin-top: 10upx;
          margin-bottom: 20upx;
          padding: 0 10upx;
          font-size: 26upx;
          color: #333333;
          font-weight: 400;
        }
        .new{
          font-size: 36upx;
          color: #FC5A5A;
          margin-right: 10upx;
          margin-left: 10upx;
        }
        .old{
          font-size: 24upx;
          color: #999999;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
