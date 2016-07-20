---
layout: post
title: MI2S 刷 CM
---

更新了[MIUI 4.5.9][1]开发版后，系统自带程序越来越多，自己做的主题也无法使用了……

## [小米2S手机][2]标准版，刷入 [CyanogenMod][3] 11

1. 将刷机包放入SD卡根目录下

    在官方论坛页面[\[ROM\]\[KK\]\[4.4\]\[2014-04-25\] CyanogenMod 11.0 for
MI2S][4]，找到并下载[CM11 rom][5]和[Google Apps][6]，再找一个[CWM][7]。

2. 刷入CWM

    在MIUI系统更新中选择从SD卡安装zip，找到MI2-2S-Recovery-2013-11-13-CN3.zip，选择安装，重启，重启到MI字时，按住音量+直到进入recovery。

3. 刷入CM

    在recovery中

    - 清空所有数据

    - 清空缓存

    - 安装zip，找到cm-11-20140425-UNOFFICIAL-aries,zip，安装到系统1或者系统2中。

4. 安装Google Apps

    重启手机，长按音量+进入recovery，找到并安装gapps-kk-20140105-signed.zip。

## 修改系统字体

替换了/system/fonts/DroidSans.ttf后无效。查看配置文件/system/etc/fallback_fonts.xml和/system/etc/system_fonts.xml，发现需要替换Roboto字体才行。

英文字体替换/system/fonts/Roboto-Regular.ttf。

中文字体替换/system/fonts/DroidSansFallback.ttf。

## 使用感受

- 内存占用较少

- 界面极端简洁

- 稳定性不如MIUI开发版

与MIUI比各有优劣，自己用着舒服就好了。

## 发现问题

- 自带的 Privacy Guard 改了设置后无效

- 未完全汉化

- 壁纸设置无法按照defalut screen居中

- 容易崩溃（可能和开启ART模式有关）

## 参考资料

[【cofface】小米2/2S 4.4 cm11.0 ROM发布 更新20131130][8]

[【米2/2S 刷三方rom教程】 适合新手][9]


  [1]: http://www.miui.com/thread-1751929-1-1.html
  [2]: http://www.mi.com/mi2s/
  [3]: http://www.cyanogenmod.org/
  [4]: http://xiaomi.eu/community/threads/rom-kk-4-4-2014-04-25-cyanogenmod-11-0.22927/
  [5]: http://d-h.st/users/M1cha/?fld_id=28956#files
  [6]: http://wiki.cyanogenmod.org/w/Google_Apps
  [7]: http://d-h.st/users/M1cha/?fld_id=11289#files
  [8]: http://blog.cofface.com/archives/625.html
  [9]: http://bbs.xiaomi.cn/thread-7761124-1-1.html
