const TOKEN_KEY = 'token'

export function setToken (token) {
  wx.setStorageSync(TOKEN_KEY, token)
}
export function getToken () {
  const token = wx.getStorageSync(TOKEN_KEY)
  if (token) return token
  else return false
}

export function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * 验证对象是否存在属性为空字符
 * @param obj 对象
 * @param lis 传入要验证属性组成上网数组，不填则验证全部属性
 * @returns {boolean}返回布尔值 返回值为true 则存在为空字段；false则不存在为空字段
 */
export function objSome (obj, lis) {
  let arr
  if (!lis) {
    arr = Object.keys(obj)
  } else {
    arr = lis
  }
  return arr.some(v => { return obj[v] === '' || typeof obj[v] === 'undefined' })
}

export function debounce (func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
/** 对Date的扩展，将 Date 转化为指定格式的String
  *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  *例子：
  *dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  *dateFormat(new Date(),"yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  */
export const dateFormat = (date, fmt) => {
  if (!(date instanceof Date)) {
    return
  }
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
