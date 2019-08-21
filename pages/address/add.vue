<template>
	<div>
		收货地址新增
	</div>
</template>

<script>
	export default {
		name: "address_add",
		onLoad() {
			// 解析路由参数
			console.log("带过来的参数",this.$parseURL())
		},
		method: {

		}
	}
</script>

<style>
</style>
