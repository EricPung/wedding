wx.loadFontFace({
  family: 'xiaowei',
  source: 'url("https://www.ruida.studio:8090/xiaowei.woff")',
  success: console.log
})

wx.loadFontFace({
  family: 'TsangerXWZ',
  source: 'url("https://www.ruida.studio:8090/TsangerXWZ.woff")',
  success: console.log
})
wx.loadFontFace({
  family: 'FMDianSongJ',
  source: 'url("https://www.ruida.studio:8090/FMDianSongJ.woff")',
  success: console.log
})

const {
  statusBarHeight,
  safeArea,
  screenHeight
} = wx.getWindowInfo();
// console.log(screenHeight, safeArea)

let scrollbusy = false
let currentPage = 0
const innerAudioContext = wx.createInnerAudioContext({
  useWebAudioImplement: false
})
innerAudioContext.src = 'https://www.ruida.studio:8090/250d853fe53e51c48f1a397a36e609b3-sz_5369819.mp3'
innerAudioContext.loop = true

Page({
  data: {
    currentElement: ".first-page",
    safeArea,
    screenHeight,
    statusBarHeight,
    firstPageText: [
      "当收到这封请柬的时候",
      "我们的婚礼已经在倒计时啦",
      "非常荣幸能与您分享我们的爱情",
      "诚邀您参加我们的婚礼",
    ],
    innerAudioContext,
    status: false,
    scaleY: 0,
    scrollTop: 0,
    allowscroll: true,
    showPlayer: false,
    markers: [],
    city: 'cd',
    paused: true,
    share: false
  },
  play: function () {
    if (innerAudioContext) {
      innerAudioContext.pause()
      this.setData({
        paused: false
      })
    }
  },
  mute: function () {
    console.log(innerAudioContext)
    if (innerAudioContext) {
      innerAudioContext.play()
      this.setData({
        paused: true
      })
    }
  },
  onShow() {
    // console.log(e)
    if (this.data.paused) {
      // innerAudioContext.pause()
      innerAudioContext.play()
      this.setData({
        paused: true
      })
    }
  },
  onLoad() {
    let city = wx.getStorageSync('city')
    let share = wx.getStorageSync('share')
    if (share === 'allow') {
      this.setData({
        'share': true
      })
    }

    if (this.data.paused) {
      innerAudioContext.play()
    }

    if (city === "cd") {
      this.setData({
        markers: [{
          id: 1,
          longitude: 104.273821,
          latitude: 30.728923,
          width: '28px',
          height: '40px',
          name: "七园盟中餐馆",
          address: "四川省成都市新都区石板滩街道七里坝路9号"
        }]
      })
    } else {
      this.setData({
        markers: [{
          id: 1,
          longitude: 104.84652,
          latitude: 29.753837,
          width: '28px',
          height: '40px',
          name: "喜悦·玫瑰花语宴会中心",
          address: "四川省内江市资中县水南镇凤祥中路恒大锦城售楼处西南"
        }]
      })
    }

    this.setData({
      city: city
    })
  },
  navRoad(event) {
    // console.log(event)
    let city = wx.getStorageSync('city')
    // console.log(city)
    if (city === "cd") {
      wx.openLocation({ //​使用微信内置地图查看位置。
        latitude: 30.728923, //要去的纬度-地址
        longitude: 104.273821, //要去的经度-地址
        name: "七园盟中餐馆",
        address: "四川省成都市新都区石板滩街道七里坝路9号"
      })
    } else {
      wx.openLocation({ //​使用微信内置地图查看位置。
        latitude: 29.753837, //要去的纬度-地址
        longitude: 104.84652, //要去的经度-地址
        name: "喜悦·玫瑰花语宴会中心",
        address: "四川省内江市资中县水南镇凤祥中路恒大锦城售楼处西南"
      })
    }

  },
  onScroll(e) {
    const {
      scrollTop
    } = e.detail
    this.setData({
      scrollTop: scrollTop
    })

    if (scrollTop > 4500) {
      this.setData({
        "showPlayer": false
      })
    } else {
      if (currentPage === 1) {
        this.setData({
          "showPlayer": true
        })
      }

    }

    if (scrollTop > 50 && currentPage === 0 && scrollbusy === false) {
      scrollbusy = true
      this.setData({
        "currentElement": '.second-page',
        "allowscroll": false,
        "showPlayer": true
      })
      let that = this
      setTimeout(() => {
        that.setData({
          "allowscroll": true
        })
      }, 200)
      currentPage = 1
      return
    }

    if ((scrollTop < (screenHeight - 100)) && currentPage === 1 && scrollbusy === false) {
      scrollbusy = true
      this.setData({
        "currentElement": '.first-page',
        "showPlayer": false,
        // "scrollTop": 0
      })
      currentPage = 0
      //  = 0;
    }
  },
  onDragend() {
    scrollbusy = false
  },
  onShareAppMessage({
    from,
    target
  }) {
    // console.log(res)
    if (from === 'button') {
      if (target && target.id === 'cd') {
        return {
          title: '诚邀参加我们的婚礼！',
          path: 'pages/index/index?city=cd',
          imageUrl: 'https://www.ruida.studio:8090/cd.png'
        }
      } else {
        return {
          title: '诚邀参加我们的婚礼！',
          path: 'pages/index/index?city=zz',
          imageUrl: 'https://www.ruida.studio:8090/zz.png'
        }
      }
    } else {
      let city = wx.getStorageSync('city')
      if (city === 'cd') {
        return {
          title: '诚邀参加我们的婚礼！',
          path: 'pages/index/index?city=cd',
          imageUrl: 'https://www.ruida.studio:8090/cd.png'
        }
      } else {
        return {
          title: '诚邀参加我们的婚礼！',
          path: 'pages/index/index?city=zz',
          imageUrl: 'https://www.ruida.studio:8090/zz.png'
        }
      }
    }

  }
})