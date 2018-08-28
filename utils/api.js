//网络访问相关方法
function getRecommend(callback) {
    wx.request({
        url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
        data: {
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1,
            _: Date.now()
        },
        method: 'GET',
        header: {
            'content-Type': 'application/json'
        },
        success: function (res) {
            console.log('submit success')
            console.log(res.data);
            if (res.statusCode == 200) {
                callback(res.data);
            }
        },
        fail: function (res) {
            console.log('submit fail');
        },
        complete: function (res) {
            console.log('submit complete');
        }

    })
}

module.exports = {
    getRecommend: getRecommend
}