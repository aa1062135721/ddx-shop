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
		//tabs
		{
			path: 'pages/tabs/home',
			type: 'switchTab',
			name: 'home',
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
			path: 'pages/tabs/category',
			type: 'switchTab',
			name: 'category',
			login: false
		},

		//public
		{
			path: 'pages/public/login-with-mobile-public',
			type: 'navigateTo',
			name: 'login-with-mobile-public',
			login: false
		},
		{
			path: "pages/public/search-with-hot-history",
			type: 'navigateTo',
			name: 'search_with_hot_history',
			login: false
		},

		//address pages2
		{
			path: 'pages2/address/list',
			type: 'navigateTo',
			name: 'address_list',
			login: true
		},
		{
			path: 'pages2/address/chooses',
			type: 'navigateTo',
			name: 'address_chooses',
			login: true
		},
		{
			path: 'pages2/address/add',
			type: 'navigateTo',
			name: 'address_add',
			login: true
		},

		//order pages
		{
			path: "pages/order/submit",
			type: 'navigateTo',
			name: 'order_submit',
			login: true
		},
		{
			path: "pages/order/result",
			type: 'redirectTo',
			name: 'order_result',
			login: true
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
			path: "pages/order/detail",
			type: 'redirectTo',
			name: 'order_detail_redirect',
			login: true
		},
		{
			path: "pages/order/evaluate",
			type: 'navigateTo',
			name: 'order_evaluate',
			login: true
		},
		{
			path: "pages/order/pay",
			type: 'redirectTo',
			name: 'order_pay',
			login: true
		},
		{
			path: "pages/order/pay",
			type: 'navigateTo',
			name: 'order_pay_navigate',
			login: true
		},

		//goods pages
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
			path: "pages/goods/detail",
			type: 'redirectTo',
			name: 'goods_detail_redirect',
			login: false
		},
		{
			path: "pages/goods/evaluate",
			type: 'navigateTo',
			name: 'goods_evaluate',
			login: false
		},

		//web-view pages
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

		//group-buy pages
		{
			path: "pages/group-buy/group-buy",
			type: 'navigateTo',
			name: 'group_buy',
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
			path: "pages/group-buy/group",
			type: 'redirectTo',
			name: 'group_buy_group_redirect',
			login: false
		},

		//user pages & pages2
		{
			path: "pages2/user/setting",
			type: 'navigateTo',
			name: 'setting',
			login: true
		},
		{
			path: "pages2/user/id-card-authentication",
			type: 'navigateTo',
			name: 'id_card_authentication',
			login: true
		},
		{
			path: "pages2/user/id-card-authentication-detail",
			type: 'navigateTo',
			name: 'id_card_authentication_detail',
			login: true
		},
		{
			path: "pages/user/feedback",
			type: 'navigateTo',
			name: 'feedback',
			login: true
		},
		{
			path: "pages2/user/money",
			type: 'navigateTo',
			name: 'user_money',
			login: true
		},
		{
			path: "pages2/user/money",
			type: 'redirectTo',
			name: 'user_money_redirect',
			login: true
		},
		{
			path: "pages2/user/modify-mobile",
			type: 'navigateTo',
			name: 'user_modify_mobile',
			login: true
		},
		{
			path: "pages2/user/distribution",
			type: 'navigateTo',
			name: 'user_distribution',
			login: true
		},
		{
			path: "pages2/user/distribution",
			type: 'redirectTo',
			name: 'user_distribution_redirect',
			login: true
		},
		{
			path: "pages2/user/distribution/sum-customer",
			type: 'navigateTo',
			name: 'user_distribution_sum_customer',
			login: true
		},
		{
			path: "pages2/user/distribution/sum-order",
			type: 'navigateTo',
			name: 'user_distribution_sum_order',
			login: true
		},
		{
			path: "pages2/user/distributor",
			type: 'navigateTo',
			name: 'user_distributor',
			login: true
		},
		{
			path: "pages2/user/distribution/invite-friends",
			type: 'navigateTo',
			name: 'user_invite_distributor',
			login: true
		},
		{
			path: "pages2/user/money/recharge",
			type: 'navigateTo',
			name: 'user_recharge',
			login: true
		},
		{
			path: "pages2/user/money/time-money",
			type: 'navigateTo',
			name: 'user_time_money',
			login: true
		},
		{
			path: "pages2/user/money/available-balance",
			type: 'navigateTo',
			name: 'user_available-balance',
			login: true
		},
		{
			path: "pages2/user/money/withdrawal-amount",
			type: 'navigateTo',
			name: 'user_withdrawal_amount',
			login: true
		},
		{
			path: "pages2/user/distribution/sum-fans",
			type: 'navigateTo',
			name: 'user_distribution_sum_fans',
			login: true
		},
		{
			path: "pages2/user/card/list",
			type: 'navigateTo',
			name: 'user_card_list',
			login: true
		},

		//spike 秒杀详情
		{
			path: "pages/spike/list",
			type: 'navigateTo',
			name: 'spike_list',
			login: false
		},
		{
			path: "pages/spike/detail",
			type: 'navigateTo',
			name: 'spike_detail',
			login: false
		},

		//logistics 查看物流 pages2
		{
			path: "pages2/logistics/view",
			type: 'navigateTo',
			name: 'logistics_view',
			login: true
		},

		//order_return pages2
		{
			path: "pages2/order_return/refund",
			type: 'navigateTo',
			name: 'order_return_refund',
			login: true
		},
		{
			path: "pages2/order_return/status",
			type: 'navigateTo',
			name: 'order_return_status',
			login: true
		},
		{
			path: "pages2/order_return/apply",
			type: 'navigateTo',
			name: 'order_return_apply',
			login: true
		},

		// 新人专场
		{
			path: "pages/newcomer/newcomer",
			type: 'navigateTo',
			name: 'newcomer',
			login: true
		},

		//预存享福利活动规则
		{
			path:"pages2/user/pre_store/rule",
			type:'navigateTo',
			name:'rule',
			login:true
		},

		//卡片详情
		{
			path:"pages2/user/pre_store/details",
			type:'navigateTo',
			name:'detail',
			login:true
		},

		//预存享福利首页
		{
			path:"pages2/user/pre_store/main",
			type:'navigateTo',
			name:'pre_store',
			login:true
		},

		//专题首页
		{
			path:"pages/thematic/thematic",
			type:'navigateTo',
			name:'thematic',
			login:false
		},

		//活动页面，消毒水 衍生 中国灸
		{
			path: "pages/activity20200217/index",
			type: 'navigateTo',
			name: 'activity20200217',
			login: false
		},

		// 优惠券
		{
			path:"pages/user/coupon/list",
			type:'navigateTo',
			name:'coupon_list',
			login:true
		},
		{
			path:"pages/user/coupon/details",
			type:'navigateTo',
			name:'coupon_details',
			login: true
		},

		//活动页面，20200308女神节
		{
			path: "pages/activity20200308/index",
			type: 'navigateTo',
			name: 'activity20200308',
			login: false
		},
	]
})

export default router
