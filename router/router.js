import MinRouter from './MinRouter'

/**
 * 页面路由配置信息
 * @param {path} {String} {Require}
 * @param {type} {String} {Default=navigateTo} {'navigateTo', 'switchTab', 'reLaunch', 'redirectTo'}
 * @param {name} {String} {Require} {unique}
 * @param {login} {Boolean} {Require} {Default=false}
 */
const router = new MinRouter({
	routes: [
		{
			path: 'pages/tabs/home',
			type: 'switchTab',
			name: 'home',
			login: false
		},
		{
			path: 'pages/tabs/shop',
			type: 'switchTab',
			name: 'shop',
			login: false
		},
		{
			path: 'pages/tabs/car',
			type: 'switchTab',
			name: 'car',
			login: false
		},
		{
			path: 'pages/tabs/mine',
			type: 'switchTab',
			name: 'mine',
			login: false
		},

		{
			path: 'pages/public/login',
			type: 'navigateTo',
			name: 'login',
			login: false
		},
		{
			path: 'pages/address/list',
			type: 'navigateTo',
			name: 'address_list',
			login: true
		},
		{
			path: 'pages/address/add',
			type: 'navigateTo',
			name: 'address_add',
			login: true
		},
		{
			path: "pages/order/submit",
			type: 'navigateTo',
			name: 'order_submit',
			login: true
		},
		{
			path: "pages/order/result",
			type: 'navigateTo',
			name: 'order_result',
			login: true
		},
		{
			path: "pages/goods/search",
			type: 'navigateTo',
			name: 'goods_search',
			login: false
		},
		{
			path: "pages/goods/detail",
			type: 'navigateTo',
			name: 'goods_detail',
			login: false
		},
		{
			path: "pages/goods/evaluate",
			type: 'navigateTo',
			name: 'goods_evaluate',
			login: false
		},
	
	]
})

export default router
