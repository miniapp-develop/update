const updateManager = require('../index');

Component({
    properties: {
        name: {
            type: String,
            value: ''
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
    methods: {}
});
