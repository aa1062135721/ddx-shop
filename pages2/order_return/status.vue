<template>
    <view>
        <view class="section" @click="_goPage('goods_detail', {id: item_id})">
            <view class="left">
                <image class="img" :src="pic"></image>
            </view>
            <view class="right">
                <view class="title">{{title}}</view>
                <view class="other">{{spec}}</view>
            </view>
        </view>

        <view class="section2">
            <view class="chooses-why" style="justify-content: flex-start;" v-if="responseData.status === 2">
                退款金额：<text style="color: #FC5A5A;">￥{{responseData.money}}</text>
            </view>
            <view class="chooses-why" style="justify-content: flex-start;">
                退款状态：<text style="color: #808080;">{{responseData.status | returnStatus}}</text>
            </view>
            <view class="chooses-why" style="justify-content: flex-start;" v-if="responseData.status === 3">
                失败原因：<text style="color: #808080;">{{responseData.a_remarks}}</text>
            </view>
        </view>

<!--        <view class="section2">-->
<!--            <view class="chooses-why" style="justify-content: flex-start;">-->
<!--                快递公司：<text style="color: #808080;">韵达快递</text>-->
<!--            </view>-->
<!--            <view class="chooses-why2" @click="_goPage('logistics_view')">-->
<!--                <view>快递单号</view>-->
<!--                <view class="chooses-ba">12345678901234567 <text class="iconfont icon-ddx-shop-content_arrows"></text></view>-->
<!--            </view>-->
<!--        </view>-->

        <view class="section-status">
            <view v-if="responseData.sn">
                退款单号：{{responseData.sn}}
            </view>
            <view v-if="responseData.add_time">
                申请时间：{{responseData.add_time}}
            </view>
            <view v-if="responseData.handle_time">
                处理时间：{{responseData.handle_time}}
            </view>
            <view v-if="responseData.remarks">
                退款说明：{{responseData.remarks}}
            </view>
            <view class="chooses-why" v-if="responseData.reason">
                退款原因：{{responseData.reason}}
            </view>
        </view>


    </view>
</template>

<script>
    export default {
        name: "order_return_status",
        data(){
          return {
              title: '', //商品名称
              spec:'', //规格
              pic: '',//商品图片
              item_id: '',//商品id，可以去到商品详情
              responseData:{
                sn: "td2019102950514897",  //退单 单号
                remarks: "我是理由", //备注
                reason: "我是理由",  //原因
                pic: "123123123.jpg",  //退单上传的凭证 图片
                type: 2,  //1退款 2退款退货 3 换货
                add_time: 1572335858,//申请退单时间
                status: 1,//1 为申请中 2 为 同 意 3 为拒绝
                a_remarks: null,//后台拒绝原因
                handle_time:'',//处理审核时间
                money:'',//退单金额
              }
          }
        },
        onLoad(){
            console.log('其他页面带过来的参数：', this.$parseURL())

            this.title = this.$parseURL().title
            this.item_id = this.$parseURL().item_id
            this.spec = this.$parseURL().spec
            this.pic = this.$parseURL().pic
            let data = {
                order_id: this.$parseURL().order_id,
                goods_id: this.$parseURL().goods_id,
            }
            this.$minApi.returnOrderStatus(data).then(res => {
                console.log("请求返回的退单状态数据：",res)
                if (res.code === 200) {
                    this.responseData = res.data
                }
            })
        },
        methods:{
            _goPage(url, query = {}){
                this.$openPage({name:url, query})
            },
        },
        filters:{
            //1 为申请中 2 为 同 意 3 为拒绝
            returnStatus(status){
              let str  = ''
              switch (status) {
                  case 1:
                      str = '申请中'
                      break
                  case 2:
                      str = '同意'
                      break
                  case 3:
                      str = '拒绝'
                      break
              }
              return str
            }
        },
    }
</script>

<style lang="scss">
    @import './return.scss';
</style>
