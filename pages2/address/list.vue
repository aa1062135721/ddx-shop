<template>
	<view class="container">
		<view class="list-all">
			<view class="a-list" v-for="(item, index) in list" :key="index">
				<view class="info">
					<view class="name-moblie">
						<view class="name">{{item.name}} <span class="tag-real-name" v-if="item.attestation">已实名</span></view>
						<view class="mobile">{{item.phone}}</view>
					</view>
					<view class="detail">
						<view class="detail-left">
							<span class="tag-span" v-if="item.default">默认</span>
							<view class="text">{{item.addres}}</view>
						</view>
						<view class="detail-right" @click="goToAddOrEdit(item)">
							<i class="iconfont icon-ddx-shop-bianji"></i>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more status="noMore" v-if="list.length === 0"></uni-load-more>
		<view class="fixed"  @click="goToAddOrEdit()">
			<span class="iconfont icon-ddx-shop-anonymous-iconfont icon-color"></span>
			新增收货地址
		</view>
	</view>

</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
    export default {
        name: "address_list",
		components: {
			uniLoadMore
		},
		data(){
        	return {
				list:[
					// {
					// 	id: 2,    //id
					// 	name: "任坤红",       //名称
					// 	phone: "13028331292",
					// 	area_ids: "110000,110100,110102",
					// 	area_names: "广东省,广州市,东莞市",
					// 	address: "广州塔23层",
					// 	default: 0,       //1默认，0不默认
					// 	addres: "广东省 广州市东莞市广州塔23层"   //地址
					// },
				],
			}
		},
		onLoad() {
			// 解析路由参数
			console.log("带过来的参数",this.$parseURL())
		},
		onShow(){
			this.loadData()
		},
        methods:{
            goToAddOrEdit(val = {}){
                this.$openPage({name: 'address_add', query: val})
            },
			loadData(){
				this.$minApi.addressList().then(res => {
					console.log(res)
					if (res.code === 200) {
						this.list = res.data
					}
				}).catch(err => {
					console.log(err)
				})
			},
        }
    }
</script>

<style scoped lang="scss">
	@import './address';
</style>
