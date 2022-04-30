//防抖函数,设置时间长度为默认长度
export function debounce(func, delay) {
    let timer = null
    return function (...args) {
        if (timer) clearTimeout(timer) 
        timer = setTimeout(() => {
            func.apply(this, args)
        },delay)
    }
}




