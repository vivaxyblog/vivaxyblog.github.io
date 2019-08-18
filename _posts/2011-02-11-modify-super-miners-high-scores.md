---
layout: post
title: Super Miners HighScores 的修改
tags: [symbian, game]
---

## 记录文件：

`*/Private/A0000BF4/hiscores*.dat`

用16进制打开，aa表示没有字符，作为分隔符。

## 姓名区域的字母对应于16进制数的关系如下：

```
a cb
b c8
c c9
d ce
e cf
f cc
g cd
h c2
i c3
j c0
k c1
l c6
m c7
n c4
o c5
p da
q db
r d8
s d9
t de
u df
v dc
w dd
x d2
y d3
z d0
```

## 分数时间区域10进制数字和16进制数字的关系如下：

```
0 a
1 b
2 8
3 9
4 e
5 f
6 c
7 d
8 2
9 3
10 0
11 1
12 6
13 7
14 4
15 5
```

## 最后贴一个完美记录：

```
00000010h: AA AA AA AA D2 D3 AA AA AA AA AA AA AA AA AA AA
00000020h: 54 55 55 AA AA AA AA AA D2 D3 AA AA AA AA AA AA
00000030h: AA AA AA AA 57 55 55 AA AA AA AA AA D2 D3 AA AA
00000040h: AA AA AA AA AA AA AA AA 56 55 55 AA AA AA AA AA
00000050h: D2 D3 AA AA AA AA AA AA AA AA AA AA 51 55 55 AA
00000060h: AA AA AA AA D2 D3 AA AA AA AA AA AA AA AA AA AA
00000070h: AA AA AA AA AB AA AA AA D2 D3 AA AA AA AA AA AA
00000080h: AA AA AA AA AA AA AA AA A8 AA AA AA D2 D3 AA AA
00000090h: AA AA AA AA AA AA AA AA AA AA AA AA A9 AA AA AA
000000a0h: D2 D3 AA AA AA AA AA AA AA AA AA AA AA AA AA AA
000000b0h: AE AA AA AA D2 D3 AA AA AA AA AA AA AA AA AA AA
000000c0h: AA AA AA AA AF AA AA AA
```
