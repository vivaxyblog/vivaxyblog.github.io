---
layout: post
title: VSCode Conventional Commits 插件
tags: [vscode, extension, conventional-commits]
---

[VSCode Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) 插件可以帮助你轻松按照 [Conventional Commits](https://www.conventionalcommits.org/) 规范编写提交信息。

## 功能

- 支持使用项目下的 commitlint 规范。
- 支持自动 add 和 push（需要结合 VSCode 的 git 插件，详见插件文档）。
- 支持项目级别的 scope 管理。
- 支持 Gitmoji。

## 使用方式

![示例](/assets/2020-04-29-vscode-conventional-commits-extension/demo.gif)

你可以通过下面两种方式打开插件：

1. `Command + Shift + P` 或 `Ctrl + Shift + P`，输入 `Conventional Commits`，然后按 `Enter`。
2. 点击 Source Control 操作面板上的图标。见下图：

<img src="/assets/2020-04-29-vscode-conventional-commits-extension/icon-on-the-source-control-menu.png" alt="操作面板上的图标" style="width: 50%">
