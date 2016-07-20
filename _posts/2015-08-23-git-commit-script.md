---
layout: post
title: Git Commit Script
---

When using [git](https://git-scm.com/), I always typed following command in order:

```sh
git add .
git commit -m 'foobar'
git push
```

Then I installed [zsh](http://ohmyz.sh/), I typed:

```sh
ga .
gcmsg 'foobar'
gp
```

Now I wrote a plugin for zsh: [`gcmt`](https://github.com/vivaxy/gcmt), I just typed:

```sh
gcmt
enter commit message: foobar
```

It's all done!

## [Installation](https://github.com/vivaxy/gcmt#installation)
