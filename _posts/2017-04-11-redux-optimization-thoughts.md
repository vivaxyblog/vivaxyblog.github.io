---
layout: post
title: Redux 优化的一些思考
tag: framework
---

## Redux 的书写分离

从 Redux 官方示例开始，我们就采用了 actions 和 reducers 分开文件夹来维护的思路。

但是在实际业务中，大部分场景下一个 action 触发的 reducer 是在一个子 reducer 下。

这里其实引入了 combineReducers 工具来分离大型的 store 数据。

然而饱受诟病的正是一个用户操作开发起来要写多个文件，component, action, reducer, api... 非常不方便，所以我们考虑将 action 和 reducer 合并在一个文件中书写。

于是我们移除 actions 和 reducers 文件夹，新建一个 redux 目录，里面放业务文件，如：

```js
// newsList.js
import getNewsAPI from '../api/getNews';

import createReducer from '../lib/createReducer';
import processErrors from '../lib/processErrors';

import * as actionTypes from '../config/actionTypes';

const defaultState = {
    loading: false,
    list: [],
};

export default createReducer(defaultState, {
    [actionTypes.GET_MORE_NEWS]: (state, action) => {
        switch (action.status) {
            case 'loading':
                return { ...state, loading: true };
            case 'success':
                return { ...state, loading: false, list: [ ...state.list, ...action.payload ] };
            case 'error':
                return { ...state, loading: false };
        }
        return state;
    },
    [actionTypes.CLEAR_NEWS_LIST]: (state, action) => {
        return { ...state, list: [] };
    },
});

export const getMoreNews = () => {
    return async(dispatch) => {
        try {
            dispatch({
                type: actionTypes.GET_MORE_NEWS,
                status: 'loading',
            });
            const list = await getNewsAPI();
            dispatch({
                type: actionTypes.GET_MORE_NEWS,
                status: 'success',
                payload: list,
            });
        } catch (ex) {
            dispatch({
                type: actionTypes.GET_MORE_NEWS,
                status: 'error',
            });
            processErrors(ex);
        }
    };
};

export const clearNewsList = () => {
    return {
        type: types.CLEAR_NEWS_LIST,
    };
};
```

这里我们利用 export default 和 export cont 来区分 reducer 和 action，外部使用 reducer 时 `import newsListReducers from './newsList';` 得到的 `newsListReducers` 是一个方法，并不包含 `getMoreNews` 和 `clearNewsList` 两个方法，比较纯净。

同时使用 action 时通过 `import { getMoreNews, clearNewsList } from '../redux/newsList';` 拿到 function。

## action 和 reducer 的对应关系

action 和 reducer 并不一定是一一对应的，部分场景下一个 action 可以触发多个 reducer 的处理。

因此 actionTypes 定义在 config 文件中作为常量管理可以方便在多个文件中使用。

## redux-thunk 的 dispatch 并不一定是必须的

在上面的例子中，我们试用了 redux-thunk 中间件来支持异步 action，并且推迟 action 的执行。有些人会以为这里写同步 action 的时候也需要嵌套一层 dispatch

```js
export const clearNewsList = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLEAR_NEWS_LIST,
        });
    };
};
```

这种写法有点多余，我们可以直接 return action 对象。

## Redux 的性能问题

很多人都认为 react 组件的 props 和 state 没有变更的时候不会执行组件的 render 方法，但是这个看法是不正确的。默认的，只要父组件 render 方法执行了，子组件的 render 是会执行的。

除非我们在子组件上实现了 shouldComponentUpdate 方法，这个可以避免作组件多余的 render 计算。react-redux 提供的 connect 正是实现了这个方法，因此 connect 用得越多，项目性能越好。

## 参考资料

- [refactor for gt-react-scaffold](https://github.com/vivaxy/gt-react-scaffold/commit/2e09aedb7f846d8742efffc23b2207d5439e163b)
- [ducks-modular-redux](https://github.com/erikras/ducks-modular-redux)
- [duxjs](https://github.com/duxjs/duxjs)
- [flux-standard-action](https://github.com/acdlite/flux-standard-action)
