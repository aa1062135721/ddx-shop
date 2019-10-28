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

    /***
     * 深复制一个对象
     * @param p
     * @param c
     * @returns {*|{}}
     */
    Vue.prototype.deepCopy = (obj, c) => {
        // 只拷贝对象
        if (typeof obj !== 'object') return
        // 根据obj的类型判断是新建一个数组还是一个对象
        let newObj = obj instanceof Array ? [] : {}
        for (let key in obj) {
            // 遍历obj,并且判断是obj的属性才拷贝
            if (obj.hasOwnProperty(key)) {
                // 判断属性值的类型，如果是对象递归调用深拷贝
                newObj[key] = typeof obj[key] === 'object' ? Vue.prototype.deepCopy(obj[key]) : obj[key]
            }
        }
        return newObj
    }

    /**
     * 传两时间戳，返回相差多少时间
     * @param EndTime
     * @constructor
     */
    Vue.prototype.getRTime = (NowTime, EndTime) => {
        // js获取的时间戳是13位的，精确到毫秒，而php获取的时间戳用strtotime是10位的，
        let t =(EndTime * 1000) -(NowTime * 1000)
        if (t<=0){
            return `00:00:00`
        }
        let d=Math.floor(t/1000/60/60/24) //天
        let h=Math.floor(t/1000/60/60%24) //时
        let m=Math.floor(t/1000/60%60) //分
        let s=Math.floor(t/1000%60) //秒
        if(parseInt(d)<10){
            d="0"+d
        }
        if(parseInt(h)<10){
            h="0"+h
        }
        if(parseInt(m)<10){
            m="0"+m
        }
        if(parseInt(s)<10){
            s="0"+s
        }
        if (d === '00') {
            return `${h}:${m}:${s}`
        } else {
            return `${d}天${h}:${m}:${s}`
        }
    }

    /**
     * 如果富文本框里只有图片，并且图片没有设置style和宽度/高度
     * @param html
     * @returns {void | string | never}
     */
    Vue.prototype.formatRichText = (html) => {
        return html.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;"')
    }

    /**
     * 处理富文本里的图片宽度自适应
     * 1.去掉img标签里的style、width、height属性
     * 2.img标签添加style属性：max-width:100%;height:auto
     * 3.修改所有style里的width属性为max-width:100%
     * 4.去掉<br/>标签
     * @param html
     * @returns {void|string|*}
     */
    Vue.prototype.formatRichText2 = (html) => {
        let newContent= html.replace(/<img[^>]*>/gi, function(match,capture){
            match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
            match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
            match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
            return match;
        });
        newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
            match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
            return match;
        });
        newContent = newContent.replace(/<br[^>]*\/>/gi, '');
        newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
        return newContent;
    }


}
