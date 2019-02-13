// let $root = 'http://localhost:3000'
let $root = 'https://www.dogappend.com'

// 手机登录
export const login = param => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/login/cellphone`,
      method: 'get',
      data: param,
      success (res) {
        resolve(res.data)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

// 获取用户动态
export const getEvents = _id => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/user/event`,
      method: 'get',
      data: {
        uid: _id
      },
      success (res) {
        resolve(res.data)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}
