var app = getApp()
// <toast hidden="{{resucceed}}" bingchange="resucceed">{{submessage}}</toast>
//<modal class="modal" hidden="{{modalerr}}" no-cancel  bindtap="modalclear" >  {{errmessage}}</modal>  
Page({
  data:{
    resucceed:true,
    resmessage:'',
    errmessage:'',
    modalsud:true,
    modalerr:true
  },

  //弹出确认框  
  modalTap: function(e) {  
    this.setData({  
      modalsud: false,
      resmessage:'恭喜您,注册成功！'  
    })  
  },  

  modallocat:function(e){
     wx.redirectTo({
       url:'../user/index'
     }),
   this.setData({
     modalsud: true
   })
  },
  //弹出错误信息框框
  modalTaperr:function(e){
    this.setData({
        modalerr:false,
        errmessage:'对不起,网络错误!请稍后重试'
    });
  },
  modalclear:function(e){
     this.setData({
        modalerr:true
     });
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
  formSubmit: function(e) { 
    var that = this; 
    var formData = e.detail.value;   
    console.log(formData);
    if(formData.username==''||formData.password==''||formData.phone==''){
        console.log('请填写用户名密码和手机号');
        return false;
    }else{
        that.subrg(formData,that);
    }
  
  }, 
  subrg: function(formData,that) {  
    wx.request({  
      url: 'http://127.0.0.1/regist',  
      data: formData,  
      method: 'POST',
      header: {  
          'Content-Type': 'application/json'  
      },  
      success: function(res) {  
         if(res.data.code==200){
            that.modalTap();
        }else{
            that.modalTaperr();
        }
      },
    }); 
  },  
 
})
