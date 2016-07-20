---
layout: post
title: EXCEL 批量添加文件超链接
---

## 文件夹folder下，有50个word文档，要添加到excel中的一列里面，作为超链接。

在folder目录下shift+鼠标右键，在此处打开命令窗口(W)，输入：

`for /f %i in ('dir /b *.doc *.docx') do echo =HYPERLINK("%i") >> link.txt`

，把link.txt中的文字粘贴到excel中。
