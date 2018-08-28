// pages/home/index.js
const util = require("../../utils/util.js");

var types = ["in_theaters", "coming_soon", "top250"];
var page = 0; //页码

//数据类型
var DATATYPE = {
    HOT: "in_theaters",
    UPCOMING: "coming_soon",
    TOP: "top250"
};

Page({
    //页面的初始化数据
    data: {
        hotDataList: [],
        upcomingDataList: [],
        topDataList: [],
        topTabItems: ["正在热映", "即将上映", "TOP250"],
        currentTopItem: "0",
        swiperHeight: "0"
    },
    //页面初始化 options为页面跳转所带来的参数
    //生命周期函数，监听页面加载
    onLoad: function(options) {
        this.refreshNewData();
    },
    //生命周期函数-监听页面初次渲染完毕
    onReady: function() {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    swiperHeight: (res.windowHeight - 37)
                });
            }
        })
    },
    //切换顶部标签
    switchTab: function(e) {
        this.setData({
            currentTopItem: e.currentTarget.dataset.idx
        });
        //如果需要加载数据
        if (this.needLoadNewDataAfterSwiper()) {
            this.refreshNewData();
        }
    },

    //swiperChange
    bindChange: function(e) {
        var that = this;
        that.setData({
            currentTopItem: e.detail.current
        });

        //如果需要加载数据
        if (this.needLoadNewDataAfterSwiper()) {
            this.refreshNewData();
        }
    },
    //刷新数据
    refreshNewData: function() {
        //加载提示框
        util.showLoading();

        var that = this;
        var parameters = types[this.data.currentTopItem] + "&start=" + (page);
        console.log("parameters = " + parameters);

        util.httpGet(parameters, function(res) {
            page = 1;
            that.setNewDataWithRes(res, that);
            setTimeout(function() {
                util.hideToast();
                wx.stopPullDownRefresh();
            }, 1000);
        });
    },

    //监听用户下拉动作
    onPullDownRefresh: function() {
        this.refreshNewData();
    },

    //滚动后需不要加载数据
    needLoadNewDataAfterSwiper: function() {

        switch (types[this.data.currentTopItem]) {
            case DATATYPE.HOT:
                return this.data.hotDataList.length > 0 ? false : true;
            case DATATYPE.UPCOMING:
                return this.data.upcomingDataList.length > 0 ? false : true;
            case DATATYPE.TOP:
                return this.data.topDataList.length > 0 ? false : true;
            default:
                break;
        }
        return false;
    },

    //设置新数据
    setNewDataWithRes: function(res, target) {
        console.info(target.data);
        console.info(types[this.data.currentTopItem]);

        switch (types[this.data.currentTopItem]) {
            case DATATYPE.HOT:
                target.setData({
                    hotDataList: res.data.subjects
                });
                console.info(target.data);
                break;
            case DATATYPE.UPCOMING:
                target.setData({
                    upcomingDataList: res.data.subjects
                });
                break;
            case DATATYPE.TOP:
                target.setData({
                    topDataList: res.data.subjects
                });
                break;
            default:
                break;
        }
    },

    //加载更多操作
    loadMoreData: function() {
        console.log("加载更多");
        //加载提示框
        util.showLoading();

        var that = this;
        var parameters = types[this.data.currentTopItem] + "&start=" + (page + 1);
        console.log("parameters = " + parameters);
        util.httpGet(parameters, function(res) {
            page += 1;
            that.setMoreDataWithRes(res, that);
            setTimeout(function() {
                util.hideToast();
                wx.stopPullDownRefresh();
            }, 1000);
        });
    },

    //点击赞按钮
    zanEvent: function(e) {
        console.log("------赞-------");
        console.log(e);
    }
})