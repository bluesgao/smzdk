// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: ""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        // 从全局数据中获取用户信息
        this.setData({
            userInfo: app.globalData.userInfo
        });
        console.info(this.data.userInfo);
    },
    /**
     * 自定义函数
     */
    clickme: function() {
        console.log("click me");
    }
})