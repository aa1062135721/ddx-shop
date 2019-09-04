exports.install = function (Vue, options) {
    //判断是否为空
    Vue.prototype.isEmpty = (value, title = '') => {
        if(typeof value === "undefined" || value === null || value === "" || value.trim().length === 0){
            if (title) {
                Vue.prototype.msg(title)
            }
            return false
        } else {
            return true
        }
    }

    //全局函数，判断是否位手机号码
    Vue.prototype.isPoneAvailable = (mobile, flag = false) => {
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(mobile)) {
            if (flag) {
                Vue.prototype.msg('手机号码格式有误')
            }
            return false
        } else {
            return true
        }
    }

    /**
     *
     * @param title
     * @param duration
     * @param mask
     * @param icon [success,loading,none]
     */
    Vue.prototype.msg = (title, duration = 1500, mask = false, icon = 'none') =>{
        if(Boolean(title) === false){
            return
        }
        uni.showToast({
            title,
            duration,
            mask,
            icon
        })
    }
}
