// pages/movie-detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        loading: true,
        movie: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const _this = this;
        // 拼接请求url
        const url = 'https://douban.uieee.com/v2/movie/subject/' + options.id;
        // 请求数据
        wx.request({
            url: url,
            data: {},
            header: {
                'content-type': 'json' // 默认值
            },
            success: function(res) {
                console.info(res);
                // 赋值
                _this.setData({
                    movie: res.data,
                    loading: false // 隐藏等待框
                });
                // 修改导航栏标题
                wx.setNavigationBarTitle({
                    title:res.data.title
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    }
})