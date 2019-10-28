// pages/details/details.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnkg:0,
    xq_data:'',
    datalist: [],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
  },
  retry(){
    this.setData({
      btnkg:0,
      page: 1,
      datalist: []
    })
    this.getdata()
    this.getlist()
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
      btnkg:0,
      page: 1,
      datalist: []
    })
    this.getdata()
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
    this.setData({
      btnkg:0,
      page:1,
      datalist:[]
    })
    this.getdata()
    this.getlist()
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
  //xq
  getdata() {
    var that = this
    
    ///api/my/add_attention
    wx.request({
      url: app.IPurl + '/api/issue/show',
      data: {
        token: wx.getStorageSync('token'),
        issue_id: that.data.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'post',
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {  //数据为空

         that.setData({
           xq_data:res.data.data
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
              title: '加载失败'
            })
          }
        }
      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '获取失败'
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
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
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
              btnkg:0
            })
            that.getdata()
          }, 1000)
        } else {
          that.setData({
            btnkg:0
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
  //dz
  dianzan() {
    var that = this
    if (that.data.btnkg == 1) {
      return
    } else {
      that.setData({
        btnkg: 1
      })
    }
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    ///api/my/add_attention
    wx.request({
      url: app.IPurl + '/api/my/add_praise',
      data: {
        token: wx.getStorageSync('token'),
        id: that.data.xq_data.id,
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
          that.setData({
            btnkg:0
          })
          that.getdata()
        } else {
          that.setData({
            btnkg:0
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

  //sc
  shoucan() {
    var that = this
    if (that.data.btnkg == 1) {
      return
    } else {
      that.setData({
        btnkg: 1
      })
    }
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    ///api/my/add_attention
    wx.request({
      url: app.IPurl + '/api/my/add_collect',
      data: {
        token: wx.getStorageSync('token'),
        id: that.data.xq_data.id,
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
          that.setData({
            btnkg: 0
          })
          that.getdata()
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
  //get评论
  getlist() {
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl + '/api/comment/index',
      data: {
        token: wx.getStorageSync('token'),
        id: that.data.id,
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
              
            }else{
              wx.showToast({
                icon: 'none',
                title: '暂无更多评论',
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
              title: '操作失败'
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
  delpl(e) {
    var that = this
    console.log(e.currentTarget.dataset.id)
    wx.showModal({
      title: '提示',
      content: '是否删除该评论',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.IPurl + '/api/comment/delete',
            data: {
              "id": e.currentTarget.dataset.id,
              token: wx.getStorageSync('token')
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            method: 'post',
            success(res) {

              console.log(res.data)
              if (res.data.code == 1) {                           //数据不为空

                that.setData({
                  page: 1,
                  datalist: []
                })
                that.getdata()
                that.getlist()
              } else {
                wx.showToast({
                  icon: 'none',
                  title: '操作失败'
                })
              }
            },
            fail() {
              wx.showToast({
                icon: 'none',
                title: '操作失败'
              })
            },
            complete() { }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  jump(e) {
    // var that = this
    // clearInterval(that.data.intervalfuc)
    app.jump(e)
  },
  jump1(e) {
    // var that = this
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