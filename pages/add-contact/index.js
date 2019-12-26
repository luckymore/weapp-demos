
Page({
  data: {

  },
  handleAddContact() {
    wx.addPhoneContact({
      photoFilePath: '',
      nickName: 'a',
      lastName: 'aa',
      middleName: 'aaa',
      firstName: 'aaaa',
      mobilePhoneNumber: '17123463456',
      weChatNumber: '17123463456',
      email: 'moumou@gmail.com',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  }
})
