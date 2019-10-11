// pages/fabu1/fabu1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx:'',
    idlg:0,
    imgb: [],
    qx: [
      '企业认证',
      '个人认证',
      '全部',
    ],
    qx1: [
      '企业认证1',
      '个人认证2',
      '全部3',
    ],
    index_tab: [
      '推荐', '推荐', '推荐', '推荐', '推荐',
      '推荐', '推荐', '推荐', '推荐', '推荐',
    ],
    id_arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    cur: 0,
    index1: '',
    index2: '',
    index3: '',
    region:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.idx) {
      that.setData({
        idx: options.idx
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
  getidx(idx){
    return true
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
  index_tab_fuc(e) {
    console.log(e.currentTarget.dataset.idx)
    var that = this
    that.setData({
      cur: e.currentTarget.dataset.idx
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
      sourceType: ['camera'],
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
