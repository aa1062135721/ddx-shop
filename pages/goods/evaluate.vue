<template>
	<view class="container">
        <view class="tags">
            <text class="on">全部</text>
            <text>有图(50)</text>
            <text>好评(10000)</text>
            <text>差评(5)</text>
            <text>有图(50)</text>
            <text>好评(10000)</text>
            <text>差评(5)</text>
        </view>
        <block v-for="(txt, index) in list" :key="index">
		    <evaluate :data="txt"></evaluate>
        </block>
        <view v-if="list.length === 0" style="text-align: center;">
            暂无评论
        </view>
	</view>
</template>

<script>
	import evaluate from '@/components/goods/evaluate.vue'
	export default {
		data() {
			return {
				list: [
				    {
						header_img: "http://cs.zhangkaixing.com/face/face_2.jpg",
						user_name: "测试1",
						rate: 5,
						create_time: "2019-04-12",
						content: "好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评好评",
                        specification:'尺寸：L、 颜色：黑色',
						imgs: [
							'http://cs.zhangkaixing.com/face/face.jpg',
							'http://cs.zhangkaixing.com/face/p10.jpg',
							'http://cs.zhangkaixing.com/face/face_14.jpg',
							'http://cs.zhangkaixing.com/face/face.jpg',
							'http://cs.zhangkaixing.com/face/p10.jpg',
						]
					},
					{
						content: "中评",
						create_time: "2019-04-12",
						header_img: "http://cs.zhangkaixing.com/face/face_12.jpg",
						user_name: "测试2",
						rate: 4,
                        specification:'尺寸：L',
						// imgs:[]
					},
					{
						content: "",
						create_time: "2019-04-12",
						header_img: "http://cs.zhangkaixing.com/face/face_15.jpg",
						user_name: "测试3",
						rate: 2,
						// imgs:[]
					}, {
						content: "好评",
						create_time: "2019-04-12",
						header_img: "http://cs.zhangkaixing.com/face/face_2.jpg",
						user_name: "测试1",
						rate: 5,
						imgs: [
							'http://cs.zhangkaixing.com/face/face.jpg',
							'http://cs.zhangkaixing.com/face/p10.jpg',
							'http://cs.zhangkaixing.com/face/face_14.jpg',
							'http://cs.zhangkaixing.com/face/face.jpg',
							'http://cs.zhangkaixing.com/face/p10.jpg',
						]
					},
					{
						content: "中评",
						create_time: "2019-04-12",
						header_img: "http://cs.zhangkaixing.com/face/face_12.jpg",
						user_name: "测试2",
						rate: 3.5,
                        specification:'尺寸：L',
						// imgs:[]
					},
					{
						content: "",
						create_time: "2019-04-12",
						header_img: "http://cs.zhangkaixing.com/face/face_15.jpg",
						user_name: "测试3",
						rate: 2.3,
                        specification:'尺寸：L',
						// imgs:[]
					}
				]
			}
		},
		methods: {

		},
		onLoad() {

		},
		components: {
			evaluate,
		}
	}
</script>

<style lang="scss">
    page{
        background: #fff;
    }
	.container {
        .tags{
            padding:$uni-spacing-col-base;
            padding-bottom: none;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            flex-wrap: wrap;
            text{
                background: #fff;
                border: 1upx solid #F2F2F2;
                color: $color-primary-plain;
                font-size: $uni-font-size-base;
                margin-right: 20upx;
                margin-bottom: 20upx;
                padding:10upx 24upx;
                border-radius:4upx;
                &.on{
                    color: $color-primary;
                    border: 1upx solid $color-primary;
                    background: #FAE8E8;
                }
            }

        }
    }
</style>
