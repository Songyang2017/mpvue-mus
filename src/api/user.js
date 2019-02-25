// let $root = 'http://localhost:3000'
let $root = 'https://www.dogappend.com'
// let $root = 'http://ace.ngrok.xiaomiqiu.cn'
// let $root = 'http://u-to-world.com:3000'

let header = {
  cookie: wx.getStorageSync('cookie')
}

// 登录状态
export const loginStatus = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/login/status`,
      method: 'get',
      header: header,
      success (res) {
        resolve(res.data)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

// 手机登录
export const login = param => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/login/cellphone`,
      method: 'get',
      data: param,
      header: header,
      success (res) {
        resolve(res)
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
      header: header,
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
// 获取用户详情
export const getDetail = _id => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/user/detail`,
      method: 'get',
      header: header,
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
// 获取用户歌单/user/playlist
export const getUserSongList = _id => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/user/playlist`,
      method: 'get',
      header: header,
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
