//test.js  
//获取应用实例  
var app = getApp()  
Page({  
  data: {  
    hiddenLoading: true,  
    indicatorDots: true,  
    autoplay: true,  
    interval: 5000,  
    duration: 1000,  
    userInfo: {}  
  },  
   onLoad: function() {
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
   
   //sliderList
        wx.request({
            url: 'http://127.0.0.1/findAll',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res);
                that.setData({
                   
                })
            }
        });
      
   
   }
    
})  



//获取应用实例
/*
imgUrls: [
        {link:'/pages/index/index',  url:'/image/ind-banner1.jpg'},
        {link:'/pages/logs/logs', url:'/image/ind-banner1.jpg'},
        {link:'/pages/happy/happy',url:'/image/ind-banner1.jpg'}   
    ], 
    mode: 'aspectFit', 
var app = getApp()
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false  // loading
    },

    //事件处理函数
    swiperchange: function(e) {
        //console.log(e.detail.current)
    },

    onLoad: function() {
        console.log('onLoad')
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

        //sliderList
        wx.request({
            url: 'http://huanqiuxiaozhen.com/wemall/slider/list',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData({
                    images: res.data
                })
            }
        })

        //venuesList
        wx.request({
            url: 'http://huanqiuxiaozhen.com/wemall/venues/venuesList',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData({
                    venuesItems: res.data.data
                })
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 1500)
            }
        })

        //choiceList
        wx.request({
            url: 'http://huanqiuxiaozhen.com/wemall/goods/choiceList',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData({
                    choiceItems: res.data.data.dataList
                })
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 1500)
            }
        })

    }
})*/
