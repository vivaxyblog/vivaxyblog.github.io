---
layout: post
title: CapsLock 改为 Hyper 键
tags: [macOS, CapsLock, Hyper, Alfred, Keyboard]
---

## CapsLock 按键的位置

Mac 上的 CapsLock 占据了一个非常顺手的位置，可是却提供了一个没有用处的功能。

> HHKB 的键盘布局：
>
> ![hhkb](/assets/2014-12-12-map-capslock-to-hyperkey/hhkb.jpg)
>
> VIM 键盘图：
>
> ![vim](/assets/2014-12-12-map-capslock-to-hyperkey/vim.png)
>
> 对于 UNIX 程序员来说 HHKB 绝对是完美的。UNIX 程序员只有键盘以及快捷键的设置都遵循一个标准：“手移动最少的距离，作更多的操作”。
>
> 下面来看下 HHKB 在 linux 和 unix 命令行中的表现，首先介绍几个快捷键 ctrl-n = 下，ctrl-b = 左，ctrl-f = 右，ctrl-p = 上，ctrl-j = 回车，ctrl-h = 退格，这几个是通用的在所有的类 unix 的终端上都可以用，有心人你可以试试，如果你的 ctrl 键是标准 101 的 layout，你可以多按几次，看看你的小手指头酸了没，然后把 caps lock 当成 ctrl 再试试呢？是不是很顺畅？人家 unix 本来就是照这个键位设计的。用 IBM 的 101 布局当然不爽了。

以上转自：[http://www.pcwaishe.cn/thread-29621-1-1.html](http://www.pcwaishe.cn/thread-29621-1-1.html)

> Caps Lock，大写锁定键，现实中使用到的频率相当小（至少对于我来说是这样），但它却占用了一个风水很不错的位置，实在是浪费。Chromebook 把它直接换成了一个搜索键。
>
> ![chromebook](/assets/2014-12-12-map-capslock-to-hyperkey/chromebook.png)

以上转自：[http://lucifr.com/2013/02/16/caps-lock-to-hyper-key/](http://lucifr.com/2013/02/16/caps-lock-to-hyper-key/)

## MacOS 上改键软件

[Seil](https://pqrs.org/osx/karabiner/seil.html.en)可以把 Caps Lock 键的功能换成一个键盘上不存在的按键。

[karabiner(KeyRemap4MacBook)](https://pqrs.org/osx/karabiner/) 可以自定义修改按键。

## 改键方案

结合 Alfred 使用，CapsLock 方便唤起 Alfred。

下载安装以上两个软件。

打开 `seil`，勾选 `change ths caps lock key`，`keycode` 填写 80，即 `F19`，根据下方提示到系统选项中禁用 CapsLock 键的默认功能。

![seil](/assets/2014-12-12-map-capslock-to-hyperkey/seil.png)

![system](/assets/2014-12-12-map-capslock-to-hyperkey/system.png)

打开 `karabiner`，选择 `Misc & uninstall`，`Open private xml`，把以下的 xml 贴进去。可以将 `F19` 改为 `ctrl+shift+command+opt`。

```xml
<?xml version="1.0"?>
<root>
	<item>
		<name>F19 to F19</name>
		<appendix>(F19 to Hyper (ctrl+shift+cmd+opt) + F19 Only, F19)</appendix>
		<identifier>private.f192f19</identifier>
		<autogen>
			--KeyOverlaidModifier--
			KeyCode::F19,
			KeyCode::COMMAND_L,
			ModifierFlag::OPTION_L | ModifierFlag::SHIFT_L | ModifierFlag::CONTROL_L,
			KeyCode::F19
		</autogen>
	</item>
</root>
```

保存后，到 `Change Key` 的标签，点击 `ReloadXML`，即可生效。

![karabiner](/assets/2014-12-12-map-capslock-to-hyperkey/karabiner.png)

最后在 Alfred 中修改启动按键为 `F19`。
