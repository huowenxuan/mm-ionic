# 嘿嘿嘿嘿

## Next
* 创建User表、账号密码登陆、推出登陆、登陆UI
* money首页跳转到编辑spend、编辑类别。下面是所有类别的折线图，与总的折线图
* spend-edit可跳转上个月 下个
* tab-note显示思维导图echarts，tree类型

## 【改版】
月: 上面放一个日历
年: 大的item列出当月共有几条

想把导航栏去掉，左右两个按钮显示，把月和年的大入口放在主页中，去掉super tabs。点击月后，📅从上掉下来，可点击选择，收回日历时重新刷新notes。点击年后掉下以月为单位的日记本，上面记录年月和note数，点击后再刷新本页notes

把super-tabs移动到tab-money，分成记账、理财、手指负债等

## 已知bug
* windows的icon
* 有时滚动到底部无法加载更多，往上滚一下才会好，一直都存在

## INSTALL
如遇到node-sass install失败，执行：
```
nvm use 8 ???
sudo rm -rf node_modules && npm rebuild node-sass && npm i
```

## 运行
### ionic
```
npm run serve 
// 或
ionic serve
```

## iOS
> 如果代码没更新，执行cordova run ios | npm run build，再从xcode运行

## Electron
```
// 确保正确打包到www/index.html中
ionic serve 
// 直接运行electron
electron .
// 打包到mac
npm run mac // 如果失败，提示no such file or directory, stat '.../mm-ionic/platforms/ios/build/device/libCordova.a，需要跳转到这个地方，随便创建一个文件命名为libCordova.a，再次执行npm run mac
// 打包到windows
num run win
```

## 已有功能
### 记账
首页展示过去一年花费、分类排行榜统计图
每月分类记账，生成南丁格尔图
### 笔记
增删改笔记，编辑时可以选择开始、结束的日期时间
查看笔记，转换为markdown，一键复制markdown  
查看某个日期范围内的笔记  
### 小工具
计算妈妈的假期


## 注意
1. WKWebView在http请求时会让程序卡死，使用CDVWebView

