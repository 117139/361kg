// pages/index/index.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    btnkg:0,
    page:1,
    search:'',    //搜索
		index_tab:[],
    datalist: [],
		cur:0,
		array1:[],
		array2:[],
		array3:[],
		index1:'',
		index2:'',
		index3:'',
    region: ['', '', ''],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: wx.getStorageSync('token')
    })
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
      btnkg:0,
     
    })
    if (that.data.search == "") {
      // // 停止下拉动作
      // wx.stopPullDownRefresh();
      return
    }
    if (!that.data.token) {
      console.log(that.data.token != wx.getStorageSync('token'))
      if (that.data.token != wx.getStorageSync('token')) {
        that.setData({
          token: wx.getStorageSync('token')
        })
        that.setData({
          page: 1,
          datalist: []
        })
        that.getlist()
      }
    }
  },
  retry(){
    
    if (this.data.search == "") {
      // 停止下拉动作
      wx.stopPullDownRefresh();
      return
    }
    this.setData({
      btnkg: 0,
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
  bint(e) {
    console.log(e.detail.value)
    this.setData({
      search: e.detail.value
    })

  },
  getlist(e) {
    
    ///api/category / category_column
    var that = this
    if (that.data.search == "") {
      wx.showToast({
        icon:'none',
        title: '请输入搜索内容',
      })
      // 停止下拉动作
      wx.stopPullDownRefresh();
      return
    }
    if (e) {
      that.setData({
        page: 1,
        datalist: []
      })
    }
    const htmlStatus1 = htmlStatus.default(that)
    // var _column, _cate_id, _attr_id, _city
    // if (that.data.index_tab.length > 0) {
    //   _column = that.data.index_tab[that.data.cur].id
    // } else {
    //   return
    // }
    // if (that.data.array1.length > 0) {
    //   _cate_id = that.data.array1[that.data.index1].id
    // }
    // if (that.data.array2.length > 0) {
    //   _attr_id = that.data.array2[that.data.index2].id
    // }

    wx.request({
      url: app.IPurl + '/api/issue/index',
      data: {
        token: wx.getStorageSync('token'),
        column: '',
        cate_id: '',
        attr_id: '',
        province: '',
        city: '',
        district: '',
        page: that.data.page,
        pagesize: 10,
        search: that.data.search
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
          if (that.data.page == 1) {
            that.data.datalist = []
          }
          if (res.data.data.data.length > 0) {
            that.data.page++
          } else {
            wx.showToast({
              icon: 'none',
              title: '暂无更多内容',
            })
          }
          that.data.datalist = that.data.datalist.concat(res.data.data.data)
          that.setData({
            datalist: that.data.datalist,
            page: that.data.page
          })
          if (that.data.datalist.length==0){
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
            that.retry()
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

	jump(e){
	  var that =this
	  clearInterval(that.data.intervalfuc)
		app.jump(e)
	},
  call(e) {
    app.call(e)
  },
	pveimg(e) {
	  var curr = e.currentTarget.dataset.src
	  var urls = e.currentTarget.dataset.array
	  app.pveimg(curr, urls)
	}
})