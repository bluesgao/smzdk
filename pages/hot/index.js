//index.js
var api = require('../../utils/api.js')
//获取应用实例
const app = getApp()

Page({
    data: {
        top: 0,
        slider: [],
        swiperCurrent: 0,
        tabCurrent: 'hot',
        hotCount: 1
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
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

        var that = this;
        //网络访问，获取轮播图的图片
        api.getRecommend(function(data) {
            that.setData({
                slider: data.data.slider
            })
        });

    },
    //控制回到顶部按钮的显示与消失
    scrollTopFun(e) {
        let that = this;
        that.top = e.detail.scrollTop;
        that.$apply();
    },
    onPullDownRefresh: function() {
        console.log(" onPullDownRefresh");
        wx.showNavigationBarLoading(); //在标题栏中显示加载
    },
    onReachBottom: function() {
        // 当界面的下方距离页面底部距离小于100像素时触发回调
        console.log(" onReachBottom");
        // 显示加载图标
        wx.showLoading({
            title: '玩命加载中',
        })
        // 页数+1
        page = page + 1;
        wx.request({
            url: 'https://xxx/?page=' + page,
            method: "GET",
            // 请求头部
            header: {
                'content-type': 'application/text'
            },
            success: function(res) {
                // 回调函数
                var moment_list = that.data.moment;

                for (var i = 0; i < res.data.data.length; i++) {
                    moment_list.push(res.data.data[i]);
                }
                // 设置数据
                that.setData({
                    moment: that.data.moment
                })
                // 隐藏加载框
                wx.hideLoading();
            }
        })

    },
    //轮播图的切换事件
    swiperChange: function(e) {
        //只要把切换后当前的index传给<swiper>组件的current属性即可
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    //点击指示点切换
    chuangEvent: function(e) {
        this.setData({
            swiperCurrent: e.currentTarget.id
        })
    },

    //tab切换事件
    handleChange({
        detail
    }) {
        this.setData({
            tabCurrent: detail.key
        });
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