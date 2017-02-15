var App = getApp()
Page({
  data:{
    mt:wx.getStorageSync('mt'),
    nr:wx.getStorageSync('nr'),
  },
  fpmt:function(e){
     this.setData({
       mt:e.detail.value     
     });
  },
  fpnr:function(e){
       this.setData({
       nr:e.detail.value     
     });
  },
  save:function(e){
      console.log(this.data.mt);
     console.log(this.data.nr);
     var mt =this.data.mt;
     var nr = this.data.nr;
     wx.setStorageSync('mt', mt);
     wx.setStorageSync('nr', nr);
    
  wx.navigateBack({
    delta: 1, // 回退前 delta(默认为1) 页面
    success: function(res){
      // success
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
     var mt = wx.getStorageSync('mt');
    var nr = wx.getStorageSync('nr');
    this.setData({
        mt :mt,
        nr:nr,
    });
    console.log(mt + "=====" + nr + "页面onshow");
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },

})
