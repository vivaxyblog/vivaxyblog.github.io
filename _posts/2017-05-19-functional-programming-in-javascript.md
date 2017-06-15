---
layout: post
title: JavaScript 中的函数式编程
tag: paradigm javascript
---

不赘述函数式编程，从函数式编程的几点原则开始给大家提供一些代码风格的转换思路。

## 函数式编程的原则是不可变数据

- 变量都用 `const` 来申明。
- 不使用 `for` 循环。采用 `map` 等高阶函数。
- 不用 `push`, `Reflect.deleteProperty` 等修改变量的方法。

这里暂时不考虑性能问题。使用不可变数据可以大大提高代码可维护性。

## 场景

### 根据一个数组生成一个新的数组。新的数组内容和之前的数组的内容一一对应

```js
// not good
const userIdList = [];
for (let i = 0; i < users.length; i++) {
    userIdList.push(users[i].id);
}

// good
const userIdList = users.map((user) => {
    return user.id;
});
```

### 根据一个数组，生成一个新数组。新的数组内容是之前数组内容的一部分

```js
// not good
const validUsers = [];
for (let i = 0; i < users.length; i++) {
    if (user.isValid) {
        validUsers.push(user);
    }
}

// good
const validusers = users.filter((user) => {
    return user.isValid;
});
```

### 根据一个数组，生成一个新的数组。新数组是旧数组中的数据的重组

```js
// not good
const children = [];
for (let i = 0; i < users.length; i++) {
    children.push(...user.children);
}

// not good
const children = [];
users.forEach((user) => {
    children = [...children, user.children];
});

// good
const children = users.reduce((currentChildren, user) => {
    return [...currentChildren, ...user.children];
}, []);
```

### 将数组数据传换成对象数据

```js
// not good
const propsMap = {};
props.forEach((prop) => {
    map[prop.name] = prop.value;
});

// good
const propsMap = props.reduce((currentMap, prop) => {
    return {
        ...currentMap,
        [prop.name]: prop.value,
    };
});
```

### 将对象数据转换成数组

```js
// not good
const propsArray = [];
for (let key in propsMap) {
    propsArray.push({ [key]: propsMap[key] });
}

// good
const propsArray = Object.keys(propsMap).map((key) => {
    return { [key]: propsMap[key] };
});
```

### 有条件地赋值变量

```js
// not good
let imageURL = 'default-state';
if (state === 0) {
    imageURL = 'disabled-state';
}
img.src = imageURL;

// good
const getImageURL = (state) => {
    if (state === 0) {
        return 'disabled-state';
    }
    return 'default-state';
};
const imageURL = getImageURL(state);
img.src = imageURL;
```

### 删除数组中的几项

应该考虑成生成一个新的数组，其中的数据是原来的数组的一部分。参考上面的 `filter` 用法。

### 向数组中添加几项

```js
// not good
users.push(...newUsers);

// good
const finalUsers = [...users, ...newUsers];
```

### 删除对象中的一个值

```js
// not good
delete user.name;

// not good
Reflect.deleteProperty(user, 'name');

// good
const { name: $_1, ...userWithoutName } = user; // 把 `user` 变量解构，除了 `name` 之外的属性都赋值给 `userWithoutName` 变量
```

### 生成长度为 N 的数组

```js
Array.from({ length: N }, (item, index) => {
    return index;
});
```
