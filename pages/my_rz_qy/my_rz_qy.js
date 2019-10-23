// pages/my_rz_gr/my_rz_gr.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    imgb: [],
    imgb1: [],
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
  formSubmit: function (e) {
    var that =this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var f_data = e.detail.value
    if (f_data.name == "") {
      wx.showToast({
        icon: "none",
        title: "请输入企业名称"
      })
      return
    }
    if (f_data.sfz_z == "") {
      wx.showToast({
        icon: "none",
        title: "请上传企业工商营业执照"
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '是否提交信息',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '请稍后。。'
          })

          // var imbox = that.data.imgb
          // imbox = imbox.join(',')

          wx.request({
            url: app.IPurl + '/api/authentication/person_company',
            data: {
              type: 2,
              token: wx.getStorageSync('token'),
              company_auth_name: f_data.name,
              company_auth_pic: f_data.sfz_z
            },
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
                  name: '',
                  imgb: [],
                })
                app.dologin1()
                wx.showToast({
                  icon: 'none',
                  title: '提交成功',
                  duration: 2000
                })
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
              wx.hideLoading()
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
  
  scpic(e) {
    var that = this
    console.log(e)
    var num=1
    if (e.currentTarget.dataset.num){
      num = e.currentTarget.dataset.num
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album','camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        // that.setData({
        //   img1: tempFilePaths
        // })
        const imglen = that.data.imgb.length
        that.upimg(num,tempFilePaths, 0)
      }
    })
  },
  upimg(num,imgs, i) {
    var that = this
    const imglen = that.data.imgb.length
    var newlen = Number(imglen) + Number(i)
    if (imglen == 9) {
      wx.showToast({
        icon: 'none',
        title: '最多可上传九张'
      })
      return
    }
    console.log(imgs)
    if (!imgs[i]) {
      return
    }
    wx.uploadFile({
      url: app.IPurl + '/api/uploads/upload_more', //仅为示例，非真实的接口地址
      filePath: imgs[i],
      name: 'pic',
      formData: {
        'apipage': 'uppic',
      },
      success(res) {
        // console.log(res.data)
        var ndata = JSON.parse(res.data)
        // console.log(ndata)
        // console.log(ndata.error == 0)
        if (ndata.code == 1) {
          console.log(imgs[i], i, ndata.data)
         
          if(num==1){
            var newdata = that.data.imgb
            console.log(i)
            // newdata.push(ndata.data)
            newdata[0]=ndata.data
            that.setData({
              imgb: newdata
            })
          }else{
            var newdata = that.data.imgb1
            console.log(i)
            // newdata.push(ndata.data)
            newdata[0] = ndata.data
            that.setData({
              imgb1: newdata
            })
          }
          

          var news1 = that.data.imgb.length
          if (news1 < 9) {
            i++
            that.upimg(num,imgs, i)
          }

        } else {
          wx.showToast({
            icon: "none",
            title: "上传失败"
          })
        }
      }
    })
  },
})