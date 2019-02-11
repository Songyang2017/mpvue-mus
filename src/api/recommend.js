let $root = 'https://www.dogappend.com'
// let $root = 'http://localhost:3000'
// let $root = 'http://ace.ngrok.xiaomiqiu.cn'

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

// 精品歌单
export const getPlayLists = (num, key) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/top/playlist`,
      method: 'get',
      data: {
        limit: num,
        order: key
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
