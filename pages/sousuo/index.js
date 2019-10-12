// pages/index/index.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

    this.getlist()
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
  getlist() {
    ///api/category / category_column
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    var _column, _cate_id, _attr_id, _city
    if (that.data.index_tab.length > 0) {
      _column = that.data.index_tab[that.data.cur].id
    } else {
      return
    }
    if (that.data.array1.length > 0) {
      _cate_id = that.data.array1[that.data.index1].id
    }
    if (that.data.array2.length > 0) {
      _attr_id = that.data.array2[that.data.index2].id
    }

    wx.request({
      url: app.IPurl + '/api/issue/index',
      data: {
        token: wx.getStorageSync('token'),
        column: _column,
        cate_id: _cate_id,
        attr_id: _attr_id,
        province: that.data.region[0],
        city: that.data.region[1],
        district: that.data.region[2],
        page: that.data.page,
        pagesize: 5,
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
              title: '到底了...',
            })
          }
          that.data.datalist = that.data.datalist.concat(res.data.data.data)
          that.setData({
            datalist: that.data.datalist,
            page: that.data.page
          })
        } else {
          htmlStatus1.error()
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })

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