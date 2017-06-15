---
layout: post
title: How to Copy JSON Object
tag: javascript
---

## Why we need to copy JSON object?

Sometimes server respond with data like this:

```json
{
    "code": 200,
    "msg": {
        "list": [
            {
                "text": "string 1",
                "value": 1
            },
            {
                "text": "string 2",
                "value": 2
            }
        ]
    }
}
```

And we modify the list like this:

```js
let list = ret.msg.list;
list.push({
    text: 'string 3',
    value: 3
});
ret.msg.list === [
    {
        text: 'string 1',
        value: 1
    },
    {
        text: 'string 2',
        value: 2
    },
    {
        text: 'string 3',
        value: 3
    }
]
```

Now, we will find the original response modified. What if I want it not to be changed.

## Why it's changed?

Because javascript passing variables by pointer, which means `list` above is always pointing to the array that server responded.

So when we modify `list`, will simultaneously modify the server response.

This will happen when we cope with arrays and js objects.

## So we copy it.

```js
let list = ret.msg.list.map(item => {
    item.text,
    item.value
});
list.push({
    text: 'string 3',
    value: 3
});
ret.msg.list === [
    {
        text: 'string 1',
        value: 1
    },
    {
        text: 'string 2',
        value: 2
    }
]
```

## What if the respond grows more deeper?

We can use `jQuery`, `underscore`, `lodash`.

```js
let list = $.extend({}, ret.msg).list;
let list = _.extend({}, ret.msg).list;
let list = _.clone(ret.msg.list, true);
let list = _.cloneDeep(ret.msg.list);
```

## A much more simply way.

```js
let list = JSON.parse(JSON.stringify(ret.msg.list));
```

But this only works for JSON objects, removes `Function`, `undefined` values, and keeps what JSON objects takes.

## Difference between JSON object and js object.

- The *keys* must be strings (i.e. enclosed in double quotes ") in JSON.

- The values can be either:
    - a string
    - a number
    - an (JSON) object
    - an array
    - true
    - false
    - null

## Reference

- [lodash](https://lodash.com/docs)

- [underscore](http://underscorejs.org/)

- [jQuery](http://api.jquery.com/)

- [What are the differences between JSON and JavaScript object?](http://stackoverflow.com/questions/3975859/what-are-the-differences-between-json-and-javascript-object)

- [What is the difference between JSON and Object Literal Notation?](http://stackoverflow.com/questions/2904131/what-is-the-difference-between-json-and-object-literal-notation)
