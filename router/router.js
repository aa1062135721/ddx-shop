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
			path: 'pages/tabs/group-buy',
			type: 'switchTab',
			name: 'group-buy',
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
			path: 'pages/public/login-with-mobile',
			type: 'navigateTo',
			name: 'login-with-mobile',
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
			path: "pages/goods/search",
			type: 'redirectTo',
			name: 'goods_search_redirect',
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
		{
			path: "pages/public/search-with-hot-history",
			type: 'navigateTo',
			name: 'search_with_hot_history',
			login: false
		},
		{
			path: "pages/order/list",
			type: 'navigateTo',
			name: 'order_list',
			login: true
		},
		{
			path: "pages/order/detail",
			type: 'navigateTo',
			name: 'order_detail',
			login: true
		},
		{
			path: "pages/web-view/web-view",
			type: 'navigateTo',
			name: 'web_view',
			login: false
		},
		{
			path: "pages/web-view/rich-text",
			type: 'navigateTo',
			name: 'rich_text',
			login: false
		},
		{
			path: "pages/tabs/group-buy",
			type: 'switchTab',
			name: 'group_buy_list',
			login: false
		},
		{
			path: "pages/group-buy/detail",
			type: 'navigateTo',
			name: 'group_buy_detail',
			login: false
		},
		{
			path: "pages/group-buy/group",
			type: 'navigateTo',
			name: 'group_buy_group',
			login: false
		},
		{
			path: "pages/user/setting",
			type: 'navigateTo',
			name: 'setting',
			login: true
		},
		{
			path: "pages/user/id-card-authentication",
			type: 'navigateTo',
			name: 'id_card_authentication',
			login: true
		},
		{
			path: "pages/user/feedback",
			type: 'navigateTo',
			name: 'feedback',
			login: true
		},
		{
			path: "pages/spike/detail",
			type: 'navigateTo',
			name: 'spike_detail',
			login: false
		},
	]
})

export default router
