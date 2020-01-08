import * as THREE from 'threejs-miniprogram'
import render from './render'

Page({
	data: {},
	onLoad: function () {
		wx.createSelectorQuery()
			.select('#c')
			.node()
			.exec((res) => {
				const canvas = new THREE.global.registerCanvas(res[0].node)
				render(canvas, THREE)
			})
	},
	onUnload: function () {
		//注意清理global中的canvas对象
		THREE.global.clearCanvas()
	},
	touchStart(e) {
		console.log('canvas', e)
		THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
	},
	touchMove(e) {
		console.log('canvas', e)
		THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
	},
	touchEnd(e) {
		console.log('canvas', e)
		THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
	},
	touchCancel(e) {
		// console.log('canvas', e)
	},
	longTap(e) {
		// console.log('canvas', e)
	},
	tap(e) {
		// console.log('canvas', e)
	},
})
