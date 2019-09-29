<template>
	<view class="container">
        <view class="tags">
            <text :class="{'on': who === 1}" @click="clickBtn(1)">全部<block v-if="who === 1">({{count}})</block></text>
            <text :class="{'on': who === 2}" @click="clickBtn(2)">有图<block v-if="who === 2">({{count}})</block></text>
            <text :class="{'on': who === 3}" @click="clickBtn(3)">好评<block v-if="who === 3">({{count}})</block></text>
            <text :class="{'on': who === 4}" @click="clickBtn(4)">中评<block v-if="who === 4">({{count}})</block></text>
            <text :class="{'on': who === 5}" @click="clickBtn(5)">差评<block v-if="who === 5">({{count}})</block></text>
        </view>
        <block v-for="(txt, index) in list" :key="index">
		    <evaluate :evaluate="txt"></evaluate>
        </block>
        <uni-load-more :status="moreStatus" style="margin-bottom: 20upx;"></uni-load-more>
	</view>
</template>

<script>
	import evaluate from '@/components/goods/evaluate.vue'
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

	export default {
		data() {
			return {
                moreStatus: 'loading',//more, noMore, loading
			    who:1,// 1全部
			    requestData:{
			        page: 1,
                    limit: 10,
                    item_id: 0,
                    pic:0,//有图为1  其余不传
                    level:3,//1差评 2中评 3好评
                },
			    count:0,
				list: []
			}
		},
		methods: {
		    async clickBtn(who){
                this.moreStatus = 'loading'
		        this.requestData.page = 1
                this.who = who
                switch (who) {
                    case 1://全部
                        this.requestData.pic = 0
                        this.requestData.level = 0
                        break
                    case 2://有图
                        this.requestData.pic = 1
                        this.requestData.level = 0
                        break
                    case 3://好评
                        this.requestData.pic = 0
                        this.requestData.level = 3
                        break
                    case 4://中评
                        this.requestData.pic = 0
                        this.requestData.level = 2
                        break
                    case 5://差评
                        this.requestData.pic = 0
                        this.requestData.level = 1
                        break
                }
                this.loadData()
            },
            async loadData(){
                this.moreStatus = 'loading'
                let requestData = {
                    item_id: this.requestData.item_id,
                    page: this.requestData.page,
                    limit: this.requestData.limit,
                }
                if (this.requestData.level) {
                    requestData.level = this.requestData.level
                }
                if (this.requestData.pic){
                    requestData.pic = this.requestData.pic
                }
                await this.$minApi.goodsComment(requestData).then(res => {
                    console.log("获取商品评论：",res)
                    if (res.code === 200) {
                        this.count = res.count
                        this.list = res.data
                        if (res.data.length < this.requestData.limit){
                            this.moreStatus = 'noMore'
                        } else {
                            this.moreStatus = 'more'
                        }
                    }
                })
            },
		},
		onLoad() {
            console.log('其他页面带过来的参数：', this.$parseURL())
            //商品评论
            this.requestData.item_id = this.$parseURL().id
            this.loadData()
		},
        async onReachBottom(){
            if (this.moreStatus === 'noMore'){
              return
            }
            this.requestData.page ++
            await this.loadData()
        },
		components: {
			evaluate,
            uniLoadMore,
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
