---
layout: post
title: IMPRESSION, Telling A Viewable Impression on A Web Page
tags: [project]
---

![impression](/assets/2016-11-20-impression/impression.png)

When dealing with advertisements, we need to tell if an user has seen our ads on our websites. So we can make profit from showing ads.

Ads are paid by actual effects. Such as, when the user sees as ad, it clicked the ad, as [`CPC`](https://en.wikipedia.org/wiki/Pay-per-click).

Other ads may cost by impression, as [`CPM`](https://en.wikipedia.org/wiki/Cost_per_impression).

There are two kinds of impression, the old fashioned one and the modern one.
 
We don't quite know how the web pages show to the user, and what the users have done to the page (by browsing, clicking, or even hacking the page). So we just take the ads loaded event as the impression event. This is the old fashion way, less accurate and less effective.

As the browser getting more advanced, we can do much more by javascript. We might even be able to tell if the ads are in the viewport of the users. So there comes the modern way, [viewable impression](https://en.wikipedia.org/wiki/Viewable_Impression).

Viewable impression means when the user sees the ads content on the browser, we count it as an impression. This needs more calculation in the client.

In order to tell a viewable impression, I have done some investigation. I found a npm package called [onscreen](https://www.npmjs.com/package/onscreen) wrote by [silvestreh](https://www.npmjs.com/~silvestreh), which can tell if an element enters or leaves the screen. Onscreen works fine when the element use the normal behavior in the flow. It considered scroll, resize events from user actions and dom mutation events from dom modification by js.

But this is not enough when the ads use some other styles, such as `position: absolute`, `opacity: 0`, `display: none`, etc. And it's not enough when telling the users are closing the web page.

I tried to implement features above in `onscreen`. I have submitted a [pull request](https://github.com/silvestreh/onScreen/pull/46), but it goes dark. Maybe the `onscreen` package only takes care of scroll actions. So I think I should create some utility to help with the ads.

So here comes [impression](https://github.com/vivaxy/impression), npm package called [impression.js](https://www.npmjs.com/package/impression.js).

This is written in es6, with a standlone bundle. `impression` supports IE9+, chrome, safari, firefox, opera... I have taken `scroll`, `resize`, `mutation`, `unload` events in account.

`impression` passed 22 test cases, with a high code coverage up to 92%. The codes not covered is used for backward compatibility. If you are interested, help me with those code coverage, or even the whole project.

Just feel free to make contributions.
