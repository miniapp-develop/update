const updateManager = require('../index');

Component({
    properties: {
        name: {
            type: String,
            value: getApp().$__appName__
        },
        homepage: {
            type: String,
            value: getApp().$__homepage__
        }
    },
    data: {},
    pageLifetimes: {
        show() {
            updateManager.update(status => {
                this.setData(status);
            })
        }
    },
    methods: {
        onTapHome(e) {
            wx.reLaunch({
                url: this.data.homepage
            });
        }
    }
});
