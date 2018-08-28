const config = require("config.js");

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//get请求
function httpGet(parameters = "", success) {
    wx.request({
        url: config.BaseURL +  parameters,
        data: {},
        method: 'GET',
        header: {
            'content-Type': 'json'
        }, // 设置请求的 header
        success: function(res) {
            console.log(res);
            success(res);
        },
        fail: function() {
            // fail
        },
        complete: function() {
            // complete
        }
    })
}

//成功提示
function showSuccess(title = "成功啦", duration = 2500) {
    wx.showToast({
        title: title,
        icon: 'success',
        duration: (duration <= 0) ? 2500 : duration
    });
}

//loading提示
function showLoading(title = "请稍后", duration = 5000) {
    wx.showToast({
        title: title,
        icon: 'loading',
        duration: (duration <= 0) ? 5000 : duration
    });
}

//隐藏提示框
function hideToast() {
    wx.hideToast();
}

module.exports = {
    formatTime: formatTime,
    httpGet: httpGet,
    showSuccess: showSuccess,
    showLoading: showLoading,
    hideToast: hideToast
}