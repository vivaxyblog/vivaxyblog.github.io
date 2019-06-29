---
layout: post
title: Node Gyp Rebuild Too Slow
tags: [npm]
---

In China, node-gyp always building too slow or failing because of connection.

We can fix it by executing a shell script.

```sh
#!/usr/bin/env bash

# 获得 nodejs 版本号
NODE_VERSION=`node -v | cut -d'v' -f 2`

# 下载源码包
curl -L https://npm.taobao.org/mirrors/node/v$NODE_VERSION/node-v$NODE_VERSION.tar.gz -o node-v$NODE_VERSION.tar.gz

# 删除现有内容不完整的目录
rm -rf ~/.node-gyp
mkdir ~/.node-gyp

# 解压缩并重命名到正确格式
tar zxf node-v$NODE_VERSION.tar.gz -C ~/.node-gyp
mv ~/.node-gyp/node-v$NODE_VERSION ~/.node-gyp/$NODE_VERSION

# 创建一个标记文件
printf "9\n">~/.node-gyp/$NODE_VERSION/installVersion

# 删除下载下来的源码包
rm -rf node-v$NODE_VERSION.tar.gz
```

Before we install a npm package, which requires node-gyp, just run it.

Or use [node-gyp-install](https://www.npmjs.com/package/node-gyp-install)

See other ways in reference.

## Reference

- [node-gyp rebuild 卡住的解决方案](https://breeswish.org/blog/2014/11/14/node-gyp-rebuild-freeze/)
