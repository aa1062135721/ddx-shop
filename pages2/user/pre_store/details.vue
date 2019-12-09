<template>
  <view>
      <view class="topCard">
          <view class="avatar"></view>
          <view class="title">{{detail.card_name}}</view>
          <view class="time">{{detail.start_time}}-{{detail.end_time}}</view>
		  <view class="btn receive" v-if="detail.status==0" @click.stop="activeCard(detail.id)">立即领取</view>
		  <view class="btn receive" style="opacity:0;" v-if="detail.status==3">立即领取</view>
		  <view class="btn use" v-show='detail.status==1' @click.stop="useCard(detail.id)">立即使用</view>
      </view>
      <view class="cardInfo">
          <view class="infoTitle">卡项信息</view>
          <view class="infoTimeBox">
              <view class="timeText">获得时间：{{info.create_time}}</view>
              <view class="timeText">领取时间：{{info.receive_time}}</view>
              <view class="timeText">领取过期时间：{{info.receive_expire_time}}</view>
              <view class="timeText">使用过期时间：{{info.use_expire_time}}</view>
          </view>
      </view>
      <view class="cardInfo bottom">
          <view class="infoTitle">使用记录</view>
          <view class="infoTimeBox">
              <view class="timeText" v-for="(item,index) in history" :key="index" v-if="history.length!=0">{{item.name}} {{item.time}} {{item.service_name}}</view>
              <view class="text" v-if="history.length==0">暂无使用记录</view>
          </view>
      </view>
	  
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
export default {
    name:'detail',
    data(){
        return {
			detail:{},
			code:0,//核销码
			reqData:{
				card_id:0  //请求对象 初始为0 
			},
			info:{},  //卡项信息对象
			history:[] //使用记录数组
		}
    },
	
	onLoad(){
		this.detail=this.$parseURL();
		this.cardInfo()
		console.log(this.history)
	},
	
	components:{
		uniPopup,
	},
	
    methods:{
		
        _goBack(){
            uni.navigateBack()
        },
		
		_goPage(){
			this.$openPage({name:url, query})
		},
		
		//使用卡片接口函数
		useCard(){
			this.reqData.card_id = this.detail.id 
			this.$minApi.useCard(this.reqData).then(res=>{
				// console.log(res)
				if(res.code==200){
					this.code=res.data.code;
					this.$refs.codeBox.open()
				}
			})
		},
		
		//领取卡片接口函数
		activeCard(id){
			this.reqData.card_id = this.detail.id
			this.$minApi.activeCard(this.reqData).then(res=>{
				if(res.code==200){
					this.$refs.successBox.open();
					setTimeout(()=>{
						this.$refs.successBox.close();// 一次性定时器一秒后关闭弹框
						
						// this._goPage('detail',this.detail);//领取成功弹框后 重新跳转页面 刷新并传当前卡片对象过去
						this.cardInfo()
					},1000)
				}
			})
		},
		
		//卡片信息接口函数
		cardInfo(){
			this.reqData.card_id = this.detail.id;
			this.$minApi.cardInfo(this.reqData).then(res=>{
				if(res.code==200){
					console.log(res)
					this.info=res.data.info;
					this.history=res.data.history
				}
			})
		}
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
			&.receive{
			    background-color: #FC5A5A;
			}
			&.use{
			    background-color: #FCB442;
			}
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
			.text{
				text-align: center;
			}
        }
    }
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