//app.js
App({
  IPurl: 'http://361kg.800123456.top',
  onLaunch: function () {
    let that=this
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('userWxmsg')
    wx.removeStorageSync('tokenstr')
    wx.removeStorageSync('member')
    wx.removeStorageSync('zprice')
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log('16app'+JSON.stringify(res))
        // console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']==true) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log('已经授权')
    			wx.getUserInfo({
    				success(back) {
              that.globalData.userInfo = back.userInfo
    					console.log(that.globalData.userInfo)
              wx.setStorageSync('userInfo', back.userInfo)
    					if(!that.globalData.userInfo){
    						// wx.reLaunch({
    						//   url: '/pages/login/login',
    						//   fail: (err) => {
    						//     console.log("失败: " + JSON.stringify(err));
    						//   }
    						// })
    					}else{
    						// that.dologin()
								// return
                wx.login({
                  success: function (result) {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    var uinfo = that.globalData.userInfo
                    let data = {
                      code: result.code,
                      nickname: uinfo.nickName,
                      avatar: uinfo.avatarUrl,
                    }
                    let rcode = result.code
                    console.log(result.code)
                    wx.request({
                      url: that.IPurl + '/api/login/login',
                      data: data,
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      dataType: 'json',
                      method: 'POST',
                      success(res) {
                        console.log(res.data)
                        if (res.data.code == 1) {
                          console.log('登录成功')
                          wx.setStorageSync('userInfo', back.userInfo)
                          wx.setStorageSync('token', res.data.data)
                        } else {
                          wx.removeStorageSync('userInfo')
                          wx.removeStorageSync('userWxmsg')
                          wx.setStorageSync('token', res.data.data)
                          wx.showToast({
                            icon: 'none',
                            title: '登录失败',
                          })
                        }
    
                      },
                      fail() {
                        wx.showToast({
                          icon: 'none',
                          title: '登录失败'
                        })
                      }
                    })
                  }
                })
    					}
    				}
    			})
    			
        }else{
    		  // wx.reLaunch({
    		  //     url: '/pages/login/login',
    		  //     fail: (err) => {
    		  //       console.log("失败: " + JSON.stringify(err));
    		  //     }
    			// })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
	dologin(type){
		let that =this
		wx.login({
		  success: function (res) {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
	      var uinfo = that.globalData.userInfo
		    let data = {
					// key:'server_mima',
					code:res.code,
	        // apipage:'login',
	        nickname: uinfo.nickName,
	        avatar: uinfo.avatarUrl,
	        // homeid: 0   //0用户端，1师傅端
		    }
				let rcode=res.code
				console.log(res.code)
				wx.request({
	        url: that.IPurl + '/api/login/login',
					data: data,
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					dataType:'json',
					method:'POST',
					success(res) {
						console.log(res.data)
						if(res.data.code==1){
	            console.log('登录成功')
	            wx.setStorageSync('token', res.data.data)
	            // wx.setStorageSync('login', 'login')
	            // wx.setStorageSync('morenaddress', res.data.user_member_shopping_address)
	            // wx.setStorageSync('appcode', rcode)
							if(type=='shouquan'){
								// wx.reLaunch({
								//   url: '/pages/index/index',
								//   fail: (err) => {
								//     console.log("失败: " + JSON.stringify(err));
								//   }
								// })
	              wx.navigateBack()
							}
							
							
							
						}else{
	            wx.removeStorageSync('userInfo')
	            wx.removeStorageSync('token')
	            wx.showToast({
	              icon:'none',
	              title: '登录失败',
	            })
	          }
					
					},
					fail() {
						wx.showToast({
							icon:'none',
							title:'登录失败'
						})
					}
				})
		  }
		})
	},
	
	jump(e){
		console.log(e)
		wx.navigateTo({
			url:e.currentTarget.dataset.url
		})
	},
	pveimg(current,urls) {
	  let urls1 = []
	  if (urls) {
	    urls1 = urls
	    
	  } else {
	    urls1[0] = current
	  }
	  wx.previewImage({
	    current: current, // 当前显示图片的http链接
	    urls: urls1 // 需要预览的图片http链接列表
	  })
	},
  call(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },
	data: {
			haveLocation: false,
			activity_lat: -1,
			activity_lng: -1,
			activity_location: ""
	}
})