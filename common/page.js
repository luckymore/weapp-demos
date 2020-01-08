export default function(options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: '微信小程序 能力演示'
      };
    },
    ...options
  });
}
