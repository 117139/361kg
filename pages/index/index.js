// pages/index/index.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		index_tab:['推荐','推荐','推荐','推荐','推荐'],
    datalist:[],
		cur:0,
		array1:[1,1,1,],
		array2:[1,1,1,],
    page:1,
    aaa: [
      '../../static/images/img1.png',
      '../../static/images/img1.png',
      '../../static/images/img1.png',
      '../../static/images/img1.png',
      '../../static/images/img1.png',
      '../../static/images/img1.png',
    ],
		index1:'',
		index2:'',
    region:['','',''],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndextype()
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
    this.getIndextype()
    
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
  getIndextype(){
    ///api/category / category_column
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl + '/api/category/category_column',
      data: {

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
          
          that.setData({
            index_tab: res.data.data,
            page:1,
          })
          if (res.data.data[0]){
            that.setData({
              array1: res.data.data[0].cate,
              index1:0
            })
            if (res.data.data[0].cate[0]) {
              that.setData({
                array2: res.data.data[0].cate[0].attr,
                index2:0
              })
            }else{
              that.data.array2=[]
              that.setData({
                array2: that.data.array2
              })
            }
          }else{
            that.data.array1 = []
            that.setData({
              array1: that.data.array1
            })
          }
          that.getlist()
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
        // // 停止下拉动作
        // wx.stopPullDownRefresh();
      }
    })
  },
  getlist() {
    ///api/category / category_column
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    var _column, _cate_id, _attr_id, _city
    if (that.data.index_tab.length>0){
      _column = that.data.index_tab[that.data.cur].id
    }else{
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
        page:that.data.page,
        pagesize:5,
        search:''
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
          if(that.data.page==1){
            that.data.datalist=[]
          }
          if (res.data.data.data.length>0){
            that.data.page++
          }else{
            wx.showToast({
              icon:'none',
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




  index_tab_fuc(e){
    console.log(e.currentTarget.dataset.idx)
    var that =this
    var idx = e.currentTarget.dataset.idx
    that.setData({
      cur: idx,
      page:1,
      array1: that.data.index_tab[idx].cate,
      index1:0,
      index2: 0,
      region:['','','']
    })
    if (that.data.index_tab[idx].cate[0]) {
      console.log(that.data.index_tab[idx].cate[0])
      that.setData({
        array2: that.data.index_tab[idx].cate[0].attr
        
      })
    } else {
      console.log(8)
      that.data.array2 = []
      that.setData({
        array2: []
      })
    }
    that.getlist()
  },
	bindPickerChange: function(e) {
    var that =this
		console.log(e.currentTarget.dataset.idx)
		var type=e.currentTarget.dataset.idx
    var value=e.detail.value
    that.setData({
      page: 1,
    })
		if(type==1){
			this.setData({
        index1: value,
        index2: 0,
        region:['','','']
			})
      if (res.data.data[value].cate[0]) {
        that.setData({
          array2: res.data.data[value].cate[0].attr
        })
      } else {
        that.data.array2 = []
        that.setData({
          array2: that.data.array2
        })
      }
		}else if(type==2){
			this.setData({
        index2: value,
        region: ['', '', '']
			})
		}else{
			this.setData({
        region: value
			})
		}
    that.getlist()
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