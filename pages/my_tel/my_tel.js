// pages/my_tel/my_tel.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: '',
    btnkg:0,
    time:0,
    setstate: 0,
    code_key: '',
    yzm: ''
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
  bint(e) {
    console.log(e.detail.value)
    this.setData({
      tel: e.detail.value
    })

  },
  getcode() {
    let that = this

    if (that.data.tel == '' || !(/^1\d{10}$/.test(that.data.tel))) {
      wx.showToast({
        icon: 'none',
        title: '手机号有误'
      })
      return
    }
    if (that.data.btnkg == 1) {
      return
    } else {
      that.setData({
        btnkg: 1
      })
    }
    //'apipage': 'sendcode', "op": "reg", 'tel': vm.usertel
    wx.request({
      url: app.IPurl +'/api/my/binding_phone',
      data: {
        token: wx.getStorageSync('token'),
        'phone': that.data.tel,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'post',
      success(res) {
        wx.hideLoading()
        console.log(res.data)


        if (res.data.code == 1) {

          wx.showToast({
            icon: 'none',
            title: '发送成功',
            duration: 1000
          })
          that.setData({
            code_key: res.data.data.key,
            yzm: res.data.data.code
          })
          console.log(res.data.code)
          that.codetime(60)
        } else {
          if (that.data.time == 0 && res.data.data){
            that.codetime(res.data.data)
          }
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
        that.setData({
          btnkg: 0
        })
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '操作失败'
        })
      }
    })


  },
  codetime(time) {
    let that = this
    
    if(!time){
      let time = 60
    }
    let st = setInterval(function () {
      if (time == 0) {
        that.setData({
          setstate: 0,
        })
        clearInterval(st);
      } else {
        let news = time--;
        // console.log(news)
        that.setData({
          setstate: 1,
          time: news
        })

      }
    }, 1000);
  },
  formSubmit: function (e) {
    var that =this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var f_data = e.detail.value
    if (f_data.tel == "") {
      wx.showToast({
        icon: "none",
        title: "请输入输入手机号"
      })
      return
    }
    if (!(/^1\d{10}$/.test(f_data.tel))) {
      wx.showToast({
        icon: 'none',
        title: '手机号有误'
      })
      return
    }
    if (f_data.code == "") {
      wx.showToast({
        icon: "none",
        title: "请输入输入验证码"
      })
      return
    }
    if (f_data.code != that.data.yzm) {
      wx.showToast({
        icon: "none",
        title: "验证码错误"
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '是否提交信息',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // wx.showLoading({
          //   title: '请稍后。。'
          // })

          // var imbox = that.data.imgb
          // imbox = imbox.join(',')

          wx.request({
            url: app.IPurl + '/api/my/binding_phone',
            data: {
              token: wx.getStorageSync('token'),
              phone: f_data.tel,
              verification_key: that.data.code_key,
              verification_code: f_data.code
            },
            header: {
            	'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            method: 'POST',
            success(res) {
              // wx.hideLoading()
              console.log(res.data)


              if (res.data.code == 1) {

                wx.showToast({
                  icon: 'none',
                  title: '提交成功',
                  duration: 2000
                })
                app.dologin()
                setTimeout(function () {
                  // wx.switchTab({
                  //   url: "/pages/shequ/shequ"
                  // })
                  wx.navigateBack()
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
              // wx.hideLoading()
              wx.showToast({
                icon: 'none',
                title: '操作失败'
              })
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
})