/**
 * 当前是开发环境还是生产环境
 */
// export const NODE_ENV = 'development'
export const NODE_ENV = 'production'


/**
 * 生产环境
 */
export const production = {
    baseUrl: 'https://www.ddxm661.com/wxshop',
    appId: 'wxb5ee49b69efc2429', // 捣蛋熊猫商场
    appSecret: 'f775096b8d02d3a34761ccef9796c8f4',
    oldShareholderDataUrl: 'https://www.ddxm661.com/frontend/public/dist/#/home/mall',
    newShareholderDataUrl: 'https://www.ddxm661.com/frontend/public/dist#/shareholder?mobile=',

}


/**
 * 开发环境
 */
export const development = {
    baseUrl: 'https://ddxm661.com/wxshop', // 测试服务器
    appId: 'wx6e3b81d3c901cbf2',//捣蛋熊猫经销商后台
    appSecret: 'faff929ed271fe64f63e95f2128065b5',
    oldShareholderDataUrl: 'http://testdd.ddxm661.com/dist/#/home/mall',
    newShareholderDataUrl: 'http://testdd.ddxm661.com/dist/#/shareholder?mobile=',

}
