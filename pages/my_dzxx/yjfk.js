// pages/my_yjfk/yjfk.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnkg:0,
    fbtext:'',
    imgb: [], 
    index_tab: [],
    allStatus:0,
    cur: 0,
    array1: [1, 1, 1,],
    array2: [1, 1, 1,],
    index1: '',
    index2: '',
    region: ['', '', ''],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    that.getIndextype()
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
  getIndextype() {
    ///api/category / category_column
    var that = this
    wx.request({
      url: app.IPurl + '/api/category/category_subscribe',
      data: {
        token: wx.getStorageSync('token'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'post',
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {  //数据为空
          var arr = res.data.data
          // arr.shift()
          // arr.shift()
          // arr.shift()
          that.data.index_tab= arr
          that.setData({
            index_tab: that.data.index_tab,
            allStatus:res.data.all,
            region: [res.data.user.su_province, res.data.user.su_city, res.data.user.su_district]
          })
      
          /*if (arr[that.data.cur]) {
            that.setData({
              array1: arr[that.data.cur].cate,
              index1: 0
            })
            if (arr[that.data.cur].cate[0]) {
              that.setData({
                array2: arr[that.data.cur].cate[0].attr,
                index2: 0
              })
            } else {
              that.data.array2 = []
              that.setData({
                array2: that.data.array2
              })
            }
          } else {
            that.data.array1 = []
            that.setData({
              array1: that.data.array1
            })
          }*/
         
        } else {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })

        }
      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })

      },
      complete() {
        that.setData({
          btnkg: 0
        })
        // // 停止下拉动作
        // wx.stopPullDownRefresh();
      }
    })
  },
  bindPickerChange: function (e) {
    var that = this
    console.log(e.currentTarget.dataset.idx)
    var type = e.currentTarget.dataset.idx
    var value = e.detail.value
    that.setData({
      region: value,
    })
    
    wx.request({
      url: app.IPurl + 'api/my/subscribe',
      data: {
        token: wx.getStorageSync('token'),
        type:2,
        body: that.data.region.join(','),
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
            icon: 'none',
            title: '操作成功'
          })

        } else {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })

        }
      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })

      },
      complete() {
        // // 停止下拉动作
        // wx.stopPullDownRefresh();
      }
    })
  },
 
  dyfuc:function(e){
    var that = this
    if (that.data.btnkg==1){
      return
    }else{
      that.setData({
        btnkg:1
      })
    }
    console.log(e.currentTarget.dataset.status)
    // if (e.currentTarget.dataset.status==0){
    //   wx.requestSubscribeMessage({
    //     tmplIds: ['wBcFzY6ar23hazy4Pfcmf_2OFAh5LyFEKiz5DE0a2Tg'],
    //     success(res) {

    //      console.log(res)
    //       if(res.wBcFzY6ar23hazy4Pfcmf_2OFAh5LyFEKiz5DE0a2Tg=='accept'){
    //         wx.request({
    //           url: app.IPurl + 'api/my/subscribe',
    //           data: {
    //             token: wx.getStorageSync('token'),
    //             type: e.currentTarget.dataset.type,
    //             body: e.currentTarget.dataset.id,
    //           },
    //           header: {
    //             'content-type': 'application/x-www-form-urlencoded'
    //           },
    //           dataType: 'json',
    //           method: 'post',
    //           success(res) {
    //             console.log(res.data)
    //             if (res.data.code == 1) {  //数据为空
    //               that.getIndextype()
    //             } else {
    //               wx.showToast({
    //                 icon: 'none',
    //                 title: '加载失败'
    //               })

    //             }
    //           },
    //           fail() {
    //             wx.showToast({
    //               icon: 'none',
    //               title: '加载失败'
    //             })

    //           },
    //           complete() {
    //             // // 停止下拉动作
    //             // wx.stopPullDownRefresh();
    //           }
    //         })
    //       }
    //     }
    //   })
    // }else{
      wx.request({
        url: app.IPurl + 'api/my/subscribe',
        data: {
          token: wx.getStorageSync('token'),
          type: e.currentTarget.dataset.type,
          body: e.currentTarget.dataset.id,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        method: 'post',
        success(res) {
          console.log(res.data)
          if (res.data.code == 1) {  //数据为空
            that.getIndextype()
          } else {
            wx.showToast({
              icon: 'none',
              title: '加载失败'
            })

          }
        },
        fail() {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })

        },
        complete() {
          // // 停止下拉动作
          // wx.stopPullDownRefresh();
        }
      })
    // }
    
    
    
    console.log(e.currentTarget.dataset.type)
    
   
    
  }
})