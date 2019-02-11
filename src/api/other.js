// let $root = 'http://localhost:3000'
let $root = 'https://www.dogappend.com'

// 搜索
export const search = key => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/search`,
      method: 'get',
      data: {
        keywords: key
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

// 获取歌单详情
export const getPlayListsDetail = _id => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${$root}/playlist/detail`,
      method: 'get',
      data: {
        id: _id
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
