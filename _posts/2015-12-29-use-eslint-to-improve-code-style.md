---
layout: post
title: 用 eslint 管理 js 的代码风格
---

## 使用全局 eslint

安装全局 eslint `> npm i -g eslint` 。

在项目根目录下放置文件 [`eslintrc.json`](https://github.com/vivaxy/front-end-scaffold/blob/master/.eslintrc.json) 。

导航到项目根目录，在控制台中输入 `eslint <js 文件路径>` ，可以看到输出的问题，如果为空，那么就没有问题。

要检查项目下所有 js 文件，可以输入 `eslint .` 。

## 配置项目下的 eslint

在项目下执行 `> npm i --save-dev eslint` ， `package.json` 中配置 `scripts.lint: "eslint ."` 。

在控制台中执行 `npm run lint` ，依然可以执行 eslint 。

## 配置 eslint 不检查的文件

在项目下创建 `.eslintignore` ，将不需要检查的文件路径添加进去。

不需要检查的文件包括： 依赖包，编译后的文件等。

## 配置 `git commit` 前执行 eslint

在项目下安装 husky ， `> npm i --save-dev husky` 。

配置 `package.json` ，添加 `scripts.precommit: "eslint ."` 。

## 对代码禁用 eslint

- 对于文件，配置在 `.eslintignore` 文件中

- 对于代码块，使用 `/* eslint-disable */` 和 `/* eslint-enable */`

- 对于代码行，使用 `/* eslint-disable-line rule1, rule2 */`

## 参考项目

- [vivaxy/here](https://github.com/vivaxy/here)
- [vivaxy/front-end-scaffold](https://github.com/vivaxy/front-end-scaffold)

## 参考文档

- [ESLint - Pluggable JavaScript linter](http://eslint.org/)
- [husky](https://www.npmjs.com/package/husky)
