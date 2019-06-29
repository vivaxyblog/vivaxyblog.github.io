---
layout: post
title: Commonly used clear fix
tags: [css]
---

```css
.clear-fix {
    /* for ie7~8 */
    zoom: 1;
}
.clear-fix:after {
    display: block;
    height: 0;
    width: 0;
    clear: both;
    font-size: 0;
    content: '';
}
```

See example [here](https://vivaxy.github.io/course/cascading-style-sheets/clear-fix/).
