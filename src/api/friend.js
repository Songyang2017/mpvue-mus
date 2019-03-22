import { getToken } from '@/utils/index'
import config from '@/config'

let $root = config.baseUrl.root

// 获取朋友动态
export const getFriendsEvents = () => {
  let token = getToken()
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/event`,
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
// 获取动态里的视频
export const getEventsVideo = (id) => {
  let token = getToken()
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/video/url`,
      method: 'get',
      header: {
        cookie: token
      },
      data: {
        id: id
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
