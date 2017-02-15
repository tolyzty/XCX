var app = getApp(); 
// <modal hidden="{{subHidden}}" no-cancel bindTap="{{subLocat}}">{{submsg}}</modal> 
Page({
  data:{
    toast1Hidden:true,  
    modalHidden: true,  
    modalHidden2: true,  
    subHidden:true,
    submsg:'',
    toastTj:true,
    notice_str: '',
    error:true,  
    msgerror:'',
    password:'',
    username:'',
  },

  subLocat:function(e){
    wx.navigateBack();
  },
  toast1Change:function(e){  
    this.setData({toast1Hidden:true});  
  },  
  toastTj:function(e){
    this.setData({toastTj:true});
  },
  suberror:function(e){
      this.setData({error:true});

  },  
  
  //用户名或密码错误
  paserror:function(e){
      this.setData({
        error:false,
        msgerror:'对不起,用户名或密码错误!'
      });
  },
  //弹出确认框  
  modalTap: function(e) {  
    this.setData({  
      modalHidden: false  
    })  
  },  
  successTj: function(e) {  
   /* console.log(e);  
    this.setData({  
      modalHidden: true,  
      toast1Hidden:false,  
      notice_str: '提交成功'  
    });   */
  },  
  //弹出提示框  
  modalTap2: function(e) {  
    this.setData({  
      modalHidden2: false  
    })  
  },  
  modalChange2: function(e) {  
    this.setData({  
      modalHidden2: true  
    })  
  },  
  cancel_one: function(e) {  
    console.log(e);  
    this.setData({  
      modalHidden: true,  
      toast1Hidden:false,  
      notice_str: '取消成功'  
    });  
  },  
  onLoad:function(options){
     
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
   wx.request({  
      url: 'http://127.0.0.1/findByName',  
      data: formData,  
      header: {  
          'Content-Type': 'application/json'  
      },  
      success: function(res) {  
        console.log(res.data.code)  
        if(res.data.code==0){
            that.paserror();
        }else{
            that.subLocat(res.data.code);
        }
       
       // that.modalTap();  
      }  
    }) 
  },  
  formReset: function() {  
    console.log('form发生了reset事件');  
    this.modalTap2();  
  }  
})