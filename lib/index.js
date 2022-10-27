const DEFAULT_NOT_FOUNT = '/pages/404/index';
let pageNotFound = DEFAULT_NOT_FOUNT;
const listenerInterceptors = [];
const pageNotFoundListener = function (page) {
    const hasSearch = pageNotFound.indexOf('?') !== -1;
    wx.redirectTo({
        url: pageNotFound + (hasSearch ? '&' : '?') + `originPath=${encodeURIComponent(page.path)}`
    });

}

function listener(page) {
    console.warn('@mini-dev/update page not found:', page.path);
    for (const interceptor of listenerInterceptors) {
        const intercepted = interceptor(page);
        if (intercepted) {
            return;
        }
    }
    pageNotFoundListener(page);
}

function init(option = {}) {
    pageNotFound = option.page || DEFAULT_NOT_FOUNT;
    listenerInterceptors.push(...(option.interceptors || []));
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

