function listener(page) {
    console.warn('page not found:', page.path);
    wx.redirectTo({
        url: opt_not_found
    });
}

const DEFAULT_NOT_FOUNT = '/pages/404/index';
let opt_not_found = DEFAULT_NOT_FOUNT;

function init(option = {}) {
    opt_not_found = option.page || DEFAULT_NOT_FOUNT;
    wx.onPageNotFound(listener);
}

function update(callback) {
    callback({
        step: 1,
        hasUpdate: false,
        updateReady: false,
        giveup: false
    });
    wx.getUpdateManager().onCheckForUpdate(({hasUpdate}) => {
        if (hasUpdate) {
            callback({
                step: 2,
                hasUpdate: true,
                updateReady: false,
                giveup: false
            });
        } else {
            callback({
                step: 2,
                hasUpdate: false,
                updateReady: false,
                giveup: true
            });
        }
    });

    wx.getUpdateManager().onUpdateReady(() => {
        callback({
            step: 3,
            hasUpdate: true,
            updateReady: true,
            giveup: false
        });
        wx.showModal({
            content: '为你准备了新的版本，点击“确定”应用新版本',
            showCancel: false,
            success(res) {
                if (res.confirm) {
                    wx.getUpdateManager().applyUpdate();
                }
            }
        });
    });

    wx.getUpdateManager().onUpdateFailed(() => {
        callback({
            step: 3,
            hasUpdate: true,
            updateReady: false,
            giveup: true
        });
    });
}

exports.init = init;
exports.update = update;

