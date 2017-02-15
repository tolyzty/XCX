// pages/sp/index.js
Page({
 data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
    },
    onLoad: function(options) {
        var id = options.id;
        var that = this
        that.getJSON(this,id);      
    },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
    console.log('关闭页面');
  },
  //获取HTTP数据
  getJSON:function(that,id){
     wx.request({
            url: 'http://127.0.0.1/lb/findBySpid/' + id,
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res.data.data[0].sp_id);
                console.log(res.data.data[0].ks_id);
                console.log(res.data.data[0].lb_id);
                that.setData({
                    list: res.data.data,
                    sp_id:res.data.data[0].sp_id,
                    lb_id:res.data.data[0].lb_id
                });
            }
        })
  },
})

