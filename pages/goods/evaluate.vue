<template>
	<view class="container">
        <view class="tags">
            <text :class="{'on': who === 1}" @click="clickBtn(1)">全部（{{responseData.count}}）</text>
            <text :class="{'on': who === 2}" @click="clickBtn(2)">有图（{{responseData.count_tu}}）</text>
            <text :class="{'on': who === 3}" @click="clickBtn(3)">好评（{{responseData.count_hp}}）</text>
            <text :class="{'on': who === 4}" @click="clickBtn(4)">中评（{{responseData.count_zp}}）</text>
            <text :class="{'on': who === 5}" @click="clickBtn(5)">差评（{{responseData.count_cp}}）</text>
        </view>
        <block v-for="(txt, index) in responseData.list" :key="index">
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
			    requestData:{
			        page: 1,
                    limit: 10,
                    item_id: 0,
                    state: 1,//1:全部 2 ：有图 3：好评 4 中评 5差评
                },
                responseData:{
                    count:0,//全部
                    count_tu:0,//有图
                    count_hp:0,//好评数量
                    count_zp:0,//中评数量
                    count_cp:0,//差评
                    list: [],
                },

			}
		},
		methods: {
		    async clickBtn(who){
                this.moreStatus = 'loading'
		        this.requestData.page = 1
                switch (who) {
                    case 1://全部
                        this.requestData.state = 1
                        break
                    case 2://有图
                        this.requestData.state = 2
                        break
                    case 3://好评
                        this.requestData.state = 3
                        break
                    case 4://中评
                        this.requestData.state = 4
                        break
                    case 5://差评
                        this.requestData.state = 5
                        break
                }
                this.loadData()
            },
            async loadData(){
                this.moreStatus = 'loading'
                await this.$minApi.goodsComment(this.requestData).then(res => {
                    console.log("获取商品评论：",res)
                    if (res.code === 200) {
                        if (this.requestData.page === 1){
                            this.responseData = res.data
                        } else {
                            this.responseData.push(...res.data)
                        }
                        if (res.data.list.length < this.requestData.limit){
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
