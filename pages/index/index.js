//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      movies: [{ "id": "12", "name": "变形金刚变形金刚变形金刚变形金刚变形金刚1", "summary": "《变形金刚1》（Transformers）是历史上最成功的商业动画之一，最初改编自日本TAKARA公司的戴亚克隆和微星系列。它在玩具市场和影响市场上取得的成功是空前巨大的，以至于80年代一度风靡全球，在亚欧美等多个国家都兴起了一股“变形”热，让“transformers”成为全世界家喻户晓的名词。", "cast": "乔治亚瑟布鲁姆" }, { "id": "13", "name": "变形金刚2", "summary": "《变形金刚2》（Transformers）是历史上最成功的商业动画之一，最初改编自日本TAKARA公司的戴亚克隆和微星系列。它在玩具市场和影响市场上取得的成功是空前巨大的，以至于80年代一度风靡全球，在亚欧美等多个国家都兴起了一股“变形”热，让“transformers”成为全世界家喻户晓的名词。", "cast": "乔治亚瑟布鲁姆" }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
