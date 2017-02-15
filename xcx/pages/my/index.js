var uid;
var app = getApp()
//<modal  hidden="{{loginsue}}" no-cancel bindtap="loginsud">{{loginmsg}}</modal>
Page({
  data:{
     userInfo: {},
     systemInfo: {},
     loading:false,
     inphid:false,
     srsud:true,
     srsudmsg:'对不起,您还没有登录',
     it:-1,
     error:true,  
     msgerror:'',
     loginsue:true,
     loginmsg:'',
     Titletext:'会员中心',
       selected:true,
        selected1:false,
      },
  selected:function(e){
        this.setData({
            selected1:false,
            selected:true
        })
    },
    selected1:function(e){
        this.setData({
            selected:false,
            selected1:true
        })
    },
  Location:function(e){
     wx.redirectTo({
       url:'../user/index'
     })
  },
  setPlain:function(e){
      this.getJSON(this);
  },
  //错误信息提示
   //用户名或密码错误
  paserror:function(e){
      this.setData({
        error:false,
        msgerror:'对不起,用户名或密码错误!'
      });
  },
  //登录成功提示
  loginsuccess:function(e){
     this.setData({
        loginsue:false,
        loginmsg:'恭喜您,登录成功'
     });
  },
 //弹出确认框  
  modalTap: function(e) {  
     this.setData({
        srsud:false,
      });
  },  
 //跳转登录页面方法
  modallocat:function(e){
     wx.navigateTo({
       url:'../user/index'
     });
      this.setData({
        srsud:false,
      });
  },
  //退出方法
  logoutbtu:function(e){
      this.LogoutWX(this);
      this.onLoad();
  },
  //登录成功确认按钮
  loginsud:function(e){
      this.setData({
        loginsue:true
      });
      this.onLoad();
  },
  //用户名货密码错误，确定按钮方法
  suberror:function(e){
    this.setData({
        error:true
      });
  },
  //标题字体
  titlefonelog:function(e){
     wx.setNavigationBarTitle({
        title: '登录'
    });
  },
  titlefonezx:function(e){
     wx.setNavigationBarTitle({
        title: '个人中心'
    });
  },
  onLoad:function(options){
   var int = 0;
    // 生命周期函数--监听页面加载
    console.log('onLoad'+'----' + int+1);
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            });
      
        });
    that.getJSON(this);

    wx.getSystemInfo({
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          systemInfo: res,
        })
      }
    })

  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    

  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    console.log("页面显示的时候获取缓存ID");
    this.getuidSt();

  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
     console.log('刷新');
    
 
  },
  onReachBottom: function() {
     console.log('下一次');
        var that = this;
        //that.getJSON(that);
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
  getJSON:function(that){
     wx.request({
      url: 'http://127.0.0.1/findById',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        
        if(res.data.code==1){
          that.titlefonezx();
          that.setData({
            inphid:true,
            code:res.data.code,
            userItem:res.data.data,
            it:1,
            uid: res.data.data[0].id,
            });
          uid = res.data.data[0].id;
          that.saveuid(this,uid);  
        }else{
            that.titlefonelog();
            that.setData({
            code:res.data.code,
            it:0
          });
          
        }

      },
      fail: function() {
        // 失败的时候
      },
      complete: function() {
       
      }
    });
  },
  LogoutWX:function(that){
      wx.request({
        url: 'http://127.0.0.1/logout',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          console.log(res.data.code + "--------" +res.data.msg);
          if(res.data.code==0){
             that.setData({
                  it:0,
                code:res.data.code
             });
             that.RemoveSt();
          }
        },
        fail: function() {
          // fail
        },
        complete: function() {
          
        }
      })
  },
   //表单提交
  formSubmit: function(e) {  
    var that = this;  
    var formData = e.detail.value;  
    console.log(formData);
    wx.request({
      url: 'http://127.0.0.1/findByName',
      data: formData,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        if(res.data.code==1){
            that.loginsuccess();
        }else{
           that.paserror();
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
  //重置表单
  formReset: function() {  
    console.log('form发生了reset事件');  
    this.modalTap2();  
  },
  //保存uid到缓存  
  saveuid: function (that,id) {  
    try {  
      wx.setStorageSync('uid', id)  
    } catch (e) {  
      console.log(e);
    }  
  },
  //获取缓存的参数
  getuidSt:function(){        
        wx.getStorage({  
            key: 'uid',  
            success: function (res) {  
              console.log(res);
              console.log(res.data + "=========" );
            }  
        });  
  },     
  //删除本地缓存参数
  RemoveSt:function(){
       wx.removeStorage({
        key: 'uid',
        success: function(res) {
          console.log(res.data + "=========删除");
     } 
      });
  }
})