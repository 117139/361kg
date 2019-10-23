// pages/xiaoxi/xiaoxi.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    page: 1,
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type) {
      this.setData({
        type: options.type
      })
    }
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
    this.setData({
      // datalist: [],
      page: 1,
    })
    if (!wx.getStorageSync('userInfo')) {
      var that = this
      const htmlStatus1 = htmlStatus.default(that)
      htmlStatus1.dataNull()
      // wx.navigateTo({
      //   url: '/pages/login/login',
      // })
    }else{
      this.getlist()
    }
    
  },
  retry() {
    this.setData({
      datalist: [],
      page: 1,
    })
    this.getlist()
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

    this.retry()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getlist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getlist() {
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    var type = that.data.type
    var dataurl= '/api/notification/index'
    wx.request({
      url: app.IPurl + dataurl,
      data: {
        token: wx.getStorageSync('token'),
        page: that.data.page,
        pagesize: 10,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'post',
      success(res) {
        htmlStatus1.finish()
        console.log(res.data)
        if (res.data.code == 1) {  //数据为空
          if (that.data.page == 1) {
            that.data.datalist = []
          }
          if (res.data.data.data.length > 0) {
            that.data.page++
          } else {
            wx.showToast({
              icon: 'none',
              title: '暂无更多内容',
            })
          }
          that.data.datalist = that.data.datalist.concat(res.data.data.data)
          that.setData({
            datalist: that.data.datalist,
            page: that.data.page
          })
          if (that.data.datalist.length == 0) {
            htmlStatus1.dataNull()
          }
        } else if (res.data.code == -1){
          that.setData({
            datalist: [],
            page: 1
          })
          wx.showToast({
            icon: 'none',
            title: '请先登录账号'
          })
          
          htmlStatus1.dataNull()
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }, 1000)
        } else {
          htmlStatus1.error()
          if (res.data.msg) {
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '加载失败'
            })
          }

        }
      },
      fail() {
        htmlStatus1.error()
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })

      },
      complete() {
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },

  jump(e) {
    var that = this
    clearInterval(that.data.intervalfuc)
    app.jump(e)
  },
  call(e) {
    app.call(e)
  },
  pveimg(e) {
    var curr = e.currentTarget.dataset.src
    var urls = e.currentTarget.dataset.array
    app.pveimg(curr, urls)
  }
})