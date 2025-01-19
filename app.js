// app.js
App({
  onLaunch({
    query
  }) {
    let city = wx.getStorageSync('city')
    if (!city) {
      wx.setStorageSync('city', "cd")
    }
    if (query.city) {
      wx.setStorageSync('city', query.city)
    }
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.ruida.studio:8090/verify',
            data: {
              code: res.code
            },
            success({
              data
            }) {
              // console.log(data)
              if (data && data.status === "allow") {
                wx.setStorageSync('share', 'allow')
              } else {
                wx.setStorageSync('share', 'error')
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})