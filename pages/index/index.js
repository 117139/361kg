// pages/index/index.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    btnkg:0,
		index_tab:[],
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
    this.setData({
      token:wx.getStorageSync('token')
    })
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
    var that =this
    that.setData({
      btnkg: 0,
    })
    if (that.data.cur != 1) {
      that.getIndextype()
    }
    if(!that.data.token){
      if (that.data.token!=wx.getStorageSync('token')){
        this.setData({
          token: wx.getStorageSync('token')
        })
        that.setData({
          page: 1
        })
        that.getlist()
      }
    }
    // that.getlist()
  },
  retry(){
    this.setData({
      btnkg:0,
      datalist: [],
      page: 1
    })
    this.getIndextype()
    // that.getlist()
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
    })
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
          if (res.data.data[that.data.cur]){
            that.setData({
              array1: res.data.data[that.data.cur].cate,
              index1:0
            })
            if (res.data.data[that.data.cur].cate[0]) {
              that.setData({
                array2: res.data.data[that.data.cur].cate[0].attr,
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
  formSubmit_oo: function (e) {
    console.log(e.detail.formId)
    if (e.detail.formId != 'the formId is a mock one') {
      wx.request({
        url: app.IPurl + '/api/category/form_id',
        data: {
          token: wx.getStorageSync('token'),
          formid: e.detail.formId,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        method: 'post',
        success(res) {
          console.log(res.data)
          if (res.data.code == 1) {  //数据为空
            console.log(res)
          }
        },
        fail() {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })

        },
        complete() {
        }
      })
    }
    
  },
  formSubmit_o: function (e) {
    console.log(e.currentTarget.dataset)
    this.index_tab_fuc(e)
    if (e.detail.formId != 'the formId is a mock one') {
      wx.request({
        url: app.IPurl + '/api/category/form_id',
        data: {
          token: wx.getStorageSync('token'),
          formid: e.detail.formId,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        method: 'post',
        success(res) {
          console.log(res.data)
          if (res.data.code == 1) {  //数据为空
            console.log(res)
          }
        },
        fail() {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })

        },
        complete() {
        }
      })
    }
    // console.log(e.detail, this.data.formIdString)
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
        pagesize:10,
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
          if (that.data.page == 1) {
            that.data.datalist = []
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
          if (that.data.datalist.length == 0) {
            htmlStatus1.dataNull()
          }
        } else if (res.data.code == -1) {
          that.setData({
            datalist: [],
            page: 1
          })
          wx.showToast({
            icon: 'none',
            title: '请先登录账号'
          })
          
          htmlStatus1.dataNull()
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/login/login',
            })
          },1000)
        } else {
          if(res.data.msg){
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })
          }else{
            wx.showToast({
              icon: 'none',
              title: '加载失败'
            })
          }
          htmlStatus1.error()
          

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
  guanzhu(e){
    var that =this
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
          setTimeout(function(){
            that.setData({
              btnkg: 0
            })
             that.retry() 
          },1000)
        } else {
          that.setData({
            btnkg: 0
          })
          if(res.data.msg){
            wx.showToast({
              icon: 'none',
              title: res.data.msg
            })
          }else{
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
      if (that.data.index_tab[that.data.cur].cate[value]) {
        that.setData({
          array2: that.data.index_tab[that.data.cur].cate[value].attr
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
	  // clearInterval(that.data.intervalfuc)
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