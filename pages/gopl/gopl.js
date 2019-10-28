// pages/orderpl/orderpl.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnkg:0,
    issue_id:'',
    pid:-1,
		content:'',
		fw:0,
		zy:0,
		plf:[1,2,3,4,5],
    o_no:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id){
      this.setData({
        issue_id: options.id
      })
    }
    if (options.pid){
      this.setData({
        pid: options.pid
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
    this.setData({
      btnkg: 0
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
	bindTextAreaBlur: function(e) {
    // console.log(e.detail.value)
		this.setData({
			content:e.detail.value
		})
  },
	sub(){
		var that =this
		console.log(that.data.content)
		console.log(that.data.fw)
		console.log(that.data.zy)
    
    // return
		if(that.data.content==''){
			wx.showToast({
				icon:'none',
				title:'请输入评论'
			})
			return
		}
    if (that.data.btnkg==1){
      return
    }else{
      that.setData({
        btnkg:1
      })
    }
    var data
    if (that.data.pid != -1) {
      data = {
        content: that.data.content,
        issue_id: that.data.issue_id,
        "token": wx.getStorageSync('token'),
        comment_id: that.data.pid
      }
    } else {
      data = {
        content: that.data.content,
        issue_id: that.data.issue_id,
        "token": wx.getStorageSync('token')
      }
    }
    wx.request({
      url: app.IPurl + '/api/comment/save',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'post',
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          that.setData({
            content: ''
          })
          wx.showToast({
            icon: 'none',
            title: '提交成功'
          })
          setTimeout(function () {
            that.setData({
              btnkg: 0
            })
            wx.navigateBack()
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
        that.setData({
          btnkg: 0
        })
        wx.showToast({
          icon: 'none',
          title: '操作失败'
        })
        console.log('失败')
      }
    })
    /*wx.showModal({
      title: '提示',
      content: '是否提交该评论?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })*/
		
	}
	
})