Component({
  data: {
    text: '请勿外传',
    // color: 'rgba(0,0,0,0.03)',
    color: 'rgba(0,0,0,0.5)',
    rows: [],
    cols: [],
  },
  lifetimes: {
    created() {
      wx.onNetworkStatusChange(this.onNetwork.bind(this))
      wx.onUserCaptureScreen(this.onCaptureScreen.bind(this))
    },

    detached() {
      wx.offNetworkStatusChange(this.onNetwork.bind(this))
      wx.offUserCaptureScreen(this.onCaptureScreen.bind(this))
    },

    // 组件在页面上挂载时触发,注意如果页面没卸载过，该事件就不会触发第二次
    ready() {
      const { windowWidth, windowHeight } = wx.getSystemInfoSync()
      const rows = Math.ceil(windowWidth / (30 * this.data.text.length))
      const cols = Math.ceil(windowHeight / 100)
      this.setData(
        {
          rows: new Array(rows),
          cols: new Array(cols),
        },
        () => {
          this.triggerEvent('safe')
        }
      )
    },
  },

  methods: {
    onNetwork(res) {
      console.log(res)
      this.triggerEvent('network', res)
    },
    onCaptureScreen() {
      this.reportUserCapture()
      this.triggerEvent('capture')
    },
    reportUserCapture() {
      
    }
  }
})
