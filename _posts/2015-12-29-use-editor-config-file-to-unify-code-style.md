---
layout: post
title: 用 editor config 配置统一编辑器配置
tags: [code style, standard]
---

## 配置 editor config

在项目下创建文件 [`.editorconfig`](https://github.com/vivaxy/front-end-scaffold/blob/master/.editorconfig)

```
root = true                         # 根目录的配置文件，编辑器会由当前目录向上查找，如果找到 `roor = true` 的文件，则不再查找

[*]                                 # 匹配所有的文件
indent_style = space                # 空格缩进
indent_size = 4                     # 缩进空格为4个
end_of_line = lf                    # 文件换行符是 linux 的 `\n`
charset = utf-8                     # 文件编码是 utf-8
trim_trailing_whitespace = true     # 不保留行末的空格
insert_final_newline = true         # 文件末尾添加一个空行
curly_bracket_next_line = false     # 大括号不另起一行
spaces_around_operators = true      # 运算符两遍都有空格
indent_brace_style = 1tbs           # 条件语句格式是 1tbs

[*.js]                              # 对所有的 js 文件生效
quote_type = single                 # 字符串使用单引号

[*.{html,less,css,json}]            # 对所有 html, less, css, json 文件生效
quote_type = double                 # 字符串使用双引号

[package.json]                      # 对 package.json 生效
indent_size = 2                     # 使用2个空格缩进
```

## 编辑器中启用 editor config 插件

webstorm 中自带了 editor config 插件

sublime 用户可以去[这里](http://editorconfig.org/#download)下载安装

## 参考项目

- [vivaxy/here](https://github.com/vivaxy/here)
- [vivaxy/front-end-scaffold](https://github.com/vivaxy/front-end-scaffold)

## 参考文档

- [EditorConfig](http://editorconfig.org/)
