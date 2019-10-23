// pages/my_fs/my_fs.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnkg:0,
    type:'',
    datalist: [],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    if(options.type){
      that.setData({
        type:options.type
      })
      if (options.type==1){
        wx.setNavigationBarTitle({
          title: '我的粉丝',
        })
      }else{
        wx.setNavigationBarTitle({
          title: '我的关注',
        })
      }
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
      page:1,
      datalist:[]
    })
    this.getlist()
  },
  retry(){
    this.setData({
      page: 1,
      datalist: []
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
  getlist(){
    ///api/my/my_fans
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    var dataUrl
    if(that.data.type==1){
      dataUrl ='/api/my/my_fans'
    }else{
      dataUrl = '/api/my/my_attention'
    }
    wx.request({
      url: app.IPurl + dataUrl,
      data: {
        token: wx.getStorageSync('token'),
        page: that.data.page
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

          if (res.data.data.data.length > 0) {
            that.data.page++
            if (that.data.page == 1) {
              that.data.datalist = []
            }
          } else {
            if (that.data.page == 1) {

            } else {
              wx.showToast({
                icon: 'none',
                title: '暂无更多内容',
              })
            }

          }
          that.data.datalist = that.data.datalist.concat(res.data.data.data)
          that.setData({
            datalist: that.data.datalist,
            page: that.data.page
          })
          console.log(that.data.datalist.length)
          if (that.data.datalist.length == 0) {
            htmlStatus1.dataNull()
          }
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
  //guanzhu
  guanzhu(e) {
    var that = this
    if (that.data.btnkg == 1) {
      return
    } else {
      that.setData({
        btnkg: 1
      })
    }
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    ///api/my/add_attention
    wx.request({
      url: app.IPurl + '/api/my/add_attention',
      data: {
        token: wx.getStorageSync('token'),
        id: id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'post',
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {  //数据为空

          wx.showToast({
            title: '操作成功',
          })
          setTimeout(function () {
            that.setData({
              btnkg: 0
            })
            that.retry()
          }, 1000)
        } else {
          that.setData({
            btnkg: 0
          })
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
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  jump(e) {
    app.jump(e)
  },
  call(e) {
    app.call(e)
  }
})