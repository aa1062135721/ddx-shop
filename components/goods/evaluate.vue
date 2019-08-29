<template>
	<view class="evaluateBox">
			<view class="item">
				<view class="head">
					<image :src="data.header_img" mode="widthFix" style="width:100%" />
				</view>
				<view class="info">
					<view class="name-stars">
						<text class="name">{{ data.user_name }}</text>
						<uni-rate  disabled="true" max="5" size="18" :value="data.rate" active-color="#FC5A5A" :is-fill="false"></uni-rate>
					</view>
					<view class="time-size">
						<text class="time">{{ data.create_time }}</text>
						<text class="size">{{ data.specification }}</text>
					</view>
					<view class="evaluate-content">
						<text>{{ data.content || '用户暂未评价' }}</text>
						<view class="imgs" v-if="data.imgs.length">
							<block v-for="(imgurl, index) in data.imgs" :key="index">
								<view class="imgs-box"><image :src="imgurl" mode="widthFix" style="width: 100%;" @click="previewImg(imgurl,data.imgs)"></image></view>
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
            data: {
                type: Object,
                default: {
                    header_img: "http://cs.zhangkaixing.com/face/face_2.jpg",
                    user_name: "测试1",
                    rate: 5,
                    create_time: "2019-04-12",
					specification: "尺寸：L 颜色分类：黑色",
                    content: "好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评",
                    imgs: [
                        'http://cs.zhangkaixing.com/face/face.jpg',
                        'http://cs.zhangkaixing.com/face/p10.jpg',
                        'http://cs.zhangkaixing.com/face/face_14.jpg',
                        'http://cs.zhangkaixing.com/face/face.jpg',
                        'http://cs.zhangkaixing.com/face/p10.jpg',
                    ]
                }
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
