<template>
	<view class="container">
		<view class="address">
			<view class="a-input">
				<view class="name">
					收货人
				</view>
				<view class="value">
					<input type="text" placeholder="请输入收货人姓名" v-model="address.name">
				</view>
			</view>
			<view class="a-input">
				<view class="name">
					手机号码
				</view>
				<view class="value">
					<input type="number" placeholder="请输入收货人手机号码" v-model="address.phone" maxlength="11">
				</view>
			</view>
			<view class="a-input">
				<view class="name">
					所在地区
				</view>
				<picker class="value" mode="multiSelector" :value="multiIndex" :range="multiArray" range-key="area_name"  @change="bindMultiPickerChange"  @columnchange="bindMultiPickerColumnChange" >
					<view>
						{{address.area_names || '请选择地址'}}
<!--						<input placeholder="请选择地址" disabled="true" v-model="address.area_names">-->
					</view>
				</picker>
			</view>
			<view class="a-input">
				<view class="name">
					详细地址
				</view>
				<view class="value" style="width: 70%;">
					<input type="text" placeholder="请输入详细地址" v-model="address.address">
				</view>
			</view>
			<view class="a-input">
				<view class="name">
					默认地址
				</view>
				<view class="value">
					<input type="text" placeholder="设置为默认地址" disabled="true">
				</view>
				<view class="value2">
					 <switch :checked="address.default ? true : false" color="#31BF1A" style="transform:scale(0.7)" @change="switch1Change" />
				</view>
			</view>
		</view>

		<view class=btns>
			<button type="warn" class="save" @click="saveAddress">保存地址</button>
			<button type="warn" class="del" v-if="address.id" @click="detAddress(address.id)">删除地址</button>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'

	export default {
		name: "address_add",
		data(){
			return {
				multiIndex: [0, 0, 0],
				multiArray: [[], [], []],
				address:{
					id: '',//传入id表示编辑，反之为新增
					name: '',
					phone: '',
					area_ids: '',//城市id，使用 逗号隔开  31231,32131,312312
					area_names: '', //城市名称，使用 逗号隔开  城市1，城市2，城市3
					default: 0,//	是否默认：1默认，0不默认
					address: '',
					id_info:[],
				}
			}
		},
		async onLoad() {
			// 解析路由参数
			console.log("带过来的参数",this.$parseURL())
			if (this.$parseURL().id){
				uni.setNavigationBarTitle({
					title: '编辑收货地址'
				})
				await this.getAddressInfo(this.$parseURL().id)
				let area_arr = this.$parseURL().area_ids.split(",")
				let area1 = await this.getCity()
				let area2 = await this.getCity(area_arr[0])
				let area3 = await this.getCity(area_arr[1])
				this.multiArray = [area1, area2, area3]
				area1.forEach((item, index) => {
					if (item.id.toString() === area_arr[0]){
						console.log(index)
						this.multiIndex[0] = index
						this.$set(this.multiIndex, 0, index)
					}
				})
				area2.forEach((item, index) => {
					if (item.id.toString() === area_arr[1]){
						console.log(index)
						this.multiIndex[1] = index
						this.$set(this.multiIndex, 1, index)
					}
				})
				area3.forEach((item, index) => {
					if (item.id.toString() === area_arr[2]){
						console.log(index)
						this.multiIndex[2] = index
						this.$set(this.multiIndex, 2, index)
					}
				})
				this.$forceUpdate()
			} else {
				let area1 = await this.getCity()
				let area2 = await this.getCity(area1[0].id)
				let area3 = await this.getCity(area2[0].id)
				this.multiArray = [area1, area2, area3]
				this.$forceUpdate()
			}
		},
		methods: {
			_goPage(url, query = {}){
				this.$openPage({name:url, query})
			},
			async detAddress(id){
				try {
					const res = await this.$minApi.addressDel({id})
					if (res.code === 200) {
						uni.navigateBack()
					}
				} catch (err) {
					console.log(err)
				}
			},
			async getAddressInfo(id){
				try {
					const res = await this.$minApi.addressInfo({id})
					if (res.code === 200) {
						this.address = res.data
					}
				} catch (err) {
					console.log(err)
				}
			},
			async getCity(id){
				let arr = []
				try {
					const res = await this.$minApi.city({id})
					// console.log(res)
					if (res.code === 200) {
						arr =  res.data
					}
				} catch (err) {
					console.log(err)
				}
				return arr
			},
			async bindMultiPickerColumnChange(e) {
				this.multiIndex[e.detail.column] =  e.detail.value
				switch (e.detail.column) {
					case 0:
						this.multiArray[1] = await this.getCity(this.multiArray[0][e.detail.value].id)
						this.multiArray[2] = await this.getCity(this.multiArray[1][0].id)
						this.multiIndex[1] = 0
						this.multiIndex[2] = 0
						break
					case 1:
						this.multiArray[2] = await this.getCity(this.multiArray[1][e.detail.value].id)
						this.multiIndex[2] = 0
						break
					case 2:
						break
				}
				this.$forceUpdate();
				console.log(this.multiIndex)
			},
			bindMultiPickerChange(e){
				if (this.multiArray[2].length){
					this.address.area_ids = `${this.multiArray[0][this.multiIndex[0]].id},${this.multiArray[1][this.multiIndex[1]].id},${this.multiArray[2][this.multiIndex[2]].id}`
				} else {
					this.address.area_ids = `${this.multiArray[0][this.multiIndex[0]].id},${this.multiArray[1][this.multiIndex[1]].id}`
				}
				if (this.multiArray[2].length) {
					this.address.area_names = `${this.multiArray[0][this.multiIndex[0]].area_name},${this.multiArray[1][this.multiIndex[1]].area_name},${this.multiArray[2][this.multiIndex[2]].area_name}`
				} else {
					this.address.area_names = `${this.multiArray[0][this.multiIndex[0]].area_name},${this.multiArray[1][this.multiIndex[1]].area_name}`
				}
				console.log(this.multiIndex)
			},
			switch1Change(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				if (e.target.value){
					this.address.default = 1
				} else {
					this.address.default = 0
				}
			},
			async saveAddress(){
				if (
					!this.isEmpty(this.address.name, '输入收货人姓名') ||
					!this.isPoneAvailable(this.address.phone, true) ||
					!this.isEmpty(this.address.area_ids, '请选择地址') ||
					!this.isEmpty(this.address.address, '输入详细地址')
				){
					return
				}
				let data = {
					name: this.address.name,
					phone: this.address.phone,
					area_ids: this.address.area_ids,
					area_names: this.address.area_names,
					address: this.address.address,
					id: this.address.id,
					default: this.address.default,
				}
				try {
					const res = await this.$minApi.addressAddOrEdit(data)
					console.log(res)
					if (res.code === 200) {
						uni.navigateBack()
					}
				} catch (err) {
					console.log(err)
				}
			},
			upIdInfo(){
				if (this.$parseURL().id){
					console.log('编辑的时候，编辑身份证信息')
					this._goPage('id_card_authentication', {address_id: this.$parseURL().id})
				} else {
					this._goPage('id_card_authentication')
				}
			},
		},
		components: {
			uniCollapse,
			uniCollapseItem,
		}
	}
