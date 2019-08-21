<template>
    <div>
        登录页面
		<button @click="login()">登录</button>
    </div>
</template>

<script>
	import {mapMutations,mapActions} from 'vuex'
    export default {
        name: "login",
		methods:{
			login(){
			this.saveToken("tokenssssssssssssssssssssssssssssssssssss")
            uni.navigateBack({
                delta: 2
            });
			},
			...mapActions(['saveToken', 'saveUserInfo'])
		}
    }
</script>

<style scoped>

</style>
