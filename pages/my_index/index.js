// pages/index/index.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    btnkg:0,
    id:'',
    xq_data:'',
    page: 1,
    datalist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      console.log(options.id)
      this.setData({
        myid: wx.getStorageSync('retdata').id,
        id:options.id
      })
    }else{
      this.setData({
        myid: wx.getStorageSync('retdata').id,
        id: wx.getStorageSync('retdata').id
      })
    }
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      token: wx.getStorageSync('token')
    })
    this.setData({
      btnkg: 0,
      page: 1,
      datalist: []
    })
    this.get_user()
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
      btnkg: 0,
    })
    if (!that.data.token) {
      if (that.data.token != wx.getStorageSync('token')) {
        this.setData({
          token: wx.getStorageSync('token')
        })
        that.setData({
          page: 1
        })
        that.getlist()
      }
    }
  },
  retry(){
    this.setData({
      btnkg:0,
      page:1,
      datalist:[]
    })
    this.get_user()
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

  //user
  get_user() {
    var that = this
    wx.request({
      url: app.IPurl + '/api/my/index',
      data: {
        token: wx.getStorageSync('token'),
        user_id: that.data.id,
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
            xq_data: res.data.data
          })
          that.getlist()
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
  //getlist
  getlist() {
    var that = this
    const htmlStatus1 = htmlStatus.default(that)

    wx.request({
      url: app.IPurl + '/api/my/my_issue',
      data: {
        token: wx.getStorageSync('token'),
        user_id: that.data.id,
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
  del(e){
    var that=this
    wx.showModal({
      title: '提示',
      content: '确定要要删除这条信息吗?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var id = e.currentTarget.dataset.id
          ///api/my/add_attention
          wx.request({
            url: app.IPurl + '/api/issue/delete',
            data: {
              token: wx.getStorageSync('token'),
              issue_id: id,
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
                  that.retry()
                }, 1000)
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
              // 停止下拉动作
              wx.stopPullDownRefresh();
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
	bindPickerChange: function(e) {
		console.log(e.currentTarget.dataset.idx)
		var type=e.currentTarget.dataset.idx
		if(type==1){
			this.setData({
			  index1: e.detail.value
			})
		}else if(type==2){
			this.setData({
			  index2: e.detail.value
			})
		}else{
			this.setData({
			  index3: e.detail.value
			})
		}
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // this.setData({
    //   index: e.detail.value
    // })
  },
	jump(e){
	  var that =this
	  clearInterval(that.data.intervalfuc)
		app.jump(e)
	},
	pveimg(e) {
	  var curr = e.currentTarget.dataset.src
	  var urls = e.currentTarget.dataset.array
	  app.pveimg(curr, urls)
	}
})