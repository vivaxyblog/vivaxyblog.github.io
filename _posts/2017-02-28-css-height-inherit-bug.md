---
layout: post
title: css 高度继承的问题
tags: [css]
---

按照 [移动端全兼容的flexbox速成班](https://isux.tencent.com/flexbox.html) 一文给出的 flex 布局方案下，为了兼容旧版 box flex，会强行指定 `height: 0`。

如果其中的自元素采用了 `height: 100%` 的话，在 safari 中则引起了高度为 0 的问题。然而在 chrome 下则无此问题。safari 下横向 flex 也没有这个问题。

例子：[点我](https://vivaxy.github.io/course/cascading-style-sheets/flex-bug/)

## 参考资料

- [移动端全兼容的flexbox速成班](https://isux.tencent.com/flexbox.html)
- [理解Flexbox：你需要知道的一切](https://www.w3cplus.com/css3/understanding-flexbox-everything-you-need-to-know.html)
- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
- [flexbugs](https://github.com/philipwalton/flexbugs)
