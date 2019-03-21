import { getToken } from '@/utils/index'
import config from '@/config'

let $root = config.baseUrl.root

// 登录状态
export const loginStatus = () => {
  let token = getToken()
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/login/status`,
      method: 'get',
      header: {
        cookie: token
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

// 手机登录
export const login = param => {
  let token = getToken()
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/login/cellphone`,
      method: 'get',
      data: param,
      header: {
        cookie: token
      },
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
export const getEvents = (_id, _limit, _offset) => {
  let token = getToken()
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/user/event`,
      method: 'get',
      header: {
        cookie: token
      },
      data: {
        uid: _id,
        limit: _limit,
        offset: _offset
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
  let token = getToken()
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/user/detail`,
      method: 'get',
      header: {
        cookie: token
      },
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
  let token = getToken()
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/user/playlist`,
      method: 'get',
      header: {
        cookie: token
      },
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
// 获取用户粉丝列表
export const getUserFolloweds = _id => {
  let token = getToken()
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/user/followeds`,
      method: 'get',
      header: {
        cookie: token
      },
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
