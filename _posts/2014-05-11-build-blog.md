---
layout: post
title: 搭建博客
---

## 工具

- [Github][1] 

- [GitHub Windows][2]

- [Jekyll][3]

- [.tk域名][4]

- [DNSPod][5]

- [Markdown编辑器][6]

## 发布Github页面

[Github][7]上注册用户，假设用户名为`username`。或者用户创建organization，记组织名为`username`。

用户或者组织发布页面有两种方式：

- 创建新的repository，名称为`username`.github.io，把页面放入master分支中，页面地址为：`username`.github.io。

- 创建新的repository，假设名称为`repo`，在该repository下新建gh-pages分支，把页面放入其中，页面地址为`username`.github.io/`repo`。

使用[GitHub Windows][2]，clone repository。
资源管理器中找到repository文件目录，新建index.html，写入文字后保存。
在GitHub Windows中commit，sync，几分钟后，便能通过github地址访问页面了。

## 申请域名

在[www.dot.tk][9]上申请免费域名，不支持126,163邮箱，支持qq邮箱。免费域名申请一次最长可以使用12个月。

## 配置DNS

在[dnspod][10]添加刚才申请的域名，删除所有能删的记录。

添加两条记录：主机记录分别为www和@，记录类型都为CNAME，记录值都为github页面地址，保存。

在www.dot.tk设置使用Custom DNS，添加两条dns，Host Name为dnspod中两条NS类型记录的记录值。

在github项目根目录下添加文件，文件名为CNAME，内容为你的域名。

*域名可以带和不带www.，如果在CNAME中配置的是带有www.的域名，那么在dnspod中也要配置带有www.的域名。*

一段时间后，dns才能生效。dns和github页面都生效后，访问申请的域名，便能显示github中的页面了。

## Windows上搭建Jekyll本地环境

下载[Jekyll][11]，解压到某个目录下，其中包括Jekyll的各种依赖，详见[Building portable Jekyll for Windows][12]。执行setpath.cmd，设置环境变量无效，只好手动添加。在系统的环境变量中按照setpath.cmd中所述，逐个添加。在任意目录下shift+鼠标右键，选择在此处打开命令窗口，执行jekyll，如果正常显示帮助信息，那么Jekyll本地环境搭建好了。

## MacOS上搭建Jekyll本地环境

`gem install jekyll`

## 写博客

在本地按照[例子][8]中的样子添加文件。

参数说明参见[Jekyll docs][13]。

保存后，在项目根目录下执行`jekyll serve`，按照刚才配置的host和port就可以在本地访问博客了。

观测无误后，就能上传发布到github上了。

*本地Jekyll会编译出_site目录，这个不需要上传github，添加到`.gitignore`中即可。*

## 参考资料

[GitHub Help][14]

[Running Jekyll on Windows][15]

[搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门][16]


  [1]: https://github.com/
  [2]: https://windows.github.com/
  [3]: http://jekyllrb.com/
  [4]: http://my.dot.tk/cgi-bin/login01.taloha
  [5]: https://www.dnspod.cn
  [6]: https://www.zybuluo.com/mdeditor
  [7]: https://github.com/
  [8]: https://github.com/ruanyf/jekyll_demo
  [9]: http://www.dot.tk/
  [10]: https://www.dnspod.cn/Domain
  [11]: https://www.dropbox.com/sh/40l6mgbl1ce2kej/lF6ykQxt9d
  [12]: http://www.madhur.co.in/blog/2013/07/20/buildportablejekyll.html
  [13]: http://jekyllrb.com/docs/structure/2013/07/20/buildportablejekyll.html
  [14]: https://help.github.com/categories/20/articles
  [15]: http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html
  [16]: http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html
