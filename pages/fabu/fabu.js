// pages/fabu/fabu.js
const app = getApp()
var htmlStatus = require('../../utils/htmlStatus/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_tab: [],
    cur: 0,
    array1: [1, 1, 1,],
    array2: [1, 1, 1,],
    array3: [1, 1, 1,],
    index1: '',
    index2: '',
    index3: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndextype()
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

    this.getIndextype()
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
  getIndextype() {
    ///api/category / category_column
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl + '/api/category/category_index',
      data: {

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

          that.setData({
            index_tab: res.data.data,
          })
        } else {
          htmlStatus1.error()
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })

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
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      app.jump(e)
    }
    
  },
  pveimg(e) {
    var curr = e.currentTarget.dataset.src
    var urls = e.currentTarget.dataset.array
    app.pveimg(curr, urls)
  }
})