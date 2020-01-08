import * as THREE from 'threejs-miniprogram'
import renderPrimitives from './primitives'

Page({
  data: {},
  onLoad: function () {
    wx.createSelectorQuery()
      .select('#c')
      .node()
      .exec((res) => {
        const canvas = new THREE.global.registerCanvas(res[0].node)
        renderPrimitives(canvas, THREE)
      })
  },
  onUnload: function () {
    THREE.global.clearCanvas()
  }
})
