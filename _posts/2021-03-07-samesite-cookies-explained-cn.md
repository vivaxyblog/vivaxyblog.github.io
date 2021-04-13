---
layout: post
title: SameSite Cookies 解读
tags: [samesite, csrf, schemeful samesite, cross site, cross origin]
---

## 背景知识

### SameSite 属性

SameSite 属性是 HTTP 响应头 `Set-Cookie` 的属性之一，允许服务端控制该 Cookie 是否仅限于同站。

同站（跨站）是与常见的同域（跨域）相似的概念，下面是两者的区别。

### 同域（Same Origin）和跨域（Cross Origin）

域（Origin）由协议（Scheme）、主机名（Hostname）和端口（Port）组成。其中任何一个不同都会被认为是跨域。

### 同站（Same Site）和跨站（Cross Site）

顶级域名（Top-level domains）（TLDs）是如 `.com` 等的一系列域名列表。
在大部分场景下，站（Site）的定义是 TLDs+1，如 `.com` 的下一级，如 `github.com`。
但 Github 也会为不同的开发者提供不同的 `github.io` 域名，如 `a.github.io` 和 `b.github.io`，为了区分这两个域名，Mozilla 引入了有效顶级域名（Effective top-level domains）（eTLDs）的概念。
因此，站（Site）是有效顶级域名的下一级域名，即 eTLDs+1。
比如：`a.web.dev` 和 `b.web.dev` 属于同站，而 `a.github.io` 和 `b.github.io` 属于跨站。

### Schemeful SameSite

由于 Cookie 与协议无关，HTTP 协议的页面也可以写入 Cookie。因此，为了提高安全性，在相同站（Site）的要求下，增加了协议（Scheme）检查。避免对 HTTP 站点的攻击影响到 HTTPS 站点。

## SameSite 值

`Set-Cookie` 中的 SameSite 值有 3 种。

### Lax

Cookie 无法被第三方站点发出的请求携带，但可以在向第三方站点导航后，第三方站点的请求可以携带（如链接跳转）。为了避免 CSRF 攻击，Chrome 84 开始成为 SameSite 的默认值。

### Strict

只能在第一方站点上发送的请求上携带。

### None

在任何站点都可以被携带。如果 `SameSite=None`，那么必须指定 `Secure` 属性，否则会无法写入。部分历史版本浏览器对 `SameSite=None` 不兼容，会表现为忽略 Cookie 或 Cookie 被当做 `SameSite=Strict` 被限制，参见 [SameSite=None: Known Incompatible Clients](https://www.chromium.org/updates/same-site/incompatible-clients)。

### Secure 属性

与 `SameSite=None` 需要同时设置的 Secure 属性表示当前 Cookie 只能在 HTTPS 的请求中写入和携带。

## 历史和未来

### 引入 SameSite 策略的原因

- Cookie 被用来做用户追踪，带来用户隐私问题。
- 美国部分州颁布了法律法规，要求网站在设置和使用 Cookie 前需要获得用户同意。
- Cookie 存在 CSRF 安全漏洞

### 兼容性

SameSite 相关的策略主要分为两个阶段实施。

第一个阶段：SameSite 默认为 Lax，如果 SameSite 为 None，则必须设置 Secure。

- Chrome：76 版本可以通过 flag 开启，2020-08-11 在 80 及以上版本全量。
- 安卓：从安卓 12 开始实施
- Firefox：69 版本可以通过 flag 开启
- Safari：未实现

第二个阶段：Schemeful SameSite

Chrome：88 版本开始灰度，参见：[Schemeful Same-Site Design Doc](https://docs.google.com/document/d/1gTQAljDySGAY9P52zXHqJsnAgYB_38YT2CiKmcl4elg/edit#heading=h.f171hlz1z0aw)

### 未来

IETF 正在寻找一种替代 Cookie 的请求状态管理方案，来解决 Cookie 一些问题：
- 安全问题。
- 增加了请求的体积。
- 用户行为追踪带来的隐私问题。

IEFT 希望 Cookie 可以有下面的一些特性：

- 客户端决定值。
- 只能在网络请求中获取，不能通过 JavaScript（包括 Service Worker）获取。
- 每个域名下生成一个值，这个值只能在本域名下访问。
- 不在非安全的域名下生成和发送值。
- 默认只能在同站请求中携带，只能在同站请求中生成。
- 每个值在生成后，默认保存 1 小时。

为什么要采用一种新方案，而不是在现在的 Cookie 只上进行扩展？

- Cookie 的规则复杂，理解成本高。
- Cookie 的新规则使用率低。

## 应用

短期方案：添加 SameSite=None; Secure; 升级到 HTTPS。
长期方案：尝试细分 Cookie 的使用场景，针对不同的 Cookie 设置不同的 SameSite 值。

## 参考资料
- [SameSite cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
- [Understanding "same-site" and "same-origin”](https://web.dev/same-site-same-origin/)
- [SameSite cookies explained](https://web.dev/samesite-cookies-explained/)
- [SameSite cookie recipes](https://web.dev/samesite-cookie-recipes/)
- [Schemeful Same-Site](https://web.dev/schemeful-samesite/)
- [SameSite=None: Known Incompatible Clients](https://www.chromium.org/updates/same-site/incompatible-clients)
- [HTTP State Tokens](https://tools.ietf.org/html/draft-west-http-state-tokens-00)
- [Java 兼容代码](https://clutcher.github.io/post/hybris/same_site_login_issue/)
- [Schemeful Same-Site Design Doc](https://docs.google.com/document/d/1gTQAljDySGAY9P52zXHqJsnAgYB_38YT2CiKmcl4elg/edit)
