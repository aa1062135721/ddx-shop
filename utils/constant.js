/**
 * 当前是开发环境还是生产环境
 */
// export const NODE_ENV = 'development'
export const NODE_ENV = 'production'


/**
 * 生产环境
 */
export const production = {
    baseUrl: 'https://www.ddxm661.com/wxshop', // api http 正式服务器
    appId: 'wxb5ee49b69efc2429', // 捣蛋熊猫商场
    appSecret: 'f775096b8d02d3a34761ccef9796c8f4',
    oldShareholderDataUrl: 'https://www.ddxm661.com/frontend/public/dist/#/home/mall',
    newShareholderDataUrl: 'https://www.ddxm661.com/frontend/public/dist#/shareholder?mobile=',
    projectUrl: 'https://www.ddxm661.com/h5', //商城首页
    shareGoodsDetail: 'https://www.ddxm661.com/h5/pages/goods/detail', // 分享普通商品 别人打开的url
    shareGroupGoodsDetail: 'https://www.ddxm661.com/h5/pages/group-buy/detail', // 分享团购商品 别人打开的url
    shareGroupOrderDetail: 'https://www.ddxm661.com/h5/pages/group-buy/group', // 分享团购下单后邀请参团 别人打开的url
    shareSpikeGoodsDetail: 'https://www.ddxm661.com/h5/pages/spike/detail', // 分享秒杀商品 别人打开的url
    inviteFriends: 'https://www.ddxm661.com/h5/pages2/user/distributor', // 邀请别人成为分销员 别人打开的url
    spikeList: 'https://www.ddxm661.com/h5/pages/spike/list', // 秒杀列表分享 别人打开的url
    groupBuyList: 'https://www.ddxm661.com/h5/pages/group-buy/group-buy', // 拼团列表分享 别人打开的url

}


/**
 * 开发环境
 */
export const development = {
    baseUrl: 'https://ddxm661.com/wxshop', // api http 测试服务器
    appId: 'wx6e3b81d3c901cbf2',//捣蛋熊猫经销商后台
    appSecret: 'faff929ed271fe64f63e95f2128065b5',
    oldShareholderDataUrl: 'http://testdd.ddxm661.com/dist/#/home/mall',
    newShareholderDataUrl: 'http://testdd.ddxm661.com/dist/#/shareholder?mobile=',
    projectUrl: 'https://ddxm661.com/h5', //商城首页
    shareGoodsDetail: 'https://ddxm661.com/h5/pages/goods/detail', // 分享普通商品 别人打开的url
    shareGroupGoodsDetail: 'https://ddxm661.com/h5/pages/group-buy/detail', // 分享团购商品 别人打开的url
    shareGroupOrderDetail: 'https://ddxm661.com/h5/pages/group-buy/group', // 分享团购下单后邀请参团 别人打开的url
    shareSpikeGoodsDetail: 'https://ddxm661.com/h5/pages/spike/detail', // 分享秒杀商品 别人打开的url
    inviteFriends: 'https://ddxm661.com/h5/pages2/user/distributor', // 邀请别人成为分销员 别人打开的url
    spikeList: 'https://ddxm661.com/h5/pages/spike/list', // 秒杀列表分享 别人打开的url
    groupBuyList: 'https://ddxm661.com/h5/pages/group-buy/group-buy', // 拼团列表分享 别人打开的url

}
