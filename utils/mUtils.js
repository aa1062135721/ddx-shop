/**
 * 防抖
 * 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
 * 典型的案例就是输入框搜索：输入结束后n秒才进行搜索请求，n秒内又输入的内容，则重新计时。
 */
let timeout = null
export function _debounce(fn, wait = 300) {
    if(timeout !== null) {
        clearTimeout(timeout)
        timeout = null
    }
    timeout = setTimeout(fn, wait)
}
