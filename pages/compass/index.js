Page({
  data: {
    animationData: 0,
    compass: 0,
  },
  onShow() {
    wx.onCompassChange(res => {
      this.__animation = wx.createAnimation()
      this.__animation.rotate(360 - res.direction.toFixed(0)).step({
        timingFunction: 'step-start',
      })
      switch (true) {
        case res.direction < 22.5:
          this.setData({
            angle: '北',
          })
          break
        case 22.5 < res.direction && res.direction < 67.5:
          this.setData({
            angle: '东北',
          })
          break
        case 67.5 < res.direction && res.direction < 112.5:
          this.setData({
            angle: '东',
          })
          break
        case 112.5 < res.direction && res.direction < 157.5:
          this.setData({
            angle: '东南',
          })
          break
        case 157.5 < res.direction && res.direction < 202.5:
          this.setData({
            angle: '南',
          })
          break
        case 202.5 < res.direction && res.direction < 247.5:
          this.setData({
            angle: '西南',
          })
          break
        case 247.5 < res.direction && res.direction < 292.5:
          this.setData({
            angle: '西',
          })
          break
        case 292.5 < res.direction && res.direction < 337.5:
          this.setData({
            angle: '西北',
          })
          break
      }
      this.setData({
        compass: res.direction.toFixed(2),
        animation: this.__animation.export(),
      })
    })
  },
  startCompass() {
    wx.startCompass()
  },
  stopCompass() {
    wx.stopCompass()
  },
})
