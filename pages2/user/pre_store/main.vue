<template>
  <view>
      <view class="topBox">
          <view class="bg">
              <view class="cardBox">
                  <view class="card">
                      <text class="rule" @click="_goPage('rule')">查看活动规则</text>
                      <view class="userInfo">
                        <view class="avator">
							<image style="width: 100%;height: 100%;" :src="userInfo.pic" v-if="userInfo.id"></image>
							<image style="width: 100%;height: 100%;" src="../../../static/images/head.png" v-else></image>
						</view>
						<text v-if='userInfo.id'>{{userInfo.nickname}}</text>
                        <text v-else>未登录</text>
                      </view>
                      <view class="text">截止今日 当月消费</view>
                      <view class="money">{{money}}元</view>
                  </view>
              </view>
          </view>
          <view class="nav">
              <view class="navItem" 
              v-for="(item,index) in navList" 
              :key="index"
              @click="changeList(index)"
              :class="num==index?'active':''">{{item}}</view>
          </view>
      </view>
      <view class="bottomBox">
          <view class="item" @click="_goPage('detail',item)" v-for="(item,index) in cardList" :key='index'>
              <view class="itemImg" :class="item.status==3?'expired':''"></view>
              <view class="itemWord">
                  <view class="title">{{item.card_name}}</view>
                  <view class="time">{{item.start_time}}-{{item.end_time}}</view>
              </view>
              <view class="itemBtn receive" v-if="item.status==0" @click.stop="activeCard(item.id)">立即领取</view>
			  <view class="itemBtn receive" style="opacity:0;" v-if="item.status==3">立即领取</view>
              <view class="itemBtn use" v-show='item.status==1' @click.stop="useCard(item.id)">立即使用</view>
			  <view class="icon" v-if="item.status==3"></view>
          </view>
          <!-- <view class="item">
              <view class="itemImg"></view>
              <view class="itemWord">
                  <view class="title">活动专用水育卡（2次）</view>
                  <view class="time">2019.11.02-2019.12.24</view>
              </view>
              <view class="itemBtn receive" v-show="false">立即领取</view>
              <view class="itemBtn use" v-show="true">立即使用</view>
          </view>
          <view class="item">
              <view class="itemImg expired"></view>
              <view class="itemWord">
                  <view class="title">活动专用水育卡（2次）</view>
                  <view class="time">2019.11.02-2019.12.24</view>
              </view>
              <view class="itemBtn receive" v-if="isShow" >立即领取</view>
               <view class="itemBtn receive" style="opacity:0;" v-else>立即领取</view>
              <view class="itemBtn use" v-show="false">立即使用</view>
              <view class="icon"></view>
          </view> -->
      </view>
		
		<uni-load-more :status="loadStaus" :show-icon="true" color="#999999"></uni-load-more>
		
		<!-- 核销码展示弹框 -->
        <uni-popup ref="codeBox" type="center">
            <view class="code-box">
                <view class="code-title">核销码</view>
                <view class="code">{{code}}</view>
                <view class="code-word">请将此码出示给工作人员</view>
            </view>
        </uni-popup>
		
		<!-- 领取成功弹框 -->
		<uni-popup ref="successBox" type="center">
			<view class="success">
				<text>领取成功</text>
			</view>
		</uni-popup>
  </view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue' //可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
	import { mapState } from 'vuex'
	export default {
		name:'pre_store',
		data(){
			return{
				loadStaus:'more', //加载状态
				navList:['全部','待领取','待使用','已过期'],//导航列表
				num:0, //判断导航active的数字
				money:0,//消费金额
				code:0,//核销码
				cardList:[],//卡片列表
				requestData:{  //列表请求对象
					page:1,
					limit:10
				},
				idData:{
					card_id:0  //卡片操作请求对象
				}
			}
		},
		onLoad() {
			this._getCardList()  
		},
		methods:{
			
			useCard(id){
				this.idData.card_id = id
				this.$minApi.useCard(this.idData).then(res=>{
					// console.log(res)
					if(res.code==200){
						this.code=res.data.code;
						this.$refs.codeBox.open()
					}
				})
			},
			
			activeCard(id){
				this.idData.card_id = id
				this.$minApi.activeCard(this.idData).then(res=>{
					if(res.code==200){
						this.$refs.successBox.open();
						setTimeout(()=>{
							this.$refs.successBox.close();
							// this._goPage('pre_store');
							this.requestData.page=1;
							this._getCardList();
						},1000)
					}
				})
			},
			
			_goPage(url, query = {}){
				this.$openPage({name:url, query})
			},
			
			_getCardList(num,idx){
				if(num==0){
					this.requestData.status=idx-1
				}else if(num==1){
					 this.requestData={
						 page:this.requestData.page,
						 limit:this.requestData.limit
					 }
				}
				this.$minApi.getCardList(this.requestData).then(res=>{
					this.loadStaus='loading';
					if(res.code==200){
						if(this.cardList.length<res.count){
							this.loadStaus='more';
						}else{
							this.loadStaus='noMore';
						}
						this.money=res.accumulative_total;
						console.log(res.data)
						if(this.requestData.page==1){
							this.cardList=res.data;
						}else{
							let list = this.cardList
							this.cardList=list.concat(res.data)
						}
						
					}
				})
			},
			
			onReachBottom(){
				this.requestData.page++;
				this._getCardList()
			},
			
			changeList(idx){
				// 0 待领取 1待使用 ，3已过期，不传表示全部
				this.num=idx;
				this.requestData.page=1;
				if(idx==0){
					this._getCardList(1)  //如果下标是0  传1 请求全部卡片
				}else{
					this._getCardList(0,idx) // 传0 请求data里带上status 并把下标传过去
				}
			},
		},
		computed:{
			...mapState(['userInfo']),
		},
		components:{
			uniPopup,
			uniLoadMore
		}
	}
