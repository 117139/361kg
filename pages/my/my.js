// pages/my/my.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    'retdata': '',
    region: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		// var usermsg=wx.getStorageSync('userInfo')
    this.setData({
      retdata: wx.getStorageSync('retdata'),
      userInfo: wx.getStorageSync('userInfo')
    })
		
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that =this
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    if (wx.getStorageSync('userInfo').nickName !== undefined) {
      app.dologin1('', '', '')
    }
    setTimeout(function(){
      console.log(11111)
      that.data.retdata = wx.getStorageSync('retdata')
      that.setData({
        retdata: that.data.retdata
      })
    },500)
    
  },
  retry(){
    var that=this
    app.dologin1('','','')
    setTimeout(function () {
      that.data.retdata=wx.getStorageSync('retdata')
      that.setData({
        retdata: that.data.retdata
      })
    }, 500)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (wx.getStorageSync('userInfo').nickName !== undefined) {
      app.dologin1('', '', '')
    }
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindRegionChange: function (e) {
    var that=this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    wx.request({
      url: app.IPurl + '/api/my/update_city',
      data: {
        token: wx.getStorageSync('token'),
        province: e.detail.value[0],
        city: e.detail.value[1],
        district: e.detail.value[2],
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'post',
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {  //数据为空
          app.dologin1('', '', '')
          wx.showToast({
            title: '操作成功',
          })
          that.data.retdata.province = e.detail.value[0]
          that.data.retdata.city = e.detail.value[1]
          that.data.retdata.district = e.detail.value[2]
          console.log(that.data.retdata.province)
          that.setData({
            retdata: that.data.retdata
          })
          console.log(that.data.retdata.province)
        } else {
          if (res.data.msg) {
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '操作失败'
            })
          }

        }
      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '操作失败'
        })

      },
      complete() {
      }
    })
    
  },
	jump(e){
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      app.jump(e)
    }
  },
  jump1(e) {
    app.jump(e)
  },
  call(e){
    app.call(e)
  }
})