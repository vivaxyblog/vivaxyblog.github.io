---
layout: post
title: React Native 的一些问题记录
tags: [framework, javascript, react-native]
---

以下问题基于 0.42 版本

## Keyboard 事件不触发

在安卓上 keyboardWillShow 和 keyboardWillHide 不触发，iOS 上都可用。

参见：https://github.com/facebook/react-native/issues/3468

## flex 布局的默认值

默认 flex: 'column', 表现是两个元素纵向排列

## Text 不支持 border 样式

通过外层包一个 View 来实现

## 文字省略号不展示

需要添加 numberOfLines 属性

## TouchableWithoutFeedback not firing onPress callback

```js
<TouchableWithoutFeedback>
    <CustomComponent />
</TouchableWithoutFeedback>
```

需要在内嵌组件上接受所有 props

```js
const CustomComponent = (props) {
    const { children, ...restProps } = props;
    return <View {...restProps}>{children}</View>
};
```

## ScrollView 和输入框冲突

ScrollView 上设置 keyboardDismissMode={'on-drag'}，点击在键盘位置下面的输入框会让键盘迅速弹起又收起。

需要修改安卓项目的配置文件来修复，参考：https://github.com/facebook/react-native/issues/6174

## Image 圆角

暂不支持 iOS 上指定位置的圆角
通过外层 View 的 radius 属性来实现，View 上需要添加 overflow: 'hidden'
上面的方案在安卓上无效，安卓上依然通过指定位置的圆角来实现

## TextInput 在安卓上不展示

由于有默认的 padding，当 height 设置为小于 30 的值的时候，在安卓上会显示不出来输入框

## 获取图片 File 对象

```js
const data = new FormData();
data.append('files', {
    uri: imageURI,
    type: imageType,
    name: imageName,
});
data.append('username', username);
const resp = await fetch({
    method: requestMethods.POST,
    type: requestTypes.FORM_DATA,
    path: requestPath.upload,
    data,
});
```

## 安卓上输入框底部边框

安卓上输入框底部默认有一条边框，需要使用 underlineColorAndroid={colors.transparent} 去除

## Text 文本在安卓上位置偏下

- iOS 下最主要的 padding, lineHeight 的 style 属性都正常支持
- android 下 padding, lineHeight 无效，包括单独支持 android 的 textAlignVertical enum('auto', 'top', 'bottom', 'center') 也不支持，解决办法是设置 text 的 height，并且在父元素上设置 justifyContent: 'center'

## Modal 在 debug 模式下不能弹起

由于源码存在 bug，参考 https://github.com/JodiWarren/react-native/pull/1/files 修改源码即可
