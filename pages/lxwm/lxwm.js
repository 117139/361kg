// pages/lxwm/lxwm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    about: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getabout()
    
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
  getabout(){
    var that =this
    ///api/my/about
    wx.request({
      url: app.IPurl + '/api/my/about',
      data: {},
      header: {
      	'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
        wx.hideLoading()
        console.log(res.data)


        if (res.data.code == 1) {

          that.setData({
            about:res.data.data
          })

        } else {
          if (res.data.msg) {
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '获取失败'
            })
          }
        }


      },
      fail() {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '获取失败'
        })
      }
    })
  },
  jump(e) {
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      app.jump(e)
    }
  },
  call(e) {
    app.call(e)
  }
})