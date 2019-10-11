// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_tab: ['推荐', '推荐', '推荐', '推荐', '推荐'],
    cur: 0,
    array3: [
      '../../static/images/img1.png', 
      '../../static/images/img1.png', 
      '../../static/images/img1.png',
      '../../static/images/img1.png',
      '../../static/images/img1.png',
      '../../static/images/img1.png',
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  bindPickerChange: function (e) {
    console.log(e.currentTarget.dataset.idx)
    var type = e.currentTarget.dataset.idx
    if (type == 1) {
      this.setData({
        index1: e.detail.value
      })
    } else if (type == 2) {
      this.setData({
        index2: e.detail.value
      })
    } else {
      this.setData({
        index3: e.detail.value
      })
    }
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // this.setData({
    //   index: e.detail.value
    // })
  },
  jump(e) {
    var that = this
    clearInterval(that.data.intervalfuc)
    app.jump(e)
  },
  pveimg(e) {
    var curr = e.currentTarget.dataset.src
    var urls = e.currentTarget.dataset.array
    app.pveimg(curr, urls)
  },
  call(e) {
    app.call(e)
  },
  topl(){
    let query = wx.createSelectorQuery()
    // let scrollTop = this.data.scrollTop
    query.select('#xq_index').boundingClientRect((rect) => {
      let top = rect.height
      console.log(rect)
      // 这里是关键
      wx.pageScrollTo({
        scrollTop: top,
        duration: 0
      })
    }).exec()
  }
})