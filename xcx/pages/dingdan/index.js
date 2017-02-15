var  datas = {};
var spid;
var uuid;
var lys;
var fpxx = 0;
var App = getApp()
Page({
  data:{
    array: ['电子发票', '纸质发票', '不开发票'],
    index: 0,
    ly:'',
    fpmt:'',
    mt:'',
    nr:'',
    
  },
  //发票信息
  listenerPickerSelected: function(e) {
      //改变index值，通过setData()方法重绘界面   
      var spid = this.data.spid;
      var uid = this.data.uuid;
     console.log('picker发送选择改变，携带值为', e.detail.value + 'spid:'+spid +'uid:' +uid);  
      this.setData({
        index: e.detail.value,       
      });
      fpxx = this.data.index;
     // this.findBySpid(spid,uid,this);
  }, 
  //获取留言
  lyinput:function(e){
      this.setData({
      ly:e.detail.value
    });
    lys = this.data.ly;
  },
  //获取缓存的参数
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.setData({
        spid:options.id,
        uuid:wx.getStorageSync('uid'),
        fpmt:'个人',
    });
    //获取本地存储
    var spid = this.data.spid;
    var uid = this.data.uuid;
    this.findBySpid(spid,uid,this);
    
    //this.Savedd(datas)
  },

  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    this.setData({
       mt:wx.getStorageSync('mt'),
       nr:wx.getStorageSync('nr')
       
    });
    console.log(wx.getStorageSync('mt') +"======="+ wx.getStorageSync('nr'));
    
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
  //保存
  save:function(e){
    var das = datas;   
    das.ddly = lys;
    das.ddfplx = fpxx;
    das.ddfpmt = wx.getStorageSync('mt');
    das.ddfpnr = wx.getStorageSync('nr');
    das.ddbh = new Date().getTime();
    this.Savedd(das);
  },
  Savedd:function(datas){
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/dd/savedd',
      data:datas,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        if(res.data.code==200){
           that.clearStorage();
        }
      },
      fail: function() {

      },
      complete: function() {
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
      }
    })
  },
  clearStorage:function(e){
     wx.removeStorage({
            key: 'mt',
            success: function(res) {
              console.log(res);
            } 
          });
     wx.removeStorage({
            key: 'nr',
            success: function(res) {
              console.log(res);
            } 
          });
  },
  findBySpid:function(id,uid,that){
     var fplx = that.data.index;
     var ly = that.data.ly;
     wx.request({
       url: 'http://127.0.0.1/lb/findBySpid/' + id,
       data: {},
       method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       // header: {}, // 设置请求的 header
       success: function(res){
         console.log(res.data.data);
         var json = res.data.data[0];
         
         that.setData({
            sptitle:json.sp_title,
            spnubmer:1,
            spamount:json.sp_price,
         });
          datas = {
            ddspid:id,
            dduserid:uid,
            ddlbid:json.lb_id,
            ddspamount:json.sp_price,
            ddnubmer:1,
            ddzt:0,
            ddname:'张天佑',
            ddaddress:'jilinchangchun',
            ddpay:'微信',
            ddphone:'11111111',
          }
          console.log(res);
         
       },
       fail: function() {
         // fail
       },
       complete: function() {
         // complete
       }
     })
  },
    
})
