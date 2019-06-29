---
layout: post
title: 面向 JavaScript 程序员的 Python 教程
tags: [javascript, python, language]
---

本文翻译自：[Python for JavaScript Developers](https://dev.to/underdogio/python-for-javascript-developers)，作者：[Mario Pabon](https://dev.to/restlessbit)。

最近我加入了一家小创业公司 [Underdog.io](https://underdog.io/)，在纽约。我发现这里的后端项目使用了 python，一个我之前没有怎么接触过的语言。

虽然在这里我的主要职责在 JavaScript 和 React 方面的工作。但是我们是个小团队，为了能实现一个功能，我必须经常深入研究多个项目。所以我必须很快熟悉 Python。

可是我没有找到适合那些已经写过代码的人看的 Python 教程。我已经懂得怎么使用另一门语言进行编程，我只需要知道 Python 的语法和编程模式就可以了。

这是我写这篇博客的原因。给那些想快速学习 Python 的 JavaScript 程序员提供简单的说明，我们不再需要再学习申明变量是什么意思，也不需要知道一个函数是做什么的。

这篇文章中的 Python 是 3.0.1 版本，其中的一些例子在旧版本的 Python 上可能会失效。

## 语法

### 申明变量

在 Python 中申明变量非常简单，像 JavaScript 一样，不需要在申明的时候指定变量类型。同时，你也不需要指定变量的作用域，就像使用 let 一样。

```py
x = 5
```

你可以通过重新赋值改变变量的类型。

```py
x = 5       # x 是 Integer 类型的
x = 'Hewwo' # x 现在变成了 String 类型
```

不像 JavaScript，Python 中的变量永远是块级作用域。

### 代码块

在语法上，Python 比 JavaScript 更严格一点。在 Python 中，缩进差一个空格会让你的代码无法运行。这是因为 Python 用缩进来表示代码块，而不是使用大括号来表示代码块。比如，在 JavaScript 中申明代码块和在 Python 中声明代码块分别是这样的：

#### JavaScript 中的代码块

```js
function exampleFunction () {
  // 这是一个代码块
  var a = 5;
}

{
  // 这也是一个代码块
}
```

#### Python 中的代码块

```py
# 这是个有独立作用域的代码块

def example_function():
  # 这也是个有独立作用域的代码块
  x = 5
  print(x)
```

如果 `print(x)` 这行多了一个或者多个空格，Python 的解释器会抛出一个缩进错误(IndentationError)，因为所遇的缩进建立了一个无效的代码块。

```py
def example_function():
  x = 5

  # 缩进错误(IndentationError)
    print(x)
```

如果这行少了一个或者多个空格，如下：

```py
def example_function():
  x = 5
 print(x)
```

Python 解释器会抛出下面的错误：

```py
NameError: name 'x' is not defined
```

因为 `print(x)` 不在申明 `x` 的那个作用域中。

### 逻辑控制语句

`if...else`，`while`，和 `for` 在 Python 中和在 JavaScript 中基本是一样的：

#### if...else

```py
if x > 2:
  print('hai!')
elif x > 3:
  print('bye!')
else:
  print('hey now')

if not x:
  print('x is falsy!')
```

#### while 循环

```py
while x > 0:
  print('hey now')
```

#### for 循环

`for` 循环像 JavaScript 中的 `foreach` 循环：

```py
ex_list = [1, 2, 3]

for x in ex_list:
  print(x)
```

## 变量类型

Python 的变量类型很像 JavaScript，不像其他语言，比如 Java 和 C# 那样严格。

也就是说，变量有类型的区别，但是不需要像 Java 那样静态申明一个变量的类型。

下面简单说下 Python 自带的几种变量类型。

### [Numbers](https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex)

和 JavaScript 不同，Python 有多种数字类型。

- 整型(Integers)：1, 2, 3
- 浮点(Floats)：4.20, 4e420
- 复数(Complex numbers)：4 + 20j
- 布尔(Booleans)：True, False

你可以在 Python 中使用 JavaScript 中的那些运算符。除此之外，Python 还有指数运算符 **：

```py
# a = 4
a = 2 ** 2
```

### [Lists](https://docs.python.org/3/library/stdtypes.html#lists)

Python 的列表像 JavaScript 的数组。列表中可以包含多种类型的数据。

```py
[4, "2", [0, "zero"]]
```

从列表中取元素有下面几种特殊的操作方法：

```py
a_list = [1, 2, 3, 4, 5]

# 1, 2, 3
a_list[0:2]

# 4, 5
a_list[3:]

# 3, 4
a_list[2, -2]
```

还有内置的几种好用的操作列表的方法：

```py
# 3
len([1, 2, 3])

# 3, 2, 1
[1, 2, 3].reverse()

# 1, 2, 3
[1, 2].append(3)
```

你还可以用 + 运算符拼接两个列表：

```py
# 1, 2, 3, 4
[1, 2] + [3, 4]
```

### [Strings](https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str)

Python 中的字符串很像 JavaScript 中的字符串。它们都是不可变化的数据。都可以用访问数组元素的方式来访问字符串中的一个字符。

```py
name = 'Mario'

# M
print(name[0])

# 不行，名字还是 'Mario'
name[0] = 'W'
```

### [Dictionaries](https://docs.python.org/3/tutorial/datastructures.html#dictionaries)

字典是有键值对关系的数据，像 JavaScript 中的对象一样。事实上，字典可以用 JSON 语法来申明：

```py
# python 的字典
person = {
  'name': 'Mario',
  'age': 24
}

# Mario
print(person['name'])
```

有个很方便的方法可以取字典中的某个键对应的值，并且在这个键不存在的情况返回一个默认值：

```py
# 因为 `gender` 不存在，所以会得到 'non-binary'
person.get('gender', 'non-binary')
```

### [None](https://docs.python.org/3/library/constants.html#None)

`None` 就是 JavaScript 中的 `null`。表示没有值，并且在 if 判断中结果是 `非真`。

```py
x = None

if not x:
  print('x is falsy!')
```

### Functions

像 JavaScript 一样，函数在 Python 中也是对象。所以你可以在函数参数中传递函数，也可以给函数添加一个属性：

```py
def func(a, fn):
  print(a)
  fn()

func.x = 'meep'

# 'meep'
print(func.x)

def another_func():
  print('hey')

# 5
# 'hey'
func(5, another_func)
```

### Modules

Python 中的模块和 ES6 的模块类似。

#### 定义一个模块

Python 中的一个模块就是一个文件，文件中包含一些 Python 代码。

```py
# my_module.py
hey = 'heyyy'

def say_hey():
  print(hey)
```

跟 JavaScript 不一样的是，你不需要指定输出什么，默认地，会输出所有变量。

#### 导入一个模块

你可以导入一个模块的所有内容：

```py
# 从 another_module.py 文件导入 my_module.py
# 两个文件在同一个目录下
import my_module

# 进行操作
my_module.say_hey()
print(my_module.hey)
```

或者导入一个模块的一些内容：

```py
# another_module.py
from my_module import hey, say_hey

# 进行操作
say_hey()
print(hey)
```

你还可以用 [pip](https://pypi.python.org/pypi/pip) 安装别人写的模块。pip 是 Python 的包管理工具。

```sh
pip install simplejson
```

## 面向对象编程

Python 支持使用对象申明类和类继承进行面向对象编程。而 JavaScript 只支持用原型链和原型链式的继承。

### [Classes](https://docs.python.org/3/tutorial/classes.html#classes)

```py
# 定义类
class Animal:
  # Animal 实例中都会共享的变量
  default_age = 1

  # 构造函数
  def __init__(self, name):
    # 定义一个对外可以访问的变量
    self.name = name

    # 可以在变量名前加两个下划线(__)来定义内部私有变量
    self.__age = default_age

  # 公有方法
  def get_age(self):
    return self.__age

  # 私有方法
  def __meow():
    print('meowwww')

  # 用 `staticmethod` 装饰器来申明一个静态方法
  @staticmethod
  def moo():
    print('moooo')

# 实例化一个 Animal 对象
animal = Animal()

# 访问公有属性和方法
print(animal.name)
print(animal.default_age)
print(animal.get_age())

# 访问静态方法
Animal.moo()

# 错误!!!! .__age 是私有的
print(animal.__age)
```

### [Inheritance](https://docs.python.org/3/tutorial/classes.html#inheritance)

一个类可以继承别的类。

```py
# 继承 Animal 类
class Human(Animal):
  def __init__(self, name, address):
    # 必须调用基础类的 __init__ 方法
    super().__init__(name)
    self.__address = address

  def get_address(self):
    return self.address

# 使用 Human 类
human = Human('Mario', '123 Jane Street, Brooklyn, NY 11211')

# Human 对象可以访问定义在 Animal 类中的方法
human.get_age()
human.get_address()
```

## 参考资料

除了本文中介绍的这些知识，Python 还有很多其他的知识点。我特别推荐你去看看 Python 官方文档 [Python docs](https://docs.python.org/3/)。

记住，学习一门语言的最好的方式是去写，去多写。所以开始写吧。
