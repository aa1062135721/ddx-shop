<template>
    <div>
        收货地址列表
        <button @click="goadd()">新增收货地址</button>
    </div>
</template>

<script>
    export default {
        name: "address_list",
		onLoad() {
			// 解析路由参数
			console.log("带过来的参数",this.$parseURL())
		},
        methods:{
            goadd(){
                this.$openPage({name: 'address_add', query: {id:123,boolean_a:true,url:''}})
            }
        }
    }
</script>

<style scoped>

</style>
