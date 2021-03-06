import config from '@/config'

let $root = config.baseUrl.root

// banner图片
export const getBanner = key => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/banner`,
      method: 'get',
      success (res) {
        resolve(res.data)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

// 推荐歌单
export const getRecommendPlayLists = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/personalized`,
      method: 'get',
      success (res) {
        resolve(res.data)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

// 精品歌单
export const getPlayLists = (num, key, pageNo) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/top/playlist`,
      method: 'get',
      data: {
        limit: num,
        order: key,
        offset: pageNo
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
