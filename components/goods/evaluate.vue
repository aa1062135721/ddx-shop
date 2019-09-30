<template>
	<view class="evaluateBox">
			<view class="item">
				<view class="head">
					<image :lazy-load="true" :src="evaluate.m_pic" mode="widthFix" style="width:100%" />
				</view>
				<view class="info">
					<view class="name-stars">
						<text class="name">{{ evaluate.nickname }}</text>
						<uni-rate  disabled="true" max="5" size="18" :value="evaluate.level" active-color="#FC5A5A" :is-fill="false"></uni-rate>
					</view>
					<view class="time-size">
						<text class="time">{{ evaluate.add_time }}</text>
						<text class="size">{{ evaluate.specs }}</text>
					</view>
					<view class="evaluate-content">
						<text>{{ evaluate.comment || '用户暂未评价' }}</text>
						<view class="imgs" v-if="evaluate.pic.length">
							<block v-for="(imgurl, index) in evaluate.pic" :key="index">
								<view class="imgs-box"><image :lazy-load="true" :src="imgurl" mode="aspectFill" style="width:196upx;height:196upx;" @click="previewImg(imgurl, evaluate.pic)"></image></view>
							</block>
						</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default {
        props: {
            //评价列表数据
            evaluate: {
                type: Object,
                default: {}
            },
        },
        data() {
            return {}
        },
        methods: {
            previewImg(src,urls){
                uni.previewImage({
                    current:src,
                    urls
                })
            }
        },
        components: {
            uniRate
        }
    }
</script>
<style lang="scss" scoped>
.evaluateBox {
	width: 100%;
	margin: 30upx 0;
	.item {
		padding: 20upx;
		display: flex;
		/* height: auto; */
		/* align-items: center; */
		font-size: 22upx;
		color: #999;
		.head {
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 26upx;
			border: 1upx solid #FC5A5A;
		}
		.info {
			flex: 1;
			font-size: 30upx;
			color: #1A1A1A;
			.name-stars{
				display: flex;
				justify-content: flex-start;
				align-items: flex-end;
				padding-bottom: 2upx;
				.name{
					margin-right: 6upx;
				}
			}
			.time-size{
				color: #808080;
				font-size: 24upx;
				display: flex;
				justify-content: flex-start;
				align-items: flex-end;
				.time{
					margin-right: 6upx;
				}
			}
			.evaluate-content {
				color: #1A1A1A;
				font-size: 28upx;
				text-align: left;
				padding-top: 6upx;
				.imgs {
					display: flex;
					flex-wrap: wrap;
					padding-top: 6upx;
					.imgs-box {
						width: 33.33%;
						padding-right: 10upx;
						box-sizing: border-box;
					}
				}
			}
		}
	}
}
</style>
