// pages/lb/index.js
var id = 0;
Page({
  data:{
    hiddenLoading: false
  },
   onLoad: function(options) {
        console.log(options.id);
        id = options.id;
        var that = this
        this.getJSON(that,id);   
        
    },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    console.log('页面显示');
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onPullDownRefresh:function(){
     //下拉刷新
      console.log(id + "：我是全局id");
      wx.showNavigationBarLoading();
      this.getJSON(this,id);
  },
  getJSON:function(that,id){
    wx.request({
            url: 'http://127.0.0.1/lb/findById/' + id,
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                 that.setData({
                    list: res.data.data,
                    statusCode:res.statusCode
                });        
            },
            complete:function(res){
                setTimeout(function () {
                    that.setData({
                        hiddenLoading: true
                    })
                }, 1500);
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            }
        });
  },
})



