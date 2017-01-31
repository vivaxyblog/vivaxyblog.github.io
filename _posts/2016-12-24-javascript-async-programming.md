---
layout: post
title: javascript 异步编程
tag: language
---

提到前端，与后端区别最大之处莫过于用于交互，交互中最需要开发人员额外关心的则是用户体验。如何保证在用户多个操作下，界面依然流畅？这里就要说到异步编程了。

Javascript 中的一大特性就是支持异步编程，异步编程能够让多个用户输入在后台同时执行，从而带来流畅的界面交互。但是开发人员却为此付出了沉重的代价。

Java 中默认一个线程中的代码就是同步的，通过另起线程或者进程，可以做到并行处理。而 Javascript 中只有一个线程，为了不让一个网络请求阻塞了用户操作，Javascript 天生就有同步和异步两种编程方式。

异步的实现方式是在调用第三方资源（网络请求）时，发起和回传被分成了两个指令，等到第三方资源有结果后，通过预先约定的一个事件或者回调函数等方式完成数据传递。

Javascript 中的异步通常有下面六种方式：

## 回调函数

这是最普遍的一种做法，是所有异步编程的本质，下面的其他方式只是外展现的编程模式不同。

回调函数句柄在发起请求时被传给了处理方，处理方在完成后进行调用。发起后程序就执行了后面的语句，等到处理方完成处理后才会执行回调中的语句。

```js
var job1 = function(callback) {
    // do something
    callback();
};

var job2 = function() {
  
};

job1(job2);
```

回调函数不利于代码的阅读和维护，多个回调的嵌套会导致回调深渊。

```js
job1(function() {
    job2(function() {
        job3(function() {
            job4(function() {
                // ...
            });
        });
    });
});
```

可以通过封装回调的方式或者下面提到的几种写法简化上面的语句的复杂度。

## 事件模式

```js
var job1 = function() {
    // do something
    job1.emit('done');
};

var job2 = function() {
    
};

job1.on('done', job2);
job1();
```

事件模式降低了代码的耦合度，在复杂场景下会导致流程不清晰。

## 订阅者模式

```js
var center = new Center();

var job1 = function() {
    // do something
    center.publish('job1 done')
};

var job2 = function() {
    
};

center.subscribe('job1 done', job2);
job1();

```

订阅者模式可以清晰地看到消息和订阅者。

## Promise

```js
var job1 = new Promise(function(resolve, reject) {
    // so something
    resolve();
});

var job2 = function() {
  
};

job1.then(job2);
```

多个回调的嵌套可以被写成：

```js
job1.then(job2)
    .then(job3)
    .then(job4)
    // ...
```

## Generator

ES6 规范中引入了生成器函数

```js
let job1 = function*() {
    // do something
};

let job2 = function*() {

};

run(function*() {
    yield job1();
    yield job2();
});
```

可以用 [co](https://github.com/tj/co) 来实现 generator 异步编程。

其中 yield 的函数也可以支持一个 Promise 对象。

## async/await

```js
const job1 = async() => {
    // do something
};

const job2 = async() => {
    
};

run(async() => {
    await job1();
    await job2();
});
```

其中 await 的对象可以是一个 Promise 对象。

最后的三种可以说都是以 Promise 为基础的。

对于异步方法，一旦开始执行了，怎么中断呢？下面列举三种方法：

## 原生异步支持的中断

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.send();
xhr.abort(); // cancel
```

## 标记方式

添加一个变量，通过变量值确定是否执行下面的回调。这种方式并不能中断异步函数的执行，但是能控制接下去依赖的方法的执行。

```js
var flag = true;
job1(function() {
    if (flag) {
        job2();
    }
});
```

## Promise.race

```js
await Promise.race([timeoutPromise(timeout), job1]);
await job2;
```

在 `timeoutPromise` 抛出异常，阻止 `job2` 的执行。

异步编程的异常处理又应该怎么处理呢？

## 分回调

```js
job1({
    success: function() {
      
    },
    error: function() {
      
    }
});
```

## 分参数

```js
job1(function(err, data) {
    if (err) {
        // error
    } else {
        // success
    }
});
```

## 抛出异常

Javascript 中一个线程有异常抛出会阻止了下面的所有语句的执行。

```js
try {
    await job1();
    // success
} catch (ex) {
    // error
}
```

## 参考资料

- [Javascript异步编程的4种方法](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)
- [谈谈异步编程](http://www.cnblogs.com/bigbrother1984/p/4140685.html)
