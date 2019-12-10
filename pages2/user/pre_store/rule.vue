<template>
  <div class="recharge">
<!--
    <div class="privilege">
      <div class="privilege-title" style='color: #333333;'>活动介绍</div>
      <div class="privilege-box">
        <div class="privilege-box-item">
          <div class="left">
            <div class="circle">1</div>
          </div>
          <div class="right color">累计消费 1000元 送2次水育卡；</div>
        </div>
        <div class="privilege-box-item">
          <div class="left">
            <div class="circle">2</div>
          </div>
          <div class="right color">累计消费 2000元 送6次水育卡；</div>
        </div>
        <div class="privilege-box-item">
          <div class="left">
            <div class="circle">3</div>
          </div>
          <div class="right color">累计消费 3000元 送一个月无限水育卡；</div>
        </div>
      </div>
    </div>
 -->
    <div class="privilege">
      <div class="privilege-title">活动细则</div>
      <div class="privilege-box">
        <div class="privilege-box-item">
          <div class="right">1.本活动预存金额仅限捣蛋熊猫线上商城消费使用，消费时长无限制。如有商品退货，退款仅能退入商城会员卡内，但预存金额不可退。</div>
        </div>
        <div class="privilege-box-item">
          <div class="right">2.参与本活动获得的赠礼，从发放赠礼当日开始计算（达标后2日内发送赠礼且不作另行通知，敬请关注会员账户并注意查收），限时30天内使用完毕。逾期不领取或不使用，视作顾客自动放弃，后期不补赠。</div>
        </div>
        <div class="privilege-box-item">
          <div class="right">3.累计消费以“连续一个月”作为是否达标计算单位（如：1月5日第一次消费即到2月5日即为连续一个月）。参与所有活动预存的金额，消费后均不能计入本次累消活动，不能获得累消赠礼。</div>
        </div>
        <div class="privilege-box-item">
          <div class="right">4.赠礼可转赠亲友，但不可兑换现金，不能延期，逾期不可使用。</div>
        </div>
        <div class="privilege-box-item">
          <div class="right">5.双胞胎可共用赠礼，两个宝贝需平分赠礼。如果赠礼是不限次数的情况，则一个宝贝15次。（注：其他双孩家庭不可共用赠礼）</div>
        </div>
        <div class="privilege-box-item">
          <div class="right">6.使用赠礼前请先领取“活动专用水育卡”，在门店使用时需出示“核销码”并登记宝宝姓名和家长电话。（注：请家长自行携带游泳裤，门店一次性游泳裤需另行收费。）</div>
        </div>
        <div class="privilege-box-item">
          <div class="right">7.其他线上会员福利以“熊猫商城”会员福利和会员规则为准。</div>
        </div>
      </div>
    </div>
    <div class="my-footer">
      最终解释权归重庆捣蛋熊科技有限公司所有
    </div>
  </div>
</template>

<script>
export default {
    name:'rule' //活动规则
};
</script>

<style lang='scss' scoped>
* {
  font-size: $uni-font-size-base;
}
.privilege {
  background-color: #ffffff;
  margin-top: 20upx;
  color: #666666;
  .privilege-title {
    @extend %border-color-solid-botton;
    padding: $uni-spacing-row-base;
  }
  .privilege-box {
    padding: 0 $uni-spacing-row-base;
    .privilege-box-item {
      display: flex;
      align-items: center;
      padding: $uni-spacing-row-base 0;
      .color{
          color: #333333;
      }
      .left {
        margin-right: 10upx;
        .circle {
          background: #000;
          color: #FFFFFF;
          border-radius: 50%;
          width: 30upx;
          text-align: center;
          height: 30upx;
          line-height: 30upx;
          font-size: $uni-font-size-sm;
        }
      }
      .right {
        text-align: justify;
      }
    }
  }
}
.my-footer{
  color: #999999;
  padding: 38upx 0;
  text-align: center;
  width: 100%;
}
</style>
