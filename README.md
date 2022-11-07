# @mini-dev/update

在用户使用旧版本打开新版本页面的时候，触发更新机制。

## 使用方式

安装

```shell script
npm install @mini-dev/update
```

创建一个兜底页面，默认路径为 /pages/404/

index.json
```json
{
  "navigationBarTitleText": "404",
  "usingComponents": {
    "update-view": "@mini-dev/update/update-view"
  }
}
```

页面引用
```html
<update-view name="拼鸦"/>
```

启动时初始化

```javascript
const update = require('@mini-dev/update');

update.init();

App({
    onLaunch(options) {
    }
});

```

如果不想使用默认的兜底页面，可以在初始化的时候配置：

```javascript
const update = require('@mini-dev/update');

update.init({page:'/pages/xxx/yyy/zzz'});
```

如果部分页面有其他的替代页面，则可以在兜底之前拦截：

```javascript
update.init({
    interceptors: [
        function (page) {
            if (page.path === 'pages/index/index3') {
                console.log('拦截并跳转到首页，不会打开兜底页面');
                wx.redirectTo({
                    url: '/pages/index/index'
                });
                return true; //返回值表示拦截成功
            }
        }
    ]
});
```

### App 全局配置

update-view 组件内支持两个自定义属性：

1. name，默认值为 app.$\_\_name__；
2. homepage，默认值为 app.$\_\_homepage__；

```javascript
App({
    $__name__: '这里是App.$__name__',
    $__homepage__: '/pages/index/index'
});
```

### ChangeLogs

#### 0.0.4
1. 默认文案修改；

#### 0.0.3
1. 增加手动跳转到首页的按钮；
2. 增加 App 全局变量配置；

#### 0.0.2
1. 增加了前置拦截