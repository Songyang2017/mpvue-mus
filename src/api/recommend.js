let $root = 'http://localhost:3000'

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
