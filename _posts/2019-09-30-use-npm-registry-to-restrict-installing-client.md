---
layout: post
title: Use npm Registry to Restric Installing Client
tags: [npm, vivaxy, yarn, registry]
---

## Background

`npm` and `yarn` are not sharing lock file. A lock file is necessary for maintaining the stability of the project.

How can we make sure the developers are using the same client in our project?

Some approaches make use of `preinstall` hook. See:

- [How to force package installs to use yarn not npm](https://dev.to/ascorbic/force-installs-to-use-yarn-not-npm-1lhf)
- [use-yarn](https://github.com/AndersDJohnson/use-yarn)
- [use-yarn-instead](https://github.com/alexanderwallin/use-yarn-instead)

But this is not working when the project is an npm package. When an npm package publishing, `npm publish` will invoke `preinstall` hook too.

## Custom npm registry

Maybe we can do it by custom npm registry.

See [npm-registry-proxy](https://github.com/vivaxy/npm-registry-proxy) for source codes.

We can add `registry="https://npm-registry-proxy.vivaxy.now.sh/yarn/https%3A%2F%2Fregistry.npmjs.org%2F/"` to `.npmrc`.

## Result

In project `.npmrc`, we have `registry="https://npm-registry-proxy.vivaxy.now.sh/yarn/https%3A%2F%2Fregistry.npmjs.org%2F/"`.

- When using `yarn add`, dependencies installed successfully.
- When using `npm i`, install error occurred.

It works fine. But when we publishing packages, `PUT` requests are not successfully forwarded to the target registry.
