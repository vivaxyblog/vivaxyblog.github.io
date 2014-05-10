---
layout: post
title: 百度手机输入法自定义主题
---

根据ejiepe的cmgt926黑白修改。

<img style="height:200px;" src="/img/2014-05-03-baidu-input-custom-theme-1.jpg" />

<img style="height:200px;" src="/img/2014-05-03-baidu-input-custom-theme-2.jpg" />

复制到/sdcard/baidu/ime/skins/，在皮肤中启用。

[点我下载][1]

----------

**制作**

[下载百度官方皮肤编辑器][2]

[下载cmgt926黑白.bds][3]

用百度官方皮肤编辑器修改好按键后打包，会导致输入键码时键盘与cmg原先的设定不同，因此只好手动解压和打包。

用解压软件解压cmgt926黑白.bds。

修改Info.txt

    Name=vivaxy@20140503
    Style=default
    SupportPlatform=A
    Author=vivaxy
    MinImeCode=1

    prot #竖屏键盘
    land #横屏键盘

    py_26.ini #拼音26键
    en_26.ini #英文小写26键
    en_26s.ini #英文大写26键

    FORE_STYLE=387,248 #显示的切片图片id
    POS_TYPE=7,3 #切片图片的位置
    VIEW_RECT=194,4,93,96 #按键位置和大小

    UP #上滑
    DOWN #下滑
    LEFT #左滑
    RIGHT #右滑
    CENTER #短按
    HOLDSYM #长按出现候选列表

改好后用zip格式压缩，改后缀为`.bds`。

----------

**参考资料**

[百度手机输入法皮肤教程][4]

  [1]: http://pan.baidu.com/s/1qWNOQ5m
  [2]: http://r6.mo.baidu.com/web/is/index/
  [3]: http://pan.baidu.com/share/link?uk=3321957458&shareid=1043105502#dir/path=/cmg%E8%81%AA%E6%98%8E%E7%8B%97%E7%99%BE%E5%BA%A6%E6%89%8B%E6%9C%BA%E8%BE%93%E5%85%A5%E6%B3%95%E7%9A%AE%E8%82%A4/2013%E5%B9%B412%E6%9C%8817%E6%97%A5/T926---26%E9%94%AE%2bT9%E4%B9%9D%E5%AE%AB%E6%A0%BC%E5%B8%83%E5%B1%80/%E9%BB%91%E7%99%BD%E5%AF%86%E9%9B%86%E6%8C%89%E9%94%AE
  [4]: http://tieba.baidu.com/p/2038495547