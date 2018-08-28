Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabCurrent: 'hot',
        hotCount: 1,

        title: '', //标题
        list: [], // 数据列表
        movieType: '', // 数据类型
        loading: true // 显示等待框
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        console.log("onLoad");
        const _this = this;
        // 拼接请求url

        const url = 'https://douban.uieee.com/v2/movie/coming_soon';
        // 请求数据
        wx.request({
            url: url,
            data: {},
            method: 'GET',
            header: {
                'content-Type': 'json'
            },
            success: function(res) {
                console.log(res.data);
                // 赋值
                _this.setData({
                    title: res.data.title,
                    list: res.data.subjects,
                    //type: options.type,
                    loading: false // 关闭等待框
                });
                
                //修改导航栏标题
                wx.setNavigationBarTitle({
                    title: res.data.title
                });
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        console.log("onReady");
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    //tab切换事件
    handleChange({ detail}) {
        this.setData({
            tabCurrent: detail.key
        });
    },
})