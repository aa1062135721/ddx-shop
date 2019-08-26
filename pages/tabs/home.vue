<template>
	<div>
		首页页面
		<view @click="goPage()">
			去搜索商品
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
			}
		}
	}
</script>

<style>
</style>
