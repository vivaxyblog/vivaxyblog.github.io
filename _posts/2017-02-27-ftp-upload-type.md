---
layout: post
title: ftp 上传模式
tags: [tools]
---

在使用 nodejs 实现 ftp 文件上传的过程中，我发现文本文件可以正常上传，但是图片文件则不行。图片被上传后，文件内容被更改了，无法正常打开了，文件大小也不一致了。

使用的是 [jsftp](https://github.com/sergi/jsftp) 包。参考了 [ftp-deploy](https://github.com/rickbergfalk/ftp-deploy) 包。

尝试了几个可能的问题：

- useList
- 文件系统编码，有问题的 ftp 的编码是 GBK，而 nodejs 默认编码是 utf8
- 上传模式：ASCII 还是 binary

在尝试后发现问题是由上传模式导致的，上传非文本文件时应该是用 binary 模式，即在登录后键入 `type I`。

使用命令行时，登录后默认会开启 binary 模式，可能是 ftp 服务器配置的，但是通过 jsftp 客户端登录时却没有默认开启，所以需要手动指定一下。

简单的代码如下：

```js
import JSFtp from 'jsftp';

const ftp = new JSFtp({
    host,
    port,
});

ftp.raw(`user ${user}`, (err, {code}) => {
    if (err) {
        throw err;
    }
    if (code === 331) {
        ftp.raw(`pass ${pass}`, (_err, {code}) => {
            if (_err) {
                throw _err;
            }
            if (code === 230) {
                ftp.raw('type I', (__err) => {
                    if (__err) {
                        throw __err;
                    }
                    ftp.put(localFilPath, remoteFilePath, (___err) => {
                        if (___err) {
                            throw ___err;
                        }
                        ftp.raw('quit', (____err) => {
                            if (____err) {
                                throw ____err;
                            } else {
                                ftp.destroy();
                            }
                        });
                    })
                });
            } else {
                throw _err;
            }
        });
    } else {
        throw err;
    }
});
```

## 参考资料

- [ruby - why do I get &quot;200 Type set to I. (Net::FTPReplyError)&quot; - Stack Overflow](http://stackoverflow.com/questions/31955406/why-do-i-get-200-type-set-to-i-netftpreplyerror)