</script>

<style scoped lang="scss">
	*{
		font-size: $uni-font-size-base;
		overflow: hidden;
	}
	.container{
		font-size: $uni-font-size-base;
		.address{
			margin-top: $uni-spacing-col-base;
			margin-bottom: $uni-spacing-col-base * 3;
			background: #fff;
			display:flex;
			flex: 1;
			flex-direction: column;
			padding-left:$uni-spacing-col-base;
			padding-right:$uni-spacing-col-base;
			.a-input{
				border-bottom: 1upx solid #CCCCCC;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				width:100%;
				height:100upx;
				line-height: 100upx;
				.name{
					width: 30%;
				}
				.value{
					width: 60%;
				}
				&:last-child{
					border: none;
					.value{
						width: 50%;
					}
					.value2{
						width: 20%
					}
				}
			}
			&:last-child{
				margin-bottom: 0;
				border: none;
			}
			.tips{
				padding: 46upx 0;
				font-size: $uni-font-size-base;
				.title{
					width: 100%;
					text-align: left;
					color: #F82B2B;
					margin-bottom: 18upx;
				}
				.text{
					width: 100%;
					text-align: justify;
					color: #808080;
				}
			}
		}
		.btns{
			margin-top: $uni-spacing-col-base * 3;
			padding: $uni-spacing-col-base;
			.save{
				background: $color-primary;
				color: #FFFFFF;
				margin-bottom: 20upx;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: $uni-font-size-base;
			}
			.del{
				background: #FFFFFF;
				color: $color-primary;
				border: 1upx solid $color-primary;
				box-sizing: border-box;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: $uni-font-size-base;
			}
		}
	}
</style>
