// pages/fabu1/fabu1.js
const app = getApp()
var htmlStatus = require('../../utils/htmlStatus/index.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    idlg:0,
    fbtext:'',
    imgb: [],
    qx: [
      '全部',
      '个人认证',
      '企业认证',
    ],
    qx1: [
      '7',
      '30'
    ],
    index_tab: [],
    id_arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    cur: 0,
    index1: 0,
    index2: 0,
    index3: '',
    region:[],
    retdata: wx.getStorageSync('retdata'),
    tel: wx.getStorageSync('retdata').phone
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.id) {
      that.setData({
        id: options.id
      })
    }
    that.data.region[0] = wx.getStorageSync('province')
    that.data.region[1] = wx.getStorageSync('city')
    that.data.region[2] = wx.getStorageSync('district')
    that.setData({
      region: that.data.region
    })
    that.getfbmsg()
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
      retdata: wx.getStorageSync('retdata')
    })
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
    var that =this
    that.getfbmsg()
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
    console.log('form发生了submit事件，携带数据为：', e.detail.formId)
    this.fabusub(e.detail.formId)
  },
  bint_tel(e) {
    console.log(e.detail.value)
    this.setData({
      tel: e.detail.value
    })

  },
  getfbmsg() {
    ///api/category / category_column
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl + '/api/category/cate_index',
      data: {
        id:that.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'GET',
      success(res) {
        htmlStatus1.finish()
        console.log(res.data)
        if (res.data.code == 1) {  //数据为空

          that.setData({
            index_tab: res.data.data,
            attr: res.data.data[0].attr
          })
          var ids=[]
          for (var i = 0; i < res.data.data[0].attr.length;i++){
            ids.push(0)
          }
          that.setData({
            id_arr: ids,
            idlg:0
          })
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
  fabusub(fid) {
    var that = this
    if (!that.data.id) {
      wx.showToast({
        icon: "none",
        title: "请选择分类"
      })
      return
    }
    if (that.data.idlg == 0) {
      wx.showToast({
        icon: "none",
        title: "请至少选择1个标签"
      })
      return
    }
    if (that.data.fbtext == "") {
      wx.showToast({
        icon: "none",
        title: "请输入您要发布内容"
      })
      return
    }
    if (that.data.region[0] == "") {
      wx.showToast({
        icon: "none",
        title: "请选择地址"
      })
      return
    } 
    if (that.data.index1!=-1){
      console.log(that.data.tel)
      if (that.data.tel == '' || !(/^1\d{10}$/.test(that.data.tel))) {
        wx.showToast({
          icon: 'none',
          title: '手机号有误'
        })
        return
      }
    }
    wx.showModal({
      title: '提示',
      content: '是否发布该内容',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '请稍后。。'
          })

          var imbox = that.data.imgb
          imbox = imbox.join(',')
          var ids = []
          var id_arr = that.data.id_arr
          for (var i = 0; i < id_arr.length;i++){
            if (id_arr[i]==1){
              ids.push(that.data.attr[i].id)
            }
          }
          ids = ids.join(',')
          wx.request({
            url: app.IPurl + '/api/issue/save',
            data: {
              token: wx.getStorageSync('token'),
              attr_id: ids,
              content: that.data.fbtext,
              province: that.data.region[0],
              city: that.data.region[1],
              district: that.data.region[2],
              phone: that.data.tel,
              pic: imbox,
              permission: that.data.index1,
              valid_time: that.data.qx1[that.data.index2],
              formId:fid
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

                wx.showToast({
                  icon: 'none',
                  title: '提交成功',
                  duration: 2000
                })
                setTimeout(function () {
                  // wx.switchTab({
                  //   url: "/pages/shequ/shequ"
                  // })
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
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
  getbq(e){
    console.log(e.currentTarget.dataset.idx)
    console.log(e.currentTarget.dataset.type)
    var that =this
    var idx = e.currentTarget.dataset.idx
    if (that.data.id_arr[idx]==1){
      that.data.id_arr[idx] = 0
      that.data.idlg--
      that.setData({
        id_arr: that.data.id_arr,
        idlg: that.data.idlg
      })
    }else{
      if (that.data.idlg < 3) {
        that.data.id_arr[idx] = 1
        that.data.idlg++
        that.setData({
          id_arr: that.data.id_arr,
          idlg: that.data.idlg
        })
      }else{
        wx.showToast({
          icon:'none',
          title: '最多只能选择三个标签',
        })
      }
    }
    
  },

  bint(e) {
    console.log(e.detail.value)
    this.setData({
      fbtext: e.detail.value
    })

  },
  index_tab_fuc(e) {
    console.log(e.currentTarget.dataset.idx)
    var that = this
    that.setData({
      cur: e.currentTarget.dataset.idx,
      attr: that.data.index_tab[e.currentTarget.dataset.idx].attr
    })
    var ids = []
    for (var i = 0; i < that.data.index_tab[e.currentTarget.dataset.idx].attr.length; i++) {
      ids.push(0)
    }
    that.setData({
      id_arr: ids,
      idlg:0
    })
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  switch1Change:function(e){
    console.log(e.detail)
    if (e.detail.value){
      this.setData({
        index1:0
      })
    }else{
      this.setData({
        index1: -1
      })
    }
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
  imgdel(e) {
    var that = this
    console.log(e.currentTarget.dataset.idx)
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.data.imgb.splice(e.currentTarget.dataset.idx, 1)
          that.setData({
            imgb: that.data.imgb
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  scpic() {
    var that = this
    wx.chooseImage({
      count: 9,
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
        that.upimg(tempFilePaths, 0)
      }
    })
  },
  upimg(imgs, i) {
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
    if (!imgs[i]){
      return
    }
    wx.uploadFile({
      url: app.IPurl +'/api/uploads/upload_more', //仅为示例，非真实的接口地址
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
          var newdata = that.data.imgb
          console.log(i)
          newdata.push(ndata.data)
          that.setData({
            imgb: newdata
          })

          var news1 = that.data.imgb.length
          if (news1 < 9) {
            i++
            that.upimg(imgs, i)
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
