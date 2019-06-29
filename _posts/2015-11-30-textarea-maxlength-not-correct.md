---
layout: post
title: textarea 的 maxlength 长度计算不正确
tags: [html]
---

chrome 下的 textarea 的长度限制后，如果其中包括换行的话，能输入的字符会少于 maxlength 中限定的长度。

```html
<textarea
    placeholder="请输入驳回原因"
    maxlength="10"
    >
</textarea>
```

## 测试结果

| 浏览器 | 回车占几个字符 |
|---------|---------|
| chrome 46.0.2490.86 (64-bit) | 2 |
| chrome 46.0.2490.86 m | 2 |
| ie 11 | 1 |
| edge | 1 |
| firefox 42.0 | 1 |

## 参考资料

- [Issue 252613 - chromium - textarea maxlength attribute does not count the correct string length](https://code.google.com/p/chromium/issues/detail?id=252613)
