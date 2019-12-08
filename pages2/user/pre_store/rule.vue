<template>
  <div class="recharge">
    <div class="privilege">
      <div class="privilege-title">活动介绍</div>
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
    <div class="privilege">
      <div class="privilege-title">活动细则</div>
      <div class="privilege-box">
        <div class="privilege-box-item">
          <div class="right">1. 本活动预存金额仅限捣蛋熊猫线上商城消费使用，消费时长无限制；</div>
        </div>
        <div class="privilege-box-item">
          <div class="right">2. 参与本活动获得的赠礼，从办理本活动次日（遇非工作日顺延）开始计算，限时30天内使用完。</div>
        </div>
        <div class="privilege-box-item">
          <div class="right">3. 赠礼可转赠亲友，但不可兑换现金，不能延期，逾期不可使用；</div>
        </div>
        <div class="privilege-box-item">
          <div class="right">4. 双胞胎可共用赠礼，但赠送次数为一个宝贝15次。（注：其他双孩家庭不可共用赠礼）；</div>
        </div>
        <div class="privilege-box-item">
          <div class="right">5. 线上会员福利以“熊猫商城”会员福利和会员规则为准。</div>
        </div>
      </div>
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
</style>