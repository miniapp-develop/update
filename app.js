const update = require('./lib/index');

update.init({
    interceptors: [
        function (page) {
            return false;
        },
        function (page) {
            if (page.path === 'pages/index/index3') {
                console.log('拦截并跳转到首页，不会打开兜底页面');
                wx.redirectTo({
                    url: '/pages/index/index'
                });
                return true;
            }
        }
    ]
});

App({
    $__name__: '这里是App.$__name__',
    $__homepage__: '/pages/index/index',
    onLaunch(options) {
    }
});
