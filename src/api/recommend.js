let $root = 'https://www.dogappend.com'
// let $root = 'http://localhost:3000'
// let $root = 'http://ace.ngrok.xiaomiqiu.cn'
// let $root = 'http://u-to-world.com:3000'

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
