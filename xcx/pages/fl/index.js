
var app = getApp()  
Page({
   data:{
      indicatorDots: true,
      autoplay: true,
      loadingHidden: false,
   },
onLoad:function(options){
// 生命周期函数--监听页面加载
  console.log('onLoad')
    var that = this
        //调用应用实例的方法获取全局数据
    app.getUserInfo(function() {
        //更新数据
        that.setData({
        })
    });
     this.getJSON(this);
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
   
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
     wx.showNavigationBarLoading();
    this.getJSON(this);
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  //http请求数据
      getJSON:function(that){
        wx.request({
          url: 'http://127.0.0.1/lb/findAll',
          method: 'GET',
            data: {},
          header: {
            'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res);
                that.setData({
                venuesItems: res.data.data,
                statusCode:res.statusCode
                })
          },
            complete:function(){
              setTimeout(function () {
                that.setData({
                  loadingHidden: true
                  })
                }, 1500);
                  wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }
        });
      },
})