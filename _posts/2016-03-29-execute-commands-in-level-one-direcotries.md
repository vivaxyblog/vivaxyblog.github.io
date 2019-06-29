---
layout: post
title: 在一级目录中批量执行命令
tags: [shell]
---

想要修改 100 多个的项目的 git 配置，这 100 多个项目在同一个目录下。

可以用 shell 脚本来实现。

新建一个 `change-user.sh` ，添加以下的内容。

```sh
#/usr/env/sh
for dir in `find ./* -type d -maxdepth 0`; do
    cd ${dir}
    git config user.name stephen.xu
    git config user.email stephen.xu@dianping.com
    echo `pwd`
    cd ..
done
```

使用 `find` 来遍历文件

使用 `find ./*` 而不是 `find .` 来剔除 `.` 目录

使用 `-type d` 来保证搜索到的结果是目录

使用 `-maxdepth 0` 来保证搜索到的目录是当前目录下的一级目录
