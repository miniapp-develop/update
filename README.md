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
    "update-view": "@mini-dev/update/update-view/index"
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

如果不像使用默认的兜底页面，可以在初始化的时候配置：


```javascript
const update = require('@mini-dev/update');

update.init({page:'/pages/xxx/yyy/zzz'});
```
