function formatNumber (n) {
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

export default {
  formatNumber,
  formatTime
}
