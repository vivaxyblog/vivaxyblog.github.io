---
layout: post
title: Levenshtein 距离
tags: [algorithms]
---

## 简介

[Levenshtein 距离](https://en.wikipedia.org/wiki/Levenshtein_distance)是一种编辑距离，用来表示两个字符串的差异。编辑距离是指从字符串 A 开始，修改成字符串 B 的最小步骤数，每个以步骤中，你可以删除一个字符、修改一个字符或者新增一个字符。

比如我们把 acat 变成 gate 的时候，需要做如下的修改：

- 删除 a
- 把 c 改成 g
- 新增 e

所以 acat 和 gate 的 Levenshtein 距离是 3。

## 算法

这里使用动态规划的方式来实现。

记 Levenshtein 距离为 l(i, j)，i 是字符串 A 中从开头到第 i 个下标的子字符串，j 是字符串 B 从开头到第 j 个下标的子字符串，i 和 j 都从 0 开始。

如果 A 中第 i + 1 个字符和 B 中第 j + 1 个字符串相同的话，l(i + 1, j + 1) = min( l(i, j), l(i + 1, j) + 1, l(i, j + 1) + 1)。是把这次添加操作和 l(i + 1, j) 相比是添加了一个字符，和 l(i, j + 1) 相比也是。所以这种情况下只要求得这三种情况下的最小值，就可以得到下一个值了。

相似地，如果 A 中第 i + 1 个字符和 B 中第 j + 1 个字符串不相同的话，l(i + 1, j + 1) = min( l(i, j) + 1, l(i + 1, j) + 1, l(i, j + 1) + 1)。差别是这次操作需要修改一个字符，也就是要在 l(i, j) 上加一步。

所以整理出来的迭代关系是：

```py
cost = 1 if stringA[i] == stringB[j] else 0
l(i + 1, j + 1) = min( l(i, j) + cost, l(i + 1, j) + 1, l(i, j + 1) + 1 )
```

再看下边界值：

```py
l(0, 0) = 0
l(i, 0) = i
l(0, j) = j
```

字符串长度都为 0 时，那么 Levenshtein 距离是 0。当其中一个字符串长度为 0 时，Levenshtein 距离是另一个字符串的长度。这很容易理解。

所以最后代码的实现（这里用的是 python）:

```py
class Levenshtein(object):
    def __init__(self, stringA, stringB):
        self.stringA = stringA
        self.stringB = stringB
        matrix = [list(range(0, len(stringA) + 1))]
        for i in range(len(stringB)):
            row = [i + 1]
            for j in range(len(stringA)):
                value = min(matrix[i][j + 1] + 1, row[j] + 1)
                cost = 0 if stringB[i] == stringA[j] else 1
                value = min(value, matrix[i][j] + cost)
                row.append(value)
            matrix.append(row)
        self.matrix = matrix

    def getDistance(self):
        return self.matrix[len(self.stringB)][len(self.stringA)]
```

我们把 l(i, j) 记录在矩阵中，那么最后的结果就是 矩阵右下角的值。

然后加上测试用例：

```py
import unittest

class Test(unittest.TestCase):
    def test(self):
        levenshtein = Levenshtein('kitten', 'sitting')
        self.assertEqual(levenshtein.getDistance(), 3)
        levenshtein = Levenshtein('GUMBO', 'GAMBOL')
        self.assertEqual(levenshtein.getDistance(), 2)
        levenshtein = Levenshtein('', 'abcde')
        self.assertEqual(levenshtein.getDistance(), 5)
        levenshtein = Levenshtein('abcdef', '')
        self.assertEqual(levenshtein.getDistance(), 6)
        levenshtein = Levenshtein('acat', 'gate')
        self.assertEqual(levenshtein.getDistance(), 3)


if __name__ == '__main__':
    unittest.main()
```

[查看完整代码](https://github.com/vivaxy/algorithms/blob/master/python/problems/levenshtein.py)
