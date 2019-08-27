<template>
	<div>
		首页页面
		<view @click="goPage()">
			去搜索商品
		</view>
	
		<br>
		<br>
		<br>
		<view @click="goPage1()">
			去商品详情
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: '首页'
			}
		},
		onLoad() {

		},
		methods: {
			goPage(){
				this.$openPage('goods_search')
			},
			goPage1(){
				this.$openPage('goods_detail')
			}
		}
	}
</script>

<style>
</style>
