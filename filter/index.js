export const timeStampToTime = (timestamp, is_ymd = false) => {
  let date = new Date(timestamp * 1000)
  let o = {
    'y': date.getFullYear(),
    'M': date.getMonth() + 1,
    'd': date.getDate(),
    'h': date.getHours(),
    'm': date.getMinutes(),
    's': date.getSeconds()
  }
  if (is_ymd) {
    return o.y + '-' + o.M + '-' + o.d
  } else {
    return o.y + '-' + o.M + '-' + o.d + ' ' + o.h + ':' + o.m + ':' + o.s
  }
}

/**
 * 金额保留两位小数
 * @param money
 * @returns {string}
 */
export const moneyToFixed = (money = 0) => {
  return parseFloat(money).toFixed(2)
}

/**
 * 1待付款，2待发货，3待收货，4待评价
 */
export const orderStatusToString = (status) => {
  let sStatus = '订单状态'
  switch (status) {
    case 1:
      sStatus = '待付款'
      break
    case 2:
      sStatus = '待发货'
      break
    case 3:
      sStatus = '待收货'
      break
    case 4:
      sStatus = '待评价'
      break
  }
  return sStatus
}
