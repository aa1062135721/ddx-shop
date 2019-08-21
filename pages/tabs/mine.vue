<template>
    <div>
        我的
		<br>
		<span @click="goAddressList()">去地址管理页面</span>
    </div>
</template>

<script>
    export default {
        name: "mine",
		methods: {
			goAddressList(){
			this.$openPage('address_list')	
			}
		}
    }
</script>

<style scoped>

</style>
