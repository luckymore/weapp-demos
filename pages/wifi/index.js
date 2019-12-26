import util from '../../utils/util'

Page({
  data: {
    wifiList: [],
    updateTime: 1
  },

  onLoad() {
    this.getConnectedWifiInterval()
  },

  onUnload() {
    this.stopSearch()
    this._interval && clearInterval(this._interval)
  },

  startSearch() {
    const getWifiList = () => {
      wx.onWifiConnected(res => {
        console.log('wifi connnected', res)
        util.showToast(res.wifi.BSSID)
      })
      wx.getWifiList({
        success: res => {
          wx.onGetWifiList(res => {
            const wifiList = res.wifiList
              .sort((a, b) => b.signalStrength - a.signalStrength)
              .map(wifi => {
                const strength = Math.ceil(wifi.signalStrength * 4)
                return Object.assign(wifi, { strength })
              })
            this.setData({
              wifiList,
            })
          })
        },
        fail(err) {
          console.error(err)
        },
      })
    }

    const startWifi = () => {
      wx.startWifi({
        success: getWifiList,
        fail(err) {
          console.error(err)
        },
      })
    }

    wx.getSystemInfo({
      success(res) {
        const isIOS = res.platform === 'ios'
        if (isIOS) {
          wx.showModal({
            title: '提示',
            content: '由于系统限制，iOS用户请手动进入系统WiFi页面，然后返回小程序。',
            showCancel: false,
            success() {
              startWifi()
            },
          })
          return
        }
        startWifi()
      },
    })
  },

  getConnectedWifiInterval() {
    this._interval = setInterval(() => {
      wx.getConnectedWifi({
        success: result => {
          this.setData({
            connectedWifi: result.wifi,
            updateTime: this.data.updateTime + 1
          })
        },
        fail: (res) => {
          console.log('获取当前连接的wifi失败', res)
        },
      })
    }, 2000)
  },

  stopSearch() {
    wx.stopWifi({
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.error(err)
      },
    })
  },
})
