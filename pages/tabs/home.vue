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

		<br>
		<br>
		<br>
		<view @click="goPage2()">
			去商品评论页面
		</view>

		<br>
		<br>
		<br>
		<view @click="goPage3()">
			去搜索页面
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
			},
			goPage2(){
				this.$openPage('goods_evaluate')
			},
			goPage3(){
				this.$openPage('search_with_hot_history')
			},
		},
	}
</script>

<style>
</style>