</script>

<style lang='scss' scoped>

//顶部
.topBox{
    .bg{
        height: 415upx;
        background-color: #ffffff;
        .cardBox{
            width: 100%;
            height: 100%;
            padding: 0 30upx;
            background: url(./images/cardBg.png) no-repeat center center;
            background-size: cover;
            overflow: hidden;
            .card{
                width: 690upx;
                height: 323upx;
                margin:0 auto;
                margin-top: 92upx;
                padding: 29upx 31upx;
                color: #EFDEB3;
                text-align: center;
                .rule{
                    font-size: 20upx;
                    float: right;
                }
                .userInfo{
                    font-size: 26upx;
                    display: flex;
                    margin-top: 34upx;
                    line-height: 60upx;
                    .avator{
                        width: 60upx;
                        height: 60upx;
                        border-radius: 50%;
                        margin-right: 17upx;
						border: 1px solid #FFFFFF;
						overflow: hidden;
                    }
                }
                .text{
                    font-size: 24upx;
                    margin-top: 36upx;
                }
                .money{
                    font-size: 64upx;
                    margin-top: 30upx;
                    font-weight: 500;
                }
            }
        }
    }
    .nav{
        line-height: 102upx;
        background-color: #fff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 28upx;
        color: #333333;
        .navItem{
            height: 100%;
            box-sizing: border-box;
            &.active{
                color: #FC5A5A;
                border-bottom: 2px solid #FC5A5A;
            }
        }
    }
}

//底部
.bottomBox{
    .item{
        width: 690upx;
        height: 178upx;
        background: url(./images/whiteBg.png) no-repeat center center;
        background-size: cover;
        margin: 27upx;
        display: flex;
        justify-content: space-around;
        align-items: center;
        overflow: hidden;
        position: relative;
        .icon{
            width: 107upx;
            height: 105upx;
            position: absolute;
            top: 0;
            right: 0;
            background: url(./images/expired.png) no-repeat center center;
            background-size: cover;
        }
        .itemImg{
            width: 100upx;
            height: 100upx;
            border-radius: 50%;
            background: url(./images/avatar.png) no-repeat center center;
            background-size: cover;
            &.expired{
                background: url(./images/avatarload.png) no-repeat center center;
                background-size: cover;
            }
        }
        .itemWord{
            .title{
                font-size: 28upx;
                color: #333333;
                margin-bottom: 20upx;
            }
            .time{
                font-size: 24upx;
                color: #999999;
            }
        }
        .itemBtn{
            width: 116upx;
            height: 44upx;
            line-height: 44upx;
            font-size: $uni-font-size-sm;
            text-align: center;
            color: #fff;
            &.receive{
                background-color: #FC5A5A;
            }
            &.use{
                background-color: #FCB442;
            }
        }
    }
}

//弹出层
.code-box{
    width: 488upx;
    height: 398upx;
    border-radius: 20upx;
    text-align: center;
    .code-title{
        font-size: 30upx;
    }
    .code{
        width: 398upx;
        line-height: 180upx;
        background-color: #C9C9C9;
        color: #fff;
        margin: 40upx auto;
        font-size: 72upx;
    }
    .code-word{
        font-size: 24upx;
        color: #999999;
    }
}

.success{
	width: 488upx;
	line-height: 200upx;
	border-radius: 20upx;
	text-align: center;
	color: #333333;
	background-color: #FFFFFF;
	font-size: 42upx;
}
</style>