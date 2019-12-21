//js
Page({
  data: {
    condition1: false,
    state: "off",
    hour:0,
    minute:0,
    rendom1:0,
 rendom2: 0,
 sum:0,
 judge:0,
 stop:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载时就获取后台的数据
    this.get_data()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  fz1: function () {

    this.setData({
      state: "on",
      condition1: false
    
    })
    wx.showToast({
      title: this.data.state,
      duration: 1000
    })
    this.sendRequset(this.makeObj(this.data.state, this.data.hour, this.data.minutee, this.data.stop,  ""));

  },
  fz3: function () {//解除闹钟功能
    if (this.data.judge==1)
    {this.setData({
      state: "off",
      condition1:false
      
    })
    wx.showToast({
      title: this.data.state,
      duration: 1000
    })
    this.sendRequset(this.makeObj(this.data.state, this.data.hour, this.data.minutee, this.data.stop, ""));
  this.setData({
   judge:0
  }) 
    }
else
this.tip2()

  },
  change1: function (e) {
    //当有输入时激活发送按钮，无输入则禁用按钮
    if (e.detail.value != "") {
      this.setData({
        hour: parseInt(e.detail.value),

      })
    }

  },
   change2: function (e) {
    //当有输入时激活发送按钮，无输入则禁用按钮
    if (e.detail.value != "") {
      this.setData({
        minute: parseInt( e.detail.value),

      })
    }

  },
  fz2: function () {

    wx.showToast({
      title: "ok",
      duration: 1000
    })
    this.sendRequset(this.makeObj(this.data.state, this.data.hour, this.data.minutee, this.data.stop, ""));//调用*1和*2
  },

question:function()//产生随机问题,两个随机数
{
  this.setData({
    rendom1: Math.floor(Math.random() * 50 + 50),
    rendom2: Math.floor(Math.random() * 50 + 50),
    condition1:true
  })
},
  change3: function(e) {
    //当有输入时激活发送按钮，无输入则禁用按钮
    if (e.detail.value != "") {
      this.setData({
        sum: parseInt(e.detail.value),


      })
    }
  },
    judge:function()  //判断答案是否正确
    {
      if (this.data.sum == this.data.rendom1 +this.data. rendom2)
    { this.setData({
        judge:1
  }),
  this.tip1()}
  else
      this.tip2()
    },
   fz4:function(){//停止响铃
     if (this.data.judge==1)
{  this.setData({
    stop:1,
       condition1: false,
   
  })
       wx.showToast({
         title: "stop",
         duration: 1000
       })
     this.sendRequset(this.makeObj(this.data.state, this.data.hour, this.data.minute,this.data.stop, ""));
     this.setData({
       stop: 0,
       judge:0
     })
   }
   else
   this.tip2()
   },
  tip1: function () {//提示成功
     wx.showToast({
       title: "success",
       duration: 1000,
       
     })
   },
   tip2:function(){//提示停止闹钟或解除功能失败
     wx.showToast({
       title:"failure",
       duration: 1000,
       icon:"none"
     })
   },

  sendRequset: function (obj) {//数据发送*1
    wx.request(obj);
  },

  makeObj: function (sta, hou, min, sto, msg) {//数据发送*2

    var obj = {
      url: "https://api.heclouds.com/devices/562167282/datapoints?type=3",

      header: {
        "Content-Type": "application/json",
        "api-key": "dAvEnSiGWxAyDBKAQ8TtZODJqMM=",
        //"Host": "api.heclouds.com"
      },
      method: "post",
      data: {


        "state": sta == "on" ? 210:220,
        "hour": hou,
        "minute": min,
"stop":sto
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: "ok",
          duration: 1000
        })
        if (msg != "") {
          wx.showToast({
            title: msg,
            duration: 2000
          })
          //console.log(i);
        }

      }
    }

    return obj;
  },


  get_data: function () {
    // 获取数据
    var that = this;
    wx.request({
      url: 'https://api.heclouds.com/devices/562167282/datapoints?datastream_id=state,hour,minute,stop&limit=1',//limit=1表示最近一次的数据
      header: {
        'content-type': 'application/json',
        'api-key': 'dAvEnSiGWxAyDBKAQ8TtZODJqMM='
      },

      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: "OK",
          duration: 1000
        })

        console.log(res.data.data.datastreams[0].datapoints[0].value),//打印最近数据
          console.log(res.data.data.datastreams[1].datapoints[0].value),
        console.log(res.data.data.datastreams[2].datapoints[0].value),
          console.log(res.data.data.datastreams[3].datapoints[0].value),
        that.setData({
          hour: res.data.data.datastreams[0].datapoints[0].value,
          minute: res.data.data.datastreams[2].datapoints[0].value,
          state: ((res.data.data.datastreams[1].datapoints[0].value) ==210 ? "ON" : "OFF"),
          rendom1: Math.floor(Math.random() * 50 + 50),
          rendom2: Math.floor(Math.random() * 50 + 50)
        })
      }
    })
  }
})
