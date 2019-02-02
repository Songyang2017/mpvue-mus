// let $root = 'http://localhost:3000'
let $root = 'http://ace.ngrok.xiaomiqiu.cn'

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
