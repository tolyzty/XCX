var uid;
var ddhg;
var App = getApp()
Page({
  data:{
      selected:true,
      selected1:false,
      selected2:false,
      selected3:false,
      hiddenToast:true
  },
  selected:function(e){
        this.setData({
            selected1:false,
            selected:true,
            selected2:false,
            selected3:false,
        });
        
    },
    selected1:function(e){
        this.setData({
            selected:false,
            selected1:true,
            selected2:false,
            selected3:false
        })
    },
      selected2:function(e){
        this.setData({
            selected:false,
            selected1:false,
            selected2:true,
            selected3:false
        })
    },
    selected3:function(e){
        this.setData({
            selected:false,
            selected1:false,
            selected2:false,
            selected3:true
        })
    },
    findAll:function(uid){
      var that = this;
        wx.request({
          url: 'http://127.0.0.1/dd/findAll/'+uid+'',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            console.log(res.data.data);
            console.log(res);
            that.setData({
               orderdata:res.data.data 
            });
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    removeOrder:function(e){
      var that = this;
      var bhid = e.target.dataset.id;
       wx.request({
         url: 'http://127.0.0.1/dd/removeById/'+bhid+'',
         data: {},
         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         // header: {}, // 设置请求的 header
         success: function(res){
           console.log(res); 
           if(res.data.code==1){
               that.setData({
                hiddenToast: false
            });
           }
         },
         fail: function() {
           // fail
         },
         complete: function() {
           // complete
         }
       })
    },
    Toastchange:function(e){
      var that = this;
         that.setData({
                hiddenToast: true
            });
      that.findAll(uid);
    },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
       this.setData({
        dduid:options.id
     });
     uid = this.data.dduid;
     this.findAll(uid);
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

 
})